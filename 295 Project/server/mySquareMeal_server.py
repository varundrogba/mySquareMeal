from flask import Flask, request, session, render_template
import json

from profile_operations.user_registration import registration
from authentication_operations.user_authentication import authentication



app=Flask(__name__)

@app.route("/")
def index():
    #return "index page ....!!!"
    return render_template('welcome.html')

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
        session['user_email']=user_email
    return authentication_result

@app.route("/logout",methods=['POST','GET'])
def user_logout():
    if 'user_email' in session:
        user_email = session['user_email']
        session.pop('user_email',None)
        print(user_email+' logged out successfully')
        return 'success'
    else:
        return 'failure'


if __name__=='__main__':
    app.secret_key = 'any random string'
    app.run(debug=True, port=8000)

