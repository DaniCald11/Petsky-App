<?php
include('../conexion.php'); // Incluir la conexión a la base de datos

// Verificar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = trim($_POST["nombre"]);
    $correo = trim($_POST["correo"]);
    $password = trim($_POST["password"]);

    // Validar que los campos no estén vacíos
    if (empty($nombre) || empty($correo) || empty($password)) {
        die("Todos los campos son obligatorios.");
    }

    // Verificar si el correo ya está registrado
    $sql_check = $conn->prepare("SELECT * FROM usuarios WHERE correo = ?");
    $sql_check->bind_param("s", $correo);
    $sql_check->execute();
    $sql_check->store_result();

    if ($sql_check->num_rows > 0) {
        echo json_encode(["error" => "⚠️ Este correo ya está registrado"]);
        die();
    }

    // Encriptar la contraseña
    $password_hash = password_hash($password, PASSWORD_BCRYPT);

    // Insertar usuario en la base de datos
    $sql = $conn->prepare("INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)");
    $sql->bind_param("sss", $nombre, $correo, $password_hash);

    if ($sql->execute()) {
        echo json_encode(["success" => true, "correo" => $correo, "nombre" => $nombre]);
    } else {
        echo json_encode(["error" => "⚠️ Error al registrar usuario: " . $conn->error]);
    }

    // Cerrar conexión
    $sql->close();
    $conn->close();
}
?>
