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
INSERT INTO `dongho` VALUES ('e9022e64-cbae-11f0-8020-a8934a9bae74','Dòng họ NHỮ','Hải Dương','2000-01-01','Nguyễn Văn A','Dòng họ lưu trữ thông tin gia phả.',1,'admin','2025-11-27 23:34:14','admin','2025-12-02 11:28:12');
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
INSERT INTO `nguoidung` VALUES ('15e5e9b2-b293-4f18-b0f4-86548bbda3b0','e9022e64-cbae-11f0-8020-a8934a9bae74','0aa1a174-c8ed-11f0-8020-a8934a9bae74','nguyenvanbao123@gmail.com','ee2a39ced74bf7f6aa36bef85067aa9a','2025-12-19 11:22:31',0,1,NULL,'2025-12-19 15:50:27',NULL),('61ef80c1-d2fa-4675-9323-bec58d33ed19','e9022e64-cbae-11f0-8020-a8934a9bae74','0aa1a174-c8ed-11f0-8020-a8934a9bae74','nhubaoanh221@gmail.com','bc9ae919caed0fc37d2db4f70f19c45e','2025-12-22 21:27:02',0,1,'89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-22 21:27:02','89fd6f88-c909-11f0-8020-a8934a9bae74'),('6aa26582-bd12-4fdb-95d8-4e09fdb2f102','e9022e64-cbae-11f0-8020-a8934a9bae74','0aa1a174-c8ed-11f0-8020-a8934a9bae74','minh123@gmail.com','ddc83bf88c241349a4211172137545e0','2025-12-22 21:16:56',0,1,NULL,'2025-12-22 21:16:56',NULL),('77f83890-6765-4c19-8139-31a29071fac3','e9022e64-cbae-11f0-8020-a8934a9bae74','0aa1a174-c8ed-11f0-8020-a8934a9bae74','baoanh222@gmail.com','3a9df786cd4b24e2ff195aea08e654ea','2025-11-27 23:34:46',0,1,'c2ed095e-c905-11f0-8020-a8934a9bae74','2025-12-02 17:20:04',NULL),('89fd6f88-c909-11f0-8020-a8934a9bae74','e9022e64-cbae-11f0-8020-a8934a9bae74','c2ed095e-c905-11f0-8020-a8934a9bae74','nhubaoanh111@gmail.com','0192023a7bbd73250516f069df18b500','2025-11-24 14:45:25',1,1,'admin','2025-12-03 10:00:08',NULL),('a20a6246-4800-4992-af5c-adcd6e898ee6','e9022e64-cbae-11f0-8020-a8934a9bae74','0aa1a174-c8ed-11f0-8020-a8934a9bae74','minh111@gmail.com','d9d706df20df775493eb3ba05e65c57f','2025-12-19 15:51:04',0,0,NULL,'2025-12-19 22:06:29','system'),('b9b116b0-3d3c-4187-b1a9-fd8247274d64','e9022e64-cbae-11f0-8020-a8934a9bae74','0aa1a174-c8ed-11f0-8020-a8934a9bae74','nguyenvanbao222@gmail.com','014663e57b654fd69a2352969e57e2e6','2025-12-22 21:11:25',0,1,NULL,'2025-12-22 21:11:25',NULL);
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
  PRIMARY KEY (`quanHeId`),
  KEY `thanhVien1Id` (`thanhVien1Id`),
  KEY `thanhVien2Id` (`thanhVien2Id`),
  KEY `loaiQuanHeId` (`loaiQuanHeId`),
  CONSTRAINT `quanhe_ibfk_2` FOREIGN KEY (`thanhVien2Id`) REFERENCES `thanhvien` (`thanhVienId`) ON DELETE CASCADE,
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taichinhchi`
--

LOCK TABLES `taichinhchi` WRITE;
/*!40000 ALTER TABLE `taichinhchi` DISABLE KEYS */;
INSERT INTO `taichinhchi` VALUES (1,'e9022e64-cbae-11f0-8020-a8934a9bae74',3,'2025-12-06',800000.00,'Tiền mặt','Chi tổ chức giỗ tổ','Nhà hàng Hồng Phát',NULL,'2025-12-18 10:53:27','89fd6f88-c909-11f0-8020-a8934a9bae74',1,NULL,NULL),(2,'e9022e64-cbae-11f0-8020-a8934a9bae74',4,'2025-12-07',1200000.00,'Chuyển khoản','Chi sửa mộ tổ','Thợ xây Nguyễn Văn A',NULL,'2025-12-18 10:53:27','89fd6f88-c909-11f0-8020-a8934a9bae74',1,NULL,NULL),(3,'e9022e64-cbae-11f0-8020-a8934a9bae74',5,'2025-12-08',500000.00,'Tiền mặt','Chi họp họ cuối năm','Nhà văn hóa thôn',NULL,'2025-12-18 10:53:27','89fd6f88-c909-11f0-8020-a8934a9bae74',1,NULL,NULL),(4,'e9022e64-cbae-11f0-8020-a8934a9bae74',3,'2025-12-09',300000.00,'Tiền mặt','Mua đồ lễ giỗ tổ','Cửa hàng đồ lễ',NULL,'2025-12-18 10:53:27','89fd6f88-c909-11f0-8020-a8934a9bae74',1,NULL,NULL),(5,'e9022e64-cbae-11f0-8020-a8934a9bae74',5,'2025-12-10',400000.00,'Chuyển khoản','Chi nước uống họp họ','Tạp hóa Minh Anh',NULL,'2025-12-18 10:53:27','89fd6f88-c909-11f0-8020-a8934a9bae74',1,NULL,NULL),(6,'e9022e64-cbae-11f0-8020-a8934a9bae74',3,'2025-12-22',9990000.00,'Tiền mặt','Chi mua vật tư abc ăn thật nhiều','Cửa hàng xây dựng A','Có hóa đơn','2025-12-22 19:32:12','89fd6f88-c909-11f0-8020-a8934a9bae74',1,'2025-12-22 00:00:00','89fd6f88-c909-11f0-8020-a8934a9bae74');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taichinhthu`
--

