window.addEventListener("DOMContentLoaded", _=>{

document.querySelector("#imgPerfil").addEventListener("click", desplegablePerfil);
let likes = document.querySelectorAll("#like");
let dislikes = document.querySelectorAll("#dislike");

likes.forEach(e => {
  e.addEventListener("click", like);
});

dislikes.forEach(e => {
  e.addEventListener("click", dislike);
})

    //DESPLEGAR INFORMACION PERFIL
    function desplegablePerfil() {
        document.getElementById("desplegablePerfil").classList.toggle("show");
    }
    

    function like(e){
      let texto = e.path[1].childNodes[2];
      let imagen = e.path[1].childNodes[0].attributes[0];

      let imagendislike = e.path[2].childNodes[3].childNodes[0].attributes[0];
      let textodislike = e.path[2].childNodes[3].childNodes[2];

   

      if(imagen.nodeValue == "img/likeoff.jpg"){

        texto.innerHTML = parseInt(texto.innerHTML) + 1;
        imagen.nodeValue = "img/likeon.jpg";

          if( imagendislike.nodeValue == "img/dislikeon.jpg"){
            imagendislike.nodeValue = "img/dislikeoff.jpg";
            textodislike.innerHTML = parseInt(textodislike.innerHTML) - 1;
          }

      } else {
        texto.innerHTML = parseInt(texto.innerHTML) - 1;
        imagen.nodeValue = "img/likeoff.jpg";
      }  
      
    }

    function dislike(e){
      let imagenlike = e.path[2].childNodes[1].childNodes[0].attributes[0];
      let textolike = e.path[2].childNodes[1].childNodes[2];

      let texto = e.path[1].childNodes[2];
      let imagen = e.path[1].childNodes[0].attributes[0];

      
     if(imagen.nodeValue == "img/dislikeoff.jpg"){
       console.log("ahora")
       imagen.nodeValue = "img/dislikeon.jpg";
        texto.innerHTML = parseInt(texto.innerHTML) + 1;
          if(imagenlike.nodeValue == "img/likeon.jpg"){
            imagenlike.nodeValue = "img/likeoff.jpg";
            textolike.innerHTML = parseInt(textolike.innerHTML) - 1;
          }
      } else {
        texto.innerHTML = parseInt(texto.innerHTML) - 1;
        imagen.nodeValue = "img/dislikeoff.jpg";
      }  
      
    }
   



})