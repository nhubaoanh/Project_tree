# 📊 KẾ HOẠCH XÂY DỰNG HỆ THỐNG AI TEXT-TO-SQL CHO GIA PHẢ

## 🔍 PHÂN TÍCH DATABASE HIỆN TẠI

### Cấu trúc bảng `thanhvien` (Members):
```sql
CREATE TABLE `thanhvien` (
  `thanhVienId` int NOT NULL,
  `dongHoId` varchar(50) NOT NULL,
  `hoTen` varchar(255),           -- Tên đầy đủ
  `gioiTinh` tinyint,              -- 0: Nữ, 1: Nam
  `ngaySinh` date,
  `ngayMat` date,
  `noiSinh` varchar(255),
  `noiMat` varchar(255),
  `ngheNghiep` varchar(255),       -- Nghề nghiệp
  `trinhDoHocVan` varchar(255),
  `soDienThoai` varchar(11),
  `diaChiHienTai` varchar(255),
  `tieuSu` text,
  `anhChanDung` varchar(255),
  `doiThuoc` int,                  -- Đời thứ (generation)
  
  -- QUAN HỆ GIA ĐÌNH (Lưu trực tiếp trong bảng)
  `chaId` int,                     -- ID của cha
  `meId` int,                      -- ID của mẹ
  `voId` int,                      -- ID của vợ (nếu là nam)
  `chongId` int,                   -- ID của chồng (nếu là nữ)
  
  PRIMARY KEY (`dongHoId`, `thanhVienId`),
  FOREIGN KEY (`dongHoId`, `chaId`) REFERENCES `thanhvien`,
  FOREIGN KEY (`dongHoId`, `meId`) REFERENCES `thanhvien`
)
```

### Bảng `quanhe` (Relationships):
```sql
CREATE TABLE `quanhe` (
  `quanHeId` varchar(50) NOT NULL,
  `thanhVien1Id` int,
  `thanhVien2Id` int,
  `loaiQuanHeId` varchar(50),
  `ngayBatDau` date,
  `ngayKetThuc` date,
  `ghiChu` text,
  PRIMARY KEY (`quanHeId`)
)
```

**⚠️ VẤN ĐỀ HIỆN TẠI:**
- Bảng `quanhe` TRỐNG (không có data)
- Bảng `loaiquanhe` TRỐNG (không có định nghĩa loại quan hệ)
- Tất cả quan hệ đang lưu trong bảng `thanhvien` qua các cột: `chaId`, `meId`, `voId`, `chongId`

---

## 💡 ĐỀ XUẤT CẤU TRÚC MỚI

### Option 1: GIỮ NGUYÊN CẤU TRÚC HIỆN TẠI ⭐ KHUYẾN NGHỊ
**Ưu điểm:**
- Không cần migration data
- Query đơn giản, nhanh
- Phù hợp với cây gia phả (parent-child relationship)

**Nhược điểm:**
- Khó mở rộng cho các quan hệ phức tạp (anh em, cô dì, chú bác...)
- Bảng `quanhe` không được sử dụng

**Cách xử lý:**
```sql
-- Tìm cha mẹ của một người
SELECT 
    cha.hoTen as ten_cha,
    me.hoTen as ten_me
FROM thanhvien tv
LEFT JOIN thanhvien cha ON tv.chaId = cha.thanhVienId AND tv.dongHoId = cha.dongHoId
LEFT JOIN thanhvien me ON tv.meId = me.thanhVienId AND tv.dongHoId = me.dongHoId
WHERE tv.hoTen = 'Nguyễn Văn A' AND tv.dongHoId = ?

-- Tìm con của một người
SELECT hoTen, gioiTinh, ngheNghiep
FROM thanhvien
WHERE (chaId = ? OR meId = ?) AND dongHoId = ?

-- Tìm vợ/chồng
SELECT 
    CASE 
        WHEN tv.gioiTinh = 1 THEN vo.hoTen
        ELSE chong.hoTen
    END as ten_vo_chong
FROM thanhvien tv
LEFT JOIN thanhvien vo ON tv.voId = vo.thanhVienId AND tv.dongHoId = vo.dongHoId
LEFT JOIN thanhvien chong ON tv.chongId = chong.thanhVienId AND tv.dongHoId = chong.dongHoId
WHERE tv.hoTen = 'Nguyễn Văn A' AND tv.dongHoId = ?
```

