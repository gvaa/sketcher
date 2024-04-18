"use strict";


// generating pixel grid
const pixelContainer = document.querySelector('#pixels');
const newPixel = document.createElement("div");
newPixel.setAttribute("class", "pixel");

for (let x = 0; x < 16; x++) {
    for (let y = 0; y < 16; y++) {
        pixelContainer.appendChild(newPixel.cloneNode(true));
    }
}

pixelContainer.oncontextmenu = function ()
{
    return false;
}


// drawing on touchscreen devices
let drawTouch = function (e) {
  let currentElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
  let currentClass = currentElement.getAttribute("class");

  if (currentClass == "pixel" && currentClass != "now") {
    currentElement.setAttribute("class", "painted now");
  } else if (currentClass == "painted" && currentClass != "now") {
    currentElement.setAttribute("class", "pixel now");
  }
}

let endTouch = function () {
  let changedNow = document.getElementsByClassName("now");
  Array.from(changedNow).forEach(changedPix => {
    changedPix.className = changedPix.className.replace(" now", "");
  });
}
pixelContainer.addEventListener("touchmove", drawTouch);
pixelContainer.addEventListener("touchend", endTouch);


// drawing with mouse
let mouseDown;
let mouseButton;

document.body.addEventListener("mousedown", function() { 
  mouseDown = 1;
});
document.body.addEventListener("mouseup", function() {
  mouseDown = 0;
});

let pixels = document.getElementsByClassName("pixel");
Array.from(pixels).forEach(pixel => {
  let currentPixel;
  
  pixel.addEventListener("mouseenter", function(e) {
    currentPixel = pixel.getAttribute("class");
    if (mouseDown == 1 && currentPixel == "pixel" && mouseButton == 0) {
      pixel.setAttribute("class", "painted");
    } 
    if (mouseDown == 1 && currentPixel == "painted" && mouseButton == 2) {
      pixel.setAttribute("class", "pixel");
    }
    });

  pixel.addEventListener("mousedown", function(e) { 
    currentPixel = pixel.getAttribute("class");
    mouseButton = e.button;
    if (currentPixel == "pixel" && mouseButton == 0) {
      pixel.setAttribute("class", "painted");
    } else if (currentPixel == "painted" && mouseButton == 2) {
      pixel.setAttribute("class", "pixel");
    }
    });
});