-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 10, 2018 at 02:18 AM
-- Server version: 5.6.38
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tugas_backend`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_login`
--

CREATE TABLE `admin_login` (
  `idAdmin` int(11) NOT NULL,
  `userAdmin` varchar(100) NOT NULL,
  `passwordAdmin` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin_login`
--

INSERT INTO `admin_login` (`idAdmin`, `userAdmin`, `passwordAdmin`) VALUES
(1, 'asd', 'asd');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `idCategory` int(11) NOT NULL,
  `idSeason` int(11) NOT NULL,
  `categoryName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`idCategory`, `idSeason`, `categoryName`) VALUES
(1, 1, 'Top'),
(2, 1, 'Bottom'),
(3, 1, 'Aksesoris'),
(4, 2, 'head'),
(5, 2, 'top'),
(6, 2, 'bottom'),
(7, 2, 'feet'),
(8, 3, 'top'),
(9, 3, 'bottom'),
(10, 4, 'top'),
(11, 4, 'bottom');

-- --------------------------------------------------------

--
-- Table structure for table `color`
--

CREATE TABLE `color` (
  `idColor` int(11) NOT NULL,
  `idProduct` int(11) NOT NULL,
  `colorName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `color`
--

INSERT INTO `color` (`idColor`, `idProduct`, `colorName`) VALUES
(1, 1, 'Putih'),
(2, 1, 'Hitam'),
(3, 2, 'Merah'),
(4, 2, 'Biru'),
(5, 3, 'Hijau'),
(6, 3, 'Kuning'),
(7, 4, 'Merah'),
(8, 4, 'Biru'),
(9, 5, 'Putih'),
(10, 5, 'Merah'),
(11, 6, 'Hitam'),
(12, 6, 'Biru'),
(13, 7, 'Putih'),
(14, 7, 'Hitam'),
(15, 8, 'Merah'),
(16, 8, 'Hitam'),
(17, 9, 'Hijau'),
(18, 9, 'Kuning'),
(19, 10, 'Merah'),
(20, 10, 'Putih'),
(21, 11, 'Putih'),
(22, 11, 'Biru'),
(23, 12, 'Hitam'),
(24, 12, 'Merah'),
(25, 13, 'Merah'),
(26, 13, 'Hitam'),
(27, 14, 'Merah'),
(28, 14, 'Biru'),
(29, 14, 'Putih'),
(30, 2, 'Hitam'),
(31, 1, 'Hijau'),
(32, 16, 'Hitam'),
(33, 15, 'Putih'),
(34, 15, 'Hijau'),
(35, 16, 'Merah'),
(36, 17, 'Hitam');

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `idInv` int(11) NOT NULL,
  `invCode` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_detail`
--

CREATE TABLE `invoice_detail` (
  `idInvDet` int(11) NOT NULL,
  `idInv` int(11) NOT NULL,
  `productName` varchar(100) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `idProduct` int(11) NOT NULL,
  `idCategory` int(11) NOT NULL,
  `productName` varchar(100) NOT NULL,
  `productDesc` varchar(100) NOT NULL,
  `productImage` varchar(100) DEFAULT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`idProduct`, `idCategory`, `productName`, `productDesc`, `productImage`, `price`) VALUES
(7, 4, 'Topi Bulu Ketek', 'topi dari bahan bulu ketek', '18t6z71yjfnllaos.jpeg', 300),
(8, 5, 'Kaos Tipis', 'kaos yang sangat tipis, cocok untuk dipakai di musim dingin agar cepat masuk angin', '18t6z71yjfnlmorv.jpeg', 500),
(9, 6, 'Celana Tipis', 'celana berbahan tipis, dipakai saat musim dingin agar kaki keram', '18t6z71yjfnls899.jpeg', 400),
(10, 7, 'Sepatu Bulu - bulu', 'sepatu yang motif nya bulu bulu, bikin gatel', '18t6z71yjfnltuix.jpeg', 700),
(11, 8, 'Kaos Biasa', 'kaos nya biasa aja, sumpah', '18t6z71yjfnlum6m.jpeg', 200),
(12, 9, 'Celana Biasa', 'celana nya biasa aja, sumpah', '18t6z71yjfnlv73o.jpeg', 200),
(13, 10, 'Jaket Setengah Badan', 'jaket yang panjang nya cuma setengah badan kita', '18t6z7ikjfnmqesw.jpeg', 300),
(14, 11, 'Celana Spanduk', 'celana dari bahan spanduk di pinggir jalan', '18t6z7ikjfnml3dd.jpeg', 500),
(15, 1, 'Sempak Bekas', 'sempak bekas pakai orang yang tidak anda duga duga', '18t6z62pjfngsuco.jpeg', 1000),
(16, 2, 'Celana Sunat', 'celana yang kalau dipakai seperti abis sunat', '18t6z6b2jfnkfmf2.jpeg', 300),
(17, 3, 'Bulu Mata Kaki', 'bulu mata khusus untuk mata kaki', '18t6z6b2jfnkn71p.jpeg', 200);

-- --------------------------------------------------------

--
-- Table structure for table `season`
--

CREATE TABLE `season` (
  `idSeason` int(11) NOT NULL,
  `seasonName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `season`
--

INSERT INTO `season` (`idSeason`, `seasonName`) VALUES
(1, 'Summer 2018'),
(2, 'Winter 2018'),
(3, 'Spring 2018'),
(4, 'Fall 2018');

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `idSize` int(11) NOT NULL,
  `idColor` int(11) NOT NULL,
  `sizeName` varchar(100) DEFAULT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`idSize`, `idColor`, `sizeName`, `stock`) VALUES
(1, 1, 'S', 5),
(2, 1, 'M', 5),
(3, 1, 'L', 5),
(4, 1, 'XL', 5),
(5, 2, 'S', 5),
(6, 2, 'M', 5),
(7, 2, 'L', 5),
(8, 2, 'XL', 5),
(9, 3, 'S', 5),
(10, 3, 'M', 5),
(11, 3, 'L', 5),
(12, 3, 'XL', 5),
(13, 4, 'S', 5),
(14, 4, 'M', 5),
(15, 4, 'L', 5),
(16, 4, 'XL', 5),
(17, 5, 'S', 5),
(18, 5, 'M', 5),
(19, 5, 'L', 5),
(20, 5, 'XL', 5),
(21, 6, 'S', 5),
(22, 6, 'M', 5),
(23, 6, 'L', 5),
(24, 6, 'XL', 5),
(25, 7, 'S', 5),
(26, 7, 'M', 5),
(27, 7, 'L', 5),
(28, 7, 'XL', 5),
(29, 8, 'S', 5),
(30, 8, 'M', 5),
(31, 8, 'L', 5),
(32, 8, 'XL', 5),
(33, 9, '4', 5),
(34, 9, '5', 5),
(35, 9, '6', 5),
(36, 9, '7', 5),
(37, 10, '4', 5),
(38, 10, '5', 5),
(39, 10, '6', 5),
(40, 10, '7', 5),
(41, 11, '4', 5),
(42, 11, '5', 5),
(43, 11, '6', 5),
(44, 11, '7', 5),
(45, 12, '4', 5),
(46, 12, '5', 5),
(47, 12, '6', 5),
(48, 12, '7', 5),
(49, 13, '4', 6),
(50, 13, '5', 5),
(51, 13, '6', 3),
(52, 13, '7', 5),
(53, 14, '4', 12),
(54, 14, '5', 5),
(55, 14, '6', 11),
(56, 14, '7', 5),
(57, 15, 'S', 5),
(58, 15, 'M', 5),
(59, 15, 'L', 5),
(60, 15, 'XL', 5),
(61, 16, 'S', 5),
(62, 16, 'M', 5),
(63, 16, 'L', 5),
(64, 16, 'XL', 5),
(65, 17, 'S', 5),
(66, 17, 'M', 5),
(67, 17, 'L', 5),
(68, 17, 'XL', 5),
(69, 18, 'S', 5),
(70, 18, 'M', 5),
(71, 18, 'L', 5),
(72, 18, 'XL', 5),
(73, 19, '39', 5),
(74, 19, '40', 5),
(75, 19, '41', 5),
(76, 19, '42', 5),
(77, 20, '39', 5),
(78, 20, '40', 5),
(79, 20, '41', 5),
(80, 20, '42', 5),
(81, 21, 'S', 5),
(82, 21, 'M', 5),
(83, 21, 'L', 5),
(84, 21, 'XL', 5),
(85, 22, 'S', 5),
(86, 22, 'M', 5),
(87, 22, 'L', 5),
(88, 22, 'XL', 5),
(89, 23, 'S', 5),
(90, 23, 'M', 5),
(91, 23, 'L', 5),
(92, 23, 'XL', 5),
(93, 24, 'S', 5),
(94, 24, 'M', 5),
(95, 24, 'L', 5),
(96, 24, 'XL', 5),
(97, 25, 'S', 5),
(98, 25, 'M', 5),
(99, 25, 'L', 5),
(100, 25, 'XL', 5),
(101, 26, 'S', 5),
(102, 26, 'M', 5),
(103, 26, 'L', 5),
(104, 26, 'XL', 5),
(105, 27, 'S', 5),
(106, 27, 'M', 5),
(107, 27, 'L', 5),
(108, 27, 'XL', 5),
(109, 28, 'S', 5),
(110, 28, 'M', 5),
(111, 28, 'L', 5),
(112, 28, 'XL', 5),
(113, 29, 'S', 5),
(114, 29, 'M', 5),
(115, 29, 'L', 5),
(116, 29, 'XL', 5),
(118, 31, 'S', 6),
(119, 31, 'M', 7),
(120, 31, 'L', 12),
(121, 32, '30', 4),
(122, 32, '31', 5),
(123, 32, '32', 3),
(124, 33, 'S', 12),
(125, 33, 'M', 10),
(126, 33, 'L', 11),
(127, 34, 'S', 3),
(128, 34, 'M', 4),
(129, 34, 'L', 6),
(130, 35, '29', 5),
(131, 35, '30', 5),
(132, 35, '31', 7),
(133, 36, 'S', 3),
(134, 36, 'M', 4),
(135, 36, 'L', 6);

-- --------------------------------------------------------

--
-- Table structure for table `user_data`
--

CREATE TABLE `user_data` (
  `idUser` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phonenumber` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_data`
--

INSERT INTO `user_data` (`idUser`, `name`, `email`, `phonenumber`) VALUES
(1, 'pandu', 'pandu@mail.com', '123456'),
(2, 'lala', 'lala@mail.com', '123654');

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

CREATE TABLE `user_login` (
  `idUser` int(11) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `passwordUser` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`idUser`, `userName`, `passwordUser`) VALUES
(1, 'pupupuwup', 'asd'),
(2, 'lala', 'asd');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_login`
--
ALTER TABLE `admin_login`
  ADD PRIMARY KEY (`idAdmin`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`idCategory`);

--
-- Indexes for table `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`idColor`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`idInv`);

--
-- Indexes for table `invoice_detail`
--
ALTER TABLE `invoice_detail`
  ADD PRIMARY KEY (`idInvDet`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`idProduct`);

--
-- Indexes for table `season`
--
ALTER TABLE `season`
  ADD PRIMARY KEY (`idSeason`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`idSize`);

--
-- Indexes for table `user_data`
--
ALTER TABLE `user_data`
  ADD PRIMARY KEY (`idUser`);

--
-- Indexes for table `user_login`
--
ALTER TABLE `user_login`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_login`
--
ALTER TABLE `admin_login`
  MODIFY `idAdmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `idCategory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `color`
--
ALTER TABLE `color`
  MODIFY `idColor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `idInv` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice_detail`
--
ALTER TABLE `invoice_detail`
  MODIFY `idInvDet` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `idProduct` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `season`
--
ALTER TABLE `season`
  MODIFY `idSeason` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `size`
--
ALTER TABLE `size`
  MODIFY `idSize` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `user_data`
--
ALTER TABLE `user_data`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_login`
--
ALTER TABLE `user_login`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
