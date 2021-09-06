"use strict";

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let width = 600;
let heigth = 500;
let imageData = ctx.createImageData(width, heigth);

let r;
let g;
let b;
let a;

function drawRect(imageData, r, g, b, a) {
    
    //RECORRO TODO EL ANCHO, TODO EL ALTO Y LLAMO A SET PIXEL
    //VA A EMPEZAR CON X=0 Y CUANDO Y = HEIGTH X = 1 Y ASI...
    for(let x = 0; x < width; x++){

        let r;
        let g;
        let b;
        let a = 255;
            //BUSCO DIVIDIR EN 3 EL CANVAS, E IR HACIENDO UN DEGRADE DE A 3, DEJANDO FIJO EL R Y EL B, 
            //Y EL G EMPEZAR EN 255 Y QUE VAYA HASTA 0
        if(x <= (width/3)){

            var coeficiente = 85 / (width / 3);
            r = 0;
            g = coeficiente * x;
            b = 255;
            
        } else if((x > width/3) && (x <= (width/3 * 2))) {
            
            var coeficiente = 85 / (width/3);
            r = 0;
            g = coeficiente * x;
            b = 255;
            
        } else {

            var coeficiente = 85 / (width / 3);
            r = 0;
            g = coeficiente * x;
            b = 255;
            
        }
        
        for(let y = 0; y < heigth; y++) {
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
