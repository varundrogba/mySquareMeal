import pymongo
from pymongo import MongoClient
import json

try:
    MONGODB_URI = "mongodb://mysquaremeal:mysquaremeal@ds157653.mlab.com:57653/mysquaremeal_user_profile_database"
    mlab_client = MongoClient(MONGODB_URI, connectTimeoutMS=30000)
    db = mlab_client.mysquaremeal_user_profile_database
except ConnectionError:
    raise

class registration:


    def check_existing_user(email):
        print('checking user existance')
        if db.user_profile_collection.find({'email':email}).count() > 0:
            print('user profile exists')
            return True
        else:
            print('user profile does not exists')
            return False




    def create_user_profile(user_data):
        print(user_data)
        try:
            email = user_data["email"]
            password = user_data["password"]
            allergies = user_data["allergies"]
            allergies_list = allergies.split(",")
            print('--------------------------------------------------------------\n'+email)
            user_exists = registration.check_existing_user(email)
            if user_exists:
                return 'failure - user exists'
            else:
                user_details = {
                    "food_to_avoid": allergies_list,
                    "password": password,
                    "email": email
                }
                db.user_profile_collection.insert(user_details)
                print('new user created with email address : '+email)
                print('new user created with password : '+password)
                print('new user created with allergies : '+allergies)
                return 'success'
        except:
            print('user profile not created')
            return 'failure'
            raise




