<?php
include('../conexion.php'); // Incluir la conexión a la base de datos

// Verificar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = trim($_POST["correo"]);
    $password = trim($_POST["password"]);

    // Validar que los campos no estén vacíos
    if (empty($correo) || empty($password)) {
        die("Todos los campos son obligatorios.");
    }

    // Verificar si el usuario existe y obtener su contraseña
    $sql = $conn->prepare("SELECT nombre, password FROM usuarios WHERE correo = ?");
    $sql->bind_param("s", $correo);
    $sql->execute();
    $sql->store_result();

    // Verificar si el usuario existe
    if ($sql->num_rows > 0) {
        $sql->bind_result($nombre, $hash_guardado);
        $sql->fetch();

        // Verificar la contraseña
        if (password_verify($password, $hash_guardado)) {
            echo json_encode(["success" => true, "correo" => $correo, "nombre" => $nombre]);
        } else {
            echo json_encode(["error" => "⚠️ Correo o contraseña incorrectos."]);
        }
    } else {
        echo json_encode(["error" => "⚠️ El usuario no existe."]);
    }

    // Cerrar conexión
    $sql->close();
    $conn->close();
}
?>