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
        console.log(imagen.width);
        
        imagen.onload = function(){
            console.log(imagen.width);
            //ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height);
            ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);
        }
    }
}

function getImgData () {
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

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


/* document.getElementById("btnDescargar").addEventListener("click", () => {
    // Crear un elemento <a>
    let enlace = document.createElement('a');
    // El título
    enlace.download = "Canvas como imagen.png";
    // Convertir la imagen a Base64 y ponerlo en el enlace
    enlace.href = canvas.toDataURL();
    // Hacer click en él
    enlace.click();
}); */

function download() {
    var download = document.getElementById("download");
    var image = document.getElementById("myCanvas").toDataURL("image/png").replace("image/png", "image/octet-stream");
    //download.setAttribute("href", image);
    download.setAttribute("download","archive.png");
    }
