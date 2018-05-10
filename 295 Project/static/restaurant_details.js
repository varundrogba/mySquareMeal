angular.module('restaurants_details_app', ['ngCookies'])
    .controller('restaurants_details_app_controller',[ '$scope', '$http','$cookies',function ($scope, $http, $cookies) {
        console.log('inside details controller')
        var rest_name = $cookies.get('restaurant_name');
        var latitude = $cookies.get('latitude');
        var longitude = $cookies.get('longitude');
        console.log(rest_name)
        $http({
            method: 'POST',
            url: 'http://e29d0bca.ngrok.io/recommendation',
            headers: { 'Content-Type': 'application/json' },
            data: {'latitude':latitude, 'longitude':longitude}
        }).then(function (response) {
            if(response.status == 200){
                var rest_data=response.data
                console.log(rest_data)
                var array_length=rest_data.length;
                for(i=0;i< array_length;i++)
                {
                  if(rest_data[i].restaurant_name == rest_name){
                      data = rest_data[i]
                      var name = data.restaurant_name
                      var city = data.address.city;
                      var street = data.address.street_address;
                      var zip = data.address.zip;
                      //console.log(address)
                      angular.element(document.getElementById('rname')).append("MENU - "+name);
                      angular.element(document.getElementById('raddress')).append('<p><b></b> ' + street + ", " + city + ", " + zip + '</p>');
                      /*
                      $("#rmenulist").append('<li class="span3">' +
                                '<div class="product-box">' +
                                '<span class="sale_tag"></span><br/>' +
                                r_data[0][4][i]
                                + '<br/></div>')
                      */
                      var i;
                      var menu_data = data.menu_data;
                      for(i=0;i<menu_data.length;i++){
                          var element_str = '<li class="span3">' +
                              '<div class="product-box">' +
                              '<span class="sale_tag"></span><br/>' +
                              menu_data[i]
                              + '<br/></div>';
                          angular.element(document.getElementById('rmenulist')).append(element_str);
                      }

                  }
                }
            }
            else{
                console.log('can not display result...')
            }
        }, function (error) {
            console.log(error);
        });


    }]);