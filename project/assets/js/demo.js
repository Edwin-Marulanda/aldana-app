/**
 * Created by maor.frankel on 5/19/15.
 */
 console.log("reconoce: "+document.querySelector('#wrapper'));
var rul1 = new ruler({container: document.querySelector('#wrapper')});
var guides1;
var visible1 = true;
var visibleGuides1 = true;


function setPosX1(val){
  rul1.api.setPos({x:val});
}

function setPosY1(val){
  rul1.api.setPos({y:val});
}

function setScale1(val){
  rul1.api.setScale(val);
}

function hideRuler1(){
  rul1.api.toggleRulerVisibility(visibleGuides1 = !visibleGuides1);
}

function clearGuides1(){
  rul1.api.clearGuides();
}

function storeGuides1(){
  guides1 = rul1.api.getGuides();
}

function setGuides1(){
  rul1.api.setGuides(guides1);
}

function hideGuides1(){
  rul1.api.toggleGuideVisibility(visible1 = !visible1);
}

function destory1(){
  rul1.api.destroy();
}


