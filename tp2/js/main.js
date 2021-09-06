let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

const CANT_FIG = 30;

let figures = [];
let lastClickedFigura = null;
let isMouseDown = false;

function addFigure(){
    if(Math.random() > 0.5) {
        addRect();
    } else {
        addCircle();
    }
    drawFigure();
}

function drawFigure(){ //BORRA Y REDIBUJA TODO
    clearCanvas();
    for (let i = 0; i < figures.length; i++) {
        figures[i].draw();
    }
}

function addRect(){
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();

    let recta = new rect(posX, posY, 20, 20, color, ctx);
    figures.push(recta);
}

function addCircle(){
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();
    
    let circuloo = new circulo(posX, posY, 10, color, ctx);
    figures.push(circuloo);
}

function onMouseDown(e){
    isMouseDown = true;

    if(lastClickedFigura != null){ //Si deje de seleccionar una figura la resalto = false
        lastClickedFigura.setResaltado(false);
        lastClickedFigura = null;
    }

    let clickFig = findClickedFigure(e.layerX, e.layerY); //Miro si alguna de todas mis figuras fue clickeada
    if(clickFig != null) { //SI EL FOR de findClickedFigure me devolvio algo es porque cliquie a una figura
        clickFig.setResaltado(true); //resaslto la figura clickeada
        lastClickedFigura = clickFig; //me guardo la figura clickeada
    }
    drawFigure(); //dibujo todas las figuras
}

function onMouseMove(e){
    if(isMouseDown && lastClickedFigura != null) { //SI EL MOUSE ESTA CLICKEADO Y TENGO UNA FIGURA SELECCIONADA
        lastClickedFigura.setPosition(e.layerX, e.layerY); //A LA FIGURA SELECCIONADA LE PONGO LA NUEVA POSICION
        drawFigure();
    }
}

function onMouseUp(){
    isMouseDown = false;
}

for (let index = 0; index < 10; index++) {
    ctx.fillStyle = randomRGBA();
    ctx.beginPath();
    ctx.arc(Math.round(Math.random() * canvasWidth), Math.round(Math.random() * canvasHeight), 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

for (let index = 0; index < 10; index++) {
    ctx.fillStyle = randomRGBA();
    ctx.fillRect(Math.round(Math.random() * canvasWidth), Math.round(Math.random() * canvasHeight), Math.round(Math.random() * 50), Math.round(Math.random() * 20));
}

function clearCanvas(){
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0,0,canvasWidth, canvasHeight);
}

function randomRGBA(){
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return 'rgba('+r+','+g+','+b+','+a+')';
}

function addFigures(){
    addFigure();
    if(figures.length < CANT_FIG){
        setTimeout(addFigures, 333);
    }
}

setTimeout(() => {
    addFigures();
}, 1111);

function findClickedFigure(x, y) { //RECORRO TODAS LAS FIGURAS Y LLAMO AL METODO isPointInside
    for (let i = 0; i < figures.length; i++) {
        const element = figures[i];
        if(element.isPointInside(x, y)) {
            return element;
        }
        
    }
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);