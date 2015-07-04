$(document).ready(function () {

  canvas = document.getElementById('map-canvas');
  $layerControl = $('#layer-control');

  var map;
  var layersDrawn = [];

  function drawLayerControls (layersDrawn) {
    var $layerList = $('<ul>');

    $.each(layersDrawn, function (i, layer){
      i++;
      $layer = $('<li>');
      $layer.append(drawLayerCheckbox(i, layer));
      $layerList.append($layer);
    });

    $layerControl.append($layerList);
  }

  function drawLayerCheckbox (id, layer) {
    var $label = $('<label>');
    var $checkbox = $('<input type="checkbox" id="layer_'+ id +'">');

    $checkbox.attr("checked", false);

    $checkbox.click(function (){
      layer.setMap($(this).is(':checked') ? map : null);
    });

    $label
      .append($checkbox)
      .append(layer.layerOriginal.name);

    return $label;
  }

  function initializeMap() {
    var mapOptions = {
      // WA State
      // center: new google.maps.LatLng(-27.288135,121.972796),
      // Perth
      center: new google.maps.LatLng(-31.9528536,115.8573389),
      clickable: true,
      streetViewControl: false,
      // Only show default (road) map
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 10,
      minZoom: 5,
      maxZoom: 18
    };

    map = new google.maps.Map(canvas, mapOptions);

    $.each(MapAllTheThings.slip_layers, function(i, layerObject) {
      // Create a data layer for each layer set availale and hide it by default
      var layer = new google.maps.visualization.MapsEngineLayer({
        layerId: layerObject.assetId,
        layerOriginal: layerObject,
        map: null,
      });

      layersDrawn.push(layer);
    });

    drawLayerControls(layersDrawn);
  }

 if(canvas)  google.maps.event.addDomListener(window, 'load', initializeMap);

});
