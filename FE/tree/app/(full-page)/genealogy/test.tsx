-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: treefamily
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chucnang`
--

DROP TABLE IF EXISTS `chucnang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chucnang` (
  `chucNangId` varchar(50) NOT NULL,
  `chucNangCode` varchar(50) NOT NULL COMMENT 'Mã chức năng: SUKIEN, TAICHINH, TAILIEU...',
  `tenChucNang` varchar(100) NOT NULL COMMENT 'Tên hiển thị: Quản lý sự kiện',
  `moTa` varchar(255) DEFAULT NULL,
  `parentId` varchar(50) DEFAULT NULL COMMENT 'Chức năng cha (nếu có)',
  `icon` varchar(50) DEFAULT NULL COMMENT 'Icon hiển thị',
  `duongDan` varchar(100) DEFAULT NULL COMMENT 'URL path: /admin/events',
  `thuTu` int DEFAULT '0' COMMENT 'Thứ tự hiển thị',
  `active_flag` tinyint DEFAULT '1',
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`chucNangId`),
  UNIQUE KEY `uk_chucnang_code` (`chucNangCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chucnang`
--

LOCK TABLES `chucnang` WRITE;
/*!40000 ALTER TABLE `chucnang` DISABLE KEYS */;
INSERT INTO `chucnang` VALUES ('8fbe62e7-e4cc-11f0-a0f9-a8934a9bae74','CHICHI','Quản lý chi tiêu','Quản lý chi tiêu dòng họ','','/icon/dollar.png','/contributionsDown',6,1,NULL,NULL),('CN_ADMIN','QUANTRI','Quản trị hệ thống','Menu quản trị hệ thống',NULL,'/icon/management.png','#',9,1,NULL,NULL),('CN_AI','AI_CHAT','Hỏi đáp AI','Chat với AI','CN_ADMIN','/icon/ai.png','/genAI',5,1,NULL,NULL),('CN001','DASHBOARD','Trang chủ','Dashboard tổng quan',NULL,'/icon/home.png','/dashboard',1,1,NULL,NULL),('CN002','THANHVIEN','Quản lý thành viên','Quản lý thành viên dòng họ',NULL,'/icon/member.png','/members',2,1,NULL,NULL),('CN003','SUKIEN','Quản lý sự kiện','Quản lý sự kiện dòng họ',NULL,'/icon/calendar.png','/manageEvents',3,1,NULL,NULL),('CN004','TAICHINH','Quản lý tài chính','Quản lý thu chi','','/icon/dollar.png','/contributions',4,1,NULL,NULL),('CN005','TAILIEU','Quản lý tài liệu','Quản lý phả ký, tài liệu',NULL,'/icon/document.png','/documents',7,1,NULL,NULL),('CN006','TINTUC','Quản lý tin tức','Quản lý tin tức, thông báo',NULL,'/icon/new.png','/manage-news',8,1,NULL,NULL),('CN007','NGUOIDUNG','Quản lý người dùng','Quản lý tài khoản','CN_ADMIN','/icon/iconmember.png','/users',9,1,NULL,NULL),('CN008','DONGHO','Quản lý dòng họ','Quản lý thông tin dòng họ','CN_ADMIN','/icon/iconmember.png','/lineage',7,1,NULL,NULL),('CN009','PHANQUYEN','Phân quyền','Quản lý role và quyền','CN_ADMIN','/icon/iconmember.png','/roles',9,1,NULL,NULL),('CN010','GENEALOGY','View user','Xem cây phả đồ',NULL,'/icon/genealogy.png','/genealogy',10,1,NULL,NULL);
/*!40000 ALTER TABLE `chucnang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dongho`
--

DROP TABLE IF EXISTS `dongho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dongho` (
  `dongHoId` varchar(50) NOT NULL,
  `tenDongHo` varchar(255) DEFAULT NULL,
  `queQuanGoc` varchar(255) DEFAULT NULL,
  `ngayThanhLap` date DEFAULT NULL,
  `nguoiQuanLy` varchar(255) DEFAULT NULL,
  `ghiChu` text,
  `active_flag` tinyint DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  `ngayTao` datetime DEFAULT NULL,
  PRIMARY KEY (`dongHoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dongho`
--

LOCK TABLES `dongho` WRITE;
/*!40000 ALTER TABLE `dongho` DISABLE KEYS */;
INSERT INTO `dongho` VALUES ('025721a4-bd0d-4447-9b9b-505d174de937','Trần','Thanh Tùng, Thanh Miện, Hải Phòng','2025-12-23','Trần Thanh Tùng','dòng họ gia giáo',1,'system','2026-01-16 14:48:56','15e5e9b2-b293-4f18-b0f4-86548bbda3b0','2025-12-24 15:59:25'),('22cb2805-f215-11f0-a491-a8934a9bae74','Nhữ','Bắc Thanh Miên, Hải phòng','2026-01-12','Nhữ Bảo Anh','đây là dòng họ lâu đời và cổ truyền nhất việt nam',1,'53382048-ba53-4955-a100-2516b86ca978','2026-01-15 20:26:49','53382048-ba53-4955-a100-2516b86ca978','2026-01-15 20:21:44'),('9d494063-537a-45aa-9bbc-1203f6728d55','Phạm','Khoái châu','2026-01-07','Phạm Thị Thùy Linh','dòng họ truyền thống',1,'system','2026-01-06 15:19:36','system','2026-01-06 15:19:36'),('adcca78c-b74f-4eff-8f74-b83438047b05','Nguyên','Hải Phòng','2025-12-29','Nguyên Văn Đinh','thân thiết',1,'89fd6f88-c909-11f0-8020-a8934a9bae74','2026-01-06 15:52:23','89fd6f88-c909-11f0-8020-a8934a9bae74','2026-01-06 15:52:23'),('d5070904-a492-4963-b612-0bfa3e117318','LÊ','Hải Phòng','2025-12-09','Lê Văn Sơn','Dòng họ lâu đời',1,'system','2025-12-29 22:54:26','system','2025-12-29 22:54:26'),('e1c3424d-38d7-448b-9f79-38d0675f4fb7','Dòng họ Bình','Bình Định','2026-01-05','Bình Đại Nguyên Soái','cả nghìn năm',1,'system','2026-01-12 15:42:44','system','2026-01-12 15:42:44'),('e9022e64-cbae-11f0-8020-a8934a9bae74','Dòng họ Nguyễn','Hải Dương','1999-12-31','Nguyễn Văn A','Dòng họ lưu trữ thông tin gia phả.',1,'admin','2026-01-12 15:37:34','system','2025-12-02 11:28:12'),('e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ','Gia Lai','1999-12-31','Vũ Tiến Cường',NULL,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `dongho` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loaiquanhe`
--

DROP TABLE IF EXISTS `loaiquanhe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loaiquanhe` (
  `loaiQuanHeId` varchar(50) NOT NULL,
  `tenLoaiQuanHe` varchar(100) DEFAULT NULL,
  `moTa` text,
  `active_flag` tinyint DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`loaiQuanHeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loaiquanhe`
--

LOCK TABLES `loaiquanhe` WRITE;
/*!40000 ALTER TABLE `loaiquanhe` DISABLE KEYS */;
INSERT INTO `loaiquanhe` VALUES ('LQH_ANH_EM','Anh - Em','Anh em ruột (cùng cha mẹ)',1,'system','2026-01-21 22:22:09','system'),('LQH_BA_CHAU','Bà - Cháu','Bà nội/ngoại - Cháu',1,'system','2026-01-21 22:22:09','system'),('LQH_BAC_CHAU','Bác - Cháu','Bác (anh trai của cha) - Cháu',1,'system','2026-01-21 22:22:09','system'),('LQH_CAU_CHAU','Cậu - Cháu','Cậu (anh em trai của mẹ) - Cháu',1,'system','2026-01-21 22:22:09','system'),('LQH_CHA_CON','Cha - Con','Quan hệ cha con trực tiếp',1,'system','2026-01-21 22:22:09','system'),('LQH_CHI_EM','Chị - Em','Chị em ruột (cùng cha mẹ)',1,'system','2026-01-21 22:22:09','system'),('LQH_CHU_CHAU','Chú - Cháu','Chú (em trai của cha) - Cháu',1,'system','2026-01-21 22:22:09','system'),('LQH_CO_CHAU','Cô - Cháu','Cô (chị em gái của cha) - Cháu',1,'system','2026-01-21 22:22:09','system'),('LQH_DI_CHAU','Dì - Cháu','Dì (chị em gái của mẹ) - Cháu',1,'system','2026-01-21 22:22:09','system'),('LQH_ME_CON','Mẹ - Con','Quan hệ mẹ con trực tiếp',1,'system','2026-01-21 22:22:09','system'),('LQH_ONG_CHAU','Ông - Cháu','Ông nội/ngoại - Cháu',1,'system','2026-01-21 22:22:09','system'),('LQH_VO_CHONG','Vợ - Chồng','Quan hệ vợ chồng',1,'system','2026-01-21 22:22:09','system');
/*!40000 ALTER TABLE `loaiquanhe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loaisukien`
--

DROP TABLE IF EXISTS `loaisukien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loaisukien` (
  `loaiSuKien` int NOT NULL,
  `tenLoaiSuKien` varchar(200) DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  `active_flag` int DEFAULT NULL,
  PRIMARY KEY (`loaiSuKien`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loaisukien`
--

LOCK TABLES `loaisukien` WRITE;
/*!40000 ALTER TABLE `loaisukien` DISABLE KEYS */;
INSERT INTO `loaisukien` VALUES (1,'Tin Vui',NULL,NULL,NULL,1),(2,'Sự Kiện',NULL,NULL,NULL,1),(3,'Tin Chung',NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `loaisukien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoidung`
--

DROP TABLE IF EXISTS `nguoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoidung` (
  `nguoiDungId` varchar(50) NOT NULL,
  `dongHoId` varchar(50) DEFAULT NULL,
  `roleId` varchar(50) DEFAULT NULL,
  `tenDangNhap` varchar(100) NOT NULL,
  `matKhau` varchar(255) DEFAULT NULL,
  `ngayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  `online_flag` tinyint DEFAULT '0',
  `active_flag` tinyint DEFAULT '1',
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`nguoiDungId`),
  UNIQUE KEY `tenDangNhap` (`tenDangNhap`),
  KEY `roleId` (`roleId`),
  KEY `dongHoId` (`dongHoId`),
  CONSTRAINT `nguoidung_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`) ON DELETE SET NULL,
  CONSTRAINT `nguoidung_ibfk_2` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoidung`
--

LOCK TABLES `nguoidung` WRITE;
/*!40000 ALTER TABLE `nguoidung` DISABLE KEYS */;
INSERT INTO `nguoidung` VALUES ('15e5e9b2-b293-4f18-b0f4-86548bbda3b0','025721a4-bd0d-4447-9b9b-505d174de937','0437a931-cf5e-11f0-8020-a8934a9bae74','nguyenvanbao123@gmail.com','ac851ed86b5f55eda6daf977344b8e84','2025-12-19 11:22:31',1,1,NULL,'2026-01-15 09:43:58','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),('53382048-ba53-4955-a100-2516b86ca978','22cb2805-f215-11f0-a491-a8934a9bae74','0437a931-cf5e-11f0-8020-a8934a9bae74','nguyenvanbao111@gmail.com','c386274cf818d5b6d27c13fd026c53c9','2026-01-15 20:21:44',1,1,NULL,'2026-01-15 20:21:44','53382048-ba53-4955-a100-2516b86ca978'),('61ef80c1-d2fa-4675-9323-bec58d33ed19','e9022e64-cbae-11f0-8020-a8934a9bae89','0437a931-cf5e-11f0-8020-a8934a9bae74','nhubaoanh221@gmail.com','bc9ae919caed0fc37d2db4f70f19c45e','2025-12-22 21:27:02',1,1,'89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-22 21:27:02','89fd6f88-c909-11f0-8020-a8934a9bae74'),('6aa26582-bd12-4fdb-95d8-4e09fdb2f102','e9022e64-cbae-11f0-8020-a8934a9bae74','0aa1a174-c8ed-11f0-8020-a8934a9bae74','minh123@gmail.com','ddc83bf88c241349a4211172137545e0','2025-12-22 21:16:56',1,1,NULL,'2025-12-22 21:16:56','system'),('89fd6f88-c909-11f0-8020-a8934a9bae74','e9022e64-cbae-11f0-8020-a8934a9bae74','c2ed095e-c905-11f0-8020-a8934a9bae74','nhubaoanh111@gmail.com','0192023a7bbd73250516f069df18b500','2025-11-24 14:45:25',1,1,'admin','2025-12-03 10:00:08',NULL),('90e581f7-f522-4032-a3bc-cbc9cd119f95','025721a4-bd0d-4447-9b9b-505d174de937','0aa1a174-c8ed-11f0-8020-a8934a9bae74','minh333@gmail.com','1efae9aff06b3e1ac8378fddfd34123c','2026-01-20 15:12:18',0,1,'15e5e9b2-b293-4f18-b0f4-86548bbda3b0','2026-01-20 15:12:18','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),('a20a6246-4800-4992-af5c-adcd6e898ee6','9d494063-537a-45aa-9bbc-1203f6728d55','0aa1a174-c8ed-11f0-8020-a8934a9bae74','minh111@gmail.com','3be22b661340b185abcade7d4a7dd2ac','2025-12-19 15:51:04',0,0,NULL,'2025-12-19 22:06:29','system'),('b9b116b0-3d3c-4187-b1a9-fd8247274d64','e9022e64-cbae-11f0-8020-a8934a9bae74','0437a931-cf5e-11f0-8020-a8934a9bae74','nguyenvanbao222@gmail.com','014663e57b654fd69a2352969e57e2e6','2025-12-22 21:11:25',1,1,NULL,'2026-01-14 16:06:45','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),('ec9d0e50-7c5a-48a9-b606-daeb591230a1','9d494063-537a-45aa-9bbc-1203f6728d55','0aa1a174-c8ed-11f0-8020-a8934a9bae74','phamthithuylinh11@gmail.aom','0e854e0e782231a4597e79befaab7dc2','2026-01-07 00:14:28',0,1,'89fd6f88-c909-11f0-8020-a8934a9bae74','2026-01-07 00:14:28','89fd6f88-c909-11f0-8020-a8934a9bae74');
/*!40000 ALTER TABLE `nguoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quanhe`
--

DROP TABLE IF EXISTS `quanhe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quanhe` (
  `quanHeId` varchar(50) NOT NULL,
  `thanhVien1Id` int DEFAULT NULL,
  `thanhVien2Id` int DEFAULT NULL,
  `loaiQuanHeId` varchar(50) DEFAULT NULL,
  `ngayBatDau` date DEFAULT NULL,
  `ngayKetThuc` date DEFAULT NULL,
  `ghiChu` text,
  `active_flag` tinyint DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  `dongHoId1` varchar(50) DEFAULT NULL,
  `dongHoId2` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`quanHeId`),
  KEY `thanhVien1Id` (`thanhVien1Id`),
  KEY `thanhVien2Id` (`thanhVien2Id`),
  KEY `loaiQuanHeId` (`loaiQuanHeId`),
  CONSTRAINT `quanhe_ibfk_3` FOREIGN KEY (`loaiQuanHeId`) REFERENCES `loaiquanhe` (`loaiQuanHeId`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quanhe`
--

LOCK TABLES `quanhe` WRITE;
/*!40000 ALTER TABLE `quanhe` DISABLE KEYS */;
INSERT INTO `quanhe` VALUES ('ce171167-f6dd-11f0-b747-a8934a9bae74',1,3,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce180571-f6dd-11f0-b747-a8934a9bae74',1,4,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce181e03-f6dd-11f0-b747-a8934a9bae74',1,5,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1820cf-f6dd-11f0-b747-a8934a9bae74',3,6,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1822c3-f6dd-11f0-b747-a8934a9bae74',6,9,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce182451-f6dd-11f0-b747-a8934a9bae74',6,10,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1825a9-f6dd-11f0-b747-a8934a9bae74',6,11,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18272e-f6dd-11f0-b747-a8934a9bae74',6,13,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce183e33-f6dd-11f0-b747-a8934a9bae74',6,15,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce184699-f6dd-11f0-b747-a8934a9bae74',6,18,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce184b1a-f6dd-11f0-b747-a8934a9bae74',6,21,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18516e-f6dd-11f0-b747-a8934a9bae74',6,23,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18a311-f6dd-11f0-b747-a8934a9bae74',13,25,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18a5a6-f6dd-11f0-b747-a8934a9bae74',13,26,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18a7d6-f6dd-11f0-b747-a8934a9bae74',13,28,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18aa43-f6dd-11f0-b747-a8934a9bae74',13,30,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18ac33-f6dd-11f0-b747-a8934a9bae74',13,31,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18ae17-f6dd-11f0-b747-a8934a9bae74',13,32,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18afe4-f6dd-11f0-b747-a8934a9bae74',13,33,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18b1ba-f6dd-11f0-b747-a8934a9bae74',13,34,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18c1aa-f6dd-11f0-b747-a8934a9bae74',13,36,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18c484-f6dd-11f0-b747-a8934a9bae74',15,38,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18c646-f6dd-11f0-b747-a8934a9bae74',18,40,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18c7f4-f6dd-11f0-b747-a8934a9bae74',18,41,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18c989-f6dd-11f0-b747-a8934a9bae74',18,42,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18cb10-f6dd-11f0-b747-a8934a9bae74',18,43,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18cde4-f6dd-11f0-b747-a8934a9bae74',18,44,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18cf45-f6dd-11f0-b747-a8934a9bae74',18,45,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18d080-f6dd-11f0-b747-a8934a9bae74',18,46,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18d1dc-f6dd-11f0-b747-a8934a9bae74',18,48,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18d343-f6dd-11f0-b747-a8934a9bae74',18,50,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18d55b-f6dd-11f0-b747-a8934a9bae74',18,52,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18d7c9-f6dd-11f0-b747-a8934a9bae74',18,54,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18d8c8-f6dd-11f0-b747-a8934a9bae74',21,56,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18d9fc-f6dd-11f0-b747-a8934a9bae74',21,58,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18db2f-f6dd-11f0-b747-a8934a9bae74',21,60,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18dcee-f6dd-11f0-b747-a8934a9bae74',21,62,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18df75-f6dd-11f0-b747-a8934a9bae74',21,64,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18e108-f6dd-11f0-b747-a8934a9bae74',21,65,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18e250-f6dd-11f0-b747-a8934a9bae74',21,66,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18e3f6-f6dd-11f0-b747-a8934a9bae74',21,67,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18e544-f6dd-11f0-b747-a8934a9bae74',21,68,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18e68c-f6dd-11f0-b747-a8934a9bae74',21,69,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18e78a-f6dd-11f0-b747-a8934a9bae74',21,71,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18e8a5-f6dd-11f0-b747-a8934a9bae74',23,73,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18e998-f6dd-11f0-b747-a8934a9bae74',23,75,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18eab1-f6dd-11f0-b747-a8934a9bae74',23,76,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18eb8c-f6dd-11f0-b747-a8934a9bae74',23,77,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18ec5e-f6dd-11f0-b747-a8934a9bae74',26,78,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18ed32-f6dd-11f0-b747-a8934a9bae74',26,79,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18ee18-f6dd-11f0-b747-a8934a9bae74',26,81,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18ef2f-f6dd-11f0-b747-a8934a9bae74',26,82,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18f018-f6dd-11f0-b747-a8934a9bae74',26,84,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18f0f4-f6dd-11f0-b747-a8934a9bae74',26,85,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18f1c8-f6dd-11f0-b747-a8934a9bae74',26,86,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18f2ae-f6dd-11f0-b747-a8934a9bae74',26,88,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18f394-f6dd-11f0-b747-a8934a9bae74',28,90,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18f463-f6dd-11f0-b747-a8934a9bae74',28,91,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18f533-f6dd-11f0-b747-a8934a9bae74',28,92,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18f744-f6dd-11f0-b747-a8934a9bae74',28,94,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18f82f-f6dd-11f0-b747-a8934a9bae74',28,95,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18f8f9-f6dd-11f0-b747-a8934a9bae74',28,96,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18f9c8-f6dd-11f0-b747-a8934a9bae74',34,97,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18fa91-f6dd-11f0-b747-a8934a9bae74',34,98,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18fb71-f6dd-11f0-b747-a8934a9bae74',34,100,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18fc50-f6dd-11f0-b747-a8934a9bae74',34,102,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18fd2a-f6dd-11f0-b747-a8934a9bae74',34,103,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18fe3b-f6dd-11f0-b747-a8934a9bae74',34,104,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce18ff96-f6dd-11f0-b747-a8934a9bae74',36,106,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce190084-f6dd-11f0-b747-a8934a9bae74',36,108,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce190203-f6dd-11f0-b747-a8934a9bae74',36,109,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1902db-f6dd-11f0-b747-a8934a9bae74',36,110,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1903aa-f6dd-11f0-b747-a8934a9bae74',36,111,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1904a2-f6dd-11f0-b747-a8934a9bae74',36,113,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce190571-f6dd-11f0-b747-a8934a9bae74',36,114,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce190652-f6dd-11f0-b747-a8934a9bae74',38,116,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce19071d-f6dd-11f0-b747-a8934a9bae74',38,117,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1907fb-f6dd-11f0-b747-a8934a9bae74',38,119,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1908d8-f6dd-11f0-b747-a8934a9bae74',46,121,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1909b8-f6dd-11f0-b747-a8934a9bae74',46,123,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce190ab4-f6dd-11f0-b747-a8934a9bae74',46,125,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce190ba2-f6dd-11f0-b747-a8934a9bae74',50,126,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce190c7f-f6dd-11f0-b747-a8934a9bae74',50,127,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce190df0-f6dd-11f0-b747-a8934a9bae74',50,129,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce190edf-f6dd-11f0-b747-a8934a9bae74',52,130,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce191004-f6dd-11f0-b747-a8934a9bae74',52,131,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1910ed-f6dd-11f0-b747-a8934a9bae74',52,133,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1911d4-f6dd-11f0-b747-a8934a9bae74',56,134,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce191520-f6dd-11f0-b747-a8934a9bae74',56,135,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1916fc-f6dd-11f0-b747-a8934a9bae74',56,137,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce191861-f6dd-11f0-b747-a8934a9bae74',56,139,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce191987-f6dd-11f0-b747-a8934a9bae74',56,141,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce191ac3-f6dd-11f0-b747-a8934a9bae74',56,143,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce191bf1-f6dd-11f0-b747-a8934a9bae74',56,145,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce191ce4-f6dd-11f0-b747-a8934a9bae74',56,146,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce191db5-f6dd-11f0-b747-a8934a9bae74',56,147,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce19f96e-f6dd-11f0-b747-a8934a9bae74',56,149,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce19fc0e-f6dd-11f0-b747-a8934a9bae74',56,150,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce19fd9c-f6dd-11f0-b747-a8934a9bae74',58,151,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce19ff1f-f6dd-11f0-b747-a8934a9bae74',58,153,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a0095-f6dd-11f0-b747-a8934a9bae74',58,155,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a0207-f6dd-11f0-b747-a8934a9bae74',58,157,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a13fa-f6dd-11f0-b747-a8934a9bae74',58,159,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a1678-f6dd-11f0-b747-a8934a9bae74',58,161,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a17fe-f6dd-11f0-b747-a8934a9bae74',58,162,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a195d-f6dd-11f0-b747-a8934a9bae74',58,163,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a1ab1-f6dd-11f0-b747-a8934a9bae74',60,164,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a1c11-f6dd-11f0-b747-a8934a9bae74',62,165,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a1d7f-f6dd-11f0-b747-a8934a9bae74',62,167,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a1ed9-f6dd-11f0-b747-a8934a9bae74',62,169,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a200d-f6dd-11f0-b747-a8934a9bae74',69,170,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a20eb-f6dd-11f0-b747-a8934a9bae74',69,171,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a21c4-f6dd-11f0-b747-a8934a9bae74',69,172,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a22a6-f6dd-11f0-b747-a8934a9bae74',69,173,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a2454-f6dd-11f0-b747-a8934a9bae74',71,175,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a2611-f6dd-11f0-b747-a8934a9bae74',71,176,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a277c-f6dd-11f0-b747-a8934a9bae74',73,178,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a2983-f6dd-11f0-b747-a8934a9bae74',73,179,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a2a68-f6dd-11f0-b747-a8934a9bae74',73,180,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a2b3f-f6dd-11f0-b747-a8934a9bae74',73,181,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a2c6a-f6dd-11f0-b747-a8934a9bae74',73,182,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a2d51-f6dd-11f0-b747-a8934a9bae74',79,184,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a2e32-f6dd-11f0-b747-a8934a9bae74',79,186,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a2f21-f6dd-11f0-b747-a8934a9bae74',79,187,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a2ff7-f6dd-11f0-b747-a8934a9bae74',79,188,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a30d2-f6dd-11f0-b747-a8934a9bae74',79,190,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a31ae-f6dd-11f0-b747-a8934a9bae74',82,192,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a3286-f6dd-11f0-b747-a8934a9bae74',82,193,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a3351-f6dd-11f0-b747-a8934a9bae74',82,194,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a3425-f6dd-11f0-b747-a8934a9bae74',82,195,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a3543-f6dd-11f0-b747-a8934a9bae74',82,196,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a368b-f6dd-11f0-b747-a8934a9bae74',86,197,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a5fcc-f6dd-11f0-b747-a8934a9bae74',86,198,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a633f-f6dd-11f0-b747-a8934a9bae74',86,199,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a64bd-f6dd-11f0-b747-a8934a9bae74',88,201,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a667f-f6dd-11f0-b747-a8934a9bae74',88,203,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a67dc-f6dd-11f0-b747-a8934a9bae74',92,204,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a691d-f6dd-11f0-b747-a8934a9bae74',92,205,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a6aeb-f6dd-11f0-b747-a8934a9bae74',92,206,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a6c78-f6dd-11f0-b747-a8934a9bae74',92,207,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a6e1f-f6dd-11f0-b747-a8934a9bae74',98,209,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a7035-f6dd-11f0-b747-a8934a9bae74',98,210,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1a725c-f6dd-11f0-b747-a8934a9bae74',100,211,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1afffc-f6dd-11f0-b747-a8934a9bae74',100,213,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b02cc-f6dd-11f0-b747-a8934a9bae74',100,214,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b04a4-f6dd-11f0-b747-a8934a9bae74',104,215,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b06a4-f6dd-11f0-b747-a8934a9bae74',104,216,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b0873-f6dd-11f0-b747-a8934a9bae74',104,217,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b0a32-f6dd-11f0-b747-a8934a9bae74',106,218,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b0d14-f6dd-11f0-b747-a8934a9bae74',106,220,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b0eeb-f6dd-11f0-b747-a8934a9bae74',111,221,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b1050-f6dd-11f0-b747-a8934a9bae74',111,223,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b115b-f6dd-11f0-b747-a8934a9bae74',114,225,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b1226-f6dd-11f0-b747-a8934a9bae74',114,226,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b12e9-f6dd-11f0-b747-a8934a9bae74',117,227,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b13c1-f6dd-11f0-b747-a8934a9bae74',117,229,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b149b-f6dd-11f0-b747-a8934a9bae74',117,230,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b1560-f6dd-11f0-b747-a8934a9bae74',119,231,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b161d-f6dd-11f0-b747-a8934a9bae74',119,232,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b16df-f6dd-11f0-b747-a8934a9bae74',119,233,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b17b0-f6dd-11f0-b747-a8934a9bae74',121,234,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b1878-f6dd-11f0-b747-a8934a9bae74',121,235,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b194e-f6dd-11f0-b747-a8934a9bae74',123,236,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b1a0f-f6dd-11f0-b747-a8934a9bae74',123,237,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b1ad9-f6dd-11f0-b747-a8934a9bae74',127,238,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b1b97-f6dd-11f0-b747-a8934a9bae74',131,239,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b1c55-f6dd-11f0-b747-a8934a9bae74',135,240,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b1d29-f6dd-11f0-b747-a8934a9bae74',135,242,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b1e07-f6dd-11f0-b747-a8934a9bae74',137,243,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b1ecc-f6dd-11f0-b747-a8934a9bae74',137,244,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b1f8e-f6dd-11f0-b747-a8934a9bae74',137,245,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b2060-f6dd-11f0-b747-a8934a9bae74',139,246,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b2174-f6dd-11f0-b747-a8934a9bae74',139,247,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b22ab-f6dd-11f0-b747-a8934a9bae74',139,248,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b2378-f6dd-11f0-b747-a8934a9bae74',141,249,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b25c3-f6dd-11f0-b747-a8934a9bae74',141,250,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b26b2-f6dd-11f0-b747-a8934a9bae74',141,252,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b278b-f6dd-11f0-b747-a8934a9bae74',143,253,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b28ca-f6dd-11f0-b747-a8934a9bae74',143,254,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b2a19-f6dd-11f0-b747-a8934a9bae74',143,255,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b2b4d-f6dd-11f0-b747-a8934a9bae74',147,256,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b2c76-f6dd-11f0-b747-a8934a9bae74',147,257,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b2dfc-f6dd-11f0-b747-a8934a9bae74',151,258,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b2f8f-f6dd-11f0-b747-a8934a9bae74',151,260,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b311d-f6dd-11f0-b747-a8934a9bae74',151,262,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b3297-f6dd-11f0-b747-a8934a9bae74',153,263,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b33f7-f6dd-11f0-b747-a8934a9bae74',153,265,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b355f-f6dd-11f0-b747-a8934a9bae74',153,267,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b3766-f6dd-11f0-b747-a8934a9bae74',155,268,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b3aca-f6dd-11f0-b747-a8934a9bae74',155,270,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b3c32-f6dd-11f0-b747-a8934a9bae74',157,271,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b3d57-f6dd-11f0-b747-a8934a9bae74',157,272,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b3eca-f6dd-11f0-b747-a8934a9bae74',159,273,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b4033-f6dd-11f0-b747-a8934a9bae74',159,274,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b4198-f6dd-11f0-b747-a8934a9bae74',165,275,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b42d0-f6dd-11f0-b747-a8934a9bae74',165,276,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b443d-f6dd-11f0-b747-a8934a9bae74',165,277,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b457e-f6dd-11f0-b747-a8934a9bae74',167,278,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b46fd-f6dd-11f0-b747-a8934a9bae74',167,279,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b4856-f6dd-11f0-b747-a8934a9bae74',173,280,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b49a6-f6dd-11f0-b747-a8934a9bae74',173,281,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b4b36-f6dd-11f0-b747-a8934a9bae74',173,282,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b4c8c-f6dd-11f0-b747-a8934a9bae74',176,283,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b4dd8-f6dd-11f0-b747-a8934a9bae74',176,284,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b4f3c-f6dd-11f0-b747-a8934a9bae74',182,285,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b509d-f6dd-11f0-b747-a8934a9bae74',182,286,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b51f1-f6dd-11f0-b747-a8934a9bae74',184,287,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b536b-f6dd-11f0-b747-a8934a9bae74',184,289,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b54d9-f6dd-11f0-b747-a8934a9bae74',188,290,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b5644-f6dd-11f0-b747-a8934a9bae74',188,291,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b5795-f6dd-11f0-b747-a8934a9bae74',190,292,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b58e3-f6dd-11f0-b747-a8934a9bae74',190,293,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b5a66-f6dd-11f0-b747-a8934a9bae74',190,294,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b5bd2-f6dd-11f0-b747-a8934a9bae74',207,295,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b5d10-f6dd-11f0-b747-a8934a9bae74',218,296,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b5e6b-f6dd-11f0-b747-a8934a9bae74',218,297,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b5fb4-f6dd-11f0-b747-a8934a9bae74',221,298,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1b6127-f6dd-11f0-b747-a8934a9bae74',258,299,'LQH_CHA_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1bf687-f6dd-11f0-b747-a8934a9bae74',2,3,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1bff3d-f6dd-11f0-b747-a8934a9bae74',2,4,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c0433-f6dd-11f0-b747-a8934a9bae74',2,5,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c0852-f6dd-11f0-b747-a8934a9bae74',7,9,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c0b7c-f6dd-11f0-b747-a8934a9bae74',7,10,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c0eae-f6dd-11f0-b747-a8934a9bae74',7,11,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c11e5-f6dd-11f0-b747-a8934a9bae74',7,13,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c1557-f6dd-11f0-b747-a8934a9bae74',7,15,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c18e7-f6dd-11f0-b747-a8934a9bae74',7,18,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c1cbb-f6dd-11f0-b747-a8934a9bae74',7,21,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c20a9-f6dd-11f0-b747-a8934a9bae74',8,23,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c2233-f6dd-11f0-b747-a8934a9bae74',12,25,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c237d-f6dd-11f0-b747-a8934a9bae74',12,26,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c2512-f6dd-11f0-b747-a8934a9bae74',12,28,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c267b-f6dd-11f0-b747-a8934a9bae74',12,30,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c2805-f6dd-11f0-b747-a8934a9bae74',12,31,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c296b-f6dd-11f0-b747-a8934a9bae74',12,32,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c2ab8-f6dd-11f0-b747-a8934a9bae74',12,33,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c2c16-f6dd-11f0-b747-a8934a9bae74',14,34,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c2dae-f6dd-11f0-b747-a8934a9bae74',14,36,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c7e8b-f6dd-11f0-b747-a8934a9bae74',16,38,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c8121-f6dd-11f0-b747-a8934a9bae74',17,40,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c8318-f6dd-11f0-b747-a8934a9bae74',17,41,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c84c5-f6dd-11f0-b747-a8934a9bae74',17,42,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c865c-f6dd-11f0-b747-a8934a9bae74',17,43,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c87f2-f6dd-11f0-b747-a8934a9bae74',19,44,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c89ba-f6dd-11f0-b747-a8934a9bae74',19,45,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c8b48-f6dd-11f0-b747-a8934a9bae74',19,46,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c8cef-f6dd-11f0-b747-a8934a9bae74',19,48,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c8e7b-f6dd-11f0-b747-a8934a9bae74',19,50,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c90bf-f6dd-11f0-b747-a8934a9bae74',19,52,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c925a-f6dd-11f0-b747-a8934a9bae74',19,54,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c9425-f6dd-11f0-b747-a8934a9bae74',20,56,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c95ca-f6dd-11f0-b747-a8934a9bae74',20,58,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c97ba-f6dd-11f0-b747-a8934a9bae74',20,60,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c997b-f6dd-11f0-b747-a8934a9bae74',20,62,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c9afb-f6dd-11f0-b747-a8934a9bae74',20,64,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c9c48-f6dd-11f0-b747-a8934a9bae74',20,65,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c9d82-f6dd-11f0-b747-a8934a9bae74',20,66,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1c9fc2-f6dd-11f0-b747-a8934a9bae74',20,67,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1ca131-f6dd-11f0-b747-a8934a9bae74',20,68,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1ca2a8-f6dd-11f0-b747-a8934a9bae74',22,69,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1ca455-f6dd-11f0-b747-a8934a9bae74',22,71,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1ca5ea-f6dd-11f0-b747-a8934a9bae74',24,73,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1ca7a4-f6dd-11f0-b747-a8934a9bae74',24,75,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1ca98f-f6dd-11f0-b747-a8934a9bae74',24,76,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1cab1b-f6dd-11f0-b747-a8934a9bae74',24,77,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1caea3-f6dd-11f0-b747-a8934a9bae74',27,78,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1cb028-f6dd-11f0-b747-a8934a9bae74',27,79,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1cb182-f6dd-11f0-b747-a8934a9bae74',27,81,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1cb2ce-f6dd-11f0-b747-a8934a9bae74',27,82,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1cb470-f6dd-11f0-b747-a8934a9bae74',27,84,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1cb618-f6dd-11f0-b747-a8934a9bae74',27,85,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1cb77a-f6dd-11f0-b747-a8934a9bae74',27,86,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1cb903-f6dd-11f0-b747-a8934a9bae74',27,88,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1cba7d-f6dd-11f0-b747-a8934a9bae74',29,90,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1cbc27-f6dd-11f0-b747-a8934a9bae74',29,91,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1cbd90-f6dd-11f0-b747-a8934a9bae74',29,92,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1cbfa8-f6dd-11f0-b747-a8934a9bae74',29,94,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1d540c-f6dd-11f0-b747-a8934a9bae74',29,95,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1d5aba-f6dd-11f0-b747-a8934a9bae74',29,96,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1d5bf7-f6dd-11f0-b747-a8934a9bae74',35,97,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1d5cec-f6dd-11f0-b747-a8934a9bae74',35,98,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1d5e8e-f6dd-11f0-b747-a8934a9bae74',35,100,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1d5fef-f6dd-11f0-b747-a8934a9bae74',35,102,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1d60d2-f6dd-11f0-b747-a8934a9bae74',35,103,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1d61b8-f6dd-11f0-b747-a8934a9bae74',35,104,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1d62e2-f6dd-11f0-b747-a8934a9bae74',37,106,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1d63dc-f6dd-11f0-b747-a8934a9bae74',37,108,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1d64b5-f6dd-11f0-b747-a8934a9bae74',37,109,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1d6592-f6dd-11f0-b747-a8934a9bae74',37,110,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1d667f-f6dd-11f0-b747-a8934a9bae74',37,111,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1d6795-f6dd-11f0-b747-a8934a9bae74',37,113,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1d6a14-f6dd-11f0-b747-a8934a9bae74',37,114,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1d6b2f-f6dd-11f0-b747-a8934a9bae74',39,116,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1d6c0a-f6dd-11f0-b747-a8934a9bae74',39,117,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1d6cf5-f6dd-11f0-b747-a8934a9bae74',39,119,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e1538-f6dd-11f0-b747-a8934a9bae74',47,121,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e1972-f6dd-11f0-b747-a8934a9bae74',47,123,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e1ae6-f6dd-11f0-b747-a8934a9bae74',47,125,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e1c3d-f6dd-11f0-b747-a8934a9bae74',49,126,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e1dbc-f6dd-11f0-b747-a8934a9bae74',49,127,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e1efc-f6dd-11f0-b747-a8934a9bae74',51,129,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e2021-f6dd-11f0-b747-a8934a9bae74',53,130,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e21dd-f6dd-11f0-b747-a8934a9bae74',53,131,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e2315-f6dd-11f0-b747-a8934a9bae74',53,133,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e2468-f6dd-11f0-b747-a8934a9bae74',55,134,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e25fb-f6dd-11f0-b747-a8934a9bae74',55,135,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e2775-f6dd-11f0-b747-a8934a9bae74',55,137,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e28a9-f6dd-11f0-b747-a8934a9bae74',55,139,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e29e3-f6dd-11f0-b747-a8934a9bae74',55,141,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e2b13-f6dd-11f0-b747-a8934a9bae74',55,143,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e2c72-f6dd-11f0-b747-a8934a9bae74',55,145,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e2d81-f6dd-11f0-b747-a8934a9bae74',55,146,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e2eb2-f6dd-11f0-b747-a8934a9bae74',57,147,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e2ffa-f6dd-11f0-b747-a8934a9bae74',57,149,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e313f-f6dd-11f0-b747-a8934a9bae74',57,150,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e3263-f6dd-11f0-b747-a8934a9bae74',59,151,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e338c-f6dd-11f0-b747-a8934a9bae74',59,153,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e34b6-f6dd-11f0-b747-a8934a9bae74',59,155,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e35e3-f6dd-11f0-b747-a8934a9bae74',59,157,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e3727-f6dd-11f0-b747-a8934a9bae74',59,159,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e38ee-f6dd-11f0-b747-a8934a9bae74',59,161,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e3a73-f6dd-11f0-b747-a8934a9bae74',59,162,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e3b85-f6dd-11f0-b747-a8934a9bae74',59,163,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e3c93-f6dd-11f0-b747-a8934a9bae74',61,164,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e3dac-f6dd-11f0-b747-a8934a9bae74',63,165,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e3eda-f6dd-11f0-b747-a8934a9bae74',63,167,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e401d-f6dd-11f0-b747-a8934a9bae74',63,169,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e4142-f6dd-11f0-b747-a8934a9bae74',70,170,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e4250-f6dd-11f0-b747-a8934a9bae74',70,171,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e435b-f6dd-11f0-b747-a8934a9bae74',70,172,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e446b-f6dd-11f0-b747-a8934a9bae74',70,173,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e45a7-f6dd-11f0-b747-a8934a9bae74',72,175,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e470f-f6dd-11f0-b747-a8934a9bae74',72,176,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1e485e-f6dd-11f0-b747-a8934a9bae74',74,178,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1f3486-f6dd-11f0-b747-a8934a9bae74',74,179,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1f383f-f6dd-11f0-b747-a8934a9bae74',74,180,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1f3a12-f6dd-11f0-b747-a8934a9bae74',74,181,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1f3ba2-f6dd-11f0-b747-a8934a9bae74',74,182,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1f3d4e-f6dd-11f0-b747-a8934a9bae74',80,184,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1f3f15-f6dd-11f0-b747-a8934a9bae74',80,186,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1f4090-f6dd-11f0-b747-a8934a9bae74',80,187,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1f4208-f6dd-11f0-b747-a8934a9bae74',80,188,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce1f437e-f6dd-11f0-b747-a8934a9bae74',80,190,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce207de1-f6dd-11f0-b747-a8934a9bae74',83,192,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce207ff7-f6dd-11f0-b747-a8934a9bae74',83,193,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2080f7-f6dd-11f0-b747-a8934a9bae74',83,194,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2081da-f6dd-11f0-b747-a8934a9bae74',83,195,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce208356-f6dd-11f0-b747-a8934a9bae74',83,196,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20848c-f6dd-11f0-b747-a8934a9bae74',87,197,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce208588-f6dd-11f0-b747-a8934a9bae74',87,198,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20865d-f6dd-11f0-b747-a8934a9bae74',87,199,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce208752-f6dd-11f0-b747-a8934a9bae74',89,201,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce208871-f6dd-11f0-b747-a8934a9bae74',89,203,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20b630-f6dd-11f0-b747-a8934a9bae74',93,204,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20b82b-f6dd-11f0-b747-a8934a9bae74',93,205,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20b912-f6dd-11f0-b747-a8934a9bae74',93,206,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20ba24-f6dd-11f0-b747-a8934a9bae74',93,207,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20bb2e-f6dd-11f0-b747-a8934a9bae74',99,209,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20bc08-f6dd-11f0-b747-a8934a9bae74',99,210,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20bcda-f6dd-11f0-b747-a8934a9bae74',101,211,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20bdc5-f6dd-11f0-b747-a8934a9bae74',101,213,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20be95-f6dd-11f0-b747-a8934a9bae74',101,214,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20bf63-f6dd-11f0-b747-a8934a9bae74',105,215,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20c02e-f6dd-11f0-b747-a8934a9bae74',105,216,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20c10b-f6dd-11f0-b747-a8934a9bae74',105,217,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20c1db-f6dd-11f0-b747-a8934a9bae74',107,218,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20c2be-f6dd-11f0-b747-a8934a9bae74',107,220,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20c39b-f6dd-11f0-b747-a8934a9bae74',112,221,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20c47c-f6dd-11f0-b747-a8934a9bae74',112,223,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20c564-f6dd-11f0-b747-a8934a9bae74',115,225,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20c630-f6dd-11f0-b747-a8934a9bae74',115,226,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20c737-f6dd-11f0-b747-a8934a9bae74',118,227,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20c830-f6dd-11f0-b747-a8934a9bae74',118,229,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20c8ff-f6dd-11f0-b747-a8934a9bae74',118,230,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20c9ce-f6dd-11f0-b747-a8934a9bae74',120,231,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20ca9b-f6dd-11f0-b747-a8934a9bae74',120,232,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20cb64-f6dd-11f0-b747-a8934a9bae74',120,233,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20cc31-f6dd-11f0-b747-a8934a9bae74',122,234,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20cd15-f6dd-11f0-b747-a8934a9bae74',122,235,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20cde6-f6dd-11f0-b747-a8934a9bae74',124,236,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20ceb2-f6dd-11f0-b747-a8934a9bae74',124,237,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20cf8a-f6dd-11f0-b747-a8934a9bae74',128,238,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20d098-f6dd-11f0-b747-a8934a9bae74',132,239,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20d1fe-f6dd-11f0-b747-a8934a9bae74',136,240,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20d368-f6dd-11f0-b747-a8934a9bae74',136,242,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20d49c-f6dd-11f0-b747-a8934a9bae74',138,243,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20d5ce-f6dd-11f0-b747-a8934a9bae74',138,244,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20d6ed-f6dd-11f0-b747-a8934a9bae74',138,245,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20d88d-f6dd-11f0-b747-a8934a9bae74',140,246,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20da88-f6dd-11f0-b747-a8934a9bae74',140,247,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20dbd7-f6dd-11f0-b747-a8934a9bae74',140,248,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20dcfe-f6dd-11f0-b747-a8934a9bae74',142,249,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20de15-f6dd-11f0-b747-a8934a9bae74',142,250,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20e097-f6dd-11f0-b747-a8934a9bae74',142,252,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20e1ec-f6dd-11f0-b747-a8934a9bae74',144,253,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20e30b-f6dd-11f0-b747-a8934a9bae74',144,254,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20e427-f6dd-11f0-b747-a8934a9bae74',144,255,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20e55b-f6dd-11f0-b747-a8934a9bae74',148,256,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20e680-f6dd-11f0-b747-a8934a9bae74',148,257,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20e7c4-f6dd-11f0-b747-a8934a9bae74',152,258,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20e907-f6dd-11f0-b747-a8934a9bae74',152,260,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20ea41-f6dd-11f0-b747-a8934a9bae74',152,262,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20eb7c-f6dd-11f0-b747-a8934a9bae74',154,263,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20ec84-f6dd-11f0-b747-a8934a9bae74',154,265,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20edd5-f6dd-11f0-b747-a8934a9bae74',154,267,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20efdd-f6dd-11f0-b747-a8934a9bae74',156,268,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20f204-f6dd-11f0-b747-a8934a9bae74',156,270,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20f359-f6dd-11f0-b747-a8934a9bae74',158,271,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20f432-f6dd-11f0-b747-a8934a9bae74',158,272,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20f504-f6dd-11f0-b747-a8934a9bae74',160,273,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20f5d8-f6dd-11f0-b747-a8934a9bae74',160,274,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20f6a6-f6dd-11f0-b747-a8934a9bae74',166,275,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20f77b-f6dd-11f0-b747-a8934a9bae74',166,276,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20f84a-f6dd-11f0-b747-a8934a9bae74',166,277,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20f92e-f6dd-11f0-b747-a8934a9bae74',168,278,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20fa02-f6dd-11f0-b747-a8934a9bae74',168,279,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20fad1-f6dd-11f0-b747-a8934a9bae74',174,280,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20fba0-f6dd-11f0-b747-a8934a9bae74',174,281,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20fc70-f6dd-11f0-b747-a8934a9bae74',174,282,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20fd3e-f6dd-11f0-b747-a8934a9bae74',177,283,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20fe0c-f6dd-11f0-b747-a8934a9bae74',177,284,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20fed9-f6dd-11f0-b747-a8934a9bae74',183,285,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce20ffaa-f6dd-11f0-b747-a8934a9bae74',183,286,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce210079-f6dd-11f0-b747-a8934a9bae74',185,287,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce210161-f6dd-11f0-b747-a8934a9bae74',185,289,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce210233-f6dd-11f0-b747-a8934a9bae74',189,290,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce21030a-f6dd-11f0-b747-a8934a9bae74',189,291,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2103da-f6dd-11f0-b747-a8934a9bae74',191,292,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2104aa-f6dd-11f0-b747-a8934a9bae74',191,293,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce21057d-f6dd-11f0-b747-a8934a9bae74',191,294,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce21536d-f6dd-11f0-b747-a8934a9bae74',208,295,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce21562b-f6dd-11f0-b747-a8934a9bae74',219,296,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2157ba-f6dd-11f0-b747-a8934a9bae74',219,297,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce21593b-f6dd-11f0-b747-a8934a9bae74',222,298,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce215ab4-f6dd-11f0-b747-a8934a9bae74',259,299,'LQH_ME_CON',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce21ce03-f6dd-11f0-b747-a8934a9bae74',1,2,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce21e4df-f6dd-11f0-b747-a8934a9bae74',184,185,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce21e837-f6dd-11f0-b747-a8934a9bae74',188,189,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce21ea10-f6dd-11f0-b747-a8934a9bae74',190,191,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce21ec7c-f6dd-11f0-b747-a8934a9bae74',199,200,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce21ee3c-f6dd-11f0-b747-a8934a9bae74',201,202,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce21f04b-f6dd-11f0-b747-a8934a9bae74',207,208,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce21f24c-f6dd-11f0-b747-a8934a9bae74',211,212,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce21f480-f6dd-11f0-b747-a8934a9bae74',218,219,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2254ca-f6dd-11f0-b747-a8934a9bae74',221,222,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce225971-f6dd-11f0-b747-a8934a9bae74',223,224,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce22609e-f6dd-11f0-b747-a8934a9bae74',227,228,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce22654a-f6dd-11f0-b747-a8934a9bae74',240,241,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce226861-f6dd-11f0-b747-a8934a9bae74',250,251,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2269fe-f6dd-11f0-b747-a8934a9bae74',258,259,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce226c45-f6dd-11f0-b747-a8934a9bae74',260,261,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce226e66-f6dd-11f0-b747-a8934a9bae74',263,264,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce22701d-f6dd-11f0-b747-a8934a9bae74',265,266,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2271c1-f6dd-11f0-b747-a8934a9bae74',268,269,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce22fbe1-f6dd-11f0-b747-a8934a9bae74',6,7,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce22fd6e-f6dd-11f0-b747-a8934a9bae74',6,8,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce22fe58-f6dd-11f0-b747-a8934a9bae74',13,12,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce22fee5-f6dd-11f0-b747-a8934a9bae74',13,14,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce22ff71-f6dd-11f0-b747-a8934a9bae74',15,16,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce22ffe0-f6dd-11f0-b747-a8934a9bae74',18,17,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce23006a-f6dd-11f0-b747-a8934a9bae74',18,19,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2300e9-f6dd-11f0-b747-a8934a9bae74',21,20,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce23016f-f6dd-11f0-b747-a8934a9bae74',21,22,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce23020e-f6dd-11f0-b747-a8934a9bae74',23,24,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2302b9-f6dd-11f0-b747-a8934a9bae74',26,27,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce230341-f6dd-11f0-b747-a8934a9bae74',28,29,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce23043c-f6dd-11f0-b747-a8934a9bae74',34,35,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2304cb-f6dd-11f0-b747-a8934a9bae74',36,37,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce230550-f6dd-11f0-b747-a8934a9bae74',38,39,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2306bb-f6dd-11f0-b747-a8934a9bae74',46,47,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce230750-f6dd-11f0-b747-a8934a9bae74',50,49,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2307d7-f6dd-11f0-b747-a8934a9bae74',50,51,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce23085e-f6dd-11f0-b747-a8934a9bae74',52,53,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2308e7-f6dd-11f0-b747-a8934a9bae74',56,55,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce230975-f6dd-11f0-b747-a8934a9bae74',56,57,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2309f6-f6dd-11f0-b747-a8934a9bae74',58,59,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce230a7c-f6dd-11f0-b747-a8934a9bae74',60,61,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce230b03-f6dd-11f0-b747-a8934a9bae74',62,63,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce230c1a-f6dd-11f0-b747-a8934a9bae74',69,70,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce230ca6-f6dd-11f0-b747-a8934a9bae74',71,72,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce230d30-f6dd-11f0-b747-a8934a9bae74',73,74,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce230e32-f6dd-11f0-b747-a8934a9bae74',79,80,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce230ed7-f6dd-11f0-b747-a8934a9bae74',82,83,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce230f9f-f6dd-11f0-b747-a8934a9bae74',86,87,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce231024-f6dd-11f0-b747-a8934a9bae74',88,89,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2310e6-f6dd-11f0-b747-a8934a9bae74',92,93,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2311eb-f6dd-11f0-b747-a8934a9bae74',98,99,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce23127b-f6dd-11f0-b747-a8934a9bae74',100,101,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce23134d-f6dd-11f0-b747-a8934a9bae74',104,105,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2313d8-f6dd-11f0-b747-a8934a9bae74',106,107,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2314e1-f6dd-11f0-b747-a8934a9bae74',111,112,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce23157b-f6dd-11f0-b747-a8934a9bae74',114,115,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce231625-f6dd-11f0-b747-a8934a9bae74',117,118,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2316b1-f6dd-11f0-b747-a8934a9bae74',119,120,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce231742-f6dd-11f0-b747-a8934a9bae74',121,122,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2317d7-f6dd-11f0-b747-a8934a9bae74',123,124,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2318a1-f6dd-11f0-b747-a8934a9bae74',127,128,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce23197a-f6dd-11f0-b747-a8934a9bae74',131,132,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce231a48-f6dd-11f0-b747-a8934a9bae74',135,136,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce231b82-f6dd-11f0-b747-a8934a9bae74',137,138,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce231c08-f6dd-11f0-b747-a8934a9bae74',139,140,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce231c82-f6dd-11f0-b747-a8934a9bae74',141,142,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce231d0b-f6dd-11f0-b747-a8934a9bae74',143,144,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce231dd0-f6dd-11f0-b747-a8934a9bae74',147,148,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce231e94-f6dd-11f0-b747-a8934a9bae74',151,152,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce231f21-f6dd-11f0-b747-a8934a9bae74',153,154,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce231fb7-f6dd-11f0-b747-a8934a9bae74',155,156,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce23203e-f6dd-11f0-b747-a8934a9bae74',157,158,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2320ce-f6dd-11f0-b747-a8934a9bae74',159,160,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2321db-f6dd-11f0-b747-a8934a9bae74',165,166,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce232270-f6dd-11f0-b747-a8934a9bae74',167,168,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce232365-f6dd-11f0-b747-a8934a9bae74',173,174,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce23240e-f6dd-11f0-b747-a8934a9bae74',176,177,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce232512-f6dd-11f0-b747-a8934a9bae74',182,183,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce233a93-f6dd-11f0-b747-a8934a9bae74',286,288,'LQH_VO_CHONG',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce248f81-f6dd-11f0-b747-a8934a9bae74',3,4,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24908c-f6dd-11f0-b747-a8934a9bae74',3,5,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2491b5-f6dd-11f0-b747-a8934a9bae74',4,5,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2493b5-f6dd-11f0-b747-a8934a9bae74',13,15,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce249408-f6dd-11f0-b747-a8934a9bae74',13,18,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce249451-f6dd-11f0-b747-a8934a9bae74',13,21,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce249565-f6dd-11f0-b747-a8934a9bae74',15,18,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2495b5-f6dd-11f0-b747-a8934a9bae74',15,21,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce249717-f6dd-11f0-b747-a8934a9bae74',18,21,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24995b-f6dd-11f0-b747-a8934a9bae74',25,26,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2499ac-f6dd-11f0-b747-a8934a9bae74',25,28,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2499f8-f6dd-11f0-b747-a8934a9bae74',25,30,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce249a44-f6dd-11f0-b747-a8934a9bae74',25,31,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce249a90-f6dd-11f0-b747-a8934a9bae74',25,32,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce249adf-f6dd-11f0-b747-a8934a9bae74',25,33,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce249b98-f6dd-11f0-b747-a8934a9bae74',26,28,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce249be3-f6dd-11f0-b747-a8934a9bae74',26,30,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce249c29-f6dd-11f0-b747-a8934a9bae74',26,31,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce249c96-f6dd-11f0-b747-a8934a9bae74',26,32,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce249cce-f6dd-11f0-b747-a8934a9bae74',26,33,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce249d99-f6dd-11f0-b747-a8934a9bae74',28,30,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce249e1b-f6dd-11f0-b747-a8934a9bae74',28,31,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce249e52-f6dd-11f0-b747-a8934a9bae74',28,32,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce249e84-f6dd-11f0-b747-a8934a9bae74',28,33,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce249f93-f6dd-11f0-b747-a8934a9bae74',30,31,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce249fd1-f6dd-11f0-b747-a8934a9bae74',30,32,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24a004-f6dd-11f0-b747-a8934a9bae74',30,33,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24a0c4-f6dd-11f0-b747-a8934a9bae74',34,36,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24a352-f6dd-11f0-b747-a8934a9bae74',46,48,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24a398-f6dd-11f0-b747-a8934a9bae74',46,50,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24a3d7-f6dd-11f0-b747-a8934a9bae74',46,52,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24a421-f6dd-11f0-b747-a8934a9bae74',46,54,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24a537-f6dd-11f0-b747-a8934a9bae74',50,52,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24a572-f6dd-11f0-b747-a8934a9bae74',50,54,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24a66d-f6dd-11f0-b747-a8934a9bae74',52,54,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24a7db-f6dd-11f0-b747-a8934a9bae74',56,58,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24a822-f6dd-11f0-b747-a8934a9bae74',56,60,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24a866-f6dd-11f0-b747-a8934a9bae74',56,62,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24a8a6-f6dd-11f0-b747-a8934a9bae74',56,64,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24a8e7-f6dd-11f0-b747-a8934a9bae74',56,65,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24a920-f6dd-11f0-b747-a8934a9bae74',56,66,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24a959-f6dd-11f0-b747-a8934a9bae74',56,67,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24a990-f6dd-11f0-b747-a8934a9bae74',56,68,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24aa55-f6dd-11f0-b747-a8934a9bae74',58,60,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24aa98-f6dd-11f0-b747-a8934a9bae74',58,62,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24aad7-f6dd-11f0-b747-a8934a9bae74',58,64,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ab12-f6dd-11f0-b747-a8934a9bae74',58,65,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ab49-f6dd-11f0-b747-a8934a9bae74',58,66,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24abc5-f6dd-11f0-b747-a8934a9bae74',58,67,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ac01-f6dd-11f0-b747-a8934a9bae74',58,68,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24acbe-f6dd-11f0-b747-a8934a9bae74',60,62,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24acf9-f6dd-11f0-b747-a8934a9bae74',60,64,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ad32-f6dd-11f0-b747-a8934a9bae74',60,65,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ad6d-f6dd-11f0-b747-a8934a9bae74',60,66,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ada8-f6dd-11f0-b747-a8934a9bae74',60,67,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24addf-f6dd-11f0-b747-a8934a9bae74',60,68,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24aebd-f6dd-11f0-b747-a8934a9bae74',62,64,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24aeea-f6dd-11f0-b747-a8934a9bae74',62,65,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24af1a-f6dd-11f0-b747-a8934a9bae74',62,66,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24af44-f6dd-11f0-b747-a8934a9bae74',62,67,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24af6e-f6dd-11f0-b747-a8934a9bae74',62,68,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b040-f6dd-11f0-b747-a8934a9bae74',69,71,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b10f-f6dd-11f0-b747-a8934a9bae74',73,75,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b13c-f6dd-11f0-b747-a8934a9bae74',73,76,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b16a-f6dd-11f0-b747-a8934a9bae74',73,77,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b235-f6dd-11f0-b747-a8934a9bae74',79,81,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b261-f6dd-11f0-b747-a8934a9bae74',79,82,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b28c-f6dd-11f0-b747-a8934a9bae74',79,84,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b2b7-f6dd-11f0-b747-a8934a9bae74',79,85,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b2e1-f6dd-11f0-b747-a8934a9bae74',79,86,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b30f-f6dd-11f0-b747-a8934a9bae74',79,88,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b3b5-f6dd-11f0-b747-a8934a9bae74',82,84,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b3df-f6dd-11f0-b747-a8934a9bae74',82,85,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b409-f6dd-11f0-b747-a8934a9bae74',82,86,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b44e-f6dd-11f0-b747-a8934a9bae74',82,88,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b526-f6dd-11f0-b747-a8934a9bae74',86,88,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b668-f6dd-11f0-b747-a8934a9bae74',92,94,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b694-f6dd-11f0-b747-a8934a9bae74',92,95,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b6c1-f6dd-11f0-b747-a8934a9bae74',92,96,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b784-f6dd-11f0-b747-a8934a9bae74',98,100,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b7b0-f6dd-11f0-b747-a8934a9bae74',98,102,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b7db-f6dd-11f0-b747-a8934a9bae74',98,103,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b82f-f6dd-11f0-b747-a8934a9bae74',98,104,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b8bb-f6dd-11f0-b747-a8934a9bae74',100,102,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b8e5-f6dd-11f0-b747-a8934a9bae74',100,103,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b922-f6dd-11f0-b747-a8934a9bae74',100,104,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b9b5-f6dd-11f0-b747-a8934a9bae74',102,103,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24b9f2-f6dd-11f0-b747-a8934a9bae74',102,104,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ba92-f6dd-11f0-b747-a8934a9bae74',103,104,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24bb92-f6dd-11f0-b747-a8934a9bae74',106,108,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24bbbf-f6dd-11f0-b747-a8934a9bae74',106,109,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24bbed-f6dd-11f0-b747-a8934a9bae74',106,110,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24bc1c-f6dd-11f0-b747-a8934a9bae74',106,111,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24bc4a-f6dd-11f0-b747-a8934a9bae74',106,113,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24bc79-f6dd-11f0-b747-a8934a9bae74',106,114,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24bd0d-f6dd-11f0-b747-a8934a9bae74',108,109,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24bd36-f6dd-11f0-b747-a8934a9bae74',108,110,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24bd61-f6dd-11f0-b747-a8934a9bae74',108,111,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24bd8a-f6dd-11f0-b747-a8934a9bae74',108,113,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24bdb5-f6dd-11f0-b747-a8934a9bae74',108,114,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24be61-f6dd-11f0-b747-a8934a9bae74',111,113,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24be9d-f6dd-11f0-b747-a8934a9bae74',111,114,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24bfcf-f6dd-11f0-b747-a8934a9bae74',117,119,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c257-f6dd-11f0-b747-a8934a9bae74',121,123,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c2a1-f6dd-11f0-b747-a8934a9bae74',121,125,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c334-f6dd-11f0-b747-a8934a9bae74',123,125,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c47d-f6dd-11f0-b747-a8934a9bae74',131,133,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c567-f6dd-11f0-b747-a8934a9bae74',135,137,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c595-f6dd-11f0-b747-a8934a9bae74',135,139,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c5c3-f6dd-11f0-b747-a8934a9bae74',135,141,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c5ed-f6dd-11f0-b747-a8934a9bae74',135,143,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c61a-f6dd-11f0-b747-a8934a9bae74',135,145,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c647-f6dd-11f0-b747-a8934a9bae74',135,146,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c6d3-f6dd-11f0-b747-a8934a9bae74',137,139,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c6fd-f6dd-11f0-b747-a8934a9bae74',137,141,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c726-f6dd-11f0-b747-a8934a9bae74',137,143,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c74e-f6dd-11f0-b747-a8934a9bae74',137,145,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c779-f6dd-11f0-b747-a8934a9bae74',137,146,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c80d-f6dd-11f0-b747-a8934a9bae74',139,141,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c837-f6dd-11f0-b747-a8934a9bae74',139,143,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c85f-f6dd-11f0-b747-a8934a9bae74',139,145,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c888-f6dd-11f0-b747-a8934a9bae74',139,146,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c925-f6dd-11f0-b747-a8934a9bae74',141,143,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c951-f6dd-11f0-b747-a8934a9bae74',141,145,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24c97b-f6dd-11f0-b747-a8934a9bae74',141,146,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ca22-f6dd-11f0-b747-a8934a9bae74',143,145,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ca55-f6dd-11f0-b747-a8934a9bae74',143,146,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24cb3a-f6dd-11f0-b747-a8934a9bae74',147,149,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24cba6-f6dd-11f0-b747-a8934a9bae74',147,150,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24cc86-f6dd-11f0-b747-a8934a9bae74',151,153,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ccb6-f6dd-11f0-b747-a8934a9bae74',151,155,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24cce2-f6dd-11f0-b747-a8934a9bae74',151,157,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24cd0d-f6dd-11f0-b747-a8934a9bae74',151,159,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24cd3a-f6dd-11f0-b747-a8934a9bae74',151,161,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24cd65-f6dd-11f0-b747-a8934a9bae74',151,162,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24cd8f-f6dd-11f0-b747-a8934a9bae74',151,163,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ce12-f6dd-11f0-b747-a8934a9bae74',153,155,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ce3c-f6dd-11f0-b747-a8934a9bae74',153,157,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ce65-f6dd-11f0-b747-a8934a9bae74',153,159,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ce8e-f6dd-11f0-b747-a8934a9bae74',153,161,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ceb7-f6dd-11f0-b747-a8934a9bae74',153,162,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24cf4d-f6dd-11f0-b747-a8934a9bae74',153,163,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24cfdc-f6dd-11f0-b747-a8934a9bae74',155,157,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d008-f6dd-11f0-b747-a8934a9bae74',155,159,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d031-f6dd-11f0-b747-a8934a9bae74',155,161,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d059-f6dd-11f0-b747-a8934a9bae74',155,162,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d083-f6dd-11f0-b747-a8934a9bae74',155,163,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d11f-f6dd-11f0-b747-a8934a9bae74',157,159,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d148-f6dd-11f0-b747-a8934a9bae74',157,161,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d171-f6dd-11f0-b747-a8934a9bae74',157,162,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d19a-f6dd-11f0-b747-a8934a9bae74',157,163,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d23a-f6dd-11f0-b747-a8934a9bae74',159,161,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d263-f6dd-11f0-b747-a8934a9bae74',159,162,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d28b-f6dd-11f0-b747-a8934a9bae74',159,163,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d341-f6dd-11f0-b747-a8934a9bae74',165,167,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d380-f6dd-11f0-b747-a8934a9bae74',165,169,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d408-f6dd-11f0-b747-a8934a9bae74',167,169,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d7f3-f6dd-11f0-b747-a8934a9bae74',184,186,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d842-f6dd-11f0-b747-a8934a9bae74',184,187,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d872-f6dd-11f0-b747-a8934a9bae74',184,188,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d89d-f6dd-11f0-b747-a8934a9bae74',184,190,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24d955-f6dd-11f0-b747-a8934a9bae74',188,190,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24da8b-f6dd-11f0-b747-a8934a9bae74',197,198,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24dab8-f6dd-11f0-b747-a8934a9bae74',197,199,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24db8d-f6dd-11f0-b747-a8934a9bae74',201,203,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24dddb-f6dd-11f0-b747-a8934a9bae74',211,213,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24de0e-f6dd-11f0-b747-a8934a9bae74',211,214,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24dea5-f6dd-11f0-b747-a8934a9bae74',213,214,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24df90-f6dd-11f0-b747-a8934a9bae74',218,220,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e01d-f6dd-11f0-b747-a8934a9bae74',221,223,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e0ed-f6dd-11f0-b747-a8934a9bae74',225,226,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e165-f6dd-11f0-b747-a8934a9bae74',227,229,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e190-f6dd-11f0-b747-a8934a9bae74',227,230,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e299-f6dd-11f0-b747-a8934a9bae74',234,235,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e346-f6dd-11f0-b747-a8934a9bae74',236,237,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e468-f6dd-11f0-b747-a8934a9bae74',240,242,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e4ee-f6dd-11f0-b747-a8934a9bae74',243,244,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e51b-f6dd-11f0-b747-a8934a9bae74',243,245,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e587-f6dd-11f0-b747-a8934a9bae74',244,245,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e63d-f6dd-11f0-b747-a8934a9bae74',246,247,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e66a-f6dd-11f0-b747-a8934a9bae74',246,248,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e6d7-f6dd-11f0-b747-a8934a9bae74',247,248,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e78a-f6dd-11f0-b747-a8934a9bae74',250,252,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e882-f6dd-11f0-b747-a8934a9bae74',253,254,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e8ad-f6dd-11f0-b747-a8934a9bae74',253,255,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e925-f6dd-11f0-b747-a8934a9bae74',254,255,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e9c5-f6dd-11f0-b747-a8934a9bae74',258,260,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24e9f1-f6dd-11f0-b747-a8934a9bae74',258,262,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ea72-f6dd-11f0-b747-a8934a9bae74',260,262,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24eafa-f6dd-11f0-b747-a8934a9bae74',263,265,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24eb28-f6dd-11f0-b747-a8934a9bae74',263,267,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24eba3-f6dd-11f0-b747-a8934a9bae74',265,267,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ec68-f6dd-11f0-b747-a8934a9bae74',268,270,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ed7b-f6dd-11f0-b747-a8934a9bae74',273,274,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ee26-f6dd-11f0-b747-a8934a9bae74',275,276,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ee54-f6dd-11f0-b747-a8934a9bae74',275,277,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24eec2-f6dd-11f0-b747-a8934a9bae74',276,277,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24ef36-f6dd-11f0-b747-a8934a9bae74',278,279,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24efca-f6dd-11f0-b747-a8934a9bae74',281,282,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce24f0d9-f6dd-11f0-b747-a8934a9bae74',285,286,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce252a02-f6dd-11f0-b747-a8934a9bae74',287,289,'LQH_ANH_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2811e1-f6dd-11f0-b747-a8934a9bae74',9,10,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28126b-f6dd-11f0-b747-a8934a9bae74',9,11,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2812c4-f6dd-11f0-b747-a8934a9bae74',9,13,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce281314-f6dd-11f0-b747-a8934a9bae74',9,15,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce281360-f6dd-11f0-b747-a8934a9bae74',9,18,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2813ad-f6dd-11f0-b747-a8934a9bae74',9,21,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce281469-f6dd-11f0-b747-a8934a9bae74',10,11,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2814b4-f6dd-11f0-b747-a8934a9bae74',10,13,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2814fd-f6dd-11f0-b747-a8934a9bae74',10,15,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce281544-f6dd-11f0-b747-a8934a9bae74',10,18,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce281589-f6dd-11f0-b747-a8934a9bae74',10,21,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce281648-f6dd-11f0-b747-a8934a9bae74',11,13,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce281697-f6dd-11f0-b747-a8934a9bae74',11,15,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2816e0-f6dd-11f0-b747-a8934a9bae74',11,18,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce281727-f6dd-11f0-b747-a8934a9bae74',11,21,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2819ca-f6dd-11f0-b747-a8934a9bae74',31,32,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce281a16-f6dd-11f0-b747-a8934a9bae74',31,33,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce281b01-f6dd-11f0-b747-a8934a9bae74',32,33,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce281d10-f6dd-11f0-b747-a8934a9bae74',40,41,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce281d67-f6dd-11f0-b747-a8934a9bae74',40,42,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce281db1-f6dd-11f0-b747-a8934a9bae74',40,43,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce281e66-f6dd-11f0-b747-a8934a9bae74',41,42,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce281eb7-f6dd-11f0-b747-a8934a9bae74',41,43,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce281f87-f6dd-11f0-b747-a8934a9bae74',42,43,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28204f-f6dd-11f0-b747-a8934a9bae74',44,45,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2820a1-f6dd-11f0-b747-a8934a9bae74',44,46,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2820f0-f6dd-11f0-b747-a8934a9bae74',44,48,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28213d-f6dd-11f0-b747-a8934a9bae74',44,50,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28218b-f6dd-11f0-b747-a8934a9bae74',44,52,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2821db-f6dd-11f0-b747-a8934a9bae74',44,54,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2822a8-f6dd-11f0-b747-a8934a9bae74',45,46,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2822e4-f6dd-11f0-b747-a8934a9bae74',45,48,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28231d-f6dd-11f0-b747-a8934a9bae74',45,50,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce282358-f6dd-11f0-b747-a8934a9bae74',45,52,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce282398-f6dd-11f0-b747-a8934a9bae74',45,54,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2824a8-f6dd-11f0-b747-a8934a9bae74',48,50,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2824ea-f6dd-11f0-b747-a8934a9bae74',48,52,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce282527-f6dd-11f0-b747-a8934a9bae74',48,54,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28279f-f6dd-11f0-b747-a8934a9bae74',64,65,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2827e7-f6dd-11f0-b747-a8934a9bae74',64,66,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce282825-f6dd-11f0-b747-a8934a9bae74',64,67,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce282866-f6dd-11f0-b747-a8934a9bae74',64,68,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce282957-f6dd-11f0-b747-a8934a9bae74',65,66,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce282997-f6dd-11f0-b747-a8934a9bae74',65,67,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2829d5-f6dd-11f0-b747-a8934a9bae74',65,68,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce282b9d-f6dd-11f0-b747-a8934a9bae74',66,67,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce282bee-f6dd-11f0-b747-a8934a9bae74',66,68,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce282d0e-f6dd-11f0-b747-a8934a9bae74',67,68,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce282f4f-f6dd-11f0-b747-a8934a9bae74',75,76,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce282f98-f6dd-11f0-b747-a8934a9bae74',75,77,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283055-f6dd-11f0-b747-a8934a9bae74',76,77,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283179-f6dd-11f0-b747-a8934a9bae74',78,79,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2831bd-f6dd-11f0-b747-a8934a9bae74',78,81,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2831fc-f6dd-11f0-b747-a8934a9bae74',78,82,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28323e-f6dd-11f0-b747-a8934a9bae74',78,84,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28327d-f6dd-11f0-b747-a8934a9bae74',78,85,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2832ba-f6dd-11f0-b747-a8934a9bae74',78,86,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2832fa-f6dd-11f0-b747-a8934a9bae74',78,88,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28348c-f6dd-11f0-b747-a8934a9bae74',81,82,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2834d2-f6dd-11f0-b747-a8934a9bae74',81,84,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28350a-f6dd-11f0-b747-a8934a9bae74',81,85,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28353d-f6dd-11f0-b747-a8934a9bae74',81,86,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283573-f6dd-11f0-b747-a8934a9bae74',81,88,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283684-f6dd-11f0-b747-a8934a9bae74',84,85,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2836c5-f6dd-11f0-b747-a8934a9bae74',84,86,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283701-f6dd-11f0-b747-a8934a9bae74',84,88,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2837fb-f6dd-11f0-b747-a8934a9bae74',85,86,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283840-f6dd-11f0-b747-a8934a9bae74',85,88,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283947-f6dd-11f0-b747-a8934a9bae74',90,91,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28398e-f6dd-11f0-b747-a8934a9bae74',90,92,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2839cb-f6dd-11f0-b747-a8934a9bae74',90,94,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283a0b-f6dd-11f0-b747-a8934a9bae74',90,95,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283a4e-f6dd-11f0-b747-a8934a9bae74',90,96,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283afd-f6dd-11f0-b747-a8934a9bae74',91,92,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283b3e-f6dd-11f0-b747-a8934a9bae74',91,94,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283b7c-f6dd-11f0-b747-a8934a9bae74',91,95,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283bb7-f6dd-11f0-b747-a8934a9bae74',91,96,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283cc2-f6dd-11f0-b747-a8934a9bae74',94,95,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283d06-f6dd-11f0-b747-a8934a9bae74',94,96,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283de9-f6dd-11f0-b747-a8934a9bae74',95,96,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283f3b-f6dd-11f0-b747-a8934a9bae74',97,98,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283f88-f6dd-11f0-b747-a8934a9bae74',97,100,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce283fc9-f6dd-11f0-b747-a8934a9bae74',97,102,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce284007-f6dd-11f0-b747-a8934a9bae74',97,103,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28407e-f6dd-11f0-b747-a8934a9bae74',97,104,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce284273-f6dd-11f0-b747-a8934a9bae74',109,110,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2842bb-f6dd-11f0-b747-a8934a9bae74',109,111,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2842ff-f6dd-11f0-b747-a8934a9bae74',109,113,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28433e-f6dd-11f0-b747-a8934a9bae74',109,114,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce284411-f6dd-11f0-b747-a8934a9bae74',110,111,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce284451-f6dd-11f0-b747-a8934a9bae74',110,113,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28448c-f6dd-11f0-b747-a8934a9bae74',110,114,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2845bd-f6dd-11f0-b747-a8934a9bae74',113,114,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2846a7-f6dd-11f0-b747-a8934a9bae74',116,117,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2846f1-f6dd-11f0-b747-a8934a9bae74',116,119,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2848fc-f6dd-11f0-b747-a8934a9bae74',126,127,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2849ee-f6dd-11f0-b747-a8934a9bae74',130,131,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce284a33-f6dd-11f0-b747-a8934a9bae74',130,133,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce284b23-f6dd-11f0-b747-a8934a9bae74',134,135,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce284b66-f6dd-11f0-b747-a8934a9bae74',134,137,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce284ba4-f6dd-11f0-b747-a8934a9bae74',134,139,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce284be9-f6dd-11f0-b747-a8934a9bae74',134,141,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce284c29-f6dd-11f0-b747-a8934a9bae74',134,143,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce284c66-f6dd-11f0-b747-a8934a9bae74',134,145,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce284ca4-f6dd-11f0-b747-a8934a9bae74',134,146,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce284eb3-f6dd-11f0-b747-a8934a9bae74',145,146,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce285076-f6dd-11f0-b747-a8934a9bae74',149,150,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28527e-f6dd-11f0-b747-a8934a9bae74',161,162,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2852c5-f6dd-11f0-b747-a8934a9bae74',161,163,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2853cd-f6dd-11f0-b747-a8934a9bae74',162,163,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28562b-f6dd-11f0-b747-a8934a9bae74',170,171,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28566f-f6dd-11f0-b747-a8934a9bae74',170,172,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2856ad-f6dd-11f0-b747-a8934a9bae74',170,173,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce285756-f6dd-11f0-b747-a8934a9bae74',171,172,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce285796-f6dd-11f0-b747-a8934a9bae74',171,173,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce285856-f6dd-11f0-b747-a8934a9bae74',172,173,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce285936-f6dd-11f0-b747-a8934a9bae74',175,176,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce285a1a-f6dd-11f0-b747-a8934a9bae74',178,179,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce285a5c-f6dd-11f0-b747-a8934a9bae74',178,180,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce285a9f-f6dd-11f0-b747-a8934a9bae74',178,181,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce285adb-f6dd-11f0-b747-a8934a9bae74',178,182,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce285b8c-f6dd-11f0-b747-a8934a9bae74',179,180,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce285bcc-f6dd-11f0-b747-a8934a9bae74',179,181,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce285c06-f6dd-11f0-b747-a8934a9bae74',179,182,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce285cc7-f6dd-11f0-b747-a8934a9bae74',180,181,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce285d0a-f6dd-11f0-b747-a8934a9bae74',180,182,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce285dde-f6dd-11f0-b747-a8934a9bae74',181,182,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce285f08-f6dd-11f0-b747-a8934a9bae74',186,187,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce285f4c-f6dd-11f0-b747-a8934a9bae74',186,188,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce285f96-f6dd-11f0-b747-a8934a9bae74',186,190,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28605e-f6dd-11f0-b747-a8934a9bae74',187,188,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2860a1-f6dd-11f0-b747-a8934a9bae74',187,190,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2861b1-f6dd-11f0-b747-a8934a9bae74',192,193,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2861f8-f6dd-11f0-b747-a8934a9bae74',192,194,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce286237-f6dd-11f0-b747-a8934a9bae74',192,195,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce286276-f6dd-11f0-b747-a8934a9bae74',192,196,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce286326-f6dd-11f0-b747-a8934a9bae74',193,194,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce286367-f6dd-11f0-b747-a8934a9bae74',193,195,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2863a4-f6dd-11f0-b747-a8934a9bae74',193,196,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce286467-f6dd-11f0-b747-a8934a9bae74',194,195,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2864a9-f6dd-11f0-b747-a8934a9bae74',194,196,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28657a-f6dd-11f0-b747-a8934a9bae74',195,196,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2866e7-f6dd-11f0-b747-a8934a9bae74',198,199,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28685c-f6dd-11f0-b747-a8934a9bae74',204,205,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2868a0-f6dd-11f0-b747-a8934a9bae74',204,206,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2868e1-f6dd-11f0-b747-a8934a9bae74',204,207,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce286990-f6dd-11f0-b747-a8934a9bae74',205,206,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2869cf-f6dd-11f0-b747-a8934a9bae74',205,207,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce286a82-f6dd-11f0-b747-a8934a9bae74',206,207,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce286b6a-f6dd-11f0-b747-a8934a9bae74',209,210,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce286cfa-f6dd-11f0-b747-a8934a9bae74',215,216,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce286d41-f6dd-11f0-b747-a8934a9bae74',215,217,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce286dee-f6dd-11f0-b747-a8934a9bae74',216,217,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce287078-f6dd-11f0-b747-a8934a9bae74',229,230,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce287187-f6dd-11f0-b747-a8934a9bae74',231,232,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2871c2-f6dd-11f0-b747-a8934a9bae74',231,233,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce287265-f6dd-11f0-b747-a8934a9bae74',232,233,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce287523-f6dd-11f0-b747-a8934a9bae74',249,250,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce287572-f6dd-11f0-b747-a8934a9bae74',249,252,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce287723-f6dd-11f0-b747-a8934a9bae74',256,257,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce287a61-f6dd-11f0-b747-a8934a9bae74',271,272,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce287c36-f6dd-11f0-b747-a8934a9bae74',280,281,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce287c7c-f6dd-11f0-b747-a8934a9bae74',280,282,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce287d31-f6dd-11f0-b747-a8934a9bae74',283,284,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce287e44-f6dd-11f0-b747-a8934a9bae74',290,291,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce287ed4-f6dd-11f0-b747-a8934a9bae74',292,293,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce287f10-f6dd-11f0-b747-a8934a9bae74',292,294,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce287f96-f6dd-11f0-b747-a8934a9bae74',293,294,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce28803f-f6dd-11f0-b747-a8934a9bae74',296,297,'LQH_CHI_EM',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b5ca9-f6dd-11f0-b747-a8934a9bae74',1,6,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b63d9-f6dd-11f0-b747-a8934a9bae74',3,9,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b6581-f6dd-11f0-b747-a8934a9bae74',3,10,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b66eb-f6dd-11f0-b747-a8934a9bae74',3,11,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b685a-f6dd-11f0-b747-a8934a9bae74',3,13,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b6a01-f6dd-11f0-b747-a8934a9bae74',3,15,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b6ea8-f6dd-11f0-b747-a8934a9bae74',3,18,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b706d-f6dd-11f0-b747-a8934a9bae74',3,21,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b73c8-f6dd-11f0-b747-a8934a9bae74',3,23,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b762a-f6dd-11f0-b747-a8934a9bae74',6,25,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b779f-f6dd-11f0-b747-a8934a9bae74',6,26,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b792e-f6dd-11f0-b747-a8934a9bae74',6,28,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b7a86-f6dd-11f0-b747-a8934a9bae74',6,30,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b7b83-f6dd-11f0-b747-a8934a9bae74',6,31,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b7cb9-f6dd-11f0-b747-a8934a9bae74',6,32,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b7e37-f6dd-11f0-b747-a8934a9bae74',6,33,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b7f5d-f6dd-11f0-b747-a8934a9bae74',6,34,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b808d-f6dd-11f0-b747-a8934a9bae74',6,36,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b81c4-f6dd-11f0-b747-a8934a9bae74',6,38,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b841c-f6dd-11f0-b747-a8934a9bae74',6,40,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b8587-f6dd-11f0-b747-a8934a9bae74',6,41,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b8679-f6dd-11f0-b747-a8934a9bae74',6,42,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2b877e-f6dd-11f0-b747-a8934a9bae74',6,43,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bc5fa-f6dd-11f0-b747-a8934a9bae74',6,44,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bc783-f6dd-11f0-b747-a8934a9bae74',6,45,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bc885-f6dd-11f0-b747-a8934a9bae74',6,46,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bc9b1-f6dd-11f0-b747-a8934a9bae74',6,48,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bcabe-f6dd-11f0-b747-a8934a9bae74',6,50,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bcbbb-f6dd-11f0-b747-a8934a9bae74',6,52,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bcd02-f6dd-11f0-b747-a8934a9bae74',6,54,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bce54-f6dd-11f0-b747-a8934a9bae74',6,56,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bcf58-f6dd-11f0-b747-a8934a9bae74',6,58,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bd054-f6dd-11f0-b747-a8934a9bae74',6,60,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bd151-f6dd-11f0-b747-a8934a9bae74',6,62,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bd24b-f6dd-11f0-b747-a8934a9bae74',6,64,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bd3b7-f6dd-11f0-b747-a8934a9bae74',6,65,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bd4ad-f6dd-11f0-b747-a8934a9bae74',6,66,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bd59a-f6dd-11f0-b747-a8934a9bae74',6,67,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bd67f-f6dd-11f0-b747-a8934a9bae74',6,68,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bd767-f6dd-11f0-b747-a8934a9bae74',6,69,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bd860-f6dd-11f0-b747-a8934a9bae74',6,71,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bd98c-f6dd-11f0-b747-a8934a9bae74',6,73,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bda9d-f6dd-11f0-b747-a8934a9bae74',6,75,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bdb84-f6dd-11f0-b747-a8934a9bae74',6,76,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bdc78-f6dd-11f0-b747-a8934a9bae74',6,77,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bdd93-f6dd-11f0-b747-a8934a9bae74',13,78,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bde89-f6dd-11f0-b747-a8934a9bae74',13,79,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bdf8c-f6dd-11f0-b747-a8934a9bae74',13,81,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2be082-f6dd-11f0-b747-a8934a9bae74',13,82,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2be187-f6dd-11f0-b747-a8934a9bae74',13,84,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2be272-f6dd-11f0-b747-a8934a9bae74',13,85,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2be357-f6dd-11f0-b747-a8934a9bae74',13,86,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2be464-f6dd-11f0-b747-a8934a9bae74',13,88,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2be58f-f6dd-11f0-b747-a8934a9bae74',13,90,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2be676-f6dd-11f0-b747-a8934a9bae74',13,91,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2be762-f6dd-11f0-b747-a8934a9bae74',13,92,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2be85b-f6dd-11f0-b747-a8934a9bae74',13,94,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2be94c-f6dd-11f0-b747-a8934a9bae74',13,95,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2beb01-f6dd-11f0-b747-a8934a9bae74',13,96,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bec1c-f6dd-11f0-b747-a8934a9bae74',13,97,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bed05-f6dd-11f0-b747-a8934a9bae74',13,98,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bee09-f6dd-11f0-b747-a8934a9bae74',13,100,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bef08-f6dd-11f0-b747-a8934a9bae74',13,102,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bf00e-f6dd-11f0-b747-a8934a9bae74',13,103,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bf0f5-f6dd-11f0-b747-a8934a9bae74',13,104,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bf2c6-f6dd-11f0-b747-a8934a9bae74',13,106,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bf468-f6dd-11f0-b747-a8934a9bae74',13,108,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bf5df-f6dd-11f0-b747-a8934a9bae74',13,109,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2bf79e-f6dd-11f0-b747-a8934a9bae74',13,110,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c61f0-f6dd-11f0-b747-a8934a9bae74',13,111,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c653b-f6dd-11f0-b747-a8934a9bae74',13,113,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c677c-f6dd-11f0-b747-a8934a9bae74',13,114,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c6a8c-f6dd-11f0-b747-a8934a9bae74',15,116,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c6cac-f6dd-11f0-b747-a8934a9bae74',15,117,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c6ef9-f6dd-11f0-b747-a8934a9bae74',15,119,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c71a4-f6dd-11f0-b747-a8934a9bae74',18,121,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c73de-f6dd-11f0-b747-a8934a9bae74',18,123,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c7614-f6dd-11f0-b747-a8934a9bae74',18,125,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c7876-f6dd-11f0-b747-a8934a9bae74',18,126,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c7ab0-f6dd-11f0-b747-a8934a9bae74',18,127,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c7d14-f6dd-11f0-b747-a8934a9bae74',18,129,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c7f7a-f6dd-11f0-b747-a8934a9bae74',18,130,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c8109-f6dd-11f0-b747-a8934a9bae74',18,131,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c8243-f6dd-11f0-b747-a8934a9bae74',18,133,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c83d1-f6dd-11f0-b747-a8934a9bae74',21,134,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c84d5-f6dd-11f0-b747-a8934a9bae74',21,135,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c85fb-f6dd-11f0-b747-a8934a9bae74',21,137,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c8703-f6dd-11f0-b747-a8934a9bae74',21,139,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c8808-f6dd-11f0-b747-a8934a9bae74',21,141,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c8910-f6dd-11f0-b747-a8934a9bae74',21,143,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c8a0d-f6dd-11f0-b747-a8934a9bae74',21,145,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c8afc-f6dd-11f0-b747-a8934a9bae74',21,146,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c8be1-f6dd-11f0-b747-a8934a9bae74',21,147,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c8cf8-f6dd-11f0-b747-a8934a9bae74',21,149,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c8de1-f6dd-11f0-b747-a8934a9bae74',21,150,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c8ef3-f6dd-11f0-b747-a8934a9bae74',21,151,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c8ff2-f6dd-11f0-b747-a8934a9bae74',21,153,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c90ed-f6dd-11f0-b747-a8934a9bae74',21,155,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c91ea-f6dd-11f0-b747-a8934a9bae74',21,157,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c92e8-f6dd-11f0-b747-a8934a9bae74',21,159,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c93e7-f6dd-11f0-b747-a8934a9bae74',21,161,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c94de-f6dd-11f0-b747-a8934a9bae74',21,162,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c95c4-f6dd-11f0-b747-a8934a9bae74',21,163,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c96d2-f6dd-11f0-b747-a8934a9bae74',21,164,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c97e0-f6dd-11f0-b747-a8934a9bae74',21,165,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c9956-f6dd-11f0-b747-a8934a9bae74',21,167,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c9a7c-f6dd-11f0-b747-a8934a9bae74',21,169,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c9b92-f6dd-11f0-b747-a8934a9bae74',21,170,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c9c80-f6dd-11f0-b747-a8934a9bae74',21,171,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c9d75-f6dd-11f0-b747-a8934a9bae74',21,172,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c9e5e-f6dd-11f0-b747-a8934a9bae74',21,173,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2c9f80-f6dd-11f0-b747-a8934a9bae74',21,175,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2ca08e-f6dd-11f0-b747-a8934a9bae74',21,176,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2ca1b6-f6dd-11f0-b747-a8934a9bae74',23,178,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2ca33c-f6dd-11f0-b747-a8934a9bae74',23,179,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2ca749-f6dd-11f0-b747-a8934a9bae74',23,180,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2ca86e-f6dd-11f0-b747-a8934a9bae74',23,181,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2cf208-f6dd-11f0-b747-a8934a9bae74',23,182,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2cf516-f6dd-11f0-b747-a8934a9bae74',26,184,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2cf8a9-f6dd-11f0-b747-a8934a9bae74',26,186,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2cfa6a-f6dd-11f0-b747-a8934a9bae74',26,187,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2cfc29-f6dd-11f0-b747-a8934a9bae74',26,188,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2cfe05-f6dd-11f0-b747-a8934a9bae74',26,190,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d000a-f6dd-11f0-b747-a8934a9bae74',26,192,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d01a3-f6dd-11f0-b747-a8934a9bae74',26,193,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d032e-f6dd-11f0-b747-a8934a9bae74',26,194,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d04bd-f6dd-11f0-b747-a8934a9bae74',26,195,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d0655-f6dd-11f0-b747-a8934a9bae74',26,196,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d081e-f6dd-11f0-b747-a8934a9bae74',26,197,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d09e2-f6dd-11f0-b747-a8934a9bae74',26,198,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d0b72-f6dd-11f0-b747-a8934a9bae74',26,199,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d0d5b-f6dd-11f0-b747-a8934a9bae74',26,201,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d0f09-f6dd-11f0-b747-a8934a9bae74',26,203,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d11a2-f6dd-11f0-b747-a8934a9bae74',28,204,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d133e-f6dd-11f0-b747-a8934a9bae74',28,205,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d14ee-f6dd-11f0-b747-a8934a9bae74',28,206,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d1697-f6dd-11f0-b747-a8934a9bae74',28,207,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d1894-f6dd-11f0-b747-a8934a9bae74',34,209,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d1a0e-f6dd-11f0-b747-a8934a9bae74',34,210,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d1bc3-f6dd-11f0-b747-a8934a9bae74',34,211,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d1e1b-f6dd-11f0-b747-a8934a9bae74',34,213,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d1f7a-f6dd-11f0-b747-a8934a9bae74',34,214,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d2121-f6dd-11f0-b747-a8934a9bae74',34,215,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d22a1-f6dd-11f0-b747-a8934a9bae74',34,216,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d2414-f6dd-11f0-b747-a8934a9bae74',34,217,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2d8db6-f6dd-11f0-b747-a8934a9bae74',36,218,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e19fd-f6dd-11f0-b747-a8934a9bae74',36,220,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e1e1a-f6dd-11f0-b747-a8934a9bae74',36,221,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e1ff2-f6dd-11f0-b747-a8934a9bae74',36,223,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e21dc-f6dd-11f0-b747-a8934a9bae74',36,225,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e2353-f6dd-11f0-b747-a8934a9bae74',36,226,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e24e8-f6dd-11f0-b747-a8934a9bae74',38,227,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e267d-f6dd-11f0-b747-a8934a9bae74',38,229,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e2807-f6dd-11f0-b747-a8934a9bae74',38,230,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e29be-f6dd-11f0-b747-a8934a9bae74',38,231,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e2b4c-f6dd-11f0-b747-a8934a9bae74',38,232,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e2cc3-f6dd-11f0-b747-a8934a9bae74',38,233,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e2e74-f6dd-11f0-b747-a8934a9bae74',46,234,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e3037-f6dd-11f0-b747-a8934a9bae74',46,235,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e32c5-f6dd-11f0-b747-a8934a9bae74',46,236,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e3450-f6dd-11f0-b747-a8934a9bae74',46,237,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e3601-f6dd-11f0-b747-a8934a9bae74',50,238,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e37bb-f6dd-11f0-b747-a8934a9bae74',52,239,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e396e-f6dd-11f0-b747-a8934a9bae74',56,240,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e3ba0-f6dd-11f0-b747-a8934a9bae74',56,242,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e3d84-f6dd-11f0-b747-a8934a9bae74',56,243,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e3f27-f6dd-11f0-b747-a8934a9bae74',56,244,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e4093-f6dd-11f0-b747-a8934a9bae74',56,245,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e4254-f6dd-11f0-b747-a8934a9bae74',56,246,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e43ba-f6dd-11f0-b747-a8934a9bae74',56,247,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e453a-f6dd-11f0-b747-a8934a9bae74',56,248,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e46df-f6dd-11f0-b747-a8934a9bae74',56,249,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e4920-f6dd-11f0-b747-a8934a9bae74',56,250,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e4ac8-f6dd-11f0-b747-a8934a9bae74',56,252,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e4c76-f6dd-11f0-b747-a8934a9bae74',56,253,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e4de6-f6dd-11f0-b747-a8934a9bae74',56,254,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e5040-f6dd-11f0-b747-a8934a9bae74',56,255,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e51fb-f6dd-11f0-b747-a8934a9bae74',56,256,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e5373-f6dd-11f0-b747-a8934a9bae74',56,257,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e5544-f6dd-11f0-b747-a8934a9bae74',58,258,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e56de-f6dd-11f0-b747-a8934a9bae74',58,260,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e586f-f6dd-11f0-b747-a8934a9bae74',58,262,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e5a1e-f6dd-11f0-b747-a8934a9bae74',58,263,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e5bae-f6dd-11f0-b747-a8934a9bae74',58,265,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e5d49-f6dd-11f0-b747-a8934a9bae74',58,267,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e5f14-f6dd-11f0-b747-a8934a9bae74',58,268,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e60bf-f6dd-11f0-b747-a8934a9bae74',58,270,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e627f-f6dd-11f0-b747-a8934a9bae74',58,271,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e63ef-f6dd-11f0-b747-a8934a9bae74',58,272,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e6597-f6dd-11f0-b747-a8934a9bae74',58,273,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e670c-f6dd-11f0-b747-a8934a9bae74',58,274,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e68bb-f6dd-11f0-b747-a8934a9bae74',62,275,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e6a3e-f6dd-11f0-b747-a8934a9bae74',62,276,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e6ba5-f6dd-11f0-b747-a8934a9bae74',62,277,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e6d4f-f6dd-11f0-b747-a8934a9bae74',62,278,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e6ec5-f6dd-11f0-b747-a8934a9bae74',62,279,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e7087-f6dd-11f0-b747-a8934a9bae74',69,280,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e71d8-f6dd-11f0-b747-a8934a9bae74',69,281,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e733b-f6dd-11f0-b747-a8934a9bae74',69,282,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e74ee-f6dd-11f0-b747-a8934a9bae74',71,283,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e76b8-f6dd-11f0-b747-a8934a9bae74',71,284,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e78ae-f6dd-11f0-b747-a8934a9bae74',73,285,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e7a55-f6dd-11f0-b747-a8934a9bae74',73,286,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e7c39-f6dd-11f0-b747-a8934a9bae74',79,287,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e7df0-f6dd-11f0-b747-a8934a9bae74',79,289,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e806f-f6dd-11f0-b747-a8934a9bae74',79,290,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e822b-f6dd-11f0-b747-a8934a9bae74',79,291,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e83f9-f6dd-11f0-b747-a8934a9bae74',79,292,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e8585-f6dd-11f0-b747-a8934a9bae74',79,293,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e86fd-f6dd-11f0-b747-a8934a9bae74',79,294,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2e89f1-f6dd-11f0-b747-a8934a9bae74',92,295,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2ecfff-f6dd-11f0-b747-a8934a9bae74',106,296,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2ed254-f6dd-11f0-b747-a8934a9bae74',106,297,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2ed42c-f6dd-11f0-b747-a8934a9bae74',111,298,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2ed5e3-f6dd-11f0-b747-a8934a9bae74',151,299,'LQH_ONG_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2eeff9-f6dd-11f0-b747-a8934a9bae74',2,6,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2ef708-f6dd-11f0-b747-a8934a9bae74',7,25,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2ef909-f6dd-11f0-b747-a8934a9bae74',7,26,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2efaea-f6dd-11f0-b747-a8934a9bae74',7,28,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2efc9c-f6dd-11f0-b747-a8934a9bae74',7,30,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2efe36-f6dd-11f0-b747-a8934a9bae74',7,31,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2efff2-f6dd-11f0-b747-a8934a9bae74',7,32,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f0176-f6dd-11f0-b747-a8934a9bae74',7,33,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f0338-f6dd-11f0-b747-a8934a9bae74',7,34,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f04e0-f6dd-11f0-b747-a8934a9bae74',7,36,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f06d1-f6dd-11f0-b747-a8934a9bae74',7,38,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f08d8-f6dd-11f0-b747-a8934a9bae74',7,40,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f0abb-f6dd-11f0-b747-a8934a9bae74',7,41,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f0cef-f6dd-11f0-b747-a8934a9bae74',7,42,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f0e9c-f6dd-11f0-b747-a8934a9bae74',7,43,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f103e-f6dd-11f0-b747-a8934a9bae74',7,44,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f11c3-f6dd-11f0-b747-a8934a9bae74',7,45,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f1344-f6dd-11f0-b747-a8934a9bae74',7,46,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f14f8-f6dd-11f0-b747-a8934a9bae74',7,48,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f16c3-f6dd-11f0-b747-a8934a9bae74',7,50,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f1876-f6dd-11f0-b747-a8934a9bae74',7,52,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f1a24-f6dd-11f0-b747-a8934a9bae74',7,54,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f1c4b-f6dd-11f0-b747-a8934a9bae74',7,56,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f1dfc-f6dd-11f0-b747-a8934a9bae74',7,58,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f1fad-f6dd-11f0-b747-a8934a9bae74',7,60,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f2169-f6dd-11f0-b747-a8934a9bae74',7,62,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f2310-f6dd-11f0-b747-a8934a9bae74',7,64,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f2486-f6dd-11f0-b747-a8934a9bae74',7,65,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f25c6-f6dd-11f0-b747-a8934a9bae74',7,66,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f2a51-f6dd-11f0-b747-a8934a9bae74',7,67,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f2c29-f6dd-11f0-b747-a8934a9bae74',7,68,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f2dbb-f6dd-11f0-b747-a8934a9bae74',7,69,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f2f73-f6dd-11f0-b747-a8934a9bae74',7,71,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f316f-f6dd-11f0-b747-a8934a9bae74',8,73,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f335c-f6dd-11f0-b747-a8934a9bae74',8,75,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f34e8-f6dd-11f0-b747-a8934a9bae74',8,76,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f364e-f6dd-11f0-b747-a8934a9bae74',8,77,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f380f-f6dd-11f0-b747-a8934a9bae74',12,78,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f3989-f6dd-11f0-b747-a8934a9bae74',12,79,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f3b22-f6dd-11f0-b747-a8934a9bae74',12,81,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f3c93-f6dd-11f0-b747-a8934a9bae74',12,82,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f3e1a-f6dd-11f0-b747-a8934a9bae74',12,84,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f3f86-f6dd-11f0-b747-a8934a9bae74',12,85,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f40e9-f6dd-11f0-b747-a8934a9bae74',12,86,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f429b-f6dd-11f0-b747-a8934a9bae74',12,88,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f448b-f6dd-11f0-b747-a8934a9bae74',12,90,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f4603-f6dd-11f0-b747-a8934a9bae74',12,91,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f475a-f6dd-11f0-b747-a8934a9bae74',12,92,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f48ab-f6dd-11f0-b747-a8934a9bae74',12,94,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f4a2e-f6dd-11f0-b747-a8934a9bae74',12,95,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f4b88-f6dd-11f0-b747-a8934a9bae74',12,96,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f4d35-f6dd-11f0-b747-a8934a9bae74',14,97,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f4ece-f6dd-11f0-b747-a8934a9bae74',14,98,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f503c-f6dd-11f0-b747-a8934a9bae74',14,100,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f5190-f6dd-11f0-b747-a8934a9bae74',14,102,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f52f7-f6dd-11f0-b747-a8934a9bae74',14,103,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f5499-f6dd-11f0-b747-a8934a9bae74',14,104,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f5695-f6dd-11f0-b747-a8934a9bae74',14,106,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f5845-f6dd-11f0-b747-a8934a9bae74',14,108,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f5a54-f6dd-11f0-b747-a8934a9bae74',14,109,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f5c9c-f6dd-11f0-b747-a8934a9bae74',14,110,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f5e1c-f6dd-11f0-b747-a8934a9bae74',14,111,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f5fba-f6dd-11f0-b747-a8934a9bae74',14,113,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f6159-f6dd-11f0-b747-a8934a9bae74',14,114,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f6339-f6dd-11f0-b747-a8934a9bae74',16,116,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f649f-f6dd-11f0-b747-a8934a9bae74',16,117,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f6647-f6dd-11f0-b747-a8934a9bae74',16,119,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f6824-f6dd-11f0-b747-a8934a9bae74',19,121,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f69be-f6dd-11f0-b747-a8934a9bae74',19,123,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f6b51-f6dd-11f0-b747-a8934a9bae74',19,125,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f6d31-f6dd-11f0-b747-a8934a9bae74',19,126,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f6ea9-f6dd-11f0-b747-a8934a9bae74',19,127,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f7039-f6dd-11f0-b747-a8934a9bae74',19,129,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f71fd-f6dd-11f0-b747-a8934a9bae74',19,130,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f7373-f6dd-11f0-b747-a8934a9bae74',19,131,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f7500-f6dd-11f0-b747-a8934a9bae74',19,133,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f76c5-f6dd-11f0-b747-a8934a9bae74',20,134,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f7845-f6dd-11f0-b747-a8934a9bae74',20,135,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f79db-f6dd-11f0-b747-a8934a9bae74',20,137,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f7b6e-f6dd-11f0-b747-a8934a9bae74',20,139,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f7d12-f6dd-11f0-b747-a8934a9bae74',20,141,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f7ea7-f6dd-11f0-b747-a8934a9bae74',20,143,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f803a-f6dd-11f0-b747-a8934a9bae74',20,145,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f81cf-f6dd-11f0-b747-a8934a9bae74',20,146,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f832f-f6dd-11f0-b747-a8934a9bae74',20,147,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f84ca-f6dd-11f0-b747-a8934a9bae74',20,149,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f8a27-f6dd-11f0-b747-a8934a9bae74',20,150,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f8c17-f6dd-11f0-b747-a8934a9bae74',20,151,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f8f27-f6dd-11f0-b747-a8934a9bae74',20,153,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f9103-f6dd-11f0-b747-a8934a9bae74',20,155,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2f92b7-f6dd-11f0-b747-a8934a9bae74',20,157,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2fd4ce-f6dd-11f0-b747-a8934a9bae74',20,159,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2fd736-f6dd-11f0-b747-a8934a9bae74',20,161,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2fd8f2-f6dd-11f0-b747-a8934a9bae74',20,162,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce2fdaa1-f6dd-11f0-b747-a8934a9bae74',20,163,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3040eb-f6dd-11f0-b747-a8934a9bae74',20,164,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce304531-f6dd-11f0-b747-a8934a9bae74',20,165,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce30470d-f6dd-11f0-b747-a8934a9bae74',20,167,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3048c4-f6dd-11f0-b747-a8934a9bae74',20,169,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce304a72-f6dd-11f0-b747-a8934a9bae74',22,170,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce304bd3-f6dd-11f0-b747-a8934a9bae74',22,171,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce304da4-f6dd-11f0-b747-a8934a9bae74',22,172,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce30504b-f6dd-11f0-b747-a8934a9bae74',22,173,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce30524e-f6dd-11f0-b747-a8934a9bae74',22,175,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3053da-f6dd-11f0-b747-a8934a9bae74',22,176,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce30d0d7-f6dd-11f0-b747-a8934a9bae74',24,178,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce30d340-f6dd-11f0-b747-a8934a9bae74',24,179,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce30d4eb-f6dd-11f0-b747-a8934a9bae74',24,180,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce30d682-f6dd-11f0-b747-a8934a9bae74',24,181,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce30d82e-f6dd-11f0-b747-a8934a9bae74',24,182,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce30da11-f6dd-11f0-b747-a8934a9bae74',27,184,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce30dbba-f6dd-11f0-b747-a8934a9bae74',27,186,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce30dd34-f6dd-11f0-b747-a8934a9bae74',27,187,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce30dea5-f6dd-11f0-b747-a8934a9bae74',27,188,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce30e018-f6dd-11f0-b747-a8934a9bae74',27,190,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce30e1e6-f6dd-11f0-b747-a8934a9bae74',27,192,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce30e379-f6dd-11f0-b747-a8934a9bae74',27,193,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce30ea55-f6dd-11f0-b747-a8934a9bae74',27,194,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce30ec4f-f6dd-11f0-b747-a8934a9bae74',27,195,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3131ac-f6dd-11f0-b747-a8934a9bae74',27,196,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31347d-f6dd-11f0-b747-a8934a9bae74',27,197,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31361b-f6dd-11f0-b747-a8934a9bae74',27,198,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3137a1-f6dd-11f0-b747-a8934a9bae74',27,199,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3139a3-f6dd-11f0-b747-a8934a9bae74',27,201,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce313b56-f6dd-11f0-b747-a8934a9bae74',27,203,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce313d11-f6dd-11f0-b747-a8934a9bae74',29,204,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce313e98-f6dd-11f0-b747-a8934a9bae74',29,205,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce314028-f6dd-11f0-b747-a8934a9bae74',29,206,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31419e-f6dd-11f0-b747-a8934a9bae74',29,207,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3143dc-f6dd-11f0-b747-a8934a9bae74',35,209,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3145a7-f6dd-11f0-b747-a8934a9bae74',35,210,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31478e-f6dd-11f0-b747-a8934a9bae74',35,211,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce314986-f6dd-11f0-b747-a8934a9bae74',35,213,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce314b10-f6dd-11f0-b747-a8934a9bae74',35,214,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce314cd2-f6dd-11f0-b747-a8934a9bae74',35,215,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce314e3a-f6dd-11f0-b747-a8934a9bae74',35,216,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce314fa8-f6dd-11f0-b747-a8934a9bae74',35,217,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31514d-f6dd-11f0-b747-a8934a9bae74',37,218,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3152fd-f6dd-11f0-b747-a8934a9bae74',37,220,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3154d8-f6dd-11f0-b747-a8934a9bae74',37,221,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31567d-f6dd-11f0-b747-a8934a9bae74',37,223,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce315843-f6dd-11f0-b747-a8934a9bae74',37,225,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3159ed-f6dd-11f0-b747-a8934a9bae74',37,226,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce315b98-f6dd-11f0-b747-a8934a9bae74',39,227,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce315d26-f6dd-11f0-b747-a8934a9bae74',39,229,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce315e80-f6dd-11f0-b747-a8934a9bae74',39,230,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce316029-f6dd-11f0-b747-a8934a9bae74',39,231,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31618d-f6dd-11f0-b747-a8934a9bae74',39,232,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3162f4-f6dd-11f0-b747-a8934a9bae74',39,233,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3164c4-f6dd-11f0-b747-a8934a9bae74',47,234,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31662f-f6dd-11f0-b747-a8934a9bae74',47,235,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3168a2-f6dd-11f0-b747-a8934a9bae74',47,236,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce316a1d-f6dd-11f0-b747-a8934a9bae74',47,237,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce316c4c-f6dd-11f0-b747-a8934a9bae74',49,238,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce316e15-f6dd-11f0-b747-a8934a9bae74',53,239,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31700d-f6dd-11f0-b747-a8934a9bae74',55,240,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3171a7-f6dd-11f0-b747-a8934a9bae74',55,242,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce317367-f6dd-11f0-b747-a8934a9bae74',55,243,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3174e1-f6dd-11f0-b747-a8934a9bae74',55,244,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31764d-f6dd-11f0-b747-a8934a9bae74',55,245,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce317819-f6dd-11f0-b747-a8934a9bae74',55,246,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31799a-f6dd-11f0-b747-a8934a9bae74',55,247,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31c096-f6dd-11f0-b747-a8934a9bae74',55,248,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31c385-f6dd-11f0-b747-a8934a9bae74',55,249,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31c51d-f6dd-11f0-b747-a8934a9bae74',55,250,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31c6bf-f6dd-11f0-b747-a8934a9bae74',55,252,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31c87b-f6dd-11f0-b747-a8934a9bae74',55,253,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31c9f0-f6dd-11f0-b747-a8934a9bae74',55,254,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31cb78-f6dd-11f0-b747-a8934a9bae74',55,255,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31cd2c-f6dd-11f0-b747-a8934a9bae74',57,256,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31ce9a-f6dd-11f0-b747-a8934a9bae74',57,257,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31d04b-f6dd-11f0-b747-a8934a9bae74',59,258,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31d1dc-f6dd-11f0-b747-a8934a9bae74',59,260,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31d36c-f6dd-11f0-b747-a8934a9bae74',59,262,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31d523-f6dd-11f0-b747-a8934a9bae74',59,263,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31d776-f6dd-11f0-b747-a8934a9bae74',59,265,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31d920-f6dd-11f0-b747-a8934a9bae74',59,267,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31dadd-f6dd-11f0-b747-a8934a9bae74',59,268,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31dc6a-f6dd-11f0-b747-a8934a9bae74',59,270,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31de1d-f6dd-11f0-b747-a8934a9bae74',59,271,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31df8b-f6dd-11f0-b747-a8934a9bae74',59,272,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31e157-f6dd-11f0-b747-a8934a9bae74',59,273,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31e2d2-f6dd-11f0-b747-a8934a9bae74',59,274,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31e485-f6dd-11f0-b747-a8934a9bae74',63,275,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31e5fc-f6dd-11f0-b747-a8934a9bae74',63,276,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce31e760-f6dd-11f0-b747-a8934a9bae74',63,277,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce322a87-f6dd-11f0-b747-a8934a9bae74',63,278,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce322c95-f6dd-11f0-b747-a8934a9bae74',63,279,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce322e66-f6dd-11f0-b747-a8934a9bae74',70,280,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce32301f-f6dd-11f0-b747-a8934a9bae74',70,281,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce32319d-f6dd-11f0-b747-a8934a9bae74',70,282,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce323356-f6dd-11f0-b747-a8934a9bae74',72,283,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3234f7-f6dd-11f0-b747-a8934a9bae74',72,284,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3236af-f6dd-11f0-b747-a8934a9bae74',74,285,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce323823-f6dd-11f0-b747-a8934a9bae74',74,286,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3239d3-f6dd-11f0-b747-a8934a9bae74',80,287,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce323b8a-f6dd-11f0-b747-a8934a9bae74',80,289,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce323d4e-f6dd-11f0-b747-a8934a9bae74',80,290,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce323ec9-f6dd-11f0-b747-a8934a9bae74',80,291,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce32407a-f6dd-11f0-b747-a8934a9bae74',80,292,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3241fc-f6dd-11f0-b747-a8934a9bae74',80,293,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce32436e-f6dd-11f0-b747-a8934a9bae74',80,294,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce324526-f6dd-11f0-b747-a8934a9bae74',93,295,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce324872-f6dd-11f0-b747-a8934a9bae74',107,296,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce329737-f6dd-11f0-b747-a8934a9bae74',107,297,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce329c5f-f6dd-11f0-b747-a8934a9bae74',112,298,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce329ee3-f6dd-11f0-b747-a8934a9bae74',152,299,'LQH_BA_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33c42f-f6dd-11f0-b747-a8934a9bae74',4,6,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33d19d-f6dd-11f0-b747-a8934a9bae74',13,38,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33d495-f6dd-11f0-b747-a8934a9bae74',13,40,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33d699-f6dd-11f0-b747-a8934a9bae74',13,41,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33d842-f6dd-11f0-b747-a8934a9bae74',13,42,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33d9bf-f6dd-11f0-b747-a8934a9bae74',13,43,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33db47-f6dd-11f0-b747-a8934a9bae74',13,44,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33dce9-f6dd-11f0-b747-a8934a9bae74',13,45,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33de88-f6dd-11f0-b747-a8934a9bae74',13,46,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33e01c-f6dd-11f0-b747-a8934a9bae74',13,48,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33e1e1-f6dd-11f0-b747-a8934a9bae74',13,50,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33e3bc-f6dd-11f0-b747-a8934a9bae74',13,52,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33e565-f6dd-11f0-b747-a8934a9bae74',13,54,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33e7ba-f6dd-11f0-b747-a8934a9bae74',13,56,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33e97e-f6dd-11f0-b747-a8934a9bae74',13,58,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33eb56-f6dd-11f0-b747-a8934a9bae74',13,60,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33ed0f-f6dd-11f0-b747-a8934a9bae74',13,62,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33eebe-f6dd-11f0-b747-a8934a9bae74',13,64,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33f06d-f6dd-11f0-b747-a8934a9bae74',13,65,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33f1ef-f6dd-11f0-b747-a8934a9bae74',13,66,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33f390-f6dd-11f0-b747-a8934a9bae74',13,67,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33f50f-f6dd-11f0-b747-a8934a9bae74',13,68,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33f6d3-f6dd-11f0-b747-a8934a9bae74',13,69,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33f86e-f6dd-11f0-b747-a8934a9bae74',13,71,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33fbfa-f6dd-11f0-b747-a8934a9bae74',15,25,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce33feca-f6dd-11f0-b747-a8934a9bae74',15,26,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34009a-f6dd-11f0-b747-a8934a9bae74',15,28,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce340247-f6dd-11f0-b747-a8934a9bae74',15,30,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce340407-f6dd-11f0-b747-a8934a9bae74',15,31,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3405c2-f6dd-11f0-b747-a8934a9bae74',15,32,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce340762-f6dd-11f0-b747-a8934a9bae74',15,33,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce340934-f6dd-11f0-b747-a8934a9bae74',15,34,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce340ad9-f6dd-11f0-b747-a8934a9bae74',15,36,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce340ce5-f6dd-11f0-b747-a8934a9bae74',15,40,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce340e82-f6dd-11f0-b747-a8934a9bae74',15,41,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34101a-f6dd-11f0-b747-a8934a9bae74',15,42,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3411a9-f6dd-11f0-b747-a8934a9bae74',15,43,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce341339-f6dd-11f0-b747-a8934a9bae74',15,44,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3414c6-f6dd-11f0-b747-a8934a9bae74',15,45,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34165e-f6dd-11f0-b747-a8934a9bae74',15,46,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3417fa-f6dd-11f0-b747-a8934a9bae74',15,48,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce341975-f6dd-11f0-b747-a8934a9bae74',15,50,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce341b0c-f6dd-11f0-b747-a8934a9bae74',15,52,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce341c9d-f6dd-11f0-b747-a8934a9bae74',15,54,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce341ed2-f6dd-11f0-b747-a8934a9bae74',15,56,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34208c-f6dd-11f0-b747-a8934a9bae74',15,58,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce342223-f6dd-11f0-b747-a8934a9bae74',15,60,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3423a7-f6dd-11f0-b747-a8934a9bae74',15,62,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34252c-f6dd-11f0-b747-a8934a9bae74',15,64,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3426c0-f6dd-11f0-b747-a8934a9bae74',15,65,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34283a-f6dd-11f0-b747-a8934a9bae74',15,66,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3429b4-f6dd-11f0-b747-a8934a9bae74',15,67,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce342b3f-f6dd-11f0-b747-a8934a9bae74',15,68,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce342cc0-f6dd-11f0-b747-a8934a9bae74',15,69,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce342e49-f6dd-11f0-b747-a8934a9bae74',15,71,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3431e7-f6dd-11f0-b747-a8934a9bae74',18,25,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3433bc-f6dd-11f0-b747-a8934a9bae74',18,26,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce343563-f6dd-11f0-b747-a8934a9bae74',18,28,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34383a-f6dd-11f0-b747-a8934a9bae74',18,30,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3439f8-f6dd-11f0-b747-a8934a9bae74',18,31,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce343b95-f6dd-11f0-b747-a8934a9bae74',18,32,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce343d31-f6dd-11f0-b747-a8934a9bae74',18,33,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce343ed0-f6dd-11f0-b747-a8934a9bae74',18,34,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34407d-f6dd-11f0-b747-a8934a9bae74',18,36,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce344283-f6dd-11f0-b747-a8934a9bae74',18,38,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3444d2-f6dd-11f0-b747-a8934a9bae74',18,56,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3446b9-f6dd-11f0-b747-a8934a9bae74',18,58,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce344839-f6dd-11f0-b747-a8934a9bae74',18,60,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3449b4-f6dd-11f0-b747-a8934a9bae74',18,62,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce344b44-f6dd-11f0-b747-a8934a9bae74',18,64,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce344ddd-f6dd-11f0-b747-a8934a9bae74',18,65,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce344f90-f6dd-11f0-b747-a8934a9bae74',18,66,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34512f-f6dd-11f0-b747-a8934a9bae74',18,67,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3452be-f6dd-11f0-b747-a8934a9bae74',18,68,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34953e-f6dd-11f0-b747-a8934a9bae74',18,69,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce349887-f6dd-11f0-b747-a8934a9bae74',18,71,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce349e26-f6dd-11f0-b747-a8934a9bae74',21,25,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34a0b1-f6dd-11f0-b747-a8934a9bae74',21,26,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34a278-f6dd-11f0-b747-a8934a9bae74',21,28,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34a4a2-f6dd-11f0-b747-a8934a9bae74',21,30,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34a66f-f6dd-11f0-b747-a8934a9bae74',21,31,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34a811-f6dd-11f0-b747-a8934a9bae74',21,32,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34a999-f6dd-11f0-b747-a8934a9bae74',21,33,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34ab2a-f6dd-11f0-b747-a8934a9bae74',21,34,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34acba-f6dd-11f0-b747-a8934a9bae74',21,36,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34aed6-f6dd-11f0-b747-a8934a9bae74',21,38,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34b17f-f6dd-11f0-b747-a8934a9bae74',21,40,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34b366-f6dd-11f0-b747-a8934a9bae74',21,41,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce34b519-f6dd-11f0-b747-a8934a9bae74',21,42,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce352cc4-f6dd-11f0-b747-a8934a9bae74',21,43,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce353051-f6dd-11f0-b747-a8934a9bae74',21,44,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35322a-f6dd-11f0-b747-a8934a9bae74',21,45,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3533ea-f6dd-11f0-b747-a8934a9bae74',21,46,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3535d3-f6dd-11f0-b747-a8934a9bae74',21,48,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35379a-f6dd-11f0-b747-a8934a9bae74',21,50,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35393a-f6dd-11f0-b747-a8934a9bae74',21,52,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce353ade-f6dd-11f0-b747-a8934a9bae74',21,54,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce353f5d-f6dd-11f0-b747-a8934a9bae74',25,78,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3541c1-f6dd-11f0-b747-a8934a9bae74',25,79,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce354396-f6dd-11f0-b747-a8934a9bae74',25,81,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35453c-f6dd-11f0-b747-a8934a9bae74',25,82,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce354721-f6dd-11f0-b747-a8934a9bae74',25,84,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3548c8-f6dd-11f0-b747-a8934a9bae74',25,85,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce354a63-f6dd-11f0-b747-a8934a9bae74',25,86,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce354be0-f6dd-11f0-b747-a8934a9bae74',25,88,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce354e16-f6dd-11f0-b747-a8934a9bae74',25,90,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce354fbb-f6dd-11f0-b747-a8934a9bae74',25,91,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35ae05-f6dd-11f0-b747-a8934a9bae74',25,92,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35b3c6-f6dd-11f0-b747-a8934a9bae74',25,94,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35b512-f6dd-11f0-b747-a8934a9bae74',25,95,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35b677-f6dd-11f0-b747-a8934a9bae74',25,96,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35ba91-f6dd-11f0-b747-a8934a9bae74',26,90,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35bc19-f6dd-11f0-b747-a8934a9bae74',26,91,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35bddc-f6dd-11f0-b747-a8934a9bae74',26,92,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35bef7-f6dd-11f0-b747-a8934a9bae74',26,94,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35c118-f6dd-11f0-b747-a8934a9bae74',26,95,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35c248-f6dd-11f0-b747-a8934a9bae74',26,96,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35c6ad-f6dd-11f0-b747-a8934a9bae74',28,78,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35c88a-f6dd-11f0-b747-a8934a9bae74',28,79,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35c99a-f6dd-11f0-b747-a8934a9bae74',28,81,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35cab3-f6dd-11f0-b747-a8934a9bae74',28,82,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35cc2f-f6dd-11f0-b747-a8934a9bae74',28,84,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35cd36-f6dd-11f0-b747-a8934a9bae74',28,85,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35ce29-f6dd-11f0-b747-a8934a9bae74',28,86,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35d05f-f6dd-11f0-b747-a8934a9bae74',28,88,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35d459-f6dd-11f0-b747-a8934a9bae74',30,78,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35d5f5-f6dd-11f0-b747-a8934a9bae74',30,79,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35d740-f6dd-11f0-b747-a8934a9bae74',30,81,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35d835-f6dd-11f0-b747-a8934a9bae74',30,82,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce35d940-f6dd-11f0-b747-a8934a9bae74',30,84,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce361dd6-f6dd-11f0-b747-a8934a9bae74',30,85,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce362139-f6dd-11f0-b747-a8934a9bae74',30,86,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3622b5-f6dd-11f0-b747-a8934a9bae74',30,88,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3624d0-f6dd-11f0-b747-a8934a9bae74',30,90,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce362680-f6dd-11f0-b747-a8934a9bae74',30,91,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3627c7-f6dd-11f0-b747-a8934a9bae74',30,92,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce362991-f6dd-11f0-b747-a8934a9bae74',30,94,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce362ace-f6dd-11f0-b747-a8934a9bae74',30,95,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce362bb9-f6dd-11f0-b747-a8934a9bae74',30,96,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce362e81-f6dd-11f0-b747-a8934a9bae74',34,106,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce362f87-f6dd-11f0-b747-a8934a9bae74',34,108,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce363076-f6dd-11f0-b747-a8934a9bae74',34,109,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce363153-f6dd-11f0-b747-a8934a9bae74',34,110,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce363262-f6dd-11f0-b747-a8934a9bae74',34,111,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3633b0-f6dd-11f0-b747-a8934a9bae74',34,113,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce363508-f6dd-11f0-b747-a8934a9bae74',34,114,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce363762-f6dd-11f0-b747-a8934a9bae74',36,97,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce363940-f6dd-11f0-b747-a8934a9bae74',36,98,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce363aab-f6dd-11f0-b747-a8934a9bae74',36,100,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce363c26-f6dd-11f0-b747-a8934a9bae74',36,102,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce363da7-f6dd-11f0-b747-a8934a9bae74',36,103,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce363f3b-f6dd-11f0-b747-a8934a9bae74',36,104,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3646a4-f6dd-11f0-b747-a8934a9bae74',46,126,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36482f-f6dd-11f0-b747-a8934a9bae74',46,127,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36491a-f6dd-11f0-b747-a8934a9bae74',46,129,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce364a73-f6dd-11f0-b747-a8934a9bae74',46,130,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce364b7b-f6dd-11f0-b747-a8934a9bae74',46,131,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce364cad-f6dd-11f0-b747-a8934a9bae74',46,133,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3650b6-f6dd-11f0-b747-a8934a9bae74',50,121,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3652ef-f6dd-11f0-b747-a8934a9bae74',50,123,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce365439-f6dd-11f0-b747-a8934a9bae74',50,125,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36561d-f6dd-11f0-b747-a8934a9bae74',50,130,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce365767-f6dd-11f0-b747-a8934a9bae74',50,131,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3658c0-f6dd-11f0-b747-a8934a9bae74',50,133,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce365bcb-f6dd-11f0-b747-a8934a9bae74',52,121,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce365d09-f6dd-11f0-b747-a8934a9bae74',52,123,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce365df5-f6dd-11f0-b747-a8934a9bae74',52,125,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce365f61-f6dd-11f0-b747-a8934a9bae74',52,126,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36a3e1-f6dd-11f0-b747-a8934a9bae74',52,127,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36a664-f6dd-11f0-b747-a8934a9bae74',52,129,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36aab5-f6dd-11f0-b747-a8934a9bae74',54,121,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36ac9f-f6dd-11f0-b747-a8934a9bae74',54,123,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36bdc5-f6dd-11f0-b747-a8934a9bae74',54,125,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36c12d-f6dd-11f0-b747-a8934a9bae74',54,126,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36c30c-f6dd-11f0-b747-a8934a9bae74',54,127,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36c481-f6dd-11f0-b747-a8934a9bae74',54,129,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36c655-f6dd-11f0-b747-a8934a9bae74',54,130,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36c7e1-f6dd-11f0-b747-a8934a9bae74',54,131,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36c942-f6dd-11f0-b747-a8934a9bae74',54,133,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36cbdb-f6dd-11f0-b747-a8934a9bae74',56,151,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36cd84-f6dd-11f0-b747-a8934a9bae74',56,153,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36cef6-f6dd-11f0-b747-a8934a9bae74',56,155,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36d068-f6dd-11f0-b747-a8934a9bae74',56,157,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36d1d3-f6dd-11f0-b747-a8934a9bae74',56,159,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36d33e-f6dd-11f0-b747-a8934a9bae74',56,161,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36d4a4-f6dd-11f0-b747-a8934a9bae74',56,162,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36d635-f6dd-11f0-b747-a8934a9bae74',56,163,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36d819-f6dd-11f0-b747-a8934a9bae74',56,164,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36da11-f6dd-11f0-b747-a8934a9bae74',56,165,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36dba3-f6dd-11f0-b747-a8934a9bae74',56,167,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36dd5b-f6dd-11f0-b747-a8934a9bae74',56,169,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36e27f-f6dd-11f0-b747-a8934a9bae74',58,134,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36e453-f6dd-11f0-b747-a8934a9bae74',58,135,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36e632-f6dd-11f0-b747-a8934a9bae74',58,137,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36e7c1-f6dd-11f0-b747-a8934a9bae74',58,139,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36e944-f6dd-11f0-b747-a8934a9bae74',58,141,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36eab5-f6dd-11f0-b747-a8934a9bae74',58,143,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36ec0d-f6dd-11f0-b747-a8934a9bae74',58,145,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36ed7b-f6dd-11f0-b747-a8934a9bae74',58,146,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36eef2-f6dd-11f0-b747-a8934a9bae74',58,147,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36f0c5-f6dd-11f0-b747-a8934a9bae74',58,149,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36f268-f6dd-11f0-b747-a8934a9bae74',58,150,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36f4a2-f6dd-11f0-b747-a8934a9bae74',58,164,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36f6a2-f6dd-11f0-b747-a8934a9bae74',58,165,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36f833-f6dd-11f0-b747-a8934a9bae74',58,167,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36f9fd-f6dd-11f0-b747-a8934a9bae74',58,169,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce36feb5-f6dd-11f0-b747-a8934a9bae74',60,134,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce370073-f6dd-11f0-b747-a8934a9bae74',60,135,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce370206-f6dd-11f0-b747-a8934a9bae74',60,137,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce370379-f6dd-11f0-b747-a8934a9bae74',60,139,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3704d3-f6dd-11f0-b747-a8934a9bae74',60,141,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37062d-f6dd-11f0-b747-a8934a9bae74',60,143,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3707e6-f6dd-11f0-b747-a8934a9bae74',60,145,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3709c3-f6dd-11f0-b747-a8934a9bae74',60,146,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce370b28-f6dd-11f0-b747-a8934a9bae74',60,147,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce370cc6-f6dd-11f0-b747-a8934a9bae74',60,149,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce370e31-f6dd-11f0-b747-a8934a9bae74',60,150,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce371043-f6dd-11f0-b747-a8934a9bae74',60,151,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3711cd-f6dd-11f0-b747-a8934a9bae74',60,153,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3713a1-f6dd-11f0-b747-a8934a9bae74',60,155,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37151e-f6dd-11f0-b747-a8934a9bae74',60,157,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce371680-f6dd-11f0-b747-a8934a9bae74',60,159,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3717e7-f6dd-11f0-b747-a8934a9bae74',60,161,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37194f-f6dd-11f0-b747-a8934a9bae74',60,162,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce371ad0-f6dd-11f0-b747-a8934a9bae74',60,163,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce371d2d-f6dd-11f0-b747-a8934a9bae74',60,165,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce371ec5-f6dd-11f0-b747-a8934a9bae74',60,167,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce372088-f6dd-11f0-b747-a8934a9bae74',60,169,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3724d1-f6dd-11f0-b747-a8934a9bae74',62,134,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce372744-f6dd-11f0-b747-a8934a9bae74',62,135,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3728da-f6dd-11f0-b747-a8934a9bae74',62,137,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce372a5d-f6dd-11f0-b747-a8934a9bae74',62,139,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce372be2-f6dd-11f0-b747-a8934a9bae74',62,141,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce372dfd-f6dd-11f0-b747-a8934a9bae74',62,143,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce372f87-f6dd-11f0-b747-a8934a9bae74',62,145,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce373115-f6dd-11f0-b747-a8934a9bae74',62,146,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37329c-f6dd-11f0-b747-a8934a9bae74',62,147,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37342f-f6dd-11f0-b747-a8934a9bae74',62,149,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3735e0-f6dd-11f0-b747-a8934a9bae74',62,150,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3737e5-f6dd-11f0-b747-a8934a9bae74',62,151,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3739b5-f6dd-11f0-b747-a8934a9bae74',62,153,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce373b3c-f6dd-11f0-b747-a8934a9bae74',62,155,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce373cc2-f6dd-11f0-b747-a8934a9bae74',62,157,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce373e54-f6dd-11f0-b747-a8934a9bae74',62,159,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce373fd1-f6dd-11f0-b747-a8934a9bae74',62,161,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37418b-f6dd-11f0-b747-a8934a9bae74',62,162,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce374302-f6dd-11f0-b747-a8934a9bae74',62,163,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3744fc-f6dd-11f0-b747-a8934a9bae74',62,164,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3749ab-f6dd-11f0-b747-a8934a9bae74',69,175,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce374b5d-f6dd-11f0-b747-a8934a9bae74',69,176,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce374dc3-f6dd-11f0-b747-a8934a9bae74',71,170,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce374f71-f6dd-11f0-b747-a8934a9bae74',71,171,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3750f1-f6dd-11f0-b747-a8934a9bae74',71,172,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37526d-f6dd-11f0-b747-a8934a9bae74',71,173,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37575a-f6dd-11f0-b747-a8934a9bae74',79,192,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37592a-f6dd-11f0-b747-a8934a9bae74',79,193,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce375ac8-f6dd-11f0-b747-a8934a9bae74',79,194,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce375c72-f6dd-11f0-b747-a8934a9bae74',79,195,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce375dfc-f6dd-11f0-b747-a8934a9bae74',79,196,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3760b7-f6dd-11f0-b747-a8934a9bae74',79,197,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce376278-f6dd-11f0-b747-a8934a9bae74',79,198,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3763f9-f6dd-11f0-b747-a8934a9bae74',79,199,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37ab55-f6dd-11f0-b747-a8934a9bae74',79,201,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37ada9-f6dd-11f0-b747-a8934a9bae74',79,203,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37b0e4-f6dd-11f0-b747-a8934a9bae74',82,184,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37b2b5-f6dd-11f0-b747-a8934a9bae74',82,186,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37b44a-f6dd-11f0-b747-a8934a9bae74',82,187,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37b5d9-f6dd-11f0-b747-a8934a9bae74',82,188,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37b806-f6dd-11f0-b747-a8934a9bae74',82,190,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37bb49-f6dd-11f0-b747-a8934a9bae74',82,197,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37bd00-f6dd-11f0-b747-a8934a9bae74',82,198,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37be8a-f6dd-11f0-b747-a8934a9bae74',82,199,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37c0d0-f6dd-11f0-b747-a8934a9bae74',82,201,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37c24e-f6dd-11f0-b747-a8934a9bae74',82,203,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37c586-f6dd-11f0-b747-a8934a9bae74',86,184,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37c748-f6dd-11f0-b747-a8934a9bae74',86,186,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37c8cb-f6dd-11f0-b747-a8934a9bae74',86,187,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37ca55-f6dd-11f0-b747-a8934a9bae74',86,188,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37cdc5-f6dd-11f0-b747-a8934a9bae74',86,190,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37d044-f6dd-11f0-b747-a8934a9bae74',86,192,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37d1ff-f6dd-11f0-b747-a8934a9bae74',86,193,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37d3b2-f6dd-11f0-b747-a8934a9bae74',86,194,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37d53e-f6dd-11f0-b747-a8934a9bae74',86,195,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37d6c7-f6dd-11f0-b747-a8934a9bae74',86,196,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37d99d-f6dd-11f0-b747-a8934a9bae74',86,201,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37db49-f6dd-11f0-b747-a8934a9bae74',86,203,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37df37-f6dd-11f0-b747-a8934a9bae74',88,184,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37e128-f6dd-11f0-b747-a8934a9bae74',88,186,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37e2b2-f6dd-11f0-b747-a8934a9bae74',88,187,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37e42f-f6dd-11f0-b747-a8934a9bae74',88,188,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37e68a-f6dd-11f0-b747-a8934a9bae74',88,190,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37e929-f6dd-11f0-b747-a8934a9bae74',88,192,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37eacc-f6dd-11f0-b747-a8934a9bae74',88,193,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37ec85-f6dd-11f0-b747-a8934a9bae74',88,194,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37edfe-f6dd-11f0-b747-a8934a9bae74',88,195,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37ef67-f6dd-11f0-b747-a8934a9bae74',88,196,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37f235-f6dd-11f0-b747-a8934a9bae74',88,197,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37f3da-f6dd-11f0-b747-a8934a9bae74',88,198,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37f570-f6dd-11f0-b747-a8934a9bae74',88,199,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37fbba-f6dd-11f0-b747-a8934a9bae74',98,211,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce37fe5f-f6dd-11f0-b747-a8934a9bae74',98,213,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce380017-f6dd-11f0-b747-a8934a9bae74',98,214,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38036d-f6dd-11f0-b747-a8934a9bae74',98,215,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38051a-f6dd-11f0-b747-a8934a9bae74',98,216,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38069d-f6dd-11f0-b747-a8934a9bae74',98,217,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce380977-f6dd-11f0-b747-a8934a9bae74',100,209,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce380b5b-f6dd-11f0-b747-a8934a9bae74',100,210,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce380e6c-f6dd-11f0-b747-a8934a9bae74',100,215,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce380ff2-f6dd-11f0-b747-a8934a9bae74',100,216,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce381158-f6dd-11f0-b747-a8934a9bae74',100,217,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3813f2-f6dd-11f0-b747-a8934a9bae74',102,209,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce381594-f6dd-11f0-b747-a8934a9bae74',102,210,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38178d-f6dd-11f0-b747-a8934a9bae74',102,211,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce381954-f6dd-11f0-b747-a8934a9bae74',102,213,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce381af6-f6dd-11f0-b747-a8934a9bae74',102,214,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce381d89-f6dd-11f0-b747-a8934a9bae74',102,215,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce381f35-f6dd-11f0-b747-a8934a9bae74',102,216,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3820ce-f6dd-11f0-b747-a8934a9bae74',102,217,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce382371-f6dd-11f0-b747-a8934a9bae74',103,209,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38251a-f6dd-11f0-b747-a8934a9bae74',103,210,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38272c-f6dd-11f0-b747-a8934a9bae74',103,211,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3828bb-f6dd-11f0-b747-a8934a9bae74',103,213,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce382a3c-f6dd-11f0-b747-a8934a9bae74',103,214,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce382d19-f6dd-11f0-b747-a8934a9bae74',103,215,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce382ebf-f6dd-11f0-b747-a8934a9bae74',103,216,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce383046-f6dd-11f0-b747-a8934a9bae74',103,217,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce383306-f6dd-11f0-b747-a8934a9bae74',104,209,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce383564-f6dd-11f0-b747-a8934a9bae74',104,210,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38376b-f6dd-11f0-b747-a8934a9bae74',104,211,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce383921-f6dd-11f0-b747-a8934a9bae74',104,213,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce383aab-f6dd-11f0-b747-a8934a9bae74',104,214,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce383f99-f6dd-11f0-b747-a8934a9bae74',106,221,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce384162-f6dd-11f0-b747-a8934a9bae74',106,223,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3843fa-f6dd-11f0-b747-a8934a9bae74',106,225,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce384594-f6dd-11f0-b747-a8934a9bae74',106,226,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38480a-f6dd-11f0-b747-a8934a9bae74',108,218,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3849a2-f6dd-11f0-b747-a8934a9bae74',108,220,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce384e70-f6dd-11f0-b747-a8934a9bae74',108,221,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38502d-f6dd-11f0-b747-a8934a9bae74',108,223,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38529b-f6dd-11f0-b747-a8934a9bae74',108,225,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38545c-f6dd-11f0-b747-a8934a9bae74',108,226,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3856e1-f6dd-11f0-b747-a8934a9bae74',111,218,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce385872-f6dd-11f0-b747-a8934a9bae74',111,220,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce385c88-f6dd-11f0-b747-a8934a9bae74',111,225,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce385e2f-f6dd-11f0-b747-a8934a9bae74',111,226,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3860b1-f6dd-11f0-b747-a8934a9bae74',114,218,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce386252-f6dd-11f0-b747-a8934a9bae74',114,220,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce386553-f6dd-11f0-b747-a8934a9bae74',114,221,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3866f1-f6dd-11f0-b747-a8934a9bae74',114,223,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce386a4d-f6dd-11f0-b747-a8934a9bae74',117,231,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce386bfd-f6dd-11f0-b747-a8934a9bae74',117,232,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce386d98-f6dd-11f0-b747-a8934a9bae74',117,233,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3870b7-f6dd-11f0-b747-a8934a9bae74',119,227,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce387266-f6dd-11f0-b747-a8934a9bae74',119,229,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3873ee-f6dd-11f0-b747-a8934a9bae74',119,230,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38768e-f6dd-11f0-b747-a8934a9bae74',121,236,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38bebc-f6dd-11f0-b747-a8934a9bae74',121,237,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38c332-f6dd-11f0-b747-a8934a9bae74',123,234,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38c50c-f6dd-11f0-b747-a8934a9bae74',123,235,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38cad9-f6dd-11f0-b747-a8934a9bae74',133,239,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38ce7b-f6dd-11f0-b747-a8934a9bae74',135,243,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38d04f-f6dd-11f0-b747-a8934a9bae74',135,244,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38d230-f6dd-11f0-b747-a8934a9bae74',135,245,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38d45a-f6dd-11f0-b747-a8934a9bae74',135,246,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38d628-f6dd-11f0-b747-a8934a9bae74',135,247,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38d7e1-f6dd-11f0-b747-a8934a9bae74',135,248,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38da08-f6dd-11f0-b747-a8934a9bae74',135,249,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38dbca-f6dd-11f0-b747-a8934a9bae74',135,250,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38dd7c-f6dd-11f0-b747-a8934a9bae74',135,252,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38df90-f6dd-11f0-b747-a8934a9bae74',135,253,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38e14a-f6dd-11f0-b747-a8934a9bae74',135,254,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38e312-f6dd-11f0-b747-a8934a9bae74',135,255,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38e6ab-f6dd-11f0-b747-a8934a9bae74',137,240,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38e887-f6dd-11f0-b747-a8934a9bae74',137,242,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38eab6-f6dd-11f0-b747-a8934a9bae74',137,246,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38ec7d-f6dd-11f0-b747-a8934a9bae74',137,247,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38ee35-f6dd-11f0-b747-a8934a9bae74',137,248,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce38f069-f6dd-11f0-b747-a8934a9bae74',137,249,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce393147-f6dd-11f0-b747-a8934a9bae74',137,250,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39343e-f6dd-11f0-b747-a8934a9bae74',137,252,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3936dd-f6dd-11f0-b747-a8934a9bae74',137,253,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39389e-f6dd-11f0-b747-a8934a9bae74',137,254,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce393a41-f6dd-11f0-b747-a8934a9bae74',137,255,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce393e12-f6dd-11f0-b747-a8934a9bae74',139,240,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39400d-f6dd-11f0-b747-a8934a9bae74',139,242,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39422c-f6dd-11f0-b747-a8934a9bae74',139,243,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce394415-f6dd-11f0-b747-a8934a9bae74',139,244,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3945ba-f6dd-11f0-b747-a8934a9bae74',139,245,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3947c1-f6dd-11f0-b747-a8934a9bae74',139,249,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce394973-f6dd-11f0-b747-a8934a9bae74',139,250,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce394b00-f6dd-11f0-b747-a8934a9bae74',139,252,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce394d1f-f6dd-11f0-b747-a8934a9bae74',139,253,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce394ea6-f6dd-11f0-b747-a8934a9bae74',139,254,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce395048-f6dd-11f0-b747-a8934a9bae74',139,255,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39544c-f6dd-11f0-b747-a8934a9bae74',141,240,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39566b-f6dd-11f0-b747-a8934a9bae74',141,242,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce395880-f6dd-11f0-b747-a8934a9bae74',141,243,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce395abb-f6dd-11f0-b747-a8934a9bae74',141,244,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce395cb9-f6dd-11f0-b747-a8934a9bae74',141,245,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce395f20-f6dd-11f0-b747-a8934a9bae74',141,246,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3963b3-f6dd-11f0-b747-a8934a9bae74',141,247,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39659a-f6dd-11f0-b747-a8934a9bae74',141,248,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3967b8-f6dd-11f0-b747-a8934a9bae74',141,253,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce396967-f6dd-11f0-b747-a8934a9bae74',141,254,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce396af2-f6dd-11f0-b747-a8934a9bae74',141,255,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce396f78-f6dd-11f0-b747-a8934a9bae74',143,240,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce397170-f6dd-11f0-b747-a8934a9bae74',143,242,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39738e-f6dd-11f0-b747-a8934a9bae74',143,243,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39752b-f6dd-11f0-b747-a8934a9bae74',143,244,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3976a5-f6dd-11f0-b747-a8934a9bae74',143,245,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3978be-f6dd-11f0-b747-a8934a9bae74',143,246,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce397a6c-f6dd-11f0-b747-a8934a9bae74',143,247,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce397c00-f6dd-11f0-b747-a8934a9bae74',143,248,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce397e2a-f6dd-11f0-b747-a8934a9bae74',143,249,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce397ff0-f6dd-11f0-b747-a8934a9bae74',143,250,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce398194-f6dd-11f0-b747-a8934a9bae74',143,252,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce398870-f6dd-11f0-b747-a8934a9bae74',150,256,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce398a68-f6dd-11f0-b747-a8934a9bae74',150,257,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce398d5f-f6dd-11f0-b747-a8934a9bae74',151,263,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce398f25-f6dd-11f0-b747-a8934a9bae74',151,265,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3990ed-f6dd-11f0-b747-a8934a9bae74',151,267,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce399321-f6dd-11f0-b747-a8934a9bae74',151,268,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3994da-f6dd-11f0-b747-a8934a9bae74',151,270,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39972a-f6dd-11f0-b747-a8934a9bae74',151,271,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3998e9-f6dd-11f0-b747-a8934a9bae74',151,272,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce399b33-f6dd-11f0-b747-a8934a9bae74',151,273,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce399cfb-f6dd-11f0-b747-a8934a9bae74',151,274,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39a097-f6dd-11f0-b747-a8934a9bae74',153,258,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39a2b0-f6dd-11f0-b747-a8934a9bae74',153,260,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39a43b-f6dd-11f0-b747-a8934a9bae74',153,262,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39a647-f6dd-11f0-b747-a8934a9bae74',153,268,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39a7e0-f6dd-11f0-b747-a8934a9bae74',153,270,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39aa04-f6dd-11f0-b747-a8934a9bae74',153,271,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39ab82-f6dd-11f0-b747-a8934a9bae74',153,272,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39ad8f-f6dd-11f0-b747-a8934a9bae74',153,273,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39af2e-f6dd-11f0-b747-a8934a9bae74',153,274,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39b323-f6dd-11f0-b747-a8934a9bae74',155,258,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39b4e6-f6dd-11f0-b747-a8934a9bae74',155,260,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39b68a-f6dd-11f0-b747-a8934a9bae74',155,262,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39b8a5-f6dd-11f0-b747-a8934a9bae74',155,263,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39ba52-f6dd-11f0-b747-a8934a9bae74',155,265,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39bbf3-f6dd-11f0-b747-a8934a9bae74',155,267,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39c09b-f6dd-11f0-b747-a8934a9bae74',155,271,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39c27e-f6dd-11f0-b747-a8934a9bae74',155,272,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39c49d-f6dd-11f0-b747-a8934a9bae74',155,273,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39c62d-f6dd-11f0-b747-a8934a9bae74',155,274,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39c9a4-f6dd-11f0-b747-a8934a9bae74',157,258,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39cb6a-f6dd-11f0-b747-a8934a9bae74',157,260,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39cd35-f6dd-11f0-b747-a8934a9bae74',157,262,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce39cf6c-f6dd-11f0-b747-a8934a9bae74',157,263,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a11ba-f6dd-11f0-b747-a8934a9bae74',157,265,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a1470-f6dd-11f0-b747-a8934a9bae74',157,267,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a1707-f6dd-11f0-b747-a8934a9bae74',157,268,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a18c3-f6dd-11f0-b747-a8934a9bae74',157,270,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a1b08-f6dd-11f0-b747-a8934a9bae74',157,273,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a1cd5-f6dd-11f0-b747-a8934a9bae74',157,274,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a2096-f6dd-11f0-b747-a8934a9bae74',159,258,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a2367-f6dd-11f0-b747-a8934a9bae74',159,260,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a252e-f6dd-11f0-b747-a8934a9bae74',159,262,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a2769-f6dd-11f0-b747-a8934a9bae74',159,263,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a2924-f6dd-11f0-b747-a8934a9bae74',159,265,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a2ac9-f6dd-11f0-b747-a8934a9bae74',159,267,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a2d8f-f6dd-11f0-b747-a8934a9bae74',159,268,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a2f44-f6dd-11f0-b747-a8934a9bae74',159,270,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a3177-f6dd-11f0-b747-a8934a9bae74',159,271,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a333f-f6dd-11f0-b747-a8934a9bae74',159,272,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a3739-f6dd-11f0-b747-a8934a9bae74',165,278,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a3917-f6dd-11f0-b747-a8934a9bae74',165,279,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a3c08-f6dd-11f0-b747-a8934a9bae74',167,275,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a3dcc-f6dd-11f0-b747-a8934a9bae74',167,276,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a882c-f6dd-11f0-b747-a8934a9bae74',167,277,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a8d72-f6dd-11f0-b747-a8934a9bae74',169,275,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a905d-f6dd-11f0-b747-a8934a9bae74',169,276,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a91f3-f6dd-11f0-b747-a8934a9bae74',169,277,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a93f0-f6dd-11f0-b747-a8934a9bae74',169,278,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a95c6-f6dd-11f0-b747-a8934a9bae74',169,279,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a9cac-f6dd-11f0-b747-a8934a9bae74',184,290,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a9df8-f6dd-11f0-b747-a8934a9bae74',184,291,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3a9f60-f6dd-11f0-b747-a8934a9bae74',184,292,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3aa05a-f6dd-11f0-b747-a8934a9bae74',184,293,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3aa159-f6dd-11f0-b747-a8934a9bae74',184,294,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3aa305-f6dd-11f0-b747-a8934a9bae74',188,287,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3aa403-f6dd-11f0-b747-a8934a9bae74',188,289,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3aa5b5-f6dd-11f0-b747-a8934a9bae74',188,292,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3aa6aa-f6dd-11f0-b747-a8934a9bae74',188,293,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3aa7a7-f6dd-11f0-b747-a8934a9bae74',188,294,'LQH_BAC_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3aa921-f6dd-11f0-b747-a8934a9bae74',190,287,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3aaa2d-f6dd-11f0-b747-a8934a9bae74',190,289,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3aabdd-f6dd-11f0-b747-a8934a9bae74',190,290,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3aacdb-f6dd-11f0-b747-a8934a9bae74',190,291,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ab5f5-f6dd-11f0-b747-a8934a9bae74',223,298,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ac3ea-f6dd-11f0-b747-a8934a9bae74',260,299,'LQH_CHU_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ae863-f6dd-11f0-b747-a8934a9bae74',5,6,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3aece7-f6dd-11f0-b747-a8934a9bae74',9,25,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3aee32-f6dd-11f0-b747-a8934a9bae74',9,26,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3aef48-f6dd-11f0-b747-a8934a9bae74',9,28,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3af053-f6dd-11f0-b747-a8934a9bae74',9,30,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3af160-f6dd-11f0-b747-a8934a9bae74',9,31,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3af277-f6dd-11f0-b747-a8934a9bae74',9,32,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3af37d-f6dd-11f0-b747-a8934a9bae74',9,33,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3af486-f6dd-11f0-b747-a8934a9bae74',9,34,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3af58a-f6dd-11f0-b747-a8934a9bae74',9,36,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3af6ee-f6dd-11f0-b747-a8934a9bae74',9,38,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3af84d-f6dd-11f0-b747-a8934a9bae74',9,40,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3af959-f6dd-11f0-b747-a8934a9bae74',9,41,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3afa61-f6dd-11f0-b747-a8934a9bae74',9,42,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3afb67-f6dd-11f0-b747-a8934a9bae74',9,43,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3afc70-f6dd-11f0-b747-a8934a9bae74',9,44,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3afd6e-f6dd-11f0-b747-a8934a9bae74',9,45,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3aff31-f6dd-11f0-b747-a8934a9bae74',9,46,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b00d6-f6dd-11f0-b747-a8934a9bae74',9,48,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b01e9-f6dd-11f0-b747-a8934a9bae74',9,50,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b02e9-f6dd-11f0-b747-a8934a9bae74',9,52,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b03de-f6dd-11f0-b747-a8934a9bae74',9,54,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b053d-f6dd-11f0-b747-a8934a9bae74',9,56,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b0636-f6dd-11f0-b747-a8934a9bae74',9,58,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b0725-f6dd-11f0-b747-a8934a9bae74',9,60,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b0817-f6dd-11f0-b747-a8934a9bae74',9,62,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b0909-f6dd-11f0-b747-a8934a9bae74',9,64,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b09f6-f6dd-11f0-b747-a8934a9bae74',9,65,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b0aec-f6dd-11f0-b747-a8934a9bae74',9,66,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b0c08-f6dd-11f0-b747-a8934a9bae74',9,67,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b0d09-f6dd-11f0-b747-a8934a9bae74',9,68,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b0df8-f6dd-11f0-b747-a8934a9bae74',9,69,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b0ef2-f6dd-11f0-b747-a8934a9bae74',9,71,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b10f9-f6dd-11f0-b747-a8934a9bae74',10,25,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b1203-f6dd-11f0-b747-a8934a9bae74',10,26,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b12f3-f6dd-11f0-b747-a8934a9bae74',10,28,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b13d0-f6dd-11f0-b747-a8934a9bae74',10,30,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b14b0-f6dd-11f0-b747-a8934a9bae74',10,31,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b158e-f6dd-11f0-b747-a8934a9bae74',10,32,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b166b-f6dd-11f0-b747-a8934a9bae74',10,33,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b1745-f6dd-11f0-b747-a8934a9bae74',10,34,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b1824-f6dd-11f0-b747-a8934a9bae74',10,36,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b194a-f6dd-11f0-b747-a8934a9bae74',10,38,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b1a75-f6dd-11f0-b747-a8934a9bae74',10,40,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b1b66-f6dd-11f0-b747-a8934a9bae74',10,41,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b1c49-f6dd-11f0-b747-a8934a9bae74',10,42,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b1d22-f6dd-11f0-b747-a8934a9bae74',10,43,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b1dfc-f6dd-11f0-b747-a8934a9bae74',10,44,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b1ed5-f6dd-11f0-b747-a8934a9bae74',10,45,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b1fad-f6dd-11f0-b747-a8934a9bae74',10,46,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b208d-f6dd-11f0-b747-a8934a9bae74',10,48,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b216b-f6dd-11f0-b747-a8934a9bae74',10,50,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b225c-f6dd-11f0-b747-a8934a9bae74',10,52,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b748f-f6dd-11f0-b747-a8934a9bae74',10,54,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b77d4-f6dd-11f0-b747-a8934a9bae74',10,56,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b7989-f6dd-11f0-b747-a8934a9bae74',10,58,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b7b23-f6dd-11f0-b747-a8934a9bae74',10,60,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b7c9c-f6dd-11f0-b747-a8934a9bae74',10,62,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b7e1a-f6dd-11f0-b747-a8934a9bae74',10,64,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b8095-f6dd-11f0-b747-a8934a9bae74',10,65,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b8231-f6dd-11f0-b747-a8934a9bae74',10,66,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b83e1-f6dd-11f0-b747-a8934a9bae74',10,67,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b857b-f6dd-11f0-b747-a8934a9bae74',10,68,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b8706-f6dd-11f0-b747-a8934a9bae74',10,69,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b8893-f6dd-11f0-b747-a8934a9bae74',10,71,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b8c23-f6dd-11f0-b747-a8934a9bae74',11,25,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b8df0-f6dd-11f0-b747-a8934a9bae74',11,26,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b8f8f-f6dd-11f0-b747-a8934a9bae74',11,28,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b9125-f6dd-11f0-b747-a8934a9bae74',11,30,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3b92bd-f6dd-11f0-b747-a8934a9bae74',11,31,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3be5b4-f6dd-11f0-b747-a8934a9bae74',11,32,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3be835-f6dd-11f0-b747-a8934a9bae74',11,33,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3be944-f6dd-11f0-b747-a8934a9bae74',11,34,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bea55-f6dd-11f0-b747-a8934a9bae74',11,36,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bebf6-f6dd-11f0-b747-a8934a9bae74',11,38,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bed39-f6dd-11f0-b747-a8934a9bae74',11,40,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bee50-f6dd-11f0-b747-a8934a9bae74',11,41,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bef46-f6dd-11f0-b747-a8934a9bae74',11,42,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bf025-f6dd-11f0-b747-a8934a9bae74',11,43,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bf104-f6dd-11f0-b747-a8934a9bae74',11,44,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bf1fb-f6dd-11f0-b747-a8934a9bae74',11,45,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bf2de-f6dd-11f0-b747-a8934a9bae74',11,46,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bf3be-f6dd-11f0-b747-a8934a9bae74',11,48,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bf4a7-f6dd-11f0-b747-a8934a9bae74',11,50,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bf588-f6dd-11f0-b747-a8934a9bae74',11,52,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bf665-f6dd-11f0-b747-a8934a9bae74',11,54,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bf7c0-f6dd-11f0-b747-a8934a9bae74',11,56,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bf8bf-f6dd-11f0-b747-a8934a9bae74',11,58,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bf9b6-f6dd-11f0-b747-a8934a9bae74',11,60,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bfaa8-f6dd-11f0-b747-a8934a9bae74',11,62,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bfb8b-f6dd-11f0-b747-a8934a9bae74',11,64,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bfc6a-f6dd-11f0-b747-a8934a9bae74',11,65,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bfd4c-f6dd-11f0-b747-a8934a9bae74',11,66,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bfe37-f6dd-11f0-b747-a8934a9bae74',11,67,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bff16-f6dd-11f0-b747-a8934a9bae74',11,68,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3bfff5-f6dd-11f0-b747-a8934a9bae74',11,69,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c00e5-f6dd-11f0-b747-a8934a9bae74',11,71,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c0a7c-f6dd-11f0-b747-a8934a9bae74',31,78,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c0e02-f6dd-11f0-b747-a8934a9bae74',31,79,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c0f2e-f6dd-11f0-b747-a8934a9bae74',31,81,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c1024-f6dd-11f0-b747-a8934a9bae74',31,82,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c1109-f6dd-11f0-b747-a8934a9bae74',31,84,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c1237-f6dd-11f0-b747-a8934a9bae74',31,85,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c1320-f6dd-11f0-b747-a8934a9bae74',31,86,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c1425-f6dd-11f0-b747-a8934a9bae74',31,88,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c1568-f6dd-11f0-b747-a8934a9bae74',31,90,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c165d-f6dd-11f0-b747-a8934a9bae74',31,91,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c174f-f6dd-11f0-b747-a8934a9bae74',31,92,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c1837-f6dd-11f0-b747-a8934a9bae74',31,94,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c191a-f6dd-11f0-b747-a8934a9bae74',31,95,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c19f6-f6dd-11f0-b747-a8934a9bae74',31,96,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c1c6b-f6dd-11f0-b747-a8934a9bae74',32,78,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c1d5d-f6dd-11f0-b747-a8934a9bae74',32,79,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c1e3c-f6dd-11f0-b747-a8934a9bae74',32,81,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c1f16-f6dd-11f0-b747-a8934a9bae74',32,82,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c2018-f6dd-11f0-b747-a8934a9bae74',32,84,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c20fa-f6dd-11f0-b747-a8934a9bae74',32,85,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c2266-f6dd-11f0-b747-a8934a9bae74',32,86,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c234a-f6dd-11f0-b747-a8934a9bae74',32,88,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c2474-f6dd-11f0-b747-a8934a9bae74',32,90,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c255a-f6dd-11f0-b747-a8934a9bae74',32,91,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c266c-f6dd-11f0-b747-a8934a9bae74',32,92,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c274f-f6dd-11f0-b747-a8934a9bae74',32,94,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c283b-f6dd-11f0-b747-a8934a9bae74',32,95,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c2925-f6dd-11f0-b747-a8934a9bae74',32,96,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c2b7e-f6dd-11f0-b747-a8934a9bae74',33,78,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c7d96-f6dd-11f0-b747-a8934a9bae74',33,79,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c8035-f6dd-11f0-b747-a8934a9bae74',33,81,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c81f0-f6dd-11f0-b747-a8934a9bae74',33,82,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c836e-f6dd-11f0-b747-a8934a9bae74',33,84,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c851c-f6dd-11f0-b747-a8934a9bae74',33,85,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c86de-f6dd-11f0-b747-a8934a9bae74',33,86,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c8885-f6dd-11f0-b747-a8934a9bae74',33,88,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c8b0e-f6dd-11f0-b747-a8934a9bae74',33,90,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c8cbc-f6dd-11f0-b747-a8934a9bae74',33,91,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c8e47-f6dd-11f0-b747-a8934a9bae74',33,92,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c8fe0-f6dd-11f0-b747-a8934a9bae74',33,94,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c917e-f6dd-11f0-b747-a8934a9bae74',33,95,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c9323-f6dd-11f0-b747-a8934a9bae74',33,96,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c9c03-f6dd-11f0-b747-a8934a9bae74',44,121,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c9df5-f6dd-11f0-b747-a8934a9bae74',44,123,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3c9fbf-f6dd-11f0-b747-a8934a9bae74',44,125,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ca223-f6dd-11f0-b747-a8934a9bae74',44,126,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ca3e6-f6dd-11f0-b747-a8934a9bae74',44,127,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ca575-f6dd-11f0-b747-a8934a9bae74',44,129,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ca76c-f6dd-11f0-b747-a8934a9bae74',44,130,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ca8ec-f6dd-11f0-b747-a8934a9bae74',44,131,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3caa60-f6dd-11f0-b747-a8934a9bae74',44,133,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d0d45-f6dd-11f0-b747-a8934a9bae74',45,121,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d0f8c-f6dd-11f0-b747-a8934a9bae74',45,123,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d109f-f6dd-11f0-b747-a8934a9bae74',45,125,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d1231-f6dd-11f0-b747-a8934a9bae74',45,126,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d1337-f6dd-11f0-b747-a8934a9bae74',45,127,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d1451-f6dd-11f0-b747-a8934a9bae74',45,129,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d160c-f6dd-11f0-b747-a8934a9bae74',45,130,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d1702-f6dd-11f0-b747-a8934a9bae74',45,131,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d17f5-f6dd-11f0-b747-a8934a9bae74',45,133,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d1a55-f6dd-11f0-b747-a8934a9bae74',48,121,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d1b5b-f6dd-11f0-b747-a8934a9bae74',48,123,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d1c52-f6dd-11f0-b747-a8934a9bae74',48,125,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d1e17-f6dd-11f0-b747-a8934a9bae74',48,126,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d2044-f6dd-11f0-b747-a8934a9bae74',48,127,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d2209-f6dd-11f0-b747-a8934a9bae74',48,129,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d23fc-f6dd-11f0-b747-a8934a9bae74',48,130,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d2649-f6dd-11f0-b747-a8934a9bae74',48,131,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d2833-f6dd-11f0-b747-a8934a9bae74',48,133,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d2c10-f6dd-11f0-b747-a8934a9bae74',64,134,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d2d7b-f6dd-11f0-b747-a8934a9bae74',64,135,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d2e6f-f6dd-11f0-b747-a8934a9bae74',64,137,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d2f55-f6dd-11f0-b747-a8934a9bae74',64,139,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d3041-f6dd-11f0-b747-a8934a9bae74',64,141,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d3122-f6dd-11f0-b747-a8934a9bae74',64,143,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d3205-f6dd-11f0-b747-a8934a9bae74',64,145,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d32f2-f6dd-11f0-b747-a8934a9bae74',64,146,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d33d2-f6dd-11f0-b747-a8934a9bae74',64,147,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d38cf-f6dd-11f0-b747-a8934a9bae74',64,149,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d39e4-f6dd-11f0-b747-a8934a9bae74',64,150,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d3b2c-f6dd-11f0-b747-a8934a9bae74',64,151,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d3c15-f6dd-11f0-b747-a8934a9bae74',64,153,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d3cfe-f6dd-11f0-b747-a8934a9bae74',64,155,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d3de3-f6dd-11f0-b747-a8934a9bae74',64,157,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d3ec4-f6dd-11f0-b747-a8934a9bae74',64,159,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d3fa9-f6dd-11f0-b747-a8934a9bae74',64,161,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d408b-f6dd-11f0-b747-a8934a9bae74',64,162,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d4168-f6dd-11f0-b747-a8934a9bae74',64,163,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d4293-f6dd-11f0-b747-a8934a9bae74',64,164,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d43d7-f6dd-11f0-b747-a8934a9bae74',64,165,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d44c3-f6dd-11f0-b747-a8934a9bae74',64,167,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d460e-f6dd-11f0-b747-a8934a9bae74',64,169,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d4882-f6dd-11f0-b747-a8934a9bae74',65,134,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d497d-f6dd-11f0-b747-a8934a9bae74',65,135,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d4a5e-f6dd-11f0-b747-a8934a9bae74',65,137,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d4b43-f6dd-11f0-b747-a8934a9bae74',65,139,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d4c27-f6dd-11f0-b747-a8934a9bae74',65,141,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d4d07-f6dd-11f0-b747-a8934a9bae74',65,143,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d4de2-f6dd-11f0-b747-a8934a9bae74',65,145,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d4ed0-f6dd-11f0-b747-a8934a9bae74',65,146,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d4fad-f6dd-11f0-b747-a8934a9bae74',65,147,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d508b-f6dd-11f0-b747-a8934a9bae74',65,149,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d5197-f6dd-11f0-b747-a8934a9bae74',65,150,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d5311-f6dd-11f0-b747-a8934a9bae74',65,151,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d5403-f6dd-11f0-b747-a8934a9bae74',65,153,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d54e1-f6dd-11f0-b747-a8934a9bae74',65,155,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d55be-f6dd-11f0-b747-a8934a9bae74',65,157,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d56a6-f6dd-11f0-b747-a8934a9bae74',65,159,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d5796-f6dd-11f0-b747-a8934a9bae74',65,161,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d5875-f6dd-11f0-b747-a8934a9bae74',65,162,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d594e-f6dd-11f0-b747-a8934a9bae74',65,163,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d5a73-f6dd-11f0-b747-a8934a9bae74',65,164,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d5b9a-f6dd-11f0-b747-a8934a9bae74',65,165,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d5c7a-f6dd-11f0-b747-a8934a9bae74',65,167,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d5d7c-f6dd-11f0-b747-a8934a9bae74',65,169,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d5fd5-f6dd-11f0-b747-a8934a9bae74',66,134,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d60c6-f6dd-11f0-b747-a8934a9bae74',66,135,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d61a6-f6dd-11f0-b747-a8934a9bae74',66,137,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d6289-f6dd-11f0-b747-a8934a9bae74',66,139,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d6367-f6dd-11f0-b747-a8934a9bae74',66,141,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d6445-f6dd-11f0-b747-a8934a9bae74',66,143,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d6545-f6dd-11f0-b747-a8934a9bae74',66,145,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d6625-f6dd-11f0-b747-a8934a9bae74',66,146,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d6701-f6dd-11f0-b747-a8934a9bae74',66,147,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d67df-f6dd-11f0-b747-a8934a9bae74',66,149,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d68bb-f6dd-11f0-b747-a8934a9bae74',66,150,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d69e0-f6dd-11f0-b747-a8934a9bae74',66,151,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d6ac3-f6dd-11f0-b747-a8934a9bae74',66,153,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d6ba8-f6dd-11f0-b747-a8934a9bae74',66,155,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d6c85-f6dd-11f0-b747-a8934a9bae74',66,157,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d6d61-f6dd-11f0-b747-a8934a9bae74',66,159,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d6e52-f6dd-11f0-b747-a8934a9bae74',66,161,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d6f3b-f6dd-11f0-b747-a8934a9bae74',66,162,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d701e-f6dd-11f0-b747-a8934a9bae74',66,163,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d7146-f6dd-11f0-b747-a8934a9bae74',66,164,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d726d-f6dd-11f0-b747-a8934a9bae74',66,165,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d73a1-f6dd-11f0-b747-a8934a9bae74',66,167,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d7520-f6dd-11f0-b747-a8934a9bae74',66,169,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d7787-f6dd-11f0-b747-a8934a9bae74',67,134,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d787a-f6dd-11f0-b747-a8934a9bae74',67,135,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d795b-f6dd-11f0-b747-a8934a9bae74',67,137,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d7a42-f6dd-11f0-b747-a8934a9bae74',67,139,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d7b1f-f6dd-11f0-b747-a8934a9bae74',67,141,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d7bfe-f6dd-11f0-b747-a8934a9bae74',67,143,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d7cdb-f6dd-11f0-b747-a8934a9bae74',67,145,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3d7db4-f6dd-11f0-b747-a8934a9bae74',67,146,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3dc782-f6dd-11f0-b747-a8934a9bae74',67,147,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3dc9ef-f6dd-11f0-b747-a8934a9bae74',67,149,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3dcb9c-f6dd-11f0-b747-a8934a9bae74',67,150,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3dce23-f6dd-11f0-b747-a8934a9bae74',67,151,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3dcffb-f6dd-11f0-b747-a8934a9bae74',67,153,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3dd19d-f6dd-11f0-b747-a8934a9bae74',67,155,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3dd456-f6dd-11f0-b747-a8934a9bae74',67,157,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3dd5ff-f6dd-11f0-b747-a8934a9bae74',67,159,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3dd78c-f6dd-11f0-b747-a8934a9bae74',67,161,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3dd921-f6dd-11f0-b747-a8934a9bae74',67,162,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ddaa4-f6dd-11f0-b747-a8934a9bae74',67,163,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ddcd8-f6dd-11f0-b747-a8934a9bae74',67,164,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ddef7-f6dd-11f0-b747-a8934a9bae74',67,165,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3de090-f6dd-11f0-b747-a8934a9bae74',67,167,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3de2f4-f6dd-11f0-b747-a8934a9bae74',67,169,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3de761-f6dd-11f0-b747-a8934a9bae74',68,134,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3de950-f6dd-11f0-b747-a8934a9bae74',68,135,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3deaf2-f6dd-11f0-b747-a8934a9bae74',68,137,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3decd2-f6dd-11f0-b747-a8934a9bae74',68,139,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3e4fef-f6dd-11f0-b747-a8934a9bae74',68,141,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3e5249-f6dd-11f0-b747-a8934a9bae74',68,143,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3e5380-f6dd-11f0-b747-a8934a9bae74',68,145,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3e9f14-f6dd-11f0-b747-a8934a9bae74',68,146,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ea27c-f6dd-11f0-b747-a8934a9bae74',68,147,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ea4b7-f6dd-11f0-b747-a8934a9bae74',68,149,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ea751-f6dd-11f0-b747-a8934a9bae74',68,150,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eab4e-f6dd-11f0-b747-a8934a9bae74',68,151,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ead80-f6dd-11f0-b747-a8934a9bae74',68,153,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eaf94-f6dd-11f0-b747-a8934a9bae74',68,155,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eb0aa-f6dd-11f0-b747-a8934a9bae74',68,157,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eb1a8-f6dd-11f0-b747-a8934a9bae74',68,159,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eb296-f6dd-11f0-b747-a8934a9bae74',68,161,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eb382-f6dd-11f0-b747-a8934a9bae74',68,162,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eb4a7-f6dd-11f0-b747-a8934a9bae74',68,163,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eb5f7-f6dd-11f0-b747-a8934a9bae74',68,164,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eb731-f6dd-11f0-b747-a8934a9bae74',68,165,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eb823-f6dd-11f0-b747-a8934a9bae74',68,167,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eb93e-f6dd-11f0-b747-a8934a9bae74',68,169,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ebccf-f6dd-11f0-b747-a8934a9bae74',75,178,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ebe3d-f6dd-11f0-b747-a8934a9bae74',75,179,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ebff7-f6dd-11f0-b747-a8934a9bae74',75,180,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ec177-f6dd-11f0-b747-a8934a9bae74',75,181,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ec2e9-f6dd-11f0-b747-a8934a9bae74',75,182,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ec623-f6dd-11f0-b747-a8934a9bae74',76,178,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ec7de-f6dd-11f0-b747-a8934a9bae74',76,179,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ec95d-f6dd-11f0-b747-a8934a9bae74',76,180,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ecaa3-f6dd-11f0-b747-a8934a9bae74',76,181,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ecba4-f6dd-11f0-b747-a8934a9bae74',76,182,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ecea2-f6dd-11f0-b747-a8934a9bae74',77,178,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ecfd0-f6dd-11f0-b747-a8934a9bae74',77,179,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ed0f7-f6dd-11f0-b747-a8934a9bae74',77,180,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ed1e7-f6dd-11f0-b747-a8934a9bae74',77,181,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ed2ea-f6dd-11f0-b747-a8934a9bae74',77,182,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ed4dc-f6dd-11f0-b747-a8934a9bae74',78,184,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ed5e2-f6dd-11f0-b747-a8934a9bae74',78,186,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ed6e1-f6dd-11f0-b747-a8934a9bae74',78,187,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ed7d7-f6dd-11f0-b747-a8934a9bae74',78,188,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ed8ca-f6dd-11f0-b747-a8934a9bae74',78,190,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eda55-f6dd-11f0-b747-a8934a9bae74',78,192,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3edb4a-f6dd-11f0-b747-a8934a9bae74',78,193,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3edc33-f6dd-11f0-b747-a8934a9bae74',78,194,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3edd1a-f6dd-11f0-b747-a8934a9bae74',78,195,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ede1d-f6dd-11f0-b747-a8934a9bae74',78,196,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3edfc6-f6dd-11f0-b747-a8934a9bae74',78,197,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ee0b8-f6dd-11f0-b747-a8934a9bae74',78,198,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ee1aa-f6dd-11f0-b747-a8934a9bae74',78,199,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ee2e5-f6dd-11f0-b747-a8934a9bae74',78,201,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ee458-f6dd-11f0-b747-a8934a9bae74',78,203,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ee61a-f6dd-11f0-b747-a8934a9bae74',81,184,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ee727-f6dd-11f0-b747-a8934a9bae74',81,186,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ee820-f6dd-11f0-b747-a8934a9bae74',81,187,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ee915-f6dd-11f0-b747-a8934a9bae74',81,188,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eea01-f6dd-11f0-b747-a8934a9bae74',81,190,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eeb49-f6dd-11f0-b747-a8934a9bae74',81,192,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eec3d-f6dd-11f0-b747-a8934a9bae74',81,193,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eed25-f6dd-11f0-b747-a8934a9bae74',81,194,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eee09-f6dd-11f0-b747-a8934a9bae74',81,195,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eeefa-f6dd-11f0-b747-a8934a9bae74',81,196,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ef0b7-f6dd-11f0-b747-a8934a9bae74',81,197,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ef1ac-f6dd-11f0-b747-a8934a9bae74',81,198,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ef291-f6dd-11f0-b747-a8934a9bae74',81,199,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ef585-f6dd-11f0-b747-a8934a9bae74',81,201,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ef67a-f6dd-11f0-b747-a8934a9bae74',81,203,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ef835-f6dd-11f0-b747-a8934a9bae74',84,184,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3ef93e-f6dd-11f0-b747-a8934a9bae74',84,186,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3efa2d-f6dd-11f0-b747-a8934a9bae74',84,187,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3efb17-f6dd-11f0-b747-a8934a9bae74',84,188,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3efc05-f6dd-11f0-b747-a8934a9bae74',84,190,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3efd77-f6dd-11f0-b747-a8934a9bae74',84,192,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3efe77-f6dd-11f0-b747-a8934a9bae74',84,193,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3eff6e-f6dd-11f0-b747-a8934a9bae74',84,194,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3f006a-f6dd-11f0-b747-a8934a9bae74',84,195,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3f0152-f6dd-11f0-b747-a8934a9bae74',84,196,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3f02cd-f6dd-11f0-b747-a8934a9bae74',84,197,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce3f03ba-f6dd-11f0-b747-a8934a9bae74',84,198,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42189f-f6dd-11f0-b747-a8934a9bae74',84,199,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce421cd9-f6dd-11f0-b747-a8934a9bae74',84,201,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce421eda-f6dd-11f0-b747-a8934a9bae74',84,203,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce422181-f6dd-11f0-b747-a8934a9bae74',85,184,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce422305-f6dd-11f0-b747-a8934a9bae74',85,186,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42247b-f6dd-11f0-b747-a8934a9bae74',85,187,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4225f6-f6dd-11f0-b747-a8934a9bae74',85,188,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce422750-f6dd-11f0-b747-a8934a9bae74',85,190,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4229d8-f6dd-11f0-b747-a8934a9bae74',85,192,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce422b53-f6dd-11f0-b747-a8934a9bae74',85,193,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce422ca5-f6dd-11f0-b747-a8934a9bae74',85,194,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce423047-f6dd-11f0-b747-a8934a9bae74',85,195,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4231b9-f6dd-11f0-b747-a8934a9bae74',85,196,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42339a-f6dd-11f0-b747-a8934a9bae74',85,197,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4234af-f6dd-11f0-b747-a8934a9bae74',85,198,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4235e3-f6dd-11f0-b747-a8934a9bae74',85,199,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce423792-f6dd-11f0-b747-a8934a9bae74',85,201,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4238fa-f6dd-11f0-b747-a8934a9bae74',85,203,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce423c2d-f6dd-11f0-b747-a8934a9bae74',90,204,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce423de0-f6dd-11f0-b747-a8934a9bae74',90,205,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce423f57-f6dd-11f0-b747-a8934a9bae74',90,206,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4241a2-f6dd-11f0-b747-a8934a9bae74',90,207,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4244b5-f6dd-11f0-b747-a8934a9bae74',91,204,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42a748-f6dd-11f0-b747-a8934a9bae74',91,205,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42ab62-f6dd-11f0-b747-a8934a9bae74',91,206,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42ae04-f6dd-11f0-b747-a8934a9bae74',91,207,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42b73f-f6dd-11f0-b747-a8934a9bae74',94,204,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42bb2b-f6dd-11f0-b747-a8934a9bae74',94,205,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42bde4-f6dd-11f0-b747-a8934a9bae74',94,206,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42c010-f6dd-11f0-b747-a8934a9bae74',94,207,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42c73a-f6dd-11f0-b747-a8934a9bae74',95,204,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42cb09-f6dd-11f0-b747-a8934a9bae74',95,205,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42cfb5-f6dd-11f0-b747-a8934a9bae74',95,206,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42d1c4-f6dd-11f0-b747-a8934a9bae74',95,207,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42d4d3-f6dd-11f0-b747-a8934a9bae74',96,204,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42d608-f6dd-11f0-b747-a8934a9bae74',96,205,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42d721-f6dd-11f0-b747-a8934a9bae74',96,206,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42d8c0-f6dd-11f0-b747-a8934a9bae74',96,207,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42dbcd-f6dd-11f0-b747-a8934a9bae74',97,209,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42dd0a-f6dd-11f0-b747-a8934a9bae74',97,210,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42de6a-f6dd-11f0-b747-a8934a9bae74',97,211,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42e01e-f6dd-11f0-b747-a8934a9bae74',97,213,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42e135-f6dd-11f0-b747-a8934a9bae74',97,214,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42e325-f6dd-11f0-b747-a8934a9bae74',97,215,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42e54b-f6dd-11f0-b747-a8934a9bae74',97,216,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42e6a6-f6dd-11f0-b747-a8934a9bae74',97,217,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42eaae-f6dd-11f0-b747-a8934a9bae74',109,218,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42ec6b-f6dd-11f0-b747-a8934a9bae74',109,220,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42ee56-f6dd-11f0-b747-a8934a9bae74',109,221,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42ef84-f6dd-11f0-b747-a8934a9bae74',109,223,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42f111-f6dd-11f0-b747-a8934a9bae74',109,225,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42f25f-f6dd-11f0-b747-a8934a9bae74',109,226,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42f49c-f6dd-11f0-b747-a8934a9bae74',110,218,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42f5c1-f6dd-11f0-b747-a8934a9bae74',110,220,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42f7c4-f6dd-11f0-b747-a8934a9bae74',110,221,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42f8dc-f6dd-11f0-b747-a8934a9bae74',110,223,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42fa6c-f6dd-11f0-b747-a8934a9bae74',110,225,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42fb73-f6dd-11f0-b747-a8934a9bae74',110,226,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42fd10-f6dd-11f0-b747-a8934a9bae74',113,218,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42fe1d-f6dd-11f0-b747-a8934a9bae74',113,220,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce42fffd-f6dd-11f0-b747-a8934a9bae74',113,221,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce43011b-f6dd-11f0-b747-a8934a9bae74',113,223,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce430283-f6dd-11f0-b747-a8934a9bae74',113,225,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce43037a-f6dd-11f0-b747-a8934a9bae74',113,226,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce430519-f6dd-11f0-b747-a8934a9bae74',116,227,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce43061a-f6dd-11f0-b747-a8934a9bae74',116,229,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce43070a-f6dd-11f0-b747-a8934a9bae74',116,230,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce43084a-f6dd-11f0-b747-a8934a9bae74',116,231,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce43094b-f6dd-11f0-b747-a8934a9bae74',116,232,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce430e81-f6dd-11f0-b747-a8934a9bae74',116,233,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce431952-f6dd-11f0-b747-a8934a9bae74',125,234,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce431b37-f6dd-11f0-b747-a8934a9bae74',125,235,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce431c8e-f6dd-11f0-b747-a8934a9bae74',125,236,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce431d90-f6dd-11f0-b747-a8934a9bae74',125,237,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce431f4a-f6dd-11f0-b747-a8934a9bae74',126,238,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce43211f-f6dd-11f0-b747-a8934a9bae74',130,239,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce432468-f6dd-11f0-b747-a8934a9bae74',134,240,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4325bf-f6dd-11f0-b747-a8934a9bae74',134,242,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce432707-f6dd-11f0-b747-a8934a9bae74',134,243,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce432852-f6dd-11f0-b747-a8934a9bae74',134,244,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce43295f-f6dd-11f0-b747-a8934a9bae74',134,245,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce432abe-f6dd-11f0-b747-a8934a9bae74',134,246,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce432bbe-f6dd-11f0-b747-a8934a9bae74',134,247,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce432d00-f6dd-11f0-b747-a8934a9bae74',134,248,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce432f3c-f6dd-11f0-b747-a8934a9bae74',134,249,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce43304e-f6dd-11f0-b747-a8934a9bae74',134,250,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce433145-f6dd-11f0-b747-a8934a9bae74',134,252,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce433294-f6dd-11f0-b747-a8934a9bae74',134,253,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce433391-f6dd-11f0-b747-a8934a9bae74',134,254,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce433480-f6dd-11f0-b747-a8934a9bae74',134,255,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4337e7-f6dd-11f0-b747-a8934a9bae74',145,240,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce433a58-f6dd-11f0-b747-a8934a9bae74',145,242,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce433c8a-f6dd-11f0-b747-a8934a9bae74',145,243,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce433dda-f6dd-11f0-b747-a8934a9bae74',145,244,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce433eeb-f6dd-11f0-b747-a8934a9bae74',145,245,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce434322-f6dd-11f0-b747-a8934a9bae74',145,246,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce43448b-f6dd-11f0-b747-a8934a9bae74',145,247,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce434603-f6dd-11f0-b747-a8934a9bae74',145,248,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce434824-f6dd-11f0-b747-a8934a9bae74',145,249,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce43497d-f6dd-11f0-b747-a8934a9bae74',145,250,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce434af0-f6dd-11f0-b747-a8934a9bae74',145,252,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce434cb2-f6dd-11f0-b747-a8934a9bae74',145,253,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce434e34-f6dd-11f0-b747-a8934a9bae74',145,254,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce434fa2-f6dd-11f0-b747-a8934a9bae74',145,255,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4352e3-f6dd-11f0-b747-a8934a9bae74',146,240,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4354b2-f6dd-11f0-b747-a8934a9bae74',146,242,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4356d7-f6dd-11f0-b747-a8934a9bae74',146,243,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce435873-f6dd-11f0-b747-a8934a9bae74',146,244,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4359c4-f6dd-11f0-b747-a8934a9bae74',146,245,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce435b93-f6dd-11f0-b747-a8934a9bae74',146,246,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce435cb4-f6dd-11f0-b747-a8934a9bae74',146,247,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce435da8-f6dd-11f0-b747-a8934a9bae74',146,248,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce435f61-f6dd-11f0-b747-a8934a9bae74',146,249,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce436065-f6dd-11f0-b747-a8934a9bae74',146,250,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce43615a-f6dd-11f0-b747-a8934a9bae74',146,252,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce436294-f6dd-11f0-b747-a8934a9bae74',146,253,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce43638a-f6dd-11f0-b747-a8934a9bae74',146,254,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce436475-f6dd-11f0-b747-a8934a9bae74',146,255,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce43666d-f6dd-11f0-b747-a8934a9bae74',149,256,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4367b0-f6dd-11f0-b747-a8934a9bae74',149,257,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce440054-f6dd-11f0-b747-a8934a9bae74',161,258,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce440297-f6dd-11f0-b747-a8934a9bae74',161,260,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4403b3-f6dd-11f0-b747-a8934a9bae74',161,262,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4404fb-f6dd-11f0-b747-a8934a9bae74',161,263,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce44060b-f6dd-11f0-b747-a8934a9bae74',161,265,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce440702-f6dd-11f0-b747-a8934a9bae74',161,267,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce44083b-f6dd-11f0-b747-a8934a9bae74',161,268,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4409ea-f6dd-11f0-b747-a8934a9bae74',161,270,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce440b24-f6dd-11f0-b747-a8934a9bae74',161,271,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce440c13-f6dd-11f0-b747-a8934a9bae74',161,272,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce440d4d-f6dd-11f0-b747-a8934a9bae74',161,273,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce440e3d-f6dd-11f0-b747-a8934a9bae74',161,274,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce44101a-f6dd-11f0-b747-a8934a9bae74',162,258,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce441119-f6dd-11f0-b747-a8934a9bae74',162,260,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce441212-f6dd-11f0-b747-a8934a9bae74',162,262,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce44137b-f6dd-11f0-b747-a8934a9bae74',162,263,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4414d0-f6dd-11f0-b747-a8934a9bae74',162,265,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce441627-f6dd-11f0-b747-a8934a9bae74',162,267,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce44189b-f6dd-11f0-b747-a8934a9bae74',162,268,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce441a17-f6dd-11f0-b747-a8934a9bae74',162,270,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce441b62-f6dd-11f0-b747-a8934a9bae74',162,271,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce441c8a-f6dd-11f0-b747-a8934a9bae74',162,272,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce441dc5-f6dd-11f0-b747-a8934a9bae74',162,273,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce441ec3-f6dd-11f0-b747-a8934a9bae74',162,274,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4420b7-f6dd-11f0-b747-a8934a9bae74',163,258,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4421b1-f6dd-11f0-b747-a8934a9bae74',163,260,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce44229b-f6dd-11f0-b747-a8934a9bae74',163,262,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4423ca-f6dd-11f0-b747-a8934a9bae74',163,263,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4424d7-f6dd-11f0-b747-a8934a9bae74',163,265,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4425d1-f6dd-11f0-b747-a8934a9bae74',163,267,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce442788-f6dd-11f0-b747-a8934a9bae74',163,268,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4428c5-f6dd-11f0-b747-a8934a9bae74',163,270,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce442a6b-f6dd-11f0-b747-a8934a9bae74',163,271,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce442baf-f6dd-11f0-b747-a8934a9bae74',163,272,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce442d5d-f6dd-11f0-b747-a8934a9bae74',163,273,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce442ea7-f6dd-11f0-b747-a8934a9bae74',163,274,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce443339-f6dd-11f0-b747-a8934a9bae74',170,280,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce44350a-f6dd-11f0-b747-a8934a9bae74',170,281,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce443660-f6dd-11f0-b747-a8934a9bae74',170,282,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4438d0-f6dd-11f0-b747-a8934a9bae74',171,280,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce443a27-f6dd-11f0-b747-a8934a9bae74',171,281,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce443b6d-f6dd-11f0-b747-a8934a9bae74',171,282,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce443de8-f6dd-11f0-b747-a8934a9bae74',172,280,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce443f16-f6dd-11f0-b747-a8934a9bae74',172,281,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce44411a-f6dd-11f0-b747-a8934a9bae74',172,282,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce44439a-f6dd-11f0-b747-a8934a9bae74',175,283,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce444518-f6dd-11f0-b747-a8934a9bae74',175,284,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce44488f-f6dd-11f0-b747-a8934a9bae74',178,285,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce444a30-f6dd-11f0-b747-a8934a9bae74',178,286,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce444cf1-f6dd-11f0-b747-a8934a9bae74',179,285,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce444e39-f6dd-11f0-b747-a8934a9bae74',179,286,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce445051-f6dd-11f0-b747-a8934a9bae74',180,285,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce445149-f6dd-11f0-b747-a8934a9bae74',180,286,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce445359-f6dd-11f0-b747-a8934a9bae74',181,285,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce445453-f6dd-11f0-b747-a8934a9bae74',181,286,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4455fd-f6dd-11f0-b747-a8934a9bae74',186,287,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce445706-f6dd-11f0-b747-a8934a9bae74',186,289,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce445888-f6dd-11f0-b747-a8934a9bae74',186,290,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce44597c-f6dd-11f0-b747-a8934a9bae74',186,291,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce445ab7-f6dd-11f0-b747-a8934a9bae74',186,292,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce445bc5-f6dd-11f0-b747-a8934a9bae74',186,293,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce445cc6-f6dd-11f0-b747-a8934a9bae74',186,294,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce445e42-f6dd-11f0-b747-a8934a9bae74',187,287,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce445f35-f6dd-11f0-b747-a8934a9bae74',187,289,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4460ad-f6dd-11f0-b747-a8934a9bae74',187,290,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce44626f-f6dd-11f0-b747-a8934a9bae74',187,291,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce44647c-f6dd-11f0-b747-a8934a9bae74',187,292,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce446669-f6dd-11f0-b747-a8934a9bae74',187,293,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce4467c1-f6dd-11f0-b747-a8934a9bae74',187,294,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce44742e-f6dd-11f0-b747-a8934a9bae74',204,295,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce44792e-f6dd-11f0-b747-a8934a9bae74',205,295,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce447c8e-f6dd-11f0-b747-a8934a9bae74',206,295,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce44afbd-f6dd-11f0-b747-a8934a9bae74',220,296,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce44b3c7-f6dd-11f0-b747-a8934a9bae74',220,297,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937'),('ce44bf3f-f6dd-11f0-b747-a8934a9bae74',262,299,'LQH_CO_CHAU',NULL,NULL,NULL,1,'system',NULL,NULL,'025721a4-bd0d-4447-9b9b-505d174de937','025721a4-bd0d-4447-9b9b-505d174de937');
/*!40000 ALTER TABLE `quanhe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `roleId` varchar(50) NOT NULL,
  `roleCode` varchar(50) DEFAULT NULL,
  `roleName` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `active_flag` tinyint DEFAULT NULL,
  `createDate` varchar(50) DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('0437a931-cf5e-11f0-8020-a8934a9bae74','thudo','Thư đồ',NULL,1,'2025-12-02 16:05:15','9ef39219-4c31-4a9b-8632-3a8a4850a01e','2025-12-02 16:05:15','9ef39219-4c31-4a9b-8632-3a8a4850a01e'),('0aa1a174-c8ed-11f0-8020-a8934a9bae74','thanhvien','Thành viên','Role mặc định tạo riêng cho người dùng mới',1,'2025-11-24 11:21:25','9ef39219-4c31-4a9b-8632-3a8a4850a01e','2025-11-24 11:21:25','9ef39219-4c31-4a9b-8632-3a8a4850a01e'),('c2ed095e-c905-11f0-8020-a8934a9bae74','sa','Quản trị hệ thống',NULL,1,'2025-11-24 14:18:23','admin','2025-11-24 14:18:23',NULL);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_chucnang`
--

DROP TABLE IF EXISTS `role_chucnang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_chucnang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` varchar(50) NOT NULL,
  `chucNangId` varchar(50) NOT NULL,
  `thaoTacId` varchar(50) NOT NULL,
  `dongHoId` varchar(50) DEFAULT NULL COMMENT 'NULL = tất cả dòng họ, có giá trị = chỉ dòng họ đó',
  `active_flag` tinyint DEFAULT '1',
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_role_chucnang` (`roleId`,`chucNangId`,`thaoTacId`,`dongHoId`),
  KEY `fk_rc_role` (`roleId`),
  KEY `fk_rc_chucnang` (`chucNangId`),
  KEY `fk_rc_thaotac` (`thaoTacId`),
  CONSTRAINT `fk_rc_chucnang` FOREIGN KEY (`chucNangId`) REFERENCES `chucnang` (`chucNangId`) ON DELETE CASCADE,
  CONSTRAINT `fk_rc_role` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`) ON DELETE CASCADE,
  CONSTRAINT `fk_rc_thaotac` FOREIGN KEY (`thaoTacId`) REFERENCES `thaotac` (`thaoTacId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_chucnang`
--

LOCK TABLES `role_chucnang` WRITE;
/*!40000 ALTER TABLE `role_chucnang` DISABLE KEYS */;
INSERT INTO `role_chucnang` VALUES (2,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN002','TT001',NULL,1,NULL,NULL),(3,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN002','TT002',NULL,1,NULL,NULL),(4,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN002','TT003',NULL,1,NULL,NULL),(5,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN002','TT004',NULL,1,NULL,NULL),(6,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN003','TT001',NULL,1,NULL,NULL),(7,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN003','TT002',NULL,1,NULL,NULL),(8,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN003','TT003',NULL,1,NULL,NULL),(9,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN003','TT004',NULL,1,NULL,NULL),(10,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN004','TT001',NULL,1,NULL,NULL),(11,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN004','TT002',NULL,1,NULL,NULL),(12,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN004','TT003',NULL,1,NULL,NULL),(13,'c2ed095e-c905-11f0-8020-a8934a9bae74','CN009','TT001',NULL,1,NULL,NULL),(14,'c2ed095e-c905-11f0-8020-a8934a9bae74','CN009','TT002',NULL,1,NULL,NULL),(15,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN005','TT002',NULL,1,NULL,NULL),(16,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN005','TT003',NULL,1,NULL,NULL),(17,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN005','TT004',NULL,1,NULL,NULL),(18,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN006','TT001',NULL,1,NULL,NULL),(19,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN006','TT002',NULL,1,NULL,NULL),(20,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN006','TT003',NULL,1,NULL,NULL),(21,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN006','TT004',NULL,1,NULL,NULL),(22,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN007','TT001',NULL,1,NULL,NULL),(24,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN_ADMIN','TT001',NULL,1,NULL,NULL),(25,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN_AI','TT001',NULL,1,NULL,NULL),(26,'0437a931-cf5e-11f0-8020-a8934a9bae74','8fbe62e7-e4cc-11f0-a0f9-a8934a9bae74','TT001',NULL,1,NULL,NULL),(27,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN_ADMIN','TT001',NULL,1,NULL,NULL),(28,'0437a931-cf5e-11f0-8020-a8934a9bae74','8fbe62e7-e4cc-11f0-a0f9-a8934a9bae74','TT001',NULL,1,NULL,NULL),(29,'0437a931-cf5e-11f0-8020-a8934a9bae74','8fbe62e7-e4cc-11f0-a0f9-a8934a9bae74','TT002',NULL,1,NULL,NULL),(30,'0437a931-cf5e-11f0-8020-a8934a9bae74','8fbe62e7-e4cc-11f0-a0f9-a8934a9bae74','TT003',NULL,1,NULL,NULL),(31,'0437a931-cf5e-11f0-8020-a8934a9bae74','8fbe62e7-e4cc-11f0-a0f9-a8934a9bae74','TT004',NULL,1,NULL,NULL),(34,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN_ADMIN','TT001',NULL,1,NULL,NULL),(36,'0aa1a174-c8ed-11f0-8020-a8934a9bae74','CN_AI','TT001',NULL,1,'2026-01-10 00:17:16',NULL),(37,'0aa1a174-c8ed-11f0-8020-a8934a9bae74','CN010','TT001',NULL,1,NULL,NULL),(38,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN001','TT001',NULL,1,NULL,NULL),(39,'0437a931-cf5e-11f0-8020-a8934a9bae74','CN005','TT001',NULL,1,NULL,NULL);
/*!40000 ALTER TABLE `role_chucnang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sukien`
--

DROP TABLE IF EXISTS `sukien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sukien` (
  `suKienId` varchar(50) NOT NULL,
  `dongHoId` varchar(50) DEFAULT NULL,
  `tenSuKien` varchar(255) DEFAULT NULL,
  `ngayDienRa` date DEFAULT NULL,
  `gioDienRa` time DEFAULT NULL,
  `diaDiem` varchar(255) DEFAULT NULL,
  `moTa` text,
  `lapLai` tinyint DEFAULT NULL,
  `active_flag` tinyint DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `loaiSuKien` int DEFAULT NULL,
  `uuTien` int DEFAULT NULL,
  `lu_user_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`suKienId`),
  KEY `dongHoId` (`dongHoId`),
  KEY `nguoiTaoId` (`nguoiTaoId`),
  KEY `fk_sukien_loaisukien` (`loaiSuKien`),
  CONSTRAINT `fk_sukien_loaisukien` FOREIGN KEY (`loaiSuKien`) REFERENCES `loaisukien` (`loaiSuKien`),
  CONSTRAINT `sukien_ibfk_1` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`) ON DELETE CASCADE,
  CONSTRAINT `sukien_ibfk_3` FOREIGN KEY (`nguoiTaoId`) REFERENCES `nguoidung` (`nguoiDungId`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sukien`
--

LOCK TABLES `sukien` WRITE;
/*!40000 ALTER TABLE `sukien` DISABLE KEYS */;
INSERT INTO `sukien` VALUES ('002d8888-6a32-48f7-8e41-750347c34681','025721a4-bd0d-4447-9b9b-505d174de937','cưới bảo anh','2026-01-07','11:20:00','Phòng họp B','vfgfg',0,1,'15e5e9b2-b293-4f18-b0f4-86548bbda3b0','2026-01-16 11:17:42',1,2,NULL),('04858a2b-2c82-4186-806d-dd1c9197df4a','e9022e64-cbae-11f0-8020-a8934a9bae74','giỗ bình hoa','2025-12-16','21:52:00','fgfgfggfgf','gdfggdbgdbgdbd',1,1,NULL,'2026-01-05 10:56:45',1,2,'89fd6f88-c909-11f0-8020-a8934a9bae74'),('3080754f-fa0e-4929-9666-d8df6f45b019','e9022e64-cbae-11f0-8020-a8934a9bae74','cưới bảo anh','2026-01-23','20:55:00','Phòng họp B','quý hóa quá đi',1,1,NULL,'2026-01-23 21:13:14',2,1,'b9b116b0-3d3c-4187-b1a9-fd8247274d64'),('3f878c40-e04e-47f4-b0af-9e57aa20959b','025721a4-bd0d-4447-9b9b-505d174de937','Cưới cháu minh anh','2026-01-15','23:23:00','tại nhà cháu trên đường 392','mọi người nhớ đến chung vui với gia đình',0,1,NULL,'2026-01-13 21:24:15',1,3,NULL),('517b932f-96a1-4074-a27f-a47dd0ccfa98','9d494063-537a-45aa-9bbc-1203f6728d55','Họp gia đình mình','2026-01-14','00:10:00','Phòng họp B','ddde',0,1,'b9b116b0-3d3c-4187-b1a9-fd8247274d64','2026-01-20 22:00:00',1,2,'b9b116b0-3d3c-4187-b1a9-fd8247274d64'),('65d4efeb-9d30-4d55-ba85-ad8b880536fe','025721a4-bd0d-4447-9b9b-505d174de937','giỗ bình kkkkkk','2026-01-06','17:15:00','Phòng họp B','yêu em',1,1,NULL,'2026-01-12 16:59:20',1,2,'15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),('6c56bc31-19be-4b49-b233-ba4404b7b375','e9022e64-cbae-11f0-8020-a8934a9bae74','giỗ bình hoa','2025-12-18','17:26:00','fgfgfggfgf','svvbvbv',1,1,NULL,'2026-01-05 10:54:04',1,2,'89fd6f88-c909-11f0-8020-a8934a9bae74'),('7cefd591-5d64-4e41-bc8a-26b3a157fc2e','e9022e64-cbae-11f0-8020-a8934a9bae74','giỗ bình hoa','2025-12-19','16:42:00','Phòng họp 2','sfgheweqdii75uygrf',1,1,NULL,'2026-01-05 10:53:09',1,2,'89fd6f88-c909-11f0-8020-a8934a9bae74'),('7ea48f93-4806-4cee-93ea-4a970d261454','e9022e64-cbae-11f0-8020-a8934a9bae74','cưới minh','2025-12-21','16:43:00','Phòng họp B','fghryjytyut',1,1,NULL,'2026-01-05 10:50:09',1,2,'89fd6f88-c909-11f0-8020-a8934a9bae74'),('8a91536e-9df6-43b9-8b82-738b31d86c16','025721a4-bd0d-4447-9b9b-505d174de937','Họp gia đình','2026-01-13','18:59:00','quảng trường','cdhđ',0,1,NULL,'2026-01-15 16:59:49',1,2,'15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),('91abf57f-d584-4570-a927-d0dad9e16839','e9022e64-cbae-11f0-8020-a8934a9bae74','Họp kế hoạch','2026-02-18','09:00:00','Phòng họp Bcb','Họp quý',1,1,'89fd6f88-c909-11f0-8020-a8934a9bae74','2026-01-23 21:13:39',2,1,'b9b116b0-3d3c-4187-b1a9-fd8247274d64'),('9e742b9e-b430-4be1-8621-b7b63bf5efd4','e9022e64-cbae-11f0-8020-a8934a9bae74','cưới minh','2025-12-17','10:32:00','nahf thờ','vff',1,1,NULL,'2026-01-05 10:54:41',2,2,'89fd6f88-c909-11f0-8020-a8934a9bae74'),('9f362e5b-8339-46ab-bb6d-f0e9c85e321c','025721a4-bd0d-4447-9b9b-505d174de937','Giỗ cụ tổ','2026-01-17','11:28:00','tại nhà bác cả trần đức chinh','mọi người chú ý thời gian',0,0,NULL,'2026-01-15 11:21:47',3,2,'15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),('afba8a12-2995-4649-981d-7b36f3371a86','e9022e64-cbae-11f0-8020-a8934a9bae74','giỗ bình hoa','2025-12-17','09:06:00','fgfgfggfgf','ccadcacad',1,1,NULL,'2026-01-05 10:56:36',1,2,'89fd6f88-c909-11f0-8020-a8934a9bae74'),('c2bcecd3-54cb-47ed-96d9-b236a961408f','9d494063-537a-45aa-9bbc-1203f6728d55','Họp gia đình','2026-01-21','22:01:00','fgfgfggfgf','vfvf',0,1,'b9b116b0-3d3c-4187-b1a9-fd8247274d64','2026-01-20 22:00:59',1,2,NULL),('e4602605-12d4-41ba-84e3-e6d794834f4c','e9022e64-cbae-11f0-8020-a8934a9bae74','giỗ bình hoa','2025-12-17','22:08:00','ffdgfg','fgfgf',1,1,NULL,'2026-01-05 10:56:36',1,2,'89fd6f88-c909-11f0-8020-a8934a9bae74'),('fc634f02-2a09-45ae-a341-bdd5657a8821','025721a4-bd0d-4447-9b9b-505d174de937','Họp gia đình mình','2026-01-22','21:34:00','Phòng họp B','frgr',0,0,'15e5e9b2-b293-4f18-b0f4-86548bbda3b0','2026-01-15 11:21:37',1,2,'15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),('SK001','e9022e64-cbae-11f0-8020-a8934a9bae74','Họp gia đình','2025-12-11','18:17:24','Phòng họp 2','Họp gia đình',0,1,NULL,'2026-01-05 10:56:45',1,0,'89fd6f88-c909-11f0-8020-a8934a9bae74'),('SK002','e9022e64-cbae-11f0-8020-a8934a9bae74','Giỗ dòng họ','2025-12-11','18:17:47','Công viên trung tâm','Giỗ dòng họ',1,1,NULL,NULL,2,1,NULL),('SK003','e9022e64-cbae-11f0-8020-a8934a9bae74','Mừng năm mới','2025-12-11','18:17:47','Nhà hàng ABC','mừng măn mới',1,1,NULL,NULL,3,2,NULL);
/*!40000 ALTER TABLE `sukien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taichinhchi`
--

DROP TABLE IF EXISTS `taichinhchi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taichinhchi` (
  `chiId` int NOT NULL,
  `dongHoId` varchar(50) NOT NULL,
  `ngayChi` date DEFAULT NULL,
  `soTien` decimal(18,2) DEFAULT NULL,
  `phuongThucThanhToan` varchar(100) DEFAULT NULL,
  `noiDung` text,
  `nguoiNhan` varchar(255) DEFAULT NULL,
  `ghiChu` text,
  `ngayTao` datetime DEFAULT NULL,
  `nguoiNhapId` varchar(50) DEFAULT NULL,
  `active_flag` tinyint DEFAULT '1',
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`chiId`,`dongHoId`),
  KEY `dongHoId` (`dongHoId`),
  KEY `nguoiNhapId` (`nguoiNhapId`),
  CONSTRAINT `taichinhchi_ibfk_1` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`),
  CONSTRAINT `taichinhchi_ibfk_3` FOREIGN KEY (`nguoiNhapId`) REFERENCES `nguoidung` (`nguoiDungId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taichinhchi`
--

LOCK TABLES `taichinhchi` WRITE;
/*!40000 ALTER TABLE `taichinhchi` DISABLE KEYS */;
INSERT INTO `taichinhchi` VALUES (1,'025721a4-bd0d-4447-9b9b-505d174de937','2025-01-01',800000.00,'Tiền mặt','Chi tổ chức giỗ tổ','Nhà hàng ABC','','2026-01-15 10:19:35','15e5e9b2-b293-4f18-b0f4-86548bbda3b0',0,'2026-01-15 11:19:59','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),(1,'9d494063-537a-45aa-9bbc-1203f6728d55','2025-01-01',800000.00,'Tiền mặt','Chi tổ chức giỗ tổ','Nhà hàng ABC','','2026-01-14 11:02:51','b9b116b0-3d3c-4187-b1a9-fd8247274d64',1,'2026-01-14 11:14:46','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(1,'e9022e64-cbae-11f0-8020-a8934a9bae74','2025-12-03',8000000.00,'Tiền mặt','Chi tổ chức giỗ tổ','Nhà hàng ABC','','2026-01-15 20:43:06','61ef80c1-d2fa-4675-9323-bec58d33ed19',1,'2026-01-23 21:09:10','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(1,'e9022e64-cbae-11f0-8020-a8934a9bae89','2025-01-01',800000.00,'Tiền mặt','Chi tổ chức giỗ tổ','Nhà hàng ABC','','2026-01-19 14:58:13','61ef80c1-d2fa-4675-9323-bec58d33ed19',1,'2026-01-19 15:45:57','61ef80c1-d2fa-4675-9323-bec58d33ed19'),(2,'025721a4-bd0d-4447-9b9b-505d174de937','2025-01-02',1200000.00,'Chuyển khoản','Sửa chữa mộ tổ','Thợ xây Nguyễn A','Đã thanh toán','2026-01-15 10:19:35','15e5e9b2-b293-4f18-b0f4-86548bbda3b0',0,'2026-01-15 11:20:03','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),(2,'9d494063-537a-45aa-9bbc-1203f6728d55','2025-01-02',1200000.00,'Chuyển khoản','Sửa chữa mộ tổ','Thợ xây Nguyễn A','Đã thanh toán','2026-01-14 11:02:51','b9b116b0-3d3c-4187-b1a9-fd8247274d64',1,'2026-01-14 11:14:46','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(2,'e9022e64-cbae-11f0-8020-a8934a9bae74','2026-01-23',1200000.00,'Chuyển khoản','Sửa chữa mộ tổ','Thợ xây Nguyễn A','Đã thanh toán','2026-01-15 20:43:06','61ef80c1-d2fa-4675-9323-bec58d33ed19',1,'2026-01-23 21:09:40','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(2,'e9022e64-cbae-11f0-8020-a8934a9bae89','2025-01-02',1200000.00,'Chuyển khoản','Sửa chữa mộ tổ','Thợ xây Nguyễn A','Đã thanh toán','2026-01-19 14:58:13','61ef80c1-d2fa-4675-9323-bec58d33ed19',1,'2026-01-20 17:26:03','61ef80c1-d2fa-4675-9323-bec58d33ed19'),(3,'025721a4-bd0d-4447-9b9b-505d174de937','2025-01-03',500000.00,'Tiền mặt','Chi phí tổ chức họp họ','Ban tổ chức','','2026-01-15 10:19:35','15e5e9b2-b293-4f18-b0f4-86548bbda3b0',1,NULL,NULL),(3,'9d494063-537a-45aa-9bbc-1203f6728d55','2025-01-03',500000.00,'Tiền mặt','Chi phí tổ chức họp họ','Ban tổ chức','','2026-01-14 11:02:51','b9b116b0-3d3c-4187-b1a9-fd8247274d64',1,'2026-01-14 11:14:46','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(3,'e9022e64-cbae-11f0-8020-a8934a9bae74','2025-01-03',500000.00,'Tiền mặt','Chi phí tổ chức họp họ','Ban tổ chức','','2026-01-15 20:43:06','61ef80c1-d2fa-4675-9323-bec58d33ed19',1,NULL,NULL),(3,'e9022e64-cbae-11f0-8020-a8934a9bae89','2025-01-03',500000.00,'Tiền mặt','Chi phí tổ chức họp họ','Ban tổ chức','','2026-01-19 14:58:13','61ef80c1-d2fa-4675-9323-bec58d33ed19',1,'2026-01-20 17:26:03','61ef80c1-d2fa-4675-9323-bec58d33ed19'),(4,'025721a4-bd0d-4447-9b9b-505d174de937','2025-01-04',300000.00,'Chuyển khoản','Chi phí in ấn tài liệu','Công ty in ABC','','2026-01-15 10:19:35','15e5e9b2-b293-4f18-b0f4-86548bbda3b0',1,NULL,NULL),(4,'9d494063-537a-45aa-9bbc-1203f6728d55','2025-01-04',300000.00,'Chuyển khoản','Chi phí in ấn tài liệu','Công ty in ABC','','2026-01-14 11:02:51','b9b116b0-3d3c-4187-b1a9-fd8247274d64',1,'2026-01-14 11:14:46','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(4,'e9022e64-cbae-11f0-8020-a8934a9bae74','2025-01-04',300000.00,'Chuyển khoản','Chi phí in ấn tài liệu','Công ty in ABC','','2026-01-15 20:43:06','61ef80c1-d2fa-4675-9323-bec58d33ed19',1,NULL,NULL),(4,'e9022e64-cbae-11f0-8020-a8934a9bae89','2025-01-04',300000.00,'Chuyển khoản','Chi phí in ấn tài liệu','Công ty in ABC','','2026-01-19 14:58:13','61ef80c1-d2fa-4675-9323-bec58d33ed19',1,'2026-01-20 17:26:03','61ef80c1-d2fa-4675-9323-bec58d33ed19'),(5,'025721a4-bd0d-4447-9b9b-505d174de937','2025-01-05',600000.00,'Tiền mặt','Mua hoa quả cúng','Chợ truyền thống','Đã mua','2026-01-15 10:19:35','15e5e9b2-b293-4f18-b0f4-86548bbda3b0',1,NULL,NULL),(5,'9d494063-537a-45aa-9bbc-1203f6728d55','2025-01-05',600000.00,'Tiền mặt','Mua hoa quả cúng hdbbdhfdhfbjdjfdjfdfj','Chợ truyền thống','Đã mua','2026-01-14 11:02:51','b9b116b0-3d3c-4187-b1a9-fd8247274d64',1,'2026-01-14 11:14:46','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(5,'e9022e64-cbae-11f0-8020-a8934a9bae74','2025-01-05',600000.00,'Tiền mặt','Mua hoa quả cúng','Chợ truyền thống','Đã mua','2026-01-15 20:43:06','61ef80c1-d2fa-4675-9323-bec58d33ed19',1,NULL,NULL),(5,'e9022e64-cbae-11f0-8020-a8934a9bae89','2025-01-05',600000.00,'Tiền mặt','Mua hoa quả cúng','Chợ truyền thống','Đã mua','2026-01-19 14:58:13','61ef80c1-d2fa-4675-9323-bec58d33ed19',1,'2026-01-20 17:26:03','61ef80c1-d2fa-4675-9323-bec58d33ed19'),(6,'9d494063-537a-45aa-9bbc-1203f6728d55','2025-01-01',800000.00,'Tiền mặt','Chi tổ chức giỗ tổ','Nhà hàng ABC','','2026-01-14 11:08:47','b9b116b0-3d3c-4187-b1a9-fd8247274d64',1,NULL,NULL),(6,'e9022e64-cbae-11f0-8020-a8934a9bae89','2025-02-06',100000.00,'Tiền mặt','Mua hoa quả cúng','Chợ truyền thống','Đã mua','2026-01-19 15:33:09','61ef80c1-d2fa-4675-9323-bec58d33ed19',1,'2026-01-19 15:45:57','61ef80c1-d2fa-4675-9323-bec58d33ed19'),(7,'9d494063-537a-45aa-9bbc-1203f6728d55','2025-01-02',1200000.00,'Chuyển khoản','Sửa chữa mộ tổ','Thợ xây Nguyễn A','Đã thanh toán','2026-01-14 11:08:47','b9b116b0-3d3c-4187-b1a9-fd8247274d64',1,NULL,NULL),(7,'e9022e64-cbae-11f0-8020-a8934a9bae89','2026-01-19',300000.00,'Chuyển khoản','chi mua','Tạp hóa ngân vũ','ok','2026-01-19 15:34:44','61ef80c1-d2fa-4675-9323-bec58d33ed19',1,NULL,NULL),(8,'9d494063-537a-45aa-9bbc-1203f6728d55','2025-01-03',500000.00,'Tiền mặt','Chi phí tổ chức họp họ','Ban tổ chức','','2026-01-14 11:08:47','b9b116b0-3d3c-4187-b1a9-fd8247274d64',1,NULL,NULL),(9,'9d494063-537a-45aa-9bbc-1203f6728d55','2025-01-04',300000.00,'Chuyển khoản','Chi phí in ấn tài liệu','Công ty in ABC','','2026-01-14 11:08:47','b9b116b0-3d3c-4187-b1a9-fd8247274d64',1,NULL,NULL),(10,'9d494063-537a-45aa-9bbc-1203f6728d55','2025-01-05',600000.00,'Tiền mặt','Mua hoa quả cúng hdbbdhfdhfb','Chợ truyền thống','Đã mua','2026-01-14 11:08:47','b9b116b0-3d3c-4187-b1a9-fd8247274d64',1,NULL,NULL);
/*!40000 ALTER TABLE `taichinhchi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taichinhthu`
--

DROP TABLE IF EXISTS `taichinhthu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taichinhthu` (
  `thuId` int NOT NULL,
  `dongHoId` varchar(50) NOT NULL,
  `hoTenNguoiDong` varchar(255) DEFAULT NULL,
  `ngayDong` date DEFAULT NULL,
  `soTien` decimal(18,2) DEFAULT NULL,
  `phuongThucThanhToan` varchar(100) DEFAULT NULL,
  `noiDung` text,
  `ghiChu` text,
  `nguoiNhapId` varchar(50) DEFAULT NULL,
  `ngayTao` datetime DEFAULT NULL,
  `active_flag` tinyint DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`thuId`,`dongHoId`),
  KEY `nguoiNhapId` (`nguoiNhapId`),
  KEY `taichinhthu_ibfk_1` (`dongHoId`),
  CONSTRAINT `taichinhthu_ibfk_1` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`),
  CONSTRAINT `taichinhthu_ibfk_3` FOREIGN KEY (`nguoiNhapId`) REFERENCES `nguoidung` (`nguoiDungId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taichinhthu`
--

LOCK TABLES `taichinhthu` WRITE;
/*!40000 ALTER TABLE `taichinhthu` DISABLE KEYS */;
INSERT INTO `taichinhthu` VALUES (1,'025721a4-bd0d-4447-9b9b-505d174de937','Nguyễn Văn Ánh','2025-01-01',10000000.00,'678','Đóng góp cho lễ giỗ tổ','','15e5e9b2-b293-4f18-b0f4-86548bbda3b0','2026-01-15 10:19:49',1,'2026-01-20 16:20:52','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),(1,'9d494063-537a-45aa-9bbc-1203f6728d55','Nguyễn Văn A','2025-01-01',500000.00,'Tiền mặt','Đóng góp cho lễ giỗ tổ','','b9b116b0-3d3c-4187-b1a9-fd8247274d64','2026-01-14 11:02:41',1,'2026-01-14 11:15:34','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(1,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Ánh','2026-01-21',1000000.00,'Tiền mặt','Đóng góp cho lễ giỗ tổ','','61ef80c1-d2fa-4675-9323-bec58d33ed19','2026-01-15 20:43:16',1,'2026-01-23 21:06:19','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(1,'e9022e64-cbae-11f0-8020-a8934a9bae89','Nguyễn Văn A','2025-01-01',2000000.00,'Tiền mặt','Đóng góp cho lễ giỗ tổ','','61ef80c1-d2fa-4675-9323-bec58d33ed19','2026-01-19 11:12:25',1,'2026-01-19 15:25:59','61ef80c1-d2fa-4675-9323-bec58d33ed19'),(2,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Bình','2025-01-02',1000000.00,'Chuyển khoản','Đóng góp xây nhà thờ họ','Đã chuyển khoản','15e5e9b2-b293-4f18-b0f4-86548bbda3b0','2026-01-15 10:19:49',1,'2026-01-20 16:20:52','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),(2,'9d494063-537a-45aa-9bbc-1203f6728d55','Trần Thị B','2025-01-02',1000000.00,'Chuyển khoản','Đóng góp xây nhà thờ họ','Đã chuyển khoản','b9b116b0-3d3c-4187-b1a9-fd8247274d64','2026-01-14 11:02:41',1,'2026-01-14 11:15:34','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(2,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Bình','2026-01-23',1000000.00,'Chuyển khoản','Đóng góp xây nhà thờ họ','Đã chuyển khoản','61ef80c1-d2fa-4675-9323-bec58d33ed19','2026-01-15 20:43:16',1,'2026-01-23 21:06:35','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(2,'e9022e64-cbae-11f0-8020-a8934a9bae89','Trần Thị B','2025-01-02',1000000.00,'Chuyển khoản','Đóng góp xây nhà thờ họ','Đã chuyển khoản','61ef80c1-d2fa-4675-9323-bec58d33ed19','2026-01-19 11:12:25',1,'2026-01-19 15:25:59','61ef80c1-d2fa-4675-9323-bec58d33ed19'),(3,'025721a4-bd0d-4447-9b9b-505d174de937','Lê Văn Chiến','2025-01-03',300000.00,'Tiền mặt','Hỗ trợ gia đình khó khăn','','15e5e9b2-b293-4f18-b0f4-86548bbda3b0','2026-01-15 10:19:49',1,'2026-01-20 16:20:52','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),(3,'9d494063-537a-45aa-9bbc-1203f6728d55','Lê Văn C','2025-01-03',300000.00,'Tiền mặt','Hỗ trợ gia đình khó khăn','','b9b116b0-3d3c-4187-b1a9-fd8247274d64','2026-01-14 11:02:41',1,'2026-01-14 11:15:34','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(3,'e9022e64-cbae-11f0-8020-a8934a9bae74','Lê Văn Chiến','2026-01-23',3000000.00,'Tiền mặt','Hỗ trợ gia đình khó khăn','','61ef80c1-d2fa-4675-9323-bec58d33ed19','2026-01-15 20:43:16',1,'2026-01-23 21:06:56','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(3,'e9022e64-cbae-11f0-8020-a8934a9bae89','Lê Văn C','2025-01-03',300000.00,'Tiền mặt','Hỗ trợ gia đình khó khăn','','61ef80c1-d2fa-4675-9323-bec58d33ed19','2026-01-19 11:12:25',1,'2026-01-19 15:25:59','61ef80c1-d2fa-4675-9323-bec58d33ed19'),(4,'025721a4-bd0d-4447-9b9b-505d174de937','Phạm Thị Dinh','2025-01-04',200000.00,'Chuyển khoản','Thu từ bán sách phả','','15e5e9b2-b293-4f18-b0f4-86548bbda3b0','2026-01-15 10:19:49',1,'2026-01-20 16:20:52','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),(4,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị D','2025-01-04',200000.00,'Chuyển khoản','Thu từ bán sách phả','','b9b116b0-3d3c-4187-b1a9-fd8247274d64','2026-01-14 11:02:41',1,'2026-01-14 11:15:34','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(4,'e9022e64-cbae-11f0-8020-a8934a9bae74','Phạm Thị Dinh','2025-07-10',20000000.00,'Chuyển khoản','Thu từ bán sách phả','','61ef80c1-d2fa-4675-9323-bec58d33ed19','2026-01-15 20:43:16',1,'2026-01-23 21:08:25','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(4,'e9022e64-cbae-11f0-8020-a8934a9bae89','Phạm Thị D','2025-01-04',200000.00,'Chuyển khoản','Thu từ bán sách phả','','61ef80c1-d2fa-4675-9323-bec58d33ed19','2026-01-19 11:12:25',1,'2026-01-19 15:25:59','61ef80c1-d2fa-4675-9323-bec58d33ed19'),(5,'025721a4-bd0d-4447-9b9b-505d174de937','Hoàng Văn Én','2025-01-05',800000.00,'Tiền mặt','Đóng góp tổ chức họp họ','Đã thanh toán','15e5e9b2-b293-4f18-b0f4-86548bbda3b0','2026-01-15 10:19:49',1,'2026-01-20 16:20:52','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),(5,'9d494063-537a-45aa-9bbc-1203f6728d55','Hoàng Văn E','2025-01-05',800000.00,'Tiền mặt','Đóng góp tổ chức họp họ','Đã thanh toán','b9b116b0-3d3c-4187-b1a9-fd8247274d64','2026-01-14 11:15:25',1,'2026-01-14 11:15:34','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(5,'e9022e64-cbae-11f0-8020-a8934a9bae74','Hoàng Văn Én','2025-01-05',800000.00,'Tiền mặt','Đóng góp tổ chức họp họ','Đã thanh toán','61ef80c1-d2fa-4675-9323-bec58d33ed19','2026-01-15 20:43:16',1,'2026-01-23 21:05:36','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(5,'e9022e64-cbae-11f0-8020-a8934a9bae89','Hoàng Văn E','2025-01-05',800000.00,'Tiền mặt','Đóng góp tổ chức họp họ','Đã thanh toán','61ef80c1-d2fa-4675-9323-bec58d33ed19','2026-01-19 11:12:25',1,'2026-01-19 15:25:59','61ef80c1-d2fa-4675-9323-bec58d33ed19'),(6,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Ánh','2026-01-16',5000000.00,'Tiền mặt','xây dựng','em yêu em','61ef80c1-d2fa-4675-9323-bec58d33ed19','2026-01-15 22:57:36',1,NULL,NULL);
/*!40000 ALTER TABLE `taichinhthu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tailieu`
--

DROP TABLE IF EXISTS `tailieu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tailieu` (
  `taiLieuId` varchar(50) NOT NULL,
  `dongHoId` varchar(50) DEFAULT NULL,
  `tenTaiLieu` varchar(255) NOT NULL,
  `duongDan` varchar(255) DEFAULT NULL,
  `moTa` text,
  `loaiTaiLieu` varchar(100) DEFAULT NULL,
  `namSangTac` int DEFAULT NULL,
  `tacGia` varchar(255) DEFAULT NULL,
  `nguonGoc` varchar(255) DEFAULT NULL,
  `ghiChu` text,
  `ngayTaiLen` date DEFAULT NULL,
  `active_flag` tinyint DEFAULT '1',
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`taiLieuId`),
  KEY `idx_tailieu_dongho` (`dongHoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tailieu`
--

LOCK TABLES `tailieu` WRITE;
/*!40000 ALTER TABLE `tailieu` DISABLE KEYS */;
INSERT INTO `tailieu` VALUES ('1d9ff248-7528-4ab5-a407-fe4a13df55fc','025721a4-bd0d-4447-9b9b-505d174de937','sắc phong','uploads/2026/01/14/hungVuong-1768380729874-99310858.docx','Từ năm 2009 đến năm 2019, Sở Văn hóa và Thể thao đã chỉ đạo Thư viện Tổng hợp Thừa Thiên Huế hợp tác với Thư viện Khoa học Tổng hợp thành phố Hồ Chí Minh (từ năm 2018 có thêm Trung tâm Bảo tồn di tích Cố đô Huế tham gia phối hợp) tổ chức khảo sát, sưu tầm và số hóa tài liệu Hán – Nôm làng xã và tư gia ở Thừa Thiên Huế tại 14 phủ đệ, 118 làng, đền thờ và nhà vườn thuộc 516 gia đình, họ tộc. Cũng trong thời gian trên, Thư viện đã thực hiện đề tài nghiên cứu khoa học cấp cơ sở (2011 – 2013), và đề tài nghiên cứu khoa khoa học cấp tỉnh (2014) liên quan trực tiếp đến vấn đề số hóa các tư liệu làng xã tại địa phương. Đến nay, tổng số tài liệu Hán Nôm sưu tầm, số hóa là 263.848 trang, trong đó có hàng chục ngàn sắc phong, chế phong, chiếu chỉ, lệnh chỉ.\nNăm 2018, Thư viện Tổng hợp Thừa Thiên Huế đã phối hợp cùng Trung tâm Bảo tồn Di tích Cố đô Huế và Thư viện Khoa học Tổng hợp Thành phố Hồ Chí Minh biên tập, xuất bản cuốn Thư mục đề yếu sắc phong triều Nguyễn ở Thừa Thiên Huế, giới thiệu nội dung tóm tắt hơn 2.171 sắc phong, sắc chỉ thời Nguyễn. Cuốn sách đã nhận được sự quan tâm đặc biệt của các nhà nghiên cứu và bạn đọc gần xa. Kế tục thành quả trên, lần này chúng tôi tuyển chọn và giới thiệu đầy đủ nội dung 300 tài liệu Hán – Nôm quý, bao gồm 181 sắc phong (phần 1); 100 chế phong (phần 2); và 19 chiếu (phần 3) trong tập sách SẮC PHONG, CHẾ PHONG, CHIẾU THỜI NGUYỄN TẠI THỪA THIÊN HUẾ','Văn bản cổ',1967,'Trần Bảo Anh','tại nhà thờ họ','nhớ ơn ông cha và ghi nhận công lao','2026-01-13',1,NULL,'2026-01-15 11:15:08','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),('a08417b3-d64f-46d5-9105-7d22e853e35f','025721a4-bd0d-4447-9b9b-505d174de937','Hình ảnh đáng yêu','http://localhost:8080/uploads/2026/01/20/sitdow-1768923178849-980900348.jpg',NULL,'Hình ảnh',NULL,'sơn',NULL,NULL,'2026-01-20',1,NULL,'2026-01-20 22:33:30',NULL),('c3fa16f6-853a-44ce-8edd-c5f65b52c63e','e9022e64-cbae-11f0-8020-a8934a9bae74','Cúng tổ họ',NULL,'đây là là một trong những trtuyeenf thống tốt đẹp của ông cha ta ','Văn bản cổ',1930,'Nhữ Bảo Anh','tại nhà thờ','yêu nước','2025-12-29',1,NULL,'2026-01-05 10:28:49',''),('f5a4e294-eb4f-4625-ab0f-0fa987c8102c','025721a4-bd0d-4447-9b9b-505d174de937','yêu em',NULL,'yêu yêu','Sắc phong',1920,'bin bin','nhà chính','hhhh','2026-01-01',1,NULL,'2026-01-15 11:17:48','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),('TL001','e9022e64-cbae-11f0-8020-a8934a9bae74','Gia phả dòng họ - Bản gốc',NULL,'Gia phả ghi chép từ đời thứ nhất đến đời thứ 5 của dòng họ. Bản viết tay bằng chữ Hán Nôm, được lưu giữ cẩn thận qua nhiều thế hệ.','Gia phả',1920,'Cụ tổ đời thứ 5','Lưu trữ tại nhà thờ họ',NULL,'2025-12-29',1,NULL,'2026-01-05 11:26:49','89fd6f88-c909-11f0-8020-a8934a9bae74'),('TL002','e9022e64-cbae-11f0-8020-a8934a9bae74','Sắc phong triều Nguyễn',NULL,'Sắc phong của vua Tự Đức ban cho cụ tổ năm 1865, ghi nhận công lao đóng góp cho triều đình.','Sắc phong',1865,'Triều đình nhà Nguyễn','Lưu trữ tại bảo tàng tỉnh',NULL,'2025-12-29',1,NULL,'2026-01-05 11:26:49','89fd6f88-c909-11f0-8020-a8934a9bae74'),('TL003','e9022e64-cbae-11f0-8020-a8934a9bae74','Hình ảnh nhà thờ họ xưa',NULL,'Bộ ảnh chụp nhà thờ họ từ năm 1950, ghi lại kiến trúc cổ trước khi được tu bổ.','Hình ảnh',1950,'Không rõ','Sưu tầm từ gia đình',NULL,'2025-12-29',1,NULL,'2026-01-06 18:49:28','6aa26582-bd12-4fdb-95d8-4e09fdb2f102'),('TL004','e9022e64-cbae-11f0-8020-a8934a9bae74','Văn tế tổ tiên',NULL,'Bài văn tế được đọc trong các dịp giỗ tổ, lễ tết. Nội dung ca ngợi công đức tổ tiên.','Văn bản cổ',1900,'Cụ tổ đời thứ 4','Truyền khẩu trong dòng họ',NULL,'2025-12-29',1,NULL,'2026-01-09 22:26:27','89fd6f88-c909-11f0-8020-a8934a9bae74'),('TL005','e9022e64-cbae-11f0-8020-a8934a9bae74','Gia phả bổ sung - Đời 6 đến 10',NULL,'Phần bổ sung gia phả, ghi chép các đời từ thứ 6 đến thứ 10 của dòng họ.','Gia phả',1980,'Ông Nguyễn Văn B','Biên soạn mới',NULL,'2025-12-29',1,NULL,NULL,NULL),('TL006','e9022e64-cbae-11f0-8020-a8934a9bae74','Hình ảnh lễ giỗ tổ 2020',NULL,'Bộ ảnh ghi lại lễ giỗ tổ năm 2020 với sự tham gia của hơn 200 con cháu.','Hình ảnh',2020,'Ban tổ chức','Chụp tại lễ giỗ tổ',NULL,'2025-12-29',1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `tailieu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thanhvien`
--

DROP TABLE IF EXISTS `thanhvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thanhvien` (
  `thanhVienId` int NOT NULL,
  `dongHoId` varchar(50) NOT NULL,
  `hoTen` varchar(255) DEFAULT NULL,
  `gioiTinh` tinyint DEFAULT '0',
  `ngaySinh` date DEFAULT NULL,
  `ngayMat` date DEFAULT NULL,
  `noiSinh` varchar(255) DEFAULT NULL,
  `noiMat` varchar(255) DEFAULT NULL,
  `ngheNghiep` varchar(255) DEFAULT NULL,
  `trinhDoHocVan` varchar(255) DEFAULT NULL,
  `soDienThoai` varchar(11) DEFAULT NULL,
  `diaChiHienTai` varchar(255) DEFAULT NULL,
  `tieuSu` text,
  `anhChanDung` varchar(255) DEFAULT NULL,
  `doiThuoc` int DEFAULT NULL,
  `chaId` int DEFAULT NULL,
  `meId` int DEFAULT NULL,
  `voId` int DEFAULT NULL,
  `chongId` int DEFAULT NULL,
  `ngayTao` datetime DEFAULT NULL,
  `active_flag` tinyint DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`dongHoId`,`thanhVienId`),
  KEY `dongHoId` (`dongHoId`),
  KEY `chaId` (`chaId`),
  KEY `meId` (`meId`),
  KEY `voId` (`voId`),
  KEY `chongId` (`chongId`),
  KEY `fk_thanhvien_cha` (`dongHoId`,`chaId`),
  KEY `fk_thanhvien_me` (`dongHoId`,`meId`),
  KEY `idx_thanhvien_dongho` (`dongHoId`),
  KEY `idx_thanhvien_hoten` (`dongHoId`,`hoTen`),
  KEY `idx_thanhvien_doithuoc` (`dongHoId`,`doiThuoc`),
  CONSTRAINT `fk_thanhvien_cha` FOREIGN KEY (`dongHoId`, `chaId`) REFERENCES `thanhvien` (`dongHoId`, `thanhVienId`) ON DELETE RESTRICT,
  CONSTRAINT `fk_thanhvien_me` FOREIGN KEY (`dongHoId`, `meId`) REFERENCES `thanhvien` (`dongHoId`, `thanhVienId`) ON DELETE RESTRICT,
  CONSTRAINT `thanhvien_ibfk_1` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thanhvien`
--

LOCK TABLES `thanhvien` WRITE;
/*!40000 ALTER TABLE `thanhvien` DISABLE KEYS */;
INSERT INTO `thanhvien` VALUES (1,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thánh Tông',1,'1893-01-31','1989-11-30','Hà Nội','','','','0972566678','Hà Nội, Việt Nam','Nông dân','uploads/2026/01/01/hich-tuong-si-227342137.png',1,NULL,NULL,2,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(2,'025721a4-bd0d-4447-9b9b-505d174de937','Nguyễn Thị Bình',0,'1967-10-01','1989-11-27','Hà Nội',NULL,'bác sĩ bbb','đại học','0972566678','Hà Nội, Việt Nam','Nông dân',NULL,1,NULL,NULL,NULL,1,'2026-01-01 17:04:07',1,'1','2026-01-22 14:49:12','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),(3,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Sơn',1,NULL,'1989-11-30','Hà Nội',NULL,'giáo viên',NULL,'0977789567','Hà Nội, Việt Nam',NULL,NULL,2,1,2,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-22 14:49:31','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),(4,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Lọ',1,NULL,'1989-11-28','Hà Nội','','bác sĩ đẹp zai quá kkk','','','Hà Nội, Việt Nam','',NULL,2,1,2,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(5,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Chúc',1,NULL,'1989-11-29','Hà Nội',NULL,'bác sỹ','đại học',NULL,'Hà Nội, Việt Nam','người truyền cảm hứng',NULL,2,1,2,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-22 16:52:00','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),(6,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Giới',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,3,3,NULL,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(7,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Nghãi',0,NULL,'1989-12-02','Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,3,NULL,NULL,NULL,6,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(8,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Lai',0,NULL,'1989-12-02','Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,3,NULL,NULL,NULL,6,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(9,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Tráng',0,NULL,'1999-03-10','Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(10,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Diện',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(11,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Dối',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(12,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Tý',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,13,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(13,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Liễn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(14,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hiệu',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,13,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(15,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Chóe',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(16,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Tích',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,15,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(17,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Cốc',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,18,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(18,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Cận',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(19,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thuổi',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,18,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(20,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thoa',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,21,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(21,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Hồng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(22,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Năm',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,21,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(23,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Lãi',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,6,8,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(24,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Đài',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,23,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(25,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Diễn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(26,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Diên',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(27,'025721a4-bd0d-4447-9b9b-505d174de937','Lê Thị Thuận',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,26,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(28,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Huống',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:13','1'),(29,'025721a4-bd0d-4447-9b9b-505d174de937','Phạn Thị Đệ',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,28,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(30,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Chày',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(31,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thu',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(32,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Oánh',0,'2002-01-01',NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','CEO',NULL,5,13,12,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(33,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thụ',0,'2023-01-01',NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','student',NULL,5,13,12,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(34,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Đồng',1,NULL,'2006-02-24','Hà Nội','','','','','Hà Nội, Việt Nam','gg',NULL,5,13,14,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(35,'025721a4-bd0d-4447-9b9b-505d174de937','Dương Thị Miên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,34,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(36,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Túy',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,13,14,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(37,'025721a4-bd0d-4447-9b9b-505d174de937','Dương Thị Diện',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,36,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(38,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Thôn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,15,16,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(39,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Định',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,38,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(40,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Cấn',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(41,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Nguyệt',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(42,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Vinh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(43,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Thi',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(44,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Dự',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(45,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Chục',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(46,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Phi',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(47,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Loan',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,46,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(48,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Điệp',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(49,'025721a4-bd0d-4447-9b9b-505d174de937','Cao Thị Hưng',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,50,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(50,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Phong',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(51,'025721a4-bd0d-4447-9b9b-505d174de937','Đoàn Thị Quyên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,50,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(52,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Đức Cảnh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(53,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hà',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,52,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(54,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Đô',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(55,'025721a4-bd0d-4447-9b9b-505d174de937','Đào Thị Thi',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,56,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(56,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Vượng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(57,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thỏa',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,56,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(58,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Thông',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(59,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Nhật',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,58,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(60,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Đề',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(61,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Liên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,60,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(62,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Nhàn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(63,'025721a4-bd0d-4447-9b9b-505d174de937','Lê Thị Lương',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,62,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(64,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Điểm',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(65,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Nga',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(66,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thư',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(67,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Lư',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(68,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Sang',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(69,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Chín',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,22,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(70,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị A',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,69,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(71,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Mười',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,22,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(72,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Viện',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,71,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(73,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Bãi',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(74,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị La',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,73,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(75,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Cài',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(76,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hiền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(77,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Liền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(78,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hoà',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(79,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Mùi',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(80,'025721a4-bd0d-4447-9b9b-505d174de937','Đỗ Thị Mùi',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,79,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(81,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Kỷ',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(82,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Quý',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(83,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Tước',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,82,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(84,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Tỵ',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(85,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Điền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(86,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Bính',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(87,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Tiền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,86,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(88,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Binh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(89,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thảo',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,88,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(90,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Chung',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(91,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Chiên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(92,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Kiên',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(93,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Liên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,92,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(94,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thủy',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(95,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hợp',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(96,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hạt',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(97,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Đông',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(98,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Phương',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(99,'025721a4-bd0d-4447-9b9b-505d174de937','Xin Thị Dung',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,98,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(100,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Chí',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(101,'025721a4-bd0d-4447-9b9b-505d174de937','Đào Thị Hồng',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,100,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(102,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Hà',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(103,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Hài',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(104,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Hưng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(105,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thảo',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,104,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(106,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Tuy',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(107,'025721a4-bd0d-4447-9b9b-505d174de937','Dương Thị Lê',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,106,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(108,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Tuyến',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(109,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hằng',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(110,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Duyên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(111,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Toàn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(112,'025721a4-bd0d-4447-9b9b-505d174de937','Đỗ Thị Xuân',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,111,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(113,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Dung',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(114,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Toán',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(115,'025721a4-bd0d-4447-9b9b-505d174de937','Lê Thị Tính',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,114,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(116,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Đoài',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,38,39,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(117,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Thơ',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,38,39,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(118,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Phương',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,117,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(119,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Thêm',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,38,39,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(120,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thành',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,119,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(121,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Phòng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,46,47,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(122,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị An',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,121,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(123,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Phúc',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,46,47,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(124,'025721a4-bd0d-4447-9b9b-505d174de937','Phạm Thu Hà',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,123,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(125,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thắm',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,46,47,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(126,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hải',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,50,49,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(127,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Quang',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,50,49,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(128,'025721a4-bd0d-4447-9b9b-505d174de937','Hoàng Thị Hiền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,127,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(129,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Mạnh Quỳnh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,50,51,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(130,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thủy',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,52,53,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(131,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Duy',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,52,53,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(132,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thu Huyền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,131,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(133,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Quân',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,52,53,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(134,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thơ',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(135,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Nghi',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(136,'025721a4-bd0d-4447-9b9b-505d174de937','Phan Thị Nghĩa',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,135,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(137,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Thảo',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(138,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Tuyên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,137,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(139,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Chung',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(140,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thúy',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,139,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(141,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Đức Vấn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(142,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Dàng',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,141,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(143,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Vận',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(144,'025721a4-bd0d-4447-9b9b-505d174de937','Hương',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,143,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(145,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Vần',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(146,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Xuân',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(147,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Thịnh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,57,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(148,'025721a4-bd0d-4447-9b9b-505d174de937','Trương Thị Năm',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,147,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(149,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thu',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,57,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(150,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Bình',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,57,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(151,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Thìn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(152,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Nghị',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,151,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(153,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Thiết',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(154,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hường',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,153,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(155,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Thanh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(156,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Khương',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,155,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(157,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Thạo',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(158,'025721a4-bd0d-4447-9b9b-505d174de937','Hảo',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,157,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(159,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Thiện',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(160,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Ánh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,159,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(161,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thái',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(162,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Vân',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(163,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thật',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(164,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Đạt',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,60,61,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(165,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Tuấn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,62,63,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(166,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Luận',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,165,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(167,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Tùng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,62,63,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(168,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Bích Phương',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,167,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(169,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Tuân',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,62,63,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(170,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Chiến',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(171,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Chiên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(172,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thu Hằng',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(173,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Hoàn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(174,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Vân',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,173,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(175,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thùy Vân',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,71,72,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(176,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Ngọc Anh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,71,72,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(177,'025721a4-bd0d-4447-9b9b-505d174de937','Bùi Thị Hồng Hạnh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,176,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(178,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Mai',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(179,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Xuyên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(180,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Xuân',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(181,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hương',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(182,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Trường',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(183,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Vui',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,182,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(184,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Bình',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,79,80,185,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(185,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hoa',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,184,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(186,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hoa',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,79,80,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(187,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Huệ',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,79,80,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(188,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Quí Mạnh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,79,80,189,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(189,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Duyên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,188,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(190,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Quang Minh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,79,80,191,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(191,'025721a4-bd0d-4447-9b9b-505d174de937','Vũ Thị Thoa',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,190,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(192,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Tơ',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(193,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Tuyến',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(194,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Trâm',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(195,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Tình',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(196,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Linh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(197,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thành Công',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,86,87,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(198,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Lan Anh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,86,87,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(199,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Huy',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,86,87,200,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(200,'025721a4-bd0d-4447-9b9b-505d174de937','Bùi Thị Ngọc Hà',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,199,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(201,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Bảo',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,88,89,202,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(202,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Ngọc Huyền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,201,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(203,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Chi',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,88,89,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(204,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hạnh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,92,93,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(205,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hiệp',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,92,93,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(206,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hội',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,92,93,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(207,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Hưởng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,92,93,208,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(208,'025721a4-bd0d-4447-9b9b-505d174de937','Hoàng Thị Thu An',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,207,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(209,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Phường',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,98,99,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(210,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Dũng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,98,99,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(211,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Công',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,100,101,212,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(212,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Khánh Ly',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,211,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(213,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Trường',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,100,101,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(214,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Bảo Anh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,100,101,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(215,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hiền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,104,105,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(216,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Mai',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,104,105,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(217,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn An',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,104,105,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(218,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Thắng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,106,107,219,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(219,'025721a4-bd0d-4447-9b9b-505d174de937','Lê Thị Ánh Ngọc',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,218,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:14','1'),(220,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thắm',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,106,107,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(221,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Ngọc Toản',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,111,112,222,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(222,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Trang',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,221,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(223,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Ngọc Tuấn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,111,112,224,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(224,'025721a4-bd0d-4447-9b9b-505d174de937','Đặng Thị Thu',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,223,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(225,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thế Giỏi',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,114,115,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(226,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Gia Hân',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,114,115,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(227,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Hào',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,117,118,228,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(228,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hằng',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,227,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(229,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hằng',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,117,118,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(230,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hải',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,117,118,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(231,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hoa',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,119,120,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(232,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Sở',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,119,120,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(233,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Khoa',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,119,120,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(234,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Anh Tấn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,121,122,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(235,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Anh Toán',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,121,122,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(236,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Huy',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,123,124,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(237,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Hưng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,123,124,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(238,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Nam Dương',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,127,128,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(239,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Duy Bách',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,131,132,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(240,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Nam',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,135,136,241,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(241,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Luyến',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,240,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(242,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Bắc',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,135,136,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(243,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Tân',1,NULL,NULL,'','','','','','','',NULL,7,137,138,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(244,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Hiền',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,137,138,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(245,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Hòa',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,137,138,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(246,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Ba',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,139,140,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(247,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Đức',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,139,140,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(248,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Loan',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,139,140,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(249,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Duyên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,141,142,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(250,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Đức Mạnh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,141,142,251,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(251,'025721a4-bd0d-4447-9b9b-505d174de937','Phan Thị Hường',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,250,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(252,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Vũ',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,141,142,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(253,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Giang',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,143,144,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(254,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Sơn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,143,144,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(255,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Vui',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,143,144,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(256,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hà Phương',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,147,148,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(257,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Phương Anh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,147,148,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(258,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Quyết',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,151,152,259,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(259,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Huyền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,258,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(260,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Mạnh Chiến',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,151,152,261,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(261,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Hải Yến',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,260,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(262,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Tâm',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,151,152,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(263,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Mạnh Thắng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,153,154,264,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(264,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hằng',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,263,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(265,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Đức Thành',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,153,154,266,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(266,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Hiền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,265,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(267,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Đức Thịnh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,153,154,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(268,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Thu',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,155,156,269,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(269,'025721a4-bd0d-4447-9b9b-505d174de937','Linh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,268,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(270,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Đức Giang',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,155,156,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(271,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Kim Loan',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,157,158,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(272,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Long',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,157,158,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(273,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Việt Trường',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,159,160,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(274,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Bảo',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,159,160,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(275,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Trọng Tấn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,165,166,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(276,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Đức Minh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,165,166,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(277,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thu Trang',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,165,166,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(278,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Mạnh Hùng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,167,168,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(279,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Phương Anh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,167,168,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(280,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thảo Linh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,173,174,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(281,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Minh Dương',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,173,174,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(282,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Minh Quân',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,173,174,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(283,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Tuệ Minh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,176,177,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(284,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Đức Sơn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,176,177,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(285,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Ngọc Hiếu',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,182,183,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(286,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Ngọc Sơn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,182,183,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(287,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thanh Liêm',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,184,185,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(288,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Thủy',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,NULL,NULL,NULL,286,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(289,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thành Lộ',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,184,185,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(290,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Ngọc',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,188,189,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(291,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Anh Vũ',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,188,189,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(292,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Băng',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,190,191,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(293,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Trà',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,190,191,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(294,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn An',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,190,191,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(295,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Đức Hải',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,207,208,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(296,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thúy Hường',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,218,219,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(297,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thế Thành',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,218,219,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(298,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Linh Nhi',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,221,222,NULL,NULL,'2026-01-01 17:04:07',1,'1','2026-01-21 22:28:15','1'),(299,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn hiếu',1,'2024-02-19',NULL,'hà nội','','','','','hải dương','','uploads/2026/01/19/likeIf_myself-1768788789288-164057038.jpg',9,258,259,NULL,NULL,'2026-01-19 09:15:14',1,'15e5e9b2-b293-4f18-b0f4-86548bbda3b0','2026-01-21 22:28:15','1'),(300,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Văn Chiến',1,'2024-02-19',NULL,'hà nội',NULL,'lập trình viên','đại học',NULL,'hưng yên',NULL,'http://localhost:8080/uploads/2026/01/22/haicau2-1769073538387-257034001.jpg',9,258,259,NULL,NULL,'2026-01-22 15:59:27',1,'15e5e9b2-b293-4f18-b0f4-86548bbda3b0','2026-01-22 16:19:06','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),(301,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị Ngân',0,'2023-06-22',NULL,'hà nội',NULL,'học sinh',NULL,NULL,'hà nội',NULL,'http://localhost:8080/uploads/2026/01/22/haicau-1769073318150-526358435.jpg',9,258,259,NULL,NULL,'2026-01-22 16:16:12',1,'15e5e9b2-b293-4f18-b0f4-86548bbda3b0','2026-01-22 16:16:12','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),(1,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Phúc Lợi',1,'1976-12-27','1989-11-28','Hà Nội','','','',NULL,'Hà Nội, Việt Nam','Nông dân',NULL,1,NULL,NULL,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(2,'9d494063-537a-45aa-9bbc-1203f6728d55','Trần Hiệu Diệu Lâm',0,NULL,'1989-12-02','Hà Nội','','','',NULL,'Hà Nội, Việt Nam','Nông dân',NULL,1,NULL,NULL,NULL,1,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(3,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Cõi',1,NULL,'1989-12-02','Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,2,1,2,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(4,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Lọ',0,NULL,'1989-12-02','Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,2,1,2,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(5,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Chúc',1,NULL,'1989-12-01','Hà Nội',NULL,'bác sĩ đẹp zai quá kkk',NULL,NULL,'Hà Nội, Việt Nam',NULL,NULL,2,1,2,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-20 21:36:26','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(6,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Giới',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,3,3,NULL,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(7,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Nghãi',0,NULL,'1989-12-02','Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,3,NULL,NULL,NULL,6,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(8,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Lai',0,NULL,'1989-12-02','Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,3,NULL,NULL,NULL,6,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(9,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Tráng',0,NULL,'1999-03-10','Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(10,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Diện',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(11,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Dối',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(12,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Tý',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,13,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(13,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Liễn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(14,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hiệu',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,13,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(15,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Chóe',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(16,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Tích',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,15,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(17,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Cốc',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,18,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(18,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Cận',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(19,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thuổi',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,18,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(20,'9d494063-537a-45aa-9bbc-1203f6728d55','Trần Thị Thoa',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,21,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(21,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Hồng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(22,'9d494063-537a-45aa-9bbc-1203f6728d55','Trần Thị Năm',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,21,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(23,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Lãi',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,6,8,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(24,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Đài',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,23,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(25,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Diễn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(26,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Diên',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(27,'9d494063-537a-45aa-9bbc-1203f6728d55','Lê Thị Thuận',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,26,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(28,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Huống',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(29,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạn Thị Đệ',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,28,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(30,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Chày',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(31,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thu',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(32,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Oánh',0,'2002-01-01',NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','CEO',NULL,5,13,12,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(33,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thụ',0,'2023-01-01',NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','student',NULL,5,13,12,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(34,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Đồng',1,NULL,'2006-02-24','Hà Nội','','','',NULL,'Hà Nội, Việt Nam','gg',NULL,5,13,14,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(35,'9d494063-537a-45aa-9bbc-1203f6728d55','Dương Thị Miên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,34,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(36,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Túy',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,13,14,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(37,'9d494063-537a-45aa-9bbc-1203f6728d55','Dương Thị Diện',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,36,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(38,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Thôn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,15,16,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(39,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Định',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,38,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(40,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Cấn',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(41,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Nguyệt',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(42,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Vinh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(43,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Thi',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(44,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Dự',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(45,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Chục',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(46,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Phi',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(47,'9d494063-537a-45aa-9bbc-1203f6728d55','Trần Thị Loan',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,46,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(48,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Điệp',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(49,'9d494063-537a-45aa-9bbc-1203f6728d55','Cao Thị Hưng',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,50,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(50,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Phong',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(51,'9d494063-537a-45aa-9bbc-1203f6728d55','Đoàn Thị Quyên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,50,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(52,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Đức Cảnh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(53,'9d494063-537a-45aa-9bbc-1203f6728d55','Trần Thị Hà',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,52,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(54,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Đô',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(55,'9d494063-537a-45aa-9bbc-1203f6728d55','Đào Thị Thi',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,56,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(56,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Vượng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(57,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thỏa',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,56,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(58,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Thông',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(59,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Nhật',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,58,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(60,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Đề',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(61,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Liên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,60,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(62,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Nhàn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(63,'9d494063-537a-45aa-9bbc-1203f6728d55','Lê Thị Lương',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,62,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(64,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Điểm',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(65,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Nga',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(66,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thư',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(67,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Lư',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(68,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Sang',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(69,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Chín',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,22,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(70,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị A',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,69,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(71,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Mười',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,22,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(72,'9d494063-537a-45aa-9bbc-1203f6728d55','Trần Thị Viện',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,71,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(73,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Bãi',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(74,'9d494063-537a-45aa-9bbc-1203f6728d55','Trần Thị La',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,73,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(75,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Cài',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(76,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hiền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(77,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Liền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(78,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hoà',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(79,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Mùi',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(80,'9d494063-537a-45aa-9bbc-1203f6728d55','Đỗ Thị Mùi',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,79,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(81,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Kỷ',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(82,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Quý',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(83,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Tước',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,82,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(84,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Tỵ',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(85,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Điền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(86,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Bính',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(87,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Tiền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,86,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(88,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Binh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(89,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thảo',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,88,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(90,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Chung',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(91,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Chiên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(92,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Kiên',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(93,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Liên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,92,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(94,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thủy',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(95,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hợp',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(96,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hạt',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(97,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Đông',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(98,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Phương',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(99,'9d494063-537a-45aa-9bbc-1203f6728d55','Xin Thị Dung',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,98,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(100,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Chí',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(101,'9d494063-537a-45aa-9bbc-1203f6728d55','Đào Thị Hồng',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,100,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(102,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Hà',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(103,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Hài',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(104,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Hưng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(105,'9d494063-537a-45aa-9bbc-1203f6728d55','Trần Thị Thảo',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,104,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(106,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Tuy',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(107,'9d494063-537a-45aa-9bbc-1203f6728d55','Dương Thị Lê',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,106,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(108,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Tuyến',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(109,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hằng',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(110,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Duyên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(111,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Toàn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(112,'9d494063-537a-45aa-9bbc-1203f6728d55','Đỗ Thị Xuân',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,111,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(113,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Dung',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(114,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Toán',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(115,'9d494063-537a-45aa-9bbc-1203f6728d55','Lê Thị Tính',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,114,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(116,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Đoài',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,38,39,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(117,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Thơ',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,38,39,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(118,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Phương',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,117,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(119,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Thêm',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,38,39,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(120,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thành',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,119,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(121,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Phòng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,46,47,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(122,'9d494063-537a-45aa-9bbc-1203f6728d55','Trần Thị An',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,121,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(123,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Phúc',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,46,47,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(124,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thu Hà',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,123,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(125,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thắm',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,46,47,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(126,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hải',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,50,49,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(127,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Quang',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,50,49,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(128,'9d494063-537a-45aa-9bbc-1203f6728d55','Hoàng Thị Hiền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,127,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(129,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Mạnh Quỳnh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,50,51,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(130,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thủy',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,52,53,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(131,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Duy',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,52,53,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(132,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thu Huyền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,131,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(133,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Quân',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,52,53,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(134,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thơ',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(135,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Nghi',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(136,'9d494063-537a-45aa-9bbc-1203f6728d55','Phan Thị Nghĩa',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,135,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(137,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Thảo',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(138,'9d494063-537a-45aa-9bbc-1203f6728d55','Trần Thị Tuyên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,137,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(139,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Chung',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(140,'9d494063-537a-45aa-9bbc-1203f6728d55','Trần Thị Thúy',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,139,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(141,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Đức Vấn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(142,'9d494063-537a-45aa-9bbc-1203f6728d55','Trần Thị Dàng',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,141,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(143,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Vận',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(144,'9d494063-537a-45aa-9bbc-1203f6728d55','Hương',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,143,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(145,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Vần',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(146,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Xuân',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(147,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Thịnh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,57,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(148,'9d494063-537a-45aa-9bbc-1203f6728d55','Trương Thị Năm',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,147,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(149,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thu',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,57,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(150,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Bình',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,57,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(151,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Thìn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(152,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Nghị',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,151,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(153,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Thiết',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(154,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hường',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,153,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(155,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Thanh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(156,'9d494063-537a-45aa-9bbc-1203f6728d55','Trần Thị Khương',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,155,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(157,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Thạo',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(158,'9d494063-537a-45aa-9bbc-1203f6728d55','Hảo',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,157,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(159,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Thiện',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(160,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Ánh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,159,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(161,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thái',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(162,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Vân',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(163,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thật',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(164,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Đạt',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,60,61,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(165,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Tuấn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,62,63,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(166,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Luận',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,165,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(167,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Tùng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,62,63,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(168,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Bích Phương',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,167,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(169,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Tuân',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,62,63,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(170,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Chiến',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(171,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Chiên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(172,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thu Hằng',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(173,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Hoàn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(174,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Vân',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,173,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(175,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thùy Vân',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,71,72,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(176,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Ngọc Anh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,71,72,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(177,'9d494063-537a-45aa-9bbc-1203f6728d55','Bùi Thị Hồng Hạnh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,176,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(178,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Mai',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(179,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Xuyên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(180,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Xuân',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(181,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hương',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(182,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Trường',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(183,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Vui',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,182,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(184,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Bình',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,79,80,185,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(185,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hoa',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,184,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(186,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hoa',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,79,80,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(187,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Huệ',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,79,80,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(188,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Quí Mạnh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,79,80,189,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(189,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Duyên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,188,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(190,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Quang Minh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,79,80,191,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(191,'9d494063-537a-45aa-9bbc-1203f6728d55','Vũ Thị Thoa',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,190,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(192,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Tơ',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(193,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Tuyến',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(194,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Trâm',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(195,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Tình',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(196,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Linh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(197,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thành Công',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,86,87,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(198,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Lan Anh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,86,87,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(199,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Huy',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,86,87,200,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(200,'9d494063-537a-45aa-9bbc-1203f6728d55','Bùi Thị Ngọc Hà',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,199,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(201,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Bảo',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,88,89,202,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(202,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Ngọc Huyền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,201,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(203,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Chi',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,88,89,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(204,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hạnh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,92,93,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(205,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hiệp',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,92,93,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(206,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hội',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,92,93,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(207,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Hưởng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,92,93,208,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(208,'9d494063-537a-45aa-9bbc-1203f6728d55','Hoàng Thị Thu An',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,207,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(209,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Phường',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,98,99,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(210,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Dũng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,98,99,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(211,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Công',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,100,101,212,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(212,'9d494063-537a-45aa-9bbc-1203f6728d55','Trần Khánh Ly',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,211,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(213,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Trường',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,100,101,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(214,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Bảo Anh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,100,101,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(215,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hiền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,104,105,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(216,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Mai',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,104,105,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(217,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn An',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,104,105,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(218,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Thắng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,106,107,219,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(219,'9d494063-537a-45aa-9bbc-1203f6728d55','Lê Thị Ánh Ngọc',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,218,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(220,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thắm',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,106,107,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(221,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Ngọc Toản',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,111,112,222,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(222,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Trang',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,221,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(223,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Ngọc Tuấn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,111,112,224,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(224,'9d494063-537a-45aa-9bbc-1203f6728d55','Đặng Thị Thu',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,223,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(225,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thế Giỏi',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,114,115,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(226,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Gia Hân',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,114,115,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(227,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Hào',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,117,118,228,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(228,'9d494063-537a-45aa-9bbc-1203f6728d55','Trần Thị Hằng',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,227,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(229,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hằng',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,117,118,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(230,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hải',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,117,118,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(231,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hoa',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,119,120,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(232,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Sở',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,119,120,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(233,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Khoa',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,119,120,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(234,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Anh Tấn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,121,122,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(235,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Anh Toán',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,121,122,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(236,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Huy',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,123,124,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(237,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Hưng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,123,124,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(238,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Nam Dương',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,127,128,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(239,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Duy Bách',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,131,132,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(240,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Nam',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,135,136,241,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(241,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Luyến',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,240,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(242,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Bắc',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,135,136,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(243,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Tân',1,NULL,NULL,'','','','',NULL,'','',NULL,7,137,138,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(244,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Hiền',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,137,138,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(245,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Hòa',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,137,138,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(246,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Ba',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,139,140,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(247,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Đức',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,139,140,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(248,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Loan',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,139,140,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(249,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Duyên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,141,142,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(250,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Đức Mạnh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,141,142,251,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(251,'9d494063-537a-45aa-9bbc-1203f6728d55','Phan Thị Hường',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,250,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(252,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Vũ',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,141,142,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(253,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Giang',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,143,144,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(254,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Sơn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,143,144,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(255,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Vui',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,143,144,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(256,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hà Phương',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,147,148,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(257,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Phương Anh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,147,148,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(258,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Quyết',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,151,152,259,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(259,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Huyền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,258,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(260,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Mạnh Chiến',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,151,152,261,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(261,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Hải Yến',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,260,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(262,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Tâm',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,151,152,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(263,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Mạnh Thắng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,153,154,264,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(264,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hằng',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,263,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(265,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Đức Thành',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,153,154,266,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(266,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Hiền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,265,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(267,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Đức Thịnh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,153,154,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(268,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Thu',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,155,156,269,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(269,'9d494063-537a-45aa-9bbc-1203f6728d55','Linh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,268,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(270,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Đức Giang',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,155,156,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(271,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Kim Loan',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,157,158,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(272,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Long',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,157,158,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(273,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Việt Trường',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,159,160,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(274,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Bảo',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,159,160,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(275,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Trọng Tấn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,165,166,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(276,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Đức Minh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,165,166,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(277,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thu Trang',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,165,166,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(278,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Mạnh Hùng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,167,168,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(279,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Phương Anh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,167,168,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(280,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thảo Linh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,173,174,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(281,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Minh Dương',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,173,174,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(282,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Minh Quân',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,173,174,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(283,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Tuệ Minh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,176,177,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(284,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Đức Sơn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,176,177,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(285,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Ngọc Hiếu',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,182,183,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(286,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Ngọc Sơn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,182,183,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(287,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thanh Liêm',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,184,185,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(288,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thủy',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,NULL,NULL,NULL,286,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(289,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thành Lộ',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,184,185,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(290,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Ngọc',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,188,189,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(291,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Anh Vũ',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,188,189,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(292,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Băng',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,190,191,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(293,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Trà',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,190,191,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(294,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn An',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,190,191,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(295,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Đức Hải',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,207,208,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(296,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thúy Hường',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,218,219,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(297,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thế Thành',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,218,219,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(298,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Linh Nhi',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,221,222,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(299,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Lan Hương',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,221,222,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(300,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Đức Long',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,223,224,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(301,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Hửa Khang',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,223,224,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(302,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Huy',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,227,228,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(303,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Ngọc Thúy Nga',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,227,228,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(304,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Lan Phương',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,240,241,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(305,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Văn Võ',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,240,241,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(306,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Minh Nguyệt',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,258,259,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(307,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Tuấn Kiệt',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,258,259,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(308,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Đức Tài',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,258,259,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(309,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Nam Khánh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,260,261,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(310,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Minh Khuê',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,260,261,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(311,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Ngọc Ban Mai',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,263,264,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(312,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Khánh Ngọc',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,263,264,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(313,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Đức Hiếu',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,263,264,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(314,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Ngọc Trúc Quỳnh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,265,266,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(315,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Đức Huy',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,265,266,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(316,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Đức Hưng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,265,266,317,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(317,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Thị Thùy Linh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,NULL,NULL,NULL,316,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(318,'9d494063-537a-45aa-9bbc-1203f6728d55','Phạm Anh Tấng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,9,313,314,NULL,NULL,'2026-01-13 22:18:24',1,'1','2026-01-13 22:19:04','1'),(1,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Phúc Lợi',1,'1976-12-26','1989-11-27','Hà Nội',NULL,'nông dân',NULL,NULL,'Hà Nội, Việt Nam','Nông dân','uploads/2026/01/09/openComputer-913036694.jpg',1,NULL,NULL,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-30 16:12:05','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(2,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Hiệu Diệu Lâm',0,NULL,'1989-12-01','Hà Nội',NULL,'nông dân',NULL,NULL,'Hà Nội, Việt Nam','Nông dân',NULL,1,NULL,NULL,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-22 21:49:36','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(3,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Cõi',1,NULL,'1989-11-30','Hà Nội',NULL,'nông dân',NULL,'0977678678','Hà Nội, Việt Nam',NULL,NULL,2,1,2,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-29 15:18:17','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(4,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Lọ',0,NULL,'1989-12-01','Hà Nội',NULL,'nông dân',NULL,NULL,'Hà Nội, Việt Nam',NULL,NULL,2,1,2,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-22 21:49:50','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(5,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chúc',0,NULL,'1989-12-01','Hà Nội',NULL,'nông dân',NULL,NULL,'Hà Nội, Việt Nam',NULL,NULL,2,1,2,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-22 21:49:56','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(6,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Giới',1,NULL,'1980-01-23','Hà Nội',NULL,NULL,NULL,NULL,'Hà Nội, Việt Nam',NULL,NULL,3,3,NULL,7,NULL,'2026-01-01 17:00:35',1,'1','2026-01-23 21:20:13','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),(7,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Nghãi',0,NULL,'1989-12-02','Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,3,NULL,NULL,NULL,6,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(8,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Lai',0,NULL,'1989-12-02','Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,3,NULL,NULL,NULL,6,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(9,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tráng',0,NULL,'1999-03-10','Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(10,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Diện',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(11,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Dối',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(12,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tý',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,13,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(13,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Liễn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(14,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hiệu',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,13,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(15,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Chóe',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(16,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tích',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,15,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(17,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Cốc',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,18,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(18,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Cận',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(19,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thuổi',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,18,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(20,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Thoa',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,21,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(21,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hồng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(22,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Năm',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,21,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(23,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Lãi',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,6,8,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(24,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Đài',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,23,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(25,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Diễn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(26,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Diên',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(27,'e9022e64-cbae-11f0-8020-a8934a9bae74','Lê Thị Thuận',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,26,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(28,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Huống',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(29,'e9022e64-cbae-11f0-8020-a8934a9bae74','Phạn Thị Đệ',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,28,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(30,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Chày',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(31,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thu',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(32,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Oánh',0,'2002-01-01',NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','CEO',NULL,5,13,12,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(33,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thụ',0,'2023-01-01',NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','student',NULL,5,13,12,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(34,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Đồng',1,NULL,'2006-02-24','Hà Nội','','','',NULL,'Hà Nội, Việt Nam','gg',NULL,5,13,14,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(35,'e9022e64-cbae-11f0-8020-a8934a9bae74','Dương Thị Miên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,34,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(36,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Túy',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,13,14,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(37,'e9022e64-cbae-11f0-8020-a8934a9bae74','Dương Thị Diện',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,36,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(38,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thôn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,15,16,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(39,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Định',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,38,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(40,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Cấn',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(41,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Nguyệt',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(42,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Vinh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(43,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thi',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(44,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Dự',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(45,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chục',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(46,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Phi',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(47,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Loan',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,46,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(48,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Điệp',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(49,'e9022e64-cbae-11f0-8020-a8934a9bae74','Cao Thị Hưng',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,50,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(50,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Phong',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(51,'e9022e64-cbae-11f0-8020-a8934a9bae74','Đoàn Thị Quyên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,50,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(52,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Cảnh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(53,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Hà',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,52,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(54,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Đô',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(55,'e9022e64-cbae-11f0-8020-a8934a9bae74','Đào Thị Thi',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,56,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(56,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Vượng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(57,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thỏa',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,56,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(58,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thông',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(59,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Nhật',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,58,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(60,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Đề',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(61,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Liên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,60,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(62,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Nhàn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(63,'e9022e64-cbae-11f0-8020-a8934a9bae74','Lê Thị Lương',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,62,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(64,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Điểm',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(65,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Nga',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(66,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thư',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(67,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Lư',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(68,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Sang',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(69,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Chín',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,22,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(70,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị A',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,69,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(71,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Mười',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,21,22,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(72,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Viện',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,71,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(73,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Bãi',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(74,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị La',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,73,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(75,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Cài',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(76,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hiền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(77,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Liền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(78,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hoà',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(79,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Mùi',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(80,'e9022e64-cbae-11f0-8020-a8934a9bae74','Đỗ Thị Mùi',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,79,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(81,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Kỷ',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(82,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Quý',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(83,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tước',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,82,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(84,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tỵ',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(85,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Điền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(86,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Bính',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(87,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tiền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,86,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(88,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Binh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(89,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thảo',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,88,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(90,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chung',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(91,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chiên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(92,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Kiên',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(93,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Liên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,92,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(94,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thủy',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(95,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hợp',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(96,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hạt',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(97,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Đông',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(98,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Phương',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(99,'e9022e64-cbae-11f0-8020-a8934a9bae74','Xin Thị Dung',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,98,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(100,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Chí',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(101,'e9022e64-cbae-11f0-8020-a8934a9bae74','Đào Thị Hồng',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,100,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(102,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hà',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(103,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hài',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(104,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hưng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(105,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Thảo',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,104,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(106,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Tuy',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(107,'e9022e64-cbae-11f0-8020-a8934a9bae74','Dương Thị Lê',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,106,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(108,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Tuyến',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(109,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hằng',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(110,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Duyên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(111,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Toàn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(112,'e9022e64-cbae-11f0-8020-a8934a9bae74','Đỗ Thị Xuân',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,111,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(113,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Dung',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(114,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Toán',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(115,'e9022e64-cbae-11f0-8020-a8934a9bae74','Lê Thị Tính',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,114,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(116,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Đoài',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,38,39,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(117,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thơ',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,38,39,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(118,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Phương',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,117,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(119,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thêm',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,38,39,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(120,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thành',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,119,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(121,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Phòng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,46,47,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(122,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị An',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,121,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(123,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Phúc',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,46,47,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(124,'e9022e64-cbae-11f0-8020-a8934a9bae74','Phạm Thu Hà',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,123,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(125,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thắm',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,46,47,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(126,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hải',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,50,49,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(127,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Quang',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,50,49,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(128,'e9022e64-cbae-11f0-8020-a8934a9bae74','Hoàng Thị Hiền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,127,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(129,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Mạnh Quỳnh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,50,51,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(130,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thủy',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,52,53,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(131,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Duy',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,52,53,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(132,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thu Huyền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,131,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(133,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Quân',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,52,53,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(134,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thơ',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(135,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Nghi',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(136,'e9022e64-cbae-11f0-8020-a8934a9bae74','Phan Thị Nghĩa',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,135,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(137,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thảo',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(138,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Tuyên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,137,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(139,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Chung',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(140,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Thúy',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,139,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(141,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Vấn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(142,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Dàng',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,141,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(143,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Vận',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(144,'e9022e64-cbae-11f0-8020-a8934a9bae74','Hương',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,143,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(145,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Vần',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(146,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Xuân',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(147,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thịnh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,57,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(148,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trương Thị Năm',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,147,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(149,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thu',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,57,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(150,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Bình',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,56,57,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(151,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thìn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(152,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Nghị',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,151,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(153,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thiết',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(154,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hường',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,153,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(155,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thanh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(156,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Khương',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,155,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(157,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thạo',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(158,'e9022e64-cbae-11f0-8020-a8934a9bae74','Hảo',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,157,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(159,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thiện',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(160,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Ánh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,159,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(161,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thái',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(162,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Vân',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(163,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thật',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(164,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Đạt',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,60,61,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(165,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Tuấn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,62,63,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(166,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Luận',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,165,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(167,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Tùng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,62,63,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(168,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Bích Phương',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,167,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(169,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Tuân',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,62,63,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(170,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chiến',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(171,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chiên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(172,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thu Hằng',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(173,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hoàn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(174,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Vân',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,173,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(175,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thùy Vân',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,71,72,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(176,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Anh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,71,72,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(177,'e9022e64-cbae-11f0-8020-a8934a9bae74','Bùi Thị Hồng Hạnh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,176,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(178,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Mai',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(179,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Xuyên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(180,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Xuân',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(181,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hương',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(182,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Trường',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(183,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Vui',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,182,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(184,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Bình',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,79,80,185,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(185,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hoa',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,184,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(186,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hoa',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,79,80,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(187,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Huệ',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,79,80,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(188,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Quí Mạnh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,79,80,189,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(189,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Duyên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,188,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(190,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Quang Minh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,79,80,191,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(191,'e9022e64-cbae-11f0-8020-a8934a9bae74','Vũ Thị Thoa',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,190,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(192,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tơ',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(193,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tuyến',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(194,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Trâm',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(195,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tình',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(196,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Linh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(197,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thành Công',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,86,87,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(198,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Lan Anh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,86,87,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(199,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Huy',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,86,87,200,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(200,'e9022e64-cbae-11f0-8020-a8934a9bae74','Bùi Thị Ngọc Hà',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,199,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(201,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Bảo',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,88,89,202,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(202,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Ngọc Huyền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,201,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(203,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chi',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,88,89,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(204,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hạnh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,92,93,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(205,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hiệp',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,92,93,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(206,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hội',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,92,93,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(207,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hưởng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,92,93,208,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(208,'e9022e64-cbae-11f0-8020-a8934a9bae74','Hoàng Thị Thu An',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,207,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(209,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Phường',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,98,99,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(210,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Dũng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,98,99,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(211,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Công',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,100,101,212,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(212,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Khánh Ly',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,211,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(213,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Trường',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,100,101,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(214,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Bảo Anh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,100,101,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(215,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hiền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,104,105,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(216,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Mai',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,104,105,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(217,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn An',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,104,105,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(218,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thắng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,106,107,219,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(219,'e9022e64-cbae-11f0-8020-a8934a9bae74','Lê Thị Ánh Ngọc',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,218,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(220,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thắm',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,106,107,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(221,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Toản',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,111,112,222,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(222,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Trang',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,221,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(223,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Tuấn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,111,112,224,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(224,'e9022e64-cbae-11f0-8020-a8934a9bae74','Đặng Thị Thu',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,223,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(225,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thế Giỏi',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,114,115,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(226,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Gia Hân',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,114,115,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(227,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hào',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,117,118,228,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(228,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Hằng',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,227,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(229,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hằng',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,117,118,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(230,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hải',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,117,118,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(231,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hoa',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,119,120,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(232,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Sở',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,119,120,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(233,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Khoa',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,119,120,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(234,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Anh Tấn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,121,122,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(235,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Anh Toán',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,121,122,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(236,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Huy',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,123,124,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(237,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hưng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,123,124,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(238,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Nam Dương',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,127,128,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(239,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Duy Bách',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,131,132,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(240,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Nam',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,135,136,241,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(241,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Luyến',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,240,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(242,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Bắc',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,135,136,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(243,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Tân',1,NULL,NULL,'','','','',NULL,'','',NULL,7,137,138,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(244,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hiền',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,137,138,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(245,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hòa',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,137,138,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(246,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Ba',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,139,140,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(247,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Đức',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,139,140,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(248,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Loan',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,139,140,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(249,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Duyên',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,141,142,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(250,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Mạnh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,141,142,251,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(251,'e9022e64-cbae-11f0-8020-a8934a9bae74','Phan Thị Hường',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,250,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(252,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Vũ',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,141,142,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(253,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Giang',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,143,144,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(254,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Sơn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,143,144,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(255,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Vui',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,143,144,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(256,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hà Phương',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,147,148,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(257,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Phương Anh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,147,148,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(258,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Quyết',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,151,152,259,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(259,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Huyền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,258,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(260,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Mạnh Chiến',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,151,152,261,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(261,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Hải Yến',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,260,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(262,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tâm',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,151,152,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(263,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Mạnh Thắng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,153,154,264,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(264,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hằng',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,263,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(265,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Thành',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,153,154,266,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(266,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hiền',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,265,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(267,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Thịnh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,153,154,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(268,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thu',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,155,156,269,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(269,'e9022e64-cbae-11f0-8020-a8934a9bae74','Linh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,268,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(270,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Giang',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,155,156,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(271,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Kim Loan',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,157,158,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(272,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Long',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,157,158,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(273,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Việt Trường',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,159,160,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(274,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Bảo',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,159,160,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(275,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Trọng Tấn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,165,166,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(276,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Minh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,165,166,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(277,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thu Trang',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,165,166,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(278,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Mạnh Hùng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,167,168,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(279,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Phương Anh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,167,168,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(280,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thảo Linh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,173,174,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(281,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Minh Dương',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,173,174,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(282,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Minh Quân',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,173,174,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(283,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Tuệ Minh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,176,177,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(284,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Sơn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,176,177,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(285,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Hiếu',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,182,183,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(286,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Sơn',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,7,182,183,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(287,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thanh Liêm',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,184,185,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(288,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thủy',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,NULL,NULL,NULL,286,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(289,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thành Lộ',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,184,185,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(290,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Ngọc',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,188,189,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(291,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Anh Vũ',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,188,189,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(292,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Băng',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,190,191,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(293,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Trà',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,190,191,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(294,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn An',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,190,191,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(295,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Hải',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,207,208,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(296,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thúy Hường',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,218,219,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(297,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thế Thành',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,218,219,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(298,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Linh Nhi',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,221,222,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(299,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Lan Hương',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,221,222,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(300,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Long',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,223,224,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(301,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Hửa Khang',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,223,224,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(302,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Huy',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,227,228,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(303,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Thúy Nga',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,227,228,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(304,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Lan Phương',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,240,241,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(305,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Võ',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,240,241,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(306,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Minh Nguyệt',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,258,259,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(307,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Tuấn Kiệt',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,258,259,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(308,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Tài',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,258,259,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(309,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Nam Khánh',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,260,261,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(310,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Minh Khuê',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,260,261,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(311,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Ban Mai',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,263,264,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(312,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Khánh Ngọc',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,263,264,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(313,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Hiếu',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,263,264,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(314,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Trúc Quỳnh',0,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,265,266,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(315,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Huy',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,265,266,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(316,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Hưng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,265,266,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(317,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Ba',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,8,265,266,NULL,NULL,'2026-01-01 17:00:35',1,'1','2026-01-09 22:01:45','1'),(318,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Anh Tấng',1,NULL,NULL,'Hà Nội','','','',NULL,'Hà Nội, Việt Nam','',NULL,9,313,314,NULL,NULL,'2026-01-01 17:01:23',1,'1','2026-01-01 17:01:23','1'),(319,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Phá',1,'2026-01-11',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'uploads/2026/01/16/sitdow-1768497380844-606933364.jpg',9,313,314,NULL,NULL,'2026-01-16 00:16:49',1,'61ef80c1-d2fa-4675-9323-bec58d33ed19','2026-01-16 00:30:51','61ef80c1-d2fa-4675-9323-bec58d33ed19'),(1,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thánh Tông',1,'1966-01-31','1989-11-30','Hà Nội','','giáo viên','','0972566678','Hà Nội, Việt Nam','Nông dân',NULL,1,NULL,NULL,2,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(2,'e9022e64-cbae-11f0-8020-a8934a9bae89','Nguyễn Thị Bình',0,'1967-10-02','1989-11-28','Hà Nội','','bác sĩ bbb','đại học','0972566678','Hà Nội, Việt Nam','Nông dân',NULL,1,NULL,NULL,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(3,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Sơn',1,NULL,'1989-12-01','Hà Nội','','giáo viên','Cấp 3','0977789567','Hà Nội, Việt Nam','',NULL,2,1,2,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(4,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Lọ',1,NULL,'1989-11-28','Hà Nội','','bác sĩ đẹp zai quá kkk','',NULL,'Hà Nội, Việt Nam','',NULL,2,1,2,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(5,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Chúc',0,NULL,'1989-12-02','Hà Nội','','','đại học','','Hà Nội, Việt Nam','',NULL,2,1,2,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(6,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Giới',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,3,3,NULL,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(7,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Nghãi',0,NULL,'1989-12-02','Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,3,NULL,NULL,NULL,6,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(8,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Lai',0,NULL,'1989-12-02','Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,3,NULL,NULL,NULL,6,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(9,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Tráng',0,NULL,'1999-03-10','Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(10,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Diện',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(11,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Dối',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(12,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Tý',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,13,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(13,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Liễn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(14,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hiệu',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,13,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(15,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Chóe',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(16,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Tích',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,15,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(17,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Cốc',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,18,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(18,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Cận',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(19,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thuổi',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,18,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(20,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thoa',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,21,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(21,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Hồng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(22,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Năm',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,21,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(23,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Lãi',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,6,8,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(24,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Đài',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,23,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(25,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Diễn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(26,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Diên',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(27,'e9022e64-cbae-11f0-8020-a8934a9bae89','Lê Thị Thuận',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,26,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(28,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Huống',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(29,'e9022e64-cbae-11f0-8020-a8934a9bae89','Phạn Thị Đệ',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,28,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(30,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Chày',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(31,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thu',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(32,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Oánh',0,'2002-01-01',NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','CEO',NULL,5,13,12,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(33,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thụ',0,'2023-01-01',NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','student',NULL,5,13,12,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(34,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Đồng',1,NULL,'2006-02-24','Hà Nội','','','','','Hà Nội, Việt Nam','gg',NULL,5,13,14,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(35,'e9022e64-cbae-11f0-8020-a8934a9bae89','Dương Thị Miên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,34,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(36,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Túy',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,13,14,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(37,'e9022e64-cbae-11f0-8020-a8934a9bae89','Dương Thị Diện',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,36,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(38,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Thôn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,15,16,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(39,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Định',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,38,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(40,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Cấn',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(41,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Nguyệt',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(42,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Vinh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(43,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Thi',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(44,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Dự',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(45,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Chục',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(46,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Phi',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(47,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Loan',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,46,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(48,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Điệp',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(49,'e9022e64-cbae-11f0-8020-a8934a9bae89','Cao Thị Hưng',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,50,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(50,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Phong',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(51,'e9022e64-cbae-11f0-8020-a8934a9bae89','Đoàn Thị Quyên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,50,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(52,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Đức Cảnh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(53,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hà',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,52,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(54,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Đô',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(55,'e9022e64-cbae-11f0-8020-a8934a9bae89','Đào Thị Thi',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,56,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(56,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Vượng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(57,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thỏa',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,56,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(58,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Thông',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(59,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Nhật',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,58,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(60,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Đề',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(61,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Liên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,60,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(62,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Nhàn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(63,'e9022e64-cbae-11f0-8020-a8934a9bae89','Lê Thị Lương',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,62,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(64,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Điểm',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(65,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Nga',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(66,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thư',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(67,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Lư',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(68,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Sang',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(69,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Chín',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,22,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(70,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị A',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,69,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(71,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Mười',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,21,22,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(72,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Viện',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,71,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(73,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Bãi',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(74,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị La',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,73,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(75,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Cài',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(76,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hiền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(77,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Liền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(78,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hoà',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(79,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Mùi',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(80,'e9022e64-cbae-11f0-8020-a8934a9bae89','Đỗ Thị Mùi',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,79,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(81,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Kỷ',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(82,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Quý',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(83,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Tước',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,82,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(84,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Tỵ',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(85,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Điền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(86,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Bính',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(87,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Tiền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,86,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(88,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Binh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(89,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thảo',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,88,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(90,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Chung',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(91,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Chiên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(92,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Kiên',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(93,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Liên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,92,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(94,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thủy',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(95,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hợp',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(96,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hạt',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(97,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Đông',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(98,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Phương',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(99,'e9022e64-cbae-11f0-8020-a8934a9bae89','Xin Thị Dung',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,98,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(100,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Chí',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(101,'e9022e64-cbae-11f0-8020-a8934a9bae89','Đào Thị Hồng',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,100,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(102,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Hà',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(103,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Hài',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(104,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Hưng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(105,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thảo',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,104,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(106,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Tuy',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(107,'e9022e64-cbae-11f0-8020-a8934a9bae89','Dương Thị Lê',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,106,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(108,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Tuyến',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(109,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hằng',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(110,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Duyên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(111,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Toàn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(112,'e9022e64-cbae-11f0-8020-a8934a9bae89','Đỗ Thị Xuân',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,111,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(113,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Dung',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(114,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Toán',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(115,'e9022e64-cbae-11f0-8020-a8934a9bae89','Lê Thị Tính',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,114,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(116,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Đoài',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,38,39,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:16','1'),(117,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Thơ',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,38,39,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(118,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Phương',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,117,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(119,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Thêm',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,38,39,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(120,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thành',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,119,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(121,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Phòng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,46,47,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(122,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị An',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,121,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(123,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Phúc',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,46,47,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(124,'e9022e64-cbae-11f0-8020-a8934a9bae89','Phạm Thu Hà',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,123,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(125,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thắm',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,46,47,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(126,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hải',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,50,49,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(127,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Quang',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,50,49,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(128,'e9022e64-cbae-11f0-8020-a8934a9bae89','Hoàng Thị Hiền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,127,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(129,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Mạnh Quỳnh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,50,51,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(130,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thủy',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,52,53,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(131,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Duy',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,52,53,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(132,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thu Huyền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,131,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(133,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Quân',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,52,53,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(134,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thơ',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(135,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Nghi',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(136,'e9022e64-cbae-11f0-8020-a8934a9bae89','Phan Thị Nghĩa',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,135,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(137,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Thảo',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(138,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Tuyên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,137,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(139,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Chung',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(140,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thúy',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,139,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(141,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Đức Vấn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(142,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Dàng',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,141,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(143,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Vận',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(144,'e9022e64-cbae-11f0-8020-a8934a9bae89','Hương',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,143,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(145,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Vần',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(146,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Xuân',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(147,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Thịnh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,57,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(148,'e9022e64-cbae-11f0-8020-a8934a9bae89','Trương Thị Năm',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,147,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(149,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thu',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,57,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(150,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Bình',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,56,57,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(151,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Thìn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(152,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Nghị',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,151,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(153,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Thiết',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(154,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hường',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,153,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(155,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Thanh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(156,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Khương',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,155,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(157,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Thạo',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(158,'e9022e64-cbae-11f0-8020-a8934a9bae89','Hảo',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,157,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(159,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Thiện',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(160,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Ánh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,159,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(161,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thái',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(162,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Vân',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(163,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thật',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(164,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Đạt',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,60,61,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(165,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Tuấn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,62,63,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(166,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Luận',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,165,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(167,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Tùng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,62,63,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(168,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Bích Phương',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,167,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(169,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Tuân',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,62,63,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(170,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Chiến',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(171,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Chiên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(172,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thu Hằng',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(173,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Hoàn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(174,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Vân',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,173,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(175,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thùy Vân',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,71,72,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(176,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Ngọc Anh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,71,72,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(177,'e9022e64-cbae-11f0-8020-a8934a9bae89','Bùi Thị Hồng Hạnh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,176,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(178,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Mai',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(179,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Xuyên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(180,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Xuân',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(181,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hương',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(182,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Trường',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(183,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Vui',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,182,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(184,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Bình',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,79,80,185,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(185,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hoa',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,184,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(186,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hoa',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,79,80,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(187,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Huệ',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,79,80,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(188,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Quí Mạnh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,79,80,189,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(189,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Duyên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,188,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(190,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Quang Minh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,79,80,191,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(191,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thoa',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,190,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(192,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Tơ',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(193,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Tuyến',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(194,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Trâm',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(195,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Tình',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(196,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Linh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(197,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thành Công',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,86,87,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(198,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Lan Anh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,86,87,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(199,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Huy',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,86,87,200,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(200,'e9022e64-cbae-11f0-8020-a8934a9bae89','Bùi Thị Ngọc Hà',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,199,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(201,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Bảo',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,88,89,202,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(202,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Ngọc Huyền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,201,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(203,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Chi',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,88,89,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(204,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hạnh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,92,93,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(205,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hiệp',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,92,93,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(206,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hội',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,92,93,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(207,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Hưởng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,92,93,208,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(208,'e9022e64-cbae-11f0-8020-a8934a9bae89','Hoàng Thị Thu An',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,207,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(209,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Phường',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,98,99,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(210,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Dũng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,98,99,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(211,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Công',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,100,101,212,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(212,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Khánh Ly',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,211,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(213,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Trường',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,100,101,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(214,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Bảo Anh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,100,101,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(215,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hiền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,104,105,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(216,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Mai',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,104,105,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(217,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn An',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,104,105,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(218,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Thắng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,106,107,219,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(219,'e9022e64-cbae-11f0-8020-a8934a9bae89','Lê Thị Ánh Ngọc',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,218,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(220,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thắm',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,106,107,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(221,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Ngọc Toản',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,111,112,222,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(222,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Trang',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,221,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(223,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Ngọc Tuấn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,111,112,224,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(224,'e9022e64-cbae-11f0-8020-a8934a9bae89','Đặng Thị Thu',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,223,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(225,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thế Giỏi',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,114,115,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(226,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Gia Hân',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,114,115,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(227,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Hào',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,117,118,228,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(228,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hằng',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,227,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(229,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hằng',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,117,118,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(230,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hải',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,117,118,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(231,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hoa',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,119,120,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(232,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Sở',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,119,120,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(233,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Khoa',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,119,120,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(234,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Anh Tấn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,121,122,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(235,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Anh Toán',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,121,122,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(236,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Huy',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,123,124,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(237,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Hưng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,123,124,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(238,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Nam Dương',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,127,128,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(239,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Duy Bách',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,131,132,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(240,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Nam',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,135,136,241,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(241,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Luyến',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,240,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(242,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Bắc',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,135,136,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(243,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Tân',1,NULL,NULL,'','','','','','','',NULL,7,137,138,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(244,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Hiền',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,137,138,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(245,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Hòa',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,137,138,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(246,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Ba',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,139,140,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(247,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Đức',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,139,140,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(248,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Loan',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,139,140,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(249,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Duyên',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,141,142,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(250,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Đức Mạnh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,141,142,251,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(251,'e9022e64-cbae-11f0-8020-a8934a9bae89','Phan Thị Hường',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,250,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(252,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Vũ',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,141,142,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(253,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Giang',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,143,144,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(254,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Sơn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,143,144,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(255,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Vui',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,143,144,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(256,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hà Phương',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,147,148,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(257,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Phương Anh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,147,148,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(258,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Quyết',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,151,152,259,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(259,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Huyền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,258,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(260,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Mạnh Chiến',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,151,152,261,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(261,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Hải Yến',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,260,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(262,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Tâm',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,151,152,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(263,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Mạnh Thắng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,153,154,264,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(264,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hằng',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,263,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(265,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Đức Thành',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,153,154,266,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(266,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Hiền',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,265,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(267,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Đức Thịnh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,153,154,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(268,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Thu',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,155,156,269,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(269,'e9022e64-cbae-11f0-8020-a8934a9bae89','Linh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,268,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(270,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Đức Giang',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,155,156,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(271,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Kim Loan',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,157,158,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(272,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Long',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,157,158,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(273,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Việt Trường',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,159,160,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(274,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn Bảo',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,159,160,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(275,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Trọng Tấn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,165,166,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(276,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Đức Minh',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,165,166,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(277,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thu Trang',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,165,166,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(278,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Mạnh Hùng',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,167,168,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(279,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Phương Anh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,167,168,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(280,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thảo Linh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,173,174,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(281,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Minh Dương',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,173,174,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(282,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Minh Quân',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,173,174,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(283,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Tuệ Minh',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,176,177,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(284,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Đức Sơn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,176,177,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(285,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Ngọc Hiếu',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,182,183,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(286,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Ngọc Sơn',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,7,182,183,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(287,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thanh Liêm',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,184,185,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(288,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Thủy',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,NULL,NULL,NULL,286,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(289,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thành Lộ',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,184,185,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(290,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Ngọc',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,188,189,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(291,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Anh Vũ',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,188,189,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(292,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Băng',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,190,191,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(293,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thị Trà',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,190,191,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(294,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn An',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,190,191,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(295,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Đức Hải',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,207,208,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(296,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thúy Hường',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,218,219,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(297,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Thế Thành',1,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,218,219,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(298,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Linh Nhi',0,NULL,NULL,'Hà Nội','','','','','Hà Nội, Việt Nam','',NULL,8,221,222,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1'),(299,'e9022e64-cbae-11f0-8020-a8934a9bae89','Vũ Văn hiếu',1,'2024-02-19',NULL,'hà nội','','','','','hải dương','',NULL,9,258,259,NULL,NULL,'2026-01-19 11:08:19',1,'1','2026-01-19 16:18:17','1');
/*!40000 ALTER TABLE `thanhvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thaotac`
--

DROP TABLE IF EXISTS `thaotac`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thaotac` (
  `thaoTacId` varchar(50) NOT NULL,
  `thaoTacCode` varchar(50) NOT NULL COMMENT 'Mã thao tác: VIEW, CREATE, UPDATE, DELETE',
  `tenThaoTac` varchar(100) NOT NULL COMMENT 'Tên: Xem, Thêm, Sửa, Xóa',
  `moTa` varchar(255) DEFAULT NULL,
  `active_flag` tinyint DEFAULT '1',
  PRIMARY KEY (`thaoTacId`),
  UNIQUE KEY `uk_thaotac_code` (`thaoTacCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thaotac`
--

LOCK TABLES `thaotac` WRITE;
/*!40000 ALTER TABLE `thaotac` DISABLE KEYS */;
INSERT INTO `thaotac` VALUES ('TT001','VIEW','Xem','Quyền xem dữ liệu',1),('TT002','CREATE','Thêm mới','Quyền thêm dữ liệu',1),('TT003','UPDATE','Cập nhật','Quyền sửa dữ liệu',1),('TT004','DELETE','Xóa','Quyền xóa dữ liệu',1);
/*!40000 ALTER TABLE `thaotac` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thehe`
--

DROP TABLE IF EXISTS `thehe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thehe` (
  `theHeId` varchar(50) NOT NULL,
  `dongHoId` varchar(50) DEFAULT NULL,
  `soDoi` int DEFAULT NULL,
  `moTa` text,
  `active_flag` tinyint DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`theHeId`),
  KEY `dongHoId` (`dongHoId`),
  CONSTRAINT `thehe_ibfk_1` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thehe`
--

LOCK TABLES `thehe` WRITE;
/*!40000 ALTER TABLE `thehe` DISABLE KEYS */;
/*!40000 ALTER TABLE `thehe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thongbao`
--

DROP TABLE IF EXISTS `thongbao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thongbao` (
  `thongBaoId` varchar(50) NOT NULL,
  `nguoiNhanId` varchar(50) DEFAULT NULL,
  `suKienId` varchar(50) DEFAULT NULL,
  `tieuDe` varchar(255) DEFAULT NULL,
  `noiDung` text,
  `loaiThongBao` tinyint DEFAULT '0',
  `daDoc` tinyint(1) DEFAULT '0',
  `ngayGui` datetime DEFAULT NULL,
  `active_flag` tinyint DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`thongBaoId`),
  KEY `nguoiNhanId` (`nguoiNhanId`),
  KEY `suKienId` (`suKienId`),
  CONSTRAINT `thongbao_ibfk_1` FOREIGN KEY (`nguoiNhanId`) REFERENCES `nguoidung` (`nguoiDungId`) ON DELETE CASCADE,
  CONSTRAINT `thongbao_ibfk_2` FOREIGN KEY (`suKienId`) REFERENCES `sukien` (`suKienId`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thongbao`
--

LOCK TABLES `thongbao` WRITE;
/*!40000 ALTER TABLE `thongbao` DISABLE KEYS */;
/*!40000 ALTER TABLE `thongbao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tintuc`
--

DROP TABLE IF EXISTS `tintuc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tintuc` (
  `tinTucId` varchar(50) NOT NULL,
  `dongHoId` varchar(50) NOT NULL,
  `tieuDe` varchar(255) NOT NULL,
  `noiDung` text,
  `tomTat` varchar(500) DEFAULT NULL,
  `anhDaiDien` varchar(255) DEFAULT NULL,
  `tacGia` varchar(255) DEFAULT NULL,
  `ngayDang` datetime DEFAULT CURRENT_TIMESTAMP,
  `luotXem` int DEFAULT '0',
  `ghim` tinyint DEFAULT '0',
  `active_flag` tinyint DEFAULT '1',
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tinTucId`),
  KEY `idx_tintuc_dongho` (`dongHoId`),
  KEY `idx_tintuc_ngaydang` (`ngayDang`),
  CONSTRAINT `fk_tintuc_dongho` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tintuc`
--

LOCK TABLES `tintuc` WRITE;
/*!40000 ALTER TABLE `tintuc` DISABLE KEYS */;
INSERT INTO `tintuc` VALUES ('849bf3ee-674a-43bf-97f2-4024c10ea072','025721a4-bd0d-4447-9b9b-505d174de937','Giỗ tổ lão','hãy nhớ ơn và trả ơn đền ơn đáp nghĩa','ngày mà các con cháu nhớ đến công lao của tổ tiên và biết ơn công lao của các vị anh hùng',NULL,'Trần Bảo Anh','2026-01-13 09:15:09',0,1,1,NULL,'2026-01-15 11:15:18','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),('baa9f3f3-2b66-48f4-ba9b-ad545b654968','025721a4-bd0d-4447-9b9b-505d174de937','Giỗ tổ lão',NULL,'đây là ngày mà con cháu yêu quý nhớ ơn tổ tiên',NULL,'Trần Bảo Anh','2026-01-20 10:35:01',0,1,1,NULL,'2026-01-20 10:35:01',NULL),('be12b064-3fb0-4ecd-8641-084254a8fb8a','e9022e64-cbae-11f0-8020-a8934a9bae89','Giỗ tổ lão','âlaoa','nhớ ngày giỗ tổ',NULL,'nhữ bảo anh','2026-01-19 15:57:22',0,0,1,NULL,'2026-01-19 15:57:22',NULL),('TT001','e9022e64-cbae-11f0-8020-a8934a9bae74','Thông báo họp họ cuối năm 2025','Kính mời toàn thể bà con trong dòng họ tham dự buổi họp họ cuối năm 2025. Thời gian: 10h ngày 28/12/2025. Địa điểm: Nhà thờ họ. Nội dung: Tổng kết hoạt động năm 2025, kế hoạch năm 2026, trao học bổng cho con cháu học giỏi.','Thông báo họp họ cuối năm 2025 tại nhà thờ họ',NULL,'Ban quản lý dòng họ','2025-12-29 16:02:10',0,1,1,NULL,NULL,NULL),('TT002','e9022e64-cbae-11f0-8020-a8934a9bae74','Chúc mừng cháu Nguyễn Văn A đỗ đại học','Dòng họ xin chúc mừng cháu Nguyễn Văn A đã xuất sắc đỗ vào trường Đại học Bách Khoa Hà Nội năm 2025 với số điểm cao. Đây là niềm tự hào của cả dòng họ.','Chúc mừng thành viên đỗ đại học',NULL,'Ban quản lý dòng họ','2025-12-24 16:02:10',0,0,1,NULL,'2026-01-09 22:26:47','89fd6f88-c909-11f0-8020-a8934a9bae74'),('TT003','e9022e64-cbae-11f0-8020-a8934a9bae74','Lễ giỗ tổ Hùng Vương năm 2025','Thông báo lịch tổ chức lễ giỗ tổ Hùng Vương năm 2025. Thời gian: Mùng 10 tháng 3 âm lịch. Địa điểm: Đền thờ họ. Mong bà con sắp xếp thời gian tham dự.','Lễ giỗ tổ Hùng Vương năm 2025',NULL,'Ban tổ chức','2025-12-19 16:02:10',0,1,1,NULL,NULL,NULL),('TT004','e9022e64-cbae-11f0-8020-a8934a9bae74','Kế hoạch tu bổ nhà thờ họ','Ban quản lý dòng họ thông báo kế hoạch tu bổ, nâng cấp nhà thờ họ trong năm 2025. Dự kiến kinh phí: 500 triệu đồng. Kêu gọi bà con đóng góp.','Kế hoạch tu bổ nhà thờ họ năm 2025',NULL,'Ban quản lý','2025-12-14 16:02:10',0,0,1,NULL,'2026-01-05 10:29:07',''),('TT005','e9022e64-cbae-11f0-8020-a8934a9bae74','Hỗ trợ học bổng cho con cháu','Dòng họ triển khai chương trình học bổng hỗ trợ con cháu có hoàn cảnh khó khăn học giỏi. Mức hỗ trợ: 2-5 triệu đồng/năm học.','Chương trình học bổng dòng họ',NULL,'Ban khuyến học','2025-12-09 16:02:10',0,0,1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `tintuc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profile` (
  `userId` char(36) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `full_name` varchar(150) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `gender` tinyint DEFAULT NULL COMMENT '0: Nữ, 1: Nam, 2: Khác',
  `date_of_birthday` date DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `active_flag` tinyint DEFAULT NULL,
  `created_by_user_id` varchar(50) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `fk_profile_system_user` FOREIGN KEY (`userId`) REFERENCES `nguoidung` (`nguoiDungId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` VALUES ('15e5e9b2-b293-4f18-b0f4-86548bbda3b0','Bảo','Văn','Trần','Trần Văn Bảo','uploads/2026/01/14/baoanh-68498658.jpg',1,'2002-10-14','nguyenvanbao123@gmail.com','0966469702',1,NULL,'2025-12-19 11:22:31','2026-01-15 09:43:58','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),('53382048-ba53-4955-a100-2516b86ca978',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nguyenvanbao111@gmail.com',NULL,1,'53382048-ba53-4955-a100-2516b86ca978','2026-01-15 20:21:44',NULL,NULL),('61ef80c1-d2fa-4675-9323-bec58d33ed19',NULL,NULL,NULL,'Nhữ Hoàng Ka',NULL,NULL,NULL,'nhubaoanh221@gmail.com','0987654321',1,'89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-22 21:27:02','2025-12-22 21:27:02','89fd6f88-c909-11f0-8020-a8934a9bae74'),('6aa26582-bd12-4fdb-95d8-4e09fdb2f102',NULL,NULL,NULL,'Ngyễn Văn Hiếu',NULL,NULL,NULL,'minh123@gmail.com','0966469703',1,NULL,'2025-12-22 21:16:56','2025-12-22 21:16:56',NULL),('89fd6f88-c909-11f0-8020-a8934a9bae74','Anh','Bảo','Nhữ','Nhữ Bảo Anh',NULL,1,'2004-10-30','nhubaoanh111@gmail.com','0987654321',1,NULL,'2025-12-19 10:49:26',NULL,NULL),('90e581f7-f522-4032-a3bc-cbc9cd119f95',NULL,NULL,NULL,'Trần Văn Bảo Bình',NULL,1,NULL,'minh333@gmail.com','0966469705',1,'15e5e9b2-b293-4f18-b0f4-86548bbda3b0','2026-01-20 15:12:18','2026-01-20 15:12:18','15e5e9b2-b293-4f18-b0f4-86548bbda3b0'),('a20a6246-4800-4992-af5c-adcd6e898ee6','Anh','Bảo ','Nhữ','Nhữ Bảo  Anh','uploads/2025/12/19/H22-146122795.jpg',1,'2004-10-30','minh111@gmail.com','0966469703',1,NULL,'2025-12-19 15:51:04','2025-12-19 22:06:18',NULL),('b9b116b0-3d3c-4187-b1a9-fd8247274d64','Anh','Bảo','Phạm','Phạm Bảo Anh','uploads/2026/01/14/baoanh-1768381575832-963900514.jpg',1,NULL,'nguyenvanbao222@gmail.com','0987654321',1,NULL,'2025-12-22 21:11:25','2026-01-14 16:06:45','b9b116b0-3d3c-4187-b1a9-fd8247274d64'),('ec9d0e50-7c5a-48a9-b606-daeb591230a1',NULL,NULL,NULL,'Nhữ Hoàng Kalllll',NULL,NULL,NULL,'phamthithuylinh11@gmail.aom','0966469703',1,'89fd6f88-c909-11f0-8020-a8934a9bae74','2026-01-07 00:14:28','2026-01-07 00:14:28','89fd6f88-c909-11f0-8020-a8934a9bae74');
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'treefamily'
--
/*!50003 DROP PROCEDURE IF EXISTS `CheckPermission` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `CheckPermission`(
   IN p_nguoiDungId VARCHAR(50),
   IN p_chucNangCode VARCHAR(50),
   IN p_thaoTacCode VARCHAR(50),
   IN p_dongHoId VARCHAR(50),
   OUT p_hasPermission TINYINT,
   OUT p_error_code INT,
   OUT p_error_message VARCHAR(500)
)
proc: BEGIN
   DECLARE v_roleId VARCHAR(50);
   DECLARE v_userDongHoId VARCHAR(50);
   DECLARE v_roleCode VARCHAR(50);
   DECLARE v_count INT DEFAULT 0;

   SET p_error_code = 0;
   SET p_error_message = '';
   SET p_hasPermission = 0;

   -- Lấy thông tin user
   SELECT roleId, dongHoId
   INTO v_roleId, v_userDongHoId
   FROM nguoidung
   WHERE nguoiDungId = p_nguoiDungId
     AND active_flag = 1
   LIMIT 1;

   IF v_roleId IS NULL THEN
     SET p_error_code = 1;
     SET p_error_message = 'Người dùng không tồn tại hoặc đã bị khóa';
     LEAVE proc;
   END IF;

   -- Lấy roleCode
   SELECT roleCode
   INTO v_roleCode
   FROM role
   WHERE roleId = v_roleId
   LIMIT 1;

   -- Super Admin
   IF v_roleCode = 'sa' THEN
     SET p_hasPermission = 1;
     LEAVE proc;
   END IF;

   -- Kiểm tra quyền
   SELECT COUNT(*) INTO v_count
   FROM role_chucnang rc
   JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
   JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
   WHERE rc.roleId = v_roleId
     AND cn.chucNangCode = p_chucNangCode
     AND tt.thaoTacCode = p_thaoTacCode
     AND rc.active_flag = 1
     AND (rc.dongHoId IS NULL OR rc.dongHoId = v_userDongHoId);

   IF v_count > 0 THEN
     IF p_dongHoId IS NOT NULL
        AND p_dongHoId <> v_userDongHoId THEN
       SET p_error_code = 2;
       SET p_error_message = 'Bạn không có quyền thao tác trên dòng họ này';
     ELSE
       SET p_hasPermission = 1;
     END IF;
   ELSE
     SET p_error_code = 3;
     SET p_error_message = 'Bạn không có quyền thực hiện thao tác này';
   END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `checkUsernameExist` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `checkUsernameExist`(
    IN  p_value VARCHAR(255),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_error_code = RETURNED_SQLSTATE, 
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;

    SELECT COUNT(*) AS exist
    FROM nguoidung
    WHERE tenDangNhap = p_value;
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `CreateRole`(
    IN p_roleId VARCHAR(36),
    IN p_roleCode VARCHAR(50),
    IN p_roleName NVARCHAR(100),
    IN p_description NVARCHAR(255),
    OUT p_err_code INT,
    OUT p_err_msg NVARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_err_code = @errno;
        SET p_err_msg = @text;
        ROLLBACK;
    END;

    START TRANSACTION;
    
    -- Kiểm tra roleCode đã tồn tại chưa
    IF EXISTS (SELECT 1 FROM role WHERE roleCode = p_roleCode AND active_flag = 1) THEN
        SET p_err_code = 1;
        SET p_err_msg = 'Mã quyền đã tồn tại';
        ROLLBACK;
    ELSE
        INSERT INTO role (roleId, roleCode, roleName, description, active_flag, lu_updated)
        VALUES (p_roleId, p_roleCode, p_roleName, p_description, 1, NOW());
        
        SET p_err_code = 0;
        SET p_err_msg = 'Tạo nhóm quyền thành công';
        COMMIT;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DebugImportThu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DebugImportThu`(
    IN p_jsonData JSON,
    IN p_dongHoId VARCHAR(50)
)
BEGIN
    DROP TEMPORARY TABLE IF EXISTS tmp_import_thu;
    CREATE TEMPORARY TABLE tmp_import_thu (
        row_id INT AUTO_INCREMENT PRIMARY KEY,
        thu_id INT,
        stt INT,
        ho_ten_nguoi_dong VARCHAR(255),
        ngay_dong DATE,
        so_tien DECIMAL(18,2),
        phuong_thuc_thanh_toan VARCHAR(100),
        noi_dung TEXT,
        ghi_chu TEXT,
        is_valid TINYINT DEFAULT 1,
        error_msg VARCHAR(255),
        is_existing TINYINT DEFAULT 0,
        KEY idx_thu_id (thu_id)
    );
    
    -- Parse JSON
    INSERT INTO tmp_import_thu (
        thu_id, stt, ho_ten_nguoi_dong, ngay_dong, so_tien,
        phuong_thuc_thanh_toan, noi_dung, ghi_chu
    )
    SELECT
        CAST(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.thu_id')),'0') AS UNSIGNED),
        CAST(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.stt')),'0') AS UNSIGNED),
        JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.ho_ten_nguoi_dong')),
        STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.ngay_dong')),'%d/%m/%Y'),
        CAST(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.so_tien')) AS DECIMAL(18,2)),
        COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.phuong_thuc_thanh_toan')),'Tiền mặt'),
        COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.noi_dung')),''),
        COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.ghi_chu')),'')
    FROM JSON_TABLE(p_jsonData,'$[*]' COLUMNS(value JSON PATH '$')) j;
    
    -- Đánh dấu existing (sử dụng KEY column để tránh safe update mode error)
    UPDATE tmp_import_thu t
    SET t.is_existing = 1
    WHERE t.thu_id > 0
      AND EXISTS (
          SELECT 1 FROM taichinhthu tt
          WHERE tt.dongHoId = p_dongHoId
            AND tt.thuId = t.thu_id
            AND tt.active_flag = 1
      );
    
    -- Xem kết quả
    SELECT 
        row_id,
        thu_id,
        stt,
        ho_ten_nguoi_dong,
        so_tien,
        is_existing,
        CASE 
            WHEN is_existing = 1 THEN 'UPDATE'
            WHEN thu_id = 0 THEN 'INSERT (new ID)'
            ELSE 'INSERT (with ID)'
        END AS action
    FROM tmp_import_thu
    ORDER BY row_id;
    
    DROP TEMPORARY TABLE IF EXISTS tmp_import_thu;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteDongHo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DeleteDongHo`(
    IN p_dongHoId VARCHAR(50),
    IN p_lu_user_id VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;

    UPDATE dongho 
    SET 
        active_flag = 0,
        lu_updated = NOW(),
        lu_user_id = p_lu_user_id
    WHERE dongHoId = p_dongHoId;

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteMemberComposite` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DeleteMemberComposite`(
  IN p_dongHoId VARCHAR(50),
  IN p_thanhVienId INT,
  IN p_lu_user_id VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  UPDATE thanhvien SET 
    active_flag = 0,
    lu_updated = NOW(),
    lu_user_id = p_lu_user_id
  WHERE dongHoId = p_dongHoId AND thanhVienId = p_thanhVienId;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DeleteRole`(
    IN p_roleId VARCHAR(36),
    OUT p_err_code INT,
    OUT p_err_msg NVARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_err_code = @errno;
        SET p_err_msg = @text;
        ROLLBACK;
    END;

    START TRANSACTION;
    
    -- Không cho xóa role admin (sa)
    IF EXISTS (SELECT 1 FROM role WHERE roleId = p_roleId AND roleCode = 'sa') THEN
        SET p_err_code = 1;
        SET p_err_msg = 'Không thể xóa nhóm quyền Admin';
        ROLLBACK;
    ELSE
        -- Xóa quyền của role trước
        DELETE FROM role_chucnang WHERE roleId = p_roleId;
        
        -- Soft delete role
        UPDATE role SET active_flag = 0, lu_updated = NOW() WHERE roleId = p_roleId;
        
        SET p_err_code = 0;
        SET p_err_msg = 'Xóa thành công';
        COMMIT;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteSuKien` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DeleteSuKien`(
    IN p_json_list JSON,
    IN p_lu_user_id CHAR(36),
    OUT p_error_code INT, 
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_error_code = RETURNED_SQLSTATE, 
            p_error_message = MESSAGE_TEXT;
        DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
    CREATE TEMPORARY TABLE TempDeleteIds AS
    SELECT JSON_VALUE(p.value, '$.suKienId') AS id
    FROM JSON_TABLE(p_json_list, '$[*]' COLUMNS (value JSON PATH '$')) AS p;

    UPDATE sukien
    SET active_flag = 0,
        lu_updated = NOW(),
        lu_user_id = p_lu_user_id
    WHERE suKienId IN (SELECT id FROM TempDeleteIds);

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteTaiChinhChi` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DeleteTaiChinhChi`(
    IN p_list_json JSON,
    IN p_lu_user_id VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_count INT DEFAULT 0;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;
    
    SET p_error_code = 0;
    SET p_error_message = '';
    
    START TRANSACTION;
    
    -- Soft delete
    UPDATE taichinhchi t
    INNER JOIN JSON_TABLE(
        p_list_json,
        '$[*]' COLUMNS(
            chiId INT PATH '$.chiId',
            dongHoId VARCHAR(50) PATH '$.dongHoId'
        )
    ) AS j ON t.chiId = j.chiId AND t.dongHoId = j.dongHoId
    SET 
        t.active_flag = 0,
        t.lu_updated = NOW(),
        t.lu_user_id = p_lu_user_id;
    
    SET v_count = ROW_COUNT();
    
    IF v_count = 0 THEN
        SET p_error_message = 'Không tìm thấy khoản chi để xóa';
    ELSE
        SET p_error_message = CONCAT('Đã xóa ', v_count, ' khoản chi');
    END IF;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteTaiChinhThu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DeleteTaiChinhThu`(
    IN p_list_json JSON,
    IN p_lu_user_id VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_count INT DEFAULT 0;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;
    
    SET p_error_code = 0;
    SET p_error_message = '';
    
    START TRANSACTION;
    
    -- Soft delete
    UPDATE taichinhthu t
    INNER JOIN JSON_TABLE(
        p_list_json,
        '$[*]' COLUMNS(
            thuId INT PATH '$.thuId',
            dongHoId VARCHAR(50) PATH '$.dongHoId'
        )
    ) AS j ON t.thuId = j.thuId AND t.dongHoId = j.dongHoId
    SET 
        t.active_flag = 0,
        t.lu_updated = NOW(),
        t.lu_user_id = p_lu_user_id;
    
    SET v_count = ROW_COUNT();
    
    IF v_count = 0 THEN
        SET p_error_message = 'Không tìm thấy khoản thu để xóa';
    ELSE
        SET p_error_message = CONCAT('Đã xóa ', v_count, ' khoản thu');
    END IF;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteTaiLieu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DeleteTaiLieu`(
    IN p_json_list JSON,
    IN p_lu_user_id CHAR(36),
    OUT p_error_code INT, 
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_error_code = RETURNED_SQLSTATE, 
            p_error_message = MESSAGE_TEXT;
        DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
    CREATE TEMPORARY TABLE TempDeleteIds AS
    SELECT JSON_VALUE(p.value, '$.taiLieuId') AS id
    FROM JSON_TABLE(p_json_list, '$[*]' COLUMNS (value JSON PATH '$')) AS p;

    UPDATE tailieu
    SET active_flag = 0,
        lu_updated = NOW(),
        lu_user_id = p_lu_user_id
    WHERE taiLieuId IN (SELECT id FROM TempDeleteIds);

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteThanhVien` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DeleteThanhVien`(
    IN p_json_list JSON,
    IN p_lu_user_id CHAR(36),
    OUT p_error_code INT, 
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_error_code = RETURNED_SQLSTATE, 
            p_error_message = MESSAGE_TEXT;
        DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
    CREATE TEMPORARY TABLE TempDeleteIds AS
    SELECT CAST(JSON_VALUE(p.value, '$.thanhVienId') AS SIGNED) AS id
    FROM JSON_TABLE(p_json_list, '$[*]' COLUMNS (value JSON PATH '$')) AS p;

    UPDATE thanhvien
    SET active_flag = 0,
        lu_updated = NOW(),
        lu_user_id = p_lu_user_id
    WHERE thanhVienId IN (SELECT id FROM TempDeleteIds);

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteThanhVienMultiple` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DeleteThanhVienMultiple`(
    IN p_json_list JSON,
    IN p_lu_user_id VARCHAR(255),
    OUT p_error_code INT, 
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_count INT DEFAULT 0;
    DECLARE v_dongHoId VARCHAR(255);
    DECLARE v_thanhVienId INT;
    DECLARE v_index INT DEFAULT 0;
    DECLARE v_json_length INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_error_code = RETURNED_SQLSTATE, 
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;

    START TRANSACTION;
    
    SET p_error_code = 0;
    SET p_error_message = 'Xóa thành công';
    
    -- Lấy số lượng phần tử trong JSON array
    SET v_json_length = JSON_LENGTH(p_json_list);
    
    -- Kiểm tra JSON có hợp lệ không
    IF v_json_length IS NULL OR v_json_length = 0 THEN
        SET p_error_code = 1;
        SET p_error_message = 'Danh sách xóa trống hoặc không hợp lệ';
        ROLLBACK;
    ELSE
        -- Lặp qua từng phần tử trong JSON array
        WHILE v_index < v_json_length DO
            -- Lấy dongHoId và thanhVienId từ JSON
            SET v_dongHoId = JSON_UNQUOTE(JSON_EXTRACT(p_json_list, CONCAT('$[', v_index, '].dongHoId')));
            SET v_thanhVienId = JSON_EXTRACT(p_json_list, CONCAT('$[', v_index, '].thanhVienId'));
            
            -- Kiểm tra dữ liệu hợp lệ
            IF v_dongHoId IS NOT NULL AND v_thanhVienId IS NOT NULL THEN
                -- Soft delete: set active_flag = 0
                UPDATE thanhvien 
                SET active_flag = 0,
                    lu_updated = NOW(),
                    lu_user_id = p_lu_user_id
                WHERE dongHoId = v_dongHoId 
                  AND thanhVienId = v_thanhVienId 
                  AND active_flag = 1;
                
                -- Đếm số bản ghi đã cập nhật
                SET v_count = v_count + ROW_COUNT();
            END IF;
            
            SET v_index = v_index + 1;
        END WHILE;
        
        -- Kiểm tra kết quả
        IF v_count = 0 THEN
            SET p_error_code = 2;
            SET p_error_message = 'Không tìm thấy thành viên nào để xóa';
            ROLLBACK;
        ELSE
            SET p_error_message = CONCAT('Đã xóa ', v_count, ' thành viên');
            COMMIT;
        END IF;
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteTinTuc` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DeleteTinTuc`(
    IN p_json_list JSON,
    IN p_lu_user_id CHAR(36),
    OUT p_error_code INT, 
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_error_code = RETURNED_SQLSTATE, 
            p_error_message = MESSAGE_TEXT;
        DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
    CREATE TEMPORARY TABLE TempDeleteIds AS
    SELECT JSON_VALUE(p.value, '$.tinTucId') AS id
    FROM JSON_TABLE(p_json_list, '$[*]' COLUMNS (value JSON PATH '$')) AS p;

    UPDATE tintuc
    SET active_flag = 0,
        lu_updated = NOW(),
        lu_user_id = p_lu_user_id
    WHERE tinTucId IN (SELECT id FROM TempDeleteIds);

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DeleteUser`(
	IN p_json_list json,
	IN p_lu_user_id char(36),
	OUT p_error_code int, OUT p_error_message varchar(500)
)
BEGIN
    DECLARE active_flag INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
         GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
         ROLLBACK;
    END;

    SET p_error_code = 0;
	SET p_error_message = '';

	CREATE TEMPORARY TABLE Results AS
	SELECT JSON_VALUE(p.value, '$.nguoiDungId') AS nguoiDungId
		FROM JSON_TABLE(p_json_list, '$[*]' COLUMNS (
			value JSON PATH '$'
		)) AS p;

    UPDATE NguoiDung
    SET active_flag = 0,
		lu_updated = now(),
        lu_user_id = p_lu_user_id
    WHERE nguoiDungId in  (
    	select f2.nguoiDungId
    	from Results f2
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetActionByUserId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetActionByUserId`(
    IN p_nguoiDungId VARCHAR(50),
    OUT p_err_code INT,
    OUT p_err_msg VARCHAR(255)
)
BEGIN
    SET p_err_code = 0;
    SET p_err_msg = 'Success';
    
    SELECT 
        function_id,
        function_code,
        function_name,
        action_api_url,
        action_id,
        action_code,
        action_name,
        sort_order
    FROM (
        SELECT DISTINCT
            cn.chucNangId AS function_id,
            cn.chucNangCode AS function_code,
            cn.tenChucNang AS function_name,
            cn.duongDan AS action_api_url,
            tt.thaoTacId AS action_id,
            tt.thaoTacCode AS action_code,
            tt.tenThaoTac AS action_name,
            cn.thuTu AS sort_order
        FROM nguoidung nd
        INNER JOIN role r ON nd.roleId = r.roleId
        INNER JOIN role_chucnang rc ON r.roleId = rc.roleId
        INNER JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
        INNER JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
        WHERE nd.nguoiDungId = p_nguoiDungId
          AND nd.active_flag = 1
          AND r.active_flag = 1
          AND rc.active_flag = 1
          AND cn.active_flag = 1
          AND tt.active_flag = 1
    ) AS actions_list
    ORDER BY sort_order;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllChucNang` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetAllChucNang`(
    OUT p_err_code INT,
    OUT p_err_msg NVARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_err_code = @errno;
        SET p_err_msg = @text;
    END;

    SET p_err_code = 0;
    SET p_err_msg = 'Success';

    SELECT 
        chucNangId,
        chucNangCode,
        tenChucNang,
        moTa,
        parentId,
        icon,
        duongDan,
        thuTu
    FROM chucnang
    WHERE active_flag = 1
    ORDER BY thuTu ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllDongHo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `getAllDongHo`(
	OUT p_error_code INT, 
	OUT p_error_message VARCHAR(500)
)
BEGIN
	DECLARE active_flag INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
         ROLLBACK;
	END;
	SET p_error_code = 0;
    SET p_error_message = '';
    START TRANSACTION;
    SELECT dongHoId, tenDongHo, queQuanGoc, ngayThanhLap, nguoiQuanLy, ghiChu from DongHo;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllMember` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `getAllMember`(
	OUT p_error_code INT, 
	OUT p_error_message VARCHAR(500)
)
BEGIN
	DECLARE active_flag INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
         ROLLBACK;
	END;
	SET p_error_code = 0;
    SET p_error_message = '';
    START TRANSACTION;
    
    SELECT thanhVienId ,
		dongHoId ,
		hoTen  ,
		gioiTinh  ,
		ngaySinh,
		ngayMat ,
		noiSinh  ,
		noiMat  ,
		ngheNghiep  ,
		trinhDoHocVan ,
        soDienThoai,
		diaChiHienTai ,
		tieuSu  ,
		anhChanDung ,
		doiThuoc  ,
		chaId  ,
		meId  ,
		voId  ,
		chongId  from ThanhVien;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllMemberByDongHo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetAllMemberByDongHo`(
  IN p_dongHoId VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  SELECT * FROM thanhvien 
  WHERE dongHoId = p_dongHoId AND active_flag = 1
  ORDER BY doiThuoc ASC, thanhVienId ASC;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `getAllRole`(
	OUT p_error_code INT, 
	OUT p_error_message VARCHAR(500)
)
BEGIN
	DECLARE active_flag INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
         ROLLBACK;
	END;
	SET p_error_code = 0;
    SET p_error_message = '';
    START TRANSACTION;
    SELECT roleId, roleCode, roleName, createDate, nguoiTaoId, lu_updated, lu_user_id from Role;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllThaoTac` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetAllThaoTac`(
    OUT p_err_code INT,
    OUT p_err_msg NVARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_err_code = @errno;
        SET p_err_msg = @text;
    END;

    SET p_err_code = 0;
    SET p_err_msg = 'Success';

    SELECT 
        thaoTacId,
        thaoTacCode,
        tenThaoTac,
        moTa
    FROM thaotac
    WHERE active_flag = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetChiGanDay` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetChiGanDay`(
    IN p_dongHoId VARCHAR(50),
    IN p_limit INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';
    
    IF p_limit IS NULL OR p_limit <= 0 THEN
        SET p_limit = 5;
    END IF;

    SELECT 
        c.chiId,
        c.nguoiNhan,
        c.ngayChi,
        c.soTien,
        c.noiDung,
        c.phuongThucThanhToan,
        dh.tenDongHo
    FROM taichinhchi c
    LEFT JOIN dongho dh ON c.dongHoId = dh.dongHoId
    WHERE (p_dongHoId IS NULL OR p_dongHoId = '' OR c.dongHoId = p_dongHoId)
    ORDER BY c.ngayChi DESC
    LIMIT p_limit;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetDashboardStats` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetDashboardStats`(
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    -- Nếu không truyền dongHoId, lấy tất cả
    IF p_dongHoId IS NULL OR p_dongHoId = '' THEN
        SELECT 
            (SELECT COUNT(*) FROM dongho WHERE active_flag = 1) AS tongDongHo,
            (SELECT COUNT(*) FROM thanhvien WHERE active_flag = 1) AS tongThanhVien,
            (SELECT COUNT(*) FROM thanhvien WHERE active_flag = 1 AND gioiTinh = 1) AS tongNam,
            (SELECT COUNT(*) FROM thanhvien WHERE active_flag = 1 AND gioiTinh = 0) AS tongNu,
            (SELECT MAX(doiThuoc) FROM thanhvien WHERE active_flag = 1) AS doiCaoNhat,
            (SELECT COUNT(*) FROM thanhvien WHERE active_flag = 1 AND ngayMat IS NULL) AS conSong,
            (SELECT COUNT(*) FROM thanhvien WHERE active_flag = 1 AND ngayMat IS NOT NULL) AS daMat;
    ELSE
        SELECT 
            1 AS tongDongHo,
            COUNT(*) AS tongThanhVien,
            COUNT(CASE WHEN gioiTinh = 1 THEN 1 END) AS tongNam,
            COUNT(CASE WHEN gioiTinh = 0 THEN 1 END) AS tongNu,
            MAX(doiThuoc) AS doiCaoNhat,
            COUNT(CASE WHEN ngayMat IS NULL THEN 1 END) AS conSong,
            COUNT(CASE WHEN ngayMat IS NOT NULL THEN 1 END) AS daMat
        FROM thanhvien
        WHERE dongHoId = p_dongHoId AND active_flag = 1;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetDongHoById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetDongHoById`(
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    SELECT 
        dongHoId,
        tenDongHo,
        queQuanGoc,
        ngayThanhLap,
        nguoiQuanLy,
        ghiChu,
        active_flag,
        nguoiTaoId,
        ngayTao,
        lu_updated,
        lu_user_id
    FROM dongho 
    WHERE dongHoId = p_dongHoId AND active_flag = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetFunctionsByUserId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetFunctionsByUserId`(
    IN p_nguoiDungId VARCHAR(50),
    OUT p_err_code INT,
    OUT p_err_msg VARCHAR(255)
)
BEGIN
    SET p_err_code = 0;
    SET p_err_msg = 'Success';
    
    -- Lấy tất cả chức năng mà user có quyền (bao gồm cả menu cha)
    SELECT 
        function_id,
        function_code,
        function_name,
        url,
        icon,
        sort_order,
        parent_id,
        level
    FROM (
        SELECT DISTINCT
            cn.chucNangId AS function_id,
            cn.chucNangCode AS function_code,
            cn.tenChucNang AS function_name,
            cn.duongDan AS url,
            cn.icon,
            cn.thuTu AS sort_order,
            cn.parentId AS parent_id,
            CASE WHEN cn.parentId IS NULL THEN 1 ELSE 2 END AS level
        FROM nguoidung nd
        INNER JOIN role r ON nd.roleId = r.roleId
        INNER JOIN role_chucnang rc ON r.roleId = rc.roleId
        INNER JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
        WHERE nd.nguoiDungId = p_nguoiDungId
          AND nd.active_flag = 1
          AND r.active_flag = 1
          AND rc.active_flag = 1
          AND cn.active_flag = 1
        
        UNION
        
        -- Lấy thêm menu cha nếu có menu con
        SELECT DISTINCT
            parent.chucNangId AS function_id,
            parent.chucNangCode AS function_code,
            parent.tenChucNang AS function_name,
            parent.duongDan AS url,
            parent.icon,
            parent.thuTu AS sort_order,
            parent.parentId AS parent_id,
            1 AS level
        FROM nguoidung nd
        INNER JOIN role r ON nd.roleId = r.roleId
        INNER JOIN role_chucnang rc ON r.roleId = rc.roleId
        INNER JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
        INNER JOIN chucnang parent ON cn.parentId = parent.chucNangId
        WHERE nd.nguoiDungId = p_nguoiDungId
          AND nd.active_flag = 1
          AND r.active_flag = 1
          AND rc.active_flag = 1
          AND cn.active_flag = 1
          AND parent.active_flag = 1
    ) AS combined
    ORDER BY level, sort_order;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetMemberById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetMemberById`(
  IN p_dongHoId VARCHAR(50),
  IN p_thanhVienId INT,
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  SELECT tv.*, 
    cha.hoTen AS tenCha, me.hoTen AS tenMe, 
    vo.hoTen AS tenVo, chong.hoTen AS tenChong
  FROM thanhvien tv
  LEFT JOIN thanhvien cha ON tv.dongHoId = cha.dongHoId AND tv.chaId = cha.thanhVienId
  LEFT JOIN thanhvien me ON tv.dongHoId = me.dongHoId AND tv.meId = me.thanhVienId
  LEFT JOIN thanhvien vo ON tv.dongHoId = vo.dongHoId AND tv.voId = vo.thanhVienId
  LEFT JOIN thanhvien chong ON tv.dongHoId = chong.dongHoId AND tv.chongId = chong.thanhVienId
  WHERE tv.dongHoId = p_dongHoId AND tv.thanhVienId = p_thanhVienId AND tv.active_flag = 1;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetMenuByRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetMenuByRole`(
    IN p_roleId VARCHAR(36),
    OUT p_err_code INT,
    OUT p_err_msg NVARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_err_code = @errno;
        SET p_err_msg = @text;
    END;

    SET p_err_code = 0;
    SET p_err_msg = 'Success';

    SELECT DISTINCT
        cn.chucNangId,
        cn.chucNangCode AS code,
        cn.tenChucNang AS name,
        cn.duongDan AS href,
        cn.icon,
        cn.thuTu AS sortOrder,
        cn.parentId,
        GROUP_CONCAT(DISTINCT tt.thaoTacCode) AS actions
    FROM role_chucnang rc
    INNER JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
    INNER JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
    WHERE rc.roleId = p_roleId
      AND rc.active_flag = 1
      AND cn.active_flag = 1
      AND tt.active_flag = 1
    GROUP BY cn.chucNangId, cn.chucNangCode, cn.tenChucNang, cn.duongDan, cn.icon, cn.thuTu, cn.parentId
    ORDER BY cn.thuTu ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetMenuByRoleId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetMenuByRoleId`(
  IN p_roleId VARCHAR(50)
)
BEGIN
  DECLARE v_roleCode VARCHAR(50);
  
  -- Set default
  SET @err_code = 0;
  SET @err_msg = '';
  
  -- Lấy roleCode
  SELECT roleCode INTO v_roleCode FROM role WHERE roleId = p_roleId AND active_flag = 1;
  
  IF v_roleCode IS NULL THEN
    SET @err_code = 1;
    SET @err_msg = 'Role không tồn tại';
  END IF;
  
  -- Trả về danh sách menu + quyền
  SELECT 
    cn.chucNangId,
    cn.chucNangCode as code,
    cn.tenChucNang as name,
    cn.duongDan as href,
    cn.icon,
    cn.thuTu as sortOrder,
    cn.parentId,
    GROUP_CONCAT(DISTINCT tt.thaoTacCode ORDER BY tt.thaoTacCode) as actions,
    v_roleCode as roleCode,
    CASE WHEN v_roleCode = 'sa' THEN 1 ELSE 0 END as canSelectAllDongHo
  FROM role_chucnang rc
  JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
  JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
  WHERE rc.roleId = p_roleId
    AND rc.active_flag = 1
    AND cn.active_flag = 1
  GROUP BY cn.chucNangId, cn.chucNangCode, cn.tenChucNang, cn.duongDan, cn.icon, cn.thuTu, cn.parentId
  ORDER BY cn.thuTu;
  
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetNextThanhVienId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetNextThanhVienId`(
    IN p_dongHoId VARCHAR(50),
    OUT p_nextId INT
)
BEGIN
    SELECT COALESCE(MAX(thanhVienId), 0) + 1 INTO p_nextId
    FROM thanhvien
    WHERE dongHoId = p_dongHoId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetRolePermissions` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetRolePermissions`(
    IN p_roleId VARCHAR(36),
    OUT p_err_code INT,
    OUT p_err_msg NVARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_err_code = @errno;
        SET p_err_msg = @text;
    END;

    SET p_err_code = 0;
    SET p_err_msg = 'Success';

    SELECT 
        rc.id,
        rc.roleId,
        rc.chucNangId,
        cn.chucNangCode,
        cn.tenChucNang,
        rc.thaoTacId,
        tt.thaoTacCode,
        tt.tenThaoTac,
        rc.dongHoId,
        rc.active_flag
    FROM role_chucnang rc
    INNER JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
    INNER JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
    WHERE rc.roleId = p_roleId
    ORDER BY cn.thuTu, tt.thaoTacId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetSuKienSapToi` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetSuKienSapToi`(
    IN p_dongHoId VARCHAR(50),
    IN p_limit INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';
    
    IF p_limit IS NULL OR p_limit <= 0 THEN
        SET p_limit = 5;
    END IF;

    SELECT 
        sk.suKienId,
        sk.tenSuKien,
        sk.ngayDienRa,
        sk.gioDienRa,
        sk.diaDiem,
        sk.moTa,
        sk.loaiSuKien,
        sk.uuTien,
        dh.tenDongHo
    FROM sukien sk
    LEFT JOIN dongho dh ON sk.dongHoId = dh.dongHoId
    WHERE sk.ngayDienRa >= CURDATE()
        AND (p_dongHoId IS NULL OR p_dongHoId = '' OR sk.dongHoId = p_dongHoId)
    ORDER BY sk.ngayDienRa ASC, sk.gioDienRa ASC
    LIMIT p_limit;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetTaiLieuById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetTaiLieuById`(
  IN p_taiLieuId VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  SELECT 
    tl.taiLieuId,
    tl.dongHoId,
    tl.tenTaiLieu,
    tl.duongDan,
    tl.moTa,
    tl.loaiTaiLieu,
    tl.namSangTac,
    tl.tacGia,
    tl.nguonGoc,
    tl.ghiChu,
    tl.ngayTaiLen,
    tl.active_flag,
    tl.nguoiTaoId,
    tl.lu_updated,
    d.tenDongHo
  FROM tailieu tl
  LEFT JOIN dongho d ON tl.dongHoId = d.dongHoId
  WHERE tl.taiLieuId = p_taiLieuId AND tl.active_flag = 1;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetThanhVienMoiNhat` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetThanhVienMoiNhat`(
    IN p_dongHoId VARCHAR(50),
    IN p_limit INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';
    
    IF p_limit IS NULL OR p_limit <= 0 THEN
        SET p_limit = 10;
    END IF;

    SELECT 
        tv.thanhVienId,
        tv.hoTen,
        tv.gioiTinh,
        tv.ngaySinh,
        tv.doiThuoc,
        tv.ngayTao,
        dh.tenDongHo
    FROM thanhvien tv
    LEFT JOIN dongho dh ON tv.dongHoId = dh.dongHoId
    WHERE tv.active_flag = 1
        AND (p_dongHoId IS NULL OR p_dongHoId = '' OR tv.dongHoId = p_dongHoId)
    ORDER BY tv.ngayTao DESC
    LIMIT p_limit;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetThongKeoTheoChi` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetThongKeoTheoChi`(
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    -- Lấy các thành viên đời 1 (tổ tiên) làm gốc chi
    WITH RECURSIVE ChiTree AS (
        -- Đời 1: Các tổ tiên (không có cha hoặc cha không trong hệ thống)
        SELECT 
            thanhVienId,
            hoTen,
            thanhVienId AS chiGocId,
            hoTen AS tenChi,
            1 AS level
        FROM thanhvien
        WHERE dongHoId = p_dongHoId 
            AND active_flag = 1 
            AND doiThuoc = 1
            AND gioiTinh = 1  -- Chỉ lấy nam làm gốc chi
        
        UNION ALL
        
        -- Các đời sau: con cháu
        SELECT 
            tv.thanhVienId,
            tv.hoTen,
            ct.chiGocId,
            ct.tenChi,
            ct.level + 1
        FROM thanhvien tv
        INNER JOIN ChiTree ct ON tv.chaId = ct.thanhVienId
        WHERE tv.dongHoId = p_dongHoId AND tv.active_flag = 1
    )
    SELECT 
        ct.chiGocId,
        ct.tenChi AS tenChi,
        COUNT(*) AS soThanhVien,
        MAX(ct.level) AS soDoi
    FROM ChiTree ct
    GROUP BY ct.chiGocId, ct.tenChi
    ORDER BY ct.chiGocId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetThongKeoTheoDoi` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetThongKeoTheoDoi`(
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    SELECT 
        doiThuoc AS doi,
        COUNT(*) AS soThanhVien,
        COUNT(CASE WHEN gioiTinh = 1 THEN 1 END) AS soNam,
        COUNT(CASE WHEN gioiTinh = 0 THEN 1 END) AS soNu,
        COUNT(CASE WHEN ngayMat IS NOT NULL THEN 1 END) AS daMat
    FROM thanhvien
    WHERE dongHoId = p_dongHoId AND active_flag = 1
    GROUP BY doiThuoc
    ORDER BY doiThuoc ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetThongKeSuKien` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetThongKeSuKien`(
    IN p_dongHoId VARCHAR(50),
    IN p_nam INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    SELECT 
        COUNT(*) AS tongSuKien,
        COUNT(CASE WHEN ngayDienRa < CURDATE() THEN 1 END) AS daQua,
        COUNT(CASE WHEN ngayDienRa >= CURDATE() THEN 1 END) AS sapToi,
        COUNT(CASE WHEN loaiSuKien = 'gio' THEN 1 END) AS suKienGio,
        COUNT(CASE WHEN loaiSuKien = 'cuoi' THEN 1 END) AS suKienCuoi,
        COUNT(CASE WHEN loaiSuKien = 'tang' THEN 1 END) AS suKienTang,
        COUNT(CASE WHEN loaiSuKien = 'khac' OR loaiSuKien IS NULL THEN 1 END) AS suKienKhac
    FROM sukien
    WHERE dongHoId = p_dongHoId
        AND (p_nam IS NULL OR YEAR(ngayDienRa) = p_nam);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetThongKeThuChi` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetThongKeThuChi`(
    IN p_dongHoId VARCHAR(50),
    IN p_nam INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    SELECT 
        COALESCE((SELECT SUM(soTien) FROM taichinhthu 
                  WHERE dongHoId = p_dongHoId 
                  AND (p_nam IS NULL OR YEAR(ngayDong) = p_nam)), 0) AS tongThu,
        COALESCE((SELECT SUM(soTien) FROM taichinhchi 
                  WHERE dongHoId = p_dongHoId 
                  AND (p_nam IS NULL OR YEAR(ngayChi) = p_nam)), 0) AS tongChi,
        COALESCE((SELECT COUNT(*) FROM taichinhthu 
                  WHERE dongHoId = p_dongHoId 
                  AND (p_nam IS NULL OR YEAR(ngayDong) = p_nam)), 0) AS soLanThu,
        COALESCE((SELECT COUNT(*) FROM taichinhchi 
                  WHERE dongHoId = p_dongHoId 
                  AND (p_nam IS NULL OR YEAR(ngayChi) = p_nam)), 0) AS soLanChi;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetThongKeThuChiTheoThang` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetThongKeThuChiTheoThang`(
    IN p_dongHoId VARCHAR(50),
    IN p_nam INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    -- Nếu không truyền năm, lấy năm hiện tại
    IF p_nam IS NULL THEN
        SET p_nam = YEAR(CURDATE());
    END IF;

    SELECT 
        m.thang,
        COALESCE(t.tongThu, 0) AS tongThu,
        COALESCE(c.tongChi, 0) AS tongChi
    FROM (
        SELECT 1 AS thang UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 
        UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 
        UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
    ) m
    LEFT JOIN (
        SELECT MONTH(ngayDong) AS thang, SUM(soTien) AS tongThu
        FROM taichinhthu
        WHERE dongHoId = p_dongHoId AND YEAR(ngayDong) = p_nam
        GROUP BY MONTH(ngayDong)
    ) t ON m.thang = t.thang
    LEFT JOIN (
        SELECT MONTH(ngayChi) AS thang, SUM(soTien) AS tongChi
        FROM taichinhchi
        WHERE dongHoId = p_dongHoId AND YEAR(ngayChi) = p_nam
        GROUP BY MONTH(ngayChi)
    ) c ON m.thang = c.thang
    ORDER BY m.thang;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetThongKeTongQuan` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetThongKeTongQuan`(
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    SELECT 
        COUNT(*) AS tongThanhVien,
        COUNT(CASE WHEN gioiTinh = 1 THEN 1 END) AS soNam,
        COUNT(CASE WHEN gioiTinh = 0 THEN 1 END) AS soNu,
        COUNT(CASE WHEN ngayMat IS NOT NULL THEN 1 END) AS daMat,
        COUNT(CASE WHEN ngayMat IS NULL THEN 1 END) AS conSong,
        MAX(doiThuoc) AS soDoi,
        COUNT(DISTINCT chaId) AS soChi
    FROM thanhvien
    WHERE dongHoId = p_dongHoId AND active_flag = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetThuGanDay` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetThuGanDay`(
    IN p_dongHoId VARCHAR(50),
    IN p_limit INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';
    
    IF p_limit IS NULL OR p_limit <= 0 THEN
        SET p_limit = 5;
    END IF;

    SELECT 
        t.thuId,
        t.hoTenNguoiDong,
        t.ngayDong,
        t.soTien,
        t.noiDung,
        t.phuongThucThanhToan,
        dh.tenDongHo
    FROM taichinhthu t
    LEFT JOIN dongho dh ON t.dongHoId = dh.dongHoId
    WHERE (p_dongHoId IS NULL OR p_dongHoId = '' OR t.dongHoId = p_dongHoId)
    ORDER BY t.ngayDong DESC
    LIMIT p_limit;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetTinTucById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetTinTucById`(
  IN p_tinTucId VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  -- Tăng lượt xem
  UPDATE tintuc SET luotXem = luotXem + 1 WHERE tinTucId = p_tinTucId;
  
  -- Lấy dữ liệu
  SELECT 
    t.tinTucId,
    t.dongHoId,
    t.tieuDe,
    t.noiDung,
    t.tomTat,
    t.anhDaiDien,
    t.tacGia,
    t.ngayDang,
    t.luotXem,
    t.ghim,
    t.active_flag,
    t.nguoiTaoId,
    t.lu_updated,
    d.tenDongHo
  FROM tintuc t
  LEFT JOIN dongho d ON t.dongHoId = d.dongHoId
  WHERE t.tinTucId = p_tinTucId AND t.active_flag = 1;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetUserById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetUserById`(
    IN p_nguoiDungId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    -- Tất cả DECLARE phải ở đầu
    DECLARE v_count INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = MYSQL_ERRNO,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;
    
    -- Khởi tạo giá trị mặc định
    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;

    -- Kiểm tra input parameters
    IF p_nguoiDungId IS NULL OR p_nguoiDungId = '' THEN
        SET p_error_code = 1001;
        SET p_error_message = 'Thiếu thông tin nguoiDungId';
        ROLLBACK;
    ELSE
        -- Kiểm tra user có tồn tại và active không
        SELECT COUNT(*) INTO v_count
        FROM nguoidung 
        WHERE nguoiDungId = p_nguoiDungId AND active_flag = 1;
        
        IF v_count = 0 THEN
            SET p_error_code = 1002;
            SET p_error_message = 'Không tìm thấy user hoặc user đã bị vô hiệu hóa';
            ROLLBACK;
        ELSE
            -- Lấy thông tin user với dongho và role
            SELECT 
                nd.nguoiDungId,
                nd.first_name,
                nd.middle_name, 
                nd.last_name,
                nd.full_name,
                nd.gender,
                nd.date_of_birthday,
                nd.avatar,
                nd.email,
                nd.phone,
                nd.dongHoId,
                nd.roleId,
                nd.online_flag,
                nd.active_flag,
                nd.created_at,
                nd.updated_at,
                -- Thông tin dòng họ
                COALESCE(dh.tenDongHo, '') as tenDongHo,
                -- Thông tin role
                COALESCE(r.roleCode, '') as roleCode,
                COALESCE(r.roleName, '') as roleName
            FROM nguoidung nd
            LEFT JOIN dongho dh ON nd.dongHoId = dh.dongHoId
            LEFT JOIN role r ON nd.roleId = r.roleId
            WHERE nd.nguoiDungId = p_nguoiDungId 
              AND nd.active_flag = 1;
            
            SET p_error_code = 0;
            SET p_error_message = 'Lấy thông tin user thành công';
        END IF;
    END IF;

    COMMIT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ImportTaiChinhChiFromJson` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `ImportTaiChinhChiFromJson`(
    IN p_json_data JSON,
    IN p_dongHoId VARCHAR(50),
    IN p_nguoiTaoId VARCHAR(50),
    OUT p_err_code INT,
    OUT p_err_msg VARCHAR(500)
)
proc_exit: BEGIN
    DECLARE v_count INT DEFAULT 0;
    DECLARE v_success_count INT DEFAULT 0;
    DECLARE v_error_count INT DEFAULT 0;
    DECLARE v_updated_count INT DEFAULT 0;
    DECLARE v_inserted_count INT DEFAULT 0;
    DECLARE v_reactivated_count INT DEFAULT 0;
    DECLARE v_json_length INT DEFAULT 0;
    DECLARE v_index INT DEFAULT 0;
    
    DECLARE v_chiId INT;
    DECLARE v_ngay_chi DATE;
    DECLARE v_so_tien DECIMAL(18,2);
    DECLARE v_phuong_thuc_thanh_toan VARCHAR(100);
    DECLARE v_noi_dung TEXT;
    DECLARE v_nguoi_nhan VARCHAR(255);
    DECLARE v_ghi_chu TEXT;
    
    DECLARE v_existing_active_flag TINYINT;
    DECLARE v_record_exists INT DEFAULT 0;
    
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION 
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_err_code = MYSQL_ERRNO,
            p_err_msg = MESSAGE_TEXT;
        ROLLBACK;
    END;

    -- Khởi tạo
    SET p_err_code = 0;
    SET p_err_msg = '';
    
    -- Validate input
    IF p_json_data IS NULL OR JSON_LENGTH(p_json_data) = 0 THEN
        SET p_err_code = 1001;
        SET p_err_msg = 'Dữ liệu JSON trống hoặc không hợp lệ';
        LEAVE proc_exit;
    END IF;
    
    IF p_dongHoId IS NULL OR p_dongHoId = '' THEN
        SET p_err_code = 1002;
        SET p_err_msg = 'dongHoId không được để trống';
        LEAVE proc_exit;
    END IF;

    -- Bắt đầu transaction
    START TRANSACTION;
    
    -- Lấy số lượng phần tử trong JSON array
    SET v_json_length = JSON_LENGTH(p_json_data);
    SET v_index = 0;
    
    -- Vòng lặp xử lý từng phần tử
    WHILE v_index < v_json_length DO
        -- Lấy dữ liệu từ JSON array
        SET v_chiId = JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].stt')));
        SET v_ngay_chi = STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].ngay_chi'))), '%d/%m/%Y');
        SET v_so_tien = CAST(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].so_tien'))) AS DECIMAL(18,2));
        SET v_phuong_thuc_thanh_toan = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].phuong_thuc_thanh_toan'))), 'Tiền mặt');
        SET v_noi_dung = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].noi_dung'))), '');
        SET v_nguoi_nhan = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].nguoi_nhan'))), '');
        SET v_ghi_chu = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].ghi_chu'))), '');
        
        SET v_count = v_count + 1;
        
        -- Validate dữ liệu cơ bản
        IF v_chiId IS NULL OR v_chiId <= 0 THEN
            SET v_error_count = v_error_count + 1;
        ELSEIF v_so_tien IS NULL OR v_so_tien < 0 THEN
            SET v_error_count = v_error_count + 1;
        ELSE
            -- Kiểm tra record đã tồn tại chưa
            SET v_record_exists = 0;
            SET v_existing_active_flag = NULL;
            
            SELECT COUNT(*), MAX(active_flag) 
            INTO v_record_exists, v_existing_active_flag
            FROM taichinhchi 
            WHERE chiId = v_chiId AND dongHoId = p_dongHoId;
            
            -- Xử lý theo từng trường hợp
            IF v_record_exists = 0 THEN
                -- Case 1: Record chưa tồn tại → INSERT mới
                INSERT INTO taichinhchi (
                    chiId, dongHoId, ngayChi, soTien, phuongThucThanhToan,
                    noiDung, nguoiNhan, ghiChu, nguoiNhapId,
                    ngayTao, active_flag, lu_updated, lu_user_id
                ) VALUES (
                    v_chiId, p_dongHoId, v_ngay_chi, v_so_tien, v_phuong_thuc_thanh_toan,
                    v_noi_dung, v_nguoi_nhan, v_ghi_chu, p_nguoiTaoId,
                    NOW(), 1, NOW(), p_nguoiTaoId
                );
                
                SET v_inserted_count = v_inserted_count + 1;
                SET v_success_count = v_success_count + 1;
                
            ELSEIF v_existing_active_flag = 0 THEN
                -- Case 2: Record tồn tại nhưng đã bị "xóa" (active_flag = 0) → Reactivate và update
                UPDATE taichinhchi SET
                    ngayChi = v_ngay_chi,
                    soTien = v_so_tien,
                    phuongThucThanhToan = v_phuong_thuc_thanh_toan,
                    noiDung = v_noi_dung,
                    nguoiNhan = v_nguoi_nhan,
                    ghiChu = v_ghi_chu,
                    active_flag = 1,  -- Reactivate
                    lu_updated = NOW(),
                    lu_user_id = p_nguoiTaoId
                WHERE chiId = v_chiId AND dongHoId = p_dongHoId;
                
                SET v_reactivated_count = v_reactivated_count + 1;
                SET v_success_count = v_success_count + 1;
                
            ELSE
                -- Case 3: Record tồn tại và đang active (active_flag = 1) → Update thông tin
                UPDATE taichinhchi SET
                    ngayChi = v_ngay_chi,
                    soTien = v_so_tien,
                    phuongThucThanhToan = v_phuong_thuc_thanh_toan,
                    noiDung = v_noi_dung,
                    nguoiNhan = v_nguoi_nhan,
                    ghiChu = v_ghi_chu,
                    lu_updated = NOW(),
                    lu_user_id = p_nguoiTaoId
                WHERE chiId = v_chiId AND dongHoId = p_dongHoId;
                
                SET v_updated_count = v_updated_count + 1;
                SET v_success_count = v_success_count + 1;
            END IF;
        END IF;
        
        SET v_index = v_index + 1;
    END WHILE;
    
    -- Commit transaction
    COMMIT;
    
    -- Tạo message kết quả
    SET p_err_code = 0;
    SET p_err_msg = CONCAT(
        'Import thành công: ', v_success_count, '/', v_count, ' records. ',
        'Chi tiết: ', v_inserted_count, ' mới, ', 
        v_updated_count, ' cập nhật, ', 
        v_reactivated_count, ' khôi phục'
    );
    
    -- Nếu có lỗi một phần
    IF v_error_count > 0 THEN
        SET p_err_code = 1001; -- Partial success
        SET p_err_msg = CONCAT(p_err_msg, '. Có ', v_error_count, ' lỗi bị bỏ qua');
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ImportTaiChinhThuFromJson` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `ImportTaiChinhThuFromJson`(
    IN p_json_data JSON,
    IN p_dongHoId VARCHAR(50),
    IN p_nguoiTaoId VARCHAR(50),
    OUT p_err_code INT,
    OUT p_err_msg VARCHAR(500)
)
proc_exit: BEGIN
    DECLARE v_count INT DEFAULT 0;
    DECLARE v_success_count INT DEFAULT 0;
    DECLARE v_error_count INT DEFAULT 0;
    DECLARE v_updated_count INT DEFAULT 0;
    DECLARE v_inserted_count INT DEFAULT 0;
    DECLARE v_reactivated_count INT DEFAULT 0;
    DECLARE v_json_length INT DEFAULT 0;
    DECLARE v_index INT DEFAULT 0;
    
    DECLARE v_thuId INT;
    DECLARE v_ho_ten_nguoi_dong VARCHAR(255);
    DECLARE v_ngay_dong DATE;
    DECLARE v_so_tien DECIMAL(18,2);
    DECLARE v_phuong_thuc_thanh_toan VARCHAR(100);
    DECLARE v_noi_dung TEXT;
    DECLARE v_ghi_chu TEXT;
    
    DECLARE v_existing_active_flag TINYINT;
    DECLARE v_record_exists INT DEFAULT 0;
    
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION 
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_err_code = MYSQL_ERRNO,
            p_err_msg = MESSAGE_TEXT;
        ROLLBACK;
    END;

    -- Khởi tạo
    SET p_err_code = 0;
    SET p_err_msg = '';
    
    -- Validate input
    IF p_json_data IS NULL OR JSON_LENGTH(p_json_data) = 0 THEN
        SET p_err_code = 1001;
        SET p_err_msg = 'Dữ liệu JSON trống hoặc không hợp lệ';
        LEAVE proc_exit;
    END IF;
    
    IF p_dongHoId IS NULL OR p_dongHoId = '' THEN
        SET p_err_code = 1002;
        SET p_err_msg = 'dongHoId không được để trống';
        LEAVE proc_exit;
    END IF;

    -- Bắt đầu transaction
    START TRANSACTION;
    
    -- Lấy số lượng phần tử trong JSON array
    SET v_json_length = JSON_LENGTH(p_json_data);
    SET v_index = 0;
    
    -- Vòng lặp xử lý từng phần tử
    WHILE v_index < v_json_length DO
        -- Lấy dữ liệu từ JSON array
        SET v_thuId = JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].stt')));
        SET v_ho_ten_nguoi_dong = JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].ho_ten_nguoi_dong')));
        SET v_ngay_dong = STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].ngay_dong'))), '%d/%m/%Y');
        SET v_so_tien = CAST(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].so_tien'))) AS DECIMAL(18,2));
        SET v_phuong_thuc_thanh_toan = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].phuong_thuc_thanh_toan'))), 'Tiền mặt');
        SET v_noi_dung = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].noi_dung'))), '');
        SET v_ghi_chu = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].ghi_chu'))), '');
        
        SET v_count = v_count + 1;
        
        -- Validate dữ liệu cơ bản
        IF v_thuId IS NULL OR v_thuId <= 0 THEN
            SET v_error_count = v_error_count + 1;
        ELSEIF v_ho_ten_nguoi_dong IS NULL OR TRIM(v_ho_ten_nguoi_dong) = '' THEN
            SET v_error_count = v_error_count + 1;
        ELSEIF v_so_tien IS NULL OR v_so_tien < 0 THEN
            SET v_error_count = v_error_count + 1;
        ELSE
            -- Kiểm tra record đã tồn tại chưa
            SET v_record_exists = 0;
            SET v_existing_active_flag = NULL;
            
            SELECT COUNT(*), MAX(active_flag) 
            INTO v_record_exists, v_existing_active_flag
            FROM taichinhthu 
            WHERE thuId = v_thuId AND dongHoId = p_dongHoId;
            
            -- Xử lý theo từng trường hợp
            IF v_record_exists = 0 THEN
                -- Case 1: Record chưa tồn tại → INSERT mới
                INSERT INTO taichinhthu (
                    thuId, dongHoId, hoTenNguoiDong, ngayDong, soTien,
                    phuongThucThanhToan, noiDung, ghiChu, nguoiNhapId,
                    ngayTao, active_flag, lu_updated, lu_user_id
                ) VALUES (
                    v_thuId, p_dongHoId, v_ho_ten_nguoi_dong, v_ngay_dong, v_so_tien,
                    v_phuong_thuc_thanh_toan, v_noi_dung, v_ghi_chu, p_nguoiTaoId,
                    NOW(), 1, NOW(), p_nguoiTaoId
                );
                
                SET v_inserted_count = v_inserted_count + 1;
                SET v_success_count = v_success_count + 1;
                
            ELSEIF v_existing_active_flag = 0 THEN
                -- Case 2: Record tồn tại nhưng đã bị "xóa" (active_flag = 0) → Reactivate và update
                UPDATE taichinhthu SET
                    hoTenNguoiDong = v_ho_ten_nguoi_dong,
                    ngayDong = v_ngay_dong,
                    soTien = v_so_tien,
                    phuongThucThanhToan = v_phuong_thuc_thanh_toan,
                    noiDung = v_noi_dung,
                    ghiChu = v_ghi_chu,
                    active_flag = 1,  -- Reactivate
                    lu_updated = NOW(),
                    lu_user_id = p_nguoiTaoId
                WHERE thuId = v_thuId AND dongHoId = p_dongHoId;
                
                SET v_reactivated_count = v_reactivated_count + 1;
                SET v_success_count = v_success_count + 1;
                
            ELSE
                -- Case 3: Record tồn tại và đang active (active_flag = 1) → Update thông tin
                UPDATE taichinhthu SET
                    hoTenNguoiDong = v_ho_ten_nguoi_dong,
                    ngayDong = v_ngay_dong,
                    soTien = v_so_tien,
                    phuongThucThanhToan = v_phuong_thuc_thanh_toan,
                    noiDung = v_noi_dung,
                    ghiChu = v_ghi_chu,
                    lu_updated = NOW(),
                    lu_user_id = p_nguoiTaoId
                WHERE thuId = v_thuId AND dongHoId = p_dongHoId;
                
                SET v_updated_count = v_updated_count + 1;
                SET v_success_count = v_success_count + 1;
            END IF;
        END IF;
        
        SET v_index = v_index + 1;
    END WHILE;
    
    -- Commit transaction
    COMMIT;
    
    -- Tạo message kết quả
    SET p_err_code = 0;
    SET p_err_msg = CONCAT(
        'Import thành công: ', v_success_count, '/', v_count, ' records. ',
        'Chi tiết: ', v_inserted_count, ' mới, ', 
        v_updated_count, ' cập nhật, ', 
        v_reactivated_count, ' khôi phục'
    );
    
    -- Nếu có lỗi một phần
    IF v_error_count > 0 THEN
        SET p_err_code = 1001; -- Partial success
        SET p_err_msg = CONCAT(p_err_msg, '. Có ', v_error_count, ' lỗi bị bỏ qua');
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ImportThanhVienFromJson` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `ImportThanhVienFromJson`(
    IN p_json_data JSON,
    IN p_dong_ho_id VARCHAR(36),
    IN p_nguoi_tao_id VARCHAR(36),
    OUT p_err_code INT,
    OUT p_err_msg VARCHAR(500)
)
BEGIN
    DECLARE v_count INT DEFAULT 0;
    DECLARE v_insert_count INT DEFAULT 0;
    DECLARE v_update_count INT DEFAULT 0;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_err_code = RETURNED_SQLSTATE, 
            p_err_msg = MESSAGE_TEXT;
        ROLLBACK;
    END;

    SET p_err_code = 0;
    SET p_err_msg = '';

    START TRANSACTION;

    -- 1. Tạo bảng tạm chứa dữ liệu từ JSON
    DROP TEMPORARY TABLE IF EXISTS TempThanhVien;
    CREATE TEMPORARY TABLE TempThanhVien (
        stt INT,
        hoTen VARCHAR(255),
        gioiTinh TINYINT,
        ngaySinh VARCHAR(50),
        ngayMat VARCHAR(50),
        noiSinh VARCHAR(255),
        noiMat VARCHAR(255),
        ngheNghiep VARCHAR(255),
        trinhDoHocVan VARCHAR(255),
        diaChiHienTai VARCHAR(500),
        tieuSu TEXT,
        doiThuoc INT,
        chaId INT,
        meId INT,
        voId INT,
        chongId INT,
        is_existing TINYINT DEFAULT 0,
        INDEX idx_stt (stt)
    );

    -- 2. Parse JSON vào bảng tạm
    INSERT INTO TempThanhVien (stt, hoTen, gioiTinh, ngaySinh, ngayMat, noiSinh, noiMat, 
                               ngheNghiep, trinhDoHocVan, diaChiHienTai, tieuSu, doiThuoc,
                               chaId, meId, voId, chongId)
    SELECT 
        CAST(JSON_VALUE(item.value, '$.stt') AS UNSIGNED),
        JSON_VALUE(item.value, '$.hoTen'),
        CAST(JSON_VALUE(item.value, '$.gioiTinh') AS UNSIGNED),
        JSON_VALUE(item.value, '$.ngaySinh'),
        JSON_VALUE(item.value, '$.ngayMat'),
        JSON_VALUE(item.value, '$.noiSinh'),
        JSON_VALUE(item.value, '$.noiMat'),
        JSON_VALUE(item.value, '$.ngheNghiep'),
        JSON_VALUE(item.value, '$.trinhDoHocVan'),
        JSON_VALUE(item.value, '$.diaChiHienTai'),
        JSON_VALUE(item.value, '$.tieuSu'),
        IFNULL(CAST(JSON_VALUE(item.value, '$.doiThuoc') AS UNSIGNED), 1),
        NULLIF(CAST(JSON_VALUE(item.value, '$.chaId') AS UNSIGNED), 0),
        NULLIF(CAST(JSON_VALUE(item.value, '$.meId') AS UNSIGNED), 0),
        NULLIF(CAST(JSON_VALUE(item.value, '$.voId') AS UNSIGNED), 0),
        NULLIF(CAST(JSON_VALUE(item.value, '$.chongId') AS UNSIGNED), 0)
    FROM JSON_TABLE(p_json_data, '$[*]' COLUMNS (value JSON PATH '$')) AS item;

    -- Đếm tổng số record
    SELECT COUNT(*) INTO v_count FROM TempThanhVien;

    -- 3. Đánh dấu record đã tồn tại trong DB
    UPDATE TempThanhVien t
    INNER JOIN thanhvien tv ON tv.thanhVienId = t.stt AND tv.dongHoId = p_dong_ho_id
    SET t.is_existing = 1;

    -- 4. INSERT các record mới (chưa tồn tại) - FK = NULL trước
    INSERT INTO thanhvien (
        thanhVienId,
        dongHoId, hoTen, gioiTinh, ngaySinh, ngayMat, 
        noiSinh, noiMat, ngheNghiep, trinhDoHocVan, 
        diaChiHienTai, tieuSu, doiThuoc,
        chaId, meId, voId, chongId,
        nguoiTaoId, ngayTao, active_flag
    )
    SELECT 
        t.stt,
        p_dong_ho_id,
        t.hoTen,
        t.gioiTinh,
        NULLIF(t.ngaySinh, 'null'),
        NULLIF(t.ngayMat, 'null'),
        t.noiSinh,
        t.noiMat,
        t.ngheNghiep,
        t.trinhDoHocVan,
        t.diaChiHienTai,
        t.tieuSu,
        IFNULL(t.doiThuoc, 1),
        NULL, NULL, NULL, NULL,
        p_nguoi_tao_id,
        NOW(),
        1
    FROM TempThanhVien t
    WHERE t.is_existing = 0
    ORDER BY t.doiThuoc ASC, t.stt ASC;

    SET v_insert_count = ROW_COUNT();

    -- 5. UPDATE các record đã tồn tại (thông tin cơ bản, FK = NULL trước)
    UPDATE thanhvien tv
    INNER JOIN TempThanhVien t ON tv.thanhVienId = t.stt AND tv.dongHoId = p_dong_ho_id
    SET 
        tv.hoTen = t.hoTen,
        tv.gioiTinh = t.gioiTinh,
        tv.ngaySinh = NULLIF(t.ngaySinh, 'null'),
        tv.ngayMat = NULLIF(t.ngayMat, 'null'),
        tv.noiSinh = t.noiSinh,
        tv.noiMat = t.noiMat,
        tv.ngheNghiep = t.ngheNghiep,
        tv.trinhDoHocVan = t.trinhDoHocVan,
        tv.diaChiHienTai = t.diaChiHienTai,
        tv.tieuSu = t.tieuSu,
        tv.doiThuoc = IFNULL(t.doiThuoc, 1),
        tv.chaId = NULL,
        tv.meId = NULL,
        tv.voId = NULL,
        tv.chongId = NULL
    WHERE t.is_existing = 1;

    SET v_update_count = ROW_COUNT();

    -- 6. UPDATE quan hệ cha/mẹ/vợ/chồng cho TẤT CẢ record
    UPDATE thanhvien tv
    INNER JOIN TempThanhVien t ON tv.thanhVienId = t.stt
    SET 
        tv.chaId = t.chaId,
        tv.meId = t.meId,
        tv.voId = CASE WHEN t.gioiTinh = 1 THEN t.voId ELSE NULL END,
        tv.chongId = CASE WHEN t.gioiTinh = 0 THEN t.chongId ELSE NULL END
    WHERE tv.dongHoId = p_dong_ho_id;

    -- Cleanup
    DROP TEMPORARY TABLE IF EXISTS TempThanhVien;

    COMMIT;

    SET p_err_msg = CONCAT('Import thanh cong: ', v_insert_count, ' moi, ', v_update_count, ' cap nhat. Tong: ', v_count);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ImportThanhVienFromJsonComposite` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `ImportThanhVienFromJsonComposite`(
    IN  p_jsonData JSON,
    IN  p_dongHoId VARCHAR(50),
    IN  p_nguoiTaoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
proc_exit: BEGIN
    DECLARE v_inserted INT DEFAULT 0;
    DECLARE v_updated INT DEFAULT 0;
    DECLARE v_reactivated INT DEFAULT 0;
    DECLARE v_total INT DEFAULT 0;
    DECLARE v_error_count INT DEFAULT 0;
    DECLARE v_json_length INT DEFAULT 0;
    DECLARE v_index INT DEFAULT 0;

    DECLARE v_thanhVienId INT;
    DECLARE v_hoTen VARCHAR(255);
    DECLARE v_gioiTinh TINYINT;
    DECLARE v_ngaySinh VARCHAR(50);
    DECLARE v_ngayMat VARCHAR(50);
    DECLARE v_noiSinh VARCHAR(255);
    DECLARE v_noiMat VARCHAR(255);
    DECLARE v_ngheNghiep VARCHAR(255);
    DECLARE v_trinhDoHocVan VARCHAR(255);
    DECLARE v_diaChiHienTai VARCHAR(500);
    DECLARE v_tieuSu TEXT;
    DECLARE v_doiThuoc INT;
    DECLARE v_chaId INT;
    DECLARE v_meId INT;
    DECLARE v_voId INT;
    DECLARE v_chongId INT;

    DECLARE v_existing_active_flag TINYINT;
    DECLARE v_record_exists INT DEFAULT 0;

    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = MYSQL_ERRNO,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;

    -- Init
    SET p_error_code = 0;
    SET p_error_message = '';

    -- Validate input
    IF p_jsonData IS NULL OR JSON_LENGTH(p_jsonData) = 0 THEN
        SET p_error_code = 1001;
        SET p_error_message = 'Dữ liệu JSON trống hoặc không hợp lệ';
        LEAVE proc_exit;
    END IF;

    IF p_dongHoId IS NULL OR p_dongHoId = '' THEN
        SET p_error_code = 1002;
        SET p_error_message = 'dongHoId không được để trống';
        LEAVE proc_exit;
    END IF;

    START TRANSACTION;

    SET v_json_length = JSON_LENGTH(p_jsonData);
    SET v_index = 0;

    WHILE v_index < v_json_length DO

        SET v_thanhVienId = CAST(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].stt'))) AS UNSIGNED);
        SET v_hoTen = JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].hoTen')));
        SET v_gioiTinh = CAST(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].gioiTinh'))) AS UNSIGNED);
        SET v_ngaySinh = JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].ngaySinh')));
        SET v_ngayMat = JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].ngayMat')));
        SET v_noiSinh = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].noiSinh'))), '');
        SET v_noiMat = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].noiMat'))), '');
        SET v_ngheNghiep = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].ngheNghiep'))), '');
        SET v_trinhDoHocVan = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].trinhDoHocVan'))), '');
        SET v_diaChiHienTai = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].diaChiHienTai'))), '');
        SET v_tieuSu = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].tieuSu'))), '');
        SET v_doiThuoc = COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].doiThuoc'))) AS UNSIGNED), 1);

        SET v_chaId = NULLIF(CAST(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].chaId'))) AS UNSIGNED), 0);
        SET v_meId  = NULLIF(CAST(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].meId'))) AS UNSIGNED), 0);
        SET v_voId  = NULLIF(CAST(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].voId'))) AS UNSIGNED), 0);
        SET v_chongId = NULLIF(CAST(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].chongId'))) AS UNSIGNED), 0);

        SET v_total = v_total + 1;

        IF v_thanhVienId IS NULL OR v_thanhVienId <= 0 OR v_hoTen IS NULL OR TRIM(v_hoTen) = '' THEN
            SET v_error_count = v_error_count + 1;
        ELSE
            SELECT COUNT(*), MAX(active_flag)
            INTO v_record_exists, v_existing_active_flag
            FROM thanhvien
            WHERE thanhVienId = v_thanhVienId
              AND dongHoId = p_dongHoId;

            IF v_record_exists = 0 THEN
                INSERT INTO thanhvien (
                    thanhVienId, dongHoId, hoTen, gioiTinh, ngaySinh, ngayMat,
                    noiSinh, noiMat, ngheNghiep, trinhDoHocVan, diaChiHienTai,
                    tieuSu, doiThuoc, chaId, meId, voId, chongId,
                    nguoiTaoId, ngayTao, active_flag, lu_updated, lu_user_id
                ) VALUES (
                    v_thanhVienId, p_dongHoId, v_hoTen, v_gioiTinh,
                    NULLIF(v_ngaySinh, 'null'),
                    NULLIF(v_ngayMat, 'null'),
                    v_noiSinh, v_noiMat, v_ngheNghiep, v_trinhDoHocVan,
                    v_diaChiHienTai, v_tieuSu, v_doiThuoc,
                    v_chaId, v_meId, v_voId, v_chongId,
                    p_nguoiTaoId, NOW(), 1, NOW(), p_nguoiTaoId
                );
                SET v_inserted = v_inserted + 1;

            ELSEIF v_existing_active_flag = 0 THEN
                UPDATE thanhvien SET
                    hoTen = v_hoTen,
                    gioiTinh = v_gioiTinh,
                    ngaySinh = NULLIF(v_ngaySinh, 'null'),
                    ngayMat = NULLIF(v_ngayMat, 'null'),
                    noiSinh = v_noiSinh,
                    noiMat = v_noiMat,
                    ngheNghiep = v_ngheNghiep,
                    trinhDoHocVan = v_trinhDoHocVan,
                    diaChiHienTai = v_diaChiHienTai,
                    tieuSu = v_tieuSu,
                    doiThuoc = v_doiThuoc,
                    chaId = v_chaId,
                    meId = v_meId,
                    voId = v_voId,
                    chongId = v_chongId,
                    active_flag = 1,
                    lu_updated = NOW(),
                    lu_user_id = p_nguoiTaoId
                WHERE thanhVienId = v_thanhVienId
                  AND dongHoId = p_dongHoId;

                SET v_reactivated = v_reactivated + 1;
            ELSE
                UPDATE thanhvien SET
                    hoTen = v_hoTen,
                    gioiTinh = v_gioiTinh,
                    ngaySinh = NULLIF(v_ngaySinh, 'null'),
                    ngayMat = NULLIF(v_ngayMat, 'null'),
                    noiSinh = v_noiSinh,
                    noiMat = v_noiMat,
                    ngheNghiep = v_ngheNghiep,
                    trinhDoHocVan = v_trinhDoHocVan,
                    diaChiHienTai = v_diaChiHienTai,
                    tieuSu = v_tieuSu,
                    doiThuoc = v_doiThuoc,
                    chaId = v_chaId,
                    meId = v_meId,
                    voId = v_voId,
                    chongId = v_chongId,
                    lu_updated = NOW(),
                    lu_user_id = p_nguoiTaoId
                WHERE thanhVienId = v_thanhVienId
                  AND dongHoId = p_dongHoId;

                SET v_updated = v_updated + 1;
            END IF;
        END IF;

        SET v_index = v_index + 1;
    END WHILE;

    COMMIT;

    SET p_error_code = IF(v_error_count > 0, 1001, 0);
    SET p_error_message = CONCAT(
        'Import thành công ',
        (v_inserted + v_updated + v_reactivated), '/', v_total,
        ' (', v_inserted, ' mới, ',
        v_updated, ' cập nhật, ',
        v_reactivated, ' khôi phục)',
        IF(v_error_count > 0, CONCAT('. Bỏ qua ', v_error_count, ' lỗi'), '')
    );

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertDongHo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `InsertDongHo`(
    IN p_dongHoId VARCHAR(50),
    IN p_tenDongHo VARCHAR(255),
    IN p_queQuanGoc VARCHAR(255),
    IN p_ngayThanhLap DATE,
    IN p_nguoiQuanLy VARCHAR(255),
    IN p_ghiChu TEXT,
    IN p_nguoiTaoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;

    INSERT INTO dongho (
        dongHoId,
        tenDongHo,
        queQuanGoc,
        ngayThanhLap,
        nguoiQuanLy,
        ghiChu,
        active_flag,
        nguoiTaoId,
        ngayTao,
        lu_updated,
        lu_user_id
    ) VALUES (
        p_dongHoId,
        p_tenDongHo,
        p_queQuanGoc,
        p_ngayThanhLap,
        p_nguoiQuanLy,
        p_ghiChu,
        1,
        p_nguoiTaoId,
        NOW(),
        NOW(),
        p_nguoiTaoId
    );

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertEvent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `InsertEvent`(
   IN p_suKienId VARCHAR(50),
   IN p_dongHoId VARCHAR(50),
   IN p_tenSuKien VARCHAR(50),
   IN p_ngayDienRa date,
   IN p_gioDienRa time,
   IN p_diaDiem VARCHAR(255),
   IN p_moTa VARCHAR(1000),
   IN p_lapLai INT,
   IN p_nguoiTaoId VARCHAR(50),
   IN p_loaiSuKien INT,
   IN p_uuTien INT,
   OUT p_error_code INT, 
   OUT p_error_message VARCHAR(500)
)
BEGIN
	DECLARE active_flag INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
         GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
         ROLLBACK;
    END; 

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;
        INSERT INTO SuKien(
            suKienId,
            dongHoId,
            tenSuKien,
            ngayDienRa,
            gioDienRa,
            diaDiem,
            moTa,
            lapLai,
            active_flag,
            nguoiTaoId,
            lu_updated,
            loaiSuKien,
            uuTien
        )
        VALUES (
            p_suKienId,
            p_dongHoId,
            p_tenSuKien,
            p_ngayDienRa,
            p_gioDienRa,
            p_diaDiem,
            p_moTa,
            p_lapLai,
            1,
            p_nguoiTaoId,
            now(),
            p_loaiSuKien,
            p_uuTien
        );

        COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertMemberComposite` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `InsertMemberComposite`(
    IN p_dongHoId VARCHAR(50),
    IN p_hoTen VARCHAR(255),
    IN p_gioiTinh TINYINT,
    IN p_ngaySinh DATE,
    IN p_ngayMat DATE,
    IN p_noiSinh VARCHAR(255),
    IN p_noiMat VARCHAR(255),
    IN p_ngheNghiep VARCHAR(255),
    IN p_trinhDoHocVan VARCHAR(255),
    IN p_soDienThoai VARCHAR(11),
    IN p_diaChiHienTai VARCHAR(255),
    IN p_tieuSu TEXT,
    IN p_anhChanDung VARCHAR(255),
    IN p_doiThuoc INT,
    IN p_chaId INT,
    IN p_meId INT,
    IN p_voId INT,
    IN p_chongId INT,
    IN p_nguoiTaoId VARCHAR(50),
    OUT p_newThanhVienId INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_nextId INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;

    -- Lấy ID tiếp theo cho dòng họ này
    SELECT COALESCE(MAX(thanhVienId), 0) + 1 INTO v_nextId
    FROM thanhvien
    WHERE dongHoId = p_dongHoId
    FOR UPDATE;

    -- Insert với ID mới
    INSERT INTO thanhvien (
        thanhVienId, dongHoId, hoTen, gioiTinh, ngaySinh, ngayMat,
        noiSinh, noiMat, ngheNghiep, trinhDoHocVan, soDienThoai, diaChiHienTai,
        tieuSu, anhChanDung, doiThuoc, chaId, meId, voId, chongId,
        ngayTao, active_flag, nguoiTaoId, lu_updated, lu_user_id
    ) VALUES (
        v_nextId, p_dongHoId, p_hoTen, p_gioiTinh, p_ngaySinh, p_ngayMat,
        p_noiSinh, p_noiMat, p_ngheNghiep, p_trinhDoHocVan, p_soDienThoai, p_diaChiHienTai,
        p_tieuSu, p_anhChanDung, p_doiThuoc, p_chaId, p_meId, p_voId, p_chongId,
        NOW(), 1, p_nguoiTaoId, NOW(), p_nguoiTaoId
    );

    SET p_newThanhVienId = v_nextId;

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertTaiChinhChi` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `InsertTaiChinhChi`(
    IN p_dongHoId VARCHAR(50),
    IN p_ngayChi DATE,
    IN p_soTien DECIMAL(18,2),
    IN p_phuongThucThanhToan VARCHAR(100),
    IN p_noiDung TEXT,
    IN p_nguoiNhan VARCHAR(255),
    IN p_ghiChu TEXT,
    IN p_nguoiNhapId VARCHAR(50),
    OUT p_chiId INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_max_id INT DEFAULT 0;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;
    
    SET p_error_code = 0;
    SET p_error_message = '';
    SET p_chiId = 0;
    
    START TRANSACTION;
    
    -- Validate
    IF p_soTien <= 0 THEN
        SET p_error_code = 1;
        SET p_error_message = 'Số tiền phải lớn hơn 0';
        ROLLBACK;
    ELSE
        -- Lấy max chiId hiện tại của dòng họ
        SELECT COALESCE(MAX(chiId), 0) INTO v_max_id
        FROM taichinhchi
        WHERE dongHoId = p_dongHoId
        FOR UPDATE;
        
        -- Tính chiId mới
        SET p_chiId = v_max_id + 1;
        
        -- Insert với chiId tự động tăng
        INSERT INTO taichinhchi (
            chiId, dongHoId, ngayChi, soTien, phuongThucThanhToan,
            noiDung, nguoiNhan, ghiChu, nguoiNhapId, ngayTao, active_flag
        ) VALUES (
            p_chiId,
            p_dongHoId,
            p_ngayChi,
            p_soTien,
            p_phuongThucThanhToan,
            p_noiDung,
            p_nguoiNhan,
            p_ghiChu,
            p_nguoiNhapId,
            NOW(),
            1
        );
        
        SET p_error_message = 'Tạo khoản chi thành công';
        COMMIT;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertTaiChinhThu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `InsertTaiChinhThu`(
    IN p_dongHoId VARCHAR(50),
    IN p_hoTenNguoiDong VARCHAR(255),
    IN p_ngayDong DATE,
    IN p_soTien DECIMAL(18,2),
    IN p_phuongThucThanhToan VARCHAR(100),
    IN p_noiDung TEXT,
    IN p_ghiChu TEXT,
    IN p_nguoiNhapId VARCHAR(50),
    OUT p_thuId INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_max_id INT DEFAULT 0;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;
    
    SET p_error_code = 0;
    SET p_error_message = '';
    SET p_thuId = 0;
    
    START TRANSACTION;
    
    -- Validate
    IF p_soTien <= 0 THEN
        SET p_error_code = 1;
        SET p_error_message = 'Số tiền phải lớn hơn 0';
        ROLLBACK;
    ELSEIF p_hoTenNguoiDong IS NULL OR p_hoTenNguoiDong = '' THEN
        SET p_error_code = 1;
        SET p_error_message = 'Họ tên người đóng không được để trống';
        ROLLBACK;
    ELSE
        -- Lấy max thuId hiện tại của dòng họ
        SELECT COALESCE(MAX(thuId), 0) INTO v_max_id
        FROM taichinhthu
        WHERE dongHoId = p_dongHoId
        FOR UPDATE;
        
        -- Tính thuId mới
        SET p_thuId = v_max_id + 1;
        
        -- Insert với thuId tự động tăng
        INSERT INTO taichinhthu (
            thuId, dongHoId, hoTenNguoiDong, ngayDong, soTien,
            phuongThucThanhToan, noiDung, ghiChu, nguoiNhapId, ngayTao, active_flag
        ) VALUES (
            p_thuId,
            p_dongHoId,
            p_hoTenNguoiDong,
            p_ngayDong,
            p_soTien,
            p_phuongThucThanhToan,
            p_noiDung,
            p_ghiChu,
            p_nguoiNhapId,
            NOW(),
            1
        );
        
        SET p_error_message = 'Tạo khoản thu thành công';
        COMMIT;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertTaiLieu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `InsertTaiLieu`(
  IN p_taiLieuId VARCHAR(50),
  IN p_dongHoId VARCHAR(50),
  IN p_tenTaiLieu VARCHAR(255),
  IN p_duongDan VARCHAR(255),
  IN p_moTa TEXT,
  IN p_loaiTaiLieu VARCHAR(100),
  IN p_namSangTac INT,
  IN p_tacGia VARCHAR(255),
  IN p_nguonGoc VARCHAR(255),
  IN p_ghiChu TEXT,
  IN p_nguoiTaoId VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  INSERT INTO tailieu (
    taiLieuId, dongHoId, tenTaiLieu, duongDan, moTa, loaiTaiLieu,
    namSangTac, tacGia, nguonGoc, ghiChu, ngayTaiLen,
    active_flag, nguoiTaoId, lu_updated, lu_user_id
  ) VALUES (
    p_taiLieuId, p_dongHoId, p_tenTaiLieu, p_duongDan, p_moTa, p_loaiTaiLieu,
    p_namSangTac, p_tacGia, p_nguonGoc, p_ghiChu, CURDATE(),
    1, p_nguoiTaoId, NOW(), p_nguoiTaoId
  );
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertTinTuc` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `InsertTinTuc`(
  IN p_tinTucId VARCHAR(50),
  IN p_dongHoId VARCHAR(50),
  IN p_tieuDe VARCHAR(255),
  IN p_noiDung TEXT,
  IN p_tomTat VARCHAR(500),
  IN p_anhDaiDien VARCHAR(255),
  IN p_tacGia VARCHAR(255),
  IN p_ghim TINYINT,
  IN p_nguoiTaoId VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  INSERT INTO tintuc (
    tinTucId, dongHoId, tieuDe, noiDung, tomTat, anhDaiDien, 
    tacGia, ngayDang, ghim, nguoiTaoId, lu_updated, lu_user_id
  ) VALUES (
    p_tinTucId, p_dongHoId, p_tieuDe, p_noiDung, p_tomTat, p_anhDaiDien,
    p_tacGia, NOW(), IFNULL(p_ghim, 0), p_nguoiTaoId, NOW(), p_nguoiTaoId
  );
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `InsertUser`(
   IN p_nguoiDungId VARCHAR(50),
   IN p_dongHoId VARCHAR(50),
   IN p_roleId VARCHAR(50),
   IN p_tenDangNhap VARCHAR(100),
   IN p_matKhau VARCHAR(255),
   IN p_hoTen VARCHAR(255),
   IN p_soDienThoai VARCHAR(20),
   IN p_gender TINYINT,
   IN p_nguoiTaoId VARCHAR(50),
   OUT p_error_code INT, 
   OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
         GET DIAGNOSTICS CONDITION 1 
            p_error_code = RETURNED_SQLSTATE, 
            p_error_message = MESSAGE_TEXT;
         ROLLBACK;
    END; 

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;

    IF EXISTS (SELECT 1 FROM NguoiDung WHERE tenDangNhap = p_tenDangNhap) THEN
        SET p_error_message = 'Tài khoản người dùng này đã tồn tại!';
        SET p_error_code = -1;
        ROLLBACK;
    ELSE
        INSERT INTO NguoiDung(
            nguoiDungId, dongHoId, roleId, tenDangNhap, matKhau,
            ngayTao, online_flag, active_flag, nguoiTaoId, lu_updated, lu_user_id
        )
        VALUES (
            p_nguoiDungId, p_dongHoId, p_roleId, p_tenDangNhap, p_matKhau,
            NOW(), 0, 1, p_nguoiTaoId, NOW(), p_nguoiTaoId
        );

        INSERT INTO user_profile (
            userId, full_name, phone, email, gender, active_flag,
            created_by_user_id, create_date, lu_updated, lu_user_id
        )
        VALUES (
            p_nguoiDungId, p_hoTen, p_soDienThoai, p_tenDangNhap,
            COALESCE(p_gender, 1), 1, p_nguoiTaoId, NOW(), NOW(), p_nguoiTaoId
        );

        COMMIT;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `LoginUserByAccount` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `LoginUserByAccount`(
    IN p_tenDangNhap VARCHAR(100), 
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_nguoiDungId VARCHAR(50);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_error_code = RETURNED_SQLSTATE, 
            p_error_message = MESSAGE_TEXT;
    END;

    -- Khởi tạo OUT parameters
    SET p_error_code = 0;
    SET p_error_message = '';

    -- Lấy user_id theo username
    SELECT nguoiDungId 
    INTO v_nguoiDungId
    FROM NguoiDung
    WHERE tenDangNhap = p_tenDangNhap
      AND active_flag = 1
    LIMIT 1;

    -- Nếu user không tồn tại
    IF v_nguoiDungId IS NULL THEN
        SET p_error_code = 1;
        SET p_error_message = 'Tài khoản không tồn tại hoặc đã bị vô hiệu hóa';
        SELECT p_error_code AS error_code, p_error_message AS error_message;
    ELSE
		UPDATE nguoidung
        SET online_flag = 1
        WHERE nguoiDungId = v_nguoiDungId;
        -- Trả về thông tin user
        SELECT 
            nd.nguoiDungId,
            nd.tenDangNhap,
            nd.matKhau,
            up.first_name,
            up.middle_name,
            up.last_name,
            up.full_name,
            up.gender,
            up.date_of_birthday,
            up.email,
            up.phone,
            nd.roleId,
            nd.dongHoId,
            nd.online_flag,
            dh.tenDongHo,
            rl.roleCode,
            rl.roleName,
            up.avatar,
            p_error_code AS error_code,
            p_error_message AS error_message
        FROM nguoidung nd
        LEFT JOIN user_profile up ON nd.nguoiDungId = up.userId
        LEFT JOIN dongho dh ON nd.dongHoId = dh.dongHoId
        LEFT JOIN role rl ON nd.roleId = rl.roleId
        WHERE nd.nguoiDungId = v_nguoiDungId;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ResetPassWord` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `ResetPassWord`(
    IN p_tenDangNhap VARCHAR(50),
    IN p_new_pass VARCHAR(50),
    OUT p_error_code int,       -- Thay đổi sang VARCHAR(5) để lưu RETURNED_SQLSTATE
    OUT p_error_message VARCHAR(500)
)
BEGIN
    -- Khai báo biến: Đặt giá trị mặc định là NULL
    DECLARE p_user_id VARCHAR(50) ;

    -- Xử lý lỗi SQL hệ thống
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Gán mã lỗi SQLSTATE (ví dụ: '42000') và thông điệp lỗi thực tế của MySQL
        GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;

    -- Khởi tạo thông báo và mã lỗi. 
    -- Trong trường hợp thành công (0) hoặc lỗi nghiệp vụ (ví dụ: -1), chúng ta gán giá trị riêng.
    SET p_error_code = 0; -- '00000' là SQLSTATE cho thành công
    SET p_error_message = '';

    START TRANSACTION;

    -- Lấy user theo tên đăng nhập
    SELECT nguoiDungId
    INTO p_user_id
    FROM nguoidung
    WHERE tenDangNhap = p_tenDangNhap
    LIMIT 1;

    -- Kiểm tra tồn tại (Lỗi nghiệp vụ)
    IF p_user_id IS NULL THEN
        -- Gán mã lỗi nghiệp vụ tùy chỉnh, ví dụ: 'P0001' (Dựa trên lỗi Postgres, bạn có thể chọn mã riêng)
        SET p_error_code = '-1';
        SET p_error_message = 'Tên đăng nhập không tồn tại!';
    ELSE
        -- Cập nhật mật khẩu
        UPDATE nguoidung
        SET matKhau = p_new_pass,
            lu_user_id = 'system'
        WHERE nguoiDungId = p_user_id;
    END IF;

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SearchDanhMucTaiChinh` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `SearchDanhMucTaiChinh`(
    IN p_pageIndex INT,
    IN p_pageSize INT,
    IN p_search_content VARCHAR(500),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE p_total_row INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    IF p_pageSize <> 0 THEN

        DROP TEMPORARY TABLE IF EXISTS Results;

        CREATE TEMPORARY TABLE Results AS
        SELECT
            (@row_number := @row_number + 1) AS RowNumber,
            dm.danhMucId,
            dm.tenDanhMuc,
            dm.moTa,
            dm.active_flag,
            dm.lu_updated,
            dm.lu_user_id
        FROM danhmuctaichinh dm
        CROSS JOIN (SELECT @row_number := 0) r
        WHERE dm.active_flag = 1
          AND (
                p_search_content IS NULL
                OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(dm.tenDanhMuc, ''),
                    COALESCE(dm.moTa, '')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
          )
        ORDER BY dm.tenDanhMuc ASC;

        SELECT COUNT(*) INTO p_total_row FROM Results;

        SELECT *, p_total_row AS RecordCount
        FROM Results
        WHERE RowNumber BETWEEN ((p_pageIndex - 1) * p_pageSize) + 1
                             AND (p_pageIndex * p_pageSize);

        DROP TEMPORARY TABLE Results;

    ELSE

        DROP TEMPORARY TABLE IF EXISTS Results;

        CREATE TEMPORARY TABLE Results AS
        SELECT
            (@row_number := @row_number + 1) AS RowNumber,
            dm.danhMucId,
            dm.tenDanhMuc,
            dm.moTa,
            dm.active_flag,
            dm.lu_updated,
            dm.lu_user_id
        FROM danhmuctaichinh dm
        CROSS JOIN (SELECT @row_number := 0) r
        WHERE dm.active_flag = 1
          AND (
                p_search_content IS NULL
                OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(dm.tenDanhMuc, ''),
                    COALESCE(dm.moTa, '')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
          )
        ORDER BY dm.tenDanhMuc ASC;

        SELECT COUNT(*) INTO p_total_row FROM Results;

        SELECT *, p_total_row AS RecordCount
        FROM Results;

        DROP TEMPORARY TABLE Results;

    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SearchDongHo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `SearchDongHo`(
    IN p_pageIndex INT,              -- Trang hiện tại
    IN p_pageSize INT,               -- Số bản ghi mỗi trang
    IN p_search_content VARCHAR(500),-- Từ khóa tìm kiếm (họ tên, sđt, email, tên đăng nhập)
    OUT p_error_code INT,            -- Mã lỗi (0 = không lỗi)
    OUT p_error_message VARCHAR(500) -- Thông điệp lỗi
)
BEGIN
    DECLARE p_total_row INT DEFAULT 0;

    -- Bắt lỗi SQL
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET p_error_code = 1;
        SET p_error_message = 'Lỗi khi truy vấn dữ liệu dong họ.';
        ROLLBACK;
    END;

    -- Mặc định không lỗi
    SET p_error_code = 0;
    SET p_error_message = '';

    -- Gán biến tạm row number
    SET @row_number := 0;

    -- Truy vấn kết quả chính
    CREATE TEMPORARY TABLE IF NOT EXISTS Results AS
    SELECT 
        (@row_number := @row_number + 1) AS RowNumber,
        dh.dongHoId,
        dh.tenDongHo,
        dh.queQuanGoc,
        dh.ngayThanhLap,
        dh.nguoiQuanLy,
        dh.ghiChu,
        dh.nguoiTaoId,
        dh.lu_user_id
        from DongHo dh
    WHERE dh.active_flag = 1
      AND (
            p_search_content IS NULL
            OR p_search_content = ''
            OR LOWER(CONCAT(
                COALESCE(dh.tenDongHo, ''),
                COALESCE(dh.queQuanGoc, ''),
                COALESCE(dh.nguoiQuanLy, '')
            )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
      );

    -- Lấy tổng số dòng
    SELECT COUNT(*) INTO p_total_row FROM Results;

    -- Trả kết quả phân trang
    SELECT 
        *,
        p_total_row AS RecordCount
    FROM Results
    WHERE RowNumber BETWEEN ((p_pageIndex - 1) * p_pageSize) + 1
                         AND (p_pageIndex * p_pageSize)
    ORDER BY dongHoId DESC;

    -- ✅ Di chuyển dòng xóa bảng tạm xuống **sau khi client đã nhận kết quả**
    -- nhưng vẫn đảm bảo MySQL không lỗi khi return
    DROP TEMPORARY TABLE IF EXISTS Results;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SearchEvent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `SearchEvent`(
    IN p_pageIndex INT,
    IN p_pageSize INT,
    IN p_search_content VARCHAR(500),
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE p_total_row INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    -- Có phân trang
    IF p_pageSize <> 0 THEN

        DROP TEMPORARY TABLE IF EXISTS Results;

        CREATE TEMPORARY TABLE Results AS
        SELECT 
            (@row_number := @row_number + 1) AS RowNumber,
            sk.suKienId,
            sk.dongHoId,
            sk.tenSuKien,
            sk.ngayDienRa,
            sk.gioDienRa,
            sk.diaDiem,
            sk.moTa,
            sk.lapLai,
            sk.nguoiTaoId,
            up.full_name,
            sk.loaiSuKien,
            sk.lu_user_id,
            lsk.tenLoaiSuKien,
            sk.uuTien
        FROM SuKien sk
        LEFT JOIN LoaiSuKien lsk ON sk.loaiSuKien = lsk.loaiSuKien
        LEFT JOIN user_profile up ON sk.nguoiTaoId  = up.userId
		LEFT JOIN NguoiDung nd ON sk.nguoiTaoId = nd.nguoiDungId
        CROSS JOIN (SELECT @row_number := 0) r
        WHERE sk.active_flag = 1
          AND (p_dongHoId IS NULL OR p_dongHoId = '' OR sk.dongHoId = p_dongHoId)
          AND (
                p_search_content IS NULL
                OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(sk.tenSuKien, ''),
                    COALESCE(sk.ngayDienRa, ''),
                    COALESCE(lsk.tenLoaiSuKien, ''),
                    COALESCE(sk.gioDienRa, ''),
                    COALESCE(sk.diaDiem, ''),
                    COALESCE(sk.moTa, '')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
          )
        ORDER BY sk.ngayDienRa DESC;

        SELECT COUNT(*) INTO p_total_row FROM Results;

        SELECT 
            *,
            p_total_row AS RecordCount
        FROM Results
        WHERE RowNumber BETWEEN ((p_pageIndex - 1) * p_pageSize) + 1
                             AND (p_pageIndex * p_pageSize);

        DROP TEMPORARY TABLE Results;

    -- Không phân trang (lấy hết)
    ELSE

        DROP TEMPORARY TABLE IF EXISTS Results;

        CREATE TEMPORARY TABLE Results AS
        SELECT 
            (@row_number := @row_number + 1) AS RowNumber,
            sk.suKienId,
            sk.dongHoId,
            sk.tenSuKien,
            sk.ngayDienRa,
            sk.gioDienRa,
            sk.diaDiem,
            sk.moTa,
            sk.lapLai,
            sk.nguoiTaoId,
            nd.hoTen,
            sk.loaiSuKien,
            sk.lu_user_id,
            lsk.tenLoaiSuKien,
            sk.uuTien
        FROM SuKien sk
        INNER JOIN LoaiSuKien lsk ON sk.loaiSuKien = lsk.loaiSuKien
        INNER JOIN NguoiDung nd ON sk.nguoiTaoId = nd.nguoiDungId
        CROSS JOIN (SELECT @row_number := 0) r
        WHERE sk.active_flag = 1
          AND (p_dongHoId IS NULL OR p_dongHoId = '' OR sk.dongHoId = p_dongHoId)
          AND (
                p_search_content IS NULL
                OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(sk.tenSuKien, ''),
                    COALESCE(sk.ngayDienRa, ''),
                    COALESCE(lsk.tenLoaiSuKien, ''),
                    COALESCE(sk.gioDienRa, ''),
                    COALESCE(sk.diaDiem, ''),
                    COALESCE(sk.moTa, '')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
          )
        ORDER BY sk.ngayDienRa DESC;

        SELECT COUNT(*) INTO p_total_row FROM Results;

        SELECT 
            *,
            p_total_row AS RecordCount
        FROM Results;

        DROP TEMPORARY TABLE Results;

    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SearchLoaiSuKien` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `SearchLoaiSuKien`(
    IN p_pageIndex INT,
    IN p_pageSize INT,
    IN p_search_content VARCHAR(200),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE p_total_row INT DEFAULT 0;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = MYSQL_ERRNO,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    /* =====================
       CÓ PHÂN TRANG
    ===================== */
    IF p_pageSize <> 0 THEN

        DROP TEMPORARY TABLE IF EXISTS Results;

        CREATE TEMPORARY TABLE Results AS
        SELECT 
            (@rownum := @rownum + 1) AS RowNumber,
            lsk.loaiSuKien,
            lsk.tenLoaiSuKien,
            lsk.active_flag
        FROM loaisukien lsk
        CROSS JOIN (SELECT @rownum := 0) r
        WHERE lsk.active_flag = 1
          AND (
                p_search_content IS NULL
                OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(lsk.loaiSuKien,''),
                    COALESCE(lsk.tenLoaiSuKien,'')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
          )
        ORDER BY lsk.loaiSuKien ASC;

        SELECT COUNT(*) INTO p_total_row FROM Results;

        SELECT 
            *,
            p_total_row AS RecordCount
        FROM Results
        WHERE RowNumber BETWEEN ((p_pageIndex - 1) * p_pageSize + 1)
                            AND (p_pageIndex * p_pageSize);

        DROP TEMPORARY TABLE Results;

    /* =====================
       KHÔNG PHÂN TRANG
    ===================== */
    ELSE

        SELECT 
            lsk.loaiSuKien,
            lsk.tenLoaiSuKien,
            lsk.active_flag
        FROM loaisukien lsk
        WHERE lsk.active_flag = 1
          AND (
                p_search_content IS NULL
                OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(lsk.loaiSuKien,''),
                    COALESCE(lsk.tenLoaiSuKien,'')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
          )
        ORDER BY lsk.loaiSuKien ASC;

    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SearchNguoiDung` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `SearchNguoiDung`(
    IN p_pageIndex INT,
    IN p_pageSize INT,
    IN p_search_content VARCHAR(500),
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE p_total_row INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;
    
    SET p_error_code = 0;
    SET p_error_message = '';

    IF p_pageSize <> 0 THEN
        DROP TEMPORARY TABLE IF EXISTS Results;
        
        CREATE TEMPORARY TABLE Results AS
        SELECT 
            (@row_number := @row_number + 1) AS RowNumber,
            t.*
        FROM (
            SELECT 
                nd.nguoiDungId, nd.tenDangNhap, nd.matKhau,
                up.first_name, up.middle_name, up.last_name, up.full_name,
                up.gender, up.date_of_birthday, up.email, up.phone,
                nd.roleId, nd.dongHoId, dh.tenDongHo,
                rl.roleCode, rl.roleName, nd.ngayTao, up.avatar,
                COALESCE(nd.online_flag, 0) AS online_flag,
                nd.active_flag, nd.lu_updated, nd.lu_user_id
            FROM NguoiDung nd
            LEFT JOIN user_profile up ON nd.nguoiDungId = up.userId
            LEFT JOIN DongHo dh ON nd.dongHoId = dh.dongHoId
            LEFT JOIN role rl ON nd.roleId = rl.roleId
            WHERE nd.active_flag = 1
              AND (p_dongHoId IS NULL OR p_dongHoId = '' OR nd.dongHoId = p_dongHoId)
              AND (
                    p_search_content IS NULL OR p_search_content = ''
                    OR LOWER(CONCAT(
                        COALESCE(nd.tenDangNhap, ''),
                        COALESCE(up.full_name, ''),
                        COALESCE(up.email, ''),
                        COALESCE(up.phone, ''),
                        COALESCE(dh.tenDongHo, '')
                    )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
              )
            ORDER BY nd.ngayTao DESC
        ) t
        CROSS JOIN (SELECT @row_number := 0) r;

        SELECT COUNT(*) INTO p_total_row FROM Results;

        SELECT *, p_total_row AS RecordCount
        FROM Results
        WHERE RowNumber BETWEEN ((p_pageIndex - 1) * p_pageSize) + 1 
                            AND (p_pageIndex * p_pageSize);

        DROP TEMPORARY TABLE Results;
        
    ELSE
        DROP TEMPORARY TABLE IF EXISTS Results;
        
        CREATE TEMPORARY TABLE Results AS
        SELECT 
            (@row_number := @row_number + 1) AS RowNumber,
            t.*
        FROM (
            SELECT 
                nd.nguoiDungId, nd.tenDangNhap, nd.matKhau,
                up.first_name, up.middle_name, up.last_name, up.full_name,
                up.gender, up.date_of_birthday, up.email, up.phone,
                nd.roleId, nd.dongHoId, dh.tenDongHo,
                rl.roleCode, rl.roleName, nd.ngayTao,
                COALESCE(nd.online_flag, 0) AS online_flag,
                nd.active_flag, nd.lu_updated, nd.lu_user_id
            FROM NguoiDung nd
            LEFT JOIN user_profile up ON nd.nguoiDungId = up.userId
            LEFT JOIN DongHo dh ON nd.dongHoId = dh.dongHoId
            LEFT JOIN role rl ON nd.roleId = rl.roleId
            WHERE nd.active_flag = 1
              AND (p_dongHoId IS NULL OR p_dongHoId = '' OR nd.dongHoId = p_dongHoId)
              AND (
                    p_search_content IS NULL OR p_search_content = ''
                    OR LOWER(CONCAT(
                        COALESCE(nd.tenDangNhap, ''),
                        COALESCE(up.full_name, ''),
                        COALESCE(up.email, ''),
                        COALESCE(up.phone, ''),
                        COALESCE(dh.tenDongHo, '')
                    )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
              )
            ORDER BY nd.ngayTao DESC
        ) t
        CROSS JOIN (SELECT @row_number := 0) r;

        SELECT COUNT(*) INTO p_total_row FROM Results;

        SELECT *, p_total_row AS RecordCount FROM Results;

        DROP TEMPORARY TABLE Results;
        
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SearchTaiChinhChi` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `SearchTaiChinhChi`(
    IN p_pageIndex INT,
    IN p_pageSize INT,
    IN p_search_content VARCHAR(255),
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE p_total_row INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;
    
    SET p_error_code = 0;
    SET p_error_message = '';
    
    IF p_pageSize <> 0 THEN
        DROP TEMPORARY TABLE IF EXISTS Results;
        CREATE TEMPORARY TABLE Results AS
        SELECT 
            (@row_number := @row_number + 1) AS RowNumber,
            t.*
        FROM (
            SELECT 
                chiId,
                dongHoId,
                ngayChi,
                soTien,
                phuongThucThanhToan,
                noiDung,
                nguoiNhan,
                ghiChu,
                nguoiNhapId,
                ngayTao,
                active_flag,
                lu_updated,
                lu_user_id
            FROM taichinhchi
            WHERE active_flag = 1
              AND (p_dongHoId IS NULL OR p_dongHoId = '' OR dongHoId = p_dongHoId)
              AND (p_search_content IS NULL OR p_search_content = '' 
                   OR LOWER(CONCAT(
                       COALESCE(nguoiNhan, ''),
                       COALESCE(noiDung, '')
                   )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%'))
            ORDER BY chiId ASC
        ) t
        CROSS JOIN (SELECT @row_number := 0) r;
        
        SELECT COUNT(*) INTO p_total_row FROM Results;
        
        SELECT *, p_total_row AS RecordCount
        FROM Results
        WHERE RowNumber BETWEEN ((p_pageIndex - 1) * p_pageSize) + 1 
                            AND (p_pageIndex * p_pageSize);
        
        DROP TEMPORARY TABLE Results;
    ELSE
        DROP TEMPORARY TABLE IF EXISTS Results;
        CREATE TEMPORARY TABLE Results AS
        SELECT 
            (@row_number := @row_number + 1) AS RowNumber,
            t.*
        FROM (
            SELECT 
                chiId,
                dongHoId,
                ngayChi,
                soTien,
                phuongThucThanhToan,
                noiDung,
                nguoiNhan,
                ghiChu,
                nguoiNhapId,
                ngayTao,
                active_flag,
                lu_updated,
                lu_user_id
            FROM taichinhchi
            WHERE active_flag = 1
              AND (p_dongHoId IS NULL OR p_dongHoId = '' OR dongHoId = p_dongHoId)
              AND (p_search_content IS NULL OR p_search_content = '' 
                   OR LOWER(CONCAT(
                       COALESCE(nguoiNhan, ''),
                       COALESCE(noiDung, '')
                   )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%'))
            ORDER BY chiId ASC
        ) t
        CROSS JOIN (SELECT @row_number := 0) r;
        
        SELECT COUNT(*) INTO p_total_row FROM Results;
        
        SELECT *, p_total_row AS RecordCount FROM Results;
        
        DROP TEMPORARY TABLE Results;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SearchTaiChinhThu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `SearchTaiChinhThu`(
    IN p_pageIndex INT,
    IN p_pageSize INT,
    IN p_search_content VARCHAR(255),
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE p_total_row INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    -- CÓ PHÂN TRANG
    IF p_pageSize <> 0 THEN

        DROP TEMPORARY TABLE IF EXISTS Results;

        CREATE TEMPORARY TABLE Results AS
        SELECT
            (@row_number := @row_number + 1) AS RowNumber,
            t.*
        FROM (
            SELECT
                thuId,
                dongHoId,
                hoTenNguoiDong,
                ngayDong,
                soTien,
                phuongThucThanhToan,
                noiDung,
                ghiChu,
                nguoiNhapId,
                ngayTao,
                active_flag,
                lu_updated,
                lu_user_id
            FROM taichinhthu
            WHERE active_flag = 1
              AND (p_dongHoId IS NULL OR p_dongHoId = '' OR dongHoId = p_dongHoId)
              AND (
                    p_search_content IS NULL OR p_search_content = ''
                    OR LOWER(CONCAT(
                        COALESCE(hoTenNguoiDong,''),
                        COALESCE(noiDung,'')
                    )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
                  )
            ORDER BY thuId ASC
        ) t
        CROSS JOIN (SELECT @row_number := 0) r;

        SELECT COUNT(*) INTO p_total_row FROM Results;

        SELECT *, p_total_row AS RecordCount
        FROM Results
        WHERE RowNumber BETWEEN ((p_pageIndex - 1) * p_pageSize) + 1
                             AND (p_pageIndex * p_pageSize);

        DROP TEMPORARY TABLE Results;

    -- KHÔNG PHÂN TRANG
    ELSE

        DROP TEMPORARY TABLE IF EXISTS Results;

        CREATE TEMPORARY TABLE Results AS
        SELECT
            (@row_number := @row_number + 1) AS RowNumber,
            t.*
        FROM (
            SELECT
                thuId,
                dongHoId,
                hoTenNguoiDong,
                ngayDong,
                soTien,
                phuongThucThanhToan,
                noiDung,
                ghiChu,
                nguoiNhapId,
                ngayTao,
                active_flag,
                lu_updated,
                lu_user_id
            FROM taichinhthu
            WHERE active_flag = 1
              AND (p_dongHoId IS NULL OR p_dongHoId = '' OR dongHoId = p_dongHoId)
              AND (
                    p_search_content IS NULL OR p_search_content = ''
                    OR LOWER(CONCAT(
                        COALESCE(hoTenNguoiDong,''),
                        COALESCE(noiDung,'')
                    )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
                  )
            ORDER BY thuId ASC
        ) t
        CROSS JOIN (SELECT @row_number := 0) r;

        SELECT COUNT(*) INTO p_total_row FROM Results;

        SELECT *, p_total_row AS RecordCount FROM Results;

        DROP TEMPORARY TABLE Results;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SearchTaiLieu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `SearchTaiLieu`(
  IN p_pageIndex INT,
  IN p_pageSize INT,
  IN p_search_content VARCHAR(255),
  IN p_dongHoId VARCHAR(50),
  IN p_loaiTaiLieu VARCHAR(100),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  DECLARE v_offset INT;
  DECLARE v_total INT;
  
  SET v_offset = (p_pageIndex - 1) * p_pageSize;
  
  -- Đếm tổng số bản ghi
  SELECT COUNT(*) INTO v_total FROM tailieu 
  WHERE active_flag = 1 
    AND (p_dongHoId IS NULL OR p_dongHoId = '' OR dongHoId = p_dongHoId)
    AND (p_loaiTaiLieu IS NULL OR p_loaiTaiLieu = '' OR loaiTaiLieu = p_loaiTaiLieu)
    AND (p_search_content IS NULL OR p_search_content = '' OR tenTaiLieu LIKE CONCAT('%', p_search_content, '%'));
  
  -- Lấy dữ liệu
  SELECT 
    tl.taiLieuId,
    tl.dongHoId,
    tl.tenTaiLieu,
    tl.duongDan,
    tl.moTa,
    tl.loaiTaiLieu,
    tl.namSangTac,
    tl.tacGia,
    tl.nguonGoc,
    tl.ghiChu,
    tl.ngayTaiLen,
    tl.active_flag,
    tl.nguoiTaoId,
    tl.lu_updated,
    d.tenDongHo,
    v_total AS RecordCount
  FROM tailieu tl
  LEFT JOIN dongho d ON tl.dongHoId = d.dongHoId
  WHERE tl.active_flag = 1
    AND (p_dongHoId IS NULL OR p_dongHoId = '' OR tl.dongHoId = p_dongHoId)
    AND (p_loaiTaiLieu IS NULL OR p_loaiTaiLieu = '' OR tl.loaiTaiLieu = p_loaiTaiLieu)
    AND (p_search_content IS NULL OR p_search_content = '' OR tl.tenTaiLieu LIKE CONCAT('%', p_search_content, '%'))
  ORDER BY tl.ngayTaiLen DESC
  LIMIT v_offset, p_pageSize;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SearchThanhVien` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `SearchThanhVien`(
    IN p_pageIndex INT,
    IN p_pageSize INT,
    IN p_search_content VARCHAR(500),
    IN p_thanhVienId INT,           -- ĐỔI: VARCHAR -> INT
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE p_total_row INT DEFAULT 0;
    DECLARE v_sql_error VARCHAR(500);
    
    -- Bắt lỗi SQL với thông tin chi tiết
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = MYSQL_ERRNO,
            v_sql_error = MESSAGE_TEXT;
        SET p_error_message = CONCAT('Lỗi SQL: ', v_sql_error);
    END;
    
    -- Reset lỗi
    SET p_error_code = 0;
    SET p_error_message = '';
    
    -- Xóa bảng tạm cũ
    DROP TEMPORARY TABLE IF EXISTS Results;
    
    -- Reset biến row
    SET @row := 0;
    
    -- Tạo bảng kết quả tạm
    CREATE TEMPORARY TABLE Results AS
    SELECT 
        (@row := @row + 1) AS RowNumber,
        tv.thanhVienId,
        tv.dongHoId,
        tv.hoTen,
        tv.gioiTinh,
        tv.ngaySinh,
        tv.ngayMat,
        tv.noiSinh,
        tv.noiMat,
        tv.ngheNghiep,
        tv.trinhDoHocVan,
        tv.diaChiHienTai,
        tv.tieuSu,
        tv.anhChanDung,
        tv.doiThuoc,
        tv.chaId,
        tv.meId,
        tv.voId,
        tv.chongId,
        tv.ngayTao,
        tv.nguoiTaoId,
        tv.lu_user_id
    FROM thanhvien tv
    WHERE tv.active_flag = 1
        AND (p_thanhVienId IS NULL OR tv.thanhVienId = p_thanhVienId)  -- BỎ check ''
        AND (p_dongHoId IS NULL OR p_dongHoId = '' OR tv.dongHoId = p_dongHoId)
        AND (
            p_search_content IS NULL
            OR p_search_content = ''
            OR LOWER(CONCAT(
                COALESCE(tv.hoTen, ''),
                COALESCE(tv.noiSinh, ''),
                COALESCE(tv.noiMat, ''),
                COALESCE(tv.ngheNghiep, ''),
                COALESCE(tv.trinhDoHocVan, ''),
                COALESCE(tv.diaChiHienTai, ''),
                COALESCE(tv.tieuSu, '')
            )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
        )
    ORDER BY tv.ngayTao DESC;
    
    -- Tổng số dòng
    SELECT COUNT(*) INTO p_total_row FROM Results;
    
    -- Trả kết quả phân trang
    SELECT 
        *,
        p_total_row AS RecordCount
    FROM Results
    WHERE RowNumber BETWEEN ((p_pageIndex - 1) * p_pageSize) + 1
                         AND (p_pageIndex * p_pageSize)
    ORDER BY ngayTao DESC;
    
    -- Xóa bảng tạm
    DROP TEMPORARY TABLE IF EXISTS Results;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SearchThanhVienByDongHo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `SearchThanhVienByDongHo`(
    IN p_pageIndex INT,
    IN p_pageSize INT,
    IN p_search_content VARCHAR(255),
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE p_total_row INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;
    
    SET p_error_code = 0;
    SET p_error_message = '';
    
    -- CÓ PHÂN TRANG
    IF p_pageSize <> 0 THEN
        DROP TEMPORARY TABLE IF EXISTS Results;
        
        CREATE TEMPORARY TABLE Results AS
        SELECT DISTINCT
            tv.thanhVienId, 
            tv.dongHoId, 
            tv.hoTen, 
            tv.gioiTinh,
            tv.ngaySinh, 
            tv.ngayMat, 
            tv.noiSinh, 
            tv.noiMat,
            tv.ngheNghiep, 
            tv.trinhDoHocVan,
            tv.soDienThoai,
            tv.diaChiHienTai,
            tv.tieuSu, 
            tv.anhChanDung, 
            tv.doiThuoc,
            tv.chaId, 
            tv.meId, 
            tv.voId, 
            tv.chongId,
            tv.ngayTao, 
            tv.active_flag,
            cha.hoTen AS tenCha,
            me.hoTen AS tenMe,
            vo.hoTen AS tenVo,
            chong.hoTen AS tenChong
        FROM thanhvien tv
        LEFT JOIN thanhvien cha ON tv.dongHoId = cha.dongHoId AND tv.chaId = cha.thanhVienId
        LEFT JOIN thanhvien me ON tv.dongHoId = me.dongHoId AND tv.meId = me.thanhVienId
        LEFT JOIN thanhvien vo ON tv.dongHoId = vo.dongHoId AND tv.voId = vo.thanhVienId
        LEFT JOIN thanhvien chong ON tv.dongHoId = chong.dongHoId AND tv.chongId = chong.thanhVienId
        WHERE tv.active_flag = 1
            AND (p_dongHoId IS NULL OR p_dongHoId = '' OR tv.dongHoId = p_dongHoId)
            AND (p_search_content IS NULL OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(tv.hoTen, ''),
                    COALESCE(tv.ngheNghiep, ''),
                    COALESCE(tv.trinhDoHocVan, ''),
                    COALESCE(tv.diaChiHienTai, ''),
                    COALESCE(tv.soDienThoai, '')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%'))
        ORDER BY tv.doiThuoc ASC, tv.thanhVienId ASC;
        
        SELECT COUNT(*) INTO p_total_row FROM Results;
        
        -- Add row numbers
        SET @row_number = 0;
        SELECT 
            (@row_number := @row_number + 1) AS RowNumber,
            r.*,
            p_total_row AS RecordCount
        FROM Results r
        WHERE (@row_number + 1) BETWEEN ((p_pageIndex - 1) * p_pageSize) + 1 AND (p_pageIndex * p_pageSize);
        
        DROP TEMPORARY TABLE Results;
        
    -- KHÔNG PHÂN TRANG
    ELSE
        DROP TEMPORARY TABLE IF EXISTS Results;
        
        CREATE TEMPORARY TABLE Results AS
        SELECT DISTINCT
            tv.thanhVienId, 
            tv.dongHoId, 
            tv.hoTen, 
            tv.gioiTinh,
            tv.ngaySinh, 
            tv.ngayMat, 
            tv.noiSinh, 
            tv.noiMat,
            tv.ngheNghiep, 
            tv.trinhDoHocVan, 
            tv.soDienThoai,
            tv.diaChiHienTai,
            tv.tieuSu, 
            tv.anhChanDung, 
            tv.doiThuoc,
            tv.chaId, 
            tv.meId, 
            tv.voId, 
            tv.chongId,
            tv.ngayTao, 
            tv.active_flag,
            cha.hoTen AS tenCha,
            me.hoTen AS tenMe,
            vo.hoTen AS tenVo,
            chong.hoTen AS tenChong
        FROM thanhvien tv
        LEFT JOIN thanhvien cha ON tv.dongHoId = cha.dongHoId AND tv.chaId = cha.thanhVienId
        LEFT JOIN thanhvien me ON tv.dongHoId = me.dongHoId AND tv.meId = me.thanhVienId
        LEFT JOIN thanhvien vo ON tv.dongHoId = vo.dongHoId AND tv.voId = vo.thanhVienId
        LEFT JOIN thanhvien chong ON tv.dongHoId = chong.dongHoId AND tv.chongId = chong.thanhVienId
        WHERE tv.active_flag = 1
            AND (p_dongHoId IS NULL OR p_dongHoId = '' OR tv.dongHoId = p_dongHoId)
            AND (p_search_content IS NULL OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(tv.hoTen, ''),
                    COALESCE(tv.ngheNghiep, ''),
                    COALESCE(tv.trinhDoHocVan, ''),
                    COALESCE(tv.diaChiHienTai, ''),
                    COALESCE(tv.soDienThoai, '')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%'))
        ORDER BY tv.doiThuoc ASC, tv.thanhVienId ASC;
        
        SELECT COUNT(*) INTO p_total_row FROM Results;
        
        -- Add row numbers
        SET @row_number = 0;
        SELECT 
            (@row_number := @row_number + 1) AS RowNumber,
            r.*,
            p_total_row AS RecordCount
        FROM Results r;
        
        DROP TEMPORARY TABLE Results;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SearchTinTuc` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `SearchTinTuc`(
  IN p_pageIndex INT,
  IN p_pageSize INT,
  IN p_search_content VARCHAR(255),
  IN p_dongHoId VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  DECLARE v_offset INT;
  DECLARE v_total INT;
  
  SET v_offset = (p_pageIndex - 1) * p_pageSize;
  
  -- Đếm tổng số bản ghi
  SELECT COUNT(*) INTO v_total FROM tintuc 
  WHERE active_flag = 1 
    AND (p_dongHoId IS NULL OR p_dongHoId = '' OR dongHoId = p_dongHoId)
    AND (p_search_content IS NULL OR p_search_content = '' OR tieuDe LIKE CONCAT('%', p_search_content, '%'));
  
  -- Lấy dữ liệu
  SELECT 
    t.tinTucId,
    t.dongHoId,
    t.tieuDe,
    t.noiDung,
    t.tomTat,
    t.anhDaiDien,
    t.tacGia,
    t.ngayDang,
    t.luotXem,
    t.ghim,
    t.active_flag,
    t.nguoiTaoId,
    t.lu_updated,
    d.tenDongHo,
    v_total AS RecordCount
  FROM tintuc t
  LEFT JOIN dongho d ON t.dongHoId = d.dongHoId
  WHERE t.active_flag = 1
    AND (p_dongHoId IS NULL OR p_dongHoId = '' OR t.dongHoId = p_dongHoId)
    AND (p_search_content IS NULL OR p_search_content = '' OR t.tieuDe LIKE CONCAT('%', p_search_content, '%'))
  ORDER BY t.ghim DESC, t.ngayDang DESC
  LIMIT v_offset, p_pageSize;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SignUp` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `SignUp`(
    IN p_userId VARCHAR(40),
    IN p_tendangnhap VARCHAR(200),
    IN p_matkhau VARCHAR(200),
    IN p_tenDongHo VARCHAR(255),
    IN p_queQuanGoc VARCHAR(255),
    IN p_ngayThanhLap DATE,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_roleId VARCHAR(50);
    DECLARE v_dongHoId VARCHAR(50);
    DECLARE v_error_detail VARCHAR(500);

    -- Handler lỗi SQL với chi tiết
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            v_error_detail = MESSAGE_TEXT;
        ROLLBACK;
        SET p_error_code = -1;
        SET p_error_message = CONCAT('Lỗi SQL: ', v_error_detail);
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;

    -- Kiểm tra tên đăng nhập đã tồn tại chưa
    IF EXISTS (SELECT 1 FROM NguoiDung WHERE tenDangNhap = p_tendangnhap) THEN
        SET p_error_code = -1;
        SET p_error_message = 'Tài khoản người dùng đã tồn tại!';
        ROLLBACK;

    ELSE
        -- ⭐ BƯỚC 1: Lấy roleId có roleCode = 'thudo'
        SELECT roleId INTO v_roleId
        FROM Role
        WHERE roleCode = 'thudo'
        LIMIT 1;

        -- Nếu không tìm thấy role → báo lỗi
        IF v_roleId IS NULL THEN
            SET p_error_code = -1;
            SET p_error_message = 'Không tìm thấy role mặc định "thanhvien".';
            ROLLBACK;
        ELSE
            -- ⭐ BƯỚC 2: Tạo dòng họ mới
            SET v_dongHoId = UUID();
            
            INSERT INTO DongHo
                (dongHoId, tenDongHo, queQuanGoc, ngayThanhLap, 
                 nguoiQuanLy, active_flag, nguoiTaoId, ngayTao, lu_updated, lu_user_id)
            VALUES
                (v_dongHoId, p_tenDongHo, p_queQuanGoc, p_ngayThanhLap,
                 p_tendangnhap, 1, p_userId, NOW(), NOW(), p_userId);

            -- ⭐ BƯỚC 3: Thêm người dùng với roleId và dongHoId vừa tạo
            INSERT INTO NguoiDung
                (nguoiDungId, dongHoId, roleId, tenDangNhap, matKhau,
                 ngayTao, online_flag, active_flag,
                 lu_updated, lu_user_id)
            VALUES
                (p_userId, v_dongHoId, v_roleId, p_tendangnhap, p_matkhau,
                 NOW(), 0, 1,
                 NOW(), p_userId);

            -- ⭐ BƯỚC 4: Tạo user_profile với userId = nguoiDungId (chỉ các trường tối thiểu)
            INSERT INTO user_profile
                (userId, email, active_flag, created_by_user_id, create_date)
            VALUES
                (p_userId, p_tendangnhap, 1, p_userId, NOW());

            COMMIT;
            SET p_error_message = 'Đăng ký thành công!';
        END IF;

    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_clear_relationships` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_clear_relationships`(
    IN p_dongHoId VARCHAR(50)
)
BEGIN
    DELETE FROM quanhe WHERE dongHoId1 = p_dongHoId;
    
    SELECT ROW_COUNT() as deleted_count;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_create_grandparent_relationships` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_create_grandparent_relationships`(
    IN p_dongHoId VARCHAR(50)
)
BEGIN
    -- Tạo quan hệ ÔNG NỘI/NGOẠI - CHÁU (qua cha)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        cha.chaId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_ONG_CHAU' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    JOIN thanhvien cha ON cha.dongHoId = tv.dongHoId AND cha.thanhVienId = tv.chaId
    WHERE tv.dongHoId = p_dongHoId
        AND tv.chaId IS NOT NULL
        AND cha.chaId IS NOT NULL
        AND tv.active_flag = 1
        AND cha.active_flag = 1;
    
    -- Tạo quan hệ BÀ NỘI/NGOẠI - CHÁU (qua cha)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        cha.meId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_BA_CHAU' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    JOIN thanhvien cha ON cha.dongHoId = tv.dongHoId AND cha.thanhVienId = tv.chaId
    WHERE tv.dongHoId = p_dongHoId
        AND tv.chaId IS NOT NULL
        AND cha.meId IS NOT NULL
        AND tv.active_flag = 1
        AND cha.active_flag = 1;
    
    -- Tạo quan hệ ÔNG NGOẠI - CHÁU (qua mẹ)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        me.chaId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_ONG_CHAU' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    JOIN thanhvien me ON me.dongHoId = tv.dongHoId AND me.thanhVienId = tv.meId
    WHERE tv.dongHoId = p_dongHoId
        AND tv.meId IS NOT NULL
        AND me.chaId IS NOT NULL
        AND tv.active_flag = 1
        AND me.active_flag = 1;
    
    -- Tạo quan hệ BÀ NGOẠI - CHÁU (qua mẹ)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        me.meId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_BA_CHAU' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    JOIN thanhvien me ON me.dongHoId = tv.dongHoId AND me.thanhVienId = tv.meId
    WHERE tv.dongHoId = p_dongHoId
        AND tv.meId IS NOT NULL
        AND me.meId IS NOT NULL
        AND tv.active_flag = 1
        AND me.active_flag = 1;
    
    SELECT ROW_COUNT() as created_count;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_create_maternal_uncle_aunt_relationships` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_create_maternal_uncle_aunt_relationships`(
    IN p_dongHoId VARCHAR(50)
)
BEGIN
    -- Tạo quan hệ CẬU - CHÁU (anh em trai của mẹ)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        cau.thanhVienId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_CAU_CHAU' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    JOIN thanhvien me ON me.dongHoId = tv.dongHoId AND me.thanhVienId = tv.meId
    JOIN thanhvien cau ON cau.dongHoId = me.dongHoId
        AND cau.chaId = me.chaId
        AND cau.meId = me.meId
        AND cau.thanhVienId != me.thanhVienId
        AND cau.gioiTinh = 1  -- Nam
    WHERE tv.dongHoId = p_dongHoId
        AND tv.meId IS NOT NULL
        AND tv.active_flag = 1
        AND me.active_flag = 1
        AND cau.active_flag = 1;
    
    -- Tạo quan hệ DÌ - CHÁU (chị em gái của mẹ)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        di.thanhVienId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_DI_CHAU' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    JOIN thanhvien me ON me.dongHoId = tv.dongHoId AND me.thanhVienId = tv.meId
    JOIN thanhvien di ON di.dongHoId = me.dongHoId
        AND di.chaId = me.chaId
        AND di.meId = me.meId
        AND di.thanhVienId != me.thanhVienId
        AND di.gioiTinh = 0  -- Nữ
    WHERE tv.dongHoId = p_dongHoId
        AND tv.meId IS NOT NULL
        AND tv.active_flag = 1
        AND me.active_flag = 1
        AND di.active_flag = 1;
    
    SELECT ROW_COUNT() as created_count;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_create_parent_child_relationships` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_create_parent_child_relationships`(
    IN p_dongHoId VARCHAR(50)
)
BEGIN
    -- Tạo quan hệ CHA - CON
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        tv.chaId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_CHA_CON' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    WHERE tv.dongHoId = p_dongHoId 
        AND tv.chaId IS NOT NULL
        AND tv.active_flag = 1;
    
    -- Tạo quan hệ MẸ - CON
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        tv.meId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_ME_CON' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    WHERE tv.dongHoId = p_dongHoId 
        AND tv.meId IS NOT NULL
        AND tv.active_flag = 1;
    
    SELECT ROW_COUNT() as created_count;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_create_paternal_uncle_aunt_relationships` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_create_paternal_uncle_aunt_relationships`(
    IN p_dongHoId VARCHAR(50)
)
BEGIN
    -- Tạo quan hệ CHÚ/BÁC - CHÁU (anh em trai của cha)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        chu_bac.thanhVienId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        CASE 
            WHEN chu_bac.thanhVienId < cha.thanhVienId THEN 'LQH_BAC_CHAU'  -- Anh của cha = Bác
            ELSE 'LQH_CHU_CHAU'  -- Em của cha = Chú
        END as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    JOIN thanhvien cha ON cha.dongHoId = tv.dongHoId AND cha.thanhVienId = tv.chaId
    JOIN thanhvien chu_bac ON chu_bac.dongHoId = cha.dongHoId
        AND chu_bac.chaId = cha.chaId
        AND chu_bac.meId = cha.meId
        AND chu_bac.thanhVienId != cha.thanhVienId
        AND chu_bac.gioiTinh = 1  -- Nam
    WHERE tv.dongHoId = p_dongHoId
        AND tv.chaId IS NOT NULL
        AND tv.active_flag = 1
        AND cha.active_flag = 1
        AND chu_bac.active_flag = 1;
    
    -- Tạo quan hệ CÔ - CHÁU (chị em gái của cha)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        co.thanhVienId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_CO_CHAU' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    JOIN thanhvien cha ON cha.dongHoId = tv.dongHoId AND cha.thanhVienId = tv.chaId
    JOIN thanhvien co ON co.dongHoId = cha.dongHoId
        AND co.chaId = cha.chaId
        AND co.meId = cha.meId
        AND co.thanhVienId != cha.thanhVienId
        AND co.gioiTinh = 0  -- Nữ
    WHERE tv.dongHoId = p_dongHoId
        AND tv.chaId IS NOT NULL
        AND tv.active_flag = 1
        AND cha.active_flag = 1
        AND co.active_flag = 1;
    
    SELECT ROW_COUNT() as created_count;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_create_sibling_relationships` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_create_sibling_relationships`(
    IN p_dongHoId VARCHAR(50)
)
BEGIN
    -- Tạo quan hệ ANH - EM (nam với anh em ruột)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT DISTINCT
        UUID() as quanHeId,
        tv1.thanhVienId as thanhVien1Id,
        tv2.thanhVienId as thanhVien2Id,
        'LQH_ANH_EM' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv1
    JOIN thanhvien tv2 ON tv2.dongHoId = tv1.dongHoId
        AND tv2.chaId = tv1.chaId
        AND tv2.meId = tv1.meId
        AND tv2.thanhVienId > tv1.thanhVienId  -- Tránh duplicate
    WHERE tv1.dongHoId = p_dongHoId
        AND tv1.gioiTinh = 1
        AND tv1.chaId IS NOT NULL
        AND tv1.meId IS NOT NULL
        AND tv1.active_flag = 1
        AND tv2.active_flag = 1;
    
    -- Tạo quan hệ CHỊ - EM (nữ với anh em ruột)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT DISTINCT
        UUID() as quanHeId,
        tv1.thanhVienId as thanhVien1Id,
        tv2.thanhVienId as thanhVien2Id,
        'LQH_CHI_EM' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv1
    JOIN thanhvien tv2 ON tv2.dongHoId = tv1.dongHoId
        AND tv2.chaId = tv1.chaId
        AND tv2.meId = tv1.meId
        AND tv2.thanhVienId > tv1.thanhVienId  -- Tránh duplicate
    WHERE tv1.dongHoId = p_dongHoId
        AND tv1.gioiTinh = 0
        AND tv1.chaId IS NOT NULL
        AND tv1.meId IS NOT NULL
        AND tv1.active_flag = 1
        AND tv2.active_flag = 1;
    
    SELECT ROW_COUNT() as created_count;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_create_spouse_relationships` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_create_spouse_relationships`(
    IN p_dongHoId VARCHAR(50)
)
BEGIN
    -- Tạo quan hệ VỢ - CHỒNG (từ nam có vợ)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        tv.thanhVienId as thanhVien1Id,
        tv.voId as thanhVien2Id,
        'LQH_VO_CHONG' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    WHERE tv.dongHoId = p_dongHoId 
        AND tv.gioiTinh = 1
        AND tv.voId IS NOT NULL
        AND tv.active_flag = 1;
    
    -- Tạo quan hệ VỢ - CHỒNG (từ nữ có chồng)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        tv.chongId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_VO_CHONG' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    WHERE tv.dongHoId = p_dongHoId 
        AND tv.gioiTinh = 0
        AND tv.chongId IS NOT NULL
        AND tv.active_flag = 1
        -- Tránh duplicate nếu đã tạo từ phía nam
        AND NOT EXISTS (
            SELECT 1 FROM quanhe 
            WHERE thanhVien1Id = tv.chongId 
                AND thanhVien2Id = tv.thanhVienId
                AND loaiQuanHeId = 'LQH_VO_CHONG'
                AND dongHoId1 = p_dongHoId
        );
    
    SELECT ROW_COUNT() as created_count;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_sync_all_relationships` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_sync_all_relationships`(
    IN p_dongHoId VARCHAR(50),
    OUT p_total_created INT
)
BEGIN
    DECLARE v_count INT DEFAULT 0;
    DECLARE v_total INT DEFAULT 0;
    
    -- Bắt đầu transaction
    START TRANSACTION;
    
    -- 1. Xóa tất cả quan hệ cũ
    CALL sp_clear_relationships(p_dongHoId);
    
    -- 2. Tạo quan hệ CHA MẸ - CON
    CALL sp_create_parent_child_relationships(p_dongHoId);
    
    -- 3. Tạo quan hệ VỢ - CHỒNG
    CALL sp_create_spouse_relationships(p_dongHoId);
    
    -- 4. Tạo quan hệ ANH CHỊ EM
    CALL sp_create_sibling_relationships(p_dongHoId);
    
    -- 5. Tạo quan hệ ÔNG BÀ - CHÁU
    CALL sp_create_grandparent_relationships(p_dongHoId);
    
    -- 6. Tạo quan hệ CHÚ BÁC CÔ
    CALL sp_create_paternal_uncle_aunt_relationships(p_dongHoId);
    
    -- 7. Tạo quan hệ DÌ CẬU
    CALL sp_create_maternal_uncle_aunt_relationships(p_dongHoId);
    
    -- Đếm tổng số quan hệ đã tạo
    SELECT COUNT(*) INTO v_total FROM quanhe WHERE dongHoId1 = p_dongHoId;
    SET p_total_created = v_total;
    
    -- Commit transaction
    COMMIT;
    
    -- Trả về kết quả
    SELECT 
        p_dongHoId as dongHoId,
        v_total as total_relationships_created,
        'SUCCESS' as status,
        NOW() as synced_at;
        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `TestImportComplete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `TestImportComplete`(
    IN p_dongHoId VARCHAR(50)
)
BEGIN
    DECLARE v_json_update JSON;
    DECLARE v_json_insert JSON;
    
    -- ========================================================================
    -- PHẦN 1: XEM DỮ LIỆU HIỆN TẠI
    -- ========================================================================
    SELECT '========== BƯỚC 1: DỮ LIỆU HIỆN TẠI ==========' AS info;
    SELECT thuId, hoTenNguoiDong, soTien, noiDung
    FROM taichinhthu
    WHERE dongHoId = p_dongHoId
    ORDER BY thuId;
    
    -- ========================================================================
    -- PHẦN 2: TEST UPDATE VỚI thuId = 1
    -- ========================================================================
    SET v_json_update = '[
        {
            "thu_id": 1,
            "stt": 1,
            "ho_ten_nguoi_dong": "UPDATED - Test",
            "ngay_dong": "15/01/2026",
            "so_tien": 999999,
            "phuong_thuc_thanh_toan": "Chuyển khoản",
            "noi_dung": "Đã cập nhật",
            "ghi_chu": "Test UPDATE"
        }
    ]';
    
    SELECT '========== BƯỚC 2: TEST UPDATE (thuId=1) ==========' AS info;
    
    -- Tạo temp table
    DROP TEMPORARY TABLE IF EXISTS tmp_test;
    CREATE TEMPORARY TABLE tmp_test (
        row_id INT AUTO_INCREMENT PRIMARY KEY,
        thu_id INT,
        stt INT,
        ho_ten_nguoi_dong VARCHAR(255),
        ngay_dong DATE,
        so_tien DECIMAL(18,2),
        phuong_thuc_thanh_toan VARCHAR(100),
        noi_dung TEXT,
        ghi_chu TEXT,
        is_existing TINYINT DEFAULT 0,
        KEY idx_thu_id (thu_id)
    );
    
    -- Parse JSON
    INSERT INTO tmp_test (thu_id, stt, ho_ten_nguoi_dong, ngay_dong, so_tien, phuong_thuc_thanh_toan, noi_dung, ghi_chu)
    SELECT 
        CAST(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.thu_id')),'0') AS UNSIGNED),
        CAST(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.stt')),'0') AS UNSIGNED),
        JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.ho_ten_nguoi_dong')),
        STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.ngay_dong')),'%d/%m/%Y'),
        CAST(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.so_tien')) AS DECIMAL(18,2)),
        COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.phuong_thuc_thanh_toan')),'Tiền mặt'),
        COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.noi_dung')),''),
        COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.ghi_chu')),'')
    FROM JSON_TABLE(v_json_update,'$[*]' COLUMNS(value JSON PATH '$')) j;
    
    SELECT '2.1 - Sau khi parse JSON:' AS step;
    SELECT * FROM tmp_test;
    
    -- Đánh dấu existing
    UPDATE tmp_test t
    SET t.is_existing = 1
    WHERE t.thu_id > 0
      AND EXISTS (
          SELECT 1 FROM taichinhthu tt
          WHERE tt.dongHoId = p_dongHoId
            AND tt.thuId = t.thu_id
            AND tt.active_flag = 1
      );
    
    SELECT '2.2 - Sau khi đánh dấu existing:' AS step;
    SELECT thu_id, ho_ten_nguoi_dong, so_tien, is_existing,
           CASE WHEN is_existing = 1 THEN 'UPDATE' ELSE 'INSERT' END AS action
    FROM tmp_test;
    
    -- Kiểm tra: is_existing phải = 1
    IF (SELECT is_existing FROM tmp_test LIMIT 1) = 0 THEN
        SELECT '❌ LỖI: is_existing = 0 (lẽ ra phải = 1)' AS error;
        SELECT 'Kiểm tra: thuId có tồn tại trong DB không?' AS hint;
    ELSE
        SELECT '✅ OK: is_existing = 1' AS success;
    END IF;
    
    SELECT '2.3 - Trước khi UPDATE:' AS step;
    SELECT thuId, hoTenNguoiDong, soTien, noiDung
    FROM taichinhthu
    WHERE dongHoId = p_dongHoId AND thuId = 1;
    
    -- Thực hiện UPDATE
    UPDATE taichinhthu tt
    INNER JOIN tmp_test t 
      ON tt.thuId = t.thu_id 
      AND tt.dongHoId = p_dongHoId
      AND tt.active_flag = 1
    SET 
        tt.hoTenNguoiDong = t.ho_ten_nguoi_dong,
        tt.ngayDong = t.ngay_dong,
        tt.soTien = t.so_tien,
        tt.phuongThucThanhToan = t.phuong_thuc_thanh_toan,
        tt.noiDung = t.noi_dung,
        tt.ghiChu = t.ghi_chu,
        tt.lu_updated = NOW(),
        tt.lu_user_id = 'test-user'
    WHERE t.is_existing = 1;
    
    SELECT CONCAT('Số dòng đã UPDATE: ', ROW_COUNT()) AS result;
    
    SELECT '2.4 - Sau khi UPDATE:' AS step;
    SELECT thuId, hoTenNguoiDong, soTien, noiDung
    FROM taichinhthu
    WHERE dongHoId = p_dongHoId AND thuId = 1;
    
    -- Kiểm tra kết quả
    IF (SELECT soTien FROM taichinhthu WHERE dongHoId = p_dongHoId AND thuId = 1) = 999999 THEN
        SELECT '✅ UPDATE THÀNH CÔNG: Số tiền = 999999' AS success;
    ELSE
        SELECT '❌ UPDATE THẤT BẠI: Số tiền không thay đổi' AS error;
    END IF;
    
    DROP TEMPORARY TABLE IF EXISTS tmp_test;
    
    -- ========================================================================
    -- PHẦN 3: TEST INSERT VỚI thu_id = 0
    -- ========================================================================
    SET v_json_insert = '[
        {
            "thu_id": 0,
            "stt": 1,
            "ho_ten_nguoi_dong": "Test INSERT NEW",
            "ngay_dong": "15/01/2026",
            "so_tien": 123456,
            "phuong_thuc_thanh_toan": "Tiền mặt",
            "noi_dung": "Test thêm mới",
            "ghi_chu": ""
        }
    ]';
    
    SELECT '========== BƯỚC 3: TEST INSERT (thu_id=0) ==========' AS info;
    
    -- Tạo temp table
    DROP TEMPORARY TABLE IF EXISTS tmp_test;
    CREATE TEMPORARY TABLE tmp_test (
        row_id INT AUTO_INCREMENT PRIMARY KEY,
        thu_id INT,
        stt INT,
        ho_ten_nguoi_dong VARCHAR(255),
        so_tien DECIMAL(18,2),
        is_existing TINYINT DEFAULT 0,
        KEY idx_thu_id (thu_id)
    );
    
    -- Parse JSON
    INSERT INTO tmp_test (thu_id, stt, ho_ten_nguoi_dong, so_tien)
    SELECT 
        CAST(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.thu_id')),'0') AS UNSIGNED),
        CAST(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.stt')),'0') AS UNSIGNED),
        JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.ho_ten_nguoi_dong')),
        CAST(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.so_tien')) AS DECIMAL(18,2))
    FROM JSON_TABLE(v_json_insert,'$[*]' COLUMNS(value JSON PATH '$')) j;
    
    SELECT '3.1 - Sau khi parse JSON:' AS step;
    SELECT * FROM tmp_test;
    
    -- Lấy max ID
    SET @v_max_id = (SELECT COALESCE(MAX(thuId), 0) FROM taichinhthu WHERE dongHoId = p_dongHoId);
    SELECT CONCAT('Max thuId hiện tại: ', @v_max_id) AS info;
    
    -- Gán ID mới
    SET @row_num = 0;
    UPDATE tmp_test t
    SET t.thu_id = @v_max_id + (@row_num := @row_num + 1)
    WHERE t.is_existing = 0 
      AND t.thu_id = 0
      AND row_id > 0
    ORDER BY t.stt;
    
    SELECT '3.2 - Sau khi gán ID mới:' AS step;
    SELECT thu_id, ho_ten_nguoi_dong, so_tien FROM tmp_test;
    
    SELECT CONCAT('ID mới sẽ là: ', @v_max_id + 1) AS expected;
    
    DROP TEMPORARY TABLE IF EXISTS tmp_test;
    
    -- ========================================================================
    -- PHẦN 4: TỔNG KẾT
    -- ========================================================================
    SELECT '========== TỔNG KẾT ==========' AS info;
    SELECT 
        'Nếu UPDATE thành công → is_existing = 1 và số tiền = 999999' AS test_update,
        'Nếu INSERT đúng → ID mới = max_id + 1' AS test_insert;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateDongHo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateDongHo`(
    IN p_dongHoId VARCHAR(50),
    IN p_tenDongHo VARCHAR(255),
    IN p_queQuanGoc VARCHAR(255),
    IN p_ngayThanhLap DATE,
    IN p_nguoiQuanLy VARCHAR(255),
    IN p_ghiChu TEXT,
    IN p_lu_user_id VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;

    UPDATE dongho 
    SET 
        tenDongHo = COALESCE(p_tenDongHo, tenDongHo),
        queQuanGoc = COALESCE(p_queQuanGoc, queQuanGoc),
        ngayThanhLap = COALESCE(p_ngayThanhLap, ngayThanhLap),
        nguoiQuanLy = COALESCE(p_nguoiQuanLy, nguoiQuanLy),
        ghiChu = COALESCE(p_ghiChu, ghiChu),
        lu_updated = NOW(),
        lu_user_id = p_lu_user_id
    WHERE dongHoId = p_dongHoId AND active_flag = 1;

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateEvent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateEvent`(
   IN p_suKienId VARCHAR(50),
   IN p_dongHoId VARCHAR(50),
   IN p_tenSuKien VARCHAR(50),
   IN p_ngayDienRa date,
   IN p_gioDienRa time,
   IN p_diaDiem VARCHAR(255),
   IN p_moTa VARCHAR(20),
   IN p_lapLai INT,
   IN p_loaiSuKien INT,
   IN p_uuTien INT,
   IN p_lu_user_id VARCHAR(100),
   OUT p_error_code INT, 
   OUT p_error_message VARCHAR(500)
)
BEGIN
	DECLARE active_flag INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
         GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
         ROLLBACK;
    END; 

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;
        UPDATE SuKien
        SET
			  dongHoId = p_dongHoId,
			  tenSuKien = p_tenSuKien,
			  ngayDienRa = p_ngayDienRa,
			  gioDienRa = p_gioDienRa,
			  diaDiem = p_diaDiem,
			  moTa = p_moTa,
			  lapLai = p_lapLai,
              lu_updated = now(),
			  loaiSuKien = p_loaiSuKien,
              uuTien = p_uuTien,
              lu_user_id = p_lu_user_id
		WHERE suKienId = p_suKienId;
		COMMIT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateMember` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateMember`(
	p_thanhVienId INT,
    p_dongHoId VARCHAR(50) ,
    p_hoTen VARCHAR(255) ,
    p_gioiTinh TINYINT ,
    p_ngaySinh DATE ,
    p_ngayMat DATE ,
    p_noiSinh VARCHAR(255) ,
    p_noiMat VARCHAR(255) ,
    p_ngheNghiep VARCHAR(255) ,
    p_trinhDoHocVan VARCHAR(255) ,
    p_diaChiHienTai VARCHAR(255) ,
    p_tieuSu TEXT,
    p_anhChanDung VARCHAR(255) ,
    p_doiThuoc INT ,
    p_chaId INT ,
    p_meId INT ,
    p_voId INT,
    p_chongId INT ,
    p_lu_user_id VARCHAR(50),
    OUT p_error_code INT, 
	OUT p_error_message VARCHAR(500)
)
BEGIN 	
	DECLARE active_flag INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
         ROLLBACK;
	END;
    SET p_error_code = 0;
    SET p_error_message = '';
    START TRANSACTION;
    UPDATE ThanhVien
	SET	
		dongHoId = p_dongHoId,
		hoTen = p_hoTen ,
		gioiTinh = p_gioiTinh ,
		ngaySinh =  p_ngaySinh,
		ngayMat = p_ngayMat,
		noiSinh = p_noiSinh ,
		noiMat = p_noiMat ,
		ngheNghiep = p_ngheNghiep ,
		trinhDoHocVan = p_trinhDoHocVan,
		diaChiHienTai = p_diaChiHienTai,
		tieuSu = p_tieuSu ,
		anhChanDung = p_anhChanDung,
		doiThuoc = p_doiThuoc ,
		chaId = p_chaId ,
		meId = p_meId ,
		voId = p_voId ,
		chongId = p_chongId,
        lu_updated = now(),
		lu_user_id = p_lu_user_id
        where thanhVienId = p_thanhVienId;
        commit;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateMemberComposite` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateMemberComposite`(
  IN p_dongHoId VARCHAR(50),
  IN p_thanhVienId INT,
  IN p_hoTen VARCHAR(255),
  IN p_gioiTinh INT,
  IN p_ngaySinh DATE,
  IN p_ngayMat DATE,
  IN p_noiSinh VARCHAR(255),
  IN p_noiMat VARCHAR(255),
  IN p_ngheNghiep VARCHAR(255),
  IN p_trinhDoHocVan VARCHAR(255),
  IN p_diaChiHienTai VARCHAR(500),
  IN p_tieuSu TEXT,
  IN p_anhChanDung VARCHAR(255),
  IN p_doiThuoc INT,
  IN p_chaId INT,
  IN p_meId INT,
  IN p_voId INT,
  IN p_chongId INT,
  IN p_lu_user_id VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  UPDATE thanhvien SET
    hoTen = p_hoTen,
    gioiTinh = p_gioiTinh,
    ngaySinh = p_ngaySinh,
    ngayMat = p_ngayMat,
    noiSinh = p_noiSinh,
    noiMat = p_noiMat,
    ngheNghiep = p_ngheNghiep,
    trinhDoHocVan = p_trinhDoHocVan,
    diaChiHienTai = p_diaChiHienTai,
    tieuSu = p_tieuSu,
    anhChanDung = p_anhChanDung,
    doiThuoc = p_doiThuoc,
    chaId = p_chaId,
    meId = p_meId,
    voId = p_voId,
    chongId = p_chongId,
    lu_updated = NOW(),
    lu_user_id = p_lu_user_id
  WHERE dongHoId = p_dongHoId AND thanhVienId = p_thanhVienId;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateMyAccountAndProfile` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateMyAccountAndProfile`(
    IN p_userId CHAR(36),
    IN p_tenDangNhap VARCHAR(100),
    IN p_matKhau VARCHAR(255),
    IN p_first_name VARCHAR(50),
    IN p_middle_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_gender TINYINT,
    IN p_date_of_birthday DATE,
    IN p_avatar VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_phone VARCHAR(20),
    IN p_lu_user_id VARCHAR(50),
    OUT p_error_code INT, 
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_error_message = MESSAGE_TEXT;
        SET p_error_code = 9999;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    -- Kiểm tra user tồn tại
    IF NOT EXISTS (SELECT 1 FROM NguoiDung WHERE nguoiDungId = p_userId) THEN
        SET p_error_code = 1001;
        SET p_error_message = 'Người dùng không tồn tại';
    ELSE
        START TRANSACTION;

        -- Update NguoiDung
        UPDATE NguoiDung
        SET
            tenDangNhap = COALESCE(NULLIF(p_tenDangNhap, ''), tenDangNhap),
            matKhau = CASE 
                WHEN p_matKhau IS NOT NULL AND TRIM(p_matKhau) != '' 
                THEN p_matKhau 
                ELSE matKhau 
            END,
            lu_updated = NOW(),
            lu_user_id = p_lu_user_id
        WHERE nguoiDungId = p_userId;

        -- Insert / Update user_profile
        IF NOT EXISTS (SELECT 1 FROM user_profile WHERE userId = p_userId) THEN
            INSERT INTO user_profile (
                userId, first_name, middle_name, last_name, full_name,
                gender, date_of_birthday, avatar, email, phone,
                active_flag, created_by_user_id, create_date,
                lu_updated, lu_user_id
            ) VALUES (
                p_userId,
                p_first_name,
                p_middle_name,
                p_last_name,
                TRIM(CONCAT(
                    COALESCE(p_last_name, ''), ' ',
                    COALESCE(p_middle_name, ''), ' ',
                    COALESCE(p_first_name, '')
                )),
                COALESCE(p_gender, 1),
                p_date_of_birthday,
                p_avatar,
                p_email,
                p_phone,
                1,
                p_lu_user_id,
                NOW(),
                NOW(),
                p_lu_user_id
            );
        ELSE
            UPDATE user_profile
            SET
                first_name = COALESCE(p_first_name, first_name),
                middle_name = COALESCE(p_middle_name, middle_name),
                last_name = COALESCE(p_last_name, last_name),
                full_name = TRIM(CONCAT(
                    COALESCE(p_last_name, last_name), ' ',
                    COALESCE(p_middle_name, middle_name), ' ',
                    COALESCE(p_first_name, first_name)
                )),
                gender = COALESCE(p_gender, gender),
                date_of_birthday = COALESCE(p_date_of_birthday, date_of_birthday),
                avatar = COALESCE(NULLIF(p_avatar, ''), avatar),
                email = COALESCE(NULLIF(p_email, ''), email),
                phone = COALESCE(NULLIF(p_phone, ''), phone),
                lu_updated = NOW(),
                lu_user_id = p_lu_user_id
            WHERE userId = p_userId;
        END IF;

        IF ROW_COUNT() = 0 THEN
            SET p_error_code = 1002;
            SET p_error_message = 'Không có dữ liệu nào được cập nhật';
            ROLLBACK;
        ELSE
            COMMIT;
            SET p_error_message = 'Cập nhật thông tin thành công';
        END IF;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateRole`(
    IN p_roleId VARCHAR(36),
    IN p_roleName NVARCHAR(100),
    IN p_description NVARCHAR(255),
    OUT p_err_code INT,
    OUT p_err_msg NVARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_err_code = @errno;
        SET p_err_msg = @text;
        ROLLBACK;
    END;

    START TRANSACTION;
    
    -- Kiểm tra role tồn tại
    IF NOT EXISTS (SELECT 1 FROM role WHERE roleId = p_roleId AND active_flag = 1) THEN
        SET p_err_code = 1;
        SET p_err_msg = 'Nhóm quyền không tồn tại';
        ROLLBACK;
    ELSE
        UPDATE role 
        SET roleName = p_roleName, 
            description = p_description, 
            lu_updated = NOW()
        WHERE roleId = p_roleId;
        
        SET p_err_code = 0;
        SET p_err_msg = 'Cập nhật thành công';
        COMMIT;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateRolePermissions` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateRolePermissions`(
    IN p_roleId VARCHAR(36),
    IN p_permissions JSON,
    OUT p_err_code INT,
    OUT p_err_msg NVARCHAR(255)
)
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE total INT;
    DECLARE v_chucNangId VARCHAR(36);
    DECLARE v_thaoTacId VARCHAR(36);
    DECLARE v_active TINYINT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_err_code = @errno;
        SET p_err_msg = @text;
        ROLLBACK;
    END;

    START TRANSACTION;
    
    -- Xóa quyền cũ
    DELETE FROM role_chucnang WHERE roleId = p_roleId;
    
    -- Thêm quyền mới từ JSON array
    SET total = JSON_LENGTH(p_permissions);
    
    WHILE i < total DO
        SET v_chucNangId = JSON_UNQUOTE(JSON_EXTRACT(p_permissions, CONCAT('$[', i, '].chucNangId')));
        SET v_thaoTacId = JSON_UNQUOTE(JSON_EXTRACT(p_permissions, CONCAT('$[', i, '].thaoTacId')));
        SET v_active = JSON_EXTRACT(p_permissions, CONCAT('$[', i, '].active'));
        
        IF v_active = 1 OR v_active = TRUE THEN
            INSERT INTO role_chucnang (roleId, chucNangId, thaoTacId, active_flag, lu_updated)
            VALUES (p_roleId, v_chucNangId, v_thaoTacId, 1, NOW());
        END IF;
        
        SET i = i + 1;
    END WHILE;
    
    SET p_err_code = 0;
    SET p_err_msg = 'Cập nhật quyền thành công';
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateTaiChinhChi` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateTaiChinhChi`(
    IN p_chiId INT,
    IN p_dongHoId VARCHAR(50),
    IN p_ngayChi DATE,
    IN p_soTien DECIMAL(18,2),
    IN p_phuongThucThanhToan VARCHAR(100),
    IN p_noiDung TEXT,
    IN p_nguoiNhan VARCHAR(255),
    IN p_ghiChu TEXT,
    IN p_lu_user_id VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;
    
    SET p_error_code = 0;
    SET p_error_message = '';
    
    START TRANSACTION;
    
    -- Validate
    IF p_soTien <= 0 THEN
        SET p_error_code = 1;
        SET p_error_message = 'Số tiền phải lớn hơn 0';
        ROLLBACK;
    ELSE
        UPDATE taichinhchi
        SET 
            ngayChi = p_ngayChi,
            soTien = p_soTien,
            phuongThucThanhToan = p_phuongThucThanhToan,
            noiDung = p_noiDung,
            nguoiNhan = p_nguoiNhan,
            ghiChu = p_ghiChu,
            lu_updated = NOW(),
            lu_user_id = p_lu_user_id
        WHERE chiId = p_chiId AND dongHoId = p_dongHoId;
        
        IF ROW_COUNT() = 0 THEN
            SET p_error_code = 1;
            SET p_error_message = 'Không tìm thấy khoản chi để cập nhật';
            ROLLBACK;
        ELSE
            SET p_error_message = 'Cập nhật khoản chi thành công';
            COMMIT;
        END IF;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateTaiChinhThu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateTaiChinhThu`(
    IN p_thuId INT,
    IN p_dongHoId VARCHAR(50),
    IN p_hoTenNguoiDong VARCHAR(255),
    IN p_ngayDong DATE,
    IN p_soTien DECIMAL(18,2),
    IN p_phuongThucThanhToan VARCHAR(100),
    IN p_noiDung TEXT,
    IN p_ghiChu TEXT,
    IN p_lu_user_id VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;
    
    SET p_error_code = 0;
    SET p_error_message = '';
    
    START TRANSACTION;
    
    -- Validate
    IF p_soTien <= 0 THEN
        SET p_error_code = 1;
        SET p_error_message = 'Số tiền phải lớn hơn 0';
        ROLLBACK;
    ELSEIF p_hoTenNguoiDong IS NULL OR p_hoTenNguoiDong = '' THEN
        SET p_error_code = 1;
        SET p_error_message = 'Họ tên người đóng không được để trống';
        ROLLBACK;
    ELSE
        UPDATE taichinhthu
        SET 
            hoTenNguoiDong = p_hoTenNguoiDong,
            ngayDong = p_ngayDong,
            soTien = p_soTien,
            phuongThucThanhToan = p_phuongThucThanhToan,
            noiDung = p_noiDung,
            ghiChu = p_ghiChu,
            lu_updated = NOW(),
            lu_user_id = p_lu_user_id
        WHERE thuId = p_thuId AND dongHoId = p_dongHoId;
        
        IF ROW_COUNT() = 0 THEN
            SET p_error_code = 1;
            SET p_error_message = 'Không tìm thấy khoản thu để cập nhật';
            ROLLBACK;
        ELSE
            SET p_error_message = 'Cập nhật khoản thu thành công';
            COMMIT;
        END IF;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateTaiLieu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateTaiLieu`(
    IN p_taiLieuId VARCHAR(50),
    IN p_dongHoId VARCHAR(50),
    IN p_tenTaiLieu VARCHAR(255),
    IN p_duongDan VARCHAR(255),
    IN p_moTa TEXT,
    IN p_loaiTaiLieu VARCHAR(100),
    IN p_namSangTac INT,
    IN p_tacGia VARCHAR(255),
    IN p_nguonGoc VARCHAR(255),
    IN p_ghiChu TEXT,
    IN p_lu_user_id VARCHAR(50),
    OUT p_err_code INT,
    OUT p_err_msg VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_err_code = RETURNED_SQLSTATE, 
            p_err_msg = MESSAGE_TEXT;
        ROLLBACK;
    END;

    SET p_err_code = 0;
    SET p_err_msg = 'Success';

    -- Cập nhật tài liệu
    -- Lưu ý: Không dùng IFNULL cho duongDan để có thể cập nhật file mới
    UPDATE tailieu 
    SET
        dongHoId = p_dongHoId,
        tenTaiLieu = p_tenTaiLieu,
        duongDan = p_duongDan,  -- Cập nhật trực tiếp, không dùng IFNULL
        moTa = p_moTa,
        loaiTaiLieu = p_loaiTaiLieu,
        namSangTac = p_namSangTac,
        tacGia = p_tacGia,
        nguonGoc = p_nguonGoc,
        ghiChu = p_ghiChu,
        lu_updated = NOW(),
        lu_user_id = p_lu_user_id
    WHERE taiLieuId = p_taiLieuId
      AND active_flag = 1;

    -- Kiểm tra có cập nhật được không
    IF ROW_COUNT() = 0 THEN
        SET p_err_code = 1;
        SET p_err_msg = 'Không tìm thấy tài liệu hoặc tài liệu đã bị xóa';
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateThanhVien` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateThanhVien`(
    IN p_dongHoId VARCHAR(36),
    IN p_thanhVienId INT,
    IN p_hoTen NVARCHAR(100),
    IN p_gioiTinh TINYINT,
    IN p_ngaySinh DATE,
    IN p_ngayMat DATE,
    IN p_noiSinh NVARCHAR(255),
    IN p_noiMat NVARCHAR(255),
    IN p_ngheNghiep NVARCHAR(100),
    IN p_trinhDoHocVan NVARCHAR(100),
    IN p_soDienThoai VARCHAR(20),
    IN p_diaChiHienTai NVARCHAR(255),
    IN p_tieuSu TEXT,
    IN p_anhChanDung VARCHAR(255),
    IN p_doiThuoc INT,
    IN p_chaId INT,
    IN p_meId INT,
    IN p_voId INT,
    IN p_chongId INT,
    IN p_lu_user_id VARCHAR(36),
    OUT p_err_code INT,
    OUT p_err_msg NVARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_err_code = @errno;
        SET p_err_msg = @text;
        ROLLBACK;
    END;

    START TRANSACTION;
    
    -- Kiểm tra thành viên tồn tại
    IF NOT EXISTS (SELECT 1 FROM thanhvien WHERE dongHoId = p_dongHoId AND thanhVienId = p_thanhVienId AND active_flag = 1) THEN
        SET p_err_code = 1;
        SET p_err_msg = 'Thành viên không tồn tại';
        ROLLBACK;
    ELSE
        UPDATE thanhvien SET
            hoTen = p_hoTen,
            gioiTinh = p_gioiTinh,
            ngaySinh = p_ngaySinh,
            ngayMat = p_ngayMat,
            noiSinh = p_noiSinh,
            noiMat = p_noiMat,
            ngheNghiep = p_ngheNghiep,
            trinhDoHocVan = p_trinhDoHocVan,
            soDienThoai = p_soDienThoai,
            diaChiHienTai = p_diaChiHienTai,
            tieuSu = p_tieuSu,
            anhChanDung = p_anhChanDung,
            doiThuoc = p_doiThuoc,
            chaId = p_chaId,
            meId = p_meId,
            voId = p_voId,
            chongId = p_chongId,
            lu_updated = NOW(),
            lu_user_id = p_lu_user_id
        WHERE dongHoId = p_dongHoId AND thanhVienId = p_thanhVienId;
        
        SET p_err_code = 0;
        SET p_err_msg = 'Cập nhật thành công';
        COMMIT;
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateTinTuc` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateTinTuc`(
  IN p_tinTucId VARCHAR(50),
  IN p_dongHoId VARCHAR(50),
  IN p_tieuDe VARCHAR(255),
  IN p_noiDung TEXT,
  IN p_tomTat VARCHAR(500),
  IN p_anhDaiDien VARCHAR(255),
  IN p_tacGia VARCHAR(255),
  IN p_ghim TINYINT,
  IN p_lu_user_id VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  UPDATE tintuc SET
    dongHoId = p_dongHoId,
    tieuDe = p_tieuDe,
    noiDung = p_noiDung,
    tomTat = p_tomTat,
    anhDaiDien = IFNULL(p_anhDaiDien, anhDaiDien),
    tacGia = p_tacGia,
    ghim = IFNULL(p_ghim, 0),
    lu_updated = NOW(),
    lu_user_id = p_lu_user_id
  WHERE tinTucId = p_tinTucId;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateUser`(
   IN p_nguoiDungId VARCHAR(50),
   IN p_dongHoId VARCHAR(50),
   IN p_roleId VARCHAR(50),
   IN p_tenDangNhap VARCHAR(100),
   IN p_matKhau VARCHAR(255),
   IN p_hoTen VARCHAR(255),
   IN p_soDienThoai VARCHAR(20),
   IN p_email VARCHAR(100),
   IN p_gender TINYINT,
   IN p_lu_user_id VARCHAR(50),
   OUT p_error_code INT, 
   OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
         GET DIAGNOSTICS CONDITION 1 
            p_error_code = RETURNED_SQLSTATE, 
            p_error_message = MESSAGE_TEXT;
         ROLLBACK;
    END; 

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;
        UPDATE NguoiDung
        SET
            dongHoId = p_dongHoId,
            roleId = p_roleId,
            tenDangNhap = p_tenDangNhap,
            matKhau = CASE 
                WHEN p_matKhau IS NULL THEN matKhau 
                ELSE p_matKhau 
            END,
            lu_updated = NOW(),
            lu_user_id = p_lu_user_id
        WHERE nguoiDungId = p_nguoiDungId;

        UPDATE user_profile
        SET
            full_name = p_hoTen,
            phone = p_soDienThoai,
            email = COALESCE(p_email, p_tenDangNhap),
            gender = p_gender,
            lu_updated = NOW(),
            lu_user_id = p_lu_user_id
        WHERE userId = p_nguoiDungId;

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateUserFull` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateUserFull`(
   IN p_userId CHAR(36),
   -- Thông tin tài khoản (NguoiDung)
   IN p_tenDangNhap VARCHAR(100),
   IN p_matKhau VARCHAR(255),
   -- Thông tin cá nhân (user_profile)
   IN p_first_name VARCHAR(50),
   IN p_middle_name VARCHAR(50),
   IN p_last_name VARCHAR(50),
   IN p_gender TINYINT,
   IN p_date_of_birthday DATE,
   IN p_avatar VARCHAR(255),
   IN p_email VARCHAR(100),
   IN p_phone VARCHAR(20),
   -- Thông tin quản lý
   IN p_lu_user_id VARCHAR(50),
   OUT p_error_code INT, 
   OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
         GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
         ROLLBACK;
    END; 

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;
        
        -- 1. Cập nhật bảng NguoiDung (Username & Password)
        UPDATE NguoiDung
        SET
            tenDangNhap = p_tenDangNhap,
            matKhau = p_matKhau,
            lu_updated = NOW(),
            lu_user_id = p_lu_user_id
        WHERE nguoiDungId = p_userId;

        -- 2. Cập nhật bảng user_profile (Tất cả thông tin chi tiết)
        UPDATE user_profile
        SET
            first_name = p_first_name,
            middle_name = p_middle_name,
            last_name = p_last_name,
            full_name = TRIM(CONCAT(COALESCE(p_last_name,''), ' ', COALESCE(p_middle_name,''), ' ', COALESCE(p_first_name,''))),
            gender = p_gender,
            date_of_birthday = p_date_of_birthday,
            avatar = p_avatar,
            email = p_email,
            phone = p_phone,
            lu_updated = NOW(),
            lu_user_id = p_lu_user_id
        WHERE userId = p_userId;
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-30 16:42:53
