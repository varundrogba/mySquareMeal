var login_application = angular.module('login_app',['ngCookies'])

login_application.controller('login_controller',['$scope','$http','$cookies', function ($scope, $http, $cookies) {

    console.log('inside login controller')
    
    $scope.verification = function (email, password) {
        console.log(email)
        console.log(password)
        console.log('logging in with '+email);

        $http({

            method: 'POST',
            url: '/verification',
            headers: { 'Content-Type': 'application/json' },
            data: {'email':email, 'password':password}
        }).then(function (response) {
            console.log(response.data)
            if(response.data == 'success'){
                console.log('redirecting to home...')
                $cookies.put('email',email);
                window.location.href = '/home';
                //console.log($cookies.get('email'));
            }
            else if(response.data == 'failure'){
                console.log('Invalid credentials')
            }
        }, function (error) {
            console.log(error);
        });

        $scope.email = null;
        $scope.password = null;
    }
}]);

