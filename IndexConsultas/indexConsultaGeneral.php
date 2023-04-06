<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "bettystorebd";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);
if($conexionBD){
    echo"conexxion establecida?? ";
}
else{
    echo"noh hay conexion";

}



// Consulta todos los registros de la tabla empleados
$sqlProducto = mysqli_query($conexionBD,"SELECT * FROM producto ");
if(mysqli_num_rows($sqlProducto) > 0){
    $producto = mysqli_fetch_all($sqlProducto,MYSQLI_ASSOC);
    echo json_encode($producto);
}
else{ echo json_encode([["success"=>0]]); }


?>