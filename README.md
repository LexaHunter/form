# Implementación de Formularios de Registro (*Sign Up*) e Inicio de Sesión (*Log In*) y Gestión de Usuarios y Sesiones con Cookies.
## 1. Formulario de Registro (*Sign Up*)
### 1.1. Campos del Formulario
El formulario de registro se compone de varios campos:
1. **Nombre**
	
	Será el nombre del usuario en el sitio. Campo de tipo texto (*text*). Obligatorio.

2. **Apellidos**
	
	Apellidos del usuario. Campo de tipo texto. Obligatorio.
3. **Correo Electrónico**
	
	Campo de tipo *email* de HTML5. Obligatorio.
4. **Contraseña**
	
	Será la contraseña mediante la cual el usuario iniciará sesión. Campo de tipo *password*. Obligatorio.
5. **Confirmación de la contraseña**
	
	Campo de tipo *password* cuyo contenido deberá coincidir con el campo anterior. Obligatorio.
6. **Sexo**
	
	Control de tipo *radiobutton*. Opcional.
7. **Fecha de Nacimiento**
	
	Control de tipo *date* de HTML5. Opcional.
8. **Dirección**
	
	Campo de texto. Opcional.
9. **País**
	
	Lista desplegable de países (control *select*). La opción "España" está seleccionada por defecto. Opcional.
10. **Número de Tarjeta de Crédito**
	
	Campo de tipo texto. Opcional.
11. **Tipo de Tarjeta de Crédito**
	
	Control de tipo *radiobutton* para elegir entre las tres marcas más usadas: *Visa*, *Mastercard* y *American Express*. La primera opción (*Visa*) está seleccionada por defecto.  Se validará el número de tarjeta en función de la opción marcada.
	 > Los campos Número de Tarjeta de Crédito y Tipo de Tarjeta de Crédito sólo aparecerán cuando se haya indicado una dirección y un país (por defecto España). 
12. **Suscripción a la *Newsletter***
	
	Control del tipo *checkbox* que permite suscribirse a la *newsletter* utilizando los datos de registro. Está marcado por defecto.

### 1.2. Validaciones
#### 1.2.1. Validaciones con HTML
La presencia de datos obligatorios se ha validado con el atributo ***required*** de HTML5:
```html
<input type="text" required="required" />
```
El correo electrónico también se ha validado a través de HTML5 con el campo de tipo ***email***:
```html
<input type="email" />
```
La fecha de nacimiento se ha recogido mediante un campo de tipo ***date***:
```html
<input type="date" />
```
El resto de validaciones se han realizado mediante JavaScript.
#### 1.2.2. Validaciones con JavaScript
Para validar los datos de los campos del formulario, primero se captura el formulario de registro a una variable:

*html/login_signup.html* :
```html
<form id="form_signup" name="form_signup">
	<!--controles-->
</form>
```
*js/login_signup.js* :
```javascript
var formSignup= document.forms["form_signup"];
```
Para después extraer cada uno de los controles a validar. Las validaciones de los datos se han realizado mediante el manejador de eventos ***addEventListener()*** con el evento ***input*** que se dispara al enviar los datos del formulario.
1. **Contraseña**
	
	La contraseña deberá contener 8 caracteres, teniendo al menos un número, una letra mayúscula, una letra minúscula y un carácter no alfanumérico. La validación se ha realizado mediante una expresión regular.
```javascript
var password = formSignup.elements["password"];

password.addEventListener("input", function(event) {
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8}/.test(password.value)) {
        password.setCustomValidity("La contraseña no tiene el formato correcto.");
    } else {
        password.setCustomValidity("");
    }
});
```
2. **Número de Tarjeta de Crédito**
	
	Del mismo modo, la validez del número de tarjeta de crédito se ha realizado mediante expresiones regulares en función del tipo de tarjeta seleccionado por el usuario.

3. **Confirmación de la Contraseña**
	
	La coincidencia de ambas contraseñas se ha realizado también mediante el evento *input* en este caso sobre el control de confirmación de contraseña:
```javascript
var password = formSignup.elements["password"],
	password_conf = formSignup.elements["password_conf"],;

password_conf.addEventListener("input", function(event) {
    if (password.value != password_conf.value) {
        password_conf.setCustomValidity("Las contraseñas no coinciden.");
    } else {
        password_conf.setCustomValidity("");
    }
});
```
## 2. Formulario de Inicio de Sesión (*Log In*)
El formulario de inicio de sesión sólo consta de dos campos:
1. **Nombre de Usuario**
	
	Nombre con el que el usuario se registró. Campo de tipo texto (*text*). 

2. **Contraseña**

	Contraseña del usuario. Es un campo de tipo *password*.

Ambos campos son obligatorios, implementándose  con el atributo *required* de HTML5.

Cuando el usuario inicie sesión se validará si existe un usuario registrado con dicho nombre y contraseña (ver siguiente apartado).
## 3. Cookies: Persistencia de Datos y Manejo de Sesiones
### 3.1. Manejo de Cookies
La persistencia de datos de usuario y el establecimiento de sesiones se ha realizado mediante cookies. Para manejarlas se han implementado tres funciones (archivo [js/cookie.js](https://github.com/alvar-ruiz/Escaparate/blob/login-signup/js/cookie.js)):

| Nombre | Función | 
|--|--|
| **getCookie(nombreCookie)**|Recibe el nombre de una cookie y devuelve su valor. Para ello divide la cadena de cookies *document.cookie* en un array de cookies mediante la función *split()*, para después buscar en dicho array mediante la función *find()* la cookie con el nombre recibido. Si existe una cookie con ese nombre retorna su valor, en caso contrario retorna *false*. |
| **setCookie(nombreCookie, valor, ruta, diasExpirar = 0)** | Construye una cookie con el nombre, valor, ruta y días hasta su expiración recibidos y la añade a *document.cookie*. La fecha de expiración se establece a partir de la fecha actual a través de un objeto de tipo *Date*. Si no se proporcionan días a expirar, la cookie no tendrá fecha de expiración. |
| **deleteCookie(nombreCookie)** | Borra la cookie con el nombre dado. Para ello llama a la función setCookie() restableciendo dicha cookie con una fecha negativa, lo cual elimina la cookie. |

### 3.2. Registro de Usuarios y Establecimiento de Sesiones
Para simular la persistencia de datos, por cada usuario registrado se crea una cookie cuyo nombre es el nombre del usuario y cuyo valor es el *hash* de su contraseña. Para que estas cookies sean persistentes en el navegador después de cerrarlo, se les da una fecha de expiración, en este caso, de un año.

Por otra parte, para establecer la sesión de un usuario se crea una cookie de nombre es "user" y con valor igual al nombre del usuario. A esta cookie no se le da fecha de expiración con el fin de que sea eliminada al cerrar el navegador.

Cuando un usuario se registra, si todos los campos superan las validaciones, se crea una cookie persistente con su nombre y contraseña *hasheada*. Una vez creada, se inicia automáticamente sesión para ese usuario creando una cookie de sesión con su nombre.

Al cerrar la sesión, se eliminará la cookie de sesión con nombre "user" mediante la función *deleteCookie()*.

Cuando un usuario inicie sesión mediante el formulario de *log in*, se comprobará si existe una cookie con su nombre mediante la función *getCookie()*. Si existe, se creará una cookie de sesión con su nombre de usuario y se le redirigirá a la página principal; de lo contrario, se le indicará que los datos introducidos no son correctos.