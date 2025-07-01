-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2025 at 08:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_crud`
--

-- --------------------------------------------------------

--
-- Table structure for table `colaborador`
--

CREATE TABLE `colaborador` (
  `id` int(11) NOT NULL,
  `empresaId` int(11) NOT NULL,
  `nombreCompleto` varchar(191) NOT NULL,
  `edad` int(11) NOT NULL,
  `telefono` varchar(191) DEFAULT NULL,
  `correo` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `colaborador`
--

INSERT INTO `colaborador` (`id`, `empresaId`, `nombreCompleto`, `edad`, `telefono`, `correo`) VALUES
(4, 4, 'Jose Luis Morales', 24, '34567654', 'joluis@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `departamento`
--

CREATE TABLE `departamento` (
  `id` int(11) NOT NULL,
  `nombre` varchar(191) NOT NULL,
  `paisId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `departamento`
--

INSERT INTO `departamento` (`id`, `nombre`, `paisId`) VALUES
(1, 'Alta Verapaz', 1),
(2, 'Managua', 2),
(3, 'Boaco', 2),
(5, 'Baja Verapaz', 1);

-- --------------------------------------------------------

--
-- Table structure for table `empresa`
--

CREATE TABLE `empresa` (
  `id` int(11) NOT NULL,
  `paisId` int(11) NOT NULL,
  `departamentoId` int(11) NOT NULL,
  `municipioId` int(11) NOT NULL,
  `nit` varchar(191) NOT NULL,
  `razonSocial` varchar(191) NOT NULL,
  `nombreComercial` varchar(191) DEFAULT NULL,
  `telefono` varchar(191) DEFAULT NULL,
  `correo` varchar(191) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `empresa`
--

INSERT INTO `empresa` (`id`, `paisId`, `departamentoId`, `municipioId`, `nit`, `razonSocial`, `nombreComercial`, `telefono`, `correo`, `activo`) VALUES
(3, 2, 3, 4, '345324634', 'Chepe Pollo', 'Chepe Pollo', '45234243', 'chepepollo@gmail.com', 0),
(4, 1, 1, 3, '324252345', 'ChinoMoto', 'Chino Moto', '34544434', 'chinomoto@gmail.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `municipio`
--

CREATE TABLE `municipio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(191) NOT NULL,
  `departamentoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `municipio`
--

INSERT INTO `municipio` (`id`, `nombre`, `departamentoId`) VALUES
(1, 'Cobán', 1),
(2, 'Tipitapa', 2),
(3, 'Carchá', 1),
(4, 'Santa Lucía', 3);

-- --------------------------------------------------------

--
-- Table structure for table `pais`
--

CREATE TABLE `pais` (
  `id` int(11) NOT NULL,
  `nombre` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pais`
--

INSERT INTO `pais` (`id`, `nombre`) VALUES
(1, 'Guatemala'),
(2, 'Nicaragua');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('cbca3a67-9274-4f35-8966-bfd16060d5b1', '920275adce3ab5319bbc1bed64539cf86b196d6cad65c97985d1764197504d53', '2025-07-01 06:37:50.689', '20250701063750_add_activo_to_empresa', NULL, NULL, '2025-07-01 06:37:50.680', 1),
('dc446f1b-c7e5-4ad3-a8ba-dd9d0ae400d5', '3fe04535f96bfc6434866bfc61cc156d9ce2d74929cc3a18cad8ad2c25ae153f', '2025-06-27 04:19:58.909', '20250627041958_initial_migration', NULL, NULL, '2025-06-27 04:19:58.640', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `colaborador`
--
ALTER TABLE `colaborador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Colaborador_empresaId_fkey` (`empresaId`);

--
-- Indexes for table `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Departamento_paisId_fkey` (`paisId`);

--
-- Indexes for table `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Empresa_paisId_fkey` (`paisId`),
  ADD KEY `Empresa_departamentoId_fkey` (`departamentoId`),
  ADD KEY `Empresa_municipioId_fkey` (`municipioId`);

--
-- Indexes for table `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Municipio_departamentoId_fkey` (`departamentoId`);

--
-- Indexes for table `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `colaborador`
--
ALTER TABLE `colaborador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `departamento`
--
ALTER TABLE `departamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `municipio`
--
ALTER TABLE `municipio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pais`
--
ALTER TABLE `pais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `colaborador`
--
ALTER TABLE `colaborador`
  ADD CONSTRAINT `Colaborador_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresa` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `departamento`
--
ALTER TABLE `departamento`
  ADD CONSTRAINT `Departamento_paisId_fkey` FOREIGN KEY (`paisId`) REFERENCES `pais` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `empresa`
--
ALTER TABLE `empresa`
  ADD CONSTRAINT `Empresa_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `departamento` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Empresa_municipioId_fkey` FOREIGN KEY (`municipioId`) REFERENCES `municipio` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Empresa_paisId_fkey` FOREIGN KEY (`paisId`) REFERENCES `pais` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `municipio`
--
ALTER TABLE `municipio`
  ADD CONSTRAINT `Municipio_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `departamento` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
