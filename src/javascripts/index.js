function renderWizard(){
  var pd = $("#wizard");
  var root = document.wizdata;

  var index =0;
  var renderSegment(element, data){
    if("nav" in data){
      var nav = data.nav;
      for(var i = 0; i<nav.length; i++){
        var item = nav[i];
        var np = $("<li class='question' id='item"+(index++)+"' data-layers='"+item.layers+"'>"+item.question+"</li>");
        element.append(np);
        renderSegment(np,item.next);
      }
    }
    if("choice" in data){
    }
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
    renderWizard();
  }
});
