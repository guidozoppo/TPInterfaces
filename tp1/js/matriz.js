//CREO MATRIZ
let matriz = [];
let maxNum = 0;
let maxFilaPar = 0;
let maxFilaImpar = 0;
let filas = 5;
let columnas = 10;
let xPar = 0;
let yPar = 0;
let yImpar = 0;
let xImpar = 0;
let promedios = [];
let sumaPromedios = 0;


for (let i = 0; i < filas; i++) {
    //A LA MATRIZ EN LA FILA i LE AGREGO UN ARREGLO
    matriz[i] = [];

    for (let index = 0; index < columnas; index++) {
        //A LA MATRIZ EN LA FILA i, COLUMNA index LE ASIGNO UN VALOR RANDOM 
        matriz[i][index] = Math.floor(Math.random()*1000);       

        
        if(maxNum < matriz[i][index]){
            maxNum = matriz[i][index];
        }

        if((maxFilaPar < matriz[i][index]) && i%2 == 0 || i == 0){
            maxFilaPar = matriz[i][index];
            xPar = i;
            yPar = index;
        }

        if(maxFilaImpar < matriz[i][index] && i%2 != 0){
            maxFilaImpar = matriz[i][index];
            xImpar = i;
            yImpar = index;
        }

        sumaPromedios += matriz[i][index];
        
    }
    promedios.push(sumaPromedios/10);
    sumaPromedios = 0;

}

console.table(matriz);
console.log("El valor maximo en la matriz es: " + maxNum);
console.log("El valor maximo en las filas pares es: " + maxFilaPar + " ubicado en (" + xPar + "," + yPar + ")");
console.log("El valor maximo en las filas impares es: " + maxFilaImpar + " ubicado en (" + xImpar + "," + yImpar + ")");
console.log(promedios);
console.log(sumaPromedios);