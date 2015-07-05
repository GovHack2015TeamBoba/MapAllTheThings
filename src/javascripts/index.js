function renderWizard(data, parent, level){
  var added = false;
  var list = $("<ul class='wizmenu level"+ (level) +"'></ul>");
  for(var i = 0;i<data.length; i++){
    var d = data[i];
    if (d.parent == parent){
      added = true;
      var el = $("<li class='wizitem'></li>");
      el.append("<h3>"+d.title+"</h3>");
      var rt = renderWizard(data,d.id, level +1);
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


function PanelStateChange(){
  var pnl = $("#mainTitlePanel");
  if(pnl.hasClass("panelUp")){
    // put all the panels "down"
    pnl.removeClass("panelUp").addClass("panelDown");
  } else {
    pnl.removeClass("panelDown").addClass("panelUp");
  }
  
}

$(document).ready(function(){

  if(document.wizdata){
    $("#wizard").append(renderWizard(document.wizdata, 0,0));
  }

  
});
