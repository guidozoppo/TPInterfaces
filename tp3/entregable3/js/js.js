"use strict"

let juego = document.querySelector("#juego");
let tuberia = document.querySelector("#tuberia");
let espacio = document.querySelector("#espacio");
let pajaro = document.querySelector("#pajaro");
let puntaje = document.querySelector("#puntaje");
let cartelHasPerdido = document.querySelector("#cartelHasPerdido");
let moneda = document.querySelector("#moneda");
let juegoParado = false;
let saltando = false;
let puntos = 0;
let espaciosPasados = 0;
let soundCount = 0;
let gravedadParada = false;

function resetearAnimaciones(){
    const segundos = 2;
    const animacionTuberias = 'movimientoTuberias ' + segundos +"s infinite linear"; 
    tuberia.style.animation = animacionTuberias;
    espacio.style.animation = animacionTuberias;
    moneda.style.animation = 'animacionMoneda 3s infinite linear';
}

function setEventListener(){
    window.addEventListener("resize", _ =>{
        if(juegoParado) return;
        resetearAnimaciones();
    });
    cartelHasPerdido.querySelector( 'button' ).addEventListener( 'click', _ => {
        OcultarCartelGameOver()
        reiniciarGravedad()
        resetearAnimaciones()
        reiniciarPosicionPajaro()
        reiniciarPuntos()
        cambiarPuntos()
        setTimeout(_ => {
            juegoParado = false
        })
    })
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

function reiniciarPosicionPajaro(){
    pajaro.style.top = `30vh`
    pajaro.style.left = `25vw`
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
    controlarColisiones()
    agarroMoneda();
}

function agarroMoneda() {
    let agarroMoneda = detectarChoque(pajaro, moneda);
    if(agarroMoneda && juegoParado == false) {
        puntos+=1;
        cambiarPuntos();
        moneda.style.animation = 'agarroMoneda 4s infinite linear';
    }

}

function controlarColisiones(){
    const colisionTuberia = detectarChoque(pajaro, tuberia);
    let extra = {
        y1: -46,
        y2: 47
    }
    const colisionEspacio = detectarChoque(pajaro, espacio, extra);

    if (colisionTuberia && !colisionEspacio) {
        cambiarPuntos();
        return perdio();
    } else if (colisionEspacio) {
        puntos++; 
        if (puntos > 35) {
            //play hole sound
            soundCount = 0;
        }

        cambiarPuntos();
        if(juegoParado) return;

        espaciosPasados++;
        if(espaciosPasados > 150) {
            espaciosPasados = 0;
        }
    }
}

function perdio(){
    juegoParado = true;
    cartelGameOver();
    pararGravedad();
    pararAnimacionTuberia();
    pararAnimacionMoneda();
    //pararAnimacionFondo();
    console.log("perdiste");
}

function cartelGameOver(){
    cartelHasPerdido.style.display = '';
}

function OcultarCartelGameOver(){
    cartelHasPerdido.style.display = 'none';
}

function pararAnimacionTuberia(){
    const blockLeft = tuberia.getBoundingClientRect().x;
    tuberia.style.animation = "";
    espacio.style.animation = "";
    
    tuberia.style.left = blockLeft + 'px';
    espacio.style.left = blockLeft + 'px';
}

function pararAnimacionMoneda() {
    moneda.style.animation = "";
}

function pararGravedad(){
    gravedadParada = true;
}
function reiniciarGravedad(){
    gravedadParada = false;
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

function reiniciarPuntos(){
    puntos = 0;
}

function cambiarPuntos(){
    puntaje.innerText = puntos + ' puntos';
    document.querySelector(".puntos").innerText = puntaje.innerText;

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
        console.log("A");
    })
}

function cambiarPosMoneda() {
    moneda.addEventListener('animationiteration', _ => {
        const x = getRandomNumber(0, 600);
        moneda.style.top = x + 'px';
        console.log("AAAAAAAAAAAAaa");
        moneda.style.animation = 'animacionMoneda 3s infinite linear';
    })
}

function iniciarJuego(){
    resetearAnimaciones();
    setEventListener();
    iniciarEspacios();
    iniciarGravedad();
    cambiarPosMoneda();
}

function iniciarGravedad(){
    setInterval(_ =>{
        if(saltando || juegoParado) return;
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

function detectarChoque(el1, el2, extra){
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    extra = extra || {
        y1:0, y2:0
    }

    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height + extra.y1 &&
        rect1.y + rect1.height > rect2.y + extra.y2
    )
}

iniciarJuego();
