"use strict"

let juego = document.querySelector("#juego");
let tuberia = document.querySelector("#tuberia");
let espacio = document.querySelector("#espacio");
let pajaro = document.querySelector("#pajaro");
let puntaje = document.querySelector("#puntaje");
let cartelHasPerdido = document.querySelector("#cartelHasPerdido");
let juegoParado = false;
let saltando = false;

function resetearAnimacion(){
    const segundos = 2;
    const animacionTuberias = 'movimientoTuberias ' + segundos +"s infinite linear"; 
    tuberia.style.animation = animacionTuberias;
    espacio.style.animation = animacionTuberias;
}

function setEventListener(){
    window.addEventListener("resize", _ =>{
        if(juegoParado) return;
        resetearAnimacion();
    });
    document.body.parentElement.addEventListener("click", _ => {
        if(juegoParado) return;
        saltar();
    })
    document.onkeypress = function (e) {
        e = e || window.event
        if(e.keyCode === 32) {
            if(juegoParado) return;
            saltar();
        }
    }
}

function saltar(){
    saltando = true;
    let contadorSaltos = 0; 
    const intervaloSaltos = setInterval( _ => {
        cambiarEstado(-3,'up')

        if(contadorSaltos > 20) {
            clearInterval(intervaloSaltos)
            saltando = false;
            contadorSaltos = 0;
        }
        contadorSaltos++;
    }, 10)
}

function cambiarEstado(diff, direction){
    cambiarAnimationPajaro(direction)
    cambiarPositionPajaro(diff)
}

function cambiarAnimationPajaro(direction){
    if(direction === 'down'){
        pajaro.classList.remove('volar');
        pajaro.classList.add('bajar')
    } else if(direction === 'up'){
        pajaro.classList.add('volar')
        pajaro.classList.remove('bajar');
    }
}

function cambiarPositionPajaro(direction){
    const positionTop = parseInt (getCssProp(pajaro, 'top'))
    const changeTop = positionTop + direction
    if(changeTop < 0) {
        return;
    } else if (changeTop > window.innerHeight){
        //return console.log("perdiste");
    }
    pajaro.style.top = changeTop + "px"; 
}

function iniciarEspacios(){
    espacio.addEventListener('animationiteration', _ => {
        const fromHeight = 60 * window.innerHeight/100;
        const toHeigth = 95 * window.innerHeight/100;
        const randomTop = getRandomNumber(fromHeight, toHeigth);
        espacio.style.top = '-' + randomTop + 'px';
    })
}

function iniciarJuego(){
    resetearAnimacion();
    setEventListener();
    iniciarEspacios();
    iniciarGravedad();
}

function iniciarGravedad(){
    setInterval(_ =>{
        cambiarEstado(5, 'down')
    }, 20)
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getCssProp(element, cssProperty){
    return window
        .getComputedStyle(element)
        .getPropertyValue(cssProperty)
}

iniciarJuego();
