var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//PRIMER ESCALON
ctx.fillStyle='#FF9900';
ctx.fillRect(175, 0, 150, 100);

//SEGUNDO ESCALON
ctx.fillStyle='#FF9999';
ctx.fillRect(100, 100, 150, 100);

ctx.fillStyle='#FF1234';
ctx.fillRect(250, 100, 150, 100);


//TERCER ESCALON
ctx.fillStyle='#FF7799';
ctx.fillRect(25, 200, 150, 100);

ctx.fillStyle='#FF9874';
ctx.fillRect(175, 200, 150, 100);

ctx.fillStyle='#FF6666';
ctx.fillRect(325, 200, 150, 100);