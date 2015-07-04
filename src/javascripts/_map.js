$(document).ready(function () {

  canvas = document.getElementById('map-canvas')

  var map;

  var mapOptions = {
    center: new google.maps.LatLng(-27.288135,121.972796),
    clickable: true,
    streetViewControl: false,
    mapTypeControl: false,
    mapTypeControlOptions: {
      // Only show default (road) map
      mapTypeIds: [google.maps.MapTypeId.ROADMAP]
    },
    zoom: 6,
    maxZoom: 0,
    minZoom: 6
    }

  function initializeMap() {
    map = new google.maps.Map(canvas, mapOptions);
  }

  google.maps.event.addDomListener(window, 'load', initializeMap);

});
