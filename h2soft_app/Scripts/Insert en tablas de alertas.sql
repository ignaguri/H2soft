-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: h2softapp
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `estados-alerta`
--

LOCK TABLES `estados-alerta` WRITE;
/*!40000 ALTER TABLE `estados-alerta` DISABLE KEYS */;
INSERT INTO `estados-alerta` (`idEstadoAlerta`, `nombre`, `createdAt`, `updatedAt`) VALUES (1,'Pendiente','2018-04-22 00:00:00','2018-04-22 00:00:00'),(2,'Realizada','2018-04-22 00:00:00','2018-04-22 00:00:00');
/*!40000 ALTER TABLE `estados-alerta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tipos-alerta`
--

LOCK TABLES `tipos-alerta` WRITE;
/*!40000 ALTER TABLE `tipos-alerta` DISABLE KEYS */;
INSERT INTO `tipos-alerta` (`idTipoAlerta`, `nombre`, `createdAt`, `updatedAt`) VALUES (1,'Recambio de dispenser','2018-04-22 00:00:00','2018-04-22 00:00:00'),(2,'Pedido de bidones','2018-04-22 00:00:00','2018-04-22 00:00:00'),(3,'Desvinculacion de dispenser','2018-04-22 00:00:00','2018-04-22 00:00:00');
/*!40000 ALTER TABLE `tipos-alerta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'h2softapp'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `crear-alertas-automaticas` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `crear-alertas-automaticas` ON SCHEDULE EVERY 1 DAY STARTS '2018-05-02 00:01:00' ON COMPLETION NOT PRESERVE ENABLE DO insert into alertas
(idObjetivo,
idTipo,
idEstado,
notificacion,
idDispenser,
createdAt,
updatedAt)
select 
o. idObjetivosXCliente, 
1,
1,
concat('Se debe cambiar el dispenser ' , d.idDispensers , ' en el objetivo ' ,  o.nombre), 
d.idDispensers,
DATE_FORMAT(NOW(),'%y-%m-%d') as createdAt,
DATE_FORMAT(NOW(),'%y-%m-%d') as updatedAt
from dispensers d 
inner join `objetivos-x-cliente` o
 on o.idObjetivosXCliente = d.idObjetivo
where 
DATE_FORMAT(d.fechaProxMantenimiento,'%y-%m-%d') =  DATE_FORMAT(NOW(),'%y-%m-%d') */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-05 14:11:49
