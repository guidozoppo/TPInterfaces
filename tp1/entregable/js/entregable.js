"use strict";
//FUE PROBADO EN NAVEGADOR GOOGLE CHROME Versión 93.0.4577.63 (Build oficial) (64 bits)
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let heigth = canvas.height;
let pintando = false;
let color = 'black';
let grosor = 1;
let xInicial = 0;
let yInicial = 0;
let filtroGris = false;
let imgWidth = 0;
let imgHeight = 0;
let subioImagen = false;
let r = 0;
let g = 0;
let b = 0;
let a = 255;

canvas.addEventListener("mousedown", apretoClick);
canvas.addEventListener("mouseup", soltoClick);
canvas.addEventListener("mousemove", movioClick);
document.getElementById("btnBorrar").addEventListener("click", borrar);
document.getElementById("btnBorrarTodo").addEventListener("click", borrarTodo);
document.getElementById("color").addEventListener("input", setColor);
document.getElementById("grosor").addEventListener("input", setGrosor);
document.getElementById("negativo").addEventListener("click", negativo);
document.getElementById("gris").addEventListener("click", gris);
document.getElementById("binarizacion").addEventListener("click", binarizacion);
document.getElementById("blur").addEventListener("click", blur);
document.getElementById("brillo").addEventListener("click", brillo);
document.getElementById("restaurar").addEventListener("click", subirImagen);
document.getElementById("file").addEventListener("change", subirImagen);
document.getElementById("saturacion").addEventListener("click", saturacion);
document.getElementById("sepia").addEventListener("click", sepia);
document.getElementById("deteccionBordes").addEventListener("click", deteccionBordes);
//document.getElementById("restaurar").addEventListener("click", restaurarImagen);
document.getElementById("tono").addEventListener("click", tono);

function setColor(){
    color = document.getElementById("color").value;
}

function setGrosor(){
    grosor = document.getElementById("grosor").value;
}

function apretoClick(e){
    pintando = true;
    ctx.moveTo(e.layerX, e.layerY);
    ctx.beginPath();
    ctx.lineWidth = grosor;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
}

function movioClick(e){
    if(pintando){
        ctx.lineTo(e.layerX, e.layerY);
        ctx.stroke();   
    }
}

function soltoClick(e){
    pintando = false;
}

function borrar(){
    grosor = grosor;
    color = "#FFFFFF";
}

function borrarTodo(){
    //Se limpia el canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0,0,canvas.width, canvas.height)
    subioImagen = false; //false para la descarga o muestra de la imagen
    document.getElementById("file").value = ""; //Se vacia el name del input file, quedando como ningun archivo seleccionado
}

function subirImagen(e){
    //El objeto FileReader nos permite leer el file
    let reader = new FileReader();
    console.log(e.target.files[0])
    //readAsDataURL codifica el dato binario en url
    reader.readAsDataURL(e.target.files[0]);
    
    reader.onload = function(){ //se ejecuta una vez cargado
        let imagen = new Image();
        imagen.src = reader.result;
        
        imagenOnload(imagen);
        /* imagen.onload = function(){
            ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);
            imgHeight = imagen.height;
            imgWidth = imagen.width;
            subioImagen = true;
        } */
    }
};

function imagenOnload (imagen) {
    imagen.onload = function(){ //cargada la imagen, se aplica en canvas
        ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);
        imgHeight = imagen.height;
        imgWidth = imagen.width;
        subioImagen = true;
    }
}

function getImgData () {
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
};

function negativo() {
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

        //Se invierten los valores de r,g y b
        imageData.data[index + 0] = 255 - r;
        imageData.data[index + 1] = 255 - g;
        imageData.data[index + 2] = 255 - b;

    }


    
    ctx.putImageData(imageData, 0, 0);
};

function brillo() {
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
        let aumentoBrillo = 10;

        r = imageData.data[index + 0];
        g = imageData.data[index + 1];
        b = imageData.data[index + 2];
        a = imageData.data[index + 3];

        //Mas brillo = mas cerca del blanco
        //Se le aumenta a r,g y b el valor que tiene la variable aumentoBrillo
        if(aumentoBrillo < 1){
            aumentoBrillo = 10;
        }
        imageData.data[index + 0] = r + aumentoBrillo;
        imageData.data[index + 1] = g + aumentoBrillo;
        imageData.data[index + 2] = b + aumentoBrillo;
        
    }



    
    ctx.putImageData(imageData, 0, 0);
};

function gris() {
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
        //Se hace un promedio entre los tres valores y se le asigna ese valor a cada uno.
        imageData.data[index + 0] = gris;
        imageData.data[index + 1] = gris;
        imageData.data[index + 2] = gris;
    }
    ctx.putImageData(imageData, 0, 0);
};

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
        let color = 0;

        r = imageData.data[index + 0];
        g = imageData.data[index + 1];
        b = imageData.data[index + 2];
        a = imageData.data[index + 3];

        let gris = ((r+g+b)/3);
        //Se definio el color gris, si es mayor a 255/2 a ese pixel se lo hace blanco, si es menor a 255/2 será negro.
        if(gris > (255/2)){   
            color = 255;
        } else {
            color = 0;
        }
        imageData.data[index + 0] = color;
        imageData.data[index + 1] = color;
        imageData.data[index + 2] = color;
    }
    ctx.putImageData(imageData, 0, 0);
};

