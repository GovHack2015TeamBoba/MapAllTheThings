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

    $checkbox.attr("checked", true);

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
      maxZoom: 0,
      minZoom: 10
    };

    map = new google.maps.Map(canvas, mapOptions);

    $.each(MapAllTheThings.slip_layers, function(i, layerObject) {
      var layer = new google.maps.visualization.MapsEngineLayer({
        layerId: layerObject.assetId,
        layerOriginal: layerObject,
        map: map
      });

      layersDrawn.push(layer);
    });

    drawLayerControls(layersDrawn);
  }

 if(canvas)  google.maps.event.addDomListener(window, 'load', initializeMap);

});
