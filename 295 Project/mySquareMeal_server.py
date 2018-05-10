from flask import Flask, request, session, render_template, url_for, redirect
import json

from profile_operations.user_registration import registration
from authentication_operations.user_authentication import authentication



app=Flask(__name__)

@app.route("/")
def index():
    #return "index page ....!!!"
    return render_template('welcome.html')

@app.route("/login")
def login_redirect():
    return render_template('login.html')


@app.route("/registration")
def registration_redirect():
    return render_template('registration.html')

@app.route("/home")
def home_redirect():
    return render_template('home.html')

@app.route("/restaurants")
def restaurants_redirect():
    return render_template('restaurants.html')


@app.route("/map_view")
def map_redirect():
    return render_template('mapview.html')

@app.route("/profile")
def profile_redirect():
    return render_template('welcome.html')


@app.route("/restaurants_details")
def rest_details_redirect():
    return  render_template('restaurant_detail.html')

@app.route("/logout")
def logout_redirect():
    return render_template('welcome.html')

@app.route("/registration", methods=['POST'])
def user_registration():
    request_data=request.get_json()
    #user_email = request_data.get('email')
    #user_password = request_data.get('password')
    #user_allergies = request_data.get('allergies')
    registration_response=registration.create_user_profile(request_data)
    return registration_response


@app.route("/verification",methods=['POST','GET'])
def user_authentication():
    request_data = request.get_json()
    user_email=request_data.get('email')
    user_password=request_data.get('password')
    authentication_result = authentication.credential_authentication(user_email,user_password)
    if authentication_result == 'success':
        #session['user_email']=user_email
        #return authentication_result
        return authentication_result
       # return authentication_result
    else:
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