function saturacion() {
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
        let vs = 1.1; // valor saturacion. Si es 0 = se pone en escala de grises, si es 1 = muestra el original

        let luR = 0.6094; // Valor para determinar la luminosidad de rojo
        let luG = 0.3086; // Valor para determinar la luminosidad de verde
        let luB = 0.0820; // Valor para determinar la luminosidad de azul
        
        //r en pixel
        let az = (1 - vs)*luR + vs;
        let bz = (1 - vs)*luG;
        let cz = (1 - vs)*luB;
        //g en pixel
        let dz = (1 - vs)*luR;
        let ez = (1 - vs)*luG + vs;
        let fz = (1 - vs)*luB;
        //b en pixel
        let gz = (1 - vs)*luR;
        let hz = (1 - vs)*luG;
        let iz = (1 - vs)*luB + vs;

        r = imageData.data[index]; //Se guardan los valores originales
        g = imageData.data[index + 1];
        b = imageData.data[index + 2];

        let rSaturado = (az*r + bz*g + cz*b); //Se saturan los colores
        let gSaturado = (dz*r + ez*g + fz*b);
        let bSaturado = (gz*r + hz*g + iz*b);

        imageData.data[index] = rSaturado; //Se asignan los colores saturados
        imageData.data[index + 1] = gSaturado;
        imageData.data[index + 2] = bSaturado;
    }
    ctx.putImageData(imageData, 0, 0);
};

function blur() {
    /* let imageData = getImgData();
    drawRect(imageData, r, g, b, a);
    console.log(imageData.data);

     function drawRect(imageData, r, g, b, a){
         for (let x = 0; x < imageData.width; x++) {
             for (let y = 0; y < imageData.height; y++) {
                 setPixel(imageData, x, y, r, g, b, a);
             }
         }
     }
     
     function setPixel(imageData, x, y, r, g, b, a) {
         let index = ((x + y * imageData.width) *4);

         if (index % 4 !== 3) {
         imageData.data[index] = ( imageData.data[index] 
            + (imageData.data[index - 4] || imageData.data[index])
            + (imageData.data[index + 4] || imageData.data[index]) 
            + (imageData.data[index - 4 * imageData.width] || imageData.data[index])
            + (imageData.data[index + 4 * imageData.width] || imageData.data[index]) 
            + (imageData.data[index - 4 * imageData.width - 4] || imageData.data[index])
            + (imageData.data[index + 4 * imageData.width + 4] || imageData.data[index])
            + (imageData.data[index + 4 * imageData.width - 4] || imageData.data[index])
            + (imageData.data[index - 4 * imageData.width + 4] || imageData.data[index])
            ) / 9;
         }

     }
     ctx.putImageData(imageData, 0, 0); */

    //var data = ctx.getImageData(0,0,canvas.width,canvas.height);
    let data = getImgData();
    //let btnBlur = document.getElementById("blur")
    let px = data.data;
    let pxLength = px.length;
    let tmpPx = new Uint8ClampedArray(pxLength); //tmpPx es = a imageData.data pero con los valores rgb en 0

    tmpPx.set(px); //Aca le asigna los px a tmpPx por lo que termina siendo = a imageData.data

  
    for (let i = 0; i < pxLength; i++) {
       if (i % 4 === 3) {continue;} //Significa que está en a, por lo tanto que salte la iteración
  
        px[i] = ( tmpPx[i] 
          + (tmpPx[i - 4] || tmpPx[i])
          + (tmpPx[i + 4] || tmpPx[i]) 
          + (tmpPx[i - 4 * data.width] || tmpPx[i])
          + (tmpPx[i + 4 * data.width] || tmpPx[i]) 
          + (tmpPx[i - 4 * data.width - 4] || tmpPx[i])
          + (tmpPx[i + 4 * data.width + 4] || tmpPx[i])
          + (tmpPx[i + 4 * data.width - 4] || tmpPx[i])
          + (tmpPx[i - 4 * data.width + 4] || tmpPx[i])
          ) /9;
    };
    // data.data = px;
  
    ctx.putImageData(data, 0, 0);
    //tmpPx = null;
    //btnBlur.removeAttribute('disabled');
};

function download() {    
    let canvasDownload = canvas;
    //Si se subio una imagen, que se descargue con el tamaño que fue subida
    if (subioImagen) {
        canvasDownload = setOriginalSize();
    }
    
    let downloadBtn = document.getElementById("download");
    downloadBtn.setAttribute("href", canvasDownload.toDataURL("image/png"));
    downloadBtn.setAttribute("download","archive.png");
};

