document.querySelector(".input-buscar").addEventListener("keydown", buscar);

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

  function spinnerConteiner(seccion) {
    document.querySelector(".container").style.display = "none";
    document.querySelector(".spinner").style.display = "block";
    // Con esta función logramos que se ejecute despues de 2 segundos (2000 milisegundos)}
    let direccion = seccion + ".html";
    setTimeout(function () {
      window.location.href = direccion;
    }, 300);
  }
