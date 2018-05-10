var home_application = angular.module('home_app',['ngCookies'])

home_application.controller('home_controller',['$scope','$http','$cookies', function ($scope, $http,$cookies) {

    console.log('home controller');
    console.log($cookies.get('email'));

}]);
