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

    //se setea las filas
    setFilas(fila) {
        this.filas = fila;
    }
    //se setea las columnas
    setColumnas(columna) {
        this.columnas = columna;
    }
    //se inicia el juego creando tablero, fichas, valor de X en linea y seteando turnos
    inicJuego(objetivo) {
        this.clearCanvas();
        this.fichasParaGanar = objetivo;
        let columnas = this.sizes[objetivo]?.columns || this.objetivo + 3;
        let filas = this.sizes[objetivo]?.rows || this.objetivo + 3;
        this.crearTablero(columnas, filas);
        this.crearFichas();
        this.inicTemporizador();
       
    }

    crearFichas() {//creo las fichas para cada jugador        
        let colorJugador1 = 'white';
        let colorJugador2 = 'black';
        this.fichas = [];
        this.fichasTotales = this.columnas * this.filas;
        let posY = 150;
        let posX = 0;
        let img;
        for(let index = 0; index < this.fichasTotales/2; index++) { //creo la sfichas negras
            posY = 5 + posY;
            posX = 250;
            let img = document.getElementById("fichaJ1").value;
            this.crearFicha(colorJugador1, posX, posY, img);
        }
        posY = 150;
        for (let index = 0; index < this.fichasTotales/2; index++) { //creo la sfichas blancas
            posY = 5 + posY;
            posX = 850;
            let img = document.getElementById("fichaJ2").value;
            this.crearFicha(colorJugador2, posX, posY, img);
        }
        this.deshabFichas();
    }

    crearFicha(color, posX, posY, img) { //creo una ficha del color correspondiente
        let ficha = new Ficha(posX, posY, color, this.ctx, img);
        ficha.dibujar();
        this.fichas.push(ficha);//coloco las fichas en el arreglo de fichas
    }

    //cero el tablero y lo dibujo, así como también la zona d elanzamiento de fichas
    crearTablero(columnas, filas) {
        this.columnas = columnas;
        this.filas = filas;
        this.tablero = new Tablero(this.canvas, this.ctx, this.filas, this.columnas);
        this.tablero.dibujarTablero();
        this.tablero.dibujarRanura();
    }

    //se dibuja el tablero y la zona de lanzamiento de fichas
    dibTablero() {
        this.tablero.dibujarTablero();
        this.tablero.dibujarRanura();
    }

    //se limpian el canvas estableciendo un color blanco
    clearCanvas() {
        this.ctx.fillStyle = 'rgb(17, 17, 66)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    //redibujo el tablero y las fichas
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
            this.ultFichaClickeada.setResaltar(false);
            this.ultFichaClickeada = null;
        }

        let clickedFigure = this.findClickedFigure(e.layerX, e.layerY);
        if (clickedFigure != null && this.verificarTurno(clickedFigure)) {
            clickedFigure.setResaltar(true);
            this.ultFichaClickeada = clickedFigure;
        }
        this.reDraw();//redibujo
    }
    
    //con el movimiento del mouse se obtiene la posición del mismo y se va redibujando la ficha
    onMouseMove(e) {
        if (this.isMouseDown && this.ultFichaClickeada != null && this.ultFichaClickeada.getHabilitada()) {
            this.ultFichaClickeada.setPosition(e.layerX, e.layerY); 
            this.reDraw();
        }
    }
    //cuando se suelta una ficha se verifica si se encuentra en la zona de lanzamiento, sí es así se agrega a la matriz del tablero y se redibuja
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
    
    //se verifica que última ficha clickeada esté dentro de los límites de la zona de lanzamiento
    estaEnRanura() {
        return this.tablero.estaSobreLaRanura(this.ultFichaClickeada); //CAMBIAR
    }
    
    //se agregan al tablero  las fichas que se van situando en la dropzone
    posicionarFicha() {
        console.log('ALKSDJALSKS')
        this.tablero.agregarFicha(this.ultFichaClickeada); //CAMBIAR
        let ganador;
        if (this.tablero.getContador() >= this.fichasParaGanar) {
            ganador = this.hayGanador(this.ultFichaClickeada, this.fichasParaGanar);//se verifica si ha ganador
            if (ganador) {
                document.querySelector("#msj").innerHTML = "¡Felicitaciones, Ganaste " + this.turno + "!";
                this.deshabFichas();
            } else {
                this.cambiarTurno();
            }
        } else {
            this.cambiarTurno();
        }
    }

    //verifico que hay un ganador
    hayGanador(ultFichaClickeada, fichasParaGanar) { //CAMBIAR
        return this.tablero.isHorizontalWinner(ultFichaClickeada, fichasParaGanar) || 
                this.tablero.isVerticalWinner(ultFichaClickeada, fichasParaGanar) || 
                this.tablero.isDiagonalAscWinner(ultFichaClickeada, fichasParaGanar) || 
                this.tablero.isDiagonalDescWinner(ultFichaClickeada, fichasParaGanar);
    }
    
    //deshabilito fichas
    deshabFichas() {
        for (let index = 0; index < this.fichas.length; index++) {
            this.fichas[index].setDeshabilito();
        }
        clearInterval(this.timer);
    }
    
    //habilito fichas
    enableTokens() {
        for (let index = 0; index < this.fichas.length; index++) {
            this.fichas[index].setHabilito();
        }
    }
//ESTA ES LA POSTAAA
    //
    cambiarTurno() {
        console.log(this.ultFichaClickeada);
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

    //Verifico si la ficha clickeada corresponde con el turno actual
    verificarTurno(ficha) {
        if ((ficha.color == 'white' && this.turno == this.jugador1) || 
            (ficha.color == 'black' && this.turno == this.jugador2)) {
            return true;
        } else {
            return false;
        }
    }

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