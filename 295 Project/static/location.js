var place;
var address = '';

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 37.3382,
      lng: -121.8863
    },
    zoom: 8
  });
  var card = document.getElementById('pac-card');
  var input = document.getElementById('pac-input');

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

  var autocomplete = new google.maps.places.Autocomplete(input);

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); // Why 17? Because it looks good.
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindowContent.children['place-icon'].src = place.icon;
    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-address'].textContent = address;
    infowindow.open(map, marker);
  });
}

function locbtn() {
  //alert(place.address_components[0]);
    var latitude = place.geometry.location.lat();
    var longitude = place.geometry.location.lng();
    //console.log(latitude)
    angular.element(document.getElementById('loc-btn')).scope().request_recommendations(latitude,longitude);

}


angular.module('home_app', ['ngCookies'])
    .controller('home_app_controller',[ '$scope', '$http','$cookies',function ($scope, $http, $cookies) {
        $scope.request_recommendations = function (latitude, longitude) {
            console.log('location controller');
            console.log(latitude);
            console.log(longitude);
            $cookies.remove('latitude')
            $cookies.remove('longitude')
            $cookies.put('latitude',latitude)
            $cookies.put('longitude',longitude)
            console.log($cookies.get('email'));
            window.location.href = '/restaurants';
        };
    }]);
