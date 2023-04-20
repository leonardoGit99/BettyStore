<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "bettystorebd";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

//Inserta un nuevo registro y recepciona los datos de codigo,nombre,...
if(isset($_GET["insertarCompra"])){

    $codDetCompra=$_POST["codDetCompra"];
    $nomDetCompra=$_POST["nomDetCompra"];
    $cantDetCompra=$_POST["cantDetCompra"];
    $precioDetCompra=$_POST["precioDetCompra"];
    $fechaDetCompra=$_POST["fechaDetCompra"];
    

    $sql = "INSERT INTO detallecompra (codDetCompra, nomDetCompra, cantDetCompra, precioDetCompra, fechaDetCompra) VALUES ('".$codDetCompra."', '".$nomDetCompra."', '".$cantDetCompra."', '".$precioDetCompra."', '".$fechaDetCompra."')";

    try{
        
        mysqli_query($conexionBD, $sql);
        echo json_encode("Compra exitosa");

    }catch (Exception $error){
        if(strpos($error->getMessage(), "PRIMARY") !== false){
            echo json_encode("Error: El código de compra ya esta registrado");
        }else{
            //Otro error que pueda surgir **Mensaje en ingles**
            echo json_encode("Error: ".$error->getMessage());
        }

    }

}
?>