function setOriginalSize() {
    //Se crea un canvas "paralelo" para guardar el tamaño original de la imagen  
    let canvasJS = document.createElement('canvas');
    canvasJS.width = imgWidth;
    canvasJS.height = imgHeight;
    let ctxJS = canvasJS.getContext('2d');
    ctxJS.drawImage(canvas, 0, 0, canvasJS.width, canvasJS.height);
    return canvasJS;
};

function tono() {
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
        let h = 0;
        let s = 0;
        let v = 0;

        let HSV = {
            'h' : h,
            's' : s,
            'v' : v
        }

        let RGB = {
            'r' : r,
            'g' : g,
            'b' : b
        }

        HSV = RGBtoHSV(RGB['r'], RGB['g'], RGB['b']);
        HSV['h']  = HSV['h'] + 0.01;
        RGB = HSVtoRGB(HSV['h'], HSV['s'] ,HSV['v']);

        imageData.data[index + 0] = RGB['r'];
        imageData.data[index + 1] = RGB['g'];
        imageData.data[index + 2] = RGB['b'];
    }
    ctx.putImageData(imageData, 0, 0);
}

function RGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    let max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
        h: h,
        s: s,
        v: v
    };
}

function HSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function sepia(){
    let imageData = getImgData();
    let pixels = imageData.data;
    let numPixels = imageData.width * imageData.height;
 
    for ( let i = 0; i < numPixels; i++ ) {
        let r = pixels[ i * 4 ];
        let g = pixels[ i * 4 + 1 ];
        let b = pixels[ i * 4 + 2 ];
 
        //PROCESO SIMILAR AL DE NEGATIVIDAD INVIRTIENDO EL VALOR
        pixels[ i * 4 ] = 255 - r;
        pixels[ i * 4 + 1 ] = 255 - g;
        pixels[ i * 4 + 2 ] = 255 - b;
 
        //ALGORITMO DE SEPIA ELEGIDO
        pixels[ i * 4 ] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
        pixels[ i * 4 + 1 ] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
        pixels[ i * 4 + 2 ] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
    }
    ctx.putImageData( imageData, 0, 0 );
}

function convolucionx(data, idx, w, matriz){
    return (
        /* matriz[0]*data[idx - w - 4] + matriz[1]*data[idx - 4] + matriz[2]*data[idx + w - 4]
        - matriz[0]*data[idx - w + 4] - matriz[1]*data[idx + 4] - matriz[2]*data[idx + 4 + 4] */
         matriz[0]*data[idx - w - 4] + matriz[1]*data[idx - 4] + matriz[2]*data[idx + w - 4]
        - matriz[3]*data[idx - 1] - matriz[4]*data[idx] - matriz[5]*data[idx + 1]
        + matriz[6]*data[idx - w + 4] + matriz[7]*data[idx + 4] + matriz[8]*data[idx + 4 + 4]
        );
  }
  
function convoluciony(data, idx, w, matriz){
    return (
        /* matriz[0]*data[idx - w - 4] + matriz[1]*data[idx - w] + matriz[2]*data[idx - w + 4]
        -(matriz[0]*data[idx + w - 4] + matriz[1]*data[idx + w] + matriz[2]*data[idx + w + 4]) */
        matriz[0]*data[idx - w - 4] + matriz[1]*data[idx - w] + matriz[2]*data[idx - w + 4] +
        matriz[3]*data[idx - 1] + matriz[4]*data[idx] + matriz[5]*data[idx + 1] 
        + matriz[6]*data[idx + w - 4] + matriz[7]*data[idx + w] + matriz[8]*data[idx + w + 4]
        );
  }

  function gradient_internal(imageData, matriz) {
    let data = imageData.data; 
    //imageData.data es una Uint8ClampedArrayrepresentación de una matriz unidimensional 
    //que contiene los datos en el orden RGBA, con valores enteros entre 0 y 255.

    let w = imageData.width * 4; //w viene a ser el ancho de imageData en pixels * 4 (rgba)
    let l = data.length - w - 4; //data.lengths son los valores totales que tiene la matriz data = alto*ancho *4(rgba) = 1.000.000
                                 // l = matriz - valores totales del ancho (w) - 4(rgba) para que el for no se pase del total de pixeles

    let data2 = new data.constructor(new ArrayBuffer(data.length));//se crea un objeto ArrayBuffer como lo es la letiable data de largo data.length

    for (let i = w + 4; i < l; i+=4){ //for que empieza en i = w(2000 + 4) y va hasta l(997.996) para recorrer la totalidad del canvas
        let gx = convolucionx(data, i, w, matriz);
        let gy = convoluciony(data, i, w, matriz);
        data2[i] = data2[i + 1] = data2[i + 2] = Math.sqrt(gx*gx + gy*gy);
        data2[i + 3] = 255;
    }
    imageData.data.set(data2);
  }
  
 function gradient(){
    let imageData = getImgData();
    let matriz = [  
               -1, -2, -1, 
                0, 0, 0,
                1, 2, 1
                ];
 
    gradient_internal(imageData, matriz); // Para aplicar el operador sobel
    ctx.putImageData(imageData, 0, 0);
  }

  function deteccionBordes(){
      gradient();
  }