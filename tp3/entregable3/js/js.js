"use strict"

let juego = document.querySelector("#juego");
let tuberia = document.querySelector("#tuberia");
let espacio = document.querySelector("#espacio");
let pajaro = document.querySelector("#pajaro");
let puntaje = document.querySelector("#puntaje");
let cartelHasPerdido = document.querySelector("#cartelHasPerdido");
let moneda = document.querySelector("#moneda");
let layers = document.querySelectorAll(".layer");
let juegoParado = false;
let saltando = false;
let puntos = 0;
let espaciosPasados = 0;
let gravedadParada = false;

document.querySelector("#play").addEventListener("click", iniciarJuego);
function resetearAnimaciones(){
    const animacionTuberias = 'movimientoTuberias 2s infinite linear'; 
    tuberia.style.animation = animacionTuberias;
    espacio.style.animation = animacionTuberias;
    pajaro.style.animation = "fly .8s steps(10) infinite";
    for (let i = 1; i < layers.length; i++) {
        layers[i].style.animation = "movebg "+ parseInt(8-i)+"s infinite linear";
    }

    if(moneda.style.display !== "none") return;
    moneda.style.animation = "animacionMoneda 3s infinite linear"
}

function setEventListener(){
    window.addEventListener("resize", _ =>{ //para controlar el tamaño de la pantalla
        if(juegoParado) return;
        resetearAnimaciones();
    });
    cartelHasPerdido.querySelector( 'button' ).addEventListener( 'click', _ => { //Para volver a jugar
        OcultarCartelGameOver();
        reiniciarGravedad();
        resetearAnimaciones();
        iniciarEspacios();
        reiniciarPosicionPajaro();
        reiniciarPuntos();
        cambiarPuntos();
        juegoParado = false
    })
    document.body.parentElement.addEventListener("click", _ => { //Cada vez que se hace click salta
        if(juegoParado) return;
        saltar();
    })
    document.onkeypress = function (e) { //Lo mismo pero con la barra, cuando se aprieta la barra, salta
        e = e || window.event
        if(e.keyCode === 32) {
            if(juegoParado) return;
            saltar();
        }
    }
}

function reiniciarPosicionPajaro(){ //Se posiciona al pajaro en las posiciones establecidas
    pajaro.style.top = `30vh`
    pajaro.style.left = `25vw`
}

function saltar(){
    saltando = true;
    let contadorSaltos = 0; 
    const intervaloSaltos = setInterval( _ => {
        cambiarEstado(-3,'up')
        
        if(contadorSaltos > 20) { //para que el pajaro no se mantenga arriba
            clearInterval(intervaloSaltos)
            saltando = false;
            contadorSaltos = 0;
        }
        contadorSaltos++; 
    }, 5)
    
}

function cambiarEstado(diff, direction){
    cambiarAnimationPajaro(direction) //dependiendo la direccion la animacion del pajaro va a cambiar
    cambiarPositionPajaro(diff) 
    controlarColisiones() //cuand cambio el estado debo controlar que no se choque nada o que haya pasado por las tuberias o agarrado la moneda
    agarroMoneda();
}

function agarroMoneda() {
    if(moneda.style.display == "none") return; //si la monead está oculta no la puede agarrar -> return;
    
    let agarroMoneda = detectarChoque(pajaro, moneda);
    if(agarroMoneda) { //si agarro moneda se la oculta y se modifica el puntaje
        puntos+=1000;
        ocultarMoneda();
        cambiarPuntos();
    }

}

function ocultarMoneda(){
    moneda.style.display = "none";
}

function controlarColisiones(){ //detecto si choco la tuberia o si paso por el espacio
    const colisionTuberia = detectarChoque(pajaro, tuberia);
    let extra = {
        y1: -46,
        y2: 47
    }
    const colisionEspacio = detectarChoque(pajaro, espacio, extra);

    if (colisionTuberia && !colisionEspacio) { //choco tuberia
        cambiarPuntos();
        return perdio();
    } else if (colisionEspacio) { //paso por el espacio
        puntos++; 
        cambiarPuntos();

        if(juegoParado) return;
        espaciosPasados++;

        if(espaciosPasados > 120) { //cada tantos espacios pasados mostrar moneda
            espaciosPasados = 0;
            mostrarMoneda();
            setTimeout(_ => 
                ocultarMoneda(), 2000) //visibilidad de la moneda 2 segundos
        }
    }
}

