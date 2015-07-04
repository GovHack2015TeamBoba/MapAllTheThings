$(document).ready(function () {

  canvas = document.getElementById('map-canvas');
  $layerControl = $('#layer-control');

  var map;
  var layersDrawn = [];
  var LAYERS = {
      garden_bore_suitability: '09372590152434720789-01302480197074991316',
      public_transport_authority_services_bus_routes: '09372590152434720789-13313542664337428076',
      public_transport_authority_services_bus_stops: '09372590152434720789-02406381474707693508',
      regional_parks: '09372590152434720789-03904637395351872180',
      speed_data_mrwa: '09372590152434720789-00934723860504938151',
      state_electorates: '09372590152434720789-07805245591538660512',
      state_road_network: '09372590152434720789-08761509449522039995',
      water_demand_region_boundaries: '09372590152434720789-01064970710144667276',
      aboriginal_communities_in_wa: '09372590152434720789-08518116787816413147',
      bicycle_routes_and_shared_paths: '09372590152434720789-14689280532638025030',
      dfes_stations: '09372590152434720789-16346722722399592455'        ,
      aboriginal_heritage_places: '09372590152434720789-05162399680694933506',
      public_drinking_water_source: '09372590152434720789-10740193452754088647',
      flood_level_contours: '09372590152434720789-18350116626117757948',
      flood_level_points: '09372590152434720789-01320004448748484962',
      hundred_year_ari_flood_way_and_flood_fringe_line: '09372590152434720789-11681118181974381618',
      medium_scale_topo_mining_poi: '09372590152434720789-04445708696883193118',
      medium_scale_topo_transportation_poi: '09372590152434720789-02049418467789229979',
      medium_scale_topo_recreation_poi: '09372590152434720789-12803464308000515834',
      medium_scale_topo_industry_poi: '09372590152434720789-10043953347411150345',
      medium_scale_topo_hospitality_poi: '09372590152434720789-06114910761181993768',
      medium_scale_topo_health_poi: '09372590152434720789-04220985995367283502',
      medium_scale_topo_geographic_poi: '09372590152434720789-15026645118979021145',
      medium_scale_topo_education_poi: '09372590152434720789-14090888058010556682',
      medium_scale_topo_commercial_poi: '09372590152434720789-16952463091039879055',
      railway_lines: '09372590152434720789-18334593804525489987',
      iron_staining_risk: '09372590152434720789-01595251729696585091',
      environmental_sensitivity: '09372590152434720789-01627525817521224070'
    }

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
      .append(' Layer: ' + id);

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

    $.each(LAYERS, function(name, id) {
      var layer = new google.maps.visualization.MapsEngineLayer({
        layerId: id,
        map: map
      });

      layersDrawn.push(layer);
    });

    drawLayerControls(layersDrawn);
  }

  google.maps.event.addDomListener(window, 'load', initializeMap);

});