### Option 2: SỬ DỤNG BẢNG `quanhe` (Cần migration)
**Ưu điểm:**
- Linh hoạt, mở rộng dễ dàng
- Có thể lưu nhiều loại quan hệ phức tạp
- Chuẩn database design

**Nhược điểm:**
- Cần migrate toàn bộ data hiện tại
- Query phức tạp hơn
- Cần populate bảng `loaiquanhe`

**Cấu trúc đề xuất:**
```sql
-- Bảng loại quan hệ
INSERT INTO loaiquanhe VALUES
('LQH001', 'Cha - Con', 'Quan hệ cha con', 1, 'system', NOW(), NULL),
('LQH002', 'Mẹ - Con', 'Quan hệ mẹ con', 1, 'system', NOW(), NULL),
('LQH003', 'Vợ - Chồng', 'Quan hệ vợ chồng', 1, 'system', NOW(), NULL),
('LQH004', 'Anh - Em', 'Quan hệ anh em ruột', 1, 'system', NOW(), NULL);

-- Migration script để chuyển data từ thanhvien sang quanhe
INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2)
SELECT 
    UUID() as quanHeId,
    chaId as thanhVien1Id,
    thanhVienId as thanhVien2Id,
    'LQH001' as loaiQuanHeId,
    dongHoId as dongHoId1,
    dongHoId as dongHoId2
FROM thanhvien
WHERE chaId IS NOT NULL;
```

---

## 🎯 QUYẾT ĐỊNH: OPTION 1 - GIỮ NGUYÊN CẤU TRÚC

**Lý do:**
1. Không cần migration (rủi ro thấp)
2. Đủ đáp ứng 90% câu hỏi thông thường
3. Performance tốt hơn
4. Dễ maintain

**Kế hoạch:**
- Sử dụng cấu trúc hiện tại với `chaId`, `meId`, `voId`, `chongId`
- Bổ sung bảng `quanhe` sau nếu cần (cho quan hệ phức tạp)

---

## 🤖 CHỌN MODEL TIẾNG VIỆT TỪ HUGGING FACE

### Tiêu chí lựa chọn:
1. ✅ Hiểu tiếng Việt tốt
2. ✅ Có thể fine-tune
3. ✅ Kích thước phù hợp (< 10B parameters)
4. ✅ Open source
5. ✅ Có community support

### Top 5 Models đề xuất:

#### 1. **Qwen/Qwen2.5-Coder-7B-Instruct** ⭐⭐⭐⭐⭐ KHUYẾN NGHỊ
- **Link**: https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct
- **Size**: 7B parameters
- **Ưu điểm**:
  - Hiểu tiếng Việt tốt (multilingual)
  - Chuyên về code generation (SQL là code)
  - Có thể chạy local với Ollama
  - Đã có sẵn trong hệ thống của bạn
  - Community lớn
- **Nhược điểm**:
  - Cần fine-tune để tốt hơn với SQL
- **Đánh giá**: 9/10

#### 2. **defog/sqlcoder-7b-2**
- **Link**: https://huggingface.co/defog/sqlcoder-7b-2
- **Size**: 7B parameters
- **Ưu điểm**:
  - Chuyên về SQL generation
  - Accuracy cao trên Spider benchmark
  - Đã được train với nhiều database schema
- **Nhược điểm**:
  - Không hiểu tiếng Việt tốt
  - Cần fine-tune nhiều cho tiếng Việt
- **Đánh giá**: 7/10

