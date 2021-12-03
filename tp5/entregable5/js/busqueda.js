document.querySelector(".input-buscar").addEventListener("keydown", buscar);

function buscar(e) {
  if(e.code === "Enter") {
    e.preventDefault();
    if(e.target.value.toLowerCase() === "jorge") {
        spinnerConteiner("busqueda");
      } else {
        spinnerConteiner("busqueda-sin-rdo");
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
