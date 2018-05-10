angular.module('restaurants_app', ['ngCookies'])
    .controller('restaurants_app_controller',[ '$scope', '$http','$cookies',function ($scope, $http, $cookies) {
        console.log('inside restaurants controller')
        console.log($cookies.get('email'))
        var latitude = $cookies.get('latitude');
        var longitude = $cookies.get('longitude');
        console.log(latitude)
        $http({
                method: 'POST',
                url: 'http://e29d0bca.ngrok.io/recommendation',
                headers: { 'Content-Type': 'application/json' },
                data: {'latitude':latitude, 'longitude':longitude}
            }).then(function (response) {
                if(response.status == 200){
                    var rest_data=response.data
                    var array_length=rest_data.length;
                    var i;
                    //var restaurants_name_array=[];
                     $scope.restaurants_name_array = [];
                    for(i=0;i< array_length;i++)
                    {
                        var rest_name = rest_data[i].restaurant_name
                        var element_string = '<li class="span3" ><a class="rest_details"><div class="product-box" id="'+rest_name+'" onclick="menu_details(this.id)"><span class="sale_tag"></span><br/>' + rest_name + '<br/></div></a>';
                        var newEle = angular.element(element_string);
                        //$scope.restaurants_name_array.push(rest_data[i].restaurant_name);
                        var target = document.getElementById('r_list');
                        angular.element(target).append(newEle);
                    }
                    console.log($scope.restaurants_name_array)
                    //$scope.restaurants_name=restaurants_name_array;
                }
                else{
                  console.log('can not display result...')
                }
            }, function (error) {
                console.log(error);
            });

            $scope.redirect_to_details= function (rest_name) {
                console.log('controller');
                console.log(rest_name);
                $cookies.put('restaurant_name',rest_name);
                window.location.href = '/restaurants_details';
            }


}]);