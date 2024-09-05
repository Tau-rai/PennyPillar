-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: PennyPillar
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.22.04.1

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add Token',7,'add_token'),(26,'Can change Token',7,'change_token'),(27,'Can delete Token',7,'delete_token'),(28,'Can view Token',7,'view_token'),(29,'Can add Token',8,'add_tokenproxy'),(30,'Can change Token',8,'change_tokenproxy'),(31,'Can delete Token',8,'delete_tokenproxy'),(32,'Can view Token',8,'view_tokenproxy'),(33,'Can add Category',9,'add_category'),(34,'Can change Category',9,'change_category'),(35,'Can delete Category',9,'delete_category'),(36,'Can view Category',9,'view_category'),(37,'Can add Transaction',10,'add_transaction'),(38,'Can change Transaction',10,'change_transaction'),(39,'Can delete Transaction',10,'delete_transaction'),(40,'Can view Transaction',10,'view_transaction'),(41,'Can add Expense',11,'add_expense'),(42,'Can change Expense',11,'change_expense'),(43,'Can delete Expense',11,'delete_expense'),(44,'Can view Expense',11,'view_expense'),(45,'Can add Income',12,'add_income'),(46,'Can change Income',12,'change_income'),(47,'Can delete Income',12,'delete_income'),(48,'Can view Income',12,'view_income'),(49,'Can add UserProfile',13,'add_userprofile'),(50,'Can change UserProfile',13,'change_userprofile'),(51,'Can delete UserProfile',13,'delete_userprofile'),(52,'Can view UserProfile',13,'view_userprofile'),(53,'Can add monthly budget',14,'add_monthlybudget'),(54,'Can change monthly budget',14,'change_monthlybudget'),(55,'Can delete monthly budget',14,'delete_monthlybudget'),(56,'Can view monthly budget',14,'view_monthlybudget'),(57,'Can add savings goal',15,'add_savingsgoal'),(58,'Can change savings goal',15,'change_savingsgoal'),(59,'Can delete savings goal',15,'delete_savingsgoal'),(60,'Can view savings goal',15,'view_savingsgoal'),(61,'Can add subscription',16,'add_subscription'),(62,'Can change subscription',16,'change_subscription'),(63,'Can delete subscription',16,'delete_subscription'),(64,'Can view subscription',16,'view_subscription'),(65,'Can add insight',17,'add_insight'),(66,'Can change insight',17,'change_insight'),(67,'Can delete insight',17,'delete_insight'),(68,'Can view insight',17,'view_insight'),(69,'Can add django job',18,'add_djangojob'),(70,'Can change django job',18,'change_djangojob'),(71,'Can delete django job',18,'delete_djangojob'),(72,'Can view django job',18,'view_djangojob'),(73,'Can add django job execution',19,'add_djangojobexecution'),(74,'Can change django job execution',19,'change_djangojobexecution'),(75,'Can delete django job execution',19,'delete_djangojobexecution'),(76,'Can view django job execution',19,'view_djangojobexecution'),(77,'Can add blacklisted token',20,'add_blacklistedtoken'),(78,'Can change blacklisted token',20,'change_blacklistedtoken'),(79,'Can delete blacklisted token',20,'delete_blacklistedtoken'),(80,'Can view blacklisted token',20,'view_blacklistedtoken'),(81,'Can add outstanding token',21,'add_outstandingtoken'),(82,'Can change outstanding token',21,'change_outstandingtoken'),(83,'Can delete outstanding token',21,'delete_outstandingtoken'),(84,'Can view outstanding token',21,'view_outstandingtoken');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$870000$o4fc4m5KkoXF7xMtA1tI2J$nxwP4+aory0+o2URFl7Pl4SXA9VhZkUwt0AeYefaZnI=',NULL,0,'ubuntu22','ubuntu','twenty2','ubuntu@ubuntu22.com',0,1,'2024-08-19 18:11:34.000000'),(2,'pbkdf2_sha256$870000$LGJzKgex9RCih4Nnamvoq7$Al+UQU+Ve6Aspi7VBNrSVI1zrSPHCU2Bmt1YnjROkS4=',NULL,0,'user1','testuser','userOne','user1@dotnet.com',0,1,'2024-08-19 18:53:51.000000'),(3,'pbkdf2_sha256$870000$rm3NKsdk9SJujIoORBd4vJ$QjC7n+Kcu7IFay1bapEpODav5jHUgZN4FGRWNkcv0s0=','2024-08-26 16:22:35.927132',1,'dev-tau','dev','tau','taumasaire@gmail.com',1,1,'2024-08-20 18:50:03.000000'),(4,'pbkdf2_sha256$870000$4WJvrBdxdNIXhlZGJUcsUX$DpI64ZllduO/LndZdcE3R3HxBPAIGui2Y8FJa378Nd8=',NULL,0,'profiletester','profile','tester','profile@userone.com',0,1,'2024-08-22 17:16:09.359505'),(5,'pbkdf2_sha256$870000$NH2hPKs6sAJLXuRdhL39Cs$dk6PfK4sQPLzvetm+I/rWOEduqQ4bszjwiyQp4RzHXM=',NULL,0,'Test','','','test@usernet.com',0,1,'2024-08-25 08:31:29.240751'),(6,'pbkdf2_sha256$870000$ubnQj8SRka1ey3WRNk5IST$DUSJ0oGF2lsmZutS7wFRKxHmsZyYFgV0KFCOYkG9wKk=',NULL,0,'NewUser','','','new@usernet.com',0,1,'2024-08-25 09:15:15.514342'),(7,'pbkdf2_sha256$870000$0Pq8zBggQmTkktbHzR8XLi$Zwos/owII8ZsvNAhdV3mPqyR7eBT3rDw9YJPzWtC1Ho=',NULL,0,'Demo','','','demo@usernet.com',0,1,'2024-08-25 15:12:39.237193'),(8,'pbkdf2_sha256$870000$28AnPgSqTa0bMQ24kVcgiq$Epx0/y7i0hEHWtHX1inbfAf+WW00tNs92ykUT+rK870=',NULL,0,'Demo1','','','demo1@pennypillar.com',0,1,'2024-08-25 15:22:21.622551'),(9,'pbkdf2_sha256$870000$yIbKS8e9Vqgy2yocbuWv76$vG29Hw/mW8CSc6imWxxmdrAcNh5xI8UsnKg4Z8o8b7I=',NULL,0,'user3','','','user3@penny.com',0,1,'2024-08-25 15:46:03.733085'),(10,'pbkdf2_sha256$870000$cV0UUxp9pNEWt95BmOwKLe$qGudrPlVjPMEyXJICuL0TwrdtCXWUBFDBoGltQIeBXM=',NULL,0,'demo2','','','demo@pennypillar.com',0,1,'2024-08-25 16:54:33.103658'),(11,'pbkdf2_sha256$870000$2mWgIwNTZGeJVSLGviw8DW$jKwq9mE59UsDZKHKm4S1m2Bhf5FyE74JIyOntSFJN9A=',NULL,0,'render1','','','render1@gmail.com',0,1,'2024-08-26 16:36:13.824399'),(12,'pbkdf2_sha256$870000$RB7bXJv0ub1JQtTuHYeq8I$8VyaZCpSSLgohpnFojQSGiGZw3nISBTlu+yimp9qEqg=',NULL,0,'presentation','','','present@alx.com',0,1,'2024-08-26 18:45:56.071182'),(13,'pbkdf2_sha256$870000$bFZ4FUpJ9ptM5eFzsFumbP$BB3wQqytY7uRFl+25Un3rLGYeImCRB0p60M8gH6RMBs=',NULL,0,'present','','','present@pennypillar.com',0,1,'2024-08-26 19:38:52.339590'),(14,'pbkdf2_sha256$870000$45QAa2byo1hrIicCgsEaGZ$M2/d0Ywme6OMhOV2zfBXotl/mJXpvytYqAh+uhYAT84=',NULL,0,'present1','','','present@gmail.com',0,1,'2024-08-27 09:17:08.311055');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
INSERT INTO `auth_user_user_permissions` VALUES (1,3,1),(2,3,2),(3,3,3),(4,3,4),(5,3,5),(6,3,6),(7,3,7),(8,3,8),(9,3,9),(10,3,10),(11,3,11),(12,3,12),(13,3,13),(14,3,14),(15,3,15),(16,3,16),(17,3,17),(18,3,18),(19,3,19),(20,3,20),(21,3,21),(22,3,22),(23,3,23),(24,3,24),(25,3,25),(26,3,26),(27,3,27),(28,3,28),(29,3,29),(30,3,30),(31,3,31),(32,3,32),(33,3,33),(34,3,34),(35,3,35),(36,3,36),(37,3,37),(38,3,38),(39,3,39),(40,3,40),(41,3,41),(42,3,42),(43,3,43),(44,3,44),(45,3,45),(46,3,46),(47,3,47),(48,3,48),(49,3,49),(50,3,50),(51,3,51),(52,3,52),(53,3,53),(54,3,54),(55,3,55),(56,3,56),(57,3,57),(58,3,58),(59,3,59),(60,3,60),(61,3,61),(62,3,62),(63,3,63),(64,3,64),(65,3,65),(66,3,66),(67,3,67),(68,3,68),(69,3,69),(70,3,70),(71,3,71),(72,3,72),(73,3,73),(74,3,74),(75,3,75),(76,3,76);
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_category`
--

DROP TABLE IF EXISTS `core_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `core_category_user_id_d4f5e86c_fk_auth_user_id` (`user_id`),
  CONSTRAINT `core_category_user_id_d4f5e86c_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_category`
