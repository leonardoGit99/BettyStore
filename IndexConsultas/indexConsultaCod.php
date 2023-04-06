<?php
// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "bettystorebdm";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["consultar"])){
    $sqlProducto = mysqli_query($conexionBD,"SELECT * FROM producto WHERE codProd=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlEmpleaados) > 0){
        $producto = mysqli_fetch_all($sqlProducto,MYSQLI_ASSOC);
        echo json_encode($producto);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
?>