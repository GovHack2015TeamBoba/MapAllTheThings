function renderWizard(){
  var pd = $("#wizard");
  var root = document.wizdata;

  var index =0;

  function handleNav(e){
    e.stopPropagation();
    var ele = $(this);
    //apply layer
    ele.children().show();
    ele.siblings().hide();
  }
  function handleChoice(e){
    e.stopPropagation();
    var ele = $(this);
    //apply layer
    var layers = ele.data("layers").split(',');
    for(var i=0;i<layers.length;i++){
      var layerid = layers[i];

      $('input:checkbox[data-layer-id="'+layerid+'"]').click();

    }
  }
  function renderSegment(element, data){
    if(data == undefined){
      return;
    }
    if("nav" in data){
      var nav = data.nav;
      for(var i = 0; i<nav.length; i++){
        var item = nav[i];
        var np = $("<div class='question' id='item"+(index++)+"' data-layers='"+item.layers+"'><span class='question-label'>"+item.question+"</span></div>");
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
        var np = $("<div class='choice' id='item"+(index++)+"' data-layers='"+item.layers+"'><span class='choice-label'>"+item.label+"</span></div>");
        np.hide();
        np.on("click",handleChoice);
        element.append(np);
        renderSegment(np,item.next);
      }
      element.append($("<button class='hidemap' style='display:none'>Show map</button>").on("click",function(){
        $("#wizard").hide();
        $("#overlay").hide();
      }));
    }
  }
  renderSegment(pd,root.wizard);
  pd.children().show();
}

function ShowWizard(){
  $('#home').hide();
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
