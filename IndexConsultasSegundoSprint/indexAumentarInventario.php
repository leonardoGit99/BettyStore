<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

class indexAumentarInventario{

    function aumentarInventario($cantidad, $codProd){

        // Conecta a la base de datos  con usuario, contraseña y nombre de la BD
        $servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "bettystorebd";
        $conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

        //Aumenta la cantidad en inventario segun un codigo de producto
        $sql = "UPDATE producto SET cantidadProd=cantidadProd+'".$cantidad."' WHERE codProd='".$codProd."'";
        $sqlProducto = mysqli_query($conexionBD, $sql);

        mysqli_close($conexionBD);

    }

}

?>