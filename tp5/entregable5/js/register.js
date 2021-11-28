window.addEventListener("DOMContentLoaded", _=>{ 

    document.getElementById("input-contraseña").addEventListener("input", checkContraseña);

    function checkContraseña(e){
        let length = document.getElementById("input-contraseña").value.length;
        if(length >= 8) {
            document.getElementById("requisitoContraseña").style.color = "#00ff3f";
            document.getElementById("btn-crear-cuenta").disabled = false;
            document.getElementById("btn-crear-cuenta").classList.add("asd")
            document.getElementById("btn-crear-cuenta").classList.add("asdHover")


        }
    }
    

})