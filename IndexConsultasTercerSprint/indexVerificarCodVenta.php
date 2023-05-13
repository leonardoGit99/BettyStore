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

//Verifica que no este duplicado el codigo de compra
if(isset($_GET["verificarcodventa"])){
    

    $codDetVenta=$_POST["codigoVenta"];

    $sqlQuery1   = ("SELECT DISTINCT codDetVenta FROM detalleventa WHERE codDetVenta='{$codDetVenta}'");
    $query1=mysqli_query($conexionBD, $sqlQuery1);
    $totalFilas=mysqli_num_rows($query1);

    if($totalFilas>=1){
        
        echo json_encode("No Disponible");

    }else{

        echo json_encode("Disponible");

    }

}
?>