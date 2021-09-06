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
    
    //RECORRO TODO EL ANCHO, TODO EL ALTO Y LLAMO A SET PIXEL
    //VA A EMPEZAR CON X=0 Y CUANDO Y = HEIGTH X = 1 Y ASI...
    for(let x = 0; x < width; x++){

        let r;
        let g;
        let b;
        let a = 255;

        if(x <= (width/2)){

            var coeficiente = 255 / (width / 2);
            r = coeficiente * x;
            g = coeficiente * x;
            b = 0;
            
        } else {
            
            var coeficiente = 255 / width;
            r = 255; 
            g = 255 - (coeficiente * x);
            b = 0;
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



/******************************************************* 
document.getElementById("btn-dibujo").addEventListener("click", dibujar);

let newCanvas = document.getElementById("myNewCanvas");
let ctx2 = newCanvas.getContext("2d");
function dibujar(){
    ctx2.beginPath();
    ctx2.lineWidth = 15;
    ctx2.moveTo(20,20);
    ctx2.lineTo(130,130);
    ctx2.rect(40,40,70,70);
    if(ctx2.strokeStyle == "rgba(255, 0, 0, 0.501960784313726)"){
        return;
    } else {
        ctx2.strokeStyle = "rgba(255,0,0,0.5)";
    }
    ctx2.stroke();
}*/
/******************************************************* 
//document.getElementById("btn-imagen").addEventListener("onload", agregarImagen);
let newCanvas2 = document.getElementById("myNewCanvas2");
let ctx3 = newCanvas2.getContext("2d");

function myDrawImageMethod(imagen){
    ctx3.drawImage(imagen,0,0);
}

let imagen1 = new Image();
imagen1.src = "imagen.jpg";

imagen1.onload = () => {
    myDrawImageMethod(this);
}
*/