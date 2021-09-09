"use strict";

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let heigth = canvas.height;
let pintando = false;
let color = 'black';
let grosor = 1;
let xInicial = 0;
let yInicial = 0;
let filtroGris = false;
let imgWidth = 0;
let imgHeight = 0;
let subioImagen = false;
let r = 0;
let g = 0;
let b = 0;
let a = 255;

canvas.addEventListener("mousedown", apretoClick);
canvas.addEventListener("mouseup", soltoClick);
canvas.addEventListener("mousemove", movioClick);
document.getElementById("btnBorrar").addEventListener("click", borrar);
document.getElementById("btnBorrarTodo").addEventListener("click", borrarTodo);
document.getElementById("color").addEventListener("input", setColor);
document.getElementById("grosor").addEventListener("input", setGrosor);
document.getElementById("negativo").addEventListener("click", negativo);
document.getElementById("gris").addEventListener("click", gris);
document.getElementById("binarizacion").addEventListener("click", binarizacion);
document.getElementById("blur").addEventListener("click", blur);
document.getElementById("brillo").addEventListener("click", brillo);
document.getElementById("contraste").addEventListener("click", contraste);

function setColor(){
    color = document.getElementById("color").value;
}

function setGrosor(){
    grosor = document.getElementById("grosor").value;
}

function apretoClick(e){
    pintando = true;
    ctx.moveTo(e.layerX, e.layerY);
    ctx.beginPath();
    ctx.lineWidth = grosor;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
}

function movioClick(e){
    if(pintando){
        ctx.lineTo(e.layerX, e.layerY);
        ctx.stroke();   
    }
}

function soltoClick(e){
    pintando = false;
}

function borrar(){
    grosor = grosor;
    color = "#FFFFFF";
}

function borrarTodo(){
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0,0,canvas.width, canvas.height)
}

document.getElementById("file").onchange=function(e){
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    
    reader.onload = function(){
        let imagen = new Image();
        imagen.src = reader.result;
        
        imagen.onload = function(){
            ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);
            imgHeight = imagen.height;
            imgWidth = imagen.width;
            subioImagen = true;
        }
    }
};

function getImgData () {
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
};

  function negativo() {
    let imageData = getImgData();
    drawRect(imageData, r, g, b, a);
    
    function drawRect(imageData, r, g, b, a){
        for (let x = 0; x < imageData.width; x++) {
            for (let y = 0; y < imageData.height; y++) {
                setPixel(imageData, x, y, r, g, b, a);
            }
        }
    }

    function setPixel(imageData, x, y, r, g, b, a) {
        let index = ((x + y * imageData.width) *4);

        r = imageData.data[index + 0];
        g = imageData.data[index + 1];
        b = imageData.data[index + 2];
        a = imageData.data[index + 3];

        imageData.data[index + 0] = 255 - r;
        imageData.data[index + 1] = 255 - g;
        imageData.data[index + 2] = 255 - b;

    }


    
    ctx.putImageData(imageData, 0, 0);
};

function brillo() {
    let imageData = getImgData();
    drawRect(imageData, r, g, b, a);
    
    function drawRect(imageData, r, g, b, a){
        for (let x = 0; x < imageData.width; x++) {
            for (let y = 0; y < imageData.height; y++) {
                setPixel(imageData, x, y, r, g, b, a);
            }
        }
    }

    function setPixel(imageData, x, y, r, g, b, a) {
        let index = ((x + y * imageData.width) *4);

        r = imageData.data[index + 0];
        g = imageData.data[index + 1];
        b = imageData.data[index + 2];
        a = imageData.data[index + 3];

        imageData.data[index + 0] = r + 10;
        imageData.data[index + 1] = g + 10;
        imageData.data[index + 2] = b + 10;
        
    }



    
    ctx.putImageData(imageData, 0, 0);
};

