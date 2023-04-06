<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "bettystorebdm";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);
// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $codProd=(isset($data->id))?$data->id:$_GET["actualizar"];
    $nomProd=$data->nombre;
    $categoriaProd=$data->correo;
    
    $sqlProducto = mysqli_query($conexionBD,"UPDATE producto SET nomProd='$nombre',categoriaProd='$categoriaProd' WHERE codProd='$codProd'");
    echo json_encode(["success"=>1]);
    exit();
}
?>