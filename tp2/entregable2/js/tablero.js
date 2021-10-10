"use strict";
class Tablero {
    constructor(canvas, ctx, filas, columnas) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.filas = filas;
        this.columnas = columnas;
        this.cuadradito = new Image();
        this.cuadradito.src = "images/casillero.png";
        this.tamanio = 50;
        this.contador = 0;
        this.matriz = [];
        this.ranurita;
        this.cargarMatriz();
        this.cargarTablero();
        this.cargarRanurita();
        this.dropped = false;
    }

    //cargo la matriz vacia para el tablero
    cargarMatriz() {
        for (let i = 0; i < this.columnas; i++) {
            this.matriz[i] = [];
            for (let j = 0; j < this.filas; j++) {
                this.matriz[i][j] = null;
            }
        }
    }
    
    //llamo a dibujar la ranura
     cargarRanurita() {
        this.ranurita = this.dibujarRanura();
    }

    //dibujo la ranura
     dibujarRanura() {
        let x = this.calculatePosition().x;
        let y = this.calculatePosition().y;
        let ranurita = new Ranura(x, y, this.ctx, this.columnas);
        ranurita.draw();
        return ranurita;
    }

    //dibujo el tablero
    cargarTablero() {
        this.cuadradito.onload = function () {
            this.dibujarTablero();
        }.bind(this);
    }
    
    calculatePosition() {
        return {
            x: (this.canvas.width / 2) - ((this.columnas / 2) * this.tamanio),
            y: (this.canvas.height / 2) - ((this.filas / 2) * this.tamanio)
        }
    }
   
    //dibujo el tablero
    dibujarTablero() {
        let x = this.calculatePosition().x;
        let y = this.calculatePosition().y
        let patron = this.ctx.createPattern(this.cuadradito, 'repeat');
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.fillStyle = patron;
        this.ctx.fillRect(0, 50, this.cuadradito.width * this.columnas, this.cuadradito.height * this.filas);
        this.ctx.restore()
    }
    
    //verifico si la posición de la ficha esta en la ranura
    estaSobreLaRanura(ficha) {
        if (ficha && this.ranurita.estaSobreRanura(ficha)) {
            return true;
        } else {
            return false;
        }

    }
    
    //verifico que hay lugar en la columna donde se suelta la ficha
    agregarFicha(ficha) {
        let x = this.ranurita.getPosition().x;
        let y = this.ranurita.getPosition().y + this.tamanio;

        let radius = this.ranurita.getRadio();
        let i = this.ranurita.getColumna(ficha);
        x = x + i * this.tamanio;

        if (i < 0) {
            ficha.volverAlLugar();
            return;
        }
        
        this.dropped = false;
        for (let j = this.filas - 1; j >= 0; j--) {
            if (this.matriz[i][j] == null && !this.dropped) {
                y = y + j * this.tamanio;
                ficha.setPosition(x + radius, y + radius);
                this.matriz[i][j] = ficha;
                this.dropped = true;
                this.contador += 1;
                ficha.setDeshabilito();
                ficha.finalizoTurno = true;
            }
        }
        
    }
    
    //cuento las fichas
    getContador() {
        return this.contador;
    }
    
    ganadoraHorizontal(lastTokenClicked, maxTokensToWin) {
        let posJ;
        //fila y columna  de la última ficha agregada
        for (let i = 0; i < this.columnas; i++) {
            for (let j = 0; j < this.filas; j++) {
                if (this.matriz[i][j] === lastTokenClicked) {
                    posJ = j;
                }
            }
        }
        let countTokens = 1;
        
        for (let i = 0; i < this.columnas - 1; i++) {
            if (this.matriz[i + 1][posJ] && this.matriz[i][posJ] && this.matriz[i][posJ].getColor() == this.matriz[i + 1][posJ].getColor() && countTokens < maxTokensToWin) {
                countTokens++;
            } else {
                if (countTokens < maxTokensToWin) {
                    countTokens = 1;
                }
            }
        }
        return countTokens >= maxTokensToWin;
    }
    
    ganadoraVertical(lastTokenClicked, maxTokensToWin) {
        let posI;
        
        for (let i = 0; i < this.columnas; i++) {
            for (let j = 0; j < this.filas; j++) {
                if (this.matriz[i][j] === lastTokenClicked) {
                    posI = i;
                }
            }
        }
        let countTokens = 1;

        if (!Number.isInteger(posI)) {
            lastTokenClicked.volverAlLugar();
            return;
        }

        
        for (let j = 0; j < this.filas - 1; j++) {
            if (
                this.matriz[posI][j + 1] && this.matriz[posI][j] &&
                this.matriz[posI][j].getColor() == this.matriz[posI][j + 1].getColor() && 
                countTokens < maxTokensToWin
            ) {
                countTokens++;
            } else {
                if (countTokens < maxTokensToWin) {
                    countTokens = 1;
                }
            }
        }
        return countTokens >= maxTokensToWin;
    }
    
    ganadoraDiagonalAscendente(lastTokenClicked, maxTokensToWin) {
        let posI;
        let posJ;
        for (let i = 0; i < this.columnas; i++) {
            for (let j = 0; j < this.filas; j++) {
                if (this.matriz[i][j] === lastTokenClicked) {
                    posI = i;
                    posJ = j
                }
            }
        }

        let i = posI;
        let j = posJ;

        while ((i > 0 && j < this.filas - 1) && this.matriz[i][j] && this.matriz[i - 1][j + 1] && this.matriz[i][j].getColor() == this.matriz[i - 1][j + 1].getColor()) {
            i--;
            j++;
        }
        
        let countTokens = 1;
        while (i < this.columnas - 1 && j > 0) {
            if (this.matriz[i][j] && this.matriz[i + 1][j - 1] && this.matriz[i][j].getColor() == this.matriz[i + 1][j - 1].getColor() && countTokens < maxTokensToWin) {
                countTokens++;
            } else {
                if (countTokens < maxTokensToWin) {
                    countTokens = 0;
                }
            }
            i++;
            j--;
        }
        return countTokens >= maxTokensToWin;
    }
    
    ganadoraDiagonalDescendente(lastTokenClicked, maxTokensToWin) {
        let posI;
        let posJ;
        
        for (let i = 0; i < this.columnas; i++) {
            for (let j = 0; j < this.filas; j++) {
                if (this.matriz[i][j] === lastTokenClicked) {
                    posI = i;
                    posJ = j
                }
            }

        }
        let i = posI;
        let j = posJ;
        
        while ((i > 0 && j > 0) && (this.matriz[i][j] && this.matriz[i - 1][j - 1] && this.matriz[i][j].getColor() == this.matriz[i - 1][j - 1].getColor())) {
            i--;
            j--;
        }
        let countTokens = 1;
        
        while (i < this.columnas - 1 && j < this.filas - 1) {
            if (this.matriz[i][j] && this.matriz[i + 1][j + 1] && this.matriz[i][j].getColor() == this.matriz[i + 1][j + 1].getColor() && countTokens <= maxTokensToWin) {
                countTokens++;
            } else {
                if (countTokens < maxTokensToWin) {
                    countTokens = 1;
                }
            }
            i++;
            j++;
        }
        return countTokens >= maxTokensToWin;
    }


}