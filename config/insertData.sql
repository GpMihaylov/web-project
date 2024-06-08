-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2022 at 11:18 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `document_entry_system_62413_62414_62415`
--
USE `document_entry_system_62413_62414_62415`;

-- --------------------------------------------------------

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`email`, `salt`, `password`, `is_admin`) VALUES
('ivan@ivan.com', '3243158a9f2f830b25fec7d6eaf4dbbccaf63af00291e04e2c5ef12b3067e30c', '32kqXcDLr5IX.', 0);


--
-- Dumping data for table `uploadeddocument`
--

INSERT INTO `uploadeddocument` (`file_name`, `user`, `location`, `category`, `archived`, `times_downloaded`, `access_key`, `document_priority`) VALUES
('text_file1.txt', 'ivan@ivan.com', './upload/62a45c4b4c654.txt', 'OtdelStudenti', 0, 0, '36x8vpqlnux1vwkj3o2ign', 'low'),
('text_file2.txt', 'ivan@ivan.com', './upload/62a45d56ed7ee.txt', 'UchebenOtdel', 0, 0, '34zfcct4f1a1r5k7lz8ueb', 'low'),
('text_file3.txt', 'ivan@ivan.com', './upload/62a45d645d229.txt', 'Sesiq', 0, 0, 'puhtqd1izfh4ho4uh27n8k', 'low'),
('text_file4.txt', 'ivan@ivan.com', './upload/62a45d6edf6f6.txt', 'PersonalDocuments', 0, 0, 'onl2y1gi3r8hvvb2ga40md', 'low'),
('text_file5.txt', 'ivan@ivan.com', './upload/62a45d822fa1a.txt', 'OtdelStudenti', 0, 0, '0jrwdglqk9z510e6q8kav5j', 'low'),
('text_file6.txt', 'ivan@ivan.com', './upload/62a45da079ca6.txt', 'UchebenOtdel', 0, 0, '7pvaz9l2qnm85pailhm5x', 'low'),
('text_file7.txt', 'ivan@ivan.com', './upload/62a45dae42b51.txt', 'Sesiq', 0, 0, 'eo2vruv9i85ty807i52p1', 'low'),
('text_file8.txt', 'ivan@ivan.com', './upload/62a45db996e23.txt', 'PersonalDocuments', 0, 0, 'hrhant1krez3b91jl3waa', 'low');

COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
