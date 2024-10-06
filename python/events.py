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
collection_id = '6701f93a001e27153506'

with open('events_data.json', 'r') as f:
    events = json.load(f)

def add_events_to_appwrite():
    for event in events:
        try:
            unique_id = str(uuid.uuid4())

            if 'organizations' in event:
                cleaned_organizations = []
                
                for org in event['organizations']:
                    if isinstance(org, (str, int, float)):
                        cleaned_organizations.append(str(org)[:6000])
                    else:
                        print(f"Skipping invalid organization value in event '{event['title']}': {org}")

                event['organizations'] = cleaned_organizations

            result = databases.create_document(
                database_id=database_id,
                collection_id=collection_id,
                document_id=unique_id,
                data=event
            )
            print(f"Successfully added event: {event['title']}")
            time.sleep(1)
        except Exception as e:
            print(f"Error adding document '{event.get('title', unique_id)}': {e}")



add_events_to_appwrite()