--

LOCK TABLES `core_category` WRITE;
/*!40000 ALTER TABLE `core_category` DISABLE KEYS */;
INSERT INTO `core_category` VALUES (1,'Income',1),(2,'Expenses',1),(3,'Savings',1),(4,'Investments',1);
/*!40000 ALTER TABLE `core_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_expense`
--

DROP TABLE IF EXISTS `core_expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_expense` (
  `transaction_ptr_id` bigint NOT NULL,
  PRIMARY KEY (`transaction_ptr_id`),
  CONSTRAINT `core_expense_transaction_ptr_id_8b1828e1_fk_core_transaction_id` FOREIGN KEY (`transaction_ptr_id`) REFERENCES `core_transaction` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_expense`
--

LOCK TABLES `core_expense` WRITE;
/*!40000 ALTER TABLE `core_expense` DISABLE KEYS */;
/*!40000 ALTER TABLE `core_expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_income`
--

DROP TABLE IF EXISTS `core_income`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_income` (
  `transaction_ptr_id` bigint NOT NULL,
  PRIMARY KEY (`transaction_ptr_id`),
  CONSTRAINT `core_income_transaction_ptr_id_f2c1c2eb_fk_core_transaction_id` FOREIGN KEY (`transaction_ptr_id`) REFERENCES `core_transaction` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_income`
--

LOCK TABLES `core_income` WRITE;
/*!40000 ALTER TABLE `core_income` DISABLE KEYS */;
/*!40000 ALTER TABLE `core_income` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_insight`
--

DROP TABLE IF EXISTS `core_insight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_insight` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` longtext NOT NULL,
  `date_posted` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_insight`
--

LOCK TABLES `core_insight` WRITE;
/*!40000 ALTER TABLE `core_insight` DISABLE KEYS */;
INSERT INTO `core_insight` VALUES (1,'## Daily Financial Insight: The Rise of the \"Gig Economy\" and its Impact on Retirement Planning ','## Daily Financial Insight: The Rise of the \"Gig Economy\" and its Impact on Retirement Planning \n\n**The gig economy is booming, with millions of people now finding work through platforms like Uber, Upwork, and Fiverr. This shift brings both opportunities and challenges, particularly when it comes to retirement planning.**\n\n**Opportunities:**\n\n* **Flexibility:** Gig work offers flexibility in hours and location, appealing to those seeking work-life balance or with caregiving responsibilities.\n* **Control:** Gig workers often have more control over their schedules and projects, fostering a sense of independence and autonomy.\n* **Potential for Higher Earnings:** Skilled freelancers and gig workers can potentially earn more than traditional employees, especially if they manage their time and projects effectively.\n\n**Challenges:**\n\n* **Lack of Traditional Benefits:** Gig workers often lack employer-sponsored benefits like health insurance, retirement plans, and paid time off.\n* **Income Volatility:** Gig work income can fluctuate significantly, making it challenging to budget and plan for the future.\n* **Tax Obligations:** Navigating self-employment taxes and managing expenses can be complex for gig workers.\n\n**Retirement Implications:**\n\n* **Saving Independently:** Gig workers need to take responsibility for their own retirement savings, utilizing individual retirement accounts (IRAs) or similar options.\n* **Building a Retirement Safety Net:** It\'s crucial to diversify income streams, create a robust emergency fund, and prioritize saving for retirement.\n* **Adapting to a New Paradigm:** Traditional retirement planning models may not be suitable for gig workers, requiring them to explore alternative strategies like part-time work or leveraging real estate investments.\n\n**The Bottom Line:** The gig economy offers opportunities for flexibility and potentially higher earnings, but it also poses challenges for retirement planning.  By being proactive, understanding the unique needs of this workforce, and adapting to new financial strategies, gig workers can secure a comfortable future. \n','2024-08-20 16:35:39.191920'),(2,'## Daily Financial Insight: The Shifting Landscape of Remote Work','## Daily Financial Insight: The Shifting Landscape of Remote Work\n\n**The rise of remote work has been a defining trend of the past few years, and its impact on the financial landscape is becoming increasingly clear.**  \n\n**Here\'s what\'s noteworthy:**\n\n* **Real estate markets are being reshaped.** As people move away from major cities and embrace a more flexible lifestyle, housing prices in suburban and rural areas are seeing a surge. Conversely, some city centers are experiencing a decline in demand.\n* **The traditional office space is being reimagined.** Companies are adapting to the need for hybrid working models, leading to a shift towards smaller, more flexible office spaces. This has implications for commercial real estate markets and the future of office design.\n* **The rise of the gig economy is accelerating.** Remote work has opened up opportunities for individuals to work independently, leading to a boom in the gig economy. This trend is creating both opportunities and challenges for workers and businesses alike.\n* **Investment patterns are changing.**  The growth of remote work has impacted investment strategies, with investors focusing on sectors benefiting from this trend, such as technology, communication, and logistics.\n\n**This is a dynamic situation with long-term implications for individuals, businesses, and the broader economy.**  It\'s crucial to stay informed about these shifts and consider how they might affect your own financial decisions.\n\n**Consider:**\n\n* **Are you taking advantage of the flexibility offered by remote work?**\n* **How are your investment strategies aligning with this evolving trend?**\n* **What are the potential long-term impacts of remote work on your career and financial well-being?**\n\n**Staying informed and adapting to these changes is essential for navigating the evolving financial landscape.**\n','2024-08-20 19:52:37.597123'),(3,'## Daily Financial Insight: The Rise of \"Gig Economy\" Investing','## Daily Financial Insight: The Rise of \"Gig Economy\" Investing\n\nThe \"gig economy\" is booming, and its impact is starting to be felt in the investment world.  Investors are increasingly looking for ways to capitalize on this trend, with new funds and ETFs popping up that track companies in the gig economy.\n\n**Why is this happening?**\n\n* **Growing Gig Economy:** The rise of platforms like Uber, DoorDash, and Fiverr has created a massive workforce of independent contractors. This trend is expected to continue, fueled by factors like flexible work arrangements and technological advancements.\n* **Attractive Investment Opportunity:** Gig economy companies often show strong growth potential, making them appealing to investors seeking high returns.\n* **Focus on Innovation:** These companies are often at the forefront of technological innovation, driving advancements in areas like logistics, artificial intelligence, and payment processing.\n\n**What does this mean for investors?**\n\n* **Diversification:** Investing in gig economy companies can help diversify your portfolio beyond traditional sectors.\n* **Growth Potential:** The sector is expected to continue growing at a rapid pace, potentially offering significant returns.\n* **Potential Risks:**  Gig economy companies face unique challenges, such as regulatory scrutiny and competition.\n\n**Key Takeaways:**\n\n* The gig economy is becoming an increasingly important part of the global economy.\n* Investors are starting to take notice, with new investment opportunities emerging.\n* However, it\'s crucial to understand the risks associated with this sector before investing.\n\n**Actionable Insight:**\n\n* Research companies in the gig economy sector and consider adding them to your portfolio.\n* Stay informed about the latest developments in the gig economy to make informed investment decisions. \n','2024-08-22 16:18:01.047060'),(4,'## Daily Financial Insight: ','## Daily Financial Insight: \n\n**Track your spending for one week to identify areas for improvement.**\n\n**Why it matters:**  Most people underestimate their spending. A detailed spending log helps you understand where your money goes, identify unnecessary expenses, and discover opportunities to save. \n\n**How to do it:**\n\n1. **Choose a method:**  Use a notebook, spreadsheet, budgeting app, or even a simple note on your phone.\n2. **Record everything:**  Include every expense, from groceries to coffee to subscriptions. Categorize each expense for clearer analysis.\n3. **Review your log:**  At the end of the week, analyze your spending patterns. Look for areas where you could cut back or find cheaper alternatives.\n\n**Bonus tip:**  Compare your spending to your budget to see where you need to make adjustments.\n\n**By taking control of your spending, you\'ll gain a clearer picture of your financial health and make informed decisions about your money.** \n','2024-08-22 20:06:03.743375'),(5,'## Daily Financial Insight:  The Impact of Rising Interest Rates on the Housing Market','## Daily Financial Insight:  The Impact of Rising Interest Rates on the Housing Market\n\n**Rising interest rates are a hot topic, and their impact on the housing market is a significant concern for many.** While higher rates can make borrowing more expensive, they also tend to cool down a heated market by slowing down demand. \n\n**Here\'s the breakdown:**\n\n* **Higher mortgage rates make borrowing more expensive.** This discourages potential buyers, leading to a decrease in demand. \n* **Lower demand can cause home prices to stabilize or even decline.** This creates opportunities for buyers who were previously priced out of the market.\n* **However, rising rates also impact sellers.** They might find themselves needing to adjust their asking prices to attract buyers in a less competitive market.\n* **The overall effect on the housing market is complex and depends on several factors, including regional differences, market conditions, and individual buyer/seller circumstances.**\n\n**Here\'s what you can do:**\n\n* **If you\'re a buyer:** Consider getting pre-approved for a mortgage to understand your affordability and explore options in the current market. \n* **If you\'re a seller:** Consult with a real estate professional to determine the best pricing strategy in your local market.\n* **Stay informed:** Keep an eye on economic indicators and housing market trends to understand how rising rates are impacting your area.\n\n**Ultimately, rising interest rates present both challenges and opportunities in the housing market.** It\'s essential to stay informed and make informed decisions based on your individual financial situation and goals. \n','2024-08-24 11:52:06.814714'),(6,'## Daily Financial Insight: The Ripple Effect of Inflation','## Daily Financial Insight: The Ripple Effect of Inflation\n\n**Headline:** Inflation\'s Impact on Consumer Spending: A Balancing Act\n\n**Insight:** While headline inflation rates have been cooling, the ripple effects of higher prices continue to impact consumer spending. Many households are adjusting their budgets, prioritizing essential goods while cutting back on discretionary spending. This shift is influencing businesses across sectors, impacting everything from demand for luxury items to the adoption of cheaper alternatives. \n\n**What This Means:** \n\n* **Businesses need to adapt:**  Companies must be agile in responding to changing consumer preferences and offering value-driven solutions. This could involve adjusting product offerings, implementing cost-cutting measures, or even developing new strategies to attract budget-conscious consumers.\n* **Investment opportunities:** While some sectors may struggle, others might thrive amidst the shift. Companies specializing in essential goods and services, or offering cost-effective alternatives, could see increased demand. Investors need to carefully assess potential opportunities and risks within the current economic landscape.\n* **Long-term impact:** The lasting effects of inflation on consumer behavior and business models remain uncertain. However, the current trends highlight the importance of strategic planning and resilience to navigate volatile economic conditions.\n\n**Key takeaway:** The current economic environment is complex and requires businesses and individuals to be proactive in managing their finances and adapting to changing market dynamics. \n','2024-08-24 12:02:42.599565'),(7,'## Daily Financial Insight: Navigating Inflation and Interest Rate Hikes','## Daily Financial Insight: Navigating Inflation and Interest Rate Hikes\n\n**Headline:** While inflation continues to cool, the Federal Reserve remains committed to raising interest rates, posing a challenge for investors.\n\n**Insight:**\n\n* **Inflation cools, but remains high:** The recent Consumer Price Index (CPI) report showed a slight slowdown in inflation, offering some relief. However, inflation remains stubbornly high, impacting consumer spending and businesses.\n* **Interest rates on the rise:** The Federal Reserve continues to aggressively raise interest rates to combat inflation. This increases borrowing costs for businesses and consumers, potentially slowing economic growth.\n* **Navigating the market:** Investors face a tough balancing act. High inflation makes holding cash unattractive, while rising rates make equities and bonds more volatile. Diversification and long-term perspective are crucial.\n* **Key takeaways:** \n    * Inflation is still a significant concern, but some signs of slowing offer hope.\n    * Interest rate hikes are likely to continue, impacting investment decisions.\n    * Carefully consider risk tolerance and investment goals to navigate the current market conditions.\n\n**Actionable Advice:**\n\n* **Review your portfolio:**  Ensure your investments align with your risk tolerance and long-term goals.\n* **Seek professional advice:** Consult with a financial advisor to develop a strategy for navigating market volatility.\n* **Stay informed:** Keep up-to-date on economic news and market trends to make informed investment decisions.\n\n**Remember:** This is just one snapshot of the current financial landscape.  Always conduct thorough research and consult with a professional before making any investment decisions. \n','2024-08-25 18:43:34.296425'),(8,'## Daily Financial Insight: The Power of Compound Interest ','## Daily Financial Insight: The Power of Compound Interest \n\nToday\'s financial insight focuses on the **power of compound interest**, a key driver of long-term wealth. Often referred to as the \"eighth wonder of the world,\" compound interest is the interest earned on your initial investment, as well as the accumulated interest.  \n\n**Here\'s the magic:**  Instead of just earning interest on your principal, you\'re also earning interest on the interest you\'ve already earned. This creates a snowball effect, accelerating your wealth accumulation over time.\n\n**Example:** \nImagine investing $1,000 at a 7% annual interest rate for 30 years. \n- **Simple interest:** You\'d earn $2,100 in interest, ending with $3,100.\n- **Compound interest:** You\'d earn $7,612 in interest, ending with $8,612.\n\n**Key takeaways:**\n\n* **Start early:** The longer your money compounds, the greater the returns.\n* **Invest consistently:**  Regular contributions amplify the power of compound interest.\n* **Choose wisely:** Higher returns generally come with higher risks. Consider your risk tolerance and investment goals.\n\n**Actionable step:**\n\n* **Explore investment options:**  Research different investment vehicles like stocks, bonds, mutual funds, and real estate.\n* **Set realistic financial goals:** Determine how much you want to save and by when.\n* **Consult a financial advisor:**  Seek expert guidance to create a personalized investment strategy. \n\n**Understanding and leveraging the power of compound interest is crucial for building long-term wealth.  Start your journey today and watch your money grow!** \n','2024-08-26 17:59:56.091798');
/*!40000 ALTER TABLE `core_insight` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_monthlybudget`
--

DROP TABLE IF EXISTS `core_monthlybudget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_monthlybudget` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `month` date NOT NULL,
  `budget_amount` decimal(10,2) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `core_monthlybudget_user_id_month_f93e079b_uniq` (`user_id`,`month`),
  CONSTRAINT `core_monthlybudget_user_id_dd837dcc_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_monthlybudget`
--

LOCK TABLES `core_monthlybudget` WRITE;
/*!40000 ALTER TABLE `core_monthlybudget` DISABLE KEYS */;
INSERT INTO `core_monthlybudget` VALUES (1,'2024-08-31',3000.00,2),(2,'2024-08-01',1500.00,4),(9,'2024-08-01',3200.00,5),(10,'2024-08-01',2900.00,7),(11,'2024-08-01',4500.00,8),(12,'2024-08-01',2500.00,9),(13,'2024-08-01',3800.00,10),(16,'2024-08-01',4300.00,11),(17,'2024-08-01',3500.00,12),(18,'2024-08-01',3200.00,13),(19,'2024-08-01',5000.00,14);
/*!40000 ALTER TABLE `core_monthlybudget` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_savingsgoal`
--

DROP TABLE IF EXISTS `core_savingsgoal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_savingsgoal` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `goal_amount` decimal(10,2) NOT NULL,
  `goal_date` date NOT NULL,
  `user_id` int NOT NULL,
  `current_savings` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `core_savingsgoal_user_id_8dea59b6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_savingsgoal`
--

LOCK TABLES `core_savingsgoal` WRITE;
/*!40000 ALTER TABLE `core_savingsgoal` DISABLE KEYS */;
INSERT INTO `core_savingsgoal` VALUES (1,1350.00,'2024-08-31',1,528.00),(2,6000.00,'2024-08-30',2,4800.00),(3,2900.00,'2024-08-22',3,253.00),(4,4567.00,'2024-09-02',4,1772.00),(5,1500.00,'2024-08-31',5,901.00),(6,1500.00,'2024-09-07',7,901.00),(7,1500.00,'2024-08-29',8,361.00),(9,2000.00,'2024-08-31',9,1293.00),(10,1500.00,'2024-08-31',10,552.00),(11,300.00,'2024-08-30',11,121.00),(12,2000.00,'2024-09-06',12,451.00),(13,1500.00,'2024-08-30',13,1558.00),(14,1340.00,'2024-08-31',14,343.00);
/*!40000 ALTER TABLE `core_savingsgoal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_subscription`
--

DROP TABLE IF EXISTS `core_subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_subscription` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `frequency` varchar(20) NOT NULL,
  `payment_method` varchar(20) NOT NULL,
  `due_date` date NOT NULL,
  `is_paid` tinyint(1) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `core_subscription_user_id_47899df3_fk_auth_user_id` (`user_id`),
  CONSTRAINT `core_subscription_user_id_47899df3_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_subscription`
--

LOCK TABLES `core_subscription` WRITE;
/*!40000 ALTER TABLE `core_subscription` DISABLE KEYS */;
INSERT INTO `core_subscription` VALUES (1,'ibhola',57.00,'monthly','bank_transfer','2024-08-31',0,2),(2,'netflix',49.00,'monthly','debit_card','2024-08-30',0,2),(3,'hjhjkjk',345.00,'weekly','cash','2024-08-31',0,2),(4,'pfl',567.00,'yearly','paypal','2024-08-27',0,3),(5,'test',146.00,'weekly','bank_transfer','2024-09-06',0,2),(6,'flix',49.00,'weekly','paypal','2024-08-30',0,4),(8,'aevy-mjolo',101.00,'weekly','cash','2024-08-24',0,4),(9,'aevy-mjolo',101.00,'monthly','debit_card','2024-09-06',1,4),(10,'aevy-mjolo',12234.00,'yearly','cash','2024-09-07',0,2),(11,'flix',89.00,'weekly','paypal','2024-08-30',0,5),(12,'mjolo',123.00,'monthly','cash','2024-08-31',0,5),(13,'Netflix',78.00,'monthly','debit_card','2024-08-31',0,7),(14,'Gaming',550.00,'monthly','paypal','2024-08-30',0,7),(15,'Football',137.00,'weekly','cash','2024-08-31',1,7),(16,'flix',143.00,'weekly','bank_transfer','2024-08-28',0,8),(17,'flix',560.00,'monthly','debit_card','2024-08-31',0,9),(18,'games',146.00,'weekly','paypal','2024-08-30',0,9),(19,'spotofy',769.00,'yearly','paypal','2024-09-02',0,9),(20,'spotify',150.00,'monthly','paypal','2024-08-31',1,10),(21,'games',456.00,'weekly','bank_transfer','2024-08-31',0,10),(22,'gaming',358.00,'yearly','paypal','2024-08-31',0,11),(23,'netflix',179.00,'monthly','bank_transfer','2024-08-31',1,12),(24,'gaming',340.00,'weekly','paypal','2024-09-04',0,12),(25,'new sub',445.00,'weekly','cash','2024-08-31',0,12),(26,'games',450.00,'monthly','paypal','2024-08-31',0,13),(27,'nextflix',677.00,'weekly','cash','2024-09-02',0,13),(28,'nexflix',150.00,'monthly','bank_transfer','2024-08-31',0,14);
/*!40000 ALTER TABLE `core_subscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_transaction`
--

DROP TABLE IF EXISTS `core_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_transaction` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `description` longtext NOT NULL,
  `category_id` bigint DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `core_transaction_category_id_45ccacc9_fk_core_category_id` (`category_id`),
  KEY `core_transaction_user_id_9d7207a3_fk_auth_user_id` (`user_id`),
  CONSTRAINT `core_transaction_category_id_45ccacc9_fk_core_category_id` FOREIGN KEY (`category_id`) REFERENCES `core_category` (`id`),
  CONSTRAINT `core_transaction_user_id_9d7207a3_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_transaction`
--

LOCK TABLES `core_transaction` WRITE;
/*!40000 ALTER TABLE `core_transaction` DISABLE KEYS */;
INSERT INTO `core_transaction` VALUES (1,3000.00,'2024-08-19','salary',1,1),(2,1500.00,'2024-08-19','rent',2,1),(3,1000.00,'2024-08-19','polo',3,1),(4,1300.00,'2024-08-19','ROI',4,2),(5,1300.00,'2024-08-19','side gig',1,2),(11,1350.00,'2024-08-23','more exp',2,4),(12,1350.00,'2024-08-23','income',1,4),(13,135.00,'2024-08-23','savings',3,4),(15,137.00,'2024-08-24','test expense',2,2),(16,247.00,'2024-08-24','test savings',3,2),(18,145.00,'2024-08-24','test',2,2),(25,1000.00,'2024-08-24','new save',3,4),(26,500.00,'2024-08-24','test exp',2,4),(27,1370.00,'2024-08-24','test income',1,4),(28,587.00,'2024-08-24','more tests',1,4),(30,5000.00,'2024-08-25','Salary',1,5),(31,1500.00,'2024-08-25','Rent',2,5),(33,590.00,'2024-08-25','Utilities',2,5),(34,260.00,'2024-08-25','Entertainment',2,5),(35,1200.00,'2024-08-25','Side gig',1,5),(36,570.00,'2024-08-25','Benz',3,5),(37,7000.00,'2024-08-25','Salary',1,6),(38,2500.00,'2024-08-25','Rent',2,6),(39,800.00,'2024-08-25','Utilities',2,6),(40,570.00,'2024-08-25','Entertainment',2,6),(41,980.00,'2024-08-25','Benz',3,6),(42,5000.00,'2024-08-25','Salary',1,7),(43,2000.00,'2024-08-25','Side Gig',1,7),(44,1500.00,'2024-08-25','Rent',2,7),(45,980.00,'2024-08-25','Utilities',2,7),(46,570.00,'2024-08-25','New PC',3,7),(47,500.00,'2024-08-25','Gaming',2,7),(48,1400.00,'2024-08-25','Utility',2,8),(49,1300.00,'2024-08-25','Rent',2,8),(50,7000.00,'2024-08-25','Salary',1,8),(51,2500.00,'2024-08-25','Side gig',1,8),(52,1500.00,'2024-08-25','New PC',3,8),(53,5000.00,'2024-08-25','Saalary',1,9),(54,1780.00,'2024-08-25','Side gig',1,9),(55,1500.00,'2024-08-25','Rent',2,9),(57,550.00,'2024-08-25','Food',2,9),(58,800.00,'2024-08-25','new laptop',3,9),(59,150.00,'2024-08-25','gaming',2,9),(60,1578.00,'2024-08-25','Car',3,9),(61,1500.00,'2024-08-25','side hustle',1,9),(62,7500.00,'2024-08-25','Salary',1,10),(63,1590.00,'2024-08-25','Side gig',1,10),(64,1350.00,'2024-08-25','Rent',2,10),(65,980.00,'2024-08-25','utilities',2,10),(66,1700.00,'2024-08-25','Save',3,10),(67,380.00,'2024-08-25','games',2,10),(68,1230.00,'2024-08-25','other',2,10),(69,7000.00,'2024-08-26','Test income',1,11),(70,3200.00,'2024-08-26','test expense',2,11),(71,500.00,'2024-08-26','test save',3,11),(76,5000.00,'2024-08-26','test incom',1,12),(77,300.00,'2024-08-26','expes',2,12),(78,700.00,'2024-08-26','save',3,12),(79,1600.00,'2024-08-26','new exp',2,12),(80,5000.00,'2024-08-26','Side gig',1,13),(81,1200.00,'2024-08-26','hosting',2,13),(82,500.00,'2024-08-26','new laptop',3,13),(83,650.00,'2024-08-26','gaming',2,13),(84,7000.00,'2024-08-27','salary',1,14),(85,1500.00,'2024-08-27','rent',2,14),(86,500.00,'2024-08-27','new pc',3,14),(87,500.00,'2024-08-27','uitliies',2,14);
/*!40000 ALTER TABLE `core_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_userprofile`
--

DROP TABLE IF EXISTS `core_userprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_userprofile` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image` varchar(100) DEFAULT NULL,
  `user_id` int NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `username` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `core_userprofile_user_id_5141ad90_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_userprofile`
--

LOCK TABLES `core_userprofile` WRITE;
/*!40000 ALTER TABLE `core_userprofile` DISABLE KEYS */;
INSERT INTO `core_userprofile` VALUES (1,'profile_pics/placeholder_85DnCpS.jpg',4,'profile','tester','profile@userone.com','profiletester'),(2,'profile_pics/placeholder_r76pMuT.jpg',3,NULL,NULL,'taumasaire@gmail.com','dev-tau'),(3,'profile_pics/placeholder.jpg',5,NULL,NULL,'test@usernet.com','Test'),(4,'profile_pics/placeholder_z0kIcFa.jpg',6,NULL,NULL,'new@usernet.com','NewUser'),(5,'',7,NULL,NULL,'demo@usernet.com','Demo'),(6,'profile_pics/placeholder_bJEJzPw.jpg',8,NULL,NULL,'demo1@pennypillar.com','Demo1'),(7,'profile_pics/placeholder_dAN89oB.jpg',9,NULL,NULL,'user3@penny.com','user3'),(8,'profile_pics/placeholder_1b6SXWx.jpg',10,NULL,NULL,'demo@pennypillar.com','demo2'),(9,'profile_pics/placeholder_4gNevML.jpg',11,NULL,NULL,'render1@gmail.com','render1'),(10,'profile_pics/placeholder_zd7oMMl.jpg',12,NULL,NULL,'present@alx.com','presentation'),(11,'profile_pics/placeholder_QnWMonW.jpg',13,NULL,NULL,'present@pennypillar.com','present'),(12,'profile_pics/placeholder_CBXSIxX.jpg',14,NULL,NULL,'present@gmail.com','present1');
/*!40000 ALTER TABLE `core_userprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2024-08-20 18:52:11.867812','generate_daily_insight','generate_daily_insight (next run at: Aug. 20, 2024, 6:52:01 p.m.)',2,'[{\"changed\": {\"fields\": [\"Next run time\"]}}]',18,3),(2,'2024-08-20 18:53:44.458526','generate_daily_insight','generate_daily_insight (next run at: Aug. 20, 2024, 6:55:01 p.m.)',2,'[{\"changed\": {\"fields\": [\"Next run time\"]}}]',18,3),(3,'2024-08-20 19:12:45.546393','1','ubuntu22',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\"]}}]',4,3),(4,'2024-08-20 19:13:19.799723','2','user1',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\"]}}]',4,3),(5,'2024-08-20 19:14:02.730279','3','dev-tau',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"User permissions\"]}}]',4,3),(6,'2024-08-20 19:15:44.232303','3','55425fcf9189318cbde38e40302cbdb1411266b6',1,'[{\"added\": {}}]',8,3),(7,'2024-08-20 19:43:26.088859','3','55425fcf9189318cbde38e40302cbdb1411266b6',3,'',8,3),(8,'2024-08-20 19:44:44.253214','generate_daily_insight','generate_daily_insight (next run at: Aug. 20, 2024, 6:59:01 p.m.)',2,'[{\"changed\": {\"fields\": [\"Next run time\"]}}]',18,3);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_apscheduler_djangojob`
--

DROP TABLE IF EXISTS `django_apscheduler_djangojob`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_apscheduler_djangojob` (
  `id` varchar(255) NOT NULL,
  `next_run_time` datetime(6) DEFAULT NULL,
  `job_state` longblob NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_apscheduler_djangojob_next_run_time_2f022619` (`next_run_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_apscheduler_djangojob`
--

LOCK TABLES `django_apscheduler_djangojob` WRITE;
/*!40000 ALTER TABLE `django_apscheduler_djangojob` DISABLE KEYS */;
INSERT INTO `django_apscheduler_djangojob` VALUES ('generate_daily_insight','2024-08-27 16:19:06.867738',_binary 'Äï¯\0\0\0\0\0\0}î(åversionîKåidîågenerate_daily_insightîåfuncîå!core.tasks:generate_daily_insightîåtriggerîåapscheduler.triggers.intervalîåIntervalTriggerîìî)Åî}î(hKåtimezoneîåbuiltinsîågetattrîìîåzoneinfoîåZoneInfoîìîå	_unpickleîÜîRîåUTCîKÜîRîå\nstart_dateîådatetimeîådatetimeîìîC\n\Ë\r=öîhÜîRîåend_dateîNåintervalîh\Zå	timedeltaîìîKK\0K\0áîRîåjitterîNubåexecutorîådefaultîåargsî)åkwargsî}îånameîhåmisfire_grace_timeîKåcoalesceîàå\rmax_instancesîKå\rnext_run_timeîhC\n\Ë\r=öîhÜîRîu.');
/*!40000 ALTER TABLE `django_apscheduler_djangojob` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_apscheduler_djangojobexecution`
--

DROP TABLE IF EXISTS `django_apscheduler_djangojobexecution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_apscheduler_djangojobexecution` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` varchar(50) NOT NULL,
  `run_time` datetime(6) NOT NULL,
  `duration` decimal(15,2) DEFAULT NULL,
  `finished` decimal(15,2) DEFAULT NULL,
  `exception` varchar(1000) DEFAULT NULL,
  `traceback` longtext,
  `job_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_job_executions` (`job_id`,`run_time`),
  KEY `django_apscheduler_djangojobexecution_run_time_16edd96b` (`run_time`),
  CONSTRAINT `django_apscheduler_djangojobexecution_job_id_daf5090a_fk` FOREIGN KEY (`job_id`) REFERENCES `django_apscheduler_djangojob` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_apscheduler_djangojobexecution`
--

LOCK TABLES `django_apscheduler_djangojobexecution` WRITE;
/*!40000 ALTER TABLE `django_apscheduler_djangojobexecution` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_apscheduler_djangojobexecution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(7,'authtoken','token'),(8,'authtoken','tokenproxy'),(5,'contenttypes','contenttype'),(9,'core','category'),(11,'core','expense'),(12,'core','income'),(17,'core','insight'),(14,'core','monthlybudget'),(15,'core','savingsgoal'),(16,'core','subscription'),(10,'core','transaction'),(13,'core','userprofile'),(18,'django_apscheduler','djangojob'),(19,'django_apscheduler','djangojobexecution'),(6,'sessions','session'),(20,'token_blacklist','blacklistedtoken'),(21,'token_blacklist','outstandingtoken');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-08-19 17:46:27.979806'),(2,'auth','0001_initial','2024-08-19 17:46:30.469605'),(3,'admin','0001_initial','2024-08-19 17:46:31.057419'),(4,'admin','0002_logentry_remove_auto_add','2024-08-19 17:46:31.077882'),(5,'admin','0003_logentry_add_action_flag_choices','2024-08-19 17:46:31.095560'),(6,'contenttypes','0002_remove_content_type_name','2024-08-19 17:46:31.328386'),(7,'auth','0002_alter_permission_name_max_length','2024-08-19 17:46:31.577433'),(8,'auth','0003_alter_user_email_max_length','2024-08-19 17:46:31.618082'),(9,'auth','0004_alter_user_username_opts','2024-08-19 17:46:31.643426'),(10,'auth','0005_alter_user_last_login_null','2024-08-19 17:46:31.821399'),(11,'auth','0006_require_contenttypes_0002','2024-08-19 17:46:31.836944'),(12,'auth','0007_alter_validators_add_error_messages','2024-08-19 17:46:31.860418'),(13,'auth','0008_alter_user_username_max_length','2024-08-19 17:46:32.066573'),(14,'auth','0009_alter_user_last_name_max_length','2024-08-19 17:46:32.287180'),(15,'auth','0010_alter_group_name_max_length','2024-08-19 17:46:32.339101'),(16,'auth','0011_update_proxy_permissions','2024-08-19 17:46:32.359543'),(17,'auth','0012_alter_user_first_name_max_length','2024-08-19 17:46:32.569159'),(18,'authtoken','0001_initial','2024-08-19 17:46:32.951256'),(19,'authtoken','0002_auto_20160226_1747','2024-08-19 17:46:32.994724'),(20,'authtoken','0003_tokenproxy','2024-08-19 17:46:33.009757'),(21,'authtoken','0004_alter_tokenproxy_options','2024-08-19 17:46:33.028470'),(22,'core','0001_initial','2024-08-19 17:46:34.694699'),(23,'core','0002_userprofile','2024-08-19 17:46:35.124858'),(24,'core','0003_monthlybudget_remove_transaction_subcategory_and_more','2024-08-19 17:46:35.742673'),(25,'core','0004_savingsgoal','2024-08-19 17:46:36.098423'),(26,'core','0005_category_user','2024-08-19 17:46:36.378764'),(27,'core','0006_alter_monthlybudget_month','2024-08-19 17:46:36.429583'),(28,'core','0007_alter_income_options_and_more','2024-08-19 17:46:36.535974'),(29,'core','0008_alter_savingsgoal_goal_date','2024-08-19 17:46:36.556187'),(30,'core','0009_subscription','2024-08-19 17:46:36.842538'),(31,'core','0010_savingsgoal_current_savings','2024-08-19 17:46:36.927236'),(32,'core','0011_alter_userprofile_image','2024-08-19 17:46:37.130533'),(33,'core','0012_userprofile_first_name_userprofile_last_name','2024-08-19 17:46:37.317484'),(34,'core','0013_userprofile_email','2024-08-19 17:46:37.387821'),(35,'core','0014_insight','2024-08-19 17:46:37.482612'),(36,'sessions','0001_initial','2024-08-19 17:46:37.608078'),(37,'django_apscheduler','0001_initial','2024-08-20 16:39:30.841673'),(38,'django_apscheduler','0002_auto_20180412_0758','2024-08-20 16:39:31.022119'),(39,'django_apscheduler','0003_auto_20200716_1632','2024-08-20 16:39:31.064236'),(40,'django_apscheduler','0004_auto_20200717_1043','2024-08-20 16:39:31.996627'),(41,'django_apscheduler','0005_migrate_name_to_id','2024-08-20 16:39:32.026579'),(42,'django_apscheduler','0006_remove_djangojob_name','2024-08-20 16:39:32.200300'),(43,'django_apscheduler','0007_auto_20200717_1404','2024-08-20 16:39:32.442182'),(44,'django_apscheduler','0008_remove_djangojobexecution_started','2024-08-20 16:39:32.494020'),(45,'django_apscheduler','0009_djangojobexecution_unique_job_executions','2024-08-20 16:39:32.563671'),(46,'core','0015_userprofile_username','2024-08-22 16:52:46.879623'),(47,'core','0016_alter_monthlybudget_unique_together','2024-08-23 21:38:39.019292'),(48,'token_blacklist','0001_initial','2024-08-25 12:35:10.607168'),(49,'token_blacklist','0002_outstandingtoken_jti_hex','2024-08-25 12:35:10.735849'),(50,'token_blacklist','0003_auto_20171017_2007','2024-08-25 12:35:10.774979'),(51,'token_blacklist','0004_auto_20171017_2013','2024-08-25 12:35:11.145624'),(52,'token_blacklist','0005_remove_outstandingtoken_jti','2024-08-25 12:35:11.335656'),(53,'token_blacklist','0006_auto_20171017_2113','2024-08-25 12:35:11.417287'),(54,'token_blacklist','0007_auto_20171017_2214','2024-08-25 12:35:12.104347'),(55,'token_blacklist','0008_migrate_to_bigautofield','2024-08-25 12:35:12.939144'),(56,'token_blacklist','0010_fix_migrate_to_bigautofield','2024-08-25 12:35:12.976685'),(57,'token_blacklist','0011_linearizes_history','2024-08-25 12:35:12.987593'),(58,'token_blacklist','0012_alter_outstandingtoken_user','2024-08-25 12:35:13.021270');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('3l7z3qabarixqpc2vmz2mrgtwnli5r17','.eJxVjDsOwjAQBe_iGlnr-Icp6XMGa7324gBypDipEHeHSCmgfTPzXiLitta49bLEKYuL0OL0uyWkR2k7yHdst1nS3NZlSnJX5EG7HOdcntfD_Tuo2Ou3VsEbPgMnE5QlwpKs4mA1FwD2YTDBFAcegmZH5BIAIVqrdPZDVozi_QHcYjfQ:1sgogD:p-TCf6u_14m-4e0CmuinmsNpH1ACbmGSvBW3pGhoHWk','2024-09-04 16:59:29.830569'),('8bvthyf7iwgc8galmto6brgx3qda1h85','.eJxVjDsOwjAQBe_iGlnr-Icp6XMGa7324gBypDipEHeHSCmgfTPzXiLitta49bLEKYuL0OL0uyWkR2k7yHdst1nS3NZlSnJX5EG7HOdcntfD_Tuo2Ou3VsEbPgMnE5QlwpKs4mA1FwD2YTDBFAcegmZH5BIAIVqrdPZDVozi_QHcYjfQ:1sgqwh:znkkjvy0mP_F9sLCMk6QQNo33T-ecQ_Qn1t9Mkh263w','2024-09-04 19:24:39.617250'),('gokrtpsd8x8hxwlqkyqmfgmxte0ft7mb','.eJxVjDsOwjAQBe_iGlnr-Icp6XMGa7324gBypDipEHeHSCmgfTPzXiLitta49bLEKYuL0OL0uyWkR2k7yHdst1nS3NZlSnJX5EG7HOdcntfD_Tuo2Ou3VsEbPgMnE5QlwpKs4mA1FwD2YTDBFAcegmZH5BIAIVqrdPZDVozi_QHcYjfQ:1sgTwC:4r5FyZqDlNbjrXBo4HhbuLg0HIWm3mYgPBu593rzchM','2024-09-03 18:50:36.113233'),('jkktqgvyflor533s5c7j28kt0hqhvf3g','e30:1shBbw:nG72TaPM_RY-IJb49iRwlABlepDkli6SAlpQkSt1ZvQ','2024-09-05 17:28:36.550990'),('n1kb5oizlnezf7hhalxmvc00w4ysmih0','.eJxVjDsOwjAQRO_iGll28AdT0ucM1np3jQPIluKkQtydREoBzRTz3sxbRFiXEtfOc5xIXMVZnH67BPjkugN6QL03ia0u85TkrsiDdjk24tftcP8OCvSyra0ZWGv2jnUiIBgggUI0gYJyKqMl5C0NKJs4aNIZPTI7fUFngs_i8wUUUTlI:1sicUF:xgSVU05djQb7bO1NcC2YckLDvMww32N6GAMIQ-TBppI','2024-09-09 16:22:35.945445'),('q22m7oj5nveygscduaqm5tmmpszm9bng','.eJxVjDsOwjAQBe_iGlnr-Icp6XMGa7324gBypDipEHeHSCmgfTPzXiLitta49bLEKYuL0OL0uyWkR2k7yHdst1nS3NZlSnJX5EG7HOdcntfD_Tuo2Ou3VsEbPgMnE5QlwpKs4mA1FwD2YTDBFAcegmZH5BIAIVqrdPZDVozi_QHcYjfQ:1shBnM:nuEmi2DTwcpH4gbLi7-9CNuCAI9utHB7tCvcOUBG_fY','2024-09-05 17:40:24.825284'),('ziidjvpuygco8nlj3ss3jtr53dmeoe5q','.eJxVjMEOwiAQRP-FsyHgLoV69O43kO0CUjWQlPZk_Hdp0oMe5jLvzbyFp23Nfmtx8XMQFwHi9NtNxM9YdhAeVO5Vci3rMk9yV-RBm7zVEF_Xw_07yNRyX6uBEyZFxjhmTow9IZrRASs1BLYamAnV2RJa69iNChAwxA5A6yQ-XwSUN_o:1shWvj:AiYdgCafZaW7M_OA2ufEDrmFiOrVzkhblAh5XN_OvJw','2024-09-06 16:14:27.289761');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_blacklist_blacklistedtoken`
--

DROP TABLE IF EXISTS `token_blacklist_blacklistedtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_blacklist_blacklistedtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `blacklisted_at` datetime(6) NOT NULL,
  `token_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_id` (`token_id`),
  CONSTRAINT `token_blacklist_blacklistedtoken_token_id_3cc7fe56_fk` FOREIGN KEY (`token_id`) REFERENCES `token_blacklist_outstandingtoken` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_blacklist_blacklistedtoken`
--

LOCK TABLES `token_blacklist_blacklistedtoken` WRITE;
/*!40000 ALTER TABLE `token_blacklist_blacklistedtoken` DISABLE KEYS */;
INSERT INTO `token_blacklist_blacklistedtoken` VALUES (1,'2024-08-25 12:37:44.753711',1),(2,'2024-08-25 13:24:11.003252',3),(3,'2024-08-25 13:44:16.435356',4),(4,'2024-08-25 14:21:18.695955',6),(5,'2024-08-25 14:51:25.285936',7),(9,'2024-08-25 14:55:13.572309',8),(10,'2024-08-25 14:57:01.793718',9),(11,'2024-08-25 15:04:44.137643',10),(12,'2024-08-25 15:05:02.844512',11),(13,'2024-08-25 15:17:57.196907',13),(14,'2024-08-25 15:20:41.180993',14),(15,'2024-08-25 15:26:36.760943',16),(16,'2024-08-25 15:40:25.021777',17),(17,'2024-08-25 15:44:48.623020',18),(18,'2024-08-25 15:51:24.473167',20),(19,'2024-08-25 15:56:58.852021',21),(20,'2024-08-25 16:59:48.373724',23),(21,'2024-08-25 18:57:26.206628',25),(22,'2024-08-25 18:59:47.619577',26),(23,'2024-08-26 16:35:34.382903',27),(24,'2024-08-26 18:41:04.968242',31),(25,'2024-08-26 18:45:22.413921',32),(26,'2024-08-26 19:10:31.337124',34),(27,'2024-08-26 19:18:17.926358',35),(28,'2024-08-26 19:29:21.487370',36),(29,'2024-08-26 19:37:30.233274',37),(30,'2024-08-26 19:49:42.671524',39),(31,'2024-08-27 09:17:21.950367',41),(32,'2024-08-27 10:02:37.165806',43),(33,'2024-08-27 10:05:44.316039',44);
/*!40000 ALTER TABLE `token_blacklist_blacklistedtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_blacklist_outstandingtoken`
--

DROP TABLE IF EXISTS `token_blacklist_outstandingtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_blacklist_outstandingtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  `user_id` int DEFAULT NULL,
  `jti` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq` (`jti`),
  KEY `token_blacklist_outs_user_id_83bc629a_fk_auth_user` (`user_id`),
  CONSTRAINT `token_blacklist_outs_user_id_83bc629a_fk_auth_user` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_blacklist_outstandingtoken`
--

LOCK TABLES `token_blacklist_outstandingtoken` WRITE;
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` DISABLE KEYS */;
INSERT INTO `token_blacklist_outstandingtoken` VALUES (1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY3NTg2MSwiaWF0IjoxNzI0NTg5NDYxLCJqdGkiOiIxMzU5Y2FlMTA2YjU0NzNmYjFhMzA1M2U3ZTNiMWJjYSIsInVzZXJfaWQiOjJ9.wPxZ1FUGbVeAvsIzonWPSZQkiHvNn5dsiVg10Q4aG04','2024-08-25 12:37:41.532292','2024-08-26 12:37:41.000000',2,'1359cae106b5473fb1a3053e7e3b1bca'),(2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY3NTg5NywiaWF0IjoxNzI0NTg5NDk3LCJqdGkiOiI0MzViMWRiNGI3Njc0MmE2OTExMDFjMjEwY2E2Yzk4NSIsInVzZXJfaWQiOjJ9.oRt5LrT4J0aXC_sES3XGaTkTDyfHUZhNJWdKqEPtef4','2024-08-25 12:38:17.896449','2024-08-26 12:38:17.000000',2,'435b1db4b76742a691101c210ca6c985'),(3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY3NjY0MywiaWF0IjoxNzI0NTkwMjQzLCJqdGkiOiJkYzg3NjQ5MzdmOTc0ZmI3ODBhZjJmOGU5NDdlODFkYiIsInVzZXJfaWQiOjJ9.Foz-RU_2SStTvEBmL2mUTvcpEvf26NgY3YoMCHY3-WE','2024-08-25 12:50:43.191875','2024-08-26 12:50:43.000000',2,'dc8764937f974fb780af2f8e947e81db'),(4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY3OTE5OCwiaWF0IjoxNzI0NTkyNzk4LCJqdGkiOiIzZjdlYjE2NzFiZGQ0OTdkYWJhZmNlNDYxNGRmOTA2ZSIsInVzZXJfaWQiOjJ9.mHSKGSK_WnuthN0P40QnZUcrkJyxowTzOAR6FNtbu7Q','2024-08-25 13:33:18.788571','2024-08-26 13:33:18.000000',2,'3f7eb1671bdd497dabafce4614df906e'),(5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY4MDg4NywiaWF0IjoxNzI0NTk0NDg3LCJqdGkiOiJiZWU3ODA4YjJhM2E0OTkzYTViZTgwN2JiMDFjY2YwZSIsInVzZXJfaWQiOjJ9.DHsEDp_FFYAO08FVwwiOghkgFCeY9toUd6p9vU3WY3g','2024-08-25 14:01:27.564508','2024-08-26 14:01:27.000000',2,'bee7808b2a3a4993a5be807bb01ccf0e'),(6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY4MjA3NSwiaWF0IjoxNzI0NTk1Njc1LCJqdGkiOiIzZGQ5NWJkNGQ3NGQ0MTM2YTFlNDkxZTU3MjNjMDZkMCIsInVzZXJfaWQiOjJ9.Qg5N_QqpTwoGk9sBaC1fP3yFZpu6uPfxqg0mSj1L5aw','2024-08-25 14:21:15.680669','2024-08-26 14:21:15.000000',2,'3dd95bd4d74d4136a1e491e5723c06d0'),(7,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY4MjA4NCwiaWF0IjoxNzI0NTk1Njg0LCJqdGkiOiIzZDNiZWFhZTIyNzc0NDBjYTRmZGUyNjYyZTgxNTUxNyIsInVzZXJfaWQiOjJ9.fa0kZz6iNSVFmdiJwbg2z4j5WxB-tPLmK02VHTkZKJI','2024-08-25 14:21:24.289746','2024-08-26 14:21:24.000000',2,'3d3beaae2277440ca4fde2662e815517'),(8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY4NDExMCwiaWF0IjoxNzI0NTk3NzEwLCJqdGkiOiJkZGJlNGNlODAzYTE0MWMyODcyNmNjNGVjMWFlNzdiNCIsInVzZXJfaWQiOjJ9.EiKKOH_xH-O90u955j6x2FGT-ABGPx9yZ1YH-CRTSFE','2024-08-25 14:55:10.842366','2024-08-26 14:55:10.000000',2,'ddbe4ce803a141c28726cc4ec1ae77b4'),(9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY4NDExOCwiaWF0IjoxNzI0NTk3NzE4LCJqdGkiOiI4YjNiN2NkNzc2Yjg0ODUxYWY3ZjMzMWEyN2RiNWJkZiIsInVzZXJfaWQiOjJ9.gyNRb4ikuS0MFFg-dHjlxdttHxzsgxKnSbHqbMAJvNw','2024-08-25 14:55:18.152752','2024-08-26 14:55:18.000000',2,'8b3b7cd776b84851af7f331a27db5bdf'),(10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY4NDYyNywiaWF0IjoxNzI0NTk4MjI3LCJqdGkiOiIyOGFmNjY5NzFjZjU0NGQ3OThmODE0YzBiZTk0MjEyNiIsInVzZXJfaWQiOjJ9.d7zKZFIhiibAiPWZ46W1-m_yBzOvZwLaL4uZsmpGe04','2024-08-25 15:03:47.808903','2024-08-26 15:03:47.000000',2,'28af66971cf544d798f814c0be942126'),(11,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY4NDY4OSwiaWF0IjoxNzI0NTk4Mjg5LCJqdGkiOiJiY2NjM2ZkM2VmOWQ0MWU0ODU4ZmIzMmQxNWFlZDE2MSIsInVzZXJfaWQiOjJ9.3fuNZmxB1wV_T0l3wIA8kPqOF-7oyKmThjUIQAvHF40','2024-08-25 15:04:49.367965','2024-08-26 15:04:49.000000',2,'bccc3fd3ef9d41e4858fb32d15aed161'),(12,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY4NTE5MywiaWF0IjoxNzI0NTk4NzkzLCJqdGkiOiJlY2ZmODQxOWI0NjA0NDg0OTA0YzU5ZWNiZjhiY2Y0ZSIsInVzZXJfaWQiOjd9.EezP_20O7mzelGak7AU2xGoN35ZOmwWl3AiXl3Ly7qI','2024-08-25 15:13:13.257735','2024-08-26 15:13:13.000000',7,'ecff8419b4604484904c59ecbf8bcf4e'),(13,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY4NTIyMywiaWF0IjoxNzI0NTk4ODIzLCJqdGkiOiIyNjI2YjVjMWQ4MTQ0YTJmODhiYTBmY2RjZmQzNTE4MSIsInVzZXJfaWQiOjd9.Zb1LnapoMSsrINexqW-ye5mk2TzGQXkijaDI273igCo','2024-08-25 15:13:43.955912','2024-08-26 15:13:43.000000',7,'2626b5c1d8144a2f88ba0fcdcfd35181'),(14,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY4NTQ4NiwiaWF0IjoxNzI0NTk5MDg2LCJqdGkiOiJlMjQwZGIzYWZmNDM0NzRiODZmNzUwMzQwMDdlY2Y5ZCIsInVzZXJfaWQiOjd9.9iqDeRmI9vzX3tl-igVvC4sfXYu_Y0h-RLFChypohhw','2024-08-25 15:18:06.988204','2024-08-26 15:18:06.000000',7,'e240db3aff43474b86f75034007ecf9d'),(15,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY4NTc2OSwiaWF0IjoxNzI0NTk5MzY5LCJqdGkiOiJmN2Q1YTkyOTZkYzQ0ZWIyYWZlZmJlNGQ3MzUzNTY5ZSIsInVzZXJfaWQiOjh9.8wbaZ6WLjioarJq1acxMrsoOYtDDtCfUS5w4_dO-6iY','2024-08-25 15:22:49.091302','2024-08-26 15:22:49.000000',8,'f7d5a9296dc44eb2afefbe4d7353569e'),(16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY4NTc5MCwiaWF0IjoxNzI0NTk5MzkwLCJqdGkiOiIxODA2Y2U2YjRmNmE0ZTc0Yjc3YWRlODYxYzRmYWE0OSIsInVzZXJfaWQiOjh9.qoas3QaOLnAo8iskr0mi9-3waGX_UC_SdykXqhmAASE','2024-08-25 15:23:10.646742','2024-08-26 15:23:10.000000',8,'1806ce6b4f6a4e74b77ade861c4faa49'),(17,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY4Njc5MCwiaWF0IjoxNzI0NjAwMzkwLCJqdGkiOiJjM2ZkZGRkMjU2Njg0NDNkYmRmOTRjYjRkODZmNDY1MiIsInVzZXJfaWQiOjh9.AvfVw9y9mYe2QbMX4vA6R6CG6pT1B-CYar1zFI6W2Yg','2024-08-25 15:39:50.180295','2024-08-26 15:39:50.000000',8,'c3fdddd25668443dbdf94cb4d86f4652'),(18,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY4Njk1MiwiaWF0IjoxNzI0NjAwNTUyLCJqdGkiOiI5Y2JmZGFiODNmNjg0YTk5ODJkNDY2YjA4YjE1YzE0MiIsInVzZXJfaWQiOjJ9.LiCj57qg1YlZkumkgGCyLr0iyffwjXQd3FiUdznZ1sE','2024-08-25 15:42:32.095166','2024-08-26 15:42:32.000000',2,'9cbfdab83f684a9982d466b08b15c142'),(19,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY4NzE2NywiaWF0IjoxNzI0NjAwNzY3LCJqdGkiOiIzOGNmMmEzNGU0ZDc0M2RlYWVlMjA1MWRlYjg3NjBlNiIsInVzZXJfaWQiOjl9.GnNAlagztngSMBtHRkqgP5phIugmd55xrVWyv2wTuCs','2024-08-25 15:46:07.457996','2024-08-26 15:46:07.000000',9,'38cf2a34e4d743deaee2051deb8760e6'),(20,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY4NzE3MiwiaWF0IjoxNzI0NjAwNzcyLCJqdGkiOiJlYTM0ZjNmNDFlY2Q0YWJiYjQ2MDk1NWZhNDhmMDI0ZSIsInVzZXJfaWQiOjl9.4f1fXQSgcvE_3erOgws3j78OGyLvWPsRlpYDjK90_Js','2024-08-25 15:46:12.144747','2024-08-26 15:46:12.000000',9,'ea34f3f41ecd4abbb460955fa48f024e'),(21,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY4NzU3OSwiaWF0IjoxNzI0NjAxMTc5LCJqdGkiOiI3NTI0YmNkYmYxZGU0Njg4YjQ1MDhmMWI4NmY2ZGZjZiIsInVzZXJfaWQiOjl9.x755d_-yMFizk5Z6St8v9rwxHM0Chc567aLYRDy6TzU','2024-08-25 15:52:59.616136','2024-08-26 15:52:59.000000',9,'7524bcdbf1de4688b4508f1b86f6dfcf'),(22,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY5MTI3NywiaWF0IjoxNzI0NjA0ODc3LCJqdGkiOiJmNzBhODhiNjVhYmQ0ZTBkODdlZTQ2M2M5MGE3NmFiZCIsInVzZXJfaWQiOjEwfQ.b-Bjbk4hyBh3muuwBIJGdB_Xu3tj5s_Xphw-afJykTg','2024-08-25 16:54:37.022088','2024-08-26 16:54:37.000000',10,'f70a88b65abd4e0d87ee463c90a76abd'),(23,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY5MTI4MSwiaWF0IjoxNzI0NjA0ODgxLCJqdGkiOiJmMGNhZjUwNDk4NjM0Nzg3OGYzMTFjYTg4NjVjOGQ4ZCIsInVzZXJfaWQiOjEwfQ.f3EGinMixtiqcpOdLexFCyyriyPIYStrOhPIwAZ8Sws','2024-08-25 16:54:41.851243','2024-08-26 16:54:41.000000',10,'f0caf504986347878f311ca8865c8d8d'),(24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY5NTMzOSwiaWF0IjoxNzI0NjA4OTM5LCJqdGkiOiI2NDU1YzdhOWUzMTk0YmY3OWRhOWU4YWQ2OWIxYTQ0OCIsInVzZXJfaWQiOjEwfQ.V_GcSAWkXyMVGO-HdUWUryFjJmWBr4g2DJDPH-PaWAQ','2024-08-25 18:02:19.726496','2024-08-26 18:02:19.000000',10,'6455c7a9e3194bf79da9e8ad69b1a448'),(25,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY5ODE0MiwiaWF0IjoxNzI0NjExNzQyLCJqdGkiOiI1NTYzZjRhZDA2MmU0NWNmYTI3NGIzNmEwNzgyMTllNiIsInVzZXJfaWQiOjR9.8Tfk3WoNYKZE0EJUenM99joFuGXZEtaCdZdXpEWW0bs','2024-08-25 18:49:02.888571','2024-08-26 18:49:02.000000',4,'5563f4ad062e45cfa274b36a078219e6'),(26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDY5ODY2NiwiaWF0IjoxNzI0NjEyMjY2LCJqdGkiOiI5MmQ5NmRiMjRhYmQ0ZWVhYTE5NGE0MTc2NWFlNWZiZiIsInVzZXJfaWQiOjR9.zXc1APJHPvgPZZizDWSxHtKm2J5ux5nIVxHb6OM9Auo','2024-08-25 18:57:46.057585','2024-08-26 18:57:46.000000',4,'92d96db24abd4eeaa194a41765ae5fbf'),(27,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDc3NjMyMywiaWF0IjoxNzI0Njg5OTIzLCJqdGkiOiIyMWE1MDYwNzM5ODQ0YTFjOWVlN2FhYjkwZGQxZTRlOCIsInVzZXJfaWQiOjJ9.sh8dEK4F2CTQLGprF7pSdgOWnR2QitwLLnR7EPX-KQI','2024-08-26 16:32:03.886895','2024-08-27 16:32:03.000000',2,'21a5060739844a1c9ee7aab90dd1e4e8'),(28,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDc3NjU3NSwiaWF0IjoxNzI0NjkwMTc1LCJqdGkiOiI4MjQyM2FjMGUyYmI0OGZjYjZhN2JlNzExNjY4MjYzOCIsInVzZXJfaWQiOjExfQ.SWJ0dMogOwMvHkwaUCNFxW4zgMHX9MR32T9tcL8nACg','2024-08-26 16:36:15.541241','2024-08-27 16:36:15.000000',11,'82423ac0e2bb48fcb6a7be7116682638'),(29,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDc3NjU5MCwiaWF0IjoxNzI0NjkwMTkwLCJqdGkiOiI5MzQ4ZDE5YjQ2MmI0ZTIwYWZiMDRlYWNkNWIxNjUxNiIsInVzZXJfaWQiOjExfQ.yHpf2EHuNAvj3MeGQvrEdtojVH97Z-_NRk-oyuIUhNs','2024-08-26 16:36:30.466251','2024-08-27 16:36:30.000000',11,'9348d19b462b4e20afb04eacd5b16516'),(30,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDc4MjM1NSwiaWF0IjoxNzI0Njk1OTU1LCJqdGkiOiJhMTk2ZDYwZjU5Y2Q0MDQ4YWVjMzBmMzE0YTdiYjdhYyIsInVzZXJfaWQiOjExfQ.4Cpmbu8Z1SoUyED9Jzj44DjCDFIP-6bfLFwarGiPUEg','2024-08-26 18:12:35.612349','2024-08-27 18:12:35.000000',11,'a196d60f59cd4048aec30f314a7bb7ac'),(31,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDc4NDA1OCwiaWF0IjoxNzI0Njk3NjU4LCJqdGkiOiI4NDNjMmI0YjFkYjQ0NTkzYjE2MzZkMTFmNWYwMTc3NCIsInVzZXJfaWQiOjExfQ.pZJv9XFxPq_heqsZWEfKJvyfKDEYmQuVX3ads4EVFbM','2024-08-26 18:40:58.562884','2024-08-27 18:40:58.000000',11,'843c2b4b1db44593b1636d11f5f01774'),(32,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDc4NDA4NCwiaWF0IjoxNzI0Njk3Njg0LCJqdGkiOiJlOWQxNDIwYjljNmI0YzQ5YTg4NGNkMjRhOTFiZmJkYyIsInVzZXJfaWQiOjR9.-tA8_WdM7AY3l2XeGV5f0R2L679Hk_dobZcbIBsusxI','2024-08-26 18:41:24.009661','2024-08-27 18:41:24.000000',4,'e9d1420b9c6b4c49a884cd24a91bfbdc'),(33,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDc4NDM2MiwiaWF0IjoxNzI0Njk3OTYyLCJqdGkiOiJmNWFkMDYxMTZiY2U0NmRiYTQ4NWNiMTE0ZDAxYmY4YSIsInVzZXJfaWQiOjEyfQ.XIyBTEKAmQS43HGfq5klyEWFLffuT0EBmnAoB2jI_Uo','2024-08-26 18:46:02.969306','2024-08-27 18:46:02.000000',12,'f5ad06116bce46dba485cb114d01bf8a'),(34,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDc4NDM4MywiaWF0IjoxNzI0Njk3OTgzLCJqdGkiOiJiYjlhOWUxYTU4MzQ0YzI1YjUwN2VhMWYyNTQ0NTU1NSIsInVzZXJfaWQiOjEyfQ.1LHmEUFE0JmRrUczmTPkdW5WC7ULwxGKRYzE16nOY6o','2024-08-26 18:46:23.067387','2024-08-27 18:46:23.000000',12,'bb9a9e1a58344c25b507ea1f25445555'),(35,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDc4NTg2MywiaWF0IjoxNzI0Njk5NDYzLCJqdGkiOiJiYTljNTc2MGJjNjg0ODk0OGJhZjAzYzk2M2FiMGY1ZSIsInVzZXJfaWQiOjEyfQ.Vz8XTNBAsUieqCZBedR_xZQuYo544jD_yGWmvUyLS-Q','2024-08-26 19:11:03.803343','2024-08-27 19:11:03.000000',12,'ba9c5760bc6848948baf03c963ab0f5e'),(36,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDc4NjY2MiwiaWF0IjoxNzI0NzAwMjYyLCJqdGkiOiIwZjc0YWQ3MTc0OWI0NjA5OTIwYWNlM2UzZjVkNzM0MSIsInVzZXJfaWQiOjEyfQ.lFPVFPOeCtXvwyI5W_21Mdc4gnboaTl7BYFiN4B8V4U','2024-08-26 19:24:22.695353','2024-08-27 19:24:22.000000',12,'0f74ad71749b4609920ace3e3f5d7341'),(37,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDc4NzQ0NiwiaWF0IjoxNzI0NzAxMDQ2LCJqdGkiOiIzYTAzOGI5ODg5OTA0NDg2YmVmMTczYjhkYmQ2M2Y3OCIsInVzZXJfaWQiOjEyfQ.qcL-tCZ3Q7aoKvsdQyQz-2AYfq5XNhCJt3N6FZOsPlk','2024-08-26 19:37:26.949580','2024-08-27 19:37:26.000000',12,'3a038b9889904486bef173b8dbd63f78'),(38,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDc4NzUzMywiaWF0IjoxNzI0NzAxMTMzLCJqdGkiOiI0YmQwNjc2MTVmOGE0NWIxOWVkNjhhMTYxNjgyMDkzYiIsInVzZXJfaWQiOjEzfQ.9j1qE9Pa83K-FjemK99ImfFvtjw42A2X_rBr64diABY','2024-08-26 19:38:53.987178','2024-08-27 19:38:53.000000',13,'4bd067615f8a45b19ed68a161682093b'),(39,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDc4NzU0OCwiaWF0IjoxNzI0NzAxMTQ4LCJqdGkiOiJkM2FjZjlmNDU1MTM0NGNiOTdkNGY2ZjU0OTk0YzNlMyIsInVzZXJfaWQiOjEzfQ.R-_Dw18ieNWQCYNoAn-6XCaH8zHg3a_7SnE08RYTTRc','2024-08-26 19:39:08.196249','2024-08-27 19:39:08.000000',13,'d3acf9f4551344cb97d4f6f54994c3e3'),(40,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDgzNjYzMCwiaWF0IjoxNzI0NzUwMjMwLCJqdGkiOiJhZmM2MTNkOWJkNTM0ZDI0YjZkMWM1NmE2YjEzYTRkNSIsInVzZXJfaWQiOjE0fQ.qBOMXPWrgSdderiUh9VPkL0rRxs0aavExNuVDMm9ZhE','2024-08-27 09:17:10.080241','2024-08-28 09:17:10.000000',14,'afc613d9bd534d24b6d1c56a6b13a4d5'),(41,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDgzNjYzNSwiaWF0IjoxNzI0NzUwMjM1LCJqdGkiOiI3OTljZWQ1ZTI2MTg0OGQzYjk1YTFmMmNlZWVlN2QyZiIsInVzZXJfaWQiOjE0fQ.UqBK_LoULFbmCk74UNMGBbpbNdg7qkwvEv4PyeUIf3g','2024-08-27 09:17:15.581541','2024-08-28 09:17:15.000000',14,'799ced5e261848d3b95a1f2ceeee7d2f'),(42,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDgzNjkzMiwiaWF0IjoxNzI0NzUwNTMyLCJqdGkiOiJmYjI3YTIwZTkxMmM0YmNkYWQ5YmE0ZDY3ODNiZmQ3MiIsInVzZXJfaWQiOjEyfQ.GZT0V8p9cA5k2RywBHa5oj1jMxI6BEeC0Kb6-D8tXvI','2024-08-27 09:22:12.212512','2024-08-28 09:22:12.000000',12,'fb27a20e912c4bcdad9ba4d6783bfd72'),(43,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDgzODczOSwiaWF0IjoxNzI0NzUyMzM5LCJqdGkiOiI1ZThkMDU0NThkNjI0YzgzOTdkODZlZDliN2NlMGJkMSIsInVzZXJfaWQiOjE0fQ.Guh8qBRSXFYlLaBAICQczT6TuBBwze-5fKAxZXjaLF8','2024-08-27 09:52:19.930025','2024-08-28 09:52:19.000000',14,'5e8d05458d624c8397d86ed9b7ce0bd1'),(44,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDgzOTQwNSwiaWF0IjoxNzI0NzUzMDA1LCJqdGkiOiJkZDk0YzJjN2FjMDc0YzhjOWUwMGRhNGU4OGMzNTU4YyIsInVzZXJfaWQiOjE0fQ.d9QDxcV72oTifgH4EFkcRCAdj0gRBfxGXEMmgcTvud4','2024-08-27 10:03:25.107083','2024-08-28 10:03:25.000000',14,'dd94c2c7ac074c8c9e00da4e88c3558c');
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-02 23:34:59
