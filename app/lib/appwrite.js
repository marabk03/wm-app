import { Query, Client, Account, ID, Avatars, Databases } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.wm.campusapp',
    projectid: '670184400025837dd437',
    databaseId: '670184f6001e13be78f3',
    classesCollectionId: '6701925b0006b24ff3ad',
    userCollectionId: '6701850b001e5fcc4223',
    storageId: '670185d2002aaaa3f910',
    eventCollectionId: '6701f93a001e27153506',
};

const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectid)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password);
        if (!newAccount) throw new Error('User account creation failed');

        const avatarUrl = avatars.getInitials(username);

        let session;
        try {
            session = await account.getSession('current');
        } catch (error) {
            session = await signIn(email, password);
        }

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
            }
        );

        return newUser;
    } catch (error) {
        console.log('Error in createUser:', error.message);
        throw new Error(error.message);
    }
};

export const signIn = async (email, password) => {
    try {
        let session;
        try {
            session = await account.getSession('current');
        } catch (error) {
            session = await account.createEmailPasswordSession(email, password);
        }
        return session;
    } catch (error) {
        console.log('Error in signIn:', error.message);
        throw new Error(error.message);
    }
};

export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
  }
  
export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

export const SeachClasses = async (query) => {
    try {
        const classes = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.classesCollectionId,
            [
                Query.search('title', query),
                Query.limit(400) 
            ]
        );
        return classes.documents;
    } catch (error) {
        throw new Error(error.message);
    }
};

export async function UserAddClass(classId) {
    try {
        console.log("Fetching current user account...");

        const currentAccount = await account.get();

        if (!currentAccount) {
            throw new Error("No current account found");
        }

        console.log("Fetching user document from database...");
        const currentUserQuery = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        const currentUser = currentUserQuery.documents[0];
        if (!currentUser) {
            throw new Error("No user document found");
        }

        console.log("Current user document fetched:", currentUser);

        const updatedClasses = currentUser.classes ? [...currentUser.classes, classId] : [classId];

        console.log("Updating user document with new class...");
        const updatedUser = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            currentUser.$id, 
            { classes: updatedClasses }
        );

        console.log("User document updated with new class:");

        return updatedUser;

    } catch (error) {
        console.error("Error in UserAddClass:", error.message);
        return null;
    }
}




export async function getUserClasses() {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) {
            throw new Error("No current account found");
        }

        const currentUserQuery = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        const currentUser = currentUserQuery.documents[0];
        if (!currentUser || !currentUser.classes) {
            throw new Error("No user document or classes found");
        }

        const classIds = currentUser.classes;

        const classDetails = await Promise.all(
            classIds.map(async (classId) => {
                const classQuery = await databases.getDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.classesCollectionId,
                    classId
                );
                return classQuery;
            })
        );

        return classDetails;

    } catch (error) {
        console.error("Error in getUserClasses:", error.message);
        return null;
    }
}
export async function RemoveUserClass(classId) {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) {
            throw new Error("No current account found");
        }

        const currentUserQuery = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        const currentUser = currentUserQuery.documents[0];
        if (!currentUser || !currentUser.classes) {
            throw new Error("No user document or classes found");
        }

        const updatedClasses = currentUser.classes.filter(id => id !== classId);

        const updatedUser = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            currentUser.$id,
            { classes: updatedClasses }
        );

        console.log(`Class ${classId} removed successfully.`);
        return updatedUser;

    } catch (error) {
        console.error("Error in RemoveUserClass:", error.message);
        return null;
    }
}

export const getEvents = async () => {
    try {
        const events = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.eventCollectionId,
            [Query.limit(200)] 
        );
        return events.documents;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getSpecificEvent = async (documentId: string): Promise<Event> => {
    try {
      const event = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.eventCollectionId,
        documentId
      );
      return event; 
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  
  

export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }
  