window.addEventListener("DOMContentLoaded", _=>{ 

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
})