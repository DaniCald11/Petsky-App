const params = new URLSearchParams(window.location.search);

const idMascota = params.get("id");
const nombreMascota = params.get("nombre");
const fotoMascota = params.get("foto");

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('imagenMascota').src = fotoMascota;
    document.getElementById('nombreMascota').textContent = nombreMascota;
});

document.getElementById('atras').onclick = function () {
    window.location.href = `../Menu_mascota/menu_mascota.html?id=${idMascota}&nombre=${nombreMascota}&foto=${fotoMascota}`;
  };