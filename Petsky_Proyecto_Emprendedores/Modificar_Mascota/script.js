const params = new URLSearchParams(window.location.search);

const idMascota = params.get("id");
const nombreMascota = params.get("nombre");
const fotoMascota = params.get("foto");

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('imagenMascota').src = fotoMascota;
    document.getElementById('nombreMascota').textContent = nombreMascota;
    CargarVacunas();
});

document.getElementById('atras').onclick = function () {
    window.location.href = `../Menu_mascota/menu_mascota.html?id=${idMascota}&nombre=${nombreMascota}&foto=${fotoMascota}`;
  };

// BOTON PARA AGREGAR NUEVO REGISTRO 
const btn = document.getElementById('btnAgregarRegistro');
   

if (btn) {
    
        btn.onclick = function () {
            const registroInput = document.getElementById('registro');
            const tipo_registro = registroInput.value.trim();

            if (tipo_registro === 'Vacunas') {
                window.location.href = `salud_vacunación.html?id=${idMascota}&nombre=${nombreMascota}&foto=${fotoMascota}`;
            } 
            else if(tipo_registro === 'Desparacitación')
            {
                window.location.href = `salud_desparacitación.html?id=${idMascota}&nombre=${nombreMascota}&foto=${fotoMascota}`;
            }
            else if(tipo_registro === 'Visita al veterinario')
            {
                window.location.href = `salud_visitas.html?id=${idMascota}&nombre=${nombreMascota}&foto=${fotoMascota}`;
            }
            else{
                alert(`Ingresa un tipo de registro`);
            }
        };
    } else {
        console.warn('No se encontró el botón o el input de registro');
    }


// CARGAR VACUNAS
function CargarVacunas(){
    fetch(`obtener_vacunas.php?id_mascota=${idMascota}`)
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector("#tablaVacunas tbody");
            const mensaje = document.querySelector(".info-bloque");

            if (data.length === 0 || data.error) {
                mensaje.style.display = "block";
                tbody.innerHTML = ""; // Vaciar por si acaso
                return;
            }

            mensaje.style.display = "none"; // Ocultar mensaje si hay datos

            data.forEach(vacuna => {
                const fila = document.createElement("tr");

                fila.innerHTML = `
                    <td>${vacuna.nombre}</td>
                    <td>${vacuna.fecha}</td>
                    <td>${vacuna.fecha_fin}</td>
                `;

                tbody.appendChild(fila);
            });
        })
        .catch(error => {
            console.error("Error cargando vacunas:", error);
        });
}