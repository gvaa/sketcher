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

// generating colors
const mocha = ["#f5e0dc", "#f2cdcd", "#f5c2e7", "#cba6f7", 
               "#f38ba8", "#eba0ac", "#fab387", "#f9e2af",
               "#a6e3a1", "#94e2d5", "#89dceb", "#74c7ec",
               "#89b4fa", "#b4befe", "#cdd6f4", "#1e1e2e"];

const colorsContainer = document.querySelector('#colors');
const newColor = document.createElement("div");
newColor.setAttribute("class", "color");

mocha.forEach(color => {
  newColor.setAttribute("id", color);
  newColor.style.backgroundColor = color;
  colorsContainer.appendChild(newColor.cloneNode(true));
});


colorsContainer.oncontextmenu = function ()
{
    return false;
}

let selectColor = function(e) {
  console.log(e.target.id);
  console.log(pixelContainer.getElementsByClassName("pixel"));
  let coloredPixels = document.getElementsByClassName("pixel");
  Array.from(coloredPixels).forEach(colorPixel => {
    colorPixel.style.backgroundColor = e.target.id;
  }) 
}

colorsContainer.addEventListener("click", selectColor);

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

// drawing on touchscreen devices
let currentElement;
let currentClass;

let startTouch = function (e) {
  e.preventDefault();
  currentElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
  currentClass = currentElement.getAttribute("class");
  
  if (currentClass == "pixel") {
    currentElement.setAttribute("class", "painted now");
  } else if (currentClass == "painted") {
    currentElement.setAttribute("class", "pixel now");
  }
}

let drawTouch = function (e) {
  currentElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
  currentClass = currentElement.getAttribute("class");

  if (currentClass == "pixel") {
    currentElement.setAttribute("class", "painted now");
  } else if (currentClass == "painted") {
    currentElement.setAttribute("class", "pixel now");
  }
}

let endTouch = function () {
  let changedNow = document.getElementsByClassName("now");
  Array.from(changedNow).forEach(changedPix => {
    changedPix.className = changedPix.className.replace(" now", "");
  });
}
pixelContainer.addEventListener("touchstart", startTouch);
pixelContainer.addEventListener("touchmove", drawTouch);
pixelContainer.addEventListener("touchend", endTouch);

