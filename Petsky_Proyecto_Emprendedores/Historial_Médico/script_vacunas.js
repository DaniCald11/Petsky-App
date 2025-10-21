const params = new URLSearchParams(window.location.search);

const idMascota = params.get("id");
const nombreMascota = params.get("nombre");
const fotoMascota = params.get("foto");

// Guardar el id de la mascota
  document.getElementById('id_mascota').value = idMascota;

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('imagenMascota').src = fotoMascota;
    document.getElementById('nombreMascota').textContent = nombreMascota;
});

document.getElementById('atras').onclick = function () {
    window.location.href = `salud.html?id=${idMascota}&nombre=${nombreMascota}&foto=${fotoMascota}`;
  };



document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que la página se recargue

    

    let formData = new FormData(this);

    for (var pair of formData.entries()) {
    console.log(pair[0]+ ': ' + pair[1]); 
}

    
    fetch("registro_vacuna.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.alert("Vacuna registrada con éxito.");
           window.location.href = `salud.html?id=${idMascota}&nombre=${nombreMascota}&foto=${fotoMascota}`;
        } else {
            errorMensaje.textContent = data.error; // Mostrar el mensaje de error
            errorMensaje.style.display = "block"; // Hacer visible el mensaje
        }
    })
    .catch(error => {
        console.log(data.error);
    });
});