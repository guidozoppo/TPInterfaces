window.addEventListener("DOMContentLoaded", _=>{ 

    let contador = 0;
    document.getElementById("btn-iniciar-sesion").addEventListener("click", iniciarSesion);

    function iniciarSesion(e){
        e.preventDefault();
        if(contador == 0){
            console.log("error")
            document.getElementById("msj-error").style.display = "block";
            document.getElementById("input-contraseña").style.border = "2px solid red";
            contador++;
        } else {
            console.log("ir al home");
            contador = 0;
        }
    }

})