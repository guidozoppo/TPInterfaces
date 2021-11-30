document.querySelector(".input-buscar").addEventListener("keydown", buscar);
document.querySelector("#imgPerfil").addEventListener("click", desplegablePerfil);

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