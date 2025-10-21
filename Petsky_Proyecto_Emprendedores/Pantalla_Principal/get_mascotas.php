<?php
include('../conexion.php'); // Incluir la conexión a la base de datos

$correo = $_GET['correo'];
$stmt = $conn->prepare("SELECT id_mascota, nombre, tipo, raza, sexo, foto, rastreador FROM mascotas WHERE correo = ?");
$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();

$mascotas = array();
while ($row = $result->fetch_assoc()) {
    $mascotas[] = $row;
}

echo json_encode($mascotas);
?>
