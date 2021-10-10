"use strict"
class Ranura{
    constructor(posX, posY, context, columnas) {
        this.posX = posX;
        this.posY = posY;
        this.ctx = context;
        this.columnas = columnas;
        this.tamanioFicha = 50;
        this.setPosition(posX, posY);
    }
    
    //dibujo la ranura de color gris, donde se va a largar la ficha
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
  
    //verifico si la ficha esta sobre la ranura
    estaSobreRanura(ficha) {
        let ultPosX = ficha.getPosition().x
        let ultPosY = ficha.getPosition().y
        let posSoltoInicial = this.getPosition().x;
        let posSoltoFinal = this.getPosition().x + this.tamanioFicha * this.columnas;
        let posInicialEnY = this.getPosition().y;
        let posFinalEnY = this.getPosition().y + this.tamanioFicha / 2;
        if (ultPosX + this.tamanioFicha / 2 > posSoltoInicial && ultPosX < posSoltoFinal 
            && ultPosY + this.tamanioFicha / 2 > posInicialEnY && ultPosY < posFinalEnY) {
            return true;
        } else {
            return false;
        }
    }

    //calculo la columna donde se suelta la ficha 
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

    getPosition() {
        return {
            x: this.posX,
            y: this.posY
        }
    }
    
    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }
    


}