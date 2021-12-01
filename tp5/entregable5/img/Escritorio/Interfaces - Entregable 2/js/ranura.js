"use strict"
class Ranura{
    constructor(posX, posY, context, columnas) {
        this.posX = posX;
        this.posY = posY;
        this.ctx = context;
        this.columnas = columnas;
        this.tamanioFicha = 50;
        this.resaltado = false;
        this.colorResaltado = '#c4f8f8';
        this.setPosition(posX, posY);
    }
    
    //dibujo la ficha con la imagen correspondiente dependiendo del color 
    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.posX, this.posY, this.columnas*this.tamanioFicha, 50);
        this.ctx.fillStyle = "grey";
        this.ctx.fill();
        this.ctx.closePath();
    }

    getRadio() {
        return this.tamanioFicha / 2;
    }
  
    //verifico si estoy en la drop zone
    estaSobreRanura(ficha) {
        let ultPosX = ficha.getPosition().x
        let ultPosY = ficha.getPosition().y
        let posSoltoInicial = this.getPosition().x;
        let posSoltoFinal = this.getPosition().x + this.tamanioFicha * this.columnas;
        let posInicialEnY = this.getPosition().y;
        let posFinalEnY = this.getPosition().y + this.tamanioFicha / 2;
        if (ultPosX + this.tamanioFicha / 2 > posSoltoInicial && ultPosX < posSoltoFinal && ultPosY + this.tamanioFicha / 2 > posInicialEnY && ultPosY < posFinalEnY) {//comparo a partir de los límites de la drop zone
            return true;
        } else {
            return false;
        }
    }

    //calculo en que columa se encuentra la ficha arrojada en la zona de lanzamiento de fichas 
    getColumna(ficha) {
        let ultPosX = ficha.getPosition().x;
        let posSoltoInicial = this.getPosition().x;
        let posSoltoFinal = this.getPosition().x + this.tamanioFicha;
        for (let index = 0; index < this.columnas; index++) {
            if (ultPosX > posSoltoInicial && ultPosX < posSoltoFinal) {
                return index;
            }
            posSoltoInicial = posSoltoFinal;
            posSoltoFinal = posSoltoFinal + this.tamanioFicha;
        }
        return -1;
    }

    //obtengo la posición de la ficha en x y en y
    getPosition() {
        return {
            x: this.posX,
            y: this.posY
        }
    }
    //seteo una nueva posición
    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }
    //resaltado
    setHighlight(resaltado) {
        this.resaltado = resaltado;
    }


}