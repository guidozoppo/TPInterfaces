window.addEventListener("DOMContentLoaded", _=>{

    document.querySelector(".chat").addEventListener("click", abrirMsjPrivado);
    document.querySelector(".volverListado").addEventListener("click", abrirListado);
    document.querySelector(".input-buscar").addEventListener("keydown", buscar);
    document.querySelector("#mensaje-enviar").addEventListener("input", enviarOn);
    let imgPerfil = document.querySelectorAll(".target-desplegable");
  imgPerfil.forEach(e => {
    e.addEventListener("click", desplegablePerfil);
  });

    function abrirMsjPrivado(e){
      if(screen.width < 900){
        e.target.closest(".listadoChats").style.display = "none";
        document.querySelector(".chatIndividual").style.display = "block";
      }
    }
    
    function abrirListado(e){
      e.path[3].childNodes[1].style.display = "block";
      e.path[3].childNodes[3].style.display = "none";
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

    function enviarOn(e){
      let icons = document.querySelectorAll(".iconChat");
      
      if (document.querySelector("#mensaje-enviar").value !== "") {
        icons.forEach(e => {
          e.style.display = "none";
        });
        document.querySelector("#enviar-msj").style.display = "block";
      } else {
        icons.forEach(e => {
          e.style.display = "block";
        });
        document.querySelector("#enviar-msj").style.display = "none";
      }
    }
 })

 function spinnerConteiner(seccion) {
  document.querySelector(".container").style.display = "none";
  document.querySelector(".spinner").style.display = "block";
  // Con esta función logramos que se ejecute despues de 2 segundos (2000 milisegundos)}
  let direccion = seccion + ".html";
  setTimeout(function () {
    window.location.href = direccion;
  }, 300);
}

function desplegablePerfil(e) {
  let desplegables = document.querySelectorAll("#desplegablePerfil");
  if(screen.width > 900){
    desplegables[0].style.display = "none";
    if(desplegables[1].style.display == "" || desplegables[1].style.display == "none") {
      desplegables[1].style.display = "block";
    } else {
      desplegables[1].style.display = "none";
    }
  } else {
    desplegables[1].style.display = "none";
    if(desplegables[0].style.display == "" || desplegables[0].style.display == "none") {
      desplegables[0].style.display = "block";
    } else {
      desplegables[0].style.display = "none";
    }
  }
}