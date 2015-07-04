
function renderData(data, parent){
  var added = false;
  var el = $("<li></li>");
  for(var i = 0;i<data.length; i++){
    var d = data[i];
    if (d.parent == parent){
      added = true;
      el.append("<h3>"+d.title+"</h3>");
      var rt = renderData(data,d.id);
      if(rt){
        var ul = $("<ul></ul>");
        ul.append(rt);
        el.append(ul);
      }
    }
  }
  if(added){
    return el;
  } else {
    return null;
  }
}

$(document).ready(function(){
  if(document.wizdata){
    $("#level0").append(renderData(document.wizdata, 0));
  }
});
