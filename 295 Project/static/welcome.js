var welcome = angular.module('welcome',[])

welcome.controller('welcome_controller',['$scope','$http', function ($scope, $http) {

    console.log('inside welcome controller')

    $scope.window_redirect = function(){
        window.location="/login.html";
    }
}]);