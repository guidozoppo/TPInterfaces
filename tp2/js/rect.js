class rect extends figure {
    constructor(posX, posY, width, heigth, fill, context) {
        super(posX, posY, fill, context);
        this.width = width;
        this.heigth = heigth;
    }

    draw(){
        super.draw();
        this.ctx.fillRect(this.posX, this.posY, this.width, this.heigth);

        if(this.resaltado === true){ //le pongo el borde rojo
            this.ctx.strokeStyle = this.resaltadoEstilo;
            this.ctx.lineWidth = 5;
            this.ctx.strokeRect(this.posX, this.posY, this.width, this.heigth);
        }
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.heigth;
    }

    isPointInside(x, y) {
        return !(x < this.posX || x > this.posX + this.width || 
                 y < this.posY || y > this.posY + this.heigth)
    }
}