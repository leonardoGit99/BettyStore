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
if(isset($_GET["insertarVenta"])){

    // Recibir los datos de la tabla ventasTotales de React
    $ventasTotales = json_decode(file_get_contents("php://input"), true);
    //Incluir el archivo que contiene la definición de la clase
    require_once 'indexDisminuirInventario.php';
    // Insertar los datos en la tabla detalleVenta
    foreach ($ventasTotales as $ventaTotal) {
        
        $codDetVenta=$ventaTotal["codDetVenta"];
        $nomDetVenta=$ventaTotal["nomDetVenta"];
        $cantDetVenta=$ventaTotal["cantDetVenta"];
        $precioDetVenta=$ventaTotal["precioDetVenta"];
        $fechaDetVenta=$ventaTotal["fechaDetVenta"];
        $producto_codProd=$ventaTotal["codProd"];
    
        $sql = "INSERT INTO detalleventa (codDetVenta, nomDetVenta, cantDetVenta, precioDetVenta, fechaDetVenta, Producto_codProducto) VALUES ('".$codDetVenta."', '".$nomDetVenta."', '".$cantDetVenta."', '".$precioDetVenta."', '".$fechaDetVenta."', '".$producto_codProd."')";

        try{
        
            mysqli_query($conexionBD, $sql);
            echo json_encode("¡Venta exitosa!");
            //Instanciar la clase
            $objeto = new indexDisminuirInventario();
            // Llamar al método disminuirInventario pasándole los parámetros de cantidad y codigo de producto
            $objeto->disminuirInventario($cantDetVenta, $producto_codProd);

        }catch (Exception $error){
            if(strpos($error->getMessage(), "PRIMARY") !== false){
                echo json_encode("Error: El codigo de venta ".$codDetVenta." ya esta registrado");
            }else{
                //Otro error que pueda surgir **Mensaje en ingles**
                echo json_encode("Error: ".$error->getMessage());
            }

        }
        
    }

}
?>