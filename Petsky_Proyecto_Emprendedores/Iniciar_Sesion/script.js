document.getElementById("iniciarForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que la página se recargue

    let formData = new FormData(this);
    let errorMensaje = document.getElementById("errorMensaje");

    fetch("iniciar_sesion.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem("correoUsuario", data.correo); // Guardar en localStorage
            localStorage.setItem("nombreUsuario", data.nombre); // Guardar en localStorage
            
            window.location.href = "../Pantalla_Principal/pantalla_principal.html"; // Redirigir
        } else {
            errorMensaje.textContent = data.error; // Mostrar el mensaje de error
            errorMensaje.style.display = "block"; // Hacer visible el mensaje
        }
    })
    .catch(error => {
        errorMensaje.textContent = "Error en el servidor.";
        errorMensaje.style.display = "block";
    });
});