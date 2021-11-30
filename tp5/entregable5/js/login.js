window.addEventListener("DOMContentLoaded", _=>{ 

    let contador = 0;
    document.getElementById("btn-iniciar-sesion").addEventListener("click", iniciarSesion);
    document.getElementById("input-usuario").addEventListener("input", checkCampos);
    document.getElementById("input-contraseña").addEventListener("input", checkCampos);

    function iniciarSesion(e){
        e.preventDefault();
        if(contador == 0){
            document.getElementById("msj-error").style.display = "block";
            document.getElementById("input-contraseña").style.border = "2px solid red";
            contador++;
        } else {
            spinnerConteiner("home");
        }
    }

    function checkCampos(){
        if (camposCompletos()) {
            document.getElementById("btn-iniciar-sesion").disabled = false;
            document.getElementById("btn-iniciar-sesion").classList.add("botonActivado"); 
        } else {
            document.getElementById("btn-iniciar-sesion").disabled = true;
            document.getElementById("btn-iniciar-sesion").classList.remove("botonActivado"); 
        }
    }

    function camposCompletos(){
        return document.getElementById("input-usuario").value.length > 0 
                && document.getElementById("input-contraseña").value.length > 0;
    }

})

function spinnerConteiner(seccion) {
    document.querySelector(".conteiner-gral-login").style.display = "none";
    document.querySelector(".spinner").style.display = "block";
    // Con esta función logramos que se ejecute despues de 2 segundos (2000 milisegundos)}
    let direccion = seccion + ".html";
    setTimeout(function () {
      window.location.href = direccion;
    }, 300);
}