<?php

try {
    $conexion = new PDO("mysql:host=localhost;port=3306;dbname=tablausuarios", "root", "");
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    $res = $conexion->query('SELECT * FROM usuarios') or die(print($conexion->errorInfo()));

    $data = [];

    while ($item = $res->fetch(PDO::FETCH_OBJ)) {
        $data[] = [
            'nombre' => $item->nombre,
            'edad' => $item->edad,
            'genero' => $item->genero,
        ];
    }

    echo json_encode($data);

} catch (PDOException $error) {
    echo $error->getMessage();
    die();
}
?>
