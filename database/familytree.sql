-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: family
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
-- Table structure for table `action`
--

DROP TABLE IF EXISTS `action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `action` (
  `action_code` varchar(50) NOT NULL,
  `functionId` varchar(50) DEFAULT NULL,
  `action_api_url` varchar(100) DEFAULT NULL,
  `action_name` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `createDate` date DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  `active_flag` tinyint DEFAULT '1',
  PRIMARY KEY (`action_code`),
  KEY `functionId` (`functionId`),
  CONSTRAINT `action_ibfk_1` FOREIGN KEY (`functionId`) REFERENCES `functions` (`functionId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `action`
--

LOCK TABLES `action` WRITE;
/*!40000 ALTER TABLE `action` DISABLE KEYS */;
INSERT INTO `action` VALUES ('create','4ff1c7ea-c8ed-11f0-8020-a8934a9bae74','api-core/function/create','Thêm tính năng',NULL,NULL,'2025-11-24',NULL,NULL,1),('update','4ff1c7ea-c8ed-11f0-8020-a8934a9bae74','api-core/function/update','Cập nhập tính năng',NULL,NULL,'2025-11-24',NULL,NULL,1);
/*!40000 ALTER TABLE `action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `caygiapha`
--

DROP TABLE IF EXISTS `caygiapha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caygiapha` (
  `cayId` varchar(50) NOT NULL,
  `dongHoId` varchar(50) DEFAULT NULL,
  `tenCay` varchar(255) DEFAULT NULL,
  `moTa` text,
  `ngayTao` datetime DEFAULT NULL,
  `active_flag` tinyint DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cayId`),
  KEY `dongHoId` (`dongHoId`),
  KEY `nguoiTaoId` (`nguoiTaoId`),
  CONSTRAINT `caygiapha_ibfk_1` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`) ON DELETE CASCADE,
  CONSTRAINT `caygiapha_ibfk_2` FOREIGN KEY (`nguoiTaoId`) REFERENCES `nguoidung` (`nguoiDungId`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caygiapha`
--

LOCK TABLES `caygiapha` WRITE;
/*!40000 ALTER TABLE `caygiapha` DISABLE KEYS */;
/*!40000 ALTER TABLE `caygiapha` ENABLE KEYS */;
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
  PRIMARY KEY (`dongHoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dongho`
--

LOCK TABLES `dongho` WRITE;
/*!40000 ALTER TABLE `dongho` DISABLE KEYS */;
/*!40000 ALTER TABLE `dongho` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `functions`
--

DROP TABLE IF EXISTS `functions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `functions` (
  `functionId` varchar(50) NOT NULL,
  `parent_id` varchar(50) DEFAULT NULL,
  `function_name` varchar(150) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `level` int DEFAULT NULL,
  `active_flag` tinyint DEFAULT '1',
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`functionId`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `functions`
--

LOCK TABLES `functions` WRITE;
/*!40000 ALTER TABLE `functions` DISABLE KEYS */;
INSERT INTO `functions` VALUES ('4ff1c7ea-c8ed-11f0-8020-a8934a9bae74','0','Quản lý hệ thống và danh mục','/authorization','',1,1,1,NULL,'2025-11-24 11:23:22',NULL),('cf31d537-c906-11f0-8020-a8934a9bae74','4ff1c7ea-c8ed-11f0-8020-a8934a9bae74','Quản trị người dùng','/authorization/users',NULL,2,2,1,NULL,'2025-11-24 14:25:53',NULL);
/*!40000 ALTER TABLE `functions` ENABLE KEYS */;
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
  `hoTen` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `soDienThoai` varchar(20) DEFAULT NULL,
  `anhDaiDien` varchar(255) DEFAULT NULL,
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
INSERT INTO `nguoidung` VALUES ('89fd6f88-c909-11f0-8020-a8934a9bae74',NULL,'c2ed095e-c905-11f0-8020-a8934a9bae74','nhubaoanh111@gmail.com','21232f297a57a5a743894a0e4a801fc3',NULL,'nhubaoanh111@gmail.com',NULL,NULL,'2025-11-24 14:45:25',1,1,'admin','2025-11-24 14:45:25',NULL),('9ef39219-4c31-4a9b-8632-3a8a4850a01e',NULL,'0aa1a174-c8ed-11f0-8020-a8934a9bae74','nhubaoanh24@gmail.com','348d17136d9f32fb2a6ea7e2fc616ff5','nhubaoanh24@gmail.com','nhubaoanh24@gmail.com',NULL,NULL,'2025-11-24 11:21:25',1,1,NULL,'2025-11-24 11:21:25','system');
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
  `thanhVien1Id` varchar(50) DEFAULT NULL,
  `thanhVien2Id` varchar(50) DEFAULT NULL,
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
  CONSTRAINT `quanhe_ibfk_1` FOREIGN KEY (`thanhVien1Id`) REFERENCES `thanhvien` (`thanhVienId`) ON DELETE CASCADE,
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
INSERT INTO `role` VALUES ('0aa1a174-c8ed-11f0-8020-a8934a9bae74','thanhvien','Thành viên','Role mặc định tạo riêng cho người dùng mới',1,'2025-11-24 11:21:25','9ef39219-4c31-4a9b-8632-3a8a4850a01e','2025-11-24 11:21:25','9ef39219-4c31-4a9b-8632-3a8a4850a01e'),('c2ed095e-c905-11f0-8020-a8934a9bae74','sa','Quản trị hệ thống',NULL,1,'2025-11-24 14:18:23','admin','2025-11-24 14:18:23',NULL);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolefunctions`
--

DROP TABLE IF EXISTS `rolefunctions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolefunctions` (
  `roleFunctionId` varchar(50) NOT NULL,
  `roleId` varchar(50) DEFAULT NULL,
  `functionId` varchar(50) DEFAULT NULL,
  `active_flag` tinyint DEFAULT '1',
  PRIMARY KEY (`roleFunctionId`),
  KEY `roleId` (`roleId`),
  KEY `functionId` (`functionId`),
  CONSTRAINT `rolefunctions_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`),
  CONSTRAINT `rolefunctions_ibfk_2` FOREIGN KEY (`functionId`) REFERENCES `functions` (`functionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolefunctions`
--

LOCK TABLES `rolefunctions` WRITE;
/*!40000 ALTER TABLE `rolefunctions` DISABLE KEYS */;
INSERT INTO `rolefunctions` VALUES ('26f01f9e-c90b-11f0-8020-a8934a9bae74','c2ed095e-c905-11f0-8020-a8934a9bae74','4ff1c7ea-c8ed-11f0-8020-a8934a9bae74',1),('cf31d537-c906-11f0-8020-a8934a9bae74','c2ed095e-c905-11f0-8020-a8934a9bae74','cf31d537-c906-11f0-8020-a8934a9bae74',1);
/*!40000 ALTER TABLE `rolefunctions` ENABLE KEYS */;
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
  `thanhVienId` varchar(50) DEFAULT NULL,
  `tenSuKien` varchar(255) DEFAULT NULL,
  `ngayDienRa` date DEFAULT NULL,
  `gioDienRa` time DEFAULT NULL,
  `diaDiem` varchar(255) DEFAULT NULL,
  `moTa` text,
  `lapLai` tinyint DEFAULT NULL,
  `trangThai` tinyint DEFAULT NULL,
  `active_flag` tinyint DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`suKienId`),
  KEY `dongHoId` (`dongHoId`),
  KEY `thanhVienId` (`thanhVienId`),
  KEY `nguoiTaoId` (`nguoiTaoId`),
  CONSTRAINT `sukien_ibfk_1` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`) ON DELETE CASCADE,
  CONSTRAINT `sukien_ibfk_2` FOREIGN KEY (`thanhVienId`) REFERENCES `thanhvien` (`thanhVienId`) ON DELETE SET NULL,
  CONSTRAINT `sukien_ibfk_3` FOREIGN KEY (`nguoiTaoId`) REFERENCES `nguoidung` (`nguoiDungId`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sukien`
--

LOCK TABLES `sukien` WRITE;
/*!40000 ALTER TABLE `sukien` DISABLE KEYS */;
/*!40000 ALTER TABLE `sukien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tailieu`
--

DROP TABLE IF EXISTS `tailieu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tailieu` (
  `taiLieuId` varchar(50) NOT NULL,
  `thanhVienId` varchar(50) DEFAULT NULL,
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
  `thanhVienId` varchar(50) NOT NULL,
  `dongHoId` varchar(50) DEFAULT NULL,
  `cayId` varchar(50) DEFAULT NULL,
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
  `chaId` varchar(50) DEFAULT NULL,
  `meId` varchar(50) DEFAULT NULL,
  `voId` varchar(50) DEFAULT NULL,
  `chongId` varchar(50) DEFAULT NULL,
  `ngayTao` datetime DEFAULT NULL,
  `trangThai` tinyint DEFAULT NULL,
  `active_flag` tinyint DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`thanhVienId`),
  KEY `dongHoId` (`dongHoId`),
  KEY `cayId` (`cayId`),
  KEY `chaId` (`chaId`),
  KEY `meId` (`meId`),
  KEY `voId` (`voId`),
  KEY `chongId` (`chongId`),
  CONSTRAINT `thanhvien_ibfk_1` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`) ON DELETE CASCADE,
  CONSTRAINT `thanhvien_ibfk_2` FOREIGN KEY (`cayId`) REFERENCES `caygiapha` (`cayId`) ON DELETE CASCADE,
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
-- Dumping routines for database 'family'
--
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
            nd.hoTen,
            nd.roleId,
            nd.dongHoId,
            dh.tenDongHo,
            rl.roleCode,
            rl.roleName,
            p_error_code AS error_code,
            p_error_message AS error_message
        FROM NguoiDung nd
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

    -- Truy vấn kết quả chính
    CREATE TEMPORARY TABLE IF NOT EXISTS Results AS
    SELECT 
        (@row_number := @row_number + 1) AS RowNumber,
        nd.nguoiDungId,
        nd.hoTen,
        nd.tenDangNhap,
        nd.email,
        nd.soDienThoai,
        nd.roleId,
        nd.anhDaiDien,
        nd.ngayTao,
        nd.active_flag,
        dh.tenDongHo
    FROM NguoiDung nd
    LEFT JOIN role rl ON nd.roleId = rl.roleId
    LEFT JOIN DongHo dh ON nd.dongHoId = dh.dongHoId
    WHERE nd.active_flag = 1
      AND (p_dongHoId IS NULL OR nd.dongHoId = p_dongHoId)
      AND (
            p_search_content IS NULL
            OR p_search_content = ''
            OR LOWER(CONCAT(
                COALESCE(nd.tenDangNhap, ''),
                COALESCE(nd.hoTen, ''),
                COALESCE(nd.email, ''),
                COALESCE(nd.soDienThoai, '')
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
    
    -- LỖI ĐƯỢC KHẮC PHỤC: Bỏ dấu chấm phẩy (;) sau SQLEXCEPTION
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Nếu có lỗi SQL, rollback và trả thông báo
        ROLLBACK;
        SET p_error_code = -1;
        SET p_error_message = 'Lỗi khi truy vấn dữ liệu người dùng.'; 
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;

    IF EXISTS (SELECT 1 FROM NguoiDung WHERE tenDangNhap = p_tendangnhap) THEN
        SET p_error_message = 'Tài khoản người dùng đã tồn tại!';
        SET p_error_code = -1;
        ROLLBACK;
    ELSE
        SET v_roleId = UUID();
        
        -- BƯỚC 1: INSERT vào bảng role
        INSERT INTO Role 
            (roleId, roleCode, roleName, description, active_flag, nguoiTaoId, createDate, lu_updated, lu_user_id)
        VALUES 
            (v_roleId, 'thanhvien', 'Thành viên', 'Role mặc định tạo riêng cho người dùng mới', 1, p_userId, NOW(), NOW(), p_userId);

        -- BƯỚC 2: INSERT vào bảng NguoiDung
        -- Vẫn sử dụng phiên bản INSERT đầy đủ để tránh lỗi NOT NULL cho các cột bắt buộc khác
        INSERT INTO NguoiDung 
            (nguoiDungId, tenDangNhap, matKhau, roleId, ngayTao, online_flag, active_flag, hoTen, email, lu_updated, lu_user_id)
        VALUES 
            (p_userId, p_tendangnhap, p_matkhau, v_roleId, NOW(), 1, 1, 
             p_tendangnhap, p_tendangnhap, 
             NOW(), p_userId); 
             
        COMMIT;
    END IF;
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

-- Dump completed on 2025-11-27 10:56:57
