function getCookie(nombreCookie) {
    
    var decodedCookieArray = decodeURIComponent(document.cookie).split("; "),
        foundCookie;
    
    foundCookie = decodedCookieArray.find(function(cookie) {
        return nombreCookie == cookie.split("=")[0];
    });
    
    return foundCookie ? foundCookie.split("=")[1] : false;
    
}

function setCookie(nombreCookie, valor, ruta, diasExpirar = 0) {
    
    if (diasExpirar) {
        var date = new Date();
        date.setTime(date.getTime() + (diasExpirar * 24 * 60 * 60 * 1000));
        document.cookie = nombreCookie.concat("=", valor, ";expires=", date.toUTCString(), ";path=", ruta);
    } else {
        document.cookie = nombreCookie.concat("=", valor, ";path=", ruta);
    }
    
}

function deleteCookie(nombreCookie) {
    
    setCookie(nombreCookie, "", "/", -1);
    
}