<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "bettystorebd";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

//Elimina un registro de acuerdo a un codigo
if (isset($_GET["borrar"])){

    $sqlProducto = mysqli_query($conexionBD,"DELETE FROM producto WHERE codProd=".$_GET["borrar"]);
    
    if($sqlProducto){
        echo json_encode("Producto eliminado");
        exit();
    }else{ 
        echo json_encode("Error al eliminar");
    }
}

?>