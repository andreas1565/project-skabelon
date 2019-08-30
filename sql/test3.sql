-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 30. 08 2019 kl. 10:43:12
-- Serverversion: 10.1.30-MariaDB
-- PHP-version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test3`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL DEFAULT ' delfalut ',
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`) VALUES
(18, 'andy hansen', 'hej'),
(19, 'hej', 'iidj');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `froendpage`
--

CREATE TABLE `froendpage` (
  `id` int(11) NOT NULL,
  `image` varchar(100) NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `froendpage`
--

INSERT INTO `froendpage` (`id`, `image`, `text`) VALUES
(1, 'testforside.jpg', 'her er noget text');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `fk_product` int(11) NOT NULL,
  `primary` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `images`
--

INSERT INTO `images` (`id`, `name`, `fk_product`, `primary`) VALUES
(5, '1566542763452_binary2-1327493_640.jpg', 32, 0),
(6, '1566542807359_binary2-1327493_640.jpg', 32, 0),
(8, '1566543602229_mobile-605422_640.jpg', 32, 0),
(9, '1566545680924_binary2-1327493_640.jpg', 32, 1),
(13, '1566543602229_mobile-605422_640.jpg', 35, 1),
(16, '1566837110443_mobile-605422_640.jpg', 36, 1),
(17, '1566903166655_mobile-phone-1917737_640.jpg', 32, 0),
(18, '1566903226673_iphone-410324_640.jpg', 32, 0),
(19, '1566903283479_mobile-605422_640.jpg', 32, 0);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `weight` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `fk_categories` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `weight`, `amount`, `fk_categories`) VALUES
(32, 'produkter', 'tete', '11.00', 11, 11, 19),
(35, 'produkter2', 'hej', '500.00', 7272, 36, 19),
(36, 'produkter3', 'andreas er gud', '20.00', 55, 11, 18),
(37, 'produkter4', 'hej', '13.00', 14, 21, 19),
(38, 'produkter5', 'hej', '600.00', 13, 13, 18),
(39, 'produkter6', 'hej med  dig ', '140.00', 80, 30, 18),
(40, 'produkter7', 'hej', '500.00', 72, 36, 19),
(41, 'produkter8', 'noget text', '1200.00', 7272, 36, 19),
(42, 'produkter9', 'mcffcfk', '140.00', 76, 55, 19),
(44, 'produkter10', 'hej ', '1200.00', 7272, 36, 19),
(45, 'produkter11', 'jidjiijed', '140.00', 7272, 66, 19),
(47, 'produkter12', 'dijjide', '500.00', 21, 22, 19),
(49, 'produkter 13', 'idijijdijd', '88.00', 49, 33, 19),
(50, 'produkter14', 'hej', '50.00', 33, 21, 18),
(51, 'produkter 15', 'jjjhe', '500.00', 6767, 82, 19),
(52, 'produkter 16', 'jieide', '23.00', 12, 33, 18),
(53, 'produkter 17', 'jjdd', '20.00', 12, 44, 19),
(54, 'produkter 18', 'jjdsijsjd', '12.00', 15, 22, 18),
(55, 'produkter 19', 'ijidj', '21.00', 11, 22, 19),
(56, 'produkter 20', 'hudhu', '13.00', 22, 22, 18),
(57, 'produkter 21', 'jjidf', '727.00', 33, 23, 19),
(58, 'produkter 22', 'jijidijd', '122.00', 73, 22, 18),
(59, 'produkter 23', 'iide', '200.00', 66, 22, 19),
(60, 'produkter 24', 'jieijde', '31.00', 44, 66, 18),
(61, 'produkter 25', 'dudeu', '43.00', 22, 33, 19);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `profiles`
--

INSERT INTO `profiles` (`id`, `email`) VALUES
(6, 'andreas.gr.hansen@gmail.com'),
(8, 'andreas.gr.hansen@gmail.com'),
(11, 'andreas.gr.hansen@gmail.com'),
(12, 'ibibsen@gmail.com'),
(13, 'ibib2sen@gmail.com'),
(14, 'ibibsen@gmail.com'),
(15, 'andreas.gr.hansen@gmail.com');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `roles`
--

INSERT INTO `roles` (`id`, `name`, `level`) VALUES
(1, 'superadmin', 100),
(2, 'admin', 99),
(3, 'customer', 10),
(4, 'guest', 1),
(5, 'employee', 50);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(12) NOT NULL,
  `passphrase` varchar(72) NOT NULL,
  `fk_profile` int(11) NOT NULL,
  `fk_role` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `users`
--

INSERT INTO `users` (`id`, `username`, `passphrase`, `fk_profile`, `fk_role`) VALUES
(3, 'admin', '$2a$10$8sOGlogGi2PXXLZB/aJ/GOh16ZvAsrzrkfIy9fl.mgHUX6H6qwnO2', 8, 2),
(6, 'test', '$2a$10$Iei7D.fH7LJgEsGYJX2P0uHFPy4gT2CeNF6OUkirM8EIlt2uj0a66', 11, 5),
(9, 'ib', '$2a$10$J68buI0amFVtveEneYuREeYWIl/vmwTGWYyi6FlNBM11ri5rYxchC', 14, 3);

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `froendpage`
--
ALTER TABLE `froendpage`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_categorie_fk_idx` (`fk_categories`);

--
-- Indeks for tabel `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`),
  ADD KEY `user_profile_fk_idx` (`fk_profile`),
  ADD KEY `user_roles_fk_idx` (`fk_role`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Tilføj AUTO_INCREMENT i tabel `froendpage`
--
ALTER TABLE `froendpage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tilføj AUTO_INCREMENT i tabel `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Tilføj AUTO_INCREMENT i tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- Tilføj AUTO_INCREMENT i tabel `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Tilføj AUTO_INCREMENT i tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Tilføj AUTO_INCREMENT i tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_categorie_fk` FOREIGN KEY (`fk_categories`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Begrænsninger for tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `user_profile_fk` FOREIGN KEY (`fk_profile`) REFERENCES `profiles` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_roles_fk` FOREIGN KEY (`fk_role`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
