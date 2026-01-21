"""
Configuration for AI Text-to-SQL Service
"""
import os
from dotenv import load_dotenv

load_dotenv()

# Model Configuration
MODEL_NAME = os.getenv("MODEL_NAME", "Qwen/Qwen2.5-Coder-7B-Instruct")
MODEL_CACHE_DIR = os.getenv("MODEL_CACHE_DIR", "./models")
DEVICE = os.getenv("DEVICE", "cuda")
MAX_LENGTH = int(os.getenv("MAX_LENGTH", "2048"))
TEMPERATURE = float(os.getenv("TEMPERATURE", "0.1"))
TOP_P = float(os.getenv("TOP_P", "0.9"))

# Database Configuration
DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": int(os.getenv("DB_PORT", "3306")),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", ""),
    "database": os.getenv("DB_NAME", "family_tree")
}

# API Configuration
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("API_PORT", "7000"))

# Database Schema
DATABASE_SCHEMA = """
CREATE TABLE thanhvien (
    thanhVienId INT PRIMARY KEY,
    dongHoId VARCHAR(50),
    hoTen VARCHAR(255),
    gioiTinh TINYINT,
    ngaySinh DATE,
    ngayMat DATE,
    noiSinh VARCHAR(255),
    noiMat VARCHAR(255),
    ngheNghiep VARCHAR(255),
    trinhDoHocVan VARCHAR(255),
    soDienThoai VARCHAR(11),
    diaChiHienTai VARCHAR(255),
    tieuSu TEXT,
    doiThuoc INT,
    chaId INT,
    meId INT,
    voId INT,
    chongId INT,
    active_flag TINYINT DEFAULT 1
);

CREATE TABLE quanhe (
    quanHeId VARCHAR(50) PRIMARY KEY,
    thanhVien1Id INT,
    thanhVien2Id INT,
    loaiQuanHeId VARCHAR(50),
    dongHoId1 VARCHAR(50),
    dongHoId2 VARCHAR(50)
);

CREATE TABLE loaiquanhe (
    loaiQuanHeId VARCHAR(50) PRIMARY KEY,
    tenLoaiQuanHe VARCHAR(100)
);
"""

# Few-shot Examples
FEW_SHOT_EXAMPLES = [
    {"question": "Nghề nghiệp của Nguyễn Văn A là gì?", "sql": "SELECT ngheNghiep FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ? AND active_flag = 1"},
    {"question": "Nguyễn Văn A sinh năm nào?", "sql": "SELECT YEAR(ngaySinh) as nam_sinh FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ? AND active_flag = 1"},
    {"question": "Nguyễn Văn A là con của ai?", "sql": "SELECT cha.hoTen as ten_cha, me.hoTen as ten_me FROM thanhvien tv LEFT JOIN thanhvien cha ON tv.chaId = cha.thanhVienId AND tv.dongHoId = cha.dongHoId LEFT JOIN thanhvien me ON tv.meId = me.thanhVienId AND tv.dongHoId = me.dongHoId WHERE tv.hoTen = 'Nguyễn Văn A' AND tv.dongHoId = ? AND tv.active_flag = 1"},
    {"question": "Nguyễn Văn A có mấy con?", "sql": "SELECT COUNT(*) as so_con FROM thanhvien WHERE (chaId = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ? AND active_flag = 1) OR meId = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ? AND active_flag = 1)) AND dongHoId = ? AND active_flag = 1"},
    {"question": "Con của Nguyễn Văn A tên gì?", "sql": "SELECT hoTen, gioiTinh FROM thanhvien WHERE (chaId = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ? AND active_flag = 1) OR meId = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ? AND active_flag = 1)) AND dongHoId = ? AND active_flag = 1"},
    {"question": "Vợ của Nguyễn Văn A tên gì?", "sql": "SELECT vo.hoTen FROM thanhvien tv JOIN thanhvien vo ON tv.voId = vo.thanhVienId AND tv.dongHoId = vo.dongHoId WHERE tv.hoTen = 'Nguyễn Văn A' AND tv.dongHoId = ? AND tv.active_flag = 1"},
    {"question": "Chồng của Trần Thị B tên gì?", "sql": "SELECT chong.hoTen FROM thanhvien tv JOIN thanhvien chong ON tv.chongId = chong.thanhVienId AND tv.dongHoId = chong.dongHoId WHERE tv.hoTen = 'Trần Thị B' AND tv.dongHoId = ? AND tv.active_flag = 1"},
    {"question": "Ai là con trai của Nguyễn Văn A?", "sql": "SELECT hoTen FROM thanhvien WHERE (chaId = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ? AND active_flag = 1) OR meId = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ? AND active_flag = 1)) AND gioiTinh = 1 AND dongHoId = ? AND active_flag = 1"},
    {"question": "Ai là con gái của Nguyễn Văn A?", "sql": "SELECT hoTen FROM thanhvien WHERE (chaId = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ? AND active_flag = 1) OR meId = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ? AND active_flag = 1)) AND gioiTinh = 0 AND dongHoId = ? AND active_flag = 1"},
    {"question": "Ông nội của Nguyễn Văn C tên gì?", "sql": "SELECT ong.hoTen FROM thanhvien tv JOIN thanhvien cha ON tv.chaId = cha.thanhVienId AND tv.dongHoId = cha.dongHoId JOIN thanhvien ong ON cha.chaId = ong.thanhVienId AND cha.dongHoId = ong.dongHoId WHERE tv.hoTen = 'Nguyễn Văn C' AND tv.dongHoId = ? AND tv.active_flag = 1"},
    {"question": "Có bao nhiêu người trong gia phả?", "sql": "SELECT COUNT(*) as tong_so FROM thanhvien WHERE dongHoId = ? AND active_flag = 1"},
    {"question": "Ai là người lớn tuổi nhất?", "sql": "SELECT hoTen, ngaySinh FROM thanhvien WHERE dongHoId = ? AND active_flag = 1 ORDER BY ngaySinh ASC LIMIT 1"},
    {"question": "Có bao nhiêu người làm nông dân?", "sql": "SELECT COUNT(*) as so_luong FROM thanhvien WHERE ngheNghiep = 'Nông dân' AND dongHoId = ? AND active_flag = 1"}
]
