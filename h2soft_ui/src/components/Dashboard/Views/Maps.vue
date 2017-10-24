<template>
    <div class="card card-map">
      <div class="header">
        <h4 class="title">Google Maps</h4>
      </div>
      <div class="map">
        <div id="map"></div>
      </div>
    </div>
</template>
<script>
  export default {
    mounted () {
      var myLatlng = new window.google.maps.LatLng(-31.442249, -64.192998) // direccion de la UTN
//      var mapOptions = {
//        zoom: 17,
//        center: myLatlng,
//        scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
//        styles: [{
//          'featureType': 'water',
//          'stylers': [{ 'saturation': 43 }, { 'lightness': -11 }, { 'hue': '#0088ff' }]
//        }, {
//          'featureType': 'road',
//          'elementType': 'geometry.fill',
//          'stylers': [{ 'hue': '#ff0000' }, { 'saturation': -100 }, { 'lightness': 99 }]
//        }, {
//          'featureType': 'road',
//          'elementType': 'geometry.stroke',
//          'stylers': [{ 'color': '#808080' }, { 'lightness': 54 }]
//        }, {
//          'featureType': 'landscape.man_made',
//          'elementType': 'geometry.fill',
//          'stylers': [{ 'color': '#ece2d9' }]
//        }, {
//          'featureType': 'poi.park',
//          'elementType': 'geometry.fill',
//          'stylers': [{ 'color': '#ccdca1' }]
//        }, {
//          'featureType': 'road',
//          'elementType': 'labels.text.fill',
//          'stylers': [{ 'color': '#767676' }]
//        }, {
//          'featureType': 'road',
//          'elementType': 'labels.text.stroke',
//          'stylers': [{ 'color': '#ffffff' }]
//        }, { 'featureType': 'poi', 'stylers': [{ 'visibility': 'off' }] }, {
//          'featureType': 'landscape.natural',
//          'elementType': 'geometry.fill',
//          'stylers': [{ 'visibility': 'on' }, { 'color': '#b8cb93' }]
//        }, { 'featureType': 'poi.park', 'stylers': [{ 'visibility': 'on' }] }, {
//          'featureType': 'poi.sports_complex',
//          'stylers': [{ 'visibility': 'on' }]
//        }, { 'featureType': 'poi.medical', 'stylers': [{ 'visibility': 'on' }] }, {
//          'featureType': 'poi.business',
//          'stylers': [{ 'visibility': 'simplified' }]
//        }]
//
//      }
      // var map = new window.google.maps.Map(document.getElementById('map'), mapOptions)
      var map = new window.google.maps.Map(document.getElementById('map'), {
        center: myLatlng,
        zoom: 10
      })
      var infoWindow = new google.maps.InfoWindow({map: map})
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }

          infoWindow.setPosition(pos)
          infoWindow.setContent('Location found.')
          map.setCenter(pos)
        }, function () {
          handleLocationError(true, infoWindow, map.getCenter())
        })
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter())
      }

      function handleLocationError (browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos)
        infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.')
      }
//      var marker = new window.google.maps.Marker({
//        position: myLatlng,
//        title: 'Hola, H2Soft!'
//      })
//
//      // To add the marker to the map, call setMap();
//      marker.setMap(map)
    }
  }

</script>
<style>

</style>