function gris() {
   let imageData = getImgData();
   drawRect(imageData, r, g, b, a);
   
    function drawRect(imageData, r, g, b, a){
        for (let x = 0; x < imageData.width; x++) {
            for (let y = 0; y < imageData.height; y++) {
                setPixel(imageData, x, y, r, g, b, a);
            }
        }
    }
    
    function setPixel(imageData, x, y, r, g, b, a) {
        let index = ((x + y * imageData.width) *4);
        
        r = imageData.data[index + 0];
        g = imageData.data[index + 1];
        b = imageData.data[index + 2];
        a = imageData.data[index + 3];

        let gris = Math.round(((r + g + b) / 3));
        
        imageData.data[index + 0] = gris;
        imageData.data[index + 1] = gris;
        imageData.data[index + 2] = gris;
    }
    ctx.putImageData(imageData, 0, 0);
};

function binarizacion() {
   let imageData = getImgData();
   drawRect(imageData, r, g, b, a);
   
    function drawRect(imageData, r, g, b, a){
        for (let x = 0; x < imageData.width; x++) {
            for (let y = 0; y < imageData.height; y++) {
                setPixel(imageData, x, y, r, g, b, a);
            }
        }
    }
    
    function setPixel(imageData, x, y, r, g, b, a) {
        let index = ((x + y * imageData.width) *4);
        let color = 0;

        r = imageData.data[index + 0];
        g = imageData.data[index + 1];
        b = imageData.data[index + 2];
        a = imageData.data[index + 3];

        let gris = ((r+g+b)/3);

        if(gris > (255/2)){   
            color = 255;
        } else {
            color = 0;
        }
        imageData.data[index + 0] = color;
        imageData.data[index + 1] = color;
        imageData.data[index + 2] = color;
    }
    ctx.putImageData(imageData, 0, 0);
};

function contraste() {
    let imageData = getImgData();
    drawRect(imageData, r, g, b, a);
    
     function drawRect(imageData, r, g, b, a){
         for (let x = 0; x < imageData.width; x++) {
             for (let y = 0; y < imageData.height; y++) {
                 setPixel(imageData, x, y, r, g, b, a);
             }
         }
     }
     
     function setPixel(imageData, x, y, r, g, b, a) {
         let index = ((x + y * imageData.width) *4);
         let color = 0;
 
         r = imageData.data[index + 0];
         g = imageData.data[index + 1];
         b = imageData.data[index + 2];
         a = imageData.data[index + 3];
 
         imageData.data[index + 0] = r + 10;
         imageData.data[index + 1] = g + 10;
         imageData.data[index + 2] = b + 10;
     }
     ctx.putImageData(imageData, 0, 0);
 };

function blur() {
    var data = ctx.getImageData(0,0,canvas.width,canvas.height);
    let btnBlur = document.getElementById("blur")
    var px = data.data;
    var tmpPx = new Uint8ClampedArray(px.length);
    tmpPx.set(px);
  
    for (var i = 0, len= px.length; i < len; i++) {
       if (i % 4 === 3) {continue;}
  
       px[i] = ( tmpPx[i] 
          + (tmpPx[i - 4] || tmpPx[i])
          + (tmpPx[i + 4] || tmpPx[i]) 
          + (tmpPx[i - 4 * data.width] || tmpPx[i])
          + (tmpPx[i + 4 * data.width] || tmpPx[i]) 
          + (tmpPx[i - 4 * data.width - 4] || tmpPx[i])
          + (tmpPx[i + 4 * data.width + 4] || tmpPx[i])
          + (tmpPx[i + 4 * data.width - 4] || tmpPx[i])
          + (tmpPx[i - 4 * data.width + 4] || tmpPx[i])
          )/9;
    };
    // data.data = px;
  
    ctx.putImageData(data,0,0);
    tmpPx = null;
    btnBlur.removeAttribute('disabled');
};

function download() {    
    let canvasDownload = canvas;
    if (subioImagen) {
        canvasDownload = setOriginalSize();
    }
    
    let downloadBtn = document.getElementById("download");
    downloadBtn.setAttribute("href", canvasDownload.toDataURL("image/png"));
    downloadBtn.setAttribute("download","archive.png");
};

function setOriginalSize() {
    let canvasJS = document.createElement('canvas');
    canvasJS.width = imgWidth;
    canvasJS.height = imgHeight;
    let ctxJS = canvasJS.getContext('2d');
    ctxJS.drawImage(canvas, 0, 0, canvasJS.width, canvasJS.height);
    return canvasJS;
};