window.addEventListener('DOMContentLoaded', () => {
    // CARGAR EL NOMBRE DE USUARIO 
    const nombre = localStorage.getItem('nombreUsuario');
    if (nombre) {
        document.getElementById('saludoUsuario').textContent = `Hola ${nombre}`;
    }


    // CARGAR MASCOTAS
    const correo = localStorage.getItem('correoUsuario');

    if (!correo) {
        alert('No se encontró el correo del usuario. Inicia sesión.');
        return;
    }

    // Cambia la URL si el PHP está en otra ruta
    fetch(`get_mascotas.php?correo=${encodeURIComponent(correo)}`)
        .then(response => response.json())
        .then(mascotas => {
            const contenedor = document.querySelector('.Contenedor');

            if (mascotas.length === 0) {
                const mensaje = document.createElement('p');
                mensaje.textContent = 'Aún no tienes mascotas registradas.';
                mensaje.style.margin = '20px';
                mensaje.style.fontStyle = 'italic';
                contenedor.insertBefore(mensaje, document.querySelector('.Agregar_mascota'));
                return;
            }

            mascotas.forEach(mascota => {
                const div = document.createElement('div');
                div.className = 'Mascota';
                let img_url;
                if(mascota.foto == '../Resources/imgs/perro_gato.png' || mascota.foto == null)
                {
                    if(mascota.tipo == 'perro'){mascota.foto = '../Resources/imgs/perfil_perro.png';}
                    else{mascota.foto = '../Resources/imgs/perfil_gato.png'; }
                }
                

                console.log(mascota.nombre+" "+mascota.raza+" "+mascota.sexo+" "+mascota.rastreador);

                div.innerHTML = `
                    <div class="perfil_mascota">
                        <img class="img_perro" src="${mascota.foto}" alt="${mascota.nombre}">
                        
                        <div class="info_mascota">
                            <h1>${mascota.nombre}</h1>
                            <p><span style="color: orange; font-weight: 600;">Raza </span>${mascota.raza}</p>
                            <p><span style="color: orange; font-weight: 600;">Género </span>${mascota.sexo}</p>
                        </div>
                    </div>
                    
                    <button onclick="window.location.href='../Menu_mascota/menu_mascota.html?id=${mascota.id_mascota}&nombre=${mascota.nombre}&foto=${mascota.foto}&rastreador=${mascota.rastreador}'"></button>`

                contenedor.insertBefore(div, document.querySelector('.Agregar_mascota'));
            });
        })
        .catch(error => {
            console.error('Error al obtener las mascotas:', error);
        });

});