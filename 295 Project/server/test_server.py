from flask import Flask, request, session
import json
#import flask.ext.login as flask_login
from flask_login import LoginManager

from profile_operations.user_registration import registration
from authentication_operations.user_authentication import authentication

class User(flask_login.UserMixin):
    pass

app=Flask(__name__)

login_manager = LoginManager()
login_manager.init_app(app)

@app.route("/")
def index():
    return "index page ....!!!"

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)


@app.route("/registration", methods=['POST'])
def user_registration():
    request_data=request.get_json()
    registration_response=registration.create_user_profile(request_data)
    return registration_response


@app.route("/login",methods=['POST','GET'])
def user_authentication():
    user_email=request.form["email"]
    user_password=request.form["password"]
    authentication_result = authentication.credential_authentication(user_email,user_password)
    if authentication_result == 'success':
        #session['user_email']=user_email
        user = User()
        user.id = user_email
        login_user(user_email)
    return authentication_result

@app.route("/logout",methods=['POST','GET'])
def user_logout():
    if 'user_email' in session:
        #user_email = session['user_email']
        #session.pop('user_email',None)
        print(user_email+' logged out successfully')
        return 'success'
    else:
        return 'failure'
    flask_login.logout_user()
    return 'success'

if __name__=='__main__':
    app.secret_key = 'abcd'
    app.run(debug=True)
