window.addEventListener("DOMContentLoaded", _=>{

    document.querySelector(".chat").addEventListener("click", abrirMsjPrivado);
    document.querySelector(".volverListado").addEventListener("click", abrirListado);
    document.querySelector(".input-buscar").addEventListener("keydown", buscar);
    document.querySelector("#imgPerfil").addEventListener("click", desplegablePerfil);

    function abrirMsjPrivado(e){
      console.log(screen.width)
      if(screen.width < 900){
        e.target.closest(".listadoChats").style.display = "none";
        document.querySelector(".chatIndividual").style.display = "block";
      }
    }
    
    function abrirListado(e){
      console.log(e.path[3].childNodes);
      e.path[3].childNodes[1].style.display = "block";
      e.path[3].childNodes[3].style.display = "none";
    }

    function buscar(e) {
      if(e.code === "Enter") {
        if(e.target.value.toLowerCase() === "jorge") {
          e.target.value = "";
          spinnerConteiner("busqueda");
        } else {
          console.log("redidrigir a busqueda sin resultados");
        }
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

function desplegablePerfil() {
  document.getElementById("desplegablePerfil").classList.toggle("show");
}