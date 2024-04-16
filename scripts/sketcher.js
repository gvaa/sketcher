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
pixelContainer.onmousedown = function() { 
  mouseDown = 1;
  console.log(mouseDown);
}
pixelContainer.onmouseup = function() {
  mouseDown = 0;
  console.log(mouseDown);
}

let pixels = document.getElementsByClassName("pixel");
Array.from(pixels).forEach(pixel => {
    pixel.addEventListener("mouseenter", function() { 
    if (mouseDown == 1) {
        pixel.setAttribute("class", "painted");
    }
    });
})