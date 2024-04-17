"use strict";

const pixelContainer = document.querySelector('#pixels');
const newPixel = document.createElement("div");
newPixel.setAttribute("class", "pixel");

for (let x = 0; x < 16; x++) {
    for (let y = 0; y < 16; y++) {
        pixelContainer.appendChild(newPixel.cloneNode(true));
    }
}

let mouseDown = 0;
document.body.addEventListener("mousedown", function() { 
  mouseDown = 1;
  console.log(mouseDown);
});
document.body.onmouseup = function() {
  mouseDown = 0;
  console.log(mouseDown);
}

let pixels = document.getElementsByClassName("pixel");
Array.from(pixels).forEach(pixel => {
    pixel.addEventListener("mouseover", function() { 
    if (mouseDown == 1 && pixel.getAttribute("class") == "pixel") {
      pixel.setAttribute("class", "painted");
    } else if (mouseDown == 1 && pixel.getAttribute("class") == "painted") {
      pixel.setAttribute("class", "pixel");
    }
    });

    pixel.addEventListener("mousedown", function() { 
      if (pixel.getAttribute("class") == "pixel") {
        pixel.setAttribute("class", "painted");
      } else if (pixel.getAttribute("class") == "painted") {
        pixel.setAttribute("class", "pixel");
      }
      });
});

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
    console.log(changedPix);
    changedPix.className = changedPix.className.replace(" now", "");
    console.log(changedPix);
  });
}

pixelContainer.addEventListener("touchmove", drawTouch);
pixelContainer.addEventListener("touchend", endTouch);
