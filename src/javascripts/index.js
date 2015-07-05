function renderWizard(){
  var pd = $("#wizard");
  var root = document.wizdata;

  var index =0;

  function handleNav(){
    var ele = $(this);
    //apply layer
    ele.children().show();
    ele.siblings().hide();
  }
  function handleChoice(){
    var ele = $(this);
    //apply layer
  }
  function renderSegment(element, data){
    if(data == undefined){
      return;
    }
    if("nav" in data){
      var nav = data.nav;
      for(var i = 0; i<nav.length; i++){
        var item = nav[i];
        var np = $("<li class='question' id='item"+(index++)+"' data-layers='"+item.layers+"'>"+item.question+"</li>");
        np.hide();
        np.on("click",handleNav);
        element.append(np);
        renderSegment(np,item.next);
      }
    }
    if("choice" in data){
      var choices = data.choice;
      for(var i = 0; i<choices.length; i++){
        var item = choices[i];
        var np = $("<li class='choice' id='item"+(index++)+"' data-layers='"+item.layers+"'>"+item.label+"</li>");
        np.hide();
        np.on("click",handleChoice);
        element.append(np);
        renderSegment(np,item.next);
      }
    }
  }
  renderSegment(pd,root.wizard);
  pd.children().show();
}

function ShowWizard(){
  $("#wizard").show();
}

function PanelStateChange(){
  var pnl = $("#mainTitlePanel");
  if(pnl.hasClass("panelUp")){
    // put all the panels "down"
    $(".panelUp").hide();
    pnl.removeClass("panelUp").addClass("panelDown");
  } else {
    $(".panelDown").show();
    pnl.removeClass("panelDown").addClass("panelUp");
  }
}

$(document).ready(function(){

  if(document.wizdata){
    renderWizard();
  }
  $("#bottomMiddle").on("click",function(){
    PanelStateChange();
    ShowWizard();
  });
});
