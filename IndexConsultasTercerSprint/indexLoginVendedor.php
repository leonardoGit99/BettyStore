<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require_once('php-jwt-main/src/JWT.php');
require_once('php-jwt-main/src/BeforeValidException.php');
require_once('php-jwt-main/src/ExpiredException.php');
require_once('php-jwt-main/src/SignatureInvalidException.php');

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "bettystorebd";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

use \Firebase\JWT\JWT;
// Recuperar el nombre de usuario y la contraseña enviados desde el formulario de inicio de sesión
$usuario = $_POST['usuario'];
$contrasenia = $_POST['contrasenia'];

// Conectar a la base de datos y verificar las credenciales
if(isset($_GET["login"])){

    $query = "SELECT idvendedor, usuariovendedor, CAST(AES_DECRYPT(contraseniavendedor, '1234') AS CHAR) FROM vendedor WHERE usuariovendedor = '$usuario' AND contraseniavendedor = AES_ENCRYPT('".$contrasenia."','1234')";
    $result = $conexionBD->query($query);

    // Si las credenciales son válidas, generar un token JWT
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $payload = array(
            'id' => $user['idvendedor'],
            'usuario' => $user['usuariovendedor']
        );
        $key = '1234Auy';
        $jwt = JWT::encode($payload, $key, 'HS256');

        // Devolver el token al usuario
        header('Content-Type: application/json');
        echo json_encode(array('token' => $jwt));
    } else {
        // Devolver un error si las credenciales no son válidas
        header('HTTP/1.1 401 Unauthorized');
        echo 'Verifique el usuario y la contraseña';
    }

    $conexionBD->close();

}

?>