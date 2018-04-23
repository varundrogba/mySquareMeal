fetch('http://localhost:63342/295%20Project/api/response.json?')
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
    });