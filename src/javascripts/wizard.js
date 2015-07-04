var level = 0;
function renderData(data, parent){
  var added = false;
  var list = $("<ul class='level"+ (level++) +"'></ul>");
  for(var i = 0;i<data.length; i++){
    var d = data[i];
    if (d.parent == parent){
      added = true;
      var el = $("<li></li>");
      el.append("<h3>"+d.title+"</h3>");
      var rt = renderData(data,d.id);
      if(rt){
        el.append(rt);
      }
      list.append(el);
    }
  }
  if(added){
    return list;
  } else {
    return null;
  }
}

$(document).ready(function(){
  if(document.wizdata){
    $("#wizard").append(renderData(document.wizdata, 0));
  }
});
