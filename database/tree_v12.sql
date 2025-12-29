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
-- Table structure for table `danhmuctaichinh`
--

DROP TABLE IF EXISTS `danhmuctaichinh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danhmuctaichinh` (
  `danhMucId` int NOT NULL AUTO_INCREMENT,
  `tenDanhMuc` varchar(255) DEFAULT NULL,
  `moTa` text,
  `active_flag` tinyint DEFAULT NULL,
  `lu_updated` date DEFAULT NULL,
  `lu_user_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`danhMucId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhmuctaichinh`
--

LOCK TABLES `danhmuctaichinh` WRITE;
/*!40000 ALTER TABLE `danhmuctaichinh` DISABLE KEYS */;
INSERT INTO `danhmuctaichinh` VALUES (1,'Đóng góp giỗ tổ','họp liên gia gia đình',1,'2025-12-18',NULL),(2,'Đóng góp quỹ họ','họp liên gia gia đình',1,'2025-12-18',NULL),(3,'Chi giỗ tổ','họp liên gia gia đình',1,'2025-12-18',NULL),(4,'Chi sửa mộ','họp liên gia gia đình',1,'2025-12-18',NULL),(5,'Chi họp họ','họp liên gia gia đình',1,'2025-12-18',NULL);
/*!40000 ALTER TABLE `danhmuctaichinh` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dongho`
--

LOCK TABLES `dongho` WRITE;
/*!40000 ALTER TABLE `dongho` DISABLE KEYS */;
INSERT INTO `dongho` VALUES ('025721a4-bd0d-4447-9b9b-505d174de937','Trần','Hải Dương','2025-12-25','Trần Thanh Tùng','dòng họ gia giáo ',1,'system','2025-12-24 15:59:25','system','2025-12-24 15:59:25'),('e9022e64-cbae-11f0-8020-a8934a9bae74','Dòng họ NHỮ','Hải Dương','2000-01-01','Nguyễn Văn A','Dòng họ lưu trữ thông tin gia phả.',1,'admin','2025-11-27 23:34:14','admin','2025-12-02 11:28:12');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loaiquanhe`
--

LOCK TABLES `loaiquanhe` WRITE;
/*!40000 ALTER TABLE `loaiquanhe` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoidung`
--

LOCK TABLES `nguoidung` WRITE;
/*!40000 ALTER TABLE `nguoidung` DISABLE KEYS */;
INSERT INTO `nguoidung` VALUES ('15e5e9b2-b293-4f18-b0f4-86548bbda3b0','e9022e64-cbae-11f0-8020-a8934a9bae74','0aa1a174-c8ed-11f0-8020-a8934a9bae74','nguyenvanbao123@gmail.com','ee2a39ced74bf7f6aa36bef85067aa9a','2025-12-19 11:22:31',0,1,NULL,'2025-12-19 15:50:27',NULL),('61ef80c1-d2fa-4675-9323-bec58d33ed19','e9022e64-cbae-11f0-8020-a8934a9bae74','0aa1a174-c8ed-11f0-8020-a8934a9bae74','nhubaoanh221@gmail.com','bc9ae919caed0fc37d2db4f70f19c45e','2025-12-22 21:27:02',0,1,'89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-22 21:27:02','89fd6f88-c909-11f0-8020-a8934a9bae74'),('6aa26582-bd12-4fdb-95d8-4e09fdb2f102','e9022e64-cbae-11f0-8020-a8934a9bae74','c2ed095e-c905-11f0-8020-a8934a9bae74','minh123@gmail.com','ddc83bf88c241349a4211172137545e0','2025-12-22 21:16:56',0,1,NULL,'2025-12-22 21:16:56',NULL),('77f83890-6765-4c19-8139-31a29071fac3','e9022e64-cbae-11f0-8020-a8934a9bae74','0aa1a174-c8ed-11f0-8020-a8934a9bae74','baoanh222@gmail.com','3a9df786cd4b24e2ff195aea08e654ea','2025-11-27 23:34:46',0,1,'c2ed095e-c905-11f0-8020-a8934a9bae74','2025-12-02 17:20:04',NULL),('89fd6f88-c909-11f0-8020-a8934a9bae74','e9022e64-cbae-11f0-8020-a8934a9bae74','c2ed095e-c905-11f0-8020-a8934a9bae74','nhubaoanh111@gmail.com','0192023a7bbd73250516f069df18b500','2025-11-24 14:45:25',1,1,'admin','2025-12-03 10:00:08',NULL),('a20a6246-4800-4992-af5c-adcd6e898ee6','e9022e64-cbae-11f0-8020-a8934a9bae74','0aa1a174-c8ed-11f0-8020-a8934a9bae74','minh111@gmail.com','d9d706df20df775493eb3ba05e65c57f','2025-12-19 15:51:04',0,0,NULL,'2025-12-19 22:06:29','system'),('b9b116b0-3d3c-4187-b1a9-fd8247274d64','e9022e64-cbae-11f0-8020-a8934a9bae74','0aa1a174-c8ed-11f0-8020-a8934a9bae74','nguyenvanbao222@gmail.com','014663e57b654fd69a2352969e57e2e6','2025-12-22 21:11:25',0,1,NULL,'2025-12-22 21:11:25',NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quanhe`
--

LOCK TABLES `quanhe` WRITE;
/*!40000 ALTER TABLE `quanhe` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sukien`
--

LOCK TABLES `sukien` WRITE;
/*!40000 ALTER TABLE `sukien` DISABLE KEYS */;
INSERT INTO `sukien` VALUES ('04858a2b-2c82-4186-806d-dd1c9197df4a','e9022e64-cbae-11f0-8020-a8934a9bae74','giỗ bình hoa','2025-12-16','21:52:00','fgfgfggfgf','gdfggdbgdbgdbd',1,1,NULL,'2025-12-18 09:39:27',1,2,NULL),('3080754f-fa0e-4929-9666-d8df6f45b019','e9022e64-cbae-11f0-8020-a8934a9bae74','cưới bảo anh','2025-12-22','20:55:00','Phòng họp B','quý hóa quá đi ',1,1,NULL,'2025-12-22 21:01:39',2,1,'89fd6f88-c909-11f0-8020-a8934a9bae74'),('6c56bc31-19be-4b49-b233-ba4404b7b375','e9022e64-cbae-11f0-8020-a8934a9bae74','giỗ bình hoa','2025-12-18','17:26:00','fgfgfggfgf','svvbvbv',1,1,NULL,'2025-12-17 17:25:29',1,2,NULL),('7cefd591-5d64-4e41-bc8a-26b3a157fc2e','e9022e64-cbae-11f0-8020-a8934a9bae74','giỗ bình hoa','2025-12-19','16:42:00','Phòng họp 2','sfgheweqdii75uygrf',1,1,NULL,'2025-12-19 14:43:38',1,2,NULL),('7ea48f93-4806-4cee-93ea-4a970d261454','e9022e64-cbae-11f0-8020-a8934a9bae74','cưới minh','2025-12-21','16:43:00','Phòng họp B','fghryjytyut',1,1,NULL,'2025-12-19 14:43:15',1,2,NULL),('91abf57f-d584-4570-a927-d0dad9e16839','e9022e64-cbae-11f0-8020-a8934a9bae74','Họp kế hoạch','2025-12-20','09:00:00','Phòng họp Bcb','Họp quý',1,1,'89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-18 15:09:46',2,1,NULL),('9e742b9e-b430-4be1-8621-b7b63bf5efd4','e9022e64-cbae-11f0-8020-a8934a9bae74','cưới minh','2025-12-17','10:32:00','nahf thờ','vff',1,1,NULL,'2025-12-18 09:39:14',2,2,NULL),('afba8a12-2995-4649-981d-7b36f3371a86','e9022e64-cbae-11f0-8020-a8934a9bae74','giỗ bình hoa','2025-12-17','09:06:00','fgfgfggfgf','ccadcacad',1,1,NULL,'2025-12-18 09:39:20',1,2,NULL),('e4602605-12d4-41ba-84e3-e6d794834f4c','e9022e64-cbae-11f0-8020-a8934a9bae74','giỗ bình hoa','2025-12-17','22:08:00','ffdgfg','fgfgf',1,1,NULL,'2025-12-17 21:09:32',1,2,NULL),('SK001','e9022e64-cbae-11f0-8020-a8934a9bae74','Họp gia đình','2025-12-11','18:17:24','Phòng họp 2','Họp gia đình',0,1,NULL,NULL,1,0,NULL),('SK002','e9022e64-cbae-11f0-8020-a8934a9bae74','Giỗ dòng họ','2025-12-11','18:17:47','Công viên trung tâm','Giỗ dòng họ',1,1,NULL,NULL,2,1,NULL),('SK003','e9022e64-cbae-11f0-8020-a8934a9bae74','Mừng năm mới','2025-12-11','18:17:47','Nhà hàng ABC','mừng măn mới',1,1,NULL,NULL,3,2,NULL);
/*!40000 ALTER TABLE `sukien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taichinhchi`
--

DROP TABLE IF EXISTS `taichinhchi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taichinhchi` (
  `chiId` int NOT NULL AUTO_INCREMENT,
  `dongHoId` varchar(50) DEFAULT NULL,
  `danhMucId` int DEFAULT NULL,
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
  PRIMARY KEY (`chiId`),
  KEY `dongHoId` (`dongHoId`),
  KEY `danhMucId` (`danhMucId`),
  KEY `nguoiNhapId` (`nguoiNhapId`),
  CONSTRAINT `taichinhchi_ibfk_1` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`),
  CONSTRAINT `taichinhchi_ibfk_2` FOREIGN KEY (`danhMucId`) REFERENCES `danhmuctaichinh` (`danhMucId`),
  CONSTRAINT `taichinhchi_ibfk_3` FOREIGN KEY (`nguoiNhapId`) REFERENCES `nguoidung` (`nguoiDungId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taichinhchi`
--

LOCK TABLES `taichinhchi` WRITE;
/*!40000 ALTER TABLE `taichinhchi` DISABLE KEYS */;
INSERT INTO `taichinhchi` VALUES (1,'e9022e64-cbae-11f0-8020-a8934a9bae74',3,'2025-12-06',800000.00,'Tiền mặt','Chi tổ chức giỗ tổ','Nhà hàng Hồng Phát',NULL,'2025-12-18 10:53:27','89fd6f88-c909-11f0-8020-a8934a9bae74',1,NULL,NULL),(2,'e9022e64-cbae-11f0-8020-a8934a9bae74',4,'2025-12-07',1200000.00,'Chuyển khoản','Chi sửa mộ tổ','Thợ xây Nguyễn Văn A',NULL,'2025-12-18 10:53:27','89fd6f88-c909-11f0-8020-a8934a9bae74',1,NULL,NULL),(3,'e9022e64-cbae-11f0-8020-a8934a9bae74',5,'2025-12-08',500000.00,'Tiền mặt','Chi họp họ cuối năm','Nhà văn hóa thôn',NULL,'2025-12-18 10:53:27','89fd6f88-c909-11f0-8020-a8934a9bae74',1,NULL,NULL),(4,'e9022e64-cbae-11f0-8020-a8934a9bae74',3,'2025-12-09',300000.00,'Tiền mặt','Mua đồ lễ giỗ tổ','Cửa hàng đồ lễ',NULL,'2025-12-18 10:53:27','89fd6f88-c909-11f0-8020-a8934a9bae74',1,NULL,NULL),(5,'e9022e64-cbae-11f0-8020-a8934a9bae74',5,'2025-12-10',400000.00,'Chuyển khoản','Chi nước uống họp họ','Tạp hóa Minh Anh',NULL,'2025-12-18 10:53:27','89fd6f88-c909-11f0-8020-a8934a9bae74',1,NULL,NULL),(6,'e9022e64-cbae-11f0-8020-a8934a9bae74',3,'2025-12-22',9990000.00,'chuyen_khoan','Chi mua vật tư abc ăn thật nhiều','Cửa hàng xây dựng Abc','Có hóa đơn','2025-12-22 19:32:12','89fd6f88-c909-11f0-8020-a8934a9bae74',1,'2025-12-24 00:00:00','89fd6f88-c909-11f0-8020-a8934a9bae74'),(7,'e9022e64-cbae-11f0-8020-a8934a9bae74',2,'2025-12-25',3000000.00,'chuyen_khoan','đóng lấy tiền đẹp nha','Tạp hóa ngân vũ','đóng laauys tiền','2025-12-24 14:43:11','89fd6f88-c909-11f0-8020-a8934a9bae74',1,'2025-12-24 00:00:00','89fd6f88-c909-11f0-8020-a8934a9bae74');
/*!40000 ALTER TABLE `taichinhchi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taichinhthu`
--

DROP TABLE IF EXISTS `taichinhthu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taichinhthu` (
  `thuId` int NOT NULL AUTO_INCREMENT,
  `dongHoId` varchar(50) DEFAULT NULL,
  `danhMucId` int DEFAULT NULL,
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
  PRIMARY KEY (`thuId`),
  KEY `nguoiNhapId` (`nguoiNhapId`),
  KEY `taichinhthu_ibfk_1` (`dongHoId`),
  KEY `taichinhthu_ibfk_2` (`danhMucId`),
  CONSTRAINT `taichinhthu_ibfk_1` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`),
  CONSTRAINT `taichinhthu_ibfk_2` FOREIGN KEY (`danhMucId`) REFERENCES `danhmuctaichinh` (`danhMucId`),
  CONSTRAINT `taichinhthu_ibfk_3` FOREIGN KEY (`nguoiNhapId`) REFERENCES `nguoidung` (`nguoiDungId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taichinhthu`
--

LOCK TABLES `taichinhthu` WRITE;
/*!40000 ALTER TABLE `taichinhthu` DISABLE KEYS */;
INSERT INTO `taichinhthu` VALUES (1,'e9022e64-cbae-11f0-8020-a8934a9bae74',1,'Nguyễn Văn Sơn','2025-12-01',100000.00,'Tiền mặt','Đóng góp giỗ tổ','2025-12-18 10:51:55','89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-18 10:51:55',1,NULL,NULL),(2,'e9022e64-cbae-11f0-8020-a8934a9bae74',1,'Nhữ Bảo Anh','2025-12-02',200000.00,'Chuyển khoản','Đóng góp giỗ tổ','2025-12-18 10:51:55','89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-18 10:51:55',1,NULL,NULL),(3,'e9022e64-cbae-11f0-8020-a8934a9bae74',2,'Hoàng Văn Bình','2025-12-03',300000.00,'Tiền mặt','Đóng quỹ họ','2025-12-18 10:51:55','89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-18 10:51:55',1,NULL,NULL),(4,'e9022e64-cbae-11f0-8020-a8934a9bae74',2,'Nguyễn Thị Hoa','2025-12-04',150000.00,'Chuyển khoản','Đóng quỹ họ','2025-12-18 10:51:55','89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-18 10:51:55',1,NULL,NULL),(5,'e9022e64-cbae-11f0-8020-a8934a9bae74',1,'Nhữ Văn Hùng','2025-12-05',500000.00,'Tiền mặt','Ủng hộ thêm cho giỗ tổ','2025-12-18 10:51:55','89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-18 10:51:55',1,NULL,NULL),(8,'e9022e64-cbae-11f0-8020-a8934a9bae74',2,'Nguyễn Văn Anh đẹp zai','2025-12-22',9900000.00,'Chuyển khoản','Thu tiền vệ sinh ngày tết lễ','Đã thu đủ','89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-22 19:26:39',1,'2025-12-22 00:00:00',NULL),(9,'e9022e64-cbae-11f0-8020-a8934a9bae74',1,'Nhữ Văn Hùng','2025-12-23',300000.00,'chuyen_khoan','đóng góp xây nha thok','cố lên anh em ơi','89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-22 19:48:28',1,'2025-12-24 00:00:00','89fd6f88-c909-11f0-8020-a8934a9bae74'),(10,'e9022e64-cbae-11f0-8020-a8934a9bae74',1,'Hoàng Văn Bình','2025-12-25',4000000.00,'chuyen_khoan','nhớ đóng tiền sớm đó','ưgrgrgrgrgr','89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-24 14:12:04',1,'2025-12-24 00:00:00','89fd6f88-c909-11f0-8020-a8934a9bae74');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tailieu`
--

LOCK TABLES `tailieu` WRITE;
/*!40000 ALTER TABLE `tailieu` DISABLE KEYS */;
INSERT INTO `tailieu` VALUES ('c3fa16f6-853a-44ce-8edd-c5f65b52c63e','e9022e64-cbae-11f0-8020-a8934a9bae74','Cúng tổ họ',NULL,'đây là là một trong những trtuyeenf thống tốt đẹp của ông cha ta ','Văn bản cổ',1930,'Nhữ Bảo Anh','tại nhà thờ','yêu nước','2025-12-29',1,NULL,'2025-12-29 16:45:15',NULL),('TL001','e9022e64-cbae-11f0-8020-a8934a9bae74','Gia phả dòng họ - Bản gốc',NULL,'Gia phả ghi chép từ đời thứ nhất đến đời thứ 5 của dòng họ. Bản viết tay bằng chữ Hán Nôm, được lưu giữ cẩn thận qua nhiều thế hệ.','Gia phả',1920,'Cụ tổ đời thứ 5','Lưu trữ tại nhà thờ họ',NULL,'2025-12-29',1,NULL,NULL,NULL),('TL002','e9022e64-cbae-11f0-8020-a8934a9bae74','Sắc phong triều Nguyễn',NULL,'Sắc phong của vua Tự Đức ban cho cụ tổ năm 1865, ghi nhận công lao đóng góp cho triều đình.','Sắc phong',1865,'Triều đình nhà Nguyễn','Lưu trữ tại bảo tàng tỉnh',NULL,'2025-12-29',1,NULL,NULL,NULL),('TL003','e9022e64-cbae-11f0-8020-a8934a9bae74','Hình ảnh nhà thờ họ xưa',NULL,'Bộ ảnh chụp nhà thờ họ từ năm 1950, ghi lại kiến trúc cổ trước khi được tu bổ.','Hình ảnh',1950,'Không rõ','Sưu tầm từ gia đình',NULL,'2025-12-29',1,NULL,NULL,NULL),('TL004','e9022e64-cbae-11f0-8020-a8934a9bae74','Văn tế tổ tiên',NULL,'Bài văn tế được đọc trong các dịp giỗ tổ, lễ tết. Nội dung ca ngợi công đức tổ tiên.','Văn bản cổ',1900,'Cụ tổ đời thứ 4','Truyền khẩu trong dòng họ',NULL,'2025-12-29',1,NULL,NULL,NULL),('TL005','e9022e64-cbae-11f0-8020-a8934a9bae74','Gia phả bổ sung - Đời 6 đến 10',NULL,'Phần bổ sung gia phả, ghi chép các đời từ thứ 6 đến thứ 10 của dòng họ.','Gia phả',1980,'Ông Nguyễn Văn B','Biên soạn mới',NULL,'2025-12-29',1,NULL,NULL,NULL),('TL006','e9022e64-cbae-11f0-8020-a8934a9bae74','Hình ảnh lễ giỗ tổ 2020',NULL,'Bộ ảnh ghi lại lễ giỗ tổ năm 2020 với sự tham gia của hơn 200 con cháu.','Hình ảnh',2020,'Ban tổ chức','Chụp tại lễ giỗ tổ',NULL,'2025-12-29',1,NULL,NULL,NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thanhvien`
--

LOCK TABLES `thanhvien` WRITE;
/*!40000 ALTER TABLE `thanhvien` DISABLE KEYS */;
INSERT INTO `thanhvien` VALUES (1,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Đức Tính',1,'1950-01-01','2020-01-01','Hà Nội','Hà Nội','Nông dân','Cấp 3','Hà Nội, Việt Nam','Người sáng lập dòng họ',NULL,1,NULL,NULL,2,NULL,'2025-12-24 17:27:41',1,'1','2025-12-24 17:27:41','1'),(2,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị B',0,'1955-01-01',NULL,'Hải Dương','','Nội trợ','Cấp 2','Hà Nội, Việt Nam','',NULL,1,NULL,NULL,NULL,1,'2025-12-24 17:27:41',1,'1','2025-12-24 17:27:41','1'),(3,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị B',0,'1987-01-01',NULL,'Hải Dương','','','cấp 3','Hà Nội, Việt Nam','',NULL,2,1,2,NULL,NULL,'2025-12-24 17:27:41',1,'1','2025-12-24 17:27:41','1'),(4,'025721a4-bd0d-4447-9b9b-505d174de937','Trần Thị B',0,NULL,NULL,'','','','','','',NULL,2,1,2,NULL,NULL,'2025-12-24 17:27:41',1,'1','2025-12-24 17:27:41','1'),(1,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Phúc Lợi',1,NULL,'1989-12-02','Hà Nội','','','','Hà Nội, Việt Nam','Nông dân',NULL,1,NULL,NULL,2,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(2,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Hiệu Diệu Lâm',0,NULL,'1989-12-02','Hà Nội','','','','Hà Nội, Việt Nam','Nông dân',NULL,1,NULL,NULL,NULL,1,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(3,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Cõi',1,NULL,'1989-12-02','Hà Nội','','','','Hà Nội, Việt Nam','',NULL,2,1,2,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(4,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Lọ',0,NULL,'1989-12-02','Hà Nội','','','','Hà Nội, Việt Nam','',NULL,2,1,2,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(5,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chúc',0,NULL,'1989-12-02','Hà Nội','','','','Hà Nội, Việt Nam','',NULL,2,1,2,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(6,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Giới',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,3,3,NULL,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(7,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Nghãi',0,NULL,'1989-12-02','Hà Nội','','','','Hà Nội, Việt Nam','',NULL,3,NULL,NULL,NULL,6,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(8,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Lai',0,NULL,'1989-12-02','Hà Nội','','','','Hà Nội, Việt Nam','',NULL,3,NULL,NULL,NULL,6,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(9,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tráng',0,NULL,'1999-03-10','Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(10,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Diện',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(11,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Dối',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(12,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tý',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,13,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(13,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Liễn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(14,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hiệu',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,13,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(15,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Chóe',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(16,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tích',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,15,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(17,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Cốc',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,18,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(18,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Cận',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(19,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thuổi',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,18,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(20,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Thoa',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,21,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(21,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hồng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(22,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Năm',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,21,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(23,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Lãi',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,6,8,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(24,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Đài',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,23,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(25,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Diễn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(26,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Diên',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(27,'e9022e64-cbae-11f0-8020-a8934a9bae74','Lê Thị Thuận',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,26,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(28,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Huống',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(29,'e9022e64-cbae-11f0-8020-a8934a9bae74','Phạn Thị Đệ',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,28,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(30,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Chày',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(31,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thu',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(32,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Oánh',0,'2002-01-01',NULL,'Hà Nội','','','','Hà Nội, Việt Nam','CEO',NULL,5,13,12,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(33,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thụ',0,'2023-01-01',NULL,'Hà Nội','','','','Hà Nội, Việt Nam','student',NULL,5,13,12,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(34,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Đồng',1,NULL,'2006-02-24','Hà Nội','','','','Hà Nội, Việt Nam','gg',NULL,5,13,14,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(35,'e9022e64-cbae-11f0-8020-a8934a9bae74','Dương Thị Miên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,34,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(36,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Túy',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,13,14,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(37,'e9022e64-cbae-11f0-8020-a8934a9bae74','Dương Thị Diện',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,36,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(38,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thôn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,15,16,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(39,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Định',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,38,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(40,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Cấn',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(41,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Nguyệt',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(42,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Vinh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(43,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thi',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(44,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Dự',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(45,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chục',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(46,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Phi',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(47,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Loan',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,46,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(48,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Điệp',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(49,'e9022e64-cbae-11f0-8020-a8934a9bae74','Cao Thị Hưng',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,50,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(50,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Phong',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(51,'e9022e64-cbae-11f0-8020-a8934a9bae74','Đoàn Thị Quyên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,50,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(52,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Cảnh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(53,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Hà',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,52,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(54,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Đô',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(55,'e9022e64-cbae-11f0-8020-a8934a9bae74','Đào Thị Thi',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,56,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(56,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Vượng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(57,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thỏa',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,56,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(58,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thông',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(59,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Nhật',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,58,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(60,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Đề',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(61,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Liên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,60,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(62,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Nhàn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(63,'e9022e64-cbae-11f0-8020-a8934a9bae74','Lê Thị Lương',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,62,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(64,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Điểm',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(65,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Nga',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(66,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thư',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(67,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Lư',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(68,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Sang',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(69,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Chín',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,22,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(70,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị A',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,69,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(71,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Mười',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,22,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(72,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Viện',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,71,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(73,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Bãi',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(74,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị La',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,73,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(75,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Cài',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(76,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hiền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(77,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Liền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(78,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hoà',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(79,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Mùi',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(80,'e9022e64-cbae-11f0-8020-a8934a9bae74','Đỗ Thị Mùi',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,79,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(81,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Kỷ',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(82,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Quý',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(83,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tước',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,82,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(84,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tỵ',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(85,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Điền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(86,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Bính',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(87,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tiền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,86,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(88,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Binh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(89,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thảo',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,88,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(90,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chung',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(91,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chiên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(92,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Kiên',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(93,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Liên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,92,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(94,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thủy',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(95,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hợp',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(96,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hạt',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(97,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Đông',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(98,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Phương',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(99,'e9022e64-cbae-11f0-8020-a8934a9bae74','Xin Thị Dung',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,98,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(100,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Chí',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(101,'e9022e64-cbae-11f0-8020-a8934a9bae74','Đào Thị Hồng',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,100,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(102,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hà',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(103,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hài',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(104,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hưng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(105,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Thảo',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,104,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(106,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Tuy',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(107,'e9022e64-cbae-11f0-8020-a8934a9bae74','Dương Thị Lê',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,106,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(108,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Tuyến',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(109,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hằng',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(110,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Duyên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(111,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Toàn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(112,'e9022e64-cbae-11f0-8020-a8934a9bae74','Đỗ Thị Xuân',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,111,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(113,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Dung',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(114,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Toán',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(115,'e9022e64-cbae-11f0-8020-a8934a9bae74','Lê Thị Tính',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,114,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(116,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Đoài',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,38,39,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(117,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thơ',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,38,39,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(118,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Phương',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,117,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(119,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thêm',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,38,39,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(120,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thành',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,119,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(121,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Phòng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,46,47,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(122,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị An',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,121,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(123,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Phúc',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,46,47,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(124,'e9022e64-cbae-11f0-8020-a8934a9bae74','Phạm Thu Hà',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,123,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(125,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thắm',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,46,47,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(126,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hải',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,50,49,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(127,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Quang',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,50,49,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(128,'e9022e64-cbae-11f0-8020-a8934a9bae74','Hoàng Thị Hiền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,127,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(129,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Mạnh Quỳnh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,50,51,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(130,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thủy',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,52,53,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(131,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Duy',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,52,53,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(132,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thu Huyền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,131,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(133,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Quân',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,52,53,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(134,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thơ',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(135,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Nghi',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(136,'e9022e64-cbae-11f0-8020-a8934a9bae74','Phan Thị Nghĩa',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,135,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(137,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thảo',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(138,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Tuyên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,137,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(139,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Chung',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(140,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Thúy',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,139,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(141,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Vấn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(142,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Dàng',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,141,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(143,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Vận',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(144,'e9022e64-cbae-11f0-8020-a8934a9bae74','Hương',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,143,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(145,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Vần',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(146,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Xuân',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(147,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thịnh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,57,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(148,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trương Thị Năm',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,147,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(149,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thu',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,57,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(150,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Bình',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,57,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(151,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thìn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(152,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Nghị',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,151,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(153,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thiết',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(154,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hường',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,153,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(155,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thanh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(156,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Khương',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,155,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(157,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thạo',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(158,'e9022e64-cbae-11f0-8020-a8934a9bae74','Hảo',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,157,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(159,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thiện',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(160,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Ánh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,159,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(161,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thái',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(162,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Vân',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(163,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thật',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(164,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Đạt',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,60,61,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(165,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Tuấn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,62,63,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(166,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Luận',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,165,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(167,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Tùng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,62,63,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(168,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Bích Phương',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,167,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(169,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Tuân',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,62,63,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(170,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chiến',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(171,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chiên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(172,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thu Hằng',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(173,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hoàn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(174,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Vân',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,173,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(175,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thùy Vân',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,71,72,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(176,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Anh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,71,72,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(177,'e9022e64-cbae-11f0-8020-a8934a9bae74','Bùi Thị Hồng Hạnh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,176,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(178,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Mai',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(179,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Xuyên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(180,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Xuân',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(181,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hương',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(182,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Trường',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(183,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Vui',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,182,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(184,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Bình',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,79,80,185,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(185,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hoa',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,184,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(186,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hoa',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,79,80,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(187,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Huệ',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,79,80,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(188,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Quí Mạnh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,79,80,189,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(189,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Duyên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,188,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(190,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Quang Minh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,79,80,191,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(191,'e9022e64-cbae-11f0-8020-a8934a9bae74','Vũ Thị Thoa',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,190,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(192,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tơ',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(193,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tuyến',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(194,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Trâm',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(195,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tình',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(196,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Linh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(197,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thành Công',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,86,87,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(198,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Lan Anh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,86,87,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(199,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Huy',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,86,87,200,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(200,'e9022e64-cbae-11f0-8020-a8934a9bae74','Bùi Thị Ngọc Hà',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,199,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(201,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Bảo',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,88,89,202,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(202,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Ngọc Huyền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,201,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(203,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chi',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,88,89,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(204,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hạnh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,92,93,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(205,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hiệp',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,92,93,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(206,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hội',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,92,93,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(207,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hưởng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,92,93,208,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(208,'e9022e64-cbae-11f0-8020-a8934a9bae74','Hoàng Thị Thu An',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,207,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(209,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Phường',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,98,99,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(210,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Dũng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,98,99,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(211,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Công',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,100,101,212,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(212,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Khánh Ly',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,211,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(213,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Trường',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,100,101,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(214,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Bảo Anh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,100,101,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(215,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hiền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,104,105,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(216,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Mai',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,104,105,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(217,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn An',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,104,105,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(218,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thắng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,106,107,219,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(219,'e9022e64-cbae-11f0-8020-a8934a9bae74','Lê Thị Ánh Ngọc',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,218,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(220,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thắm',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,106,107,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(221,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Toản',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,111,112,222,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(222,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Trang',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,221,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(223,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Tuấn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,111,112,224,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(224,'e9022e64-cbae-11f0-8020-a8934a9bae74','Đặng Thị Thu',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,223,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(225,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thế Giỏi',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,114,115,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(226,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Gia Hân',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,114,115,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(227,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hào',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,117,118,228,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(228,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Hằng',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,227,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(229,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hằng',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,117,118,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(230,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hải',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,117,118,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(231,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hoa',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,119,120,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(232,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Sở',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,119,120,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(233,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Khoa',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,119,120,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(234,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Anh Tấn ',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,121,122,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(235,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Anh Toán',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,121,122,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(236,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Huy',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,123,124,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(237,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hưng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,123,124,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(238,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Nam Dương',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,127,128,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(239,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Duy Bách',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,131,132,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(240,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Nam',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,135,136,241,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(241,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Luyến',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,240,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(242,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Bắc',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,135,136,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(243,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Tân',1,NULL,NULL,'','','','','','',NULL,7,137,138,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(244,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hiền',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,137,138,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(245,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hòa',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,137,138,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(246,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Ba',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,139,140,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(247,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Đức',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,139,140,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(248,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Loan',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,139,140,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(249,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Duyên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,141,142,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(250,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Mạnh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,141,142,251,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(251,'e9022e64-cbae-11f0-8020-a8934a9bae74','Phan Thị Hường',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,250,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(252,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Vũ',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,141,142,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(253,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Giang',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,143,144,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(254,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Sơn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,143,144,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(255,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Vui',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,143,144,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(256,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hà Phương',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,147,148,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(257,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Phương Anh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,147,148,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(258,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Quyết',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,151,152,259,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(259,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Huyền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,258,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(260,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Mạnh Chiến',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,151,152,261,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(261,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Hải Yến',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,260,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(262,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tâm',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,151,152,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(263,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Mạnh Thắng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,153,154,264,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(264,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hằng',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,263,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(265,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Thành',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,153,154,266,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(266,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hiền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,265,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(267,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Thịnh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,153,154,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(268,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thu',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,155,156,269,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(269,'e9022e64-cbae-11f0-8020-a8934a9bae74','Linh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,268,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(270,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Giang',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,155,156,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(271,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Kim Loan',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,157,158,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(272,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Long',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,157,158,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(273,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Việt Trường',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,159,160,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(274,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Bảo',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,159,160,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(275,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Trọng Tấn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,165,166,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(276,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Minh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,165,166,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(277,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thu Trang',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,165,166,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(278,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Mạnh Hùng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,167,168,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(279,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Phương Anh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,167,168,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(280,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thảo Linh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,173,174,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(281,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Minh Dương',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,173,174,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(282,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Minh Quân',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,173,174,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(283,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Tuệ Minh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,176,177,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(284,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Sơn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,176,177,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(285,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Hiếu',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,182,183,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(286,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Sơn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,182,183,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(287,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thanh Liêm',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,184,185,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(288,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thủy',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,NULL,NULL,NULL,286,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(289,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thành Lộ',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,184,185,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(290,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Ngọc',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,188,189,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(291,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Anh Vũ',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,188,189,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(292,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Băng',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,190,191,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(293,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Trà',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,190,191,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(294,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn An',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,190,191,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(295,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Hải',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,207,208,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(296,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thúy Hường',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,218,219,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(297,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thế Thành',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,218,219,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(298,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Linh Nhi',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,221,222,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(299,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Lan Hương',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,221,222,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(300,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Long',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,223,224,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(301,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Hửa Khang',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,223,224,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(302,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Huy',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,227,228,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(303,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Thúy Nga',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,227,228,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(304,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Lan Phương',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,240,241,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(305,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Võ',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,240,241,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(306,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Minh Nguyệt',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,258,259,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(307,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Tuấn Kiệt',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,258,259,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(308,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Tài',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,258,259,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(309,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Nam Khánh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,260,261,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(310,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Minh Khuê',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,260,261,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(311,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Ban Mai',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,263,264,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(312,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Khánh Ngọc',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,263,264,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(313,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Hiếu',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,263,264,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(314,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Trúc Quỳnh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,265,266,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(315,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Huy',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,265,266,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1'),(316,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Hưng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,265,266,NULL,NULL,'2025-12-24 17:25:16',1,'1','2025-12-24 17:25:16','1');
/*!40000 ALTER TABLE `thanhvien` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tintuc`
--

LOCK TABLES `tintuc` WRITE;
/*!40000 ALTER TABLE `tintuc` DISABLE KEYS */;
INSERT INTO `tintuc` VALUES ('TT001','e9022e64-cbae-11f0-8020-a8934a9bae74','Thông báo họp họ cuối năm 2025','Kính mời toàn thể bà con trong dòng họ tham dự buổi họp họ cuối năm 2025. Thời gian: 10h ngày 28/12/2025. Địa điểm: Nhà thờ họ. Nội dung: Tổng kết hoạt động năm 2025, kế hoạch năm 2026, trao học bổng cho con cháu học giỏi.','Thông báo họp họ cuối năm 2025 tại nhà thờ họ',NULL,'Ban quản lý dòng họ','2025-12-29 16:02:10',0,1,1,NULL,NULL,NULL),('TT002','e9022e64-cbae-11f0-8020-a8934a9bae74','Chúc mừng cháu Nguyễn Văn A đỗ đại học','Dòng họ xin chúc mừng cháu Nguyễn Văn A đã xuất sắc đỗ vào trường Đại học Bách Khoa Hà Nội năm 2025 với số điểm cao. Đây là niềm tự hào của cả dòng họ.','Chúc mừng thành viên đỗ đại học',NULL,'Ban quản lý dòng họ','2025-12-24 16:02:10',0,0,1,NULL,NULL,NULL),('TT003','e9022e64-cbae-11f0-8020-a8934a9bae74','Lễ giỗ tổ Hùng Vương năm 2025','Thông báo lịch tổ chức lễ giỗ tổ Hùng Vương năm 2025. Thời gian: Mùng 10 tháng 3 âm lịch. Địa điểm: Đền thờ họ. Mong bà con sắp xếp thời gian tham dự.','Lễ giỗ tổ Hùng Vương năm 2025',NULL,'Ban tổ chức','2025-12-19 16:02:10',0,1,1,NULL,NULL,NULL),('TT004','e9022e64-cbae-11f0-8020-a8934a9bae74','Kế hoạch tu bổ nhà thờ họ','Ban quản lý dòng họ thông báo kế hoạch tu bổ, nâng cấp nhà thờ họ trong năm 2025. Dự kiến kinh phí: 500 triệu đồng. Kêu gọi bà con đóng góp.','Kế hoạch tu bổ nhà thờ họ năm 2025',NULL,'Ban quản lý','2025-12-14 16:02:10',0,0,1,NULL,NULL,NULL),('TT005','e9022e64-cbae-11f0-8020-a8934a9bae74','Hỗ trợ học bổng cho con cháu','Dòng họ triển khai chương trình học bổng hỗ trợ con cháu có hoàn cảnh khó khăn học giỏi. Mức hỗ trợ: 2-5 triệu đồng/năm học.','Chương trình học bổng dòng họ',NULL,'Ban khuyến học','2025-12-09 16:02:10',0,0,1,NULL,NULL,NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` VALUES ('15e5e9b2-b293-4f18-b0f4-86548bbda3b0',NULL,NULL,NULL,'Nhữ Hoàng Sơn bính đẹp zai ',NULL,NULL,NULL,'nguyenvanbao123@gmail.com','0966469703',1,NULL,'2025-12-19 11:22:31','2025-12-19 15:50:27',NULL),('61ef80c1-d2fa-4675-9323-bec58d33ed19',NULL,NULL,NULL,'Nhữ Hoàng Ka',NULL,NULL,NULL,'nhubaoanh221@gmail.com','0987654321',1,'89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-22 21:27:02','2025-12-22 21:27:02','89fd6f88-c909-11f0-8020-a8934a9bae74'),('6aa26582-bd12-4fdb-95d8-4e09fdb2f102',NULL,NULL,NULL,'Ngyễn Văn Hiếu',NULL,NULL,NULL,'minh123@gmail.com','0966469703',1,NULL,'2025-12-22 21:16:56','2025-12-22 21:16:56',NULL),('77f83890-6765-4c19-8139-31a29071fac3','Sơn','Hoàng','Nguyễn','Nguyễn Hoàng Sơn',NULL,1,'2004-10-30','nhubaoanh111@gmail.com','0987654321',1,NULL,'2025-12-19 10:50:19',NULL,NULL),('89fd6f88-c909-11f0-8020-a8934a9bae74','Anh','Bảo','Nhữ','Nhữ Bảo Anh',NULL,1,'2004-10-30','nhubaoanh111@gmail.com','0987654321',1,NULL,'2025-12-19 10:49:26',NULL,NULL),('a20a6246-4800-4992-af5c-adcd6e898ee6','Anh','Bảo ','Nhữ','Nhữ Bảo  Anh','uploads/2025/12/19/H22-146122795.jpg',1,'2004-10-30','minh111@gmail.com','0966469703',1,NULL,'2025-12-19 15:51:04','2025-12-19 22:06:18',NULL),('b9b116b0-3d3c-4187-b1a9-fd8247274d64',NULL,NULL,NULL,'Nhữ Bảo Bảo',NULL,NULL,NULL,'nguyenvanbao222@gmail.com','0987654321',1,NULL,'2025-12-22 21:11:25','2025-12-22 21:11:25',NULL);
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'treefamily'
--
/*!50003 DROP PROCEDURE IF EXISTS `checkUsernameExist` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 DROP PROCEDURE IF EXISTS `DeleteDanhMucTaiChinh` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DeleteDanhMucTaiChinh`(
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
	SELECT JSON_VALUE(p.value, '$.danhMucId') AS danhMucId
		FROM JSON_TABLE(p_json_list, '$[*]' COLUMNS (
			value JSON PATH '$'
		)) AS p;

    UPDATE DanhMucTaiChinh
    SET active_flag = 0,
		lu_updated = now(),
        lu_user_id = p_lu_user_id
    WHERE danhMucId in  (
    	select f2.danhMucId
    	from Results f2
    );
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DeleteRole`(
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
	SELECT JSON_VALUE(p.value, '$.roleId') AS roleId
		FROM JSON_TABLE(p_json_list, '$[*]' COLUMNS (
			value JSON PATH '$'
		)) AS p;

    UPDATE Role
    SET active_flag = 0,
		lu_updated = now(),
        lu_user_id = p_lu_user_id
    WHERE roleId in  (
    	select f2.roleId
    	from Results f2
    );
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DeleteSuKien`(
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
	SELECT JSON_VALUE(p.value, '$.suKienId') AS suKienId
		FROM JSON_TABLE(p_json_list, '$[*]' COLUMNS (
			value JSON PATH '$'
		)) AS p;

    UPDATE Role
    SET active_flag = 0,
		lu_updated = now(),
        lu_user_id = p_lu_user_id
    WHERE suKienId in  (
    	select f2.suKienId
    	from Results f2
    );
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DeleteTaiChinhChi`(
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
	SELECT JSON_VALUE(p.value, '$.chiId') AS chiId
		FROM JSON_TABLE(p_json_list, '$[*]' COLUMNS (
			value JSON PATH '$'
		)) AS p;

    UPDATE TaiChinhChi
    SET active_flag = 0,
		lu_updated = now(),
        lu_user_id = p_lu_user_id
    WHERE chiId in  (
    	select f2.chiId
    	from Results f2
    );
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DeleteTaiChinhThu`(
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
	SELECT JSON_VALUE(p.value, '$.thuId') AS thuId
		FROM JSON_TABLE(p_json_list, '$[*]' COLUMNS (
			value JSON PATH '$'
		)) AS p;

    UPDATE TaiChinhThu
    SET active_flag = 0,
		lu_updated = now(),
        lu_user_id = p_lu_user_id
    WHERE thuId in  (
    	select f2.thuId
    	from Results f2
    );
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DeleteTaiLieu`(
  IN p_taiLieuId VARCHAR(50),
  IN p_lu_user_id VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  UPDATE tailieu SET
    active_flag = 0,
    lu_updated = NOW(),
    lu_user_id = p_lu_user_id
  WHERE taiLieuId = p_taiLieuId;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DeleteTinTuc`(
  IN p_tinTucId VARCHAR(50),
  IN p_lu_user_id VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  UPDATE tintuc SET
    active_flag = 0,
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
/*!50003 DROP PROCEDURE IF EXISTS `DeleteUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetActionByUserId`(
    IN p_userId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET p_error_code = -1;
        SET p_error_message = 'Lỗi khi truy vấn quyền hành động của người dùng';
    END;

    SET p_error_code = 0;
    SET p_error_message = '';
    SET SESSION group_concat_max_len = 10000000;

    SELECT ac.action_code,
           ac.action_api_url,
           ac.action_name,
           ac.functionId
    FROM NguoiDung u
    JOIN RoleFunctions rf ON u.roleId = rf.roleId
    JOIN Action ac ON rf.functionId = ac.functionId
    WHERE u.nguoiDungId = p_userId
      AND ac.active_flag = 1
      AND rf.active_flag = 1;

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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 DROP PROCEDURE IF EXISTS `GetChiGanDay` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetFunctionsByUserId`(
    IN p_userId VARCHAR(50),
    OUT p_error_code int,
    OUT p_error_message varchar(500)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
   BEGIN
		GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
	END;
    SET p_error_code = 0;
  SET p_error_message = '';
  SET SESSION group_concat_max_len = 10000000;
    SELECT f.*
    FROM NguoiDung u
    JOIN RoleFunctions rf ON u.roleId = rf.roleId
    JOIN Functions f ON rf.functionId = f.functionId
    WHERE u.nguoiDungId = p_userId
      AND f.active_flag = 1
      AND rf.active_flag = 1;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 DROP PROCEDURE IF EXISTS `GetNextThanhVienId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 DROP PROCEDURE IF EXISTS `GetSuKienSapToi` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 DROP PROCEDURE IF EXISTS `ImportThanhVienFromJson` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `ImportThanhVienFromJsonComposite`(
    IN p_jsonData JSON,
    IN p_dongHoId VARCHAR(50),
    IN p_nguoiTaoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_count INT DEFAULT 0;
    DECLARE v_maxId INT DEFAULT 0;
    
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

    -- Lấy max ID hiện tại của dòng họ
    SELECT COALESCE(MAX(thanhVienId), 0) INTO v_maxId
    FROM thanhvien
    WHERE dongHoId = p_dongHoId
    FOR UPDATE;

    -- Tạo bảng tạm để xử lý JSON
    DROP TEMPORARY TABLE IF EXISTS tmp_import;
    CREATE TEMPORARY TABLE tmp_import (
        stt INT,
        hoTen VARCHAR(255),
        gioiTinh TINYINT,
        ngaySinh DATE,
        ngayMat DATE,
        noiSinh VARCHAR(255),
        noiMat VARCHAR(255),
        ngheNghiep VARCHAR(255),
        trinhDoHocVan VARCHAR(255),
        diaChiHienTai VARCHAR(255),
        tieuSu TEXT,
        doiThuoc INT,
        chaId INT,
        meId INT,
        voId INT,
        chongId INT
    );

    -- Parse JSON vào bảng tạm
    INSERT INTO tmp_import (stt, hoTen, gioiTinh, ngaySinh, ngayMat, noiSinh, noiMat, 
                            ngheNghiep, trinhDoHocVan, diaChiHienTai, tieuSu, doiThuoc,
                            chaId, meId, voId, chongId)
    SELECT 
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.stt')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.hoTen')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.gioiTinh')),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.ngaySinh')), 'null'),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.ngayMat')), 'null'),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.noiSinh')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.noiMat')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.ngheNghiep')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.trinhDoHocVan')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.diaChiHienTai')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.tieuSu')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.doiThuoc')),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.chaId')), 'null'),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.meId')), 'null'),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.voId')), 'null'),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.chongId')), 'null')
    FROM JSON_TABLE(p_jsonData, '$[*]' COLUMNS (value JSON PATH '$')) AS j;

    -- Insert vào bảng chính
    -- thanhVienId = v_maxId + stt (để STT trong Excel = ID trong DB)
    INSERT INTO thanhvien (
        thanhVienId, dongHoId, hoTen, gioiTinh, ngaySinh, ngayMat,
        noiSinh, noiMat, ngheNghiep, trinhDoHocVan, diaChiHienTai,
        tieuSu, doiThuoc, chaId, meId, voId, chongId,
        ngayTao, active_flag, nguoiTaoId, lu_updated, lu_user_id
    )
    SELECT 
        v_maxId + stt,  -- ID mới = max hiện tại + STT
        p_dongHoId,
        hoTen,
        gioiTinh,
        ngaySinh,
        ngayMat,
        noiSinh,
        noiMat,
        ngheNghiep,
        trinhDoHocVan,
        diaChiHienTai,
        tieuSu,
        doiThuoc,
        CASE WHEN chaId IS NOT NULL THEN v_maxId + chaId ELSE NULL END,  -- Chuyển đổi ID cha
        CASE WHEN meId IS NOT NULL THEN v_maxId + meId ELSE NULL END,    -- Chuyển đổi ID mẹ
        CASE WHEN voId IS NOT NULL THEN v_maxId + voId ELSE NULL END,    -- Chuyển đổi ID vợ
        CASE WHEN chongId IS NOT NULL THEN v_maxId + chongId ELSE NULL END, -- Chuyển đổi ID chồng
        NOW(),
        1,
        p_nguoiTaoId,
        NOW(),
        p_nguoiTaoId
    FROM tmp_import
    ORDER BY stt;

    SELECT COUNT(*) INTO v_count FROM tmp_import;
    SET p_error_message = CONCAT('Đã import ', v_count, ' thành viên');

    DROP TEMPORARY TABLE IF EXISTS tmp_import;

    COMMIT;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
        noiSinh, noiMat, ngheNghiep, trinhDoHocVan, diaChiHienTai,
        tieuSu, anhChanDung, doiThuoc, chaId, meId, voId, chongId,
        ngayTao, active_flag, nguoiTaoId, lu_updated, lu_user_id
    ) VALUES (
        v_nextId, p_dongHoId, p_hoTen, p_gioiTinh, p_ngaySinh, p_ngayMat,
        p_noiSinh, p_noiMat, p_ngheNghiep, p_trinhDoHocVan, p_diaChiHienTai,
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `InsertTaiChinhChi`(
    IN p_dongHoId VARCHAR(50),
    IN p_danhMucId INT,
    IN p_ngayChi DATE,
    IN p_soTien DECIMAL(18,2),
    IN p_phuongThucThanhToan VARCHAR(100),
    IN p_noiDung TEXT,
    IN p_nguoiNhan VARCHAR(255),
    IN p_ghiChu TEXT,
    IN p_nguoiNhapId VARCHAR(50),

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

        INSERT INTO taichinhchi (
            dongHoId,
            danhMucId,
            ngayChi,
            soTien,
            phuongThucThanhToan,
            noiDung,
            nguoiNhan,
            ghiChu,
            ngayTao,
            nguoiNhapId,
            active_flag,
            lu_updated,
            lu_user_id
        )
        VALUES (
            p_dongHoId,
            p_danhMucId,
            p_ngayChi,
            p_soTien,
            p_phuongThucThanhToan,
            p_noiDung,
            p_nguoiNhan,
            p_ghiChu,
            NOW(),
            p_nguoiNhapId,
            1,
            CURDATE(),
            p_nguoiNhapId
        );

    COMMIT;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `InsertTaiChinhThu`(
    IN p_dongHoId VARCHAR(50),
    IN p_danhMucId INT,
    IN p_hoTenNguoiDong VARCHAR(255),
    IN p_ngayDong DATE,
    IN p_soTien DECIMAL(18,2),
    IN p_phuongThucThanhToan VARCHAR(100),
    IN p_noiDung TEXT,
    IN p_ghiChu TEXT,
    IN p_nguoiNhapId VARCHAR(50),

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

        INSERT INTO taichinhthu (
            dongHoId,
            danhMucId,
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
        )
        VALUES (
            p_dongHoId,
            p_danhMucId,
            p_hoTenNguoiDong,
            p_ngayDong,
            p_soTien,
            p_phuongThucThanhToan,
            p_noiDung,
            p_ghiChu,
            p_nguoiNhapId,
            NOW(),
            1,
            NOW(),
            p_nguoiNhapId
        );

    COMMIT;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `InsertUser`(
   IN p_nguoiDungId VARCHAR(50),
   IN p_dongHoId VARCHAR(50),
   IN p_roleId VARCHAR(50),
   IN p_tenDangNhap VARCHAR(100),
   IN p_matKhau VARCHAR(255),
   IN p_hoTen VARCHAR(255), -- Sẽ được dùng để tách tên vào profile
   IN p_soDienThoai VARCHAR(20),
   IN p_nguoiTaoId VARCHAR(50),
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

    -- 1. Kiểm tra trùng lặp tài khoản
    IF EXISTS (SELECT 1 FROM NguoiDung WHERE tenDangNhap = p_tenDangNhap) THEN
        SET p_error_message = 'Tài khoản người dùng này đã tồn tại!';
        SET p_error_code = -1;
        ROLLBACK;
    ELSE
        -- 2. Chèn vào bảng NguoiDung (Bảng hệ thống)
        INSERT INTO NguoiDung(
            nguoiDungId,
            dongHoId,
            roleId,
            tenDangNhap,
            matKhau,
            ngayTao,
            online_flag,
            active_flag,
            nguoiTaoId,
            lu_updated,
            lu_user_id
        )
        VALUES (
            p_nguoiDungId,
            p_dongHoId,
            p_roleId,
            p_tenDangNhap,
            p_matKhau,
            NOW(),
            0,
            1,
            p_nguoiTaoId,
            NOW(),
            p_nguoiTaoId
        );

        -- 3. Chèn vào bảng user_profile (Bảng thông tin chi tiết)
        -- Sử dụng SUBSTRING_INDEX để tách tạm thời họ và tên từ p_hoTen
        INSERT INTO user_profile (
            userId, 
            full_name, 
            phone, 
            email, 
            active_flag, 
            created_by_user_id, 
            create_date, 
            lu_updated, 
            lu_user_id
        )
        VALUES (
            p_nguoiDungId,     -- Khóa ngoại cắm vào NguoiDungId
            p_hoTen, 
            p_soDienThoai, 
            p_tenDangNhap,     -- Tạm thời lấy username làm email nếu chưa có
            1, 
            p_nguoiTaoId, 
            NOW(), 
            NOW(), 
            p_nguoiTaoId
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
            p_error_code AS error_code,
            p_error_message AS error_message
        FROM NguoiDung nd
        LEFT JOIN user_profile up ON nd.nguoiDungId = up.userId
        LEFT JOIN DongHo dh ON nd.dongHoId = dh.dongHoId
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `SearchNguoiDung`(
    IN p_pageIndex INT,              -- Trang hiện tại
    IN p_pageSize INT,               -- Số bản ghi mỗi trang
    IN p_search_content VARCHAR(500),-- Từ khóa tìm kiếm (họ tên, sđt, email, tên đăng nhập)
    IN p_dongHoId VARCHAR(50),       -- Lọc theo dòng họ (nếu có)
    OUT p_error_code INT,            -- Mã lỗi (0 = không lỗi)
    OUT p_error_message VARCHAR(500) -- Thông điệp lỗi
)
BEGIN
    DECLARE p_total_row INT DEFAULT 0;

    -- Bắt lỗi SQL
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET p_error_code = 1;
        SET p_error_message = 'Lỗi khi truy vấn dữ liệu người dùng.';
        ROLLBACK;
    END;

    -- Mặc định không lỗi
    SET p_error_code = 0;
    SET p_error_message = '';

    -- Gán biến tạm row number
    SET @row_number := 0;

	DROP TEMPORARY TABLE IF EXISTS Results;
    -- Truy vấn kết quả chính
    CREATE TEMPORARY TABLE IF NOT EXISTS Results AS
    SELECT 
        (@row_number := @row_number + 1) AS RowNumber,
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
            dh.tenDongHo,
            rl.roleCode,
            rl.roleName,
            nd.ngayTao
        FROM NguoiDung nd
        LEFT JOIN user_profile up ON nd.nguoiDungId = up.userId
        LEFT JOIN DongHo dh ON nd.dongHoId = dh.dongHoId
        LEFT JOIN role rl ON nd.roleId = rl.roleId
    WHERE nd.active_flag = 1
      AND (p_dongHoId IS NULL OR nd.dongHoId = p_dongHoId)
      AND (
            p_search_content IS NULL
            OR p_search_content = ''
            OR LOWER(CONCAT(
                COALESCE(nd.tenDangNhap, ''),
                COALESCE(up.full_name, ''),
                COALESCE(up.email, ''),
                COALESCE(up.phone, ''),
                COALESCE(dh.tenDongHo, '')
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
    ORDER BY ngayTao DESC;

    -- ✅ Di chuyển dòng xóa bảng tạm xuống **sau khi client đã nhận kết quả**
    -- nhưng vẫn đảm bảo MySQL không lỗi khi return
    DROP TEMPORARY TABLE IF EXISTS Results;

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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `SearchTaiChinhChi`(
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
            tc.chiId,
            tc.dongHoId,
            tc.danhMucId,
            dm.tenDanhMuc,
            tc.ngayChi,
            tc.soTien,
            tc.phuongThucThanhToan,
            tc.noiDung,
            tc.nguoiNhan,
            tc.ghiChu,
            tc.nguoiNhapId,
            up.full_name,
            up.phone,
            tc.ngayTao,
            tc.active_flag,
            tc.lu_updated,
            tc.lu_user_id
        FROM taichinhchi tc
        LEFT JOIN danhmuctaichinh dm ON tc.danhMucId = dm.danhMucId
        LEFT JOIN nguoidung nd ON tc.nguoiNhapId = nd.nguoiDungId
         LEFT JOIN user_profile up ON tc.nguoiNhapId = up.userId
        CROSS JOIN (SELECT @row_number := 0) r
        WHERE tc.active_flag = 1
          AND (p_dongHoId IS NULL OR p_dongHoId = '' OR tc.dongHoId = p_dongHoId)
          AND (
                p_search_content IS NULL
                OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(tc.noiDung, ''),
                    COALESCE(tc.nguoiNhan, ''),
                    COALESCE(tc.phuongThucThanhToan, ''),
                    COALESCE(tc.soTien, ''),
                    COALESCE(up.full_name, ''),
                    COALESCE(up.phone, '')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
          )
        ORDER BY tc.ngayChi DESC;

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
            tc.chiId,
            tc.dongHoId,
            tc.danhMucId,
            dm.tenDanhMuc,
            tc.ngayChi,
            tc.soTien,
            tc.phuongThucThanhToan,
            tc.noiDung,
            tc.nguoiNhan,
            tc.ghiChu,
            tc.nguoiNhapId,
            up.full_name,
            up.phone,
            tc.ngayTao,
            tc.active_flag,
            tc.lu_updated,
            tc.lu_user_id
        FROM taichinhchi tc
        LEFT JOIN danhmuctaichinh dm ON tc.danhMucId = dm.danhMucId
        LEFT JOIN nguoidung nd ON tc.nguoiNhapId = nd.nguoiDungId
		LEFT JOIN user_profile up ON tc.nguoiNhapId = up.userId
        CROSS JOIN (SELECT @row_number := 0) r
        WHERE tc.active_flag = 1
          AND (p_dongHoId IS NULL OR p_dongHoId = '' OR tc.dongHoId = p_dongHoId)
          AND (
                p_search_content IS NULL
                OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(tc.noiDung, ''),
                    COALESCE(tc.nguoiNhan, ''),
                    COALESCE(tc.phuongThucThanhToan, ''),
                    COALESCE(tc.soTien, ''),
                    COALESCE(up.full_name, ''),
                    COALESCE(up.phone, '')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
          )
        ORDER BY tc.ngayChi DESC;

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
/*!50003 DROP PROCEDURE IF EXISTS `SearchTaiChinhThu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `SearchTaiChinhThu`(
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
			  tc.thuId,
			  tc.dongHoId ,
			  tc.danhMucId,
              dm.tenDanhMuc,
			  tc.hoTenNguoiDong,
			  tc.ngayDong ,
			  tc.soTien,
			  tc.phuongThucThanhToan, 
			  tc.noiDung ,
			  tc.ghiChu ,
			  tc.nguoiNhapId ,
              up.full_name,
              up.phone,
			  tc.ngayTao  ,
			  tc.active_flag ,
			  tc.lu_updated ,
			  tc.lu_user_id 
        FROM taichinhthu tc
		LEFT JOIN danhmuctaichinh dm ON tc.danhMucId = dm.danhMucId
        LEFT JOIN NguoiDung nd ON tc.nguoiNhapId = nd.nguoiDungId
        LEFT JOIN user_profile up ON tc.nguoiNhapId = up.userId
        CROSS JOIN (SELECT @row_number := 0) r
        WHERE tc.active_flag = 1
          AND (p_dongHoId IS NULL OR p_dongHoId = '' OR tc.dongHoId = p_dongHoId)
          AND (
                p_search_content IS NULL
                OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(tc.hoTenNguoiDong, ''),
                    COALESCE(tc.ngayDong , ''),
                    COALESCE(tc.phuongThucThanhToan, ''),
                    COALESCE(up.full_name, ''),
                    COALESCE(up.phone, ''),
                    COALESCE(tc.soTien, '')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
          )
        ORDER BY tc.ngayDong DESC;

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
			  tc.thuId,
			  tc.dongHoId ,
			  tc.danhMucId,
              dm.tenDanhMuc,
			  tc.hoTenNguoiDong,
			  tc.ngayDong ,
			  tc.soTien,
			  tc.phuongThucThanhToan, 
			  tc.noiDung ,
			  tc.ghiChu ,
			  tc.nguoiNhapId ,
              up.full_name,
              up.phone,
			  tc.ngayTao  ,
			  tc.active_flag ,
			  tc.lu_updated ,
			  tc.lu_user_id 
        FROM taichinhthu tc
		LEFT JOIN danhmuctaichinh dm ON tc.danhMucId = dm.danhMucId
        LEFT JOIN NguoiDung nd ON tc.nguoiNhapId = nd.nguoiDungId
		LEFT JOIN user_profile up ON tc.nguoiNhapId = up.userId
        CROSS JOIN (SELECT @row_number := 0) r
        WHERE tc.active_flag = 1
          AND (p_dongHoId IS NULL OR p_dongHoId = '' OR tc.dongHoId = p_dongHoId)
          AND (
                p_search_content IS NULL
                OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(tc.hoTenNguoiDong, ''),
                    COALESCE(tc.ngayDong , ''),
                    COALESCE(tc.phuongThucThanhToan, ''),
                    COALESCE(up.full_name, ''),
                    COALESCE(up.phone, ''),
                    COALESCE(tc.soTien, '')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
          )
        ORDER BY tc.ngayDong DESC;

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
/*!50003 DROP PROCEDURE IF EXISTS `SearchTaiLieu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
        SELECT 
            (@row_number := @row_number + 1) AS RowNumber,
            tv.thanhVienId, tv.dongHoId, tv.hoTen, tv.gioiTinh,
            tv.ngaySinh, tv.ngayMat, tv.noiSinh, tv.noiMat,
            tv.ngheNghiep, tv.trinhDoHocVan, tv.diaChiHienTai,
            tv.tieuSu, tv.anhChanDung, tv.doiThuoc,
            tv.chaId, tv.meId, tv.voId, tv.chongId,
            tv.ngayTao, tv.active_flag,
            cha.hoTen AS tenCha,
            me.hoTen AS tenMe,
            vo.hoTen AS tenVo,
            chong.hoTen AS tenChong
        FROM thanhvien tv
        LEFT JOIN thanhvien cha ON tv.dongHoId = cha.dongHoId AND tv.chaId = cha.thanhVienId
        LEFT JOIN thanhvien me ON tv.dongHoId = me.dongHoId AND tv.meId = me.thanhVienId
        LEFT JOIN thanhvien vo ON tv.dongHoId = vo.dongHoId AND tv.voId = vo.thanhVienId
        LEFT JOIN thanhvien chong ON tv.dongHoId = chong.dongHoId AND tv.chongId = chong.thanhVienId
        CROSS JOIN (SELECT @row_number := 0) r
        WHERE tv.active_flag = 1
            AND (p_dongHoId IS NULL OR p_dongHoId = '' OR tv.dongHoId = p_dongHoId)
            AND (p_search_content IS NULL OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(tv.hoTen, ''),
                    COALESCE(tv.ngheNghiep, ''),
                    COALESCE(tv.trinhDoHocVan, ''),
                    COALESCE(tv.diaChiHienTai, '')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%'))
        ORDER BY tv.doiThuoc ASC, tv.thanhVienId ASC;
        
        SELECT COUNT(*) INTO p_total_row FROM Results;
        
        SELECT *, p_total_row AS RecordCount
        FROM Results
        WHERE RowNumber BETWEEN ((p_pageIndex - 1) * p_pageSize) + 1 AND (p_pageIndex * p_pageSize);
        
        DROP TEMPORARY TABLE Results;
    
    -- KHÔNG PHÂN TRANG
    ELSE
        DROP TEMPORARY TABLE IF EXISTS Results;
        CREATE TEMPORARY TABLE Results AS
        SELECT 
            (@row_number := @row_number + 1) AS RowNumber,
            tv.thanhVienId, tv.dongHoId, tv.hoTen, tv.gioiTinh,
            tv.ngaySinh, tv.ngayMat, tv.noiSinh, tv.noiMat,
            tv.ngheNghiep, tv.trinhDoHocVan, tv.diaChiHienTai,
            tv.tieuSu, tv.anhChanDung, tv.doiThuoc,
            tv.chaId, tv.meId, tv.voId, tv.chongId,
            tv.ngayTao, tv.active_flag,
            cha.hoTen AS tenCha,
            me.hoTen AS tenMe,
            vo.hoTen AS tenVo,
            chong.hoTen AS tenChong
        FROM thanhvien tv
        LEFT JOIN thanhvien cha ON tv.dongHoId = cha.dongHoId AND tv.chaId = cha.thanhVienId
        LEFT JOIN thanhvien me ON tv.dongHoId = me.dongHoId AND tv.meId = me.thanhVienId
        LEFT JOIN thanhvien vo ON tv.dongHoId = vo.dongHoId AND tv.voId = vo.thanhVienId
        LEFT JOIN thanhvien chong ON tv.dongHoId = chong.dongHoId AND tv.chongId = chong.thanhVienId
        CROSS JOIN (SELECT @row_number := 0) r
        WHERE tv.active_flag = 1
            AND (p_dongHoId IS NULL OR p_dongHoId = '' OR tv.dongHoId = p_dongHoId)
            AND (p_search_content IS NULL OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(tv.hoTen, ''),
                    COALESCE(tv.ngheNghiep, ''),
                    COALESCE(tv.trinhDoHocVan, ''),
                    COALESCE(tv.diaChiHienTai, '')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%'))
        ORDER BY tv.doiThuoc ASC, tv.thanhVienId ASC;
        
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
/*!50003 DROP PROCEDURE IF EXISTS `SearchTinTuc` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `SignUp`(
    IN p_userId VARCHAR(40),
    IN p_tendangnhap VARCHAR(200),
    IN p_matkhau VARCHAR(200),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_roleId VARCHAR(50);

    -- Handler lỗi SQL
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SET p_error_code = -1;
        SET p_error_message = 'Lỗi khi truy vấn dữ liệu.';
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
        -- ⭐ BƯỚC 1: Lấy roleId có roleCode = 'thanhvien'
        SELECT roleId INTO v_roleId
        FROM Role
        WHERE roleCode = 'thanhvien'
        LIMIT 1;

        -- Nếu không tìm thấy role → báo lỗi
        IF v_roleId IS NULL THEN
            SET p_error_code = -1;
            SET p_error_message = 'Không tìm thấy role mặc định "thanhvien".';
            ROLLBACK;
        ELSE
            -- ⭐ BƯỚC 2: Thêm người dùng với roleId lấy được
            INSERT INTO NguoiDung
                (nguoiDungId, tenDangNhap, matKhau, roleId,
                 ngayTao, online_flag, active_flag, hoTen, email,
                 lu_updated, lu_user_id)
            VALUES
                (p_userId, p_tendangnhap, p_matkhau, v_roleId,
                 NOW(), 1, 1, p_tendangnhap, p_tendangnhap,
                 NOW(), p_userId);

            COMMIT;
        END IF;

    END IF;

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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateMyAccountAndProfile`(
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
/*!50003 DROP PROCEDURE IF EXISTS `UpdateMyProfile` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateMyProfile`(
   IN p_userId CHAR(36),           -- ID của chính người dùng đang đăng nhập
   IN p_first_name VARCHAR(50),
   IN p_middle_name VARCHAR(50),
   IN p_last_name VARCHAR(50),
   IN p_gender TINYINT,            -- 0: Nữ, 1: Nam, 2: Khác
   IN p_date_of_birthday DATE,
   IN p_avatar VARCHAR(255),
   IN p_email VARCHAR(100),
   IN p_phone VARCHAR(20),
   OUT p_error_code INT, 
   OUT p_error_message VARCHAR(500)
)
BEGIN
    -- Bắt lỗi SQL (ví dụ: sai định dạng ngày tháng, quá độ dài ký tự...)
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
         GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
         ROLLBACK;
    END; 

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;
        
        -- Cập nhật thông tin chi tiết trong bảng user_profile
        UPDATE user_profile
        SET
            first_name = p_first_name,
            middle_name = p_middle_name,
            last_name = p_last_name,
            -- Tự động ghép full_name để hiển thị cho tiện
            full_name = TRIM(CONCAT(COALESCE(p_last_name,''), ' ', COALESCE(p_middle_name,''), ' ', COALESCE(p_first_name,''))),
            gender = p_gender,
            date_of_birthday = p_date_of_birthday,
            avatar = p_avatar,
            email = p_email,
            phone = p_phone,
            lu_updated = NOW(),
            lu_user_id = p_userId -- Người cập nhật chính là bản thân họ
        WHERE userId = p_userId;

        -- Kiểm tra nếu không có dòng nào bị ảnh hưởng (sai userId)
        IF ROW_COUNT() = 0 THEN
            SET p_error_code = 404;
            SET p_error_message = 'Không tìm thấy thông tin người dùng để cập nhật.';
            ROLLBACK;
        ELSE
            COMMIT;
        END IF;

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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateTaiChinhChi`(
    IN p_chiId INT,
    IN p_dongHoId VARCHAR(50),
    IN p_danhMucId INT,
    IN p_ngayChi DATE,
    IN p_soTien DECIMAL(18,2),
    IN p_phuongThucThanhToan VARCHAR(100),
    IN p_noiDung TEXT,
    IN p_nguoiNhan VARCHAR(255),
    IN p_ghiChu TEXT,
    IN p_lu_user_id VARCHAR(100),

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

        UPDATE taichinhchi
        SET
            dongHoId = p_dongHoId,
            danhMucId = p_danhMucId,
            ngayChi = p_ngayChi,
            soTien = p_soTien,
            phuongThucThanhToan = p_phuongThucThanhToan,
            noiDung = p_noiDung,
            nguoiNhan = p_nguoiNhan,
            ghiChu = p_ghiChu,
            lu_updated = CURDATE(),
            lu_user_id = p_lu_user_id
        WHERE chiId = p_chiId
          AND active_flag = 1;

    COMMIT;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateTaiChinhThu`(
    IN p_thuId INT,
    IN p_dongHoId VARCHAR(50),
    IN p_danhMucId INT,
    IN p_hoTenNguoiDong VARCHAR(255),
    IN p_ngayDong DATE,
    IN p_soTien DECIMAL(18,2),
    IN p_phuongThucThanhToan VARCHAR(100),
    IN p_noiDung TEXT,
    IN p_ghiChu TEXT,
    IN p_lu_user_id VARCHAR(100),

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

        UPDATE taichinhthu
        SET
            dongHoId = p_dongHoId,
            danhMucId = p_danhMucId,
            hoTenNguoiDong = p_hoTenNguoiDong,
            ngayDong = p_ngayDong,
            soTien = p_soTien,
            phuongThucThanhToan = p_phuongThucThanhToan,
            noiDung = p_noiDung,
            ghiChu = p_ghiChu,
            lu_updated = CURDATE(),
            lu_user_id = p_lu_user_id,
            nguoiNhapId = p_lu_user_id
        WHERE thuId = p_thuId
          AND active_flag = 1;

    COMMIT;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
  UPDATE tailieu SET
    dongHoId = p_dongHoId,
    tenTaiLieu = p_tenTaiLieu,
    duongDan = IFNULL(p_duongDan, duongDan),
    moTa = p_moTa,
    loaiTaiLieu = p_loaiTaiLieu,
    namSangTac = p_namSangTac,
    tacGia = p_tacGia,
    nguonGoc = p_nguonGoc,
    ghiChu = p_ghiChu,
    lu_updated = NOW(),
    lu_user_id = p_lu_user_id
  WHERE taiLieuId = p_taiLieuId;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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
   IN p_lu_user_id VARCHAR(50),
   OUT p_error_code INT, 
   OUT p_error_message VARCHAR(500)
)
BEGIN
    -- Bắt lỗi SQL nếu có vấn đề xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
         GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
         ROLLBACK;
    END; 

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;
        -- 1. Cập nhật bảng NguoiDung (Tài khoản)
        UPDATE NguoiDung
        SET
            dongHoId = p_dongHoId,
            roleId = p_roleId,
            tenDangNhap = p_tenDangNhap,
            matKhau = p_matKhau,
            lu_updated = NOW(),
            lu_user_id = p_lu_user_id
        WHERE nguoiDungId = p_nguoiDungId;

        -- 2. Cập nhật thẳng bảng user_profile (Thông tin cá nhân)
        UPDATE user_profile
        SET
            full_name = p_hoTen,
            phone = p_soDienThoai,
            email = p_tenDangNhap, -- Hoặc cột email riêng nếu bạn có truyền vào
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
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

-- Dump completed on 2025-12-29 21:25:28
