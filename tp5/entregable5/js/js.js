window.addEventListener("DOMContentLoaded", _=>{

document.querySelector("#imgPerfil").addEventListener("click", desplegablePerfil);
let publicaciones = document.querySelectorAll("#like");

publicaciones.forEach(e => {
  e.addEventListener("click", like)
});

    //DESPLEGAR INFORMACION PERFIL
    function desplegablePerfil() {
        document.getElementById("desplegablePerfil").classList.toggle("show");
    }
    
    function like(e){
      let texto = e.path[1].childNodes[2];
      let imagen = e.path[1].childNodes[0].attributes[0];

      /* console.log(e.path[1].childNodes[0].attributes[0].nodeValue)
      console.log(imagen)
      console.log(texto) */
     if(texto.innerHTML == "Me gusta"){
        texto.innerHTML = "No me gusta";
        imagen.nodeValue = "img/like.png";
      } else {
        texto.innerHTML = "Me gusta";
        imagen.nodeValue = "img/dislike.png";
      }  
      
    }
   



})