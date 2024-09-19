-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2016 at 05:58 AM
-- Server version: 5.6.15-log
-- PHP Version: 5.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `portfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE IF NOT EXISTS `messages` (
  `id_message` int(2) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  `courriel` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `date_creation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_message`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `projets`
--

CREATE TABLE IF NOT EXISTS `projets` (
  `id_projet` int(2) NOT NULL AUTO_INCREMENT,
  `titre` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `technologies` text,
  `url_site` varchar(200) NOT NULL,
  `thumbnail` varchar(50) DEFAULT NULL,
  `credits` text,
  `date_ajout` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `affichage` tinyint(1) NOT NULL DEFAULT '0',
  `priorite` int(3) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_projet`),
  UNIQUE KEY `titre` (`titre`),
  UNIQUE KEY `url_site` (`url_site`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `projets`
--

INSERT INTO `projets` (`id_projet`, `titre`, `description`, `technologies`, `url_site`, `thumbnail`, `credits`, `date_ajout`, `affichage`, `priorite`) VALUES
(1, 'GreenSock', 'Voici un petit projet personnel qui présente les fonctionalités principales ou intéressantes de la librairie JavaScript GSAP (GreenSock Animation Platform). Je m''attarde aux modules TweenMax, TimelineMax et aux plugins. L''interface permet d''entrer des valeurs pour tester les fonctionalités.', 'JavaScript, GreenSock, HTML, SASS/CSS', 'projets/greensock', 'images/logo_greensock.png', 'Le logo utilisé pour ce projet est la propriété exclusive de GSAP (GreenSock).', '2016-05-23 20:43:17', 1, 90),
(2, 'Casino de Montréal', 'Pour ce projet scolaire, je devais réaliser une petite publicité Web pour le Casino de Montréal. Il s''agit d''une courte animation image par image dans un format prédéfini entièrement réalisée à l''aide du logiciel Adobe Photoshop.', 'Adobe Photoshop', 'http://www.youtube.com/embed/lnoEnqXPhgs?autoplay=0&enablejsapi=1', 'images/logo_casino.svg', 'Le logo utilisé pour ce projet est la propriété exclusive du Casino de Montréal.', '2016-05-23 23:18:54', 1, 50),
(3, 'Équiterre', 'Pour ce projet scolaire je devais concevoir et intégrer une nouvelle page d''accueil pour le site Web d''Équiterre. Je voulais créer une interface facile d''utilisation en disposant les élément de façon intuitive.', 'JavaScript, HTML, CSS, jQuery', 'projets/equiterre', 'images/logo_equiterre.svg', 'Le logo utilisé pour ce projet est la propriété exclusive d''équiterre.', '2016-05-23 22:48:25', 1, 60),
(4, 'Sale chien', 'Sale chien est un projet scolaire réalisé en équipe dans le cours de Création 3D III. J''étais responsable de l''animation des différentes scènes du film, de l''éclairage de l''environnement, de la modélisation de quelques objets ainsi que du montage vidéo et sonore final.', 'Autodesk Maya, Adobe Premiere Pro', 'http://www.youtube.com/embed/MjGDce0oywI?autoplay=0&enablejsapi=1', 'images/logo_sale_chien.jpg', 'Ce projet a été réalisé en collaboration avec mes collègues Thuy Tien Vo et Josianne Thessereault.', '2016-05-26 19:12:50', 1, 80),
(5, 'Abstrait', 'Voici un projet scolaire réalisé dans le cours de création vidéo. Malgré le fait que la durée et l''emplacement de tous les changements de plans étaient prédéfinis dans l''énoncé du travail, je devais réussir à l''aide d''une banque d''images et de sons à créer un montage vidéo qui saurait communiquer une idée ou une émotion.', 'Adobe Premiere Pro, Adobe Audition', 'http://www.youtube.com/embed/yuXY3oEoc5Q?autoplay=0&enablejsapi=1', 'images/logo_abstrait.jpg', 'credits Abstrait', '2016-05-26 19:48:59', 1, 70);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
