const icon = document.querySelector('.eye-icon');
    let passLogin = document.querySelector("#password");
    let passRegistro = document.querySelector("#password-registro");
    
    

    if (passRegistro) {
        passRegistro.addEventListener('input', verifyInputsRegistro);
    }

    if (passLogin) {
        passLogin.addEventListener('input', verifyInputsLogin);
    }

   

    function verifyInputsLogin() {
        let pass = document.querySelector("#password");
        let email = document.querySelector("#email");
        let bt = document.getElementById('inicio-btn');
        if ((pass.value != '') && (email.value != '')) {
            bt.classList.remove('disabled');
            icon.classList.remove('disabled-icon');
        }
    }

    function verifyInputsRegistro() {
        let nombre = document.querySelector("#nombre");
        let apellido = document.querySelector("#apellido");
        let pass = document.querySelector("#password-registro");
        let email = document.querySelector("#email-registro");
        let bt = document.getElementById('registro-btn');

        if ((pass.value != '') && (email.value != '') && (nombre.value != '') && (apellido.value != '')) {
            bt.classList.remove('disabled');
            icon.classList.remove('disabled-icon');
        }
    }

    /* icon.addEventListener('click', (event) => {
        event.preventDefault();
        if (typeof passLogin === 'undefined' || passLogin === null) {
            const type = (passRegistro.getAttribute('type') === 'text') ? 'password' : 'text';
            passRegistro.setAttribute('type', type);
            if (icon.innerText == 'visibility_off') {
                icon.textContent = 'visibility';
            } else {
                icon.textContent = 'visibility_off';
            }
        } else {
            const type = (passLogin.getAttribute('type') === 'text') ? 'password' : 'text';
            passLogin.setAttribute('type', type);
            if (icon.innerText == 'visibility_off') {
                icon.textContent = 'visibility';
            } else {
                icon.textContent = 'visibility_off';
            }
        }
    }); */