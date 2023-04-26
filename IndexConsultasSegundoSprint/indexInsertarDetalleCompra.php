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

    // Recibir los datos de la tabla comprasTotales de React
    $comprasTotales = $_POST["comprasTotales"];
    // Insertar los datos en la tabla detalleCompra
    foreach ($comprasTotales as $compraTotal) {
        $codDetCompra=$compraTotal["codigoCompra"];
        $nomDetCompra=$compraTotal["nombre"];
        $cantDetCompra=$compraTotal["cantidad"];
        $precioDetCompra=$compraTotal["precio"];
        $fechaDetCompra=$compraTotal["fecha"];
        $producto_codProd=$compraTotal["codProd"];
    
        $sql = "INSERT INTO detallecompra (codDetCompra, nomDetCompra, cantDetCompra, precioDetCompra, fechaDetCompra, Producto_codProd) VALUES ('".$codDetCompra."', '".$nomDetCompra."', '".$cantDetCompra."', '".$precioDetCompra."', '".$fechaDetCompra."', '".$producto_codProd."')";

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
    

}
?>