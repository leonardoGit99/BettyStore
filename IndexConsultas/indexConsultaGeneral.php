<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "bettystorebd";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

//Consulta todos los registros y devuelve el vector
$vector = array(); 
$sql = "SELECT * FROM producto";
$sqlProducto = mysqli_query($conexionBD, $sql);

while($fila = mysqli_fetch_assoc($sqlProducto)) {
    $vector[] = array(
        "codProd" => $fila['codProd'],
        "nomProd" => $fila['nomProd'],
        "categoriaProd" => $fila['categoriaProd'],
        "descripcionProd" => $fila['descripcionProd'],
        "precioProd" => $fila['precioProd'],
        "cantidadProd" => $fila['cantidadProd'],
        "fechaProd" => $fila['fechaProd'],
        "imagenProd" =>  base64_encode($fila['imagenProd'])
        
    );
}

mysqli_close($conexionBD);

$json = json_encode($vector);
echo $json;

?>