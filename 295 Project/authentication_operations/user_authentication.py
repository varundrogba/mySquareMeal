import pymongo
from pymongo import MongoClient
from profile_operations.user_registration import registration

try:
    MONGODB_URI = "mongodb://mysquaremeal:mysquaremeal@ds157653.mlab.com:57653/mysquaremeal_user_profile_database"
    mlab_client = MongoClient(MONGODB_URI, connectTimeoutMS=30000)
    db = mlab_client.mysquaremeal_user_profile_database
except ConnectionError:
    raise

class authentication:

    def credential_authentication(user_email,user_password):
        print('---------------------------------------------------------------------------\nUser Credentials Verification')
        print('user email:'+user_email+'\nuser password:'+user_password)
        user_exists = registration.check_existing_user(user_email)
        if user_exists:
            user_profile_data = db.user_profile_collection.find({'email':user_email})

            if user_profile_data.count() <= 1:
                for user_document in user_profile_data:
                    if user_password == user_document["password"]:
                        print('authentication successful')
                        return 'success'
                    else:
                        print('authentication unsuccessful - incorrect password')
                        return 'failure - incorrect password'
            else:
                print('error --------- more than one record found')
                return 'failure - profiles with similar email found'
        else:
            return 'failure - user profile does not exists for email: '+user_email