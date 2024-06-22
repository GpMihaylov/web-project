-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 09, 2024 at 05:30 PM
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
-- Database: `doctrack_3mi0600047_6mi0600059`
--
USE `doctrack_3mi0600047_6mi0600059`;

-- --------------------------------------------------------

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`email`, `salt`, `password`, `is_admin`) VALUES
('georgi@gmail.com', '5db26aa8596f41e6e1efbd52dbe13e07a41da2feb27ea3833bcb6c28b82824aa', '5dwOQ6q/0Kw/E', 0);


--
-- Dumping data for table `uploadeddocument`
--

INSERT INTO `uploadeddocument` (`file_name`, `user`, `location`, `category`, `archived`, `times_downloaded`, `access_key`, `document_priority`, `status`, `upload_date`) VALUES
('document1.txt', 'georgi@gmail.com', './upload/66659e5c99cff.txt', 'OtdelStudenti', 0, 0, '9jjxdvovdptlw364w9xh', 'low', 'Нов', '2024-06-21 12:00:00'),
('document2.txt', 'georgi@gmail.com', './upload/6665a8ca8c17a.txt', 'Sesiq', 0, 0, 'tapsleqw0phpuafccqi5', 'low', 'Нов', '2024-06-21 12:00:00'),
('document3.txt', 'georgi@gmail.com', './upload/6665a8e851861.txt', 'Sesiq', 0, 0, 'r5dqzrn8xomatxkcufqlqo', 'low', 'Нов', '2024-06-21 12:00:00'),
('document4.txt', 'georgi@gmail.com', './upload/6665a90295e14.txt', 'KandidatStudenti', 0, 0, '1q9qjyv119tlkak4w5vzwj', 'low', 'Нов', '2024-06-21 12:00:00'),
('document5.txt', 'georgi@gmail.com', './upload/6665ca12cd3c3.txt', 'UchebenOtdel', 0, 0, 'rahynwv0wjf7cuehdtsy4e', 'low', 'Нов', '2024-06-21 12:00:00'),
('document6.txt', 'georgi@gmail.com', './upload/6665ca3256e6f.txt', 'NoCategory', 0, 0, 'yy94s4h2d3csew4i4grrg', 'high', 'Нов', '2024-06-21 12:00:00'),
('document7.txt', 'georgi@gmail.com', './upload/6665ca7c24ca6.txt', 'OtdelStudenti', 0, 0, 'gx0zxhyadb7sal5p1bek6', 'low', 'Нов', '2024-06-21 12:00:00');


COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
