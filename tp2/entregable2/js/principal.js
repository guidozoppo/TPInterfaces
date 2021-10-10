"use strict";
document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.querySelector("#canvas");
    let ctx = canvas.getContext("2d");

    //se crea el juego con filas y columnas en null ya que dichos valores se van a asignar en la clase juego
    let juego = new Juego(canvas, ctx, null, null);
    
    
    document.querySelector("#reset").addEventListener("click", reset);
    document.querySelector("#canvas").addEventListener("mouseup", onMouseUp);
    document.querySelector("#canvas").addEventListener("mousedown", onMouseDown);
    document.querySelector("#canvas").addEventListener("mousemove", onMouseMove);
    
    document.querySelectorAll(".btn-iniciarJuego").forEach((item) => {
            item.addEventListener("click", (e) => { //SE LES ASIGNA LOS EVENTOS A LOS DESPLEGABLES 
            let objetivo = parseInt(e.target.getAttribute("objetivo"))
            iniciarJuego(objetivo); //se inicia el juego y se pasa el objetivo (cant de fichas en linea para ganar)
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
        juego.habilitarFichas();
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