<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "bettystorebd";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

//Consulta mostrar los registros de venta y devuelve el vector
$vector = array(); 
$sql = "SELECT codDetVenta,nomDetVenta,precioDetVenta,cantDetVenta,fechaDetVenta FROM detalleventa";
$sqlVenta = mysqli_query($conexionBD, $sql);

while($fila = mysqli_fetch_assoc($sqlVenta)) {
    $vector[] = array(
        "codDetVenta" => $fila['codDetVenta'],
        "nomDetVenta" => $fila['nomDetVenta'],
        "precioDetVenta" => $fila['precioDetVenta'],
	    "cantDetVenta" => $fila['cantDetVenta'],
        "fechaDetVenta" => $fila['fechaDetVenta']
    );
}

mysqli_close($conexionBD);

$json = json_encode($vector);
echo $json;

?>