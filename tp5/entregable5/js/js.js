window.addEventListener("DOMContentLoaded", _=>{

document.querySelector("#imgPerfil").addEventListener("click", desplegablePerfil);
document.querySelector("#like").addEventListener("click", like);

    //DESPLEGAR INFORMACION PERFIL
    function desplegablePerfil() {
        document.getElementById("desplegablePerfil").classList.toggle("show");
    }
    
    function like(){
      if(document.querySelector("#like").childNodes[2].innerHTML == "Me gusta"){
        document.querySelector("#like").childNodes[2].innerHTML = "No me gusta";
        document.querySelector("#like").childNodes[0].src = "img/like.png";
      } else {
        document.querySelector("#like").childNodes[2].innerHTML = "Me gusta";
        document.querySelector("#like").childNodes[0].src = "img/dislike.png";
      }
      
    }
   



})