let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let r = 0;
let g = 0;
let b = 0;
let a = 255;

document.getElementById('file').onchange=function(e){
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    
    reader.onload = function(){
        let imagen = new Image();
        imagen.src = reader.result; //le asigno la src a imagen que la saque del FileReader()

        imagen.onload = function(){
            ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height);
        }
    }
}

function getImgData () {
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

document.getElementById("bw").addEventListener("click", binarizacion);

/* function bw() {
    let imageData = getImgData();
    let pixels = imageData.data;
    let numPixels = imageData.width * imageData.height;
        console.log(imageData)
        console.log(pixels)
        console.log(numPixels)

    for ( var i = 0; i < numPixels; i++ ) {
        var r = pixels[ i * 4 ];
        var g = pixels[ i * 4 + 1 ];
        var b = pixels[ i * 4 + 2 ];

        var grey = ( r + g + b ) / 3;

        pixels[ i * 4 ] = grey;  //no le sumo nada porque está en r
        pixels[ i * 4 + 1 ] = grey; //+1 porque es g
        pixels[ i * 4 + 2 ] = grey; // +2 porque es b
    }

    ctx.putImageData( imageData, 0, 0 );
};*/

function binarizacion() {
    let imageData = getImgData();
    drawRect(imageData, r, g, b, a);
    
    function drawRect(imageData, r, g, b, a){
        for (let x = 0; x < imageData.width; x++) {
            for (let y = 0; y < imageData.height; y++) {
                setPixel(imageData, x, y, r, g, b, a);
            }
        }
    }

    function setPixel(imageData, x, y, r, g, b, a) {
        let index = ((x + y * imageData.width) *4);

        r = imageData.data[index + 0];
        g = imageData.data[index + 1];
        b = imageData.data[index + 2];
        a = imageData.data[index + 3];

        let gris = Math.round(((r + g + b) / 3));

        imageData.data[index + 0] = gris;
        imageData.data[index + 1] = gris;
        imageData.data[index + 2] = gris;

    }

    ctx.putImageData(imageData, 0, 0);
};


