"use strict";
class Ficha{

    constructor(posX, posY, color, context, img) {
        this.posOriginalX = posX;
        this.posOriginalY = posY;
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.ctx = context;
        this.ficha = new Image();
        this.ficha.src = img;
        this.tamanioFicha = 40;
        this.resaltada = false;
        this.colorResalto = '#c4f8f8';
        this.habilitada = false;
        this.setPosition(posX, posY);
        this.loadImages();
        this.finalizoTurno = true;
    }
    
    loadImages() {
        this.ficha.onload = function () {
            this.dibujar();             
        }.bind(this);
    }

    //dibujo la ficha
    dibujar() {
        this.ctx.drawImage(this.ficha, this.posX, this.posY, this.tamanioFicha, this.tamanioFicha);
    }

    getRadio() {
        return this.tamanioFicha / 2;
    }

    getColor() {
        return this.color;
    }
    
    //calculo si el click dentro de la ficha
    isPointInside(x, y) {
        let radius = this.getRadio();
        let _x = (this.posX + radius) - x;
        let _y = (this.posY + radius) - y;
        return Math.sqrt(_x * _x + _y * _y) < radius;
    }

    getPosition() {
        return {
            x: this.posX,
            y: this.posY
        }
    }

    //deshabilito las fichas del noturno
    setDeshabilito() {
        this.habilitada = false;
    }
    
    //deshabilito las fichas del turno
    setHabilito() {
        this.habilitada = true;
    }

    getHabilitada() {
        return this.habilitada;
    }

    setPosition(x, y) {
        this.posX = x - this.getRadio();
        this.posY = y - this.getRadio();
    }

    setfinalizoTurno(drop){
        this.finalizoTurno = drop; //finaliza cuando suelta la ficha dentro del tablero o se termianel tiempo
    }

    getFinalizoTurno(){
        return this.finalizoTurno;
    }

    volverAlLugar() { //la ficha vuelve a la posicion original cuando no es posicionada correctamente en el tablero
        this.posX = this.posOriginalX - this.getRadio();
        this.posY = this.posOriginalY - this.getRadio();
        this.setfinalizoTurno(false);
    }
}