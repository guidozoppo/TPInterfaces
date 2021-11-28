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
            window.location.href = "home.html";
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