#### 3. **vinai/PhoGPT-7B5-Instruct**
- **Link**: https://huggingface.co/vinai/PhoGPT-7B5-Instruct
- **Size**: 7.5B parameters
- **Ưu điểm**:
  - Model tiếng Việt thuần túy
  - Hiểu context Việt Nam tốt
  - Được train bởi VinAI
- **Nhược điểm**:
  - Không chuyên về SQL
  - Cần fine-tune nhiều
  - Community nhỏ hơn
- **Đánh giá**: 6/10

#### 4. **meta-llama/Llama-3.1-8B-Instruct**
- **Link**: https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct
- **Size**: 8B parameters
- **Ưu điểm**:
  - Model mạnh, đa năng
  - Hiểu nhiều ngôn ngữ (bao gồm tiếng Việt)
  - Community lớn
- **Nhược điểm**:
  - Cần license từ Meta
  - Không chuyên về SQL
- **Đánh giá**: 8/10

#### 5. **microsoft/phi-3-mini-4k-instruct**
- **Link**: https://huggingface.co/microsoft/phi-3-mini-4k-instruct
- **Size**: 3.8B parameters
- **Ưu điểm**:
  - Nhỏ gọn, chạy nhanh
  - Hiểu tiếng Việt khá tốt
  - Có thể chạy trên GPU yếu
- **Nhược điểm**:
  - Accuracy thấp hơn model lớn
  - Không chuyên về SQL
- **Đánh giá**: 7/10

---

## 🏆 QUYẾT ĐỊNH CUỐI CÙNG

### Model chính: **Qwen/Qwen2.5-Coder-7B-Instruct**

**Lý do:**
1. Bạn đã có Ollama với Qwen2.5 setup sẵn
2. Hiểu tiếng Việt tốt
3. Chuyên về code/SQL generation
4. Có thể fine-tune với LoRA
5. Community support tốt

### Chiến lược:
**Phase 1: Prompt Engineering (1 tuần)**
- Test với prompt tốt trước
- Không cần train
- Đánh giá accuracy

**Phase 2: Few-shot Learning (1 tuần)**
- Thêm examples vào prompt
- Cải thiện accuracy

**Phase 3: Fine-tuning với LoRA (2-3 tuần)**
- Nếu Phase 1-2 không đủ tốt
- Train với 500-1000 examples
- Sử dụng LoRA để nhẹ hơn

---

## 📝 DATASET TRAINING CẦN TẠO

### Cấu trúc file JSON:
```json
{
  "schema": "...",  // Database schema
  "question": "...", // Câu hỏi tiếng Việt
  "sql": "...",      // SQL query
  "explanation": "..." // Giải thích (optional)
}
```

### Các loại câu hỏi cần cover:

#### 1. Thông tin cá nhân (20%)
```json
{
  "question": "Nghề nghiệp của Nguyễn Văn A là gì?",
  "sql": "SELECT ngheNghiep FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ?"
}
```

#### 2. Quan hệ cha mẹ (25%)
```json
{
  "question": "Nguyễn Văn A là con của ai?",
  "sql": "SELECT cha.hoTen as ten_cha, me.hoTen as ten_me FROM thanhvien tv LEFT JOIN thanhvien cha ON tv.chaId = cha.thanhVienId AND tv.dongHoId = cha.dongHoId LEFT JOIN thanhvien me ON tv.meId = me.thanhVienId AND tv.dongHoId = me.dongHoId WHERE tv.hoTen = 'Nguyễn Văn A' AND tv.dongHoId = ?"
}
```

#### 3. Tìm con cái (20%)
```json
{
  "question": "Nguyễn Văn A có mấy con?",
  "sql": "SELECT COUNT(*) as so_con FROM thanhvien WHERE (chaId = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ?) OR meId = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ?)) AND dongHoId = ?"
}
```

