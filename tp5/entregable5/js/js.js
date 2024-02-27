window.addEventListener("DOMContentLoaded", _=>{

document.querySelector("#imgPerfil").addEventListener("click", desplegablePerfil);
let btnSeguir = document.querySelectorAll(".btn-seguir");
let likes = document.querySelectorAll("#like");
let dislikes = document.querySelectorAll("#dislike");
let comentar = document.querySelectorAll(".comentar");
document.querySelector(".input-buscar").addEventListener("keydown", buscar);

btnSeguir.forEach(e => {
  e.addEventListener("click", seguir);
});

likes.forEach(e => {
  e.addEventListener("click", like);
});

dislikes.forEach(e => {
  e.addEventListener("click", dislike);
})

comentar.forEach(e => {
  e.addEventListener("click", mostrarComentarios);
})

    //DESPLEGAR INFORMACION PERFIL
    function desplegablePerfil() {
        document.getElementById("desplegablePerfil").classList.toggle("show");
    }
    

    function like(e){
      let elementParent = e.srcElement.parentNode

      if (elementParent.tagName === "LI") {
        
        let texto = e.srcElement.parentNode.querySelector("p")
        let imagen = e.srcElement.parentNode.querySelector("img");
        let imagePath = imagen.src;
        let imageFile = imagePath.split("img/")[1]

        if (imageFile == "likeoff.jpg") {
          let ulParent = e.srcElement.parentNode.parentNode;
          let liDislike = ulParent.childNodes[3];
          let imagenDislike = liDislike.childNodes[0]
          let textoDislike = liDislike.childNodes[2]
          
          texto.innerHTML = parseInt(texto.innerHTML) + 1;
          e.srcElement.parentNode.querySelector("img").src = "img/likeon.jpg";
          
          if (imagenDislike.src.split("img/")[1] == "dislikeon.jpg"){
            imagenDislike.src = "img/dislikeoff.jpg";
            textoDislike.innerHTML = parseInt(textoDislike.innerHTML) - 1;
          }
  
        } else {
          texto.innerHTML = parseInt(texto.innerHTML) - 1;
          e.srcElement.parentNode.querySelector("img").src = "img/likeoff.jpg";
        }  
      }
    }

    function dislike(e){
      let elementParent = e.srcElement.parentNode

      if (elementParent.tagName === "LI") {
        let texto = e.srcElement.parentNode.querySelector("p")
        let imagen = e.srcElement.parentNode.querySelector("img");
        let imagePath = imagen.src;
        let imageFile = imagePath.split("img/")[1]
        
        
        if (imageFile == "dislikeoff.jpg") {
          imagen.src = "img/dislikeon.jpg";
          texto.innerHTML = parseInt(texto.innerHTML) + 1;

          let ulParent = e.srcElement.parentNode.parentNode;
          let liLike = ulParent.childNodes[1];
          let imagenLike = liLike.childNodes[0];
          let textoLike = liLike.childNodes[2];
        
          if(imagenLike.src.split("img/")[1] == "likeon.jpg"){
            imagenLike.src = "img/likeoff.jpg";
            textoLike.innerHTML = parseInt(textoLike.innerHTML) - 1;
          }

        } else {
          texto.innerHTML = parseInt(texto.innerHTML) - 1;
          imagen.src = "img/dislikeoff.jpg";
        }  
      }
    }
   
    function mostrarComentarios(e){
      e.target.closest(".crearPost").querySelector(".comments-container").classList.toggle("show");
    }

    function seguir(e) {
      let txtButton = e.srcElement;
      if (txtButton.innerHTML == "SEGUIR") {
        txtButton.innerHTML = "Siguiendo";
        e.srcElement.className = "boton btn-siguiendo";
      } else {
        txtButton.innerHTML = "SEGUIR";
        e.srcElement.className = "boton btn-seguir"
      }
    }

    function buscar(e) {
      if(e.code === "Enter") {
        if(e.target.value.toLowerCase() === "jorge") {
          e.target.value = "";
          spinnerConteiner("busqueda");
        } else {
          window.location.href = "busqueda-sin-rdo.html";
        }
      }
    }

    

    
})

function spinnerHome(seccion) {
  document.querySelector(".home").style.display = "none";
  document.querySelector(".spinner").style.display = "block";
  // Con esta función logramos que se ejecute despues de 2 segundos (2000 milisegundos)}
  let direccion = seccion + ".html";
  setTimeout(function () {
    window.location.href = direccion;
  }, 300);
}

function spinnerConteiner(seccion) {
  document.querySelector(".container").style.display = "none";
  document.querySelector(".spinner").style.display = "block";
  // Con esta función logramos que se ejecute despues de 2 segundos (2000 milisegundos)}
  let direccion = seccion + ".html";
  setTimeout(function () {
    window.location.href = direccion;
  }, 300);
}