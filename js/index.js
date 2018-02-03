window.addEventListener("load", function(event) {
    
    var logged = getCookie("user"),
        topRightButton = document.getElementById("top_right_button"),
        topLeftButton = document.getElementById("top_left_button")
        linkRightButton = document.createElement("a"),
        linkLeftButton = document.createElement("a");
    
    if (logged) {
        //linkRightButton.setAttribute("id", "logout");
        linkLeftButton.setAttribute("href", "");
        linkLeftButton.innerHTML = "\ud83d\udc64\t".concat(logged);
        linkRightButton.setAttribute("onclick", "deleteCookie('user', '/')");
        linkRightButton.setAttribute("href", "");
        linkRightButton.innerHTML = "Cerrar Sesión";
    } else {
        linkLeftButton.setAttribute("href", "html/newsletter.html");
        linkLeftButton.innerHTML = "Suscríbete a nuestra Newsletter";
        linkRightButton.setAttribute("href", "html/login_signup.html");
        linkRightButton.innerHTML = "Regístrate / Inicia Sesión";
    }
    
    topRightButton.appendChild(linkRightButton);
    topLeftButton.appendChild(linkLeftButton);
        
});

/*document.getElementById("logout").addEventListener("click", function(event) {
    deleteCookie("user");
});*/