#### 4. Vợ/chồng (15%)
```json
{
  "question": "Vợ của Nguyễn Văn A tên gì?",
  "sql": "SELECT vo.hoTen FROM thanhvien tv JOIN thanhvien vo ON tv.voId = vo.thanhVienId AND tv.dongHoId = vo.dongHoId WHERE tv.hoTen = 'Nguyễn Văn A' AND tv.dongHoId = ?"
}
```

#### 5. Lọc theo giới tính (10%)
```json
{
  "question": "Ai là con trai của Nguyễn Văn A?",
  "sql": "SELECT hoTen FROM thanhvien WHERE (chaId = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ?) OR meId = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ?)) AND gioiTinh = 1 AND dongHoId = ?"
}
```

#### 6. Quan hệ phức tạp (10%)
```json
{
  "question": "Ông nội của Nguyễn Văn A tên gì?",
  "sql": "SELECT ong.hoTen FROM thanhvien tv JOIN thanhvien cha ON tv.chaId = cha.thanhVienId AND tv.dongHoId = cha.dongHoId JOIN thanhvien ong ON cha.chaId = ong.thanhVienId AND cha.dongHoId = ong.dongHoId WHERE tv.hoTen = 'Nguyễn Văn A' AND tv.dongHoId = ?"
}
```

### Số lượng examples cần thiết:
- **Minimum**: 200 examples (40 mỗi loại)
- **Good**: 500 examples (100 mỗi loại)
- **Best**: 1000+ examples (200+ mỗi loại)

---

## 🛠️ CÔNG CỤ VÀ SETUP

### Hardware yêu cầu:
- **Minimum**: GPU 8GB VRAM (RTX 3060)
- **Recommended**: GPU 16GB+ VRAM (RTX 4090, A100)
- **Alternative**: Google Colab Pro ($10/month)

### Software stack:
```bash
# Python packages
pip install transformers torch peft bitsandbytes accelerate datasets sqlparse

# Ollama (đã có)
ollama pull qwen2.5-coder:7b
```

### Training với LoRA:
```python
from peft import LoraConfig, get_peft_model

lora_config = LoraConfig(
    r=16,  # Rank
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)
```

---

## 📋 KẾ HOẠCH THỰC HIỆN CHI TIẾT

### Week 1: Setup & Data Preparation
- [ ] Export database schema đầy đủ
- [ ] Tạo 50 câu hỏi mẫu + SQL
- [ ] Setup Qwen2.5-Coder local
- [ ] Test prompt engineering

### Week 2: Prompt Engineering
- [ ] Thiết kế prompt template tốt
- [ ] Test với 50 examples
- [ ] Đánh giá accuracy
- [ ] Quyết định có cần fine-tune không

### Week 3-4: Data Generation (nếu cần fine-tune)
- [ ] Tạo 500-1000 examples
- [ ] Validate data quality
- [ ] Split train/val/test (80/10/10)

### Week 5-6: Fine-tuning (nếu cần)
- [ ] Setup training environment
- [ ] Fine-tune với LoRA
- [ ] Evaluate và optimize
- [ ] Save best model

### Week 7: Integration
- [ ] Tích hợp vào backend
- [ ] Tạo API endpoint
- [ ] Testing end-to-end
- [ ] Deploy

---

## 🎯 BƯỚC TIẾP THEO

Bạn cần trả lời:

1. **GPU**: Bạn có GPU không? Loại gì? VRAM bao nhiêu?
2. **Budget**: Có thể dùng Colab Pro không?
3. **Timeline**: Cần hoàn thành trong bao lâu?
4. **Accuracy target**: Cần độ chính xác bao nhiêu % để chấp nhận?
5. **Data**: Bạn có thể tạo được bao nhiêu câu hỏi mẫu?

Sau khi có câu trả lời, tôi sẽ:
1. ✅ Viết script export database schema
2. ✅ Tạo template generate training data
3. ✅ Viết code test với Qwen2.5-Coder
4. ✅ Thiết kế prompt template tối ưu
5. ✅ Hướng dẫn fine-tuning nếu cần

**Bạn muốn bắt đầu từ đâu?**
