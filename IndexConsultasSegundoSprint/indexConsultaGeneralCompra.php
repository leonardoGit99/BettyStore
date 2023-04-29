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
$sql = "SELECT codDetCompra,Producto_codProducto,nomDetCompra,precioDetCompra,cantDetCompra,fechaDetCompra FROM detallecompra";
$sqlCompra = mysqli_query($conexionBD, $sql);

while($fila = mysqli_fetch_assoc($sqlCompra)) {
    $vector[] = array(
        "codDetCompra" => $fila['codDetCompra'],
	"producto_codProducto" => $fila['Producto_codProducto'],
        "nomDetCompra" => $fila['nomDetCompra'],
        "precioDetCompra" => $fila['precioDetCompra'],
	"cantDetCompra" => $fila['cantDetCompra'],
        "fechaDetCompra" => $fila['fechaDetCompra']
    );
}

mysqli_close($conexionBD);

$json = json_encode($vector);
echo $json;

?>