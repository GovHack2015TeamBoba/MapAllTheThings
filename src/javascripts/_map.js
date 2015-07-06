$(document).ready(function () {

  canvas = document.getElementById('map-canvas');
  $layerControl = $('#layer-control');

  var map;
  var autoCompleteInput;
  var infowindow = new google.maps.InfoWindow();
  var layersDrawn = [];
  var storyMarkersDrawn = [];
  var noongarSuburbs = "https://raw.githubusercontent.com/GovHack2015TeamBoba/MapAllTheThings/master/src/javascripts/data/NoongarSuburbs.kml";
  var nativeTitleWA = "https://raw.githubusercontent.com/GovHack2015TeamBoba/MapAllTheThings/master/src/javascripts/data/NativeTitleWA.kml";

  function drawLayerControls (layersDrawn) {
    var $layerList = $('<ul>');

    $.each(layersDrawn, function (i, layer){
      i++;
      $layer = $('<li>');
      $layer.append(drawLayerCheckbox(i, layer));
      $layerList.append($layer);
    });

    $layerControl.append($layerList);

    var $toggleLI = $('<li>');

    var $showAllButton = $('<button>Show all layers</button>');
    var $hideAllButton = $('<button>Hide all layers</button>');

    $showAllButton.click(function () { toggleLayers() });
    $hideAllButton.click(function () { toggleLayers() });

    $toggleLI.append([$showAllButton, $hideAllButton]);

    // $layerList.append($toggleLI);

  }

  function toggleLayers () {
    $layerControl.find('input[id^="layer_"]').each($).wait(100, function (index) {
      $(this).click();
    });
  }

  function drawLayerCheckbox (id, layer) {
    var $label = $('<label>');
    var $checkbox = $('<input type="checkbox" data-layer-id="'+ layer.layerId +'" id="layer_'+ id +'">');

    $checkbox.attr("checked", false);

    $checkbox.click(function (){
      layer.setMap($(this).is(':checked') ? map : null);
    });

    $label
      .append($checkbox)
      .append(layer.layerOriginal.name);

    return $label;
  }

  function addKMLayer (layerUrl) {

    var ctaLayer = new google.maps.KmlLayer({
      url: layerUrl
    });
    ctaLayer.setMap(map);
  }

  MapAllTheThings.addPhotoStories = function (stories) {

    $.each(stories, function(i, storyObject) {

      if ((storyObject['Latitude'] || storyObject['Longitude']) === null) {
        return;
      }

      // TODO: handle case where no image is provided
      var contentString = '<div id="photostory-content">' +
        '<strong>'+ storyObject['Title'] +'</strong>' +
        '<a target="_blank" href="' + storyObject['URL'] + '">' +
        '<img src="'+ storyObject['Primary image'] + '" width="250" alt="'+ storyObject['Primary image caption'] +'">' +
        '</a>' +
        '<span>Date: ' + storyObject['Date'] + '</span>' +
        '</div>';

      var photoStoryMarker = new google.maps.Marker({
        position: new google.maps.LatLng(storyObject['Latitude'],storyObject['Longitude']),
        map: map,
        title: storyObject['Title']
      });

      google.maps.event.addListener(photoStoryMarker, 'click', function() {
        infowindow.setContent(contentString);
        infowindow.open(map, photoStoryMarker);
        map.setCenter(photoStoryMarker.position);
      });

      storyMarkersDrawn.push(photoStoryMarker);
    });
  }

  function showBackToHome () {
    var $startOver = $("#layer-control").append("<button class='restart'>Start over</button>");
    $startOver.click(function () {
      $("#home, #overlay").show();
    });
  };

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

    var westernAustraliaBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-34.981,111.203),
      new google.maps.LatLng(-12.861,129.878)
    );

    var autocompleteOptions = {
      bounds: westernAustraliaBounds,
      componentRestrictions: {country: 'au'}
    };

    map = new google.maps.Map(canvas, mapOptions);

    autoCompleteInput = document.getElementById('pac-input');

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(autoCompleteInput);

    var autocomplete = new google.maps.places.Autocomplete(autoCompleteInput, autocompleteOptions);
    autocomplete.bindTo('bounds', map);

    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      // hide any visible marker
      marker.setVisible(true);

      var place = autocomplete.getPlace();

      if (!place.geometry) {
        window.alert("Sorry, no geometry data found.");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }

      marker.setIcon(({
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
      }));
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

    });

    $.each(MapAllTheThings.slip_layers, function(i, layerObject) {
      // Create a data layer for each layer set availale and hide it by default

      // console.log('Creating "'+ layerObject.slipName +'" layer')

      var layer = new google.maps.visualization.MapsEngineLayer({
        layerId: layerObject.assetId,
        layerOriginal: layerObject,
        map: null,
      });

      layersDrawn.push(layer);
    });

    drawLayerControls(layersDrawn);

    showBackToHome();

    // addPhotoStories(MapAllTheThings.photo_stories);

    // addKMLayer(noongarSuburbs);

    // addKMLayer(nativeTitleWA);
  }

 if (canvas) {
    google.maps.event.addDomListener(window, 'load', initializeMap);

    $handle = $('#control-toggle');
    $handle.click(function (event) {
      event.preventDefault();
      $(this).parent().toggleClass('hidden');
    });


 }

});
