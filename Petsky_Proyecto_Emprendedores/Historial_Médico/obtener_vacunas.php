<?php
include('../conexion.php');

if (isset($_GET['id_mascota'])) {
    $id_mascota = $_GET['id_mascota'];

    $sql = $conn->prepare("SELECT nombre, fecha, fecha_fin FROM vacunacion WHERE id_mascota = ?");
    $sql->bind_param("i", $id_mascota);
    $sql->execute();
    $result = $sql->get_result();

    $vacunas = [];
    while ($row = $result->fetch_assoc()) {
        $vacunas[] = $row;
    }

    echo json_encode($vacunas);

    $sql->close();
    $conn->close();
} else {
    echo json_encode(["error" => "ID no recibido"]);
}
?>
