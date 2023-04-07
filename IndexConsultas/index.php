<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "bettystorebd";
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
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqlProducto = mysqli_query($conexionBD,"DELETE FROM producto WHERE codProd=".$_GET["borrar"]);
    if($sqlProducto){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recepciona en método post los datos de codigo,nombre,...
if(isset($_GET["insertar"])){

    $codprod=$_POST["codProd"];
    $nomProd=$_POST["nomProd"];
    $categoriaProd=$_POST["categoriaProd"];
    $descripcionProd=$_POST["descripcionProd"];
    $precioProd=$_POST["precioProd"];
    $cantidadProd=$_POST["cantidadProd"];
    $fechaProd=$_POST["fechaProd"];
    $imagenProd=addslashes(file_get_contents($_FILES["imagenProd"]['tmp_name']));

    $sql = "INSERT INTO producto (codProd, nomProd, categoriaProd, descripcionProd, precioProd, cantidadProd, fechaProd, imagenProd) VALUES (".$codProd.", '".$nomProd."', '".$categoriaProd."', '".$descripcionProd."', ".$precioProd.", ".$cantidadProd.", ".$fechaProd.", '".$imagenProd."')";
    mysqli_query($conn, $sql);
            
    echo json_encode(["success"=>1]);

    exit();
}
// Actualiza datos de producto
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $codProd=(isset($data->id))?$data->id:$_GET["actualizar"];
    $nomProd=$data->nombre;
    $categoriaProd=$data->correo;
    
    $sqlProducto = mysqli_query($conexionBD,"UPDATE producto SET nomProd='$nombre',categoriaProd='$categoriaProd' WHERE codProd='$codProd'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla producto
$sqlProducto = mysqli_query($conexionBD,"SELECT * FROM producto ");
if(mysqli_num_rows($sqlProducto) > 0){
    $producto = mysqli_fetch_all($sqlProducto,MYSQLI_ASSOC);
    echo json_encode($producto);
}
else{ echo json_encode([["success"=>0]]); }


?>