"use strict";

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let width = 500;
let heigth = 500;
let imageData = ctx.createImageData(width, heigth);

let r;
let g;
let b;
let a;

function drawRect(imageData, r, g, b, a) {
    
    //RECORRO TODO EL ALTO, TODO EL ANCHO Y LLAMO A SET PIXEL
    //VA A EMPEZAR CON Y=0 Y CUANDO x = width Y se vuelve 1 Y ASI hasta ir bajando y llegar al blanco...
    for(let y = 0; y < heigth; y++){

        var coeficiente = 255 / width;
        let r = coeficiente * y;
        let g = coeficiente * y;
        let b = coeficiente * y;
        let a = 255;

        for(let x = 0; x < width; x++) {
            setPixel(imageData, x, y, r, g, b, a);
        }
    }
}

function setPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}

drawRect(imageData, r, g, b, a);
ctx.putImageData(imageData, 0, 0);