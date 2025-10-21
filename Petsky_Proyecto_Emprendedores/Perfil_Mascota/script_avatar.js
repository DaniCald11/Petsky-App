window.addEventListener('DOMContentLoaded', () => {
    const perros_contenedor = document.querySelector('.perros_imgs');

    for (let i = 1; i <= 12; i++) {
        const div = document.createElement('div'); // 👈 Crear nuevo div en cada iteración
        div.innerHTML = `
            <input type="radio" id="p${i}" name="avatar" value="../Resources/imgs/avatars/p${i}.png">
            <label for="p${i}">
                <img src="../Resources/imgs/avatars/p${i}.png" alt="Avatar perruno ${i}">
            </label>
        `;
        perros_contenedor.appendChild(div);
    }

    const gatos_contenedor = document.querySelector('.gatos_imgs');

    for (let i = 1; i <= 12; i++) {
        const div = document.createElement('div'); // 👈 Crear nuevo div en cada iteración
        div.innerHTML = `
            <input type="radio" id="g${i}" name="avatar" value="../Resources/imgs/avatars/g${i}.png">
            <label for="g${i}">
                <img src="../Resources/imgs/avatars/g${i}.png" alt="Avatar gatuno ${i}">
            </label>
        `;
        gatos_contenedor.appendChild(div);
    }
});


const btn_GuardarAvatar = document.getElementById('Guardar_avatar');

btn_GuardarAvatar.addEventListener('click', (e) => {
    e.preventDefault();
    const avatarRadios = document.querySelectorAll('input[name="avatar"]');
    let imagenMascota = null;

    avatarRadios.forEach(radio => {
        if (radio.checked) {
            imagenMascota = radio.value;
        }
    });

    if (imagenMascota) {
        localStorage.setItem("fotoMascota", imagenMascota);
        window.location.href = 'Perfil_Mascota.html';
    } else {
        console.log("No se ha seleccionado ningún avatar.");
    }
});
