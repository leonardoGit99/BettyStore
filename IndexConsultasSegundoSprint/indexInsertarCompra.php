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


$datos=$_POST['datos'];
//Inserta los datos en la tabla compra
 foreach($datos as $dato){

    $codigoCompra=$dato["codigo"];
    $nomCompra=$dato["nombre"];
    $precioCompra=$dato["precio"];
    $cantidadCompra=$dato["cantidad"];
    $fechaCompra=$dato["fechaCompra"];

  $sqlQuery1= ("SELECT codProd FROM producto WHERE nomProd = '{$nomCompra}'");
  $query1=mysqli_query($conexionBD, $sqlQuery1);
  
   $codigoProd=mysqli_num_rows($query1);

   if($codigoProd==0){
        
    echo json_encode("codigo de nombre de compra no existe ");
}else{
   

    $sqlQuery= ("INSERT INTO compra (codDetCompra, nomDetCompra, cantDetCompra, precioDetCompra, fechaDetCompra, Producto_codProducto) VALUES ('".$codigoCompra."', '".$nomCompra."', '".$cantidadCompra."', '".$precioCompra."', '".$fechaCompra."', '".$codigoProd."')");
    
    if($conexionBD->query($sqlQuery) !==TRUE){
         echo"ERROR AL INSERTAR DATOS: " . $conexionBD->error;

    }

 }
   

 }
?>