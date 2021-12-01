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
    //cargo con vacio la matriz para el tablero donde se colocaran las fichas
    cargarMatriz() {
        for (let i = 0; i < this.columnas; i++) {
            this.matriz[i] = [];
            for (let j = 0; j < this.filas; j++) {
                this.matriz[i][j] = null;
            }
        }
    }
    //se dibuja la zona de lanzamiento de fichas
     cargarRanurita() {
        this.ranurita = this.dibujarRanura();
    } 
    //dibujo la zona habilitada para arrojar las fichas
     dibujarRanura() {
        let x = this.calculatePosition().x;
        let y = this.calculatePosition().y; //le resto el tamaño de la ficha de drop zone para dibujar una fila antes del tablero
        let ranurita = new Ranura(x, y, this.ctx, this.columnas);
        ranurita.draw();
        return ranurita;
    } 
    //se dibuja el tablero
    cargarTablero() {
        this.cuadradito.onload = function () {
            this.dibujarTablero();
        }.bind(this);
    }
    //calculo el centro para dibujar el tablero
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
        this.ctx.fillRect(0, 50, this.cuadradito.width * this.columnas, this.cuadradito.height * this.filas); //por aca se cambia el tamaño
        this.ctx.restore()
    }
    //verifico si la posición de la última figura clickeada coincide con alguna posición de la drop zone
    estaSobreLaRanura(ficha) {
        if (ficha && this.ranurita.estaSobreRanura(ficha)) {//cada ficha sabe si está en la drop zone
            return true;//acomodar ésto a lo nuevo
        } else {
            return false;
        }

    }
    //verifico que hay lugar en la columna de la matriz donde el usuario quiere agregar una ficha recorriendo desde abajo hacia arriba
    agregarFicha(ficha) {
        let x = this.ranurita.getPosition().x;
        let y = this.ranurita.getPosition().y + this.tamanio;

        let radius = this.ranurita.getRadio();//obtengo el radio
        let i = this.ranurita.getColumna(ficha);
        x = x + i * this.tamanio;//obtengo la posición en x donde debe situar la ficha

        if (i < 0) {
            ficha.volverAlLugar();
            return;
        }
        
        this.dropped = false;
        for (let j = this.filas - 1; j >= 0; j--) {
            if (this.matriz[i][j] == null && !this.dropped) {
                y = y + j * this.tamanio;//obtengo la posición en y donde debe situar la ficha
                ficha.setPosition(x + radius, y + radius);//asigno nuevas posiciones
                this.matriz[i][j] = ficha;//situo la ficha
                this.dropped = true;
                this.contador += 1;
                ficha.setDeshabilito();//se deshabilita la ficha jugada
                ficha.finalizoTurno = true;
            }
        }
        
    }
    //cuento las fichas arrojadas
    getContador() {
        return this.contador;
    }
    //verifico si hay algún ganador en las filas
    isHorizontalWinner(lastTokenClicked, maxTokensToWin) {
        let posJ;
        //obtengo la fila y columna  de la última ficha agregada
        for (let i = 0; i < this.columnas; i++) {
            for (let j = 0; j < this.filas; j++) {
                if (this.matriz[i][j] === lastTokenClicked) {
                    posJ = j;
                }
            }
        }
        let countTokens = 1;
        //evaluo que no tenga null la matriz y coincida el color de la última ficha clickeada con las de la fila
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
    //verifico si hay algún ganador en las columnas
    isVerticalWinner(lastTokenClicked, maxTokensToWin) {
        let posI;
        //obtengo la fila y columna  de la última ficha agregada
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

        //evaluo que no tenga null la matriz y coincida el color de la última ficha clickeada con las de la columna
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
    //verifico si hay algún ganador en la diagonal ascendente
    isDiagonalAscWinner(lastTokenClicked, maxTokensToWin) {
        let posI;
        let posJ;
        //obtengo la fila y columna  de la última ficha agregada
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
        //encuentro la última ficha de la diagonal cercana a la última fila de la matriz y la primer columna
        while ((i > 0 && j < this.filas - 1) && this.matriz[i][j] && this.matriz[i - 1][j + 1] && this.matriz[i][j].getColor() == this.matriz[i - 1][j + 1].getColor()) {
            i--;
            j++;
        }
        //asciendo para detrminar si se ganó en ésta diagonal
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
    //verifico si hay algún ganador en la diagonal descendente
    isDiagonalDescWinner(lastTokenClicked, maxTokensToWin) {
        let posI;
        let posJ;
        //obtengo la fila y columna  de la última ficha agregada
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
        //encuentro la última ficha de la diagonal cercana a la primer fila de la matriz y primer columna
        while ((i > 0 && j > 0) && (this.matriz[i][j] && this.matriz[i - 1][j - 1] && this.matriz[i][j].getColor() == this.matriz[i - 1][j - 1].getColor())) {
            i--;
            j--;
        }
        let countTokens = 1;
        //verifico si hay algún ganador en la diagonal descendente
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

    yaGanoAlguien(xFicha, yFicha){
        var valorFicha = matriz[xFicha][yFicha];
        for(var i=0;i<8;i+=2){
          
          var lado1=fCount(dx[i],dy[i],xFicha+dy[i],yFicha+dx[i],valorFicha);
          var lado2=fCount(dx[i+1],dy[i+1],xFicha+dy[i+1],yFicha+dx[i+1],valorFicha);
          if(lado1+lado2+1>=4){
            posi=0;
            fCount2(dx[i],dy[i],xFicha+dy[i],yFicha+dx[i],valorFicha,posi);
            fCount2(dx[i+1],dy[i+1],xFicha+dy[i+1],yFicha+dx[i+1],valorFicha,posi);
            posWinners[posi]=[xFicha,yFicha];
            return true; 
          }
        }  
        return false;
      }

}