class Juego {
    constructor(canvas, ctx, filas, columnas) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.filas = filas;
        this.columnas = columnas;
        this.fichasTotales = 0;
        this.fichas = [];
        this.fichasParaGanar = filas - 2;
        this.ultFichaClickeada = null;
        this.isMouseDown = false;
        this.tablero = null;
        this.jugador1 = null;
        this.jugador2 = null;
        this.turno = null;
        this.sizes = {
            4: {
                rows: 6,
                columns: 7
            },
            6: { 
                rows: 8,
                columns: 9
            },
            7: {
                rows: 9,
                columns: 10
            }
        }
    }

    //Inicia el juego recibiendo el objetivo por parametros 
    inicJuego(objetivo) {
        this.clearCanvas();
        this.fichasParaGanar = objetivo;
        let columnas = this.sizes[objetivo]?.columns || this.objetivo + 3; //COLUMNAS ES IGUAL A LA POSICION DEL OBJETIVO EN SIZES 
        let filas = this.sizes[objetivo]?.rows || this.objetivo + 3;    // Y SI LLEGA OTRO OBJETIVO QUE NO ESTÉ EN SIZES SE LE SUMA +3 A LA CANTIAD DE COLUMNAS
        this.crearTablero(columnas, filas);
        this.crearFichas();
        this.inicTemporizador();
       
    }

    crearFichas() {        
        let colorJugador1 = 'white';
        let colorJugador2 = 'black';
        this.fichas = [];
        this.fichasTotales = this.columnas * this.filas;
        let posY = 150;
        let posX = 0;
        for(let index = 0; index < this.fichasTotales/2; index++) { //se llama para crear las fichas del j1
            posY = 5 + posY;
            posX = 250;
            let img = document.getElementById("fichaJ1").value;
            this.crearFicha(colorJugador1, posX, posY, img);
        }
        posY = 150;
        for (let index = 0; index < this.fichasTotales/2; index++) { //se llama para crear las fichas del j2
            posY = 5 + posY;
            posX = 850;
            let img = document.getElementById("fichaJ2").value;
            this.crearFicha(colorJugador2, posX, posY, img);
        }
        this.deshabFichas();
    }

    crearFicha(color, posX, posY, img) { //creo las fichas
        let ficha = new Ficha(posX, posY, color, this.ctx, img);
        ficha.dibujar();
        this.fichas.push(ficha);
    }

    
    crearTablero(columnas, filas) {
        this.columnas = columnas;
        this.filas = filas;
        this.tablero = new Tablero(this.canvas, this.ctx, this.filas, this.columnas); //se crea el tablero
        this.tablero.dibujarTablero();
        this.tablero.dibujarRanura(); //ranura es la zona donde se suelta la ficha
    }

    
    dibTablero() {
        this.tablero.dibujarTablero();
        this.tablero.dibujarRanura();
    }

    //se limpia el canvas
    clearCanvas() {
        this.ctx.fillStyle = 'rgb(17, 17, 66)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    //llama para dibujar el tablero nuevamente y las fichas
    reDraw() {
        this.clearCanvas();
        this.dibTablero();
        for (let index = 0; index < this.fichas.length; index++) {
            this.fichas[index].dibujar(); 
        }
    }

    onMouseDown(e) {
        this.isMouseDown = true;
        if (this.ultFichaClickeada != null) {
            this.ultFichaClickeada = null;
        }
        let clickedFigure = this.findClickedFigure(e.clientX, e.clientY);
        if (clickedFigure != null && this.verificarTurno(clickedFigure)) {
            this.ultFichaClickeada = clickedFigure;
        }
        this.reDraw();
    }
    
    
    onMouseMove(e) {
        if (this.isMouseDown && this.ultFichaClickeada != null && this.ultFichaClickeada.getHabilitada()) {
            this.ultFichaClickeada.setPosition(e.layerX, e.layerY); 
            this.reDraw();
        }
    }
    
    //si se suelta sobre la ranura se posiciona la ficha en el tablero.
    //Si no, se vuelve al lugar la ficha
    onMouseUp(e) {
        this.isMouseDown = false;
        if (this.estaEnRanura()) {
            this.posicionarFicha();
            this.reDraw();
        } else {
            this.ultFichaClickeada.volverAlLugar();
            this.reDraw();
        }
    }

    findClickedFigure(x, y) {
        for (let index = 0; index < this.fichas.length; index++) {
            const element = this.fichas[index];
            if (element.isPointInside(x, y)) {
                return element;
            }
        }
    }
    
    //controla que la ficha esté sobre la ranura
    estaEnRanura() {
        return this.tablero.estaSobreLaRanura(this.ultFichaClickeada);
    }
    
    //se agregan al tablero las fichas que se sueltan en la ranura
    posicionarFicha() {
        this.tablero.agregarFicha(this.ultFichaClickeada);
        let ganador;
        if (this.tablero.getContador() >= this.fichasParaGanar) {
            ganador = this.hayGanador(this.ultFichaClickeada, this.fichasParaGanar);
            if (ganador) { //si hay ganador ...
                document.querySelector("#msj").innerHTML = "¡Felicitaciones, Ganaste " + this.turno + "!";
                document.querySelector("#temporizador").innerHTML = " ";
                this.deshabFichas();
            } else {
                this.cambiarTurno();
            }
        } else {
            this.cambiarTurno();
        }
    }

    
    hayGanador(ultFichaClickeada, fichasParaGanar) {
        return this.tablero.ganadoraHorizontal(ultFichaClickeada, fichasParaGanar) || 
                this.tablero.ganadoraVertical(ultFichaClickeada, fichasParaGanar) || 
                this.tablero.ganadoraDiagonalAscendente(ultFichaClickeada, fichasParaGanar) || 
                this.tablero.ganadoraDiagonalDescendente(ultFichaClickeada, fichasParaGanar);
    }
    
    //deshabilito fichas y limpio el reloj
    deshabFichas() {
        for (let index = 0; index < this.fichas.length; index++) {
            this.fichas[index].setDeshabilito();
        }
        clearInterval(this.timer);
    }
    
    //habilito fichas
    habilitarFichas() {
        for (let index = 0; index < this.fichas.length; index++) {
            this.fichas[index].setHabilito();
        }
    }

    cambiarTurno() {
        if(!this.ultFichaClickeada || this.ultFichaClickeada.finalizoTurno){
            this.ultFichaClickeada?.setfinalizoTurno(true);
            this.jugador1 = 'Jugador 1';
            this.jugador2 = 'Jugador 2';
            if (this.turno == null || this.turno == this.jugador2) {
                this.turno = this.jugador1;
            } else {
                this.turno = this.jugador2;
            }
            this.inicTemporizador();
            document.querySelector("#msj").innerHTML = "Turno " + this.turno;
        }
    }

    //Verifico la ficha clickeada con el turno
    verificarTurno(ficha) {
        if ((ficha.color == 'white' && this.turno == this.jugador1) || 
            (ficha.color == 'black' && this.turno == this.jugador2)) {
            return true;
        } else {
            return false;
        }
    }

    //inicio el cronometro en 60 segundos, cuando llega a 0, quien debiera jugar pierde el turno
    inicTemporizador() {
        let t = 60;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            document.querySelector("#temporizador").innerHTML = "¡Te quedan para jugar " + t + " segundos!";
            if (t == 0) {
                clearInterval(this.timer);
                this.cambiarTurno();
            }
            t--;
        }, 1000);
    }
}