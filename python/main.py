from appwrite.client import Client
from appwrite.services.databases import Databases
import json
import time
import uuid  

client = Client()

(client
    .set_endpoint('https://cloud.appwrite.io/v1')  
    .set_project('670184400025837dd437')          
)

databases = Databases(client)

database_id = '670184f6001e13be78f3'
collection_id = '6701925b0006b24ff3ad'

with open('output.json', 'r') as f:
    courses = json.load(f)

def add_courses_to_appwrite():
    for course in courses:
        try:
            unique_id = str(uuid.uuid4())
            
            result = databases.create_document(
                database_id,   
                collection_id, 
                unique_id,   
                course          
            )
            time.sleep(3)
        except Exception as e:
            print(f"Error adding document: {e}")

add_courses_to_appwrite()
