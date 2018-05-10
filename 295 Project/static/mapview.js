/*fetch('../api/response.json?')
    .then((data) => data.json())
.then((data) => {
    const locations = data.map(({ restaurant_name, address: { latitude, longitude }}) => (
        [restaurant_name, latitude, longitude]
    ));
const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: new google.maps.LatLng(37.328255, -121.883693),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});
const infowindow = new google.maps.InfoWindow();
locations.forEach(([name, lat, lng]) => {
    const marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map
    });
google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(name);
infowindow.open(map, marker);
});
});
});*/

var map_application = angular.module('map_app',['ngCookies'])

map_application.controller('map_app_controller',['$scope','$http','$cookies', function ($scope,$http,$cookies) {

    console.log('inside map controller');
    var latitude = $cookies.get('latitude');
    var longitude = $cookies.get('longitude');
    console.log(latitude);
    console.log(longitude);


    restaurants_array = [];


    $scope.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: Number(latitude), lng: Number(longitude)},
        mapTypeId: 'roadmap'
    });

    $http({
        method: 'POST',
        url: 'http://e29d0bca.ngrok.io/recommendation',
        headers: { 'Content-Type': 'application/json' },
        data: {'latitude':latitude, 'longitude':longitude}
    }).then(function (response) {
        if(response.status == 200){
            var rest_data=response.data;
            //console.log(rest_data);
            var array_length=rest_data.length;
            var i;
            //var restaurants_name_array=[];

            for(i=0;i< array_length;i++)
            {
                restaurant_details_array=[];
                var rest_name = rest_data[i].restaurant_name;
                var latitude = rest_data[i].address.latitude;
                var longitude = rest_data[i].address.longitude;
                restaurant_details_array.push(rest_name);
                restaurant_details_array.push(Number(latitude));
                restaurant_details_array.push(Number(longitude));
                restaurants_array.push(restaurant_details_array);
            }

            //console.log(restaurants_array)

            var j;
            for(j=0; j< restaurants_array.length; j++){
                var name = restaurants_array[j][0];
                var location = {lat: restaurants_array[j][1], lng: restaurants_array[j][2]};
                place_marker(map, name, location)
            }
        }

        else{
            console.log('can not display result...')
        }
    }, function (error) {
        console.log(error);
    });


    


    
    function place_marker(map, name, location) {
        console.log(name);
        console.log(location);

        var marker = new google.maps.Marker({
            position: location,
            title:name,
            id:name
        });
        // To add the marker to the map, call setMap();
        marker.setMap($scope.map);

        google.maps.event.addListener(marker, "click", function() {
            var marker = this;
            var rest_name = this.id;
            console.log(rest_name);
            $cookies.put('restaurant_name',rest_name);
            window.location.href = '/restaurants_details';
        });
    }


}]);