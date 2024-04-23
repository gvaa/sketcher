"use strict";

// generating pixel grid
const pixelGridSize = 384;
const gridSlider = document.querySelector('#gridRange');
const pixelContainer = document.querySelector('#pixels');
const newPixel = document.createElement("div");
let frontColor = "#f38ba8";
let backColor = "#b4befe";
newPixel.setAttribute("class", "pixel");
let pixelsScale = gridSlider.value;
let gridSizePara = document.querySelector('#grid-size')

let createPixelGrid = function () {
  let pixelsScaleConverted;
  let pixelGridSizeConverted;
  
  switch(pixelsScale) {
    case "0":
      pixelsScaleConverted = 8;
      break;
    case "1":
      pixelsScaleConverted = 16;
      break;
    case "2":
      pixelsScaleConverted = 32;
      break;
    // case "3":
    //   pixelsScaleConverted = 64;
    //   break;
    // case "4":
    //   pixelsScaleConverted = 128;
    //   break;
    }

  pixelGridSizeConverted = pixelGridSize / pixelsScaleConverted;
  newPixel.style.width = pixelGridSizeConverted+"px";
  newPixel.style.height = pixelGridSizeConverted+"px";
  newPixel.style.backgroundColor = backColor;
  for (let x = 0; x < pixelsScaleConverted; x++) {
      for (let y = 0; y < pixelsScaleConverted; y++) {
          pixelContainer.appendChild(newPixel.cloneNode(true));
      }
  }
  gridSizePara.innerText = pixelsScaleConverted + "x" + pixelsScaleConverted;
}

createPixelGrid();

pixelContainer.oncontextmenu = function ()
{
    return false;
}

// adding listeners for drawing with mouse
let mouseDown;
let mouseButton;

document.body.addEventListener("mousedown", function() { 
  mouseDown = 1;
});
document.body.addEventListener("mouseup", function() {
  mouseDown = 0;
});

let addDrawEventListeners = function() {
  let pixels = document.getElementsByClassName("pixel");
  Array.from(pixels).forEach(pixel => {
    let currentPixel;
    
    pixel.addEventListener("mouseenter", function(e) {
      currentPixel = pixel.getAttribute("class");
      if (mouseDown == 1 && mouseButton == 0) {
        pixel.setAttribute("class", "painted");
        pixel.style.backgroundColor = frontColor;
      } 
      if (mouseDown == 1 && mouseButton == 2) {
        pixel.setAttribute("class", "pixel");
        pixel.style.backgroundColor = backColor;
      }
      });

    pixel.addEventListener("mousedown", function(e) { 
      currentPixel = pixel.getAttribute("class");
      mouseButton = e.button;
      if (mouseButton == 0) {
        pixel.style.backgroundColor = frontColor;
        pixel.setAttribute("class", "painted");
      } else if (mouseButton == 2) {
        pixel.style.backgroundColor = backColor;
        pixel.setAttribute("class", "pixel");
      }
      });
  });
}

addDrawEventListeners();

// changing the scale
let onChangeRange = function () {
  pixelsScale = gridSlider.value;
  pixelContainer.textContent = '';
  createPixelGrid();
  addDrawEventListeners();
}

gridSlider.addEventListener('change', onChangeRange)

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


// selecting colors on the color ribbon
const currentBackColor = document.querySelector('#back-color');
const currentFrontColor = document.createElement("div");
currentFrontColor.setAttribute("id", "front-color");
currentFrontColor.style.backgroundColor = frontColor;
currentBackColor.appendChild(currentFrontColor);
let colorMouseButton;

let recolorBackground = function() {
  let unColoredPixels = pixelContainer.getElementsByClassName("pixel");
  Array.from(unColoredPixels).forEach(colorPixel => {
    colorPixel.style.backgroundColor = backColor;
  }) 
}

let selectColor = function(e) {
  colorMouseButton = e.button;
  switch(colorMouseButton) {
    case 0:
      frontColor = e.target.id;
      currentFrontColor.style.backgroundColor = frontColor;
      break;
    case 2:
      backColor = e.target.id;
      currentBackColor.style.backgroundColor = backColor;
      break;
  }
  recolorBackground();
}

colorsContainer.addEventListener("mousedown", selectColor);

// drawing on touchscreen devices
let currentElement;
let currentClass;
let timer;
let currentId;
const touchDuration = 500;

let onLongTouch = function () {
  backColor = currentId;
  currentBackColor.style.backgroundColor = backColor;
  recolorBackground();
}

let chooseBackColor = function (e) {
  currentElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
  currentId = currentElement.getAttribute("id");
  // setting timer to activate a function after some time (= emulating long touch)
  timer = setTimeout(onLongTouch, touchDuration); 
}

let endChooseBackColor = function () { 
  // clear timer if touch was not long enough, so long touch function does not trigger
  if (timer) {
    clearTimeout(timer);
  }
}

let startTouch = function (e) {
  e.preventDefault();
  currentElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
  currentClass = currentElement.getAttribute("class");
  
  if (currentClass == "pixel") {
    currentElement.setAttribute("class", "painted now");
    currentElement.style.backgroundColor = frontColor;
  } else if (currentClass == "painted") {
    currentElement.setAttribute("class", "pixel now");
    currentElement.style.backgroundColor = backColor;
  }
}

let drawTouch = function (e) {
  currentElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
  currentClass = currentElement.getAttribute("class");

  if (currentClass == "pixel") {
    currentElement.setAttribute("class", "painted now");
    currentElement.style.backgroundColor = frontColor;
  } else if (currentClass == "painted") {
    currentElement.setAttribute("class", "pixel now");
    currentElement.style.backgroundColor = backColor;
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

colorsContainer.addEventListener("touchstart", chooseBackColor);
colorsContainer.addEventListener("touchend", endChooseBackColor);