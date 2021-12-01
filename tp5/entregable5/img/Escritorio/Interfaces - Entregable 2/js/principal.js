"use strict";
document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.querySelector("#canvas");
    let ctx = canvas.getContext("2d");
    
    let filas = 6;
    let columnas = 7;
    let juego = new Juego(canvas, ctx, filas, columnas);
    
    
    document.querySelector("#reset").addEventListener("click", reset);
    document.querySelector("#canvas").addEventListener("mouseup", onMouseUp);
    document.querySelector("#canvas").addEventListener("mousedown", onMouseDown);
    document.querySelector("#canvas").addEventListener("mousemove", onMouseMove);
    
    document.querySelectorAll(".btn-iniciarJuego").forEach((item) => {
        /* filas = 6;
        columnas = 7;
        iniciarJuego(); */
        item.addEventListener("click", (e) => {
            let objetivo = parseInt(e.target.getAttribute("objetivo"))
            iniciarJuego(objetivo);
            var elemento = document.getElementsByClassName("inicio");
            for(var i = 0; i < elemento.length; i++) {
                elemento[i].classList.add("inicioShow");
            }
            var elemento2 = document.getElementById("game").classList.remove("gameIntro");   
            });
           
    });
    
    function reset(){
        location.reload();
    }
    
    
    function iniciarJuego(objetivo){
        juego.inicJuego(objetivo);
        juego.cambiarTurno();
        juego.enableTokens();
    }

    function onMouseUp(e){
        juego.onMouseUp(e);
    }
    function onMouseDown(e){
        juego.onMouseDown(e);
    }
    function onMouseMove(e){
        juego.onMouseMove(e);
    }
    

})