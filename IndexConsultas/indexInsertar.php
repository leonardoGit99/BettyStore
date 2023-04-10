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
if(isset($_GET["insertar"])){

    $codProd=$_POST["codProd"];
    $nomProd=$_POST["nomProd"];
    $categoriaProd=$_POST["categoriaProd"];
    $descripcionProd=$_POST["descripcionProd"];
    $precioProd=$_POST["precioProd"];
    $cantidadProd=$_POST["cantidadProd"];
    $fechaProd=$_POST["fechaProd"];
    $imagenProd=addslashes(file_get_contents($_FILES["imagenProd"]['tmp_name']));

    $sql = "INSERT INTO producto (codProd, nomProd, categoriaProd, descripcionProd, precioProd, cantidadProd, fechaProd, imagenProd) VALUES ('".$codProd."', '".$nomProd."', '".$categoriaProd."', '".$descripcionProd."', '".$precioProd."', '".$cantidadProd."', '".$fechaProd."', '".$imagenProd."')";

    try{
        
        mysqli_query($conexionBD, $sql);
        echo json_encode("Producto registrado exitosamente");

    }catch (Exception $error){
        if(strpos($error->getMessage(), "PRIMARY") !== false){
            echo json_encode("Error: El código de producto ya esta registrado");
        }else{
            //Otro error que pueda surgir **Mensaje en ingles**
            echo json_encode("Error: ".$error->getMessage());
        }

    }

}
?>