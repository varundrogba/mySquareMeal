var registration_application = angular.module('registration_app',[])


registration_application.controller('registration_controller',['$scope','$http', function ($scope, $http) {

    console.log('inside registration controller');
    $scope.email_add = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    $scope.input_list = /^[\w,\s]*$/;


    $scope.register_new_user = function (email, password, allergies) {
        console.log('testing register function');
        console.log(email);
        console.log(password);
        console.log(allergies);
        $http({

            method: 'POST',
            url: '/registration',
            headers: { 'Content-Type': 'application/json' },
            data: {'email':email, 'password':password, 'allergies':allergies}
        }).then(function (response) {
            console.log(response.data)
            if(response.data == 'success'){
                console.log('redirecting to login...')
                window.location.href = '/login';
                //console.log($cookies.get('email'));
            }
            else if(response.data == 'failure'){
                console.log('Invalid credentials')
            }
        }, function (error) {
            console.log(error);
        });
    }

    $scope.match_password = function(){
        console.log('checking passwords');
        $scope.registration_form.reg_password_confirm.$error.match_error = $scope.password !== $scope.confirm_password;
    }

}]);

