-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-07-2020 a las 14:32:55
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS `delilahResto`;
CREATE DATABASE `delilahResto`;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilahresto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `totalPrice` float NOT NULL,
  `paymentMethod` enum('Efectivo','Tarjeta') NOT NULL,
  `state` enum('Nuevo','Confirmado','Preparando','Enviando','Entregado') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `totalPrice`, `paymentMethod`, `state`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 660, 'Efectivo', 'Nuevo', '2020-07-29 12:25:32', '2020-07-29 12:25:32', 1),
(2, 570, 'Tarjeta', 'Nuevo', '2020-07-29 12:26:28', '2020-07-29 12:26:28', 1),
(3, 1410, 'Tarjeta', 'Nuevo', '2020-07-29 12:27:41', '2020-07-29 12:27:41', 2),
(4, 1180, 'Tarjeta', 'Nuevo', '2020-07-29 12:28:08', '2020-07-29 12:28:08', 2),
(5, 370, 'Tarjeta', 'Nuevo', '2020-07-29 12:28:27', '2020-07-29 12:28:27', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordersproducts`
--

CREATE TABLE `ordersproducts` (
  `id` int(11) NOT NULL,
  `productQuantity` int(11) NOT NULL,
  `subtotalPrice` float NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ordersproducts`
--

INSERT INTO `ordersproducts` (`id`, `productQuantity`, `subtotalPrice`, `orderId`, `productId`) VALUES
(1, 1, 200, 1, 2),
(2, 2, 140, 1, 1),
(3, 1, 320, 1, 3),
(4, 1, 70, 2, 1),
(5, 1, 300, 2, 5),
(6, 1, 200, 2, 2),
(7, 3, 210, 3, 1),
(8, 2, 600, 3, 5),
(9, 3, 600, 3, 2),
(10, 2, 640, 4, 3),
(11, 2, 140, 4, 1),
(12, 2, 400, 4, 2),
(13, 1, 70, 5, 1),
(14, 1, 300, 5, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `imgSrc` text NOT NULL,
  `isAvailable` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `imgSrc`, `isAvailable`) VALUES
(1, 'Coca cola', 'Coca de 500ml', 70, 'imagendeunacoca', 1),
(2, 'Papas fritas', 'Porcion de papas', 200, 'imagendepapas', 1),
(3, 'Hamburguesa', 'Hamburguesa con queso', 320, 'imagendehamburguesa', 1),
(4, 'Pizza Anana', 'Pizza de anana', 380, 'imagendepizzaanana', 0),
(5, 'Pizza Muzza', 'Pizza de muzza', 300, 'imagendepizzamuzza', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userName` text NOT NULL,
  `password` text NOT NULL,
  `fullName` text NOT NULL,
  `email` text NOT NULL,
  `phoneNumber` text NOT NULL,
  `address` text NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `userName`, `password`, `fullName`, `email`, `phoneNumber`, `address`, `isAdmin`) VALUES
(1, 'paudiaz', 'miContrasenia', 'Paula Diaz', 'pau.diaz@hotmail.com.ar', '3416321456', 'Calle Linda 123', 1),
(2, 'usuarioInvitado1', 'contraseniaInvitada1', 'Pepito Perez', 'pepito@hotmail.com.ar', '3412345678', 'Calle Linda 456', 0),
(3, 'usuarioInvitado2', 'contraseniaInvitada2', 'Manolita Sosa', 'manolita@hotmail.com.ar', '3415789654', 'Otra Calle 321', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `ordersproducts`
--
ALTER TABLE `ordersproducts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `ordersProducts_productId_orderId_unique` (`orderId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `ordersproducts`
--
ALTER TABLE `ordersproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `ordersproducts`
--
ALTER TABLE `ordersproducts`
  ADD CONSTRAINT `ordersproducts_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ordersproducts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
