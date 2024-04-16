"use strict";

const pixelContainer = document.querySelector('#container');
const newPixel = document.createElement("div");
newPixel.setAttribute("class", "pixel");

for (let x = 0; x < 16; x++) {
    for (let y = 0; y < 16; y++) {
        pixelContainer.appendChild(newPixel.cloneNode(true));
        console.log(x,y);
    }
}

let mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}


let pixels = document.getElementsByClassName("pixel");
Array.from(pixels).forEach(pixel => {
    pixel.addEventListener("mouseenter", function() { 
    if (mouseDown == 1) {
        pixel.setAttribute("class", "painted");
    }
    });
})