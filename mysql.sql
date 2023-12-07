-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: LAB
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `achievements`
--

DROP TABLE IF EXISTS `achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `achievements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `labcode` varchar(200) DEFAULT NULL,
  `comp_name` varchar(200) DEFAULT NULL,
  `comp_desc` varchar(200) DEFAULT NULL,
  `comp_image` varchar(200) DEFAULT NULL,
  `app_status` varchar(200) DEFAULT 'initiated',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achievements`
--

LOCK TABLES `achievements` WRITE;
/*!40000 ALTER TABLE `achievements` DISABLE KEYS */;
INSERT INTO `achievements` VALUES (1,'SLB008','Brics International Skill','Won Bronze','image-1683197114106.png','approved'),(2,'SLB008','Google Cloud','Won Gold Medal','image-1682307218006.png','approved'),(3,'SLB008','Infosys ','gone finals','image-1683102191992.jpg','approved'),(4,'SLB008','TCS','Won 3 prizes ','image-1683106420639.jpg','approved'),(5,'SLB009','Won Medal at Google Comp','Won Medal at Google Comp','image-1682307218006.png','initiated'),(6,'SLB009','Won Medal at Google Comp','Won Medal at Google Comp','image-1682307220897.png','approved'),(10,'SLB009','Won inhardware hackathon oragnized by mech','Won inhardware hackathon oragnized by mech','image-1683102957896.jpg','initiated'),(12,'SLB008','won in competition','won in competition','image-1683189405346.png','initiated'),(13,'SLB008','won in a comp','won in a comp','image-1683197114106.png','initiated');
/*!40000 ALTER TABLE `achievements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `admin_stock_view`
--

