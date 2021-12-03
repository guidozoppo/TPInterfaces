window.addEventListener("DOMContentLoaded", _=>{ 


    document.querySelector("#btn-crear-cuenta").addEventListener("click", confirmaCuenta);

    let inputNombre = document.getElementById("input-nombre");
    let inputApellido = document.getElementById("input-apellido");
    let inputFechaNac = document.getElementById("input-fechaNac");
    let inputEmail = document.getElementById("input-email");
    let inputContraseña = document.getElementById("input-contraseña");
    
    inputNombre.addEventListener("input", checkCampos);
    inputApellido.addEventListener("input", checkCampos);
    inputFechaNac.addEventListener("input", checkCampos);
    inputEmail.addEventListener("input", checkCampos);
    inputContraseña.addEventListener("input", checkContraseña);
    inputContraseña.addEventListener("input", checkCampos);


    function checkContraseña(e){
        let length = document.getElementById("input-contraseña").value.length;
        if(length >= 8) {
            document.getElementById("requisitoContraseña").style.color = "#00ff3f";
        }
    }
    
    function camposCompletos(){
        return inputNombre.value.length > 0 && inputApellido.value.length > 0 
                && inputFechaNac.value.length > 0 && inputEmail.value.length > 0 && inputContraseña.value.length > 0;
    }

    function checkCampos() {
        if (camposCompletos() && inputContraseña.value.length >= 8) {
            document.getElementById("btn-crear-cuenta").disabled = false;
            document.getElementById("btn-crear-cuenta").classList.add("botonActivado"); 
        } else {
            document.getElementById("btn-crear-cuenta").disabled = true;
            document.getElementById("btn-crear-cuenta").classList.remove("botonActivado"); 
        }
    }

    function confirmaCuenta(){
        document.querySelector(".conteiner-form").style.display = "none";
        document.querySelector(".registrar").style.display = "none";
        document.querySelector("h4").style.display = "none";
        document.querySelector(".msj-confirmacion").classList.add("msj-confirmacion-visible");
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