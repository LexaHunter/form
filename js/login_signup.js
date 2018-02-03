// Objetos de DOM

var formLogin = document.forms["form_login"],
    formSignup = document.forms["form_signup"],
    password = formSignup.elements["password"],
    password_conf = formSignup.elements["password_conf"],
    direccion = formSignup.elements["direccion"],
    selectPaises = formSignup.elements["pais"],
    contenedorTarjeta = document.getElementById("contenedor_tarjeta"),
    numTarjeta = formSignup.elements["num_tarjeta"],
    marcaTarjeta = formSignup.elements["marca_tarjeta"];


// Al cargar el documento:

window.addEventListener("load", function(event) {
    
    paisesJSON.paises.forEach(function(pais) {
        option = document.createElement("option");
        option.setAttribute("value", pais.nombre);
        option.innerHTML = pais.nombre;
        selectPaises.appendChild(option);
    });
    
    $("[value=España]").attr("selected", "selected");
    
});

// Manú de Pestañas

function mostrar(event, formId) {
    
    var tabContent, tabLinks;
    
    tabContent = document.getElementsByClassName("tab_content");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    tabLinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    document.getElementById(formId).style.display = "block";
    event.currentTarget.className += " active";
    
}

// Validaciones de Formulario

password.addEventListener("input", function(event) {
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8}/.test(password.value)) {
        password.setCustomValidity("La contraseña no tiene el formato correcto.");
    } else {
        password.setCustomValidity("");
    }
});

password_conf.addEventListener("input", function(event) {
    if (password.value != password_conf.value) {
        password_conf.setCustomValidity("Las contraseñas no coinciden.");
    } else {
        password_conf.setCustomValidity("");
    }
});

direccion.addEventListener("keyup", function(event) {
    if (direccion.value != "") {
        contenedorTarjeta.className = "visible";
    } else {
        contenedorTarjeta.className = "hidden";
    }
});

numTarjeta.addEventListener("keyup", function(event) {
    if (numTarjeta.value != "") {
        marcaTarjeta[0].required = true;
    } else {
        marcaTarjeta[0].required = false;
    }
});

numTarjeta.addEventListener("input", function(event) {
    if (marcaTarjeta[0].checked) {
        validarTarjeta(/^4[0-9]{12}(?:[0-9]{3})?$/);
    } else if (marcaTarjeta[1].checked) {
        validarTarjeta(/^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/);
    } else if (marcaTarjeta[2].checked) {
        validarTarjeta(/^3[47][0-9]{13}$/);
    }
});

function validarTarjeta(regexp) {
    if (!regexp.test(numTarjeta.value)) {
        numTarjeta.setCustomValidity("El número de tarjeta no es correcto.");
    } else {
        numTarjeta.setCustomValidity("");
    }
}

formLogin.addEventListener("submit", function(event) {
    
    var nombreUsuario = formLogin.elements["nombre"].value.trim(),
        password = formLogin.elements["password"].value,
        logged = false;
    
    if (getCookie(nombreUsuario) == sha256(password)) {
        logged = true;
        setCookie("user", nombreUsuario, "/");
        alert("¡Bienvenido/a ".concat(nombreUsuario, "!"));
    } else {
        alert("El usuario y/o la contraseña no son correctos");
    }
    
    if (!logged) {
        this.reset();
        event.preventDefault();
    }
    
    return logged;
    
});

formSignup.addEventListener("submit", function(event) {
    
    var nombreUsuario = formSignup.elements["nombre"].value;
    
    setCookie(nombreUsuario, sha256(password.value), "/", 365);
    
    setCookie("user", nombreUsuario, "/");
    
});