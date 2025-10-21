<?php
include('../conexion.php'); // Incluir la conexión a la base de datos

// Verificar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $vacuna = trim($_POST["vacuna"]);
    $fecha = trim($_POST["fecha_vacuna"]);
    $fecha2 = trim($_POST["fecha_valida"]);
    $id_mascota = trim($_POST["id_mascota"]);
    // Validar que los campos no estén vacíos
    if (empty($id_mascota) || empty($vacuna) || empty($fecha) || empty($fecha2)) {
        die("Todos los campos son obligatorios.");
    }

    // Insertar VACUNACION en la base de datos
    $sql = $conn->prepare("INSERT INTO vacunacion (id_mascota, nombre, fecha, fecha_fin) VALUES (?, ?, ?, ?)");
    $sql->bind_param("ssss", $id_mascota, $vacuna, $fecha, $fecha2);

    if ($sql->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => "⚠️ Error al registrar usuario: " . $conn->error]);
    }

    // Cerrar conexión
    $sql->close();
    $conn->close();
}
?>