LOCK TABLES `taichinhthu` WRITE;
/*!40000 ALTER TABLE `taichinhthu` DISABLE KEYS */;
INSERT INTO `taichinhthu` VALUES (1,'e9022e64-cbae-11f0-8020-a8934a9bae74',1,'Nguyễn Văn Sơn','2025-12-01',100000.00,'Tiền mặt','Đóng góp giỗ tổ','2025-12-18 10:51:55','89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-18 10:51:55',1,NULL,NULL),(2,'e9022e64-cbae-11f0-8020-a8934a9bae74',1,'Nhữ Bảo Anh','2025-12-02',200000.00,'Chuyển khoản','Đóng góp giỗ tổ','2025-12-18 10:51:55','89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-18 10:51:55',1,NULL,NULL),(3,'e9022e64-cbae-11f0-8020-a8934a9bae74',2,'Hoàng Văn Bình','2025-12-03',300000.00,'Tiền mặt','Đóng quỹ họ','2025-12-18 10:51:55','89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-18 10:51:55',1,NULL,NULL),(4,'e9022e64-cbae-11f0-8020-a8934a9bae74',2,'Nguyễn Thị Hoa','2025-12-04',150000.00,'Chuyển khoản','Đóng quỹ họ','2025-12-18 10:51:55','89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-18 10:51:55',1,NULL,NULL),(5,'e9022e64-cbae-11f0-8020-a8934a9bae74',1,'Nhữ Văn Hùng','2025-12-05',500000.00,'Tiền mặt','Ủng hộ thêm cho giỗ tổ','2025-12-18 10:51:55','89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-18 10:51:55',1,NULL,NULL),(8,'e9022e64-cbae-11f0-8020-a8934a9bae74',2,'Nguyễn Văn Anh đẹp zai','2025-12-22',9900000.00,'Chuyển khoản','Thu tiền vệ sinh ngày tết lễ','Đã thu đủ','89fd6f88-c909-11f0-8020-a8934a9bae74','2025-12-22 19:26:39',1,'2025-12-22 00:00:00',NULL),(9,'e9022e64-cbae-11f0-8020-a8934a9bae74',1,'Nhữ Văn Hùng','2025-12-23',300000.00,'tien_mat','đóng góp xây nha thok','sguytdfththt',NULL,'2025-12-22 19:48:28',1,'2025-12-22 19:48:28',NULL);
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
  `thanhVienId` int DEFAULT NULL,
  `suKienId` varchar(50) DEFAULT NULL,
  `nguoiTaiLenId` varchar(50) DEFAULT NULL,
  `tenTaiLieu` varchar(255) DEFAULT NULL,
  `duongDan` varchar(255) DEFAULT NULL,
  `moTa` text,
  `ngayTaiLen` date DEFAULT NULL,
  `active_flag` tinyint DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`taiLieuId`),
  KEY `thanhVienId` (`thanhVienId`),
  KEY `suKienId` (`suKienId`),
  KEY `nguoiTaiLenId` (`nguoiTaiLenId`),
  CONSTRAINT `tailieu_ibfk_1` FOREIGN KEY (`thanhVienId`) REFERENCES `thanhvien` (`thanhVienId`) ON DELETE SET NULL,
  CONSTRAINT `tailieu_ibfk_2` FOREIGN KEY (`suKienId`) REFERENCES `sukien` (`suKienId`) ON DELETE SET NULL,
  CONSTRAINT `tailieu_ibfk_3` FOREIGN KEY (`nguoiTaiLenId`) REFERENCES `nguoidung` (`nguoiDungId`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tailieu`
--

LOCK TABLES `tailieu` WRITE;
/*!40000 ALTER TABLE `tailieu` DISABLE KEYS */;
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
  `dongHoId` varchar(50) DEFAULT NULL,
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
  PRIMARY KEY (`thanhVienId`),
  KEY `dongHoId` (`dongHoId`),
  KEY `chaId` (`chaId`),
  KEY `meId` (`meId`),
  KEY `voId` (`voId`),
  KEY `chongId` (`chongId`),
  CONSTRAINT `thanhvien_ibfk_1` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`) ON DELETE CASCADE,
  CONSTRAINT `thanhvien_ibfk_3` FOREIGN KEY (`chaId`) REFERENCES `thanhvien` (`thanhVienId`) ON DELETE SET NULL,
  CONSTRAINT `thanhvien_ibfk_4` FOREIGN KEY (`meId`) REFERENCES `thanhvien` (`thanhVienId`) ON DELETE SET NULL,
  CONSTRAINT `thanhvien_ibfk_5` FOREIGN KEY (`voId`) REFERENCES `thanhvien` (`thanhVienId`) ON DELETE SET NULL,
  CONSTRAINT `thanhvien_ibfk_6` FOREIGN KEY (`chongId`) REFERENCES `thanhvien` (`thanhVienId`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thanhvien`
--

LOCK TABLES `thanhvien` WRITE;
/*!40000 ALTER TABLE `thanhvien` DISABLE KEYS */;
INSERT INTO `thanhvien` VALUES (1,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Phúc Lợi',1,NULL,'1989-12-02','Hà Nội','','','','Hà Nội, Việt Nam','Nông dân','uploads/2025/12/17/Green Simple Nature Lake With Name Desktop Wallpaper-606712948.png',1,NULL,NULL,2,NULL,'2025-12-16 23:00:43',0,'1','2025-12-17 16:51:11',NULL),(2,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Hiệu Diệu Lâm',0,NULL,'1989-12-02','Hà Nội','','','','Hà Nội, Việt Nam','Nông dân',NULL,1,NULL,NULL,NULL,1,'2025-12-16 23:00:43',1,'1',NULL,NULL),(3,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Cõi',1,'1984-07-19','1989-12-01','Hà Nội','','thợ thủ công','đại học ','Hà Nội, Việt Nam','đỗ tiến sỹ','uploads/2025/12/19/Green Simple Nature Lake With Name Desktop Wallpaper-718798013.png',2,1,2,NULL,NULL,'2025-12-16 23:00:43',1,'1','2025-12-19 22:03:39',NULL),(4,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Lọ',0,NULL,'1989-12-02','Hà Nội','','','','Hà Nội, Việt Nam','',NULL,2,1,2,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(5,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chúc',0,NULL,'1989-12-02','Hà Nội','','','','Hà Nội, Việt Nam','',NULL,2,1,2,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(6,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Giới',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,3,3,NULL,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(7,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Nghãi',0,NULL,'1989-12-02','Hà Nội','','','','Hà Nội, Việt Nam','',NULL,3,NULL,NULL,NULL,6,'2025-12-16 23:00:43',1,'1',NULL,NULL),(8,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Lai',0,NULL,'1989-12-02','Hà Nội','','','','Hà Nội, Việt Nam','',NULL,3,NULL,NULL,NULL,6,'2025-12-16 23:00:43',1,'1',NULL,NULL),(9,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tráng',0,NULL,'1999-03-10','Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(10,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Diện',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(11,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Dối',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(12,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tý',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,13,'2025-12-16 23:00:43',1,'1',NULL,NULL),(13,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Liễn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(14,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hiệu',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,13,'2025-12-16 23:00:43',1,'1',NULL,NULL),(15,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Chóe',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(16,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tích',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,15,'2025-12-16 23:00:43',1,'1',NULL,NULL),(17,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Cốc',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,18,'2025-12-16 23:00:43',1,'1',NULL,NULL),(18,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Cận',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(19,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thuổi',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,18,'2025-12-16 23:00:43',1,'1',NULL,NULL),(20,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Thoa',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,21,'2025-12-16 23:00:43',1,'1',NULL,NULL),(21,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hồng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,6,7,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(22,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Năm',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,21,'2025-12-16 23:00:43',1,'1',NULL,NULL),(23,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Lãi',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,6,8,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(24,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Đài',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,4,NULL,NULL,NULL,23,'2025-12-16 23:00:43',1,'1',NULL,NULL),(25,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Diễn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(26,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Diên',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(27,'e9022e64-cbae-11f0-8020-a8934a9bae74','Lê Thị Thuận',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,26,'2025-12-16 23:00:43',1,'1',NULL,NULL),(28,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Huống',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(29,'e9022e64-cbae-11f0-8020-a8934a9bae74','Phạn Thị Đệ',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,28,'2025-12-16 23:00:43',1,'1',NULL,NULL),(30,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Chày',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(31,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thu',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,13,12,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(32,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Oánh',0,'2002-01-01',NULL,'Hà Nội','','','','Hà Nội, Việt Nam','CEO',NULL,5,13,12,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(33,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thụ',0,'2023-01-01',NULL,'Hà Nội','','','','Hà Nội, Việt Nam','student',NULL,5,13,12,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(34,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Đồng',1,NULL,'2006-02-24','Hà Nội','','','','Hà Nội, Việt Nam','gg',NULL,5,13,14,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(35,'e9022e64-cbae-11f0-8020-a8934a9bae74','Dương Thị Miên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,34,'2025-12-16 23:00:43',1,'1',NULL,NULL),(36,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Túy',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,13,14,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(37,'e9022e64-cbae-11f0-8020-a8934a9bae74','Dương Thị Diện',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,36,'2025-12-16 23:00:43',1,'1',NULL,NULL),(38,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thôn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,15,16,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(39,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Định',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,38,'2025-12-16 23:00:43',1,'1',NULL,NULL),(40,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Cấn',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(41,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Nguyệt',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(42,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Vinh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(43,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thi',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,17,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(44,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Dự',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(45,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chục',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(46,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Phi',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(47,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Loan',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,46,'2025-12-16 23:00:43',1,'1',NULL,NULL),(48,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Điệp',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(49,'e9022e64-cbae-11f0-8020-a8934a9bae74','Cao Thị Hưng',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,50,'2025-12-16 23:00:43',1,'1',NULL,NULL),(50,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Phong',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(51,'e9022e64-cbae-11f0-8020-a8934a9bae74','Đoàn Thị Quyên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,50,'2025-12-16 23:00:43',1,'1',NULL,NULL),(52,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Cảnh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(53,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Hà',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,52,'2025-12-16 23:00:43',1,'1',NULL,NULL),(54,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Đô',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,18,19,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(55,'e9022e64-cbae-11f0-8020-a8934a9bae74','Đào Thị Thi',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,56,'2025-12-16 23:00:43',1,'1',NULL,NULL),(56,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Vượng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(57,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thỏa',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,56,'2025-12-16 23:00:43',1,'1',NULL,NULL),(58,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thông',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(59,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Nhật',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,58,'2025-12-16 23:00:43',1,'1',NULL,NULL),(60,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Đề',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(61,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Liên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,60,'2025-12-16 23:00:43',1,'1',NULL,NULL),(62,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Nhàn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(63,'e9022e64-cbae-11f0-8020-a8934a9bae74','Lê Thị Lương',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,62,'2025-12-16 23:00:43',1,'1',NULL,NULL),(64,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Điểm',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(65,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Nga',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(66,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thư',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(67,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Lư',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(68,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Sang',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,20,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(69,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Chín',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,22,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(70,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị A',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,69,'2025-12-16 23:00:43',1,'1',NULL,NULL),(71,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Mười',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,21,22,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(72,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Viện',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,71,'2025-12-16 23:00:43',1,'1',NULL,NULL),(73,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Bãi',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(74,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị La',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,NULL,NULL,NULL,73,'2025-12-16 23:00:43',1,'1',NULL,NULL),(75,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Cài',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(76,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hiền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(77,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Liền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,5,23,24,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(78,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hoà',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(79,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Mùi',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(80,'e9022e64-cbae-11f0-8020-a8934a9bae74','Đỗ Thị Mùi',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,79,'2025-12-16 23:00:43',1,'1',NULL,NULL),(81,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Kỷ',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(82,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Quý',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(83,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tước',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,82,'2025-12-16 23:00:43',1,'1',NULL,NULL),(84,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tỵ',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(85,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Điền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(86,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Bính',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(87,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tiền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,86,'2025-12-16 23:00:43',1,'1',NULL,NULL),(88,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Binh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,26,27,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(89,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thảo',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,88,'2025-12-16 23:00:43',1,'1',NULL,NULL),(90,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chung',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(91,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chiên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(92,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Kiên',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(93,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Liên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,92,'2025-12-16 23:00:43',1,'1',NULL,NULL),(94,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thủy',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(95,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hợp',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(96,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hạt',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,28,29,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(97,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Đông',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(98,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Phương',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(99,'e9022e64-cbae-11f0-8020-a8934a9bae74','Xin Thị Dung',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,98,'2025-12-16 23:00:43',1,'1',NULL,NULL),(100,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Chí',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(101,'e9022e64-cbae-11f0-8020-a8934a9bae74','Đào Thị Hồng',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,100,'2025-12-16 23:00:43',1,'1',NULL,NULL),(102,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hà',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(103,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hài',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(104,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hưng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,34,35,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(105,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Thảo',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,104,'2025-12-16 23:00:43',1,'1',NULL,NULL),(106,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Tuy',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(107,'e9022e64-cbae-11f0-8020-a8934a9bae74','Dương Thị Lê',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,106,'2025-12-16 23:00:43',1,'1',NULL,NULL),(108,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Tuyến',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(109,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hằng',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(110,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Duyên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(111,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Toàn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(112,'e9022e64-cbae-11f0-8020-a8934a9bae74','Đỗ Thị Xuân',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,111,'2025-12-16 23:00:43',1,'1',NULL,NULL),(113,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Dung',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(114,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Toán',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,36,37,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(115,'e9022e64-cbae-11f0-8020-a8934a9bae74','Lê Thị Tính',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,114,'2025-12-16 23:00:43',1,'1',NULL,NULL),(116,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Đoài',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,38,39,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(117,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thơ',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,38,39,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(118,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Phương',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,117,'2025-12-16 23:00:43',1,'1',NULL,NULL),(119,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thêm',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,38,39,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(120,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thành',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,119,'2025-12-16 23:00:43',1,'1',NULL,NULL),(121,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Phòng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,46,47,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(122,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị An',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,121,'2025-12-16 23:00:43',1,'1',NULL,NULL),(123,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Phúc',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,46,47,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(124,'e9022e64-cbae-11f0-8020-a8934a9bae74','Phạm Thu Hà',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,123,'2025-12-16 23:00:43',1,'1',NULL,NULL),(125,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thắm',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,46,47,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(126,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hải',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,50,49,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(127,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Quang',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,50,49,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(128,'e9022e64-cbae-11f0-8020-a8934a9bae74','Hoàng Thị Hiền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,127,'2025-12-16 23:00:43',1,'1',NULL,NULL),(129,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Mạnh Quỳnh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,50,51,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(130,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thủy',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,52,53,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(131,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Duy',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,52,53,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(132,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thu Huyền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,131,'2025-12-16 23:00:43',1,'1',NULL,NULL),(133,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Quân',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,52,53,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(134,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thơ',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(135,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Nghi',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(136,'e9022e64-cbae-11f0-8020-a8934a9bae74','Phan Thị Nghĩa',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,135,'2025-12-16 23:00:43',1,'1',NULL,NULL),(137,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thảo',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(138,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Tuyên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,137,'2025-12-16 23:00:43',1,'1',NULL,NULL),(139,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Chung',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(140,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Thúy',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,139,'2025-12-16 23:00:43',1,'1',NULL,NULL),(141,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Vấn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(142,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Dàng',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,141,'2025-12-16 23:00:43',1,'1',NULL,NULL),(143,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Vận',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(144,'e9022e64-cbae-11f0-8020-a8934a9bae74','Hương',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,143,'2025-12-16 23:00:43',1,'1',NULL,NULL),(145,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Vần',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(146,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Xuân',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,55,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(147,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thịnh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,57,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(148,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trương Thị Năm',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,147,'2025-12-16 23:00:43',1,'1',NULL,NULL),(149,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thu',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,57,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(150,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Bình',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,56,57,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(151,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thìn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(152,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Nghị',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,151,'2025-12-16 23:00:43',1,'1',NULL,NULL),(153,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thiết',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(154,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hường',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,153,'2025-12-16 23:00:43',1,'1',NULL,NULL),(155,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thanh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(156,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Khương',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,155,'2025-12-16 23:00:43',1,'1',NULL,NULL),(157,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thạo',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(158,'e9022e64-cbae-11f0-8020-a8934a9bae74','Hảo',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,157,'2025-12-16 23:00:43',1,'1',NULL,NULL),(159,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thiện',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(160,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Ánh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,159,'2025-12-16 23:00:43',1,'1',NULL,NULL),(161,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thái',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(162,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Vân',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(163,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thật',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,58,59,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(164,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Đạt',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,60,61,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(165,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Tuấn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,62,63,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(166,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Luận',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,165,'2025-12-16 23:00:43',1,'1',NULL,NULL),(167,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Tùng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,62,63,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(168,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Bích Phương',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,167,'2025-12-16 23:00:43',1,'1',NULL,NULL),(169,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Tuân',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,62,63,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(170,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chiến',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(171,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chiên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(172,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thu Hằng',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(173,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hoàn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,69,70,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(174,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Vân',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,173,'2025-12-16 23:00:43',1,'1',NULL,NULL),(175,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thùy Vân',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,71,72,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(176,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Anh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,71,72,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(177,'e9022e64-cbae-11f0-8020-a8934a9bae74','Bùi Thị Hồng Hạnh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,176,'2025-12-16 23:00:43',1,'1',NULL,NULL),(178,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Mai',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(179,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Xuyên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(180,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Xuân',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(181,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hương',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(182,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Trường',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,73,74,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(183,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Vui',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,6,NULL,NULL,NULL,182,'2025-12-16 23:00:43',1,'1',NULL,NULL),(184,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Bình',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,79,80,185,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(185,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hoa',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,184,'2025-12-16 23:00:43',1,'1',NULL,NULL),(186,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hoa',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,79,80,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(187,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Huệ',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,79,80,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(188,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Quí Mạnh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,79,80,189,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(189,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Duyên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,188,'2025-12-16 23:00:43',1,'1',NULL,NULL),(190,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Quang Minh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,79,80,191,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(191,'e9022e64-cbae-11f0-8020-a8934a9bae74','Vũ Thị Thoa',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,190,'2025-12-16 23:00:43',1,'1',NULL,NULL),(192,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tơ',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(193,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tuyến',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(194,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Trâm',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(195,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tình',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(196,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Linh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,82,83,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(197,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thành Công',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,86,87,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(198,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Lan Anh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,86,87,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(199,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Huy',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,86,87,200,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(200,'e9022e64-cbae-11f0-8020-a8934a9bae74','Bùi Thị Ngọc Hà',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,199,'2025-12-16 23:00:43',1,'1',NULL,NULL),(201,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Bảo',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,88,89,202,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(202,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Ngọc Huyền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,201,'2025-12-16 23:00:43',1,'1',NULL,NULL),(203,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Chi',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,88,89,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(204,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hạnh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,92,93,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(205,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hiệp',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,92,93,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(206,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hội',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,92,93,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(207,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hưởng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,92,93,208,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(208,'e9022e64-cbae-11f0-8020-a8934a9bae74','Hoàng Thị Thu An',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,207,'2025-12-16 23:00:43',1,'1',NULL,NULL),(209,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Phường',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,98,99,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(210,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Dũng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,98,99,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(211,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Công',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,100,101,212,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(212,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Khánh Ly',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,211,'2025-12-16 23:00:43',1,'1',NULL,NULL),(213,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Trường',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,100,101,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(214,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Bảo Anh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,100,101,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(215,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hiền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,104,105,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(216,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Mai',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,104,105,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(217,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn An',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,104,105,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(218,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thắng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,106,107,219,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(219,'e9022e64-cbae-11f0-8020-a8934a9bae74','Lê Thị Ánh Ngọc',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,218,'2025-12-16 23:00:43',1,'1',NULL,NULL),(220,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thắm',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,106,107,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(221,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Toản',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,111,112,222,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(222,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Trang',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,221,'2025-12-16 23:00:43',1,'1',NULL,NULL),(223,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Tuấn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,111,112,224,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(224,'e9022e64-cbae-11f0-8020-a8934a9bae74','Đặng Thị Thu',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,223,'2025-12-16 23:00:43',1,'1',NULL,NULL),(225,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thế Giỏi',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,114,115,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(226,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Gia Hân',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,114,115,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(227,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hào',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,117,118,228,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(228,'e9022e64-cbae-11f0-8020-a8934a9bae74','Trần Thị Hằng',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,227,'2025-12-16 23:00:43',1,'1',NULL,NULL),(229,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hằng',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,117,118,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(230,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hải',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,117,118,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(231,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hoa',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,119,120,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(232,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Sở',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,119,120,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(233,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Khoa',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,119,120,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(234,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Anh Tấn ',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,121,122,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(235,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Anh Toán',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,121,122,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(236,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Huy',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,123,124,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(237,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hưng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,123,124,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(238,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Nam Dương',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,127,128,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(239,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Duy Bách',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,131,132,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(240,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Nam',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,135,136,241,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(241,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Luyến',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,240,'2025-12-16 23:00:43',1,'1',NULL,NULL),(242,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Bắc',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,135,136,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(243,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Tân',1,NULL,NULL,'','','','','','',NULL,7,137,138,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(244,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hiền',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,137,138,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(245,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Hòa',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,137,138,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(246,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Ba',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,139,140,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(247,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Đức',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,139,140,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(248,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Loan',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,139,140,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(249,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Duyên',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,141,142,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(250,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Mạnh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,141,142,251,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(251,'e9022e64-cbae-11f0-8020-a8934a9bae74','Phan Thị Hường',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,250,'2025-12-16 23:00:43',1,'1',NULL,NULL),(252,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Vũ',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,141,142,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(253,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Giang',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,143,144,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(254,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Sơn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,143,144,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(255,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Vui',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,143,144,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(256,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hà Phương',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,147,148,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(257,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Phương Anh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,147,148,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(258,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Quyết',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,151,152,259,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(259,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Huyền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,258,'2025-12-16 23:00:43',1,'1',NULL,NULL),(260,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Mạnh Chiến',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,151,152,261,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(261,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Hải Yến',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,260,'2025-12-16 23:00:43',1,'1',NULL,NULL),(262,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Tâm',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,151,152,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(263,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Mạnh Thắng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,153,154,264,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(264,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hằng',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,263,'2025-12-16 23:00:43',1,'1',NULL,NULL),(265,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Thành',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,153,154,266,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(266,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Hiền',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,265,'2025-12-16 23:00:43',1,'1',NULL,NULL),(267,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Thịnh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,153,154,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(268,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Thu',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,155,156,269,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(269,'e9022e64-cbae-11f0-8020-a8934a9bae74','Linh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,NULL,NULL,NULL,268,'2025-12-16 23:00:43',1,'1',NULL,NULL),(270,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Giang',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,155,156,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(271,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Kim Loan',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,157,158,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(272,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Long',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,157,158,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(273,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Việt Trường',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,159,160,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(274,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Bảo',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,159,160,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(275,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Trọng Tấn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,165,166,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(276,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Minh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,165,166,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(277,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thu Trang',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,165,166,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(278,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Mạnh Hùng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,167,168,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(279,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Phương Anh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,167,168,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(280,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thảo Linh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,173,174,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(281,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Minh Dương',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,173,174,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(282,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Minh Quân',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,173,174,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(283,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Tuệ Minh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,176,177,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(284,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Sơn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,176,177,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(285,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Hiếu',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,182,183,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(286,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Sơn',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,7,182,183,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(287,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thanh Liêm',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,184,185,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(288,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Thủy',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,NULL,NULL,NULL,286,'2025-12-16 23:00:43',1,'1',NULL,NULL),(289,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thành Lộ',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,184,185,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(290,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Ngọc',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,188,189,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(291,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Anh Vũ',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,188,189,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(292,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Băng',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,190,191,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(293,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thị Trà',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,190,191,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(294,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn An',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,190,191,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(295,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Hải',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,207,208,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(296,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thúy Hường',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,218,219,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(297,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Thế Thành',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,218,219,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(298,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Linh Nhi',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,221,222,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(299,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Lan Hương',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,221,222,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(300,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Long',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,223,224,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(301,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Hửa Khang',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,223,224,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(302,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Huy',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,227,228,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(303,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Thúy Nga',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,227,228,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(304,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Lan Phương',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,240,241,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(305,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Văn Võ',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,240,241,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(306,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Minh Nguyệt',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,258,259,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(307,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Tuấn Kiệt',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,258,259,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(308,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Tài',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,258,259,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(309,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Nam Khánh',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,260,261,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(310,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Minh Khuê',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,260,261,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(311,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Ban Mai',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,263,264,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(312,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Khánh Ngọc',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,263,264,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(313,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Hiếu',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,263,264,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(314,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Ngọc Trúc Quỳnh',0,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,265,266,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(315,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Huy',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','',NULL,8,265,266,NULL,NULL,'2025-12-16 23:00:43',1,'1',NULL,NULL),(316,'e9022e64-cbae-11f0-8020-a8934a9bae74','Nguyễn Đức Hưng',1,NULL,NULL,'Hà Nội','','','','Hà Nội, Việt Nam','','uploads/2025/12/16/Green Simple Nature Lake With Name Desktop Wallpaper-706622504.png',8,265,266,NULL,NULL,'2025-12-16 23:00:43',1,'1','2025-12-16 23:14:34',NULL);
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
/*!50003 DROP PROCEDURE IF EXISTS `GetThanhVienById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetThanhVienById`(
    IN  p_thanhVienId VARCHAR(50), 
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN   
    -- Handler lỗi SQL
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_error_code = RETURNED_SQLSTATE, 
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = ''; 
    SET SESSION group_concat_max_len = 10000000;

    SELECT 
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
        tv.active_flag,
        tv.nguoiTaoId,
        tv.lu_updated,
        tv.lu_user_id
    FROM thanhvien tv
    WHERE tv.thanhVienId = p_thanhVienId
      AND tv.active_flag = 1;

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
            lu_user_id = p_lu_user_id
        WHERE thuId = p_thuId
          AND active_flag = 1;

    COMMIT;
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

-- Dump completed on 2025-12-23 22:52:49