function perdio(){
    juegoParado = true;
    cartelGameOver();
    pararGravedad();
    pararAnimacionTuberia();
    pararAnimacionMoneda();
    ocultarMoneda();
    layers.forEach(l => {
        l.style.animation = "none";
    });
    pajaro.style.animation = "none";
}

function cartelGameOver(){
    cartelHasPerdido.style.display = '';
}

function OcultarCartelGameOver(){
    cartelHasPerdido.style.display = 'none';
}

function pararAnimacionTuberia(){ //cuando se choca la tuberia se queda quieta
    const posicion = tuberia.getBoundingClientRect().x; //obtengo la posicion de la tuberia
    tuberia.style.animation = "";
    espacio.style.animation = "";
    
    tuberia.style.left = posicion + 'px';
    espacio.style.left = posicion + 'px';
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

function cambiarAnimationPajaro(direction){ //segun la direccion el pajaro va a aletear y subir o bajar
    if(direction === 'down'){
        /* pajaro.classList.remove('volar');
        pajaro.classList.add('bajar') */
        pajaro.style.animation = "fly .8s steps(10) infinite, bajar 0.2s forwards"
    } else if(direction === 'up'){
        /* pajaro.classList.add('volar')
        pajaro.classList.remove('bajar'); */
        pajaro.style.animation = "fly .8s steps(10) infinite, subir 0.2s forwards"
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
    const positionTop = parseInt (getCssProp(pajaro, 'top')); //obtiene la posicion "top" del pajaro
    const changeTop = positionTop + direction;
    if(changeTop < 0) {
        return; //controla que no vyaa mas arriba del borde superior
    } else if (changeTop > window.innerHeight){ //controla que si choca el piso pierda
        return perdio();
    }
    pajaro.style.top = changeTop + "px";  //cambia la posicion del pajaro
}

function iniciarEspacios(){
    espacio.addEventListener('animationiteration', _ => {
        const fromHeight = 60 * window.innerHeight/100; //saco un porcentaje de la altura del viewport
        const toHeigth = 95 * window.innerHeight/100; //fromHeigth y toHeigth sirven para buscar una posicion aleatoria del espacio
        const randomTop = getRandomNumber(fromHeight, toHeigth); //obtengo una posicion al azar para los espacios 
        espacio.style.top = '-' + randomTop + 'px';
    })
}

/* function cambiarPosMoneda() {
    moneda.addEventListener('animationiteration', _ => {
        const x = getRandomNumber(0, 600);
        moneda.style.top = x + 'px';
        console.log("AAAAAAAAAAAAaa");
        moneda.style.animation = 'animacionMoneda 3s infinite linear';
    })
} */

function mostrarMoneda() {
    if(moneda.style.display !== "none") return;

    moneda.style.display = "";
    moneda.style.top = getRandomNumber(20,80)+"%";
    console.log(moneda.style.top)
}

function iniciarJuego(){
    resetearAnimaciones();
    setEventListener();
    iniciarEspacios();
    iniciarGravedad();
    cambiarPositionPajaro(-700);
    document.querySelector(".informativo").style.display = "none";
    //cambiarPosMoneda();
}

function iniciarGravedad(){ //cada 20ms si el juego no está parado o el personaje no está saltando se aplicará gravedad y bajará de posicion
    setInterval(_ =>{
        if(saltando || juegoParado) return;
        cambiarEstado(10, 'down')
    }, 10)
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getCssProp(element, cssProperty){
    return window
        .getComputedStyle(element) //obtengo las propiedades y valores css del elemento
        .getPropertyValue(cssProperty) //obtengo el valor de la propiedad css que recibe por parametro
}

function detectarChoque(el1, el2, extra){
    const rect1 = el1.getBoundingClientRect(); //obtengo la posicion del el1 pajaro
    const rect2 = el2.getBoundingClientRect(); //obtengo la posicion del el2 tuberia

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

//iniciarJuego();
