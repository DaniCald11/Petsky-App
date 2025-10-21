<?php
include('../conexion.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = trim($_POST["nombre_mascota"]);
    $tipo = trim($_POST["tipo"]);
    $raza = trim($_POST["raza"]);
    $sexo = trim($_POST["sexo"]);
    $fecha = trim($_POST["fecha_nacimiento"]);
    $avatar_src = trim($_POST["avatar_src"]);
    $rastreador = trim($_POST["id_rastreo"]);
    
    
    if (!isset($_GET['correo'])) {
        echo json_encode(["error" => "Correo no proporcionado."]);
        exit;
    }

    $correo = $_GET['correo'];

    $sql = $conn->prepare("INSERT INTO mascotas (correo, nombre, tipo, raza, sexo, fecha_nacimiento, foto, rastreador) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $sql->bind_param("ssssssss", $correo, $nombre, $tipo, $raza, $sexo, $fecha, $avatar_src, $rastreador);

    if ($sql->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => "⚠️ Error al registrar mascota: " . $conn->error]);
    }

    $sql->close();
    $conn->close();
}
?>
