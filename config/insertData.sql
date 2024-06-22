SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

USE `doctrack_3mi0600047_6mi0600059`;

INSERT INTO `user` (`email`, `salt`, `password`, `is_admin`) VALUES
('georgi@gmail.com', '5db26aa8596f41e6e1efbd52dbe13e07a41da2feb27ea3833bcb6c28b82824aa', '5dwOQ6q/0Kw/E', 0);

INSERT INTO `uploadeddocument` (`file_name`, `user`, `location`, `category`, `archived`, `times_downloaded`, `access_key`, `document_priority`, `status`, `upload_date`) VALUES
('document1.txt', 'georgi@gmail.com', './upload/6676a7c2768a0.txt', 'OtdelStudenti', 0, 0, '5uqbesle4jjdwxmt0eii7', 'low', 'Нов', '2024-06-22 13:30:26'),
('document2.txt', 'georgi@gmail.com', './upload/6676a7dc11b17.txt', 'OtdelStudenti', 0, 0, 'kkkvoambpll516q6qlmgzh', 'low', 'Нов', '2024-06-22 13:30:52'),
('document3.txt', 'georgi@gmail.com', './upload/6676a7e94e576.txt', 'UchebenOtdel', 0, 0, 'f2tbeh2pfjcettbbz7gk7', 'low', 'Нов', '2024-06-22 13:31:05'),
('document4.txt', 'georgi@gmail.com', './upload/6676a80987adc.txt', 'UchebenOtdel', 0, 0, 'fwjwfw3mlizxj9bjqtcnk', 'low', 'Нов', '2024-06-22 13:31:37'),
('document5.txt', 'georgi@gmail.com', './upload/6676a81a394dd.txt', 'KandidatStudenti', 0, 0, 'ze9133ix8bmbkt948sixvr', 'low', 'Нов', '2024-06-22 13:31:54'),
('document6.txt', 'georgi@gmail.com', './upload/6676a83543b95.txt', 'Sesiq', 0, 0, '2nnpujat2urf9au4teq0p5', 'low', 'Нов', '2024-06-22 13:32:21'),
('document7.txt', 'georgi@gmail.com', './upload/6676a8410b274.txt', 'NoCategory', 0, 0, 'jy8qmgiruzfdmt942uogjw', 'low', 'Нов', '2024-06-22 13:32:33');

COMMIT;