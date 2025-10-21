const params = new URLSearchParams(window.location.search);

const idMascota = params.get("id");
const nombreMascota = params.get("nombre");
const fotoMascota = params.get("foto");
const rastreador = params.get("rastreador");

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('imagenMascota').src = fotoMascota;
    document.getElementById('nombreMascota').textContent = nombreMascota;
});

// Asignar las URLs con los parámetros
document.getElementById('btnRastrear').onclick = function () {
    window.location.href = `../Rastrear/rastrear.html?id=${idMascota}&nombre=${nombreMascota}&foto=${fotoMascota}&rastreador=${rastreador}`;
  };

  document.getElementById('btnHistorial').onclick = function () {
    window.location.href = `../Historial_Médico/salud.html?id=${idMascota}&nombre=${nombreMascota}&foto=${fotoMascota}`;
  };

  document.getElementById('btnModificar').onclick = function () {
    window.location.href = `../Modificar/modificar.html?id=${idMascota}&nombre=${nombreMascota}&foto=${fotoMascota}`;
  };
