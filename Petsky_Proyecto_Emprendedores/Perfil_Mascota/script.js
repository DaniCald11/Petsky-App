window.addEventListener('DOMContentLoaded', () => {
    const avatarPreview = document.getElementById('foto_avatar');
    const imagenMascota = localStorage.getItem("fotoMascota");

    if (imagenMascota && avatarPreview) {
        avatarPreview.src = imagenMascota;
    }
});

document.getElementById("nueva_mascota").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que la página se recargue

    let formData = new FormData(this);
    let errorMensaje = document.getElementById("errorMensaje");
    const correo = localStorage.getItem('correoUsuario');
    const avatarSrc = document.getElementById("foto_avatar").getAttribute("src");
    formData.append("avatar_src", avatarSrc);


    if (!correo) {
        alert('No se encontró el correo del usuario. Inicia sesión.');
        return;
    }

    fetch(`nueva_mascota.php?correo=${encodeURIComponent(correo)}`, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = "../Pantalla_Principal/pantalla_principal.html"; // Redirigir
        } else {
            errorMensaje.textContent = data.error; // Mostrar el mensaje de error
            errorMensaje.style.display = "block"; // Hacer visible el mensaje
        }
    })
    .catch(error => {
        errorMensaje.textContent = "Error en el servidor.";
        console.log(error)
        errorMensaje.style.display = "block";
    });
});