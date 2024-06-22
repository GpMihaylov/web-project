SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `doctrack_3mi0600047_6mi0600059` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `doctrack_3mi0600047_6mi0600059`;

CREATE TABLE IF NOT EXISTS `uploadeddocument` (
  `file_name` text NOT NULL,
  `user` text NOT NULL,
  `location` text NOT NULL,
  `category` text NOT NULL,
  `archived` tinyint(1) NOT NULL,
  `times_downloaded` int(11) NOT NULL,
  `access_key` text NOT NULL,
  `document_priority` text NOT NULL,
  `status` text NOT NULL,
  `upload_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `user` (
  `email` text NOT NULL,
  `salt` text NOT NULL,
  `password` text NOT NULL,
  `is_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `user` (`email`, `salt`, `password`, `is_admin`) VALUES
('admin', '7d702218b95f7e736d7d6034038e998a2b9b4f192e02a655d776a328a051e4fc', '7dcYomqN0tXYY', 1);

ALTER TABLE `uploadeddocument`
  ADD PRIMARY KEY (`file_name`(200),`user`(100));

ALTER TABLE `user`
  ADD PRIMARY KEY (`email`(100));
COMMIT;