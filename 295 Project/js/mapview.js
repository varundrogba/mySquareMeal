var locations = [
    ['Bondi Beach', -33.890542, 151.274856],
    ['Coogee Beach', -33.923036, 151.259052],
    ['Cronulla Beach', -34.028249, 151.157507],
    ['Manly Beach', -33.80010128657071, 151.28747820854187],
    ['Maroubra Beach', -33.950198, 151.259302]
];

$.getJSON("http://localhost:63342/295%20Project/api/response.json?", function(data) {
    $.each(data, function(i, f) {
        locations.push([f.restaurant_name, f.address.latitude, f.address.longitude]);
    });
});

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: new google.maps.LatLng(37.328255, -121.883693),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();

var marker, i;

for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
            //redirect markers to restaurant_detail.html
        }
    })(marker, i));
}