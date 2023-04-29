<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "bettystorebd";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

//Busqueda de nombre de producto
$vector = array(); 
$busqueda = $_GET['busqueda'];
if (isset($_GET['busqueda'])){
    $sql="SELECT nomProd FROM producto as p WHERE p.nomProd LIKE '%".$busqueda."%' ORDER BY p.nomProd";
    $sql = mysqli_query($conexionBD, $sql);
    while($fila = mysqli_fetch_assoc($sql)) {
        $vector[] = array(
            
            "nomProd" => $fila['nomProd'],
            
        );
    }
    
}
mysqli_close($conexionBD);
    
$json = json_encode($vector);
echo $json;

?>