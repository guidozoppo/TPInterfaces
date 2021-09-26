let tablero = document.getElementById("tablero");
let canvasJuego = document.getElementById("juego");
let btnReiniciar = document.getElementById("reiniciar");
let ctx = tablero.getContext("2d");
let ctxJuego = canvasJuego.getContext("2d");

let alertaGanador = document.getElementById("Alerta");

let dx = [ 1, -1, 0, 0, 1, -1, 1, -1];
let dy = [ 0, 0, 1, -1, -1, 1, 1, -1];