$(document).ready(function () {

  canvas = document.getElementById('map-canvas')

  var map;

  var mapOptions = {
    center: new google.maps.LatLng(-27.288135,121.972796),
    clickable: true,
    // disableDefaultUI: true
    // disableDoubleClickZoom: true
    // draggable: false
    // keyboardShortcuts: false
    // mapTypeControl: false
    // mapTypeId: @PRC_CUSTOM_MAPSTYLE
    // navigationControl: false
    // scaleControl: false
    scrollwheel: false,
    zoom: 5
    }

  function initialize() {
    map = new google.maps.Map(canvas, mapOptions);
  }

  google.maps.event.addDomListener(window, 'load', initialize);

});
