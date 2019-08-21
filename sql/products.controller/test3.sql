-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 21. 08 2019 kl. 12:00:44
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
(18, 'andy hansen', '\r\n                                    ');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(120) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `weight` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `fk_categories` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `image`, `price`, `weight`, `amount`, `fk_categories`) VALUES
(19, 'andy hansen', 'jjsdjkd', '1566302835781_iphone-410324_640.jpg', '600.00', 11, 11, 18),
(27, 'andy hansen', 'jiejijedijde', '1566304072532_binary2-1327493_640.jpg', '600.00', 11, 11, 18),
(29, 'hej', 'hje', '1566373975352_binary2-1327493_640.jpg', '1200.00', 11, 11, 18);

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
(11, 'andreas.gr.hansen@gmail.com');

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
(3, 'admin', '$2a$10$OTSJgLBew1hLCVxnD0f7veSyKA7eJZSxfahwZwuZT1RfDMFR3/mJW', 8, 2),
(6, 'test', '$2a$10$Iei7D.fH7LJgEsGYJX2P0uHFPy4gT2CeNF6OUkirM8EIlt2uj0a66', 11, 5);

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `categories`
--
ALTER TABLE `categories`
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
-- Tilføj AUTO_INCREMENT i tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Tilføj AUTO_INCREMENT i tabel `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Tilføj AUTO_INCREMENT i tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Tilføj AUTO_INCREMENT i tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
