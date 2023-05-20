-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-05-2023 a las 00:10:25
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bettystorebd`
--
CREATE DATABASE IF NOT EXISTS `bettystorebd` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bettystorebd`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `idadministrador` int(11) NOT NULL,
  `usuarioadministrador` varchar(20) NOT NULL,
  `contraseniaadministrador` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`idadministrador`, `usuarioadministrador`, `contraseniaadministrador`) VALUES
(1, 'betty2023admin', AES_ENCRYPT('AdminBetty1#','1234'));

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallecompra`
--

CREATE TABLE `detallecompra` (
  `codDetCompra` int(11) NOT NULL,
  `nomDetCompra` varchar(150) DEFAULT NULL,
  `cantDetCompra` int(11) DEFAULT NULL,
  `precioDetCompra` double DEFAULT NULL,
  `fechaDetCompra` varchar(15) DEFAULT NULL,
  `Producto_codProducto` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalleventa`
--

CREATE TABLE `detalleventa` (
  `codDetVenta` int(11) NOT NULL,
  `nomDetVenta` varchar(150) DEFAULT NULL,
  `cantDetVenta` int(11) DEFAULT NULL,
  `precioDetVenta` double DEFAULT NULL,
  `fechaDetVenta` varchar(15) DEFAULT NULL,
  `Producto_codProducto` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `codProd` bigint(20) NOT NULL,
  `nomProd` varchar(100) DEFAULT NULL,
  `categoriaProd` varchar(100) DEFAULT NULL,
  `descripcionProd` varchar(200) DEFAULT NULL,
  `precioProd` double DEFAULT NULL,
  `cantidadProd` int(11) DEFAULT NULL,
  `fechaProd` varchar(15) DEFAULT NULL,
  `imagenProd` mediumblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vendedor`
--

CREATE TABLE `vendedor` (
  `idvendedor` int(11) NOT NULL,
  `usuariovendedor` varchar(20) NOT NULL,
  `contraseniavendedor` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vendedor`
--

INSERT INTO `vendedor` (`idvendedor`, `usuariovendedor`, `contraseniavendedor`) VALUES
(2, 'daril2023vendedor', AES_ENCRYPT('VendDaril2&/','1234'));

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`idadministrador`);

--
-- Indices de la tabla `detallecompra`
--
ALTER TABLE `detallecompra`
  ADD PRIMARY KEY (`codDetCompra`) USING BTREE,
  ADD KEY `fk_DetalleCompra_Producto1_idx` (`Producto_codProducto`);

--
-- Indices de la tabla `detalleventa`
--
ALTER TABLE `detalleventa`
  ADD PRIMARY KEY (`codDetVenta`,`Producto_codProducto`),
  ADD KEY `fk_DetalleVenta_Producto1_idx` (`Producto_codProducto`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`codProd`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detallecompra`
--
ALTER TABLE `detallecompra`
  ADD CONSTRAINT `fk_DetalleCompra_Producto1` FOREIGN KEY (`Producto_codProducto`) REFERENCES `producto` (`codProd`) ON DELETE SET NULL;

--
-- Filtros para la tabla `detalleventa`
--
ALTER TABLE `detalleventa`
  ADD CONSTRAINT `fk_DetalleVenta_Producto1` FOREIGN KEY (`Producto_codProducto`) REFERENCES `producto` (`codProd`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
