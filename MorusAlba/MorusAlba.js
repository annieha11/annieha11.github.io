
function starting() {
TweenMax.set("#P1open", {opacity:0});
TweenMax.set("#P2open", {opacity:0});
TweenMax.set("#gamboOpen", {opacity:0});
TweenMax.set("#attaccoOpen", {opacity:0});
TweenMax.set("#ZOOM", {opacity:0});
TweenMax.set("#Slider", {opacity:0});
TweenMax.set("#text02", {scale:0, opacity:0});
TweenMax.set("#zoomArrow", {opacity:0});
TweenMax.set("#shooting", {opacity:0});
TweenMax.set("#goBack", {x: +2000, opacity:0});
TweenMax.set("#Polline path", {autoAlpha:0});
TweenMax.set("#gambi path", {autoAlpha:0});
TweenMax.set("#fiori circle", {scale:0});
TweenMax.set("#replay", {opacity:0, scale:0});
};

starting();

//

function preZoom() {
var tl = new TimelineMax({id: "preZoom"});
tl.add("start");
tl.to("#text01", 0.2,{scale:0, opacity:0}, "start");
tl.to("#link2zoom", 0.2,{scale:0, opacity:0}, "start");
tl.fromTo("#zoomArrow", 1, {drawSVG: 0, autoAlpha:0 }, {drawSVG: true, autoAlpha: 1}, "start");
tl.to("#ZOOM", 1, {opacity:1}, "start");
tl.to("#text02", 0.8, {scale:1, opacity:1}, "start");
tl.to("#shooting",1, {scale:1, opacity: 1}, "+=1");
return tl;
};


function zoomIn() {
var zoom = document.getElementById("ZOOM");
var hb = zoom.getBBox();
var newView = `${hb.x} ${hb.y} ${hb.width} ${hb.height}`;
var tl = new TimelineMax({id: "zoomIn"});
tl.add("start");
tl.to("svg", 2, {
  attr: { viewBox: newView }
}, "start");
tl.to("#FULL", 1, { opacity:0 }, "start");

};


function postZoom() {
var tl = new TimelineMax({id: "postZoom"});
tl.add("start");
tl.to("#", 1, { opacity:0 }, "start");
};



function zoomOut() {
var zoom = document.getElementById("MorusAlbaFULL");
var hb = zoom.getBBox();
var newView = `${hb.x} ${hb.y} ${hb.width} ${hb.height}`;

var tl = new TimelineMax();
tl.add("start");
tl.to("#FULL",0.5,{opacity:1});
tl.to("svg", 2, {
  attr: { viewBox: newView }
}, "start");
tl.to("#shooting", 0.5, {opacity:0},"start");
tl.to("#goBack", 0.5, {opacity:0}, "start");
tl.to("#caption01",0.1, {opacity:0}, "start");
tl.to("#Zflower", 0.1, {opacity:0}, "start");
tl.to("#sub", 0.1, {opacity:0}, "start");
tl.to("#replay", 0.1, {scale:1}, "start");
tl.to("#zoomArrow circle", 0.1, {fill:"none"}, "start");
//tl.to("#link2zoom", 0.5,{opacity:1, scale:1});
return tl;
};

var shooting = new TimelineMax({id: "opening"});


function sceneOne() {
shooting.add("start");
shooting.to("#caption02", 0.1, {scale:0});
shooting.to("#P1closed", 2, {morphSVG: "#P1open", ease: Back.easeInOut},"start");
shooting.to("#P2closed", 2, {morphSVG: "#P2open", ease: Back.easeInOut},"start");
shooting.to("#gamboClosed", 2, {morphSVG: "#gamboOpen", ease: Back.easeInOut},"start");
shooting.to("#attaccoClosed", 2, {morphSVG: "#attaccoOpen", ease: Back.easeInOut},"start")
shooting.add("mid");
shooting.to("#P1open", 0.1, {opacity: 1}, "mid");
shooting.to("#P2open", 0.1, {opacity: 1}, "mid");
shooting.to("#text02", 0.2, {opacity:0, scale:0}, "mid");
shooting.staggerTo("#Polline path", 0.2,{autoAlpha:1, x:"-=1px"}, 0.01, "-=0.2");
shooting.staggerTo("#Polline path", 1,{autoAlpha:0, x:"-=10px"}, 0.01, "-=0.3" );
shooting.to("#goBack", 0.1, {x:0}, "-=0.1");
shooting.to("#goBack", 0.2, {opacity:1});
shooting.play();
};

function sceneTwo() {
var tl = new TimelineMax({id: "fullFlowerOpening"});
//tl.to("#FULL", 0.2, {opacity:1});
tl.add("start");
tl.fromTo("#gambi path", 0.5, {drawSVG: 0, autoAlpha:0 }, {drawSVG: true, autoAlpha: 1}, "start");
tl.staggerTo("#fiori circle", 0.5,{scale:1}, 0.01, "-=0.4");
tl.to("#replay", 0.3, {opacity:1});
return tl;
};


//////////////////////////
// CLICKABLE ELEMENTS ///
/////////////////////////

$(".clickable").on("click", function() {
  TweenMax.set("#link2zoom", {opacity:0});
  preZoom();
  zoomIn();
});


$("#shootBtn").on("click", function() {
  sceneOne();

});

$("#goBackBtn").on("click", function() {
  var master = new TimelineMax();
  master.add(zoomOut(), "lastZoom")
        .add(sceneTwo(), "blossom");
  return master;
});

$("#replay").on("click", function() {
 starting();
 TweenMax.set("#text01",{scale:1, opacity:1});
 TweenMax.set("#link2zoom",{scale:1, opacity:1});
 TweenMax.set("#caption01",{opacity:1});
 TweenMax.set("#Zflower",{opacity:1});
 TweenMax.set("#sub", {opacity:1});
 TweenMax.set("#zoomArrow circle", {fill:"#475180"});
 TweenMax.set("#F1open",);
 TweenMax.set("F2closed");
 shooting.pause(0, true); //Go back to the start (true is to suppress events)
 shooting.remove();
 TweenMax.set("#text02",{scale:0, opacity:0});

});


/*var slider = $("#Slider rect");
var sliderWidth = slider.width();

snapPoints = [sliderWidth/2];

Draggable.create("#Slider circle", { 
 type:"x", 
 //edgeResistance:1,
 //lockAxis:true, 
 throwProps:true,
 //throwResistance:500,
 bounds: "#Slider rect",
 snap:snapPoints
 });

var slider = $("#Slider rect");
var sliderWidth = slider.width();

snapPoints = [sliderWidth/2];

Draggable.create("#Slider circle", { 
 type:"x", 
 //edgeResistance:1,
 //lockAxis:true, 
 throwProps:true,
 //throwResistance:500,
 bounds: "#Slider rect",
 snap:snapPoints
 });
*/
 //snap:function(end){
     //if less than halfway go back to fully open
   //return (end < -menuWidth/2) ? -menuWidth : 0;
 //onDrag: function() {
   //var myDraggable = Draggable.get("#Slider circle");
   //console.log(this.x);
   //},
//snap:{x:[5,20,80,400]}

//var drag0 = draggable[0];
//drag0.vars.snap=[drag0.minX,drag0.maxX];

// SLIDER xMIN 842.4400024414062 y 350.19000244140625 width 97 height 99.08499145507812//
// XMAX = 842.44 + 97 = 939  

