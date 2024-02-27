window.addEventListener("DOMContentLoaded", _=>{ 


    document.querySelector("#btn-crear-cuenta").addEventListener("click", confirmaCuenta);

    let inputNombre = document.getElementById("input-nombre");
    let inputApellido = document.getElementById("input-apellido");
    let inputFechaNac = document.getElementById("input-fechaNac");
    let inputEmail = document.getElementById("input-email");
    let inputContraseña = document.getElementById("input-contraseña");
    
    let valorAnterior = 0;
    let valorActual = 0;

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
        } else {
            document.getElementById("requisitoContraseña").style.color = "rgb(241, 203, 209)";
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
        document.querySelector("#form-registro").style.display = "none";
        document.querySelector("#campos-obligatorios").style.display = "none";
        document.querySelector(".msj-confirmacion").classList.add("msj-confirmacion-visible");
    }

    window.addEventListener('scroll', () => {
        let seccionSuperior = document.querySelector(".container"); //Logo - Garolfa - Intro - Registrate

        valorActual = window.pageYOffset;

        if (valorAnterior < valorActual && valorActual >= 300) {
            seccionSuperior.classList.remove("appear-animation");
            seccionSuperior.classList.add("dissapear-animation");
           
        } else if (valorAnterior > valorActual) {
            seccionSuperior.classList.remove("dissapear-animation");
            seccionSuperior.classList.add("appear-animation");
        }
        valorAnterior = valorActual;
        
      
        
    });
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

function spinnerIndice(seccion) {
    document.querySelector(".indice-gral").style.display = "none";
    document.querySelector(".spinner").style.display = "block";
    // Con esta función logramos que se ejecute despues de 2 segundos (2000 milisegundos)}
    let direccion = seccion + ".html";
    setTimeout(function () {
      window.location.href = direccion;
    }, 300);
}