DROP TABLE IF EXISTS `admin_stock_view`;
/*!50001 DROP VIEW IF EXISTS `admin_stock_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `admin_stock_view` AS SELECT 
 1 AS `id`,
 1 AS `apex_no`,
 1 AS `item_code`,
 1 AS `item_type`,
 1 AS `item_name`,
 1 AS `item_subname`,
 1 AS `item_description`,
 1 AS `cost_per_item`,
 1 AS `quantity_units`,
 1 AS `manufacturer_id`,
 1 AS `supplier_id`,
 1 AS `manufacturer_name`,
 1 AS `supplier_name`,
 1 AS `contact`,
 1 AS `stock_qty`,
 1 AS `inventory_value`,
 1 AS `user_id`,
 1 AS `dept_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Electronics'),(2,'Electricals-Hardware'),(3,'Electricals-Batteries'),(4,'Plumping-Hardware'),(5,'MS/AL Pipes & sheets - Hardware'),(6,'Mechanical consumables/accessories'),(7,'3D Filament'),(8,'UAV products');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `categories_view`
--

DROP TABLE IF EXISTS `categories_view`;
/*!50001 DROP VIEW IF EXISTS `categories_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `categories_view` AS SELECT 
 1 AS `Stock`,
 1 AS `name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `incharge_faculty_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `faculty_id` varchar(200) NOT NULL,
  `name` varchar(255) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `contact_no` varchar(255) NOT NULL,
  `department_code` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`faculty_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES ('STU008','Hariharan P','STUDENT-3','hariharanp.cs21@bitsathy.ac.in','1234645433','SLB009','slbincharge'),('STU009','Sai Prashanth K','STUDENT-3','saiprashanth.cs21@bitsathy.ac.in','1234567890','SLB008','slbincharge'),('STU010','Kavinraj k','STUDENT-3','kavinraj.cs21@bitsathy.ac.in','1213321231','SLBS','slsincharge');
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gurukulam`
--

DROP TABLE IF EXISTS `gurukulam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gurukulam` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `incharge_faculty_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gurukulam`
--

LOCK TABLES `gurukulam` WRITE;
/*!40000 ALTER TABLE `gurukulam` DISABLE KEYS */;
/*!40000 ALTER TABLE `gurukulam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `inventory_view`
--

DROP TABLE IF EXISTS `inventory_view`;
/*!50001 DROP VIEW IF EXISTS `inventory_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `inventory_view` AS SELECT 
 1 AS `name`,
 1 AS `Cost`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `item_view`
--

DROP TABLE IF EXISTS `item_view`;
/*!50001 DROP VIEW IF EXISTS `item_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `item_view` AS SELECT 
 1 AS `item_code`,
 1 AS `item_type`,
 1 AS `item_name`,
 1 AS `item_subname`,
 1 AS `item_description`,
 1 AS `manufacturer_name`,
 1 AS `supplier_name`,
 1 AS `contact`,
 1 AS `cost_per_item`,
 1 AS `quantity_units`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `itemtable`
--

DROP TABLE IF EXISTS `itemtable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itemtable` (
  `item_code` varchar(255) NOT NULL,
  `item_type` varchar(255) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_subname` varchar(255) NOT NULL,
  `item_description` varchar(255) NOT NULL,
  `cost_per_item` int NOT NULL,
  `quantity_units` varchar(255) NOT NULL,
  `manufacturer_id` varchar(255) NOT NULL,
  `supplier_id` varchar(255) NOT NULL,
  PRIMARY KEY (`item_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemtable`
--

LOCK TABLES `itemtable` WRITE;
/*!40000 ALTER TABLE `itemtable` DISABLE KEYS */;
INSERT INTO `itemtable` VALUES ('SLBS000072','Plumping - Hardware','clear varnish','varnish','Wooden varnish',90,'Per ltr','SLSM0000000015','SLSS0000000010'),('SLBS000073','Electronics','LED DISPLAY POWER SUPPLY','light','5V 300W',1199,'Per item','SLSM0000000045','SLSS0000000010'),('SLBS000074','Electronics','LED LOGO POWER SUPPLY','Power Supply','AC DC',570,'Per item','SLSM0000000017','SLSS0000000025'),('SLBS000075','Electronics','HDMI - VGA CONVERTER','Power Supply','AC DC',699,'Per item','SLSM0000000021','SLSS0000000022'),('SLBS000076','Electronics','SINGLE PHASE ELECTRONIC WATT-HOUR METER','Power Supply','AC DC',499,'Per item','SLSM0000000038','SLSS0000000016'),('SLBS000077','Electricals - Hardware','ULTASONIC TRASNMITTER AND RECIEVER','GL-40-2R','Utrasonic sensor',155,'Per item','SLSM0000000019','SLSS0000000016'),('SLBS000079','Electricals - Batteries','DC TO DC BUCK CONVERTER','LM2596 ','Converter',186,'Per item','SLSM0000000028','SLSS0000000021'),('SLBS000080','Electronics','RASPBERRY PI','Pi 1 Model B (2012)','Raspberry pi for projects',3000,'Per item','SLSM0000000019','SLSS0000000010'),('SLBS000132','Electronics','RASPBERRY PI','Pi 1 Model A (2013)','Raspberry pi for projects',4000,'Per item','SLSM0000000015','SLSS0000000010'),('SLBS000133','Electronics','RASPBERRY PI','Pi 1 Model B+ (2014)','Raspberry pi for projects',4500,'Per item','SLSM0000000045','SLSS0000000010'),('SLBS000134','Electronics','RASPBERRY PI','Pi 1 Model A+ (2014)','Raspberry pi for projects',5000,'Per item','SLSM0000000017','SLSS0000000025'),('SLBS000139','Electronics','HDMI - VGA CONVERTER','5 MTRS','HDMI - VGA CONVERTER - CABLE',100,'Per box','SLSM0000000016','SLSS0000000010'),('SLBS000140','Electricals - Hardware','HDMI - VGA CONVERTER','10 MTRS','HDMI - VGA CONVERTER - CLBLE',150,'Per dozen','SLSM0000000016','SLSS0000000012'),('SLBS000141','UAV products','DEMO','DEMO','DATA ENTRY',123,'Per box','SLSM0000000017','SLSS0000000019'),('SLBS000142','Electricals - Batteries','DEMO','DEMO1','DATA ENTRY',123,'Per m','SLSM0000000023','SLSS0000000022');
/*!40000 ALTER TABLE `itemtable` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb3 */ ;
/*!50003 SET character_set_results = utf8mb3 */ ;
/*!50003 SET collation_connection  = utf8mb3_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `itemtable_insert` BEFORE INSERT ON `itemtable` FOR EACH ROW BEGIN
  INSERT INTO itemtable_seq VALUE (NULL);
  SET new.item_code = CONCAT (
    "SLBS",
    LPAD (LAST_INSERT_ID (), 6, "0")
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `itemtable_seq`
--

DROP TABLE IF EXISTS `itemtable_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itemtable_seq` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemtable_seq`
--

LOCK TABLES `itemtable_seq` WRITE;
/*!40000 ALTER TABLE `itemtable_seq` DISABLE KEYS */;
INSERT INTO `itemtable_seq` VALUES (72),(73),(74),(75),(76),(77),(78),(79),(80),(81),(82),(83),(84),(85),(86),(87),(88),(89),(90),(91),(92),(94),(95),(96),(97),(98),(99),(100),(101),(102),(103),(104),(105),(106),(107),(108),(109),(110),(111),(112),(113),(114),(115),(116),(117),(118),(119),(120),(121),(122),(123),(124),(125),(126),(127),(128),(129),(130),(131),(132),(133),(134),(137),(138),(139),(140),(141),(142);
/*!40000 ALTER TABLE `itemtable_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `lab_inventory_view`
--

DROP TABLE IF EXISTS `lab_inventory_view`;
/*!50001 DROP VIEW IF EXISTS `lab_inventory_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `lab_inventory_view` AS SELECT 
 1 AS `inventory_value`,
 1 AS `dept_id`,
 1 AS `labname`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `lab_item_view`
--

DROP TABLE IF EXISTS `lab_item_view`;
/*!50001 DROP VIEW IF EXISTS `lab_item_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `lab_item_view` AS SELECT 
 1 AS `name`,
 1 AS `value`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `labdetails`
--

DROP TABLE IF EXISTS `labdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labdetails` (
  `labcode` varchar(200) NOT NULL,
  `labname` varchar(200) DEFAULT NULL,
  `labdesc` varchar(200) DEFAULT NULL,
  `labimage` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`labcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labdetails`
--

LOCK TABLES `labdetails` WRITE;
/*!40000 ALTER TABLE `labdetails` DISABLE KEYS */;
INSERT INTO `labdetails` VALUES ('SLB002','ART AND DESIGN LABORATORY','ART AND DESIGN LABORATORY','image-1681787698001.png'),('SLB003','ARTIFICIAL INTELLIGENCE','ARTIFICIAL INTELLIGENCE – PRODUCT DEVELOPMENT','image-1681787698001.png'),('SLB004','BIO PROSPECTING LAB','BIO PROSPECTING LAB','image-1681787698001.png'),('SLB006','BIOPROCESS AND BIOPRODUCTS LAB','BIOPROCESS AND BIOPRODUCTS LAB','image-1681787698001.png'),('SLB007','BLOCKCHAIN TECHNOLOGY','BLOCKCHAIN TECHNOLOGY','image-1681787698001.png'),('SLB008','CLOUD COMPUTING','CLOUD COMPUTING','image-1681787698001.png'),('SLB009','COMMUNICATION PROTOCOL','COMMUNICATION PROTOCOL','image-1681787698001.png'),('SLB010','CYBER SECURITY','CYBER SECURITY','image-1681787698001.png'),('SLB011','DATA SCIENCE – INDUSTRIAL APPLICATIONS','DATA SCIENCE – INDUSTRIAL APPLICATIONS','image-1681787698001.png'),('SLB014','ELECTRICAL PRODUCT DEV LAB','ELECTRICAL PRODUCT DEV LAB','image-1681787698001.png'),('SLB015','ELECTRONIC PRODUCT DEV LAB','ELECTRONIC PRODUCT DEV LAB','image-1681787698001.png'),('SLB018','EMBEDDED TECHNOLOGY','EMBEDDED TECHNOLOGY','image-1681787698001.png'),('SLB019','ENERGY AND THERMAL PRODUCT DESIGN & DEVELOPMENT LAB','ENERGY AND THERMAL PRODUCT DESIGN & DEVELOPMENT LAB','image-1681787698001.png'),('SLB021','FUNCTIONAL FOOD & NUTRACEUTICALS','FUNCTIONAL FOOD & NUTRACEUTICALS','image-1681787698001.png'),('SLB023','HACKATHON LAB','HACKATHON LAB','image-1681787698001.png'),('SLB024','AI BASED INDUSTRIAL AUTOMATION','AI BASED INDUSTRIAL AUTOMATION','image-1681787698001.png'),('SLB025','INDUSTRIAL DESIGN','INDUSTRIAL DESIGN','image-1681787698001.png'),('SLB026','INDUSTRIAL IOT','INDUSTRIAL IOT','image-1681787698001.png'),('SLB027','IOT','IOT','image-1681787698001.png'),('SLB029','MANUFACTURING & FABRICATION','MANUFACTURING & FABRICATION','image-1681787698001.png'),('SLB030','DIGITAL MANUFACTURING AND ROBOTIC AVIATION INTELLIGENCE LAB','DIGITAL MANUFACTURING AND ROBOTIC AVIATION INTELLIGENCE LAB','image-1681787698001.png'),('SLB031','MOBILE AND WEB APP FOR SOFTWARE APPLICATIONS','MOBILE AND WEB APP FOR SOFTWARE APPLICATIONS','image-1681787698001.png'),('SLB033','DESIGN AND PROTOTYPING','DESIGN AND PROTOTYPING','image-1681787698001.png'),('SLB037','NEW PRODUCT DEVELOPMENT LAB','NEW PRODUCT DEVELOPMENT LAB','image-1681787698001.png'),('SLB038','INTELLIGENT COMMUNICATION AND EMBEDDED SYSTEMS LAB','INTELLIGENT COMMUNICATION AND EMBEDDED SYSTEMS LAB','image-1681787698001.png'),('SLB041','PRINTED CIRCUIT BOARD (PCB) LAB','PRINTED CIRCUIT BOARD (PCB) LAB','image-1681787698001.png'),('SLB043','RENEWABLE ENERGY AND HVAC PRODUCTS','RENEWABLE ENERGY AND HVAC PRODUCTS','image-1681787698001.png'),('SLB045','ROBOTICS & AUTOMATION LAB','ROBOTICS & AUTOMATION LAB','image-1681787698001.png'),('SLB048','SMART AGRICULTURE','SMART AGRICULTURE','image-1681787698001.png'),('SLB049','SMART AND HEALTHY INFRASTRUCTURE','SMART AND HEALTHY INFRASTRUCTURE','image-1681787698001.png'),('SLB051','SUSTAINABLE CIVIL ENGINEERING MATERIALS LAB','SUSTAINABLE CIVIL ENGINEERING MATERIALS LAB','image-1681787698001.png'),('SLB052','TECHNICAL TEXTILE','TECHNICAL TEXTILE','image-1681787698001.png'),('SLB053','UNMANNED AERIAL VEHICLE','UNMANNED AERIAL VEHICLE','image-1681787698001.png'),('SLB054','UNMANNED UNDERWATER VEHICLE','UNMANNED UNDERWATER VEHICLE','image-1681787698001.png'),('SLB055','VIRTUAL INSTRUMENTATION LAB','VIRTUAL INSTRUMENTATION LAB','image-1681787698001.png'),('SLB056','VIRTUAL REALITY / AUGUMENTED REALITY','VIRTUAL REALITY / AUGUMENTED REALITY','image-1681787698001.png'),('SLB058','WORLDSKILLS TRAINING CENTRE','WORLDSKILLS TRAINING CENTRE','image-1681787698001.png'),('SLB059','INTELLIGENCE INNOVATION','INTELLIGENCE INNOVATION','image-1681787698001.png'),('SLB062','AI AND SMART SENSORS LAB','AI AND SMART SENSORS LAB','image-1681787698001.png'),('SLB063','BIOMEDICAL SYSTEMS','BIOMEDICAL SYSTEMS','image-1681787698001.png'),('SLB064','ELECTRICAL INTEGRATED DRIVES','ELECTRICAL INTEGRATED DRIVES','image-1681787698001.png'),('SLB065','ARTIFICIAL INTELLIGENCE – TECHNOLOGIES','ARTIFICIAL INTELLIGENCE – TECHNOLOGIES','image-1681787698001.png'),('SLB066','ARTIFICIAL INTELLIGENCE – INDUSTRIAL APPLICATIONS','ARTIFICIAL INTELLIGENCE – INDUSTRIAL APPLICATIONS','image-1681787698001.png'),('SLB067','ARTIFICIAL INTELLIGENCE – SOFTWARE SOLUTIONS','ARTIFICIAL INTELLIGENCE – SOFTWARE SOLUTIONS','image-1681787698001.png'),('SLB068','DATA SCIENCE – COMPUTATIONAL INTELLIGENCE','DATA SCIENCE – COMPUTATIONAL INTELLIGENCE','image-1681787698001.png'),('SLB069','DATA SCIENCE – BIG DATA ANALYTICS','DATA SCIENCE – BIG DATA ANALYTICS','image-1681787698001.png'),('SLB070','DATA SCIENCE – EXPERT SYSTEMS','DATA SCIENCE – EXPERT SYSTEMS','image-1681787698001.png'),('SLB071','INDUSTRIAL WEB AND MOBILE APP DEVELOPMENT ','INDUSTRIAL WEB AND MOBILE APP DEVELOPMENT ','image-1681787698001.png'),('SLB072','WEB DESIGN AND DEVELOPMENT','WEB DESIGN AND DEVELOPMENT','image-1681787698001.png'),('SLB073','SILK FASHION LAB','SILK FASHION LAB','image-1681787698001.png'),('SLB075','INTEGRATED SMART BUILDINGS LAB','INTEGRATED SMART BUILDINGS LAB','image-1681787698001.png'),('SLB077','COMPUTATIONAL BIOLOGY LAB','COMPUTATIONAL BIOLOGY LAB','image-1681787698001.png'),('SLB078','NANOTHERANOSTIC LAB','NANOTHERANOSTIC LAB','image-1681787698001.png'),('SLB079','BIOMATERIALS AND TISSUE REGENERATION LAB','BIOMATERIALS AND TISSUE REGENERATION LAB','image-1681787698001.png'),('SLB080','NEXT GENERATION FOOD LAB','NEXT GENERATION FOOD LAB','image-1681787698001.png'),('SLBS','SPECIAL LAB STORE','SPECIAL LAB STORW','img');
/*!40000 ALTER TABLE `labdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `labs_stock_view`
--

DROP TABLE IF EXISTS `labs_stock_view`;
/*!50001 DROP VIEW IF EXISTS `labs_stock_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `labs_stock_view` AS SELECT 
 1 AS `Stock`,
 1 AS `name`,
 1 AS `labname`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `manufacturer`
--

DROP TABLE IF EXISTS `manufacturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manufacturer` (
  `id` varchar(255) NOT NULL,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturer`
--

LOCK TABLES `manufacturer` WRITE;
/*!40000 ALTER TABLE `manufacturer` DISABLE KEYS */;
INSERT INTO `manufacturer` VALUES ('SLSM0000000015','ORIENT HARDWARE & TOOLS CORPORATION'),('SLSM0000000016','VOLTAS'),('SLSM0000000017','SRI GOLDEN REFRIGERATION'),('SLSM0000000018','LG'),('SLSM0000000019','STAR METAL ENGINEERING CORPORATION'),('SLSM0000000020','SODA GLASS'),('SLSM0000000021','ARTHI ENTERPRISES'),('SLSM0000000022','THE PRECISION SCIENTIFIC CO'),('SLSM0000000023','DPPH-SRL]'),('SLSM0000000024','DPPH-SRL'),('SLSM0000000025','MERCK'),('SLSM0000000026','ARTHI ENTERPRISES'),('SLSM0000000027','THE PRECISION SCIENTIFIC CO'),('SLSM0000000028','DISPO VAN'),('SLSM0000000029','MERCK'),('SLSM0000000030','SODA GLASS'),('SLSM0000000031','THE PRECISION SCIENTIFIC CO'),('SLSM0000000032','ARTHI ENTERPRISES'),('SLSM0000000033','DPPH-SRL]'),('SLSM0000000034','NICE'),('SLSM0000000035','BLUE STAR'),('SLSM0000000036','ABDOS'),('SLSM0000000037','CYTOONE'),('SLSM0000000038','MELTBLOWN'),('SLSM0000000039','VENUS'),('SLSM0000000040','ROLL'),('SLSM0000000041','VENUS'),('SLSM0000000042','CYTOONE'),('SLSM0000000043','BLUE STAR'),('SLSM0000000044','SURGICAL'),('SLSM0000000045','SRI BANNARI AMMAN STORES'),('SLSM0000000046','DETOL'),('SLSM0000000048','SCRUB'),('SLSM0000000049','MEGATRONICS'),('SLSM0000000050','MAGIZH SUPER STORE'),('SLSM0000000051','SRI BANNARI AMMAN STORES'),('SLSM0000000056','MAGIZH SUPER STORE'),('SLSM0000000057','AMAZON'),('SLSM0000000058','SRI PONNACHIAMMAN STORES'),('SLSM0000000059','SURGICAL'),('SLSM0000000065','ACE MANUFACTURING SYSTEMS');
/*!40000 ALTER TABLE `manufacturer` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb3 */ ;
/*!50003 SET character_set_results = utf8mb3 */ ;
/*!50003 SET collation_connection  = utf8mb3_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `manufacturer_table_insert` BEFORE INSERT ON `manufacturer` FOR EACH ROW BEGIN
    INSERT INTO manufacturer_seq VALUES (NULL);
    SET new.id = CONCAT("SLSM", LPAD(LAST_INSERT_ID(), 10, "0"));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `manufacturer_seq`
--

DROP TABLE IF EXISTS `manufacturer_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manufacturer_seq` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturer_seq`
--

LOCK TABLES `manufacturer_seq` WRITE;
/*!40000 ALTER TABLE `manufacturer_seq` DISABLE KEYS */;
INSERT INTO `manufacturer_seq` VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),(21),(22),(23),(24),(25),(26),(27),(28),(29),(30),(31),(32),(33),(34),(35),(36),(37),(38),(39),(40),(41),(42),(43),(44),(45),(46),(47),(48),(49),(50),(51),(52),(53),(54),(55),(56),(57),(58),(59),(60),(61),(62),(63),(64),(65),(66),(67),(68),(69),(70);
/*!40000 ALTER TABLE `manufacturer_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `overall_scrap_value`
--

DROP TABLE IF EXISTS `overall_scrap_value`;
/*!50001 DROP VIEW IF EXISTS `overall_scrap_value`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `overall_scrap_value` AS SELECT 
 1 AS `labcode`,
 1 AS `labname`,
 1 AS `scrap_qty`,
 1 AS `scrap_value`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `overall_stock_view`
--

DROP TABLE IF EXISTS `overall_stock_view`;
/*!50001 DROP VIEW IF EXISTS `overall_stock_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `overall_stock_view` AS SELECT 
 1 AS `stock`,
 1 AS `labname`,
 1 AS `labcode`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `labcode` varchar(200) DEFAULT NULL,
  `pro_name` varchar(200) DEFAULT NULL,
  `pro_desc` varchar(200) DEFAULT NULL,
  `pro_image` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'SLB008','Brics International Skill','Won Bronze','image-1681749432891.jpg'),(2,'SLB008','Google Cloud','Mr. Sai Prashanth K and mr. Hariharan P has participated in the Goole cloud competion and has won Gold medal with 5 months internship','image-1681749121052.jpg'),(3,'SLB008','Infosys ','gone finals','image-1681749121052.jpg'),(4,'SLB008','TCS','Won 3 prizes ','image-1681749121052.jpg'),(5,'SLB009','Special Lab','Site for Special Lab','image-1681749121052.jpg'),(6,'SLB008','Infosys ','Mr. Sai Prashanth K and mr. Hariharan P has participated in the Goole cloud competion and has won Gold medal with 5 months internship','image-1681749121052.jpg'),(7,'SLB008','Google Cloud','Site for Special Lab','image-1681749121052.jpg');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quantity_units`
--

DROP TABLE IF EXISTS `quantity_units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quantity_units` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quantity_units`
--

LOCK TABLES `quantity_units` WRITE;
/*!40000 ALTER TABLE `quantity_units` DISABLE KEYS */;
INSERT INTO `quantity_units` VALUES (1,'Per item'),(2,'Per kg'),(3,'Per ft'),(4,'Per m'),(5,'Per box'),(6,'Per packet'),(7,'Per dozen'),(8,'Per ltr');
/*!40000 ALTER TABLE `quantity_units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `scrap_table_view`
--

DROP TABLE IF EXISTS `scrap_table_view`;
/*!50001 DROP VIEW IF EXISTS `scrap_table_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `scrap_table_view` AS SELECT 
 1 AS `id`,
 1 AS `item_code`,
 1 AS `item_type`,
 1 AS `item_name`,
 1 AS `item_subname`,
 1 AS `cost_per_item`,
 1 AS `manufacturer_id`,
 1 AS `manufacturer_name`,
 1 AS `supplier_is`,
 1 AS `supplier_name`,
 1 AS `scrap_qty`,
 1 AS `inventory_value`,
 1 AS `req_labcode`,
 1 AS `req_labname`,
 1 AS `status`,
 1 AS `reject_description`,
 1 AS `updated_by`,
 1 AS `date`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `scraptable`
--

DROP TABLE IF EXISTS `scraptable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scraptable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_code` varchar(255) DEFAULT NULL,
  `manufacturer_id` varchar(255) DEFAULT NULL,
  `supplier_id` varchar(255) DEFAULT NULL,
  `scrap_qty` int DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `inventory_value` decimal(10,0) NOT NULL,
  `dept_id` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'PENDING',
  `reject_description` varchar(200) DEFAULT NULL,
  `updated_by` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scraptable`
--

LOCK TABLES `scraptable` WRITE;
/*!40000 ALTER TABLE `scraptable` DISABLE KEYS */;
INSERT INTO `scraptable` VALUES (17,'SLBS000072','SLSM0000000015','SLSS0000000010',1,'STU010','2023-09-21 04:41:20',90,'SLB007','REJECTED','Rejected because of new item','STU010'),(20,'SLBS000076','SLSM0000000038','SLSS0000000016',1,'STU009','2023-09-16 16:22:03',499,'SLB008','APPROVED',NULL,'STU010'),(27,'SLBS000076','SLSM0000000038','SLSS0000000016',1,'STU009','2023-09-21 04:41:36',499,'SLB008','REJECTED','rejected','STU010'),(28,'SLBS000076','SLSM0000000038','SLSS0000000016',2,'STU009','2023-09-21 07:32:54',998,'SLB008','APPROVED',NULL,'STU010'),(29,'SLBS000075','SLSM0000000021','SLSS0000000022',1,'STU008','2023-09-21 07:33:45',699,'SLB009','APPROVED',NULL,'STU010');
/*!40000 ALTER TABLE `scraptable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `special_lab`
--

DROP TABLE IF EXISTS `special_lab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `special_lab` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `incharge_faculty_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `special_lab`
--

LOCK TABLES `special_lab` WRITE;
/*!40000 ALTER TABLE `special_lab` DISABLE KEYS */;
/*!40000 ALTER TABLE `special_lab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stocktable`
--

DROP TABLE IF EXISTS `stocktable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocktable` (
  `stock_id` int NOT NULL AUTO_INCREMENT,
  `apex_no` varchar(200) NOT NULL,
  `item_code` varchar(200) NOT NULL,
  `manufacturer_id` varchar(255) NOT NULL,
  `supplier_id` varchar(255) NOT NULL,
  `stock_qty` int NOT NULL,
  `inventory_value` int NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `created_at` date NOT NULL,
  `dept_id` varchar(100) NOT NULL,
  `apex_reason` varchar(200) NOT NULL DEFAULT '-',
  PRIMARY KEY (`stock_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocktable`
--

LOCK TABLES `stocktable` WRITE;
/*!40000 ALTER TABLE `stocktable` DISABLE KEYS */;
INSERT INTO `stocktable` VALUES (16,'AP781720','SLBS000072','SLSM0000000015','SLSS0000000010',1,90,'12345','2022-08-13','SLBS','-'),(18,'AP782820','SLBS000075','SLSM0000000021','SLSS0000000022',10,6990,'STU009','2023-09-21','SLBS','-'),(19,'AP789820','SLBS000073','SLSM0000000045','SLSS0000000010',5,5995,'STU009','2021-10-23','SLBS','-'),(20,'AP712720','SLBS000076','SLSM0000000038','SLSS0000000016',9,4491,'STU009','2023-11-23','SLBS','-'),(21,'AP785620','SLBS000074','SLSM0000000017','SLSS0000000025',8,4560,'STU009','2023-12-21','SLBS','-'),(22,'AP789520','SLBS000080','SLSM0000000019','SLSS0000000010',10,2550,'STU009','2023-09-23','SLBS','-'),(23,'AP780320','SLBS000079','SLSM0000000028','SLSS0000000021',5,930,'STU009','2021-10-23','SLBS','-'),(24,'AP782720','SLBS000077','SLSM0000000019','SLSS0000000016',6,930,'STU009','2023-11-23','SLBS','-'),(25,'AP782729','SLBS000077','SLSM0000000019','SLSS0000000016',6,930,'STU009','2023-12-23','SLBS','-'),(27,'AP782727','SLBS000076','SLSM0000000038','SLSS0000000016',2,998,'STU009','2023-01-23','SLB008','-'),(28,'AP782320','SLBS000073','SLSM0000000045','SLSS0000000010',1,1199,'STU009','2023-01-23','SLB008','-'),(29,'AP784720','SLBS000072','SLSM0000000015','SLSS0000000010',11,990,'STU009','2023-02-21','SLB009','-'),(30,'AP782730','SLBS000076','SLSM0000000038','SLSS0000000016',6,2994,'STU009','2023-02-23','SLB009','-'),(31,'AP782320','SLBS000075','SLSM0000000021','SLSS0000000022',9,6291,'STU009','2023-03-23','SLB009','-'),(32,'AP786720','SLBS000074','SLSM0000000017','SLSS0000000025',2,1140,'STU009','2023-03-23','SLB009','-'),(33,'AP772720','SLBS000080','SLSM0000000019','SLSS0000000010',6,1530,'STU009','2023-10-23','SLB009','-'),(35,'AP782310','SLBS000072','SLSM0000000015','SLSS0000000010',89,8010,'STU009','2021-08-07','SLB008','-'),(40,'AP722720','SLBS000072','SLSM0000000015','SLSS0000000010',1,90,'STU010','2023-09-08','SLB007','-'),(42,'AP786720','SLBS000074','SLSM0000000017','SLSS0000000025',2,1140,'STU010','2023-09-20','SLB008','-'),(45,'AP883501','SLBS000075','SLSM0000000021','SLSS0000000022',22,15378,'STU009','2023-09-21','SLB008','-'),(46,'3421','SLBS000076','SLSM0000000038','SLSS0000000016',12,5988,'STU009','2023-11-16','SLB008','-'),(47,'709','SLBS000073','SLSM0000000045','SLSS0000000010',78,93522,'STU010','2023-11-16','SLB008','-'),(48,'AW125','SLBS000139','SLSM0000000016','SLSS0000000010',9,900,'STU009','2023-11-17','SLB008','-'),(49,'ADX21','SLBS000076','SLSM0000000038','SLSS0000000016',11,5489,'STU009','2023-11-17','SLB008','-'),(50,'AW125','SLBS000139','SLSM0000000016','SLSS0000000010',3,300,'STU010','2023-12-06','SLBS','-'),(51,'APX110','SLBS000073','SLSM0000000045','SLSS0000000010',1,1199,'STU010','2023-12-06','SLBS','-'),(52,'ADX21','SLBS000076','SLSM0000000038','SLSS0000000016',1,499,'STU008','2023-12-06','SLB009','-');
/*!40000 ALTER TABLE `stocktable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES ('SLSS0000000009','ST ENTERPRISES`','ERODE','9384984600','2023-08-11 05:08:18'),('SLSS0000000010','SURYA AGENCIES','GOBICHETTIPALAYAM','9843327636','2023-08-11 05:09:03'),('SLSS0000000011','ORIENT HARDWARE & TOOLS CORPORATION','COIMBATORE','4224072222','2023-08-11 05:09:32'),('SLSS0000000012','SRI GOLDEN REFRIGERATION','SANGANUR MAIN ROAD, COIMBATORE','9364473175','2023-08-11 05:09:48'),('SLSS0000000016','AAMBIENT AC','GANAPATHY, COIMBATORE','7558020929','2023-08-11 05:10:09'),('SLSS0000000017','STAR METAL ENGINEERING CORPORATION','KATTOR, COIMBATORE','9789721317','2023-08-11 05:10:28'),('SLSS0000000018','CHENNIMALAI ANDAVAR TEXTILES','ERODE','9842952095','2023-08-11 05:10:43'),('SLSS0000000019','GURUS STORES','SATHYAMANGALAM','9994161169','2023-08-11 05:10:59'),('SLSS0000000020','SARAVANA SILKS','SATHYAMANGALAM','9994236815','2023-08-11 05:11:11'),('SLSS0000000021','INNOVATE ENGINERING PRODUCTS','HOSUR','9047866448','2023-08-11 05:11:49'),('SLSS0000000022','CHENNIMALAI ANDAVAR TEXTILES','ERODE','9842952095','2023-08-11 14:09:02'),('SLSS0000000023','GURUS STORES','SATHYAMANGALAM','9994161169','2023-08-11 14:09:14'),('SLSS0000000024','INNOVATE ENGINERING PRODUCTS','HOSUR','9047866448','2023-08-11 14:09:26'),('SLSS0000000025','SRI BALAJI SCIENTIFIC INSTRUMETS','96/2, CHURCH STREET, COIMBATORE','9994850948','2023-08-11 14:09:41'),('SLSS0000000026','MAGIZH SUPER STORE','SATHY','9486668910','2023-08-11 14:09:53'),('SLSS0000000027','SRI PONNACHIAMMAN STORES','SATHY','4295299464','2023-08-11 14:10:05');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb3 */ ;
/*!50003 SET character_set_results = utf8mb3 */ ;
/*!50003 SET collation_connection  = utf8mb3_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `supplier_table_insert` BEFORE INSERT ON `supplier` FOR EACH ROW BEGIN
insert into supplier_seq values(null);
set new.id = concat("SLSS",lpad(last_insert_id(), 10, "0"));
    END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `supplier_seq`
--

DROP TABLE IF EXISTS `supplier_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier_seq` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier_seq`
--

LOCK TABLES `supplier_seq` WRITE;
/*!40000 ALTER TABLE `supplier_seq` DISABLE KEYS */;
INSERT INTO `supplier_seq` VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),(21),(22),(23),(24),(25),(26),(27),(28),(29),(30),(31);
/*!40000 ALTER TABLE `supplier_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `transfer_request_merged_view`
--

DROP TABLE IF EXISTS `transfer_request_merged_view`;
/*!50001 DROP VIEW IF EXISTS `transfer_request_merged_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `transfer_request_merged_view` AS SELECT 
 1 AS `id`,
 1 AS `item_code`,
 1 AS `apex_no`,
 1 AS `item_name`,
 1 AS `item_subname`,
 1 AS `item_description`,
 1 AS `cost_per_item`,
 1 AS `item_type`,
 1 AS `quantity_units`,
 1 AS `transfer_to`,
 1 AS `transfer_qty`,
 1 AS `transfered_from`,
 1 AS `user_id`,
 1 AS `manufacturer_id`,
 1 AS `supplier_id`,
 1 AS `status`,
 1 AS `username`,
 1 AS `request_labname`,
 1 AS `reject_description`,
 1 AS `date`,
 1 AS `from_labname`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `transfer_request_view`
--

DROP TABLE IF EXISTS `transfer_request_view`;
/*!50001 DROP VIEW IF EXISTS `transfer_request_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `transfer_request_view` AS SELECT 
 1 AS `id`,
 1 AS `apex_no`,
 1 AS `item_code`,
 1 AS `item_name`,
 1 AS `item_subname`,
 1 AS `item_description`,
 1 AS `cost_per_item`,
 1 AS `item_type`,
 1 AS `quantity_units`,
 1 AS `transfer_to`,
 1 AS `transfer_qty`,
 1 AS `transfered_from`,
 1 AS `user_id`,
 1 AS `manufacturer_id`,
 1 AS `supplier_id`,
 1 AS `status`,
 1 AS `reject_description`,
 1 AS `date`,
 1 AS `username`,
 1 AS `request_labname`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `transfertable`
--

DROP TABLE IF EXISTS `transfertable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transfertable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `apex_no` varchar(200) NOT NULL,
  `item_code` varchar(100) NOT NULL,
  `manufacturer_id` varchar(255) NOT NULL,
  `supplier_id` varchar(255) NOT NULL,
  `transfer_qty` int NOT NULL,
  `transfer_to` varchar(255) NOT NULL,
  `transfered_from` varchar(255) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'PENDING',
  `user_id` varchar(11) NOT NULL,
  `reject_description` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfertable`
--

LOCK TABLES `transfertable` WRITE;
/*!40000 ALTER TABLE `transfertable` DISABLE KEYS */;
INSERT INTO `transfertable` VALUES (74,'AW125','SLBS000139','SLSM0000000016','SLSS0000000010',1,'SLBS','SLB008','ACKNOWLEDGED','STU010',NULL,'2023-12-06 07:01:21'),(75,'AW125','SLBS000139','SLSM0000000016','SLSS0000000010',1,'SLBS','SLB008','ACKNOWLEDGED','STU010',NULL,'2023-12-06 07:01:48'),(76,'ADX21','SLBS000076','SLSM0000000038','SLSS0000000016',1,'SLB009','SLB008','ACKNOWLEDGED','STU008',NULL,'2023-12-06 10:25:01');
/*!40000 ALTER TABLE `transfertable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `labcode` varchar(200) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `role` varchar(200) DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10,'SAI PRASHANTH K','saiprashanth.cs21@bitsathy.ac.in',NULL,'110532343987399761053','admin'),(11,'Sai Prashanth','srisathyasai24680@gmail.com',NULL,'112460899703848367137','admin'),(12,'KAVINRAJ K','kavinraj.cs21@bitsathy.ac.in',NULL,'113253975153611490270','admin'),(13,'HARIHARAN P','hariharanp.cs21@bitsathy.ac.in',NULL,'110780345461567079265','admin'),(14,'HARI HARAN.P','harichris28@gmail.com',NULL,'102800212905960026163','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `admin_stock_view`
--

/*!50001 DROP VIEW IF EXISTS `admin_stock_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb3 */;
/*!50001 SET character_set_results     = utf8mb3 */;
/*!50001 SET collation_connection      = utf8mb3_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `admin_stock_view` AS select `stocktable`.`stock_id` AS `id`,`stocktable`.`apex_no` AS `apex_no`,`stocktable`.`item_code` AS `item_code`,`itemtable`.`item_type` AS `item_type`,`itemtable`.`item_name` AS `item_name`,`itemtable`.`item_subname` AS `item_subname`,`itemtable`.`item_description` AS `item_description`,`itemtable`.`cost_per_item` AS `cost_per_item`,`itemtable`.`quantity_units` AS `quantity_units`,`itemtable`.`manufacturer_id` AS `manufacturer_id`,`itemtable`.`supplier_id` AS `supplier_id`,`manufacturer`.`name` AS `manufacturer_name`,`supplier`.`name` AS `supplier_name`,`supplier`.`contact` AS `contact`,`stocktable`.`stock_qty` AS `stock_qty`,`stocktable`.`inventory_value` AS `inventory_value`,`stocktable`.`user_id` AS `user_id`,`stocktable`.`dept_id` AS `dept_id` from (((`stocktable` join `itemtable` on((`stocktable`.`item_code` = `itemtable`.`item_code`))) join `manufacturer` on((`stocktable`.`manufacturer_id` = `manufacturer`.`id`))) join `supplier` on((`stocktable`.`supplier_id` = `supplier`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `categories_view`
--

/*!50001 DROP VIEW IF EXISTS `categories_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `categories_view` AS select sum(`stocktable`.`stock_qty`) AS `Stock`,`itemtable`.`item_type` AS `name` from (`stocktable` join `itemtable` on((`stocktable`.`item_code` = `itemtable`.`item_code`))) group by `itemtable`.`item_type` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `inventory_view`
--

/*!50001 DROP VIEW IF EXISTS `inventory_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb3 */;
/*!50001 SET character_set_results     = utf8mb3 */;
/*!50001 SET collation_connection      = utf8mb3_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `inventory_view` AS select concat(upper(left(date_format(`stocktable`.`created_at`,'%b'),3)),' ',right(date_format(`stocktable`.`created_at`,'%Y'),2)) AS `name`,sum(`stocktable`.`inventory_value`) AS `Cost` from `stocktable` group by `stocktable`.`created_at` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `item_view`
--

/*!50001 DROP VIEW IF EXISTS `item_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb3 */;
/*!50001 SET character_set_results     = utf8mb3 */;
/*!50001 SET collation_connection      = utf8mb3_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `item_view` AS select `itemtable`.`item_code` AS `item_code`,`itemtable`.`item_type` AS `item_type`,`itemtable`.`item_name` AS `item_name`,`itemtable`.`item_subname` AS `item_subname`,`itemtable`.`item_description` AS `item_description`,`manufacturer`.`name` AS `manufacturer_name`,`supplier`.`name` AS `supplier_name`,`supplier`.`contact` AS `contact`,`itemtable`.`cost_per_item` AS `cost_per_item`,`itemtable`.`quantity_units` AS `quantity_units` from ((`itemtable` join `manufacturer` on((`itemtable`.`manufacturer_id` = `manufacturer`.`id`))) join `supplier` on((`itemtable`.`supplier_id` = `supplier`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `lab_inventory_view`
--

/*!50001 DROP VIEW IF EXISTS `lab_inventory_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb3 */;
/*!50001 SET character_set_results     = utf8mb3 */;
/*!50001 SET collation_connection      = utf8mb3_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `lab_inventory_view` AS select sum(`stocktable`.`inventory_value`) AS `inventory_value`,`stocktable`.`dept_id` AS `dept_id`,`labdetails`.`labname` AS `labname` from (`stocktable` join `labdetails` on((`stocktable`.`dept_id` = `labdetails`.`labcode`))) group by `stocktable`.`dept_id`,`labdetails`.`labname` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `lab_item_view`
--

/*!50001 DROP VIEW IF EXISTS `lab_item_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb3 */;
/*!50001 SET character_set_results     = utf8mb3 */;
/*!50001 SET collation_connection      = utf8mb3_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `lab_item_view` AS select `labdetails`.`labname` AS `name`,count(`stocktable`.`item_code`) AS `value` from (`labdetails` join `stocktable` on((`labdetails`.`labcode` = `stocktable`.`dept_id`))) group by `labdetails`.`labname` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `labs_stock_view`
--

/*!50001 DROP VIEW IF EXISTS `labs_stock_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb3 */;
/*!50001 SET character_set_results     = utf8mb3 */;
/*!50001 SET collation_connection      = utf8mb3_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `labs_stock_view` AS select sum(`stocktable`.`stock_qty`) AS `Stock`,`itemtable`.`item_type` AS `name`,`labdetails`.`labname` AS `labname` from ((`stocktable` join `itemtable` on((`stocktable`.`item_code` = `itemtable`.`item_code`))) join `labdetails` on((`stocktable`.`dept_id` = `labdetails`.`labcode`))) group by `labdetails`.`labname`,`itemtable`.`item_type` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `overall_scrap_value`
--

/*!50001 DROP VIEW IF EXISTS `overall_scrap_value`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `overall_scrap_value` AS select `scrap_table_view`.`req_labcode` AS `labcode`,`scrap_table_view`.`req_labname` AS `labname`,sum(`scrap_table_view`.`scrap_qty`) AS `scrap_qty`,sum(`scrap_table_view`.`inventory_value`) AS `scrap_value` from `scrap_table_view` where (`scrap_table_view`.`status` = 'APPROVED') group by `scrap_table_view`.`req_labname`,`scrap_table_view`.`req_labcode` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `overall_stock_view`
--

/*!50001 DROP VIEW IF EXISTS `overall_stock_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `overall_stock_view` AS select sum(`stocktable`.`stock_qty`) AS `stock`,`labdetails`.`labname` AS `labname`,`labdetails`.`labcode` AS `labcode` from (`stocktable` join `labdetails` on((`stocktable`.`dept_id` = `labdetails`.`labcode`))) group by `labdetails`.`labname`,`labdetails`.`labcode` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `scrap_table_view`
--

/*!50001 DROP VIEW IF EXISTS `scrap_table_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb3 */;
/*!50001 SET character_set_results     = utf8mb3 */;
/*!50001 SET collation_connection      = utf8mb3_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `scrap_table_view` AS select `scraptable`.`id` AS `id`,`scraptable`.`item_code` AS `item_code`,`itemtable`.`item_type` AS `item_type`,`itemtable`.`item_name` AS `item_name`,`itemtable`.`item_subname` AS `item_subname`,`itemtable`.`cost_per_item` AS `cost_per_item`,`scraptable`.`manufacturer_id` AS `manufacturer_id`,`manufacturer`.`name` AS `manufacturer_name`,`scraptable`.`supplier_id` AS `supplier_is`,`supplier`.`name` AS `supplier_name`,`scraptable`.`scrap_qty` AS `scrap_qty`,`scraptable`.`inventory_value` AS `inventory_value`,`scraptable`.`dept_id` AS `req_labcode`,`labdetails`.`labname` AS `req_labname`,`scraptable`.`status` AS `status`,`scraptable`.`reject_description` AS `reject_description`,`scraptable`.`updated_by` AS `updated_by`,`scraptable`.`created_at` AS `date` from ((((`scraptable` left join `itemtable` on((`scraptable`.`item_code` = `itemtable`.`item_code`))) left join `manufacturer` on((`scraptable`.`manufacturer_id` = `manufacturer`.`id`))) left join `labdetails` on((`scraptable`.`dept_id` = `labdetails`.`labcode`))) left join `supplier` on((`scraptable`.`supplier_id` = `supplier`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `transfer_request_merged_view`
--

/*!50001 DROP VIEW IF EXISTS `transfer_request_merged_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `transfer_request_merged_view` AS select `transfer_request_view`.`id` AS `id`,`transfer_request_view`.`item_code` AS `item_code`,`transfer_request_view`.`apex_no` AS `apex_no`,`transfer_request_view`.`item_name` AS `item_name`,`transfer_request_view`.`item_subname` AS `item_subname`,`transfer_request_view`.`item_description` AS `item_description`,`transfer_request_view`.`cost_per_item` AS `cost_per_item`,`transfer_request_view`.`item_type` AS `item_type`,`transfer_request_view`.`quantity_units` AS `quantity_units`,`transfer_request_view`.`transfer_to` AS `transfer_to`,`transfer_request_view`.`transfer_qty` AS `transfer_qty`,`transfer_request_view`.`transfered_from` AS `transfered_from`,`transfer_request_view`.`user_id` AS `user_id`,`transfer_request_view`.`manufacturer_id` AS `manufacturer_id`,`transfer_request_view`.`supplier_id` AS `supplier_id`,`transfer_request_view`.`status` AS `status`,`transfer_request_view`.`username` AS `username`,`transfer_request_view`.`request_labname` AS `request_labname`,`transfer_request_view`.`reject_description` AS `reject_description`,`transfer_request_view`.`date` AS `date`,`labdetails`.`labname` AS `from_labname` from (`transfer_request_view` left join `labdetails` on((`transfer_request_view`.`transfered_from` = `labdetails`.`labcode`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `transfer_request_view`
--

/*!50001 DROP VIEW IF EXISTS `transfer_request_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `transfer_request_view` AS select `transfertable`.`id` AS `id`,`transfertable`.`apex_no` AS `apex_no`,`transfertable`.`item_code` AS `item_code`,`itemtable`.`item_name` AS `item_name`,`itemtable`.`item_subname` AS `item_subname`,`itemtable`.`item_description` AS `item_description`,`itemtable`.`cost_per_item` AS `cost_per_item`,`itemtable`.`item_type` AS `item_type`,`itemtable`.`quantity_units` AS `quantity_units`,`transfertable`.`transfer_to` AS `transfer_to`,`transfertable`.`transfer_qty` AS `transfer_qty`,`transfertable`.`transfered_from` AS `transfered_from`,`transfertable`.`user_id` AS `user_id`,`transfertable`.`manufacturer_id` AS `manufacturer_id`,`transfertable`.`supplier_id` AS `supplier_id`,`transfertable`.`status` AS `status`,`transfertable`.`reject_description` AS `reject_description`,`transfertable`.`created_at` AS `date`,`faculty`.`name` AS `username`,`labdetails`.`labname` AS `request_labname` from (((`transfertable` left join `itemtable` on((`transfertable`.`item_code` = `itemtable`.`item_code`))) left join `faculty` on((`transfertable`.`user_id` = `faculty`.`faculty_id`))) left join `labdetails` on((`transfertable`.`transfer_to` = `labdetails`.`labcode`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-06 16:18:14
