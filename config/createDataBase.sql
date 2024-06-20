-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Време на генериране:  8 юни 2022 в 17:04
-- Версия на сървъра: 10.4.22-MariaDB
-- Версия на PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `doctrack_3mi0600047_6mi0600059` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `doctrack_3mi0600047_6mi0600059`;

--
-- База данни: `doctrack_3mi0600047_6mi0600059`
--

-- --------------------------------------------------------

--
-- Структура на таблица `uploadeddocument`
--

CREATE TABLE IF NOT EXISTS `uploadeddocument` (
  `file_name` text NOT NULL,
  `user` text NOT NULL,
  `location` text NOT NULL,
  `category` text NOT NULL,
  `archived` tinyint(1) NOT NULL,
  `times_downloaded` int(11) NOT NULL,
  `access_key` text NOT NULL,
  `document_priority` text NOT NULL
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура на таблица `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `email` text NOT NULL,
  `salt` text NOT NULL,
  `password` text NOT NULL,
  `is_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Схема на данните от таблица `user`
--

INSERT INTO `user` (`email`, `salt`, `password`, `is_admin`) VALUES
('admin', '7d702218b95f7e736d7d6034038e998a2b9b4f192e02a655d776a328a051e4fc', '7dcYomqN0tXYY', 1);

--
-- Indexes for dumped tables
--

--
-- Индекси за таблица `uploadeddocument`
--
ALTER TABLE `uploadeddocument`
  ADD PRIMARY KEY (`file_name`(200),`user`(100));

--
-- Индекси за таблица `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`email`(100));
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
