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

canvas.addEventListener("mousedown", apretoClick);
canvas.addEventListener("mouseup", soltoClick);
canvas.addEventListener("mousemove", movioClick);
document.getElementById("btnBorrar").addEventListener("click", borrar);
document.getElementById("btnBorrarTodo").addEventListener("click", borrarTodo);
document.getElementById("color").addEventListener("input", setColor);
document.getElementById("grosor").addEventListener("input", setGrosor);

function setColor(){
    color = document.getElementById("color").value;
}

function setGrosor(){
    grosor = document.getElementById("grosor").value;
}

//CUANDO APRETO CLICK DENTRO DEL CANVAS LE ASIGNO LAS COORDENADAS Y CAMBIO EL FLAG PINTANDO A TRUE
function apretoClick(e){
    pintando = true;
    /* xInicial = e.layerX;
    yInicial = e.layerY; */
    ctx.moveTo(e.layerX, e.layerY);
    ctx.beginPath();
    ctx.lineWidth = grosor;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
}

//MIENTRAS MUEVO EL MOUSE (CON CLICK APRETADO) LLAMO A LA FUNCION DIBUJAR Y LE PASO X1 Y1 X2 Y2
function movioClick(e){
    if(pintando){
        /* console.log(e);
        console.log(canvRect);
        console.log("----------------------------------------------")
        console.log(xInicial, yInicial, e.clientX - canvRect.left, e.clientY - canvRect.top) */

        //dibujar(xInicial, yInicial, e.clientX - canvRect.left, e.clientY - canvRect.top)
        
        /* xInicial = e.layerX;
        yInicial = e.layerY; */
        ctx.lineTo(e.layerX, e.layerY);
        ctx.stroke();   
        //console.log(xInicial, yInicial, e.clientX - canvRect.left, e.clientY - canvRect.top)
    }
}

function soltoClick(e){
    pintando = false;
    /* if(pintando){
        dibujar(xInicial, yInicial, e.clientX - canvRect.left, e.clientY - canvRect.top);
        xInicial = 0;
        yInicial = 0;
        pintando = false;
    } */
}

/* function dibujar(xInicial, yInicial, xFinal, yFinal){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = grosor;
    ctx.moveTo(xInicial, yInicial); //COORDENADA DONDE EMPIEZA LA LINEA
    ctx.lineTo(xFinal, yFinal);     //COORDENADA DONDE TERMINA LA LINEA
    ctx.stroke();                   //TRAZA LA RUTA
    ctx.closePath();                
} */

function borrar(){
    /* if(color != "white"){
        color = document.getElementById("color").value = "#FFFFFF";
    } */
    grosor = grosor;
    color = "#FFFFFF";
    console.log(ctx.fillStyle);
}

function borrarTodo(){
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0,0,canvas.width, canvas.height)
}

document.getElementById('file').onchange=function(e){
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    
    reader.onload = function(){
        let imagen = new Image();
        imagen.src = reader.result;
        
        imagen.onload = function(){
            ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height);
        }
    }
  }