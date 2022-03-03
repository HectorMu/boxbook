-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.33 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para boxbook
CREATE DATABASE IF NOT EXISTS `boxbook` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `boxbook`;

-- Volcando estructura para tabla boxbook.friendship
CREATE TABLE IF NOT EXISTS `friendship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender` int(11) DEFAULT NULL,
  `receiver` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sender` (`sender`),
  KEY `receiver` (`receiver`),
  CONSTRAINT `friendship_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `users` (`id`),
  CONSTRAINT `friendship_ibfk_2` FOREIGN KEY (`receiver`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla boxbook.friendship: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `friendship` DISABLE KEYS */;
/*!40000 ALTER TABLE `friendship` ENABLE KEYS */;

-- Volcando estructura para tabla boxbook.messages
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender` int(11) DEFAULT NULL,
  `receiver` int(11) DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sender` (`sender`),
  KEY `receiver` (`receiver`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `users` (`id`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla boxbook.messages: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;

-- Volcando estructura para tabla boxbook.userbooks
CREATE TABLE IF NOT EXISTS `userbooks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_user` int(11) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `pageCount` double DEFAULT NULL,
  `thumbnail` varchar(500) DEFAULT NULL,
  `publisher` varchar(100) DEFAULT NULL,
  `publishedDate` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `review` varchar(255) DEFAULT NULL,
  `reviewDate` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`fk_user`),
  CONSTRAINT `userbooks_ibfk_1` FOREIGN KEY (`fk_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla boxbook.userbooks: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `userbooks` DISABLE KEYS */;
INSERT INTO `userbooks` (`id`, `fk_user`, `author`, `title`, `pageCount`, `thumbnail`, `publisher`, `publishedDate`, `status`, `score`, `review`, `reviewDate`) VALUES
	(4, 2, 'Antoine de Saint-Exupéry', 'El Principito', 288, 'http://books.google.com/books/content?id=1N0KDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'Babelcube Inc.', '2017-02-01', 'Read', 5, 'Me gusto mucho el libro', '23-06-2022'),
	(94, 1, 'Matt Forbeck', 'Halo: Bad Blood', 352, 'http://books.google.com/books/content?id=nxgyDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'Simon and Schuster', '2018-06-26', 'Read', 3, 'asdasdad', '2/3/2022, 12:42:36'),
	(95, 1, 'Anne Frank', 'El diario de Ana Frank (juvenil)', 96, 'http://books.google.com/books/content?id=6u8fAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'SELECTOR', '2013-06-18', 'Read', 5, 's', '2/3/2022, 12:42:49'),
	(96, 1, 'Koyoharu Gotouge', 'Kimetsu no Yaiba (Demon Slayer)', NULL, 'http://books.google.com/books/content?id=-aZaEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'Koyoharu Gotouge', '101-01-01', 'Read', 3, 's', '2/3/2022, 12:43:01'),
	(97, 3, 'Joseph Staten', 'Halo: Contact Harvest', 416, 'http://books.google.com/books/content?id=OW9-DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'Simon and Schuster', '2019-01-01', 'Read', 4, 'good book', '2/3/2022, 15:16:01');
/*!40000 ALTER TABLE `userbooks` ENABLE KEYS */;

-- Volcando estructura para tabla boxbook.userbooksadvance
CREATE TABLE IF NOT EXISTS `userbooksadvance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_user` int(11) DEFAULT NULL,
  `fk_book` int(11) DEFAULT NULL,
  `pagesReaded` int(11) DEFAULT NULL,
  `commentary` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`fk_user`),
  KEY `fk_book` (`fk_book`),
  CONSTRAINT `userbooksadvance_ibfk_1` FOREIGN KEY (`fk_user`) REFERENCES `users` (`id`),
  CONSTRAINT `userbooksadvance_ibfk_2` FOREIGN KEY (`fk_book`) REFERENCES `userbooks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla boxbook.userbooksadvance: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `userbooksadvance` DISABLE KEYS */;
/*!40000 ALTER TABLE `userbooksadvance` ENABLE KEYS */;

-- Volcando estructura para tabla boxbook.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `yearlyGoal` int(11) DEFAULT NULL,
  `booksReaded` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla boxbook.users: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `fullname`, `email`, `password`, `country`, `city`, `yearlyGoal`, `booksReaded`) VALUES
	(1, 'Hector117', 'Hector Manuel Munoz Flores', 'hector@gmail.com', '$2a$10$dKV.3qYOCHrr/3Mfk7t6SegxsV5avp9KEB/5gycb0HaY8jgSOO53O', 'Mexico', 'Lagos de Moreno', 20, 3),
	(2, 'DaikiMei', 'Celeste Ontiveros', 'celeste@gmail.com', '$2a$10$bnq3mEaZrzS4iSh/bOJRD.TLLXG0EdFiXmgFd8sS5Q7I.4OTFywmG', 'Mexico', 'Lagos de Moreno', 30, 0),
	(3, 'Pedro1892', 'Pedro Espinosa', 'pedro@gmail.com', '$2a$10$Wf8FUjf4EcDpNVk1cdLA0.oKb.C0bMZ/4VYtLKIWpnw4jNcMT7dyu', 'Mexico', 'Lagos de Moreno', 30, 1),
	(4, 'Juan32', 'Juan Luis Noriega', 'juan@gmail.com', '$2a$10$MAea1277tXs8PxLa442.8.GIArZK7LZAkSQnt0dZwqOA3LJqmqk8G', 'Mexico', 'Lagos de Moreno', 0, 0),
	(5, 'Mario212', 'Mario Moreno', 'mario@gmail.com', '$2a$10$km/z23rCoY4XURfodtEFy.QwQ7/EM0RKanqC0RZq6tSTy.SWs24wi', 'Spain', 'Barcelona', 0, 0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Volcando estructura para tabla boxbook.userscatalogcommentaries
CREATE TABLE IF NOT EXISTS `userscatalogcommentaries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_visitor` int(11) DEFAULT NULL,
  `fk_usercatalog` int(11) DEFAULT NULL,
  `commentary` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_visitor` (`fk_visitor`),
  KEY `fk_usercatalog` (`fk_usercatalog`),
  CONSTRAINT `userscatalogcommentaries_ibfk_1` FOREIGN KEY (`fk_visitor`) REFERENCES `users` (`id`),
  CONSTRAINT `userscatalogcommentaries_ibfk_2` FOREIGN KEY (`fk_usercatalog`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla boxbook.userscatalogcommentaries: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `userscatalogcommentaries` DISABLE KEYS */;
INSERT INTO `userscatalogcommentaries` (`id`, `fk_visitor`, `fk_usercatalog`, `commentary`) VALUES
	(1, 1, 4, 'No book yet?, if you dont know what to read you can contact me!'),
	(2, 1, 3, 'Well choice of books, but i prefer more actions books than anything'),
	(3, 1, 2, 'Good book to start in this world of books'),
	(4, 2, 1, 'Good books,  i love halo videosgames and the books are insane too!'),
	(5, 2, 4, 'I recommend start reading short books, its a good beginning');
/*!40000 ALTER TABLE `userscatalogcommentaries` ENABLE KEYS */;

-- Volcando estructura para vista boxbook.view_catalogcommentaries
-- Creando tabla temporal para superar errores de dependencia de VIEW
CREATE TABLE `view_catalogcommentaries` (
	`id` INT(11) NOT NULL,
	`fk_visitor` INT(11) NULL,
	`fk_usercatalog` INT(11) NULL,
	`username` VARCHAR(100) NULL COLLATE 'latin1_swedish_ci',
	`country` VARCHAR(50) NULL COLLATE 'latin1_swedish_ci',
	`city` VARCHAR(50) NULL COLLATE 'latin1_swedish_ci',
	`commentary` VARCHAR(500) NULL COLLATE 'latin1_swedish_ci'
) ENGINE=MyISAM;

-- Volcando estructura para vista boxbook.view_receiverfriends
-- Creando tabla temporal para superar errores de dependencia de VIEW
CREATE TABLE `view_receiverfriends` (
	`id` INT(11) NOT NULL,
	`sender` INT(11) NULL,
	`receiver` INT(11) NULL,
	`status` VARCHAR(50) NULL COLLATE 'latin1_swedish_ci',
	`username` VARCHAR(100) NULL COLLATE 'latin1_swedish_ci'
) ENGINE=MyISAM;

-- Volcando estructura para vista boxbook.view_receivernotifications
-- Creando tabla temporal para superar errores de dependencia de VIEW
CREATE TABLE `view_receivernotifications` (
	`id` INT(11) NOT NULL,
	`sender` INT(11) NULL,
	`receiver` INT(11) NULL,
	`status` VARCHAR(50) NULL COLLATE 'latin1_swedish_ci',
	`username` VARCHAR(100) NULL COLLATE 'latin1_swedish_ci'
) ENGINE=MyISAM;

-- Volcando estructura para vista boxbook.view_catalogcommentaries
-- Eliminando tabla temporal y crear estructura final de VIEW
DROP TABLE IF EXISTS `view_catalogcommentaries`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `view_catalogcommentaries` AS SELECT uscc.id, uscc.fk_visitor, uscc.fk_usercatalog, u.username, u.country, u.city, uscc.commentary FROM userscatalogcommentaries uscc, users u WHERE uscc.fk_visitor = u.id ;

-- Volcando estructura para vista boxbook.view_receiverfriends
-- Eliminando tabla temporal y crear estructura final de VIEW
DROP TABLE IF EXISTS `view_receiverfriends`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `view_receiverfriends` AS SELECT f.id, f.sender, f.receiver, f.status, u.username FROM friendship f, users u WHERE u.id = f.sender && f.status ='Friends' ;

-- Volcando estructura para vista boxbook.view_receivernotifications
-- Eliminando tabla temporal y crear estructura final de VIEW
DROP TABLE IF EXISTS `view_receivernotifications`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `view_receivernotifications` AS SELECT f.id, f.sender, f.receiver, f.status, u.username FROM friendship f, users u WHERE u.id = f.sender && f.status ='Pending' ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
