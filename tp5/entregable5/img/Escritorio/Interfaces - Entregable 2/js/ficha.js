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

    //dibujo la ficha con la imagen correspondiente dependiendo del color 
    dibujar() {
        this.ctx.drawImage(this.ficha, this.posX, this.posY, this.tamanioFicha, this.tamanioFicha);//dibujo rojas con la imágen por defecto
    }

    getRadio() {
        return this.tamanioFicha / 2;
    }

    getColor() {
        return this.color;
    }
    
    //calculo si estoy dentro d ela ficha
    isPointInside(x, y) {
        let radius = this.getRadio();
        let _x = (this.posX + radius) - x;
        let _y = (this.posY + radius) - y;
        return Math.sqrt(_x * _x + _y * _y) < radius;
    }

    //obtengo posición
    getPosition() {
        return {
            x: this.posX,
            y: this.posY
        }
    }
    
    //deshabilito y habilito fichas
    setDeshabilito() {
        this.habilitada = false;
    }

    setHabilito() {
        this.habilitada = true;
    }

    //obtengo el estado de la ficha
    getHabilitada() {
        return this.habilitada;
    }

    //seteo una nueva posición
    setPosition(x, y) {
        this.posX = x - this.getRadio();
        this.posY = y - this.getRadio();
    }

    setResaltar(resaltada) {
        this.resaltada = resaltada;
    }

    setfinalizoTurno(drop){
        this.finalizoTurno = drop;
    }

    getFinalizoTurno(){
        return this.finalizoTurno;
    }

    volverAlLugar() {
        this.posX = this.posOriginalX - this.getRadio();
        this.posY = this.posOriginalY - this.getRadio();
        this.setfinalizoTurno(false);
    }
}