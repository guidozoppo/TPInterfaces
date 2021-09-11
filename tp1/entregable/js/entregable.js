"use strict";

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
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0,0,canvas.width, canvas.height)
    subioImagen = false;
    document.getElementById("file").value = "";
}

function subirImagen(e){
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    
    reader.onload = function(){
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
    imagen.onload = function(){
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

        r = imageData.data[index + 0];
        g = imageData.data[index + 1];
        b = imageData.data[index + 2];
        a = imageData.data[index + 3];

        imageData.data[index + 0] = r + 10;
        imageData.data[index + 1] = g + 10;
        imageData.data[index + 2] = b + 10;
        
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

         if (index % 4 == 3) {
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
     ctx.putImageData(imageData, 0, 0);
 */
    //var data = ctx.getImageData(0,0,canvas.width,canvas.height);
    var data = getImgData();
    let btnBlur = document.getElementById("blur")
    var px = data.data;
    var tmpPx = new Uint8ClampedArray(px.length); //tmpPx es = a imageData.data pero con los valores rgb en 0
    console.log(tmpPx)
    tmpPx.set(px); //Aca le asigna los px a tmpPx por lo que termina siendo = a imageData.data
    console.log(tmpPx) 
  
    for (var i = 0, len= px.length; i < len; i++) {
       if (i % 4 === 3) {continue;}
  
       px[i] = ( tmpPx[i] 
          + (tmpPx[i - 4] || tmpPx[i])
          + (tmpPx[i + 4] || tmpPx[i]) 
          + (tmpPx[i - 4 * data.width] || tmpPx[i])
          + (tmpPx[i + 4 * data.width] || tmpPx[i]) 
          + (tmpPx[i - 4 * data.width - 4] || tmpPx[i])
          + (tmpPx[i + 4 * data.width + 4] || tmpPx[i])
          + (tmpPx[i + 4 * data.width - 4] || tmpPx[i])
          + (tmpPx[i - 4 * data.width + 4] || tmpPx[i])
          )/9;
    };
    // data.data = px;
  
    ctx.putImageData(data,0,0);
    tmpPx = null;
    btnBlur.removeAttribute('disabled');
};

function download() {    
    let canvasDownload = canvas;
    if (subioImagen) {
        canvasDownload = setOriginalSize();
    }
    
    let downloadBtn = document.getElementById("download");
    downloadBtn.setAttribute("href", canvasDownload.toDataURL("image/png"));
    downloadBtn.setAttribute("download","archive.png");
};

function setOriginalSize() {
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
         let color = 0;
 
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
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
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
    var r, g, b, i, f, p, q, t;
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
    let imageData = getImgData(),
        pixels = imageData.data,
        numPixels = imageData.width * imageData.height;
 
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

function conv3x(data, idx, w, matriz){
    return (
        /* matriz[0]*data[idx - w - 4] + matriz[1]*data[idx - 4] + matriz[2]*data[idx + w - 4]
        - matriz[0]*data[idx - w + 4] - matriz[1]*data[idx + 4] - matriz[2]*data[idx + 4 + 4] */
        matriz[0]*data[idx - w - 4] + matriz[1]*data[idx - 4] + matriz[2]*data[idx + w - 4]
        - matriz[3]*data[idx - 1] - matriz[4]*data[idx] - matriz[5]*data[idx + 1]
        + matriz[6]*data[idx - w + 4] + matriz[7]*data[idx + 4] + matriz[8]*data[idx + 4 + 4]
        );
  }
  
function conv3y(data, idx, w, matriz){
    return (
        /* matriz[0]*data[idx - w - 4] + matriz[1]*data[idx - w] + matriz[2]*data[idx - w + 4]
        -(matriz[0]*data[idx + w - 4] + matriz[1]*data[idx + w] + matriz[2]*data[idx + w + 4]) */
        matriz[0]*data[idx - w - 4] + matriz[1]*data[idx - w] + matriz[2]*data[idx - w + 4] +
        matriz[3]*data[idx - 1] + matriz[4]*data[idx] + matriz[5]*data[idx + 1] 
        + matriz[6]*data[idx + w - 4] + matriz[7]*data[idx + w] + matriz[8]*data[idx + w + 4]
        );
  }

  function gradient_internal(imageData, matriz) {
    var data = imageData.data; 
    //imageData.data es una Uint8ClampedArrayrepresentación de una matriz unidimensional 
    //que contiene los datos en el orden RGBA, con valores enteros entre 0 y 255.

    var w = imageData.width * 4; //w viene a ser el ancho de imageData en pixels * 4 (rgba)
    console.log(w);
    var l = data.length - w - 4; //data.lengths son los valores que tiene la matriz data totales = alto*ancho *4(rgba) = 1.000.000
                                 // l = matriz - valores totales del ancho (w) - 4(rgba)
    console.log(l)
    var buff = new data.constructor(new ArrayBuffer(data.length));
    console.log(buff)
    for (var i = w + 4; i < l; i+=4){ //for que empieza en i = w(2000 + 4) y va hasta l(997.996)
      var dx = conv3x(data, i, w, matriz);
      var dy = conv3y(data, i, w, matriz);
      buff[i] = buff[i + 1] = buff[i + 2] = Math.sqrt(dx*dx + dy*dy);
      buff[i + 3] = 255;
    }
    imageData.data.set(buff);
  }
  
 function gradient(){
    let imageData = getImgData();//context.getImageData(0, 0, canvas.width,canvas.height);
    let matriz = [  
                1, 2, 1, 
                0, 0, 0,
                -1, -2, -1
                ];
    gradient_internal(imageData, matriz); // Para aplicar el operador sobel
    ctx.putImageData(imageData, 0, 0);
  }

  function deteccionBordes(){
      gradient(canvas);
  }