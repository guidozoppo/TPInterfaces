document.querySelector(".input-buscar").addEventListener("keydown", buscar);
//document.querySelector(".editarPerfil").addEventListener("click", editPerfil);
//document.querySelector("#btn-guardar-cambios").addEventListener("click", guardarCambios);

function buscar(e) {
    if(e.code === "Enter") {
      if(e.target.value.toLowerCase() === "jorge") {
        spinnerConteiner("busqueda");
      } else {
        window.location.href = "busqueda-sin-rdo.html";
      }
    }
  }

function guardarCambios(){
  /* let nueva = document.querySelector(".pass-nueva").value;
  let actual = document.querySelector(".pass-actual").value;
  if( (nueva.length === 0 || nueva.length < 8)  || ( actual.length < 8)){
    document.querySelector("#msj-contraseña").style.display = "block"
    document.querySelector("#msj-cambios-guardados").style.display = "none"
  } else {
    document.querySelector("#msj-contraseña").style.display = "none"
  } */
  document.querySelector("#msj-cambios-guardados").style.display = "block"
}

function editPerfil(){
  document.querySelector(".container").classList.add("container-secondary");
  document.querySelector(".conteiner-form-edit-perfil").style.display = "flex";
}

function cancelarCambios() {
  document.querySelector(".container").classList.remove("container-secondary");
  document.querySelector(".conteiner-form-edit-perfil").style.display = "none";
}

  function spinnerConteiner(seccion) {
    document.querySelector(".container").style.display = "none";
    document.querySelector("#header-perfil").style.display = "none";
    document.querySelector(".spinner").style.display = "block";
    // Con esta función logramos que se ejecute despues de 2 segundos (2000 milisegundos)}
    let direccion = seccion + ".html";
    setTimeout(function () {
      window.location.href = direccion;
    }, 300);
  }