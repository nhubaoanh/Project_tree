# 🔄 GIẢI PHÁP TỰ ĐỘNG ĐỒNG BỘ BẢNG QUAN HỆ

## 🎯 MỤC TIÊU
Khi import/update bảng `thanhvien`, tự động tạo/cập nhật records trong bảng `quanhe` để:
1. ✅ Query quan hệ phức tạp dễ dàng (ông bà, cô dì, chú bác...)
2. ✅ Hỗ trợ AI Text-to-SQL tốt hơn
3. ✅ Mở rộng được trong tương lai

---

## 📊 THIẾT KẾ BẢNG `loaiquanhe`

### Các loại quan hệ cần có:

```sql
-- Xóa data cũ nếu có
DELETE FROM loaiquanhe;

-- Insert các loại quan hệ
INSERT INTO loaiquanhe (loaiQuanHeId, tenLoaiQuanHe, moTa, active_flag, nguoiTaoId, lu_updated, lu_user_id) VALUES
-- Quan hệ trực tiếp
('LQH_CHA_CON', 'Cha - Con', 'Quan hệ cha con trực tiếp', 1, 'system', NOW(), 'system'),
('LQH_ME_CON', 'Mẹ - Con', 'Quan hệ mẹ con trực tiếp', 1, 'system', NOW(), 'system'),
('LQH_VO_CHONG', 'Vợ - Chồng', 'Quan hệ vợ chồng', 1, 'system', NOW(), 'system'),

-- Quan hệ anh chị em
('LQH_ANH_EM', 'Anh - Em', 'Anh em ruột (cùng cha mẹ)', 1, 'system', NOW(), 'system'),
('LQH_CHI_EM', 'Chị - Em', 'Chị em ruột (cùng cha mẹ)', 1, 'system', NOW(), 'system'),

-- Quan hệ ông bà
('LQH_ONG_CHAU', 'Ông - Cháu', 'Ông nội/ngoại - Cháu', 1, 'system', NOW(), 'system'),
('LQH_BA_CHAU', 'Bà - Cháu', 'Bà nội/ngoại - Cháu', 1, 'system', NOW(), 'system'),

-- Quan hệ chú bác cô dì
('LQH_CHU_CHAU', 'Chú - Cháu', 'Chú (em trai của cha) - Cháu', 1, 'system', NOW(), 'system'),
('LQH_BAC_CHAU', 'Bác - Cháu', 'Bác (anh trai của cha) - Cháu', 1, 'system', NOW(), 'system'),
('LQH_CO_CHAU', 'Cô - Cháu', 'Cô (chị em gái của cha) - Cháu', 1, 'system', NOW(), 'system'),
('LQH_DI_CHAU', 'Dì - Cháu', 'Dì (chị em gái của mẹ) - Cháu', 1, 'system', NOW(), 'system'),
('LQH_CAU_CHAU', 'Cậu - Cháu', 'Cậu (anh em trai của mẹ) - Cháu', 1, 'system', NOW(), 'system');
```

---

## 🔧 GIẢI PHÁP 1: STORED PROCEDURE TỰ ĐỘNG TẠO QUAN HỆ

### Tạo Stored Procedure:

```sql
DELIMITER $$

CREATE PROCEDURE SyncRelationships(IN p_dongHoId VARCHAR(50))
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_thanhVienId INT;
    DECLARE v_chaId INT;
    DECLARE v_meId INT;
    DECLARE v_voId INT;
    DECLARE v_chongId INT;
    DECLARE v_gioiTinh TINYINT;
    
    -- Cursor để duyệt qua tất cả thành viên
    DECLARE cur CURSOR FOR 
        SELECT thanhVienId, chaId, meId, voId, chongId, gioiTinh 
        FROM thanhvien 
        WHERE dongHoId = p_dongHoId AND active_flag = 1;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    -- Xóa tất cả quan hệ cũ của dòng họ này
    DELETE FROM quanhe WHERE dongHoId1 = p_dongHoId;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO v_thanhVienId, v_chaId, v_meId, v_voId, v_chongId, v_gioiTinh;
        
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- 1. Tạo quan hệ CHA - CON
        IF v_chaId IS NOT NULL THEN
            INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
            VALUES (UUID(), v_chaId, v_thanhVienId, 'LQH_CHA_CON', p_dongHoId, p_dongHoId, 1, 'system');
        END IF;
        
        -- 2. Tạo quan hệ MẸ - CON
        IF v_meId IS NOT NULL THEN
            INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
            VALUES (UUID(), v_meId, v_thanhVienId, 'LQH_ME_CON', p_dongHoId, p_dongHoId, 1, 'system');
        END IF;
        
        -- 3. Tạo quan hệ VỢ - CHỒNG
        IF v_gioiTinh = 1 AND v_voId IS NOT NULL THEN
            -- Nam có vợ
            INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
            VALUES (UUID(), v_thanhVienId, v_voId, 'LQH_VO_CHONG', p_dongHoId, p_dongHoId, 1, 'system');
        END IF;
        
        IF v_gioiTinh = 0 AND v_chongId IS NOT NULL THEN
            -- Nữ có chồng
            INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
            VALUES (UUID(), v_chongId, v_thanhVienId, 'LQH_VO_CHONG', p_dongHoId, p_dongHoId, 1, 'system');
        END IF;
        
        -- 4. Tạo quan hệ ANH CHỊ EM (cùng cha mẹ)
        IF v_chaId IS NOT NULL AND v_meId IS NOT NULL THEN
            -- Tìm tất cả anh chị em ruột
            INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
            SELECT 
                UUID(),
                v_thanhVienId,
                tv2.thanhVienId,
                CASE 
                    WHEN v_gioiTinh = 1 THEN 'LQH_ANH_EM'
                    ELSE 'LQH_CHI_EM'
                END,
                p_dongHoId,
                p_dongHoId,
                1,
                'system'
            FROM thanhvien tv2
            WHERE tv2.dongHoId = p_dongHoId
                AND tv2.thanhVienId != v_thanhVienId
                AND tv2.chaId = v_chaId
                AND tv2.meId = v_meId
                AND tv2.active_flag = 1
                AND NOT EXISTS (
                    SELECT 1 FROM quanhe 
                    WHERE thanhVien1Id = v_thanhVienId 
                    AND thanhVien2Id = tv2.thanhVienId
                    AND dongHoId1 = p_dongHoId
                );
        END IF;
        
        -- 5. Tạo quan hệ ÔNG BÀ - CHÁU
        IF v_chaId IS NOT NULL THEN
            -- Ông nội (cha của cha)
            INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
            SELECT UUID(), cha.chaId, v_thanhVienId, 'LQH_ONG_CHAU', p_dongHoId, p_dongHoId, 1, 'system'
            FROM thanhvien cha
            WHERE cha.dongHoId = p_dongHoId 
                AND cha.thanhVienId = v_chaId 
                AND cha.chaId IS NOT NULL;
            
            -- Bà nội (mẹ của cha)
            INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
            SELECT UUID(), cha.meId, v_thanhVienId, 'LQH_BA_CHAU', p_dongHoId, p_dongHoId, 1, 'system'
            FROM thanhvien cha
            WHERE cha.dongHoId = p_dongHoId 
                AND cha.thanhVienId = v_chaId 
                AND cha.meId IS NOT NULL;
        END IF;
        
        IF v_meId IS NOT NULL THEN
            -- Ông ngoại (cha của mẹ)
            INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
            SELECT UUID(), me.chaId, v_thanhVienId, 'LQH_ONG_CHAU', p_dongHoId, p_dongHoId, 1, 'system'
            FROM thanhvien me
            WHERE me.dongHoId = p_dongHoId 
                AND me.thanhVienId = v_meId 
                AND me.chaId IS NOT NULL;
            
            -- Bà ngoại (mẹ của mẹ)
            INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
            SELECT UUID(), me.meId, v_thanhVienId, 'LQH_BA_CHAU', p_dongHoId, p_dongHoId, 1, 'system'
            FROM thanhvien me
            WHERE me.dongHoId = p_dongHoId 
                AND me.thanhVienId = v_meId 
                AND me.meId IS NOT NULL;
        END IF;
        
        -- 6. Tạo quan hệ CHÚ BÁC CÔ DÌ CẬU
        IF v_chaId IS NOT NULL THEN
            -- Chú, Bác, Cô (anh chị em của cha)
            INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
            SELECT 
                UUID(),
                chu_bac_co.thanhVienId,
                v_thanhVienId,
                CASE 
                    WHEN chu_bac_co.gioiTinh = 1 AND chu_bac_co.thanhVienId < v_chaId THEN 'LQH_BAC_CHAU'
                    WHEN chu_bac_co.gioiTinh = 1 AND chu_bac_co.thanhVienId > v_chaId THEN 'LQH_CHU_CHAU'
                    ELSE 'LQH_CO_CHAU'
                END,
                p_dongHoId,
                p_dongHoId,
                1,
                'system'
            FROM thanhvien cha
            JOIN thanhvien chu_bac_co ON chu_bac_co.dongHoId = cha.dongHoId
                AND chu_bac_co.chaId = cha.chaId
                AND chu_bac_co.meId = cha.meId
                AND chu_bac_co.thanhVienId != cha.thanhVienId
            WHERE cha.dongHoId = p_dongHoId 
                AND cha.thanhVienId = v_chaId
                AND chu_bac_co.active_flag = 1;
        END IF;
        
        IF v_meId IS NOT NULL THEN
            -- Dì, Cậu (anh chị em của mẹ)
            INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
            SELECT 
                UUID(),
                di_cau.thanhVienId,
                v_thanhVienId,
                CASE 
                    WHEN di_cau.gioiTinh = 1 THEN 'LQH_CAU_CHAU'
                    ELSE 'LQH_DI_CHAU'
                END,
                p_dongHoId,
                p_dongHoId,
                1,
                'system'
            FROM thanhvien me
            JOIN thanhvien di_cau ON di_cau.dongHoId = me.dongHoId
                AND di_cau.chaId = me.chaId
                AND di_cau.meId = me.meId
                AND di_cau.thanhVienId != me.thanhVienId
            WHERE me.dongHoId = p_dongHoId 
                AND me.thanhVienId = v_meId
                AND di_cau.active_flag = 1;
        END IF;
        
    END LOOP;
    
    CLOSE cur;
    
    -- Log kết quả
    SELECT COUNT(*) as total_relationships FROM quanhe WHERE dongHoId1 = p_dongHoId;
    
END$$

DELIMITER ;
```

---

## 🔧 GIẢI PHÁP 2: TRIGGER TỰ ĐỘNG

### Tạo Trigger khi INSERT/UPDATE thành viên:

```sql
DELIMITER $$

-- Trigger sau khi INSERT thành viên
CREATE TRIGGER after_thanhvien_insert
AFTER INSERT ON thanhvien
FOR EACH ROW
BEGIN
    -- Gọi stored procedure để sync quan hệ
    CALL SyncRelationships(NEW.dongHoId);
END$$

-- Trigger sau khi UPDATE thành viên
CREATE TRIGGER after_thanhvien_update
AFTER UPDATE ON thanhvien
FOR EACH ROW
BEGIN
    -- Chỉ sync nếu có thay đổi về quan hệ
    IF (OLD.chaId != NEW.chaId OR OLD.meId != NEW.meId OR 
        OLD.voId != NEW.voId OR OLD.chongId != NEW.chongId) THEN
        CALL SyncRelationships(NEW.dongHoId);
    END IF;
END$$

-- Trigger sau khi DELETE thành viên
CREATE TRIGGER after_thanhvien_delete
AFTER DELETE ON thanhvien
FOR EACH ROW
BEGIN
    -- Xóa tất cả quan hệ liên quan
    DELETE FROM quanhe 
    WHERE (thanhVien1Id = OLD.thanhVienId OR thanhVien2Id = OLD.thanhVienId)
        AND dongHoId1 = OLD.dongHoId;
END$$

DELIMITER ;
```

---

## 🔧 GIẢI PHÁP 3: BACKEND SERVICE (Khuyến nghị)

### Tạo service trong backend để sync:

```typescript
// myFamilyTree/src/services/relationshipSyncService.ts

import { injectable } from "tsyringe";
import { Connection } from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";

interface RelationshipType {
  code: string;
  name: string;
}

@injectable()
export class RelationshipSyncService {
  
  /**
   * Đồng bộ tất cả quan hệ cho một dòng họ
   */
  async syncAllRelationships(dongHoId: string, connection: Connection): Promise<void> {
    try {
      // 1. Xóa tất cả quan hệ cũ
      await connection.execute(
        'DELETE FROM quanhe WHERE dongHoId1 = ?',
        [dongHoId]
      );

      // 2. Lấy tất cả thành viên
      const [members] = await connection.execute(
        `SELECT thanhVienId, chaId, meId, voId, chongId, gioiTinh 
         FROM thanhvien 
         WHERE dongHoId = ? AND active_flag = 1`,
        [dongHoId]
      );

      // 3. Tạo quan hệ cho từng thành viên
      for (const member of members as any[]) {
        await this.createRelationshipsForMember(member, dongHoId, connection);
      }

      console.log(`✅ Synced relationships for dongHoId: ${dongHoId}`);
    } catch (error) {
      console.error('❌ Error syncing relationships:', error);
      throw error;
    }
  }

  /**
   * Tạo quan hệ cho một thành viên
   */
  private async createRelationshipsForMember(
    member: any, 
    dongHoId: string, 
    connection: Connection
  ): Promise<void> {
    const relationships: any[] = [];

    // 1. Quan hệ CHA - CON
    if (member.chaId) {
      relationships.push({
        quanHeId: uuidv4(),
        thanhVien1Id: member.chaId,
        thanhVien2Id: member.thanhVienId,
        loaiQuanHeId: 'LQH_CHA_CON',
        dongHoId1: dongHoId,
        dongHoId2: dongHoId,
        active_flag: 1,
        nguoiTaoId: 'system'
      });
    }

    // 2. Quan hệ MẸ - CON
    if (member.meId) {
      relationships.push({
        quanHeId: uuidv4(),
        thanhVien1Id: member.meId,
        thanhVien2Id: member.thanhVienId,
        loaiQuanHeId: 'LQH_ME_CON',
        dongHoId1: dongHoId,
        dongHoId2: dongHoId,
        active_flag: 1,
        nguoiTaoId: 'system'
      });
    }

    // 3. Quan hệ VỢ - CHỒNG
    if (member.gioiTinh === 1 && member.voId) {
      relationships.push({
        quanHeId: uuidv4(),
        thanhVien1Id: member.thanhVienId,
        thanhVien2Id: member.voId,
        loaiQuanHeId: 'LQH_VO_CHONG',
        dongHoId1: dongHoId,
        dongHoId2: dongHoId,
        active_flag: 1,
        nguoiTaoId: 'system'
      });
    }

    if (member.gioiTinh === 0 && member.chongId) {
      relationships.push({
        quanHeId: uuidv4(),
        thanhVien1Id: member.chongId,
        thanhVien2Id: member.thanhVienId,
        loaiQuanHeId: 'LQH_VO_CHONG',
        dongHoId1: dongHoId,
        dongHoId2: dongHoId,
        active_flag: 1,
        nguoiTaoId: 'system'
      });
    }

    // 4. Quan hệ ÔNG BÀ - CHÁU
    if (member.chaId) {
      // Ông nội, Bà nội
      const [grandparents] = await connection.execute(
        `SELECT chaId as ongId, meId as baId 
         FROM thanhvien 
         WHERE dongHoId = ? AND thanhVienId = ?`,
        [dongHoId, member.chaId]
      );

      if (grandparents && (grandparents as any[]).length > 0) {
        const gp = (grandparents as any[])[0];
        if (gp.ongId) {
          relationships.push({
            quanHeId: uuidv4(),
            thanhVien1Id: gp.ongId,
            thanhVien2Id: member.thanhVienId,
            loaiQuanHeId: 'LQH_ONG_CHAU',
            dongHoId1: dongHoId,
            dongHoId2: dongHoId,
            active_flag: 1,
            nguoiTaoId: 'system'
          });
        }
        if (gp.baId) {
          relationships.push({
            quanHeId: uuidv4(),
            thanhVien1Id: gp.baId,
            thanhVien2Id: member.thanhVienId,
            loaiQuanHeId: 'LQH_BA_CHAU',
            dongHoId1: dongHoId,
            dongHoId2: dongHoId,
            active_flag: 1,
            nguoiTaoId: 'system'
          });
        }
      }
    }

    // Insert tất cả quan hệ
    if (relationships.length > 0) {
      const values = relationships.map(r => [
        r.quanHeId, r.thanhVien1Id, r.thanhVien2Id, r.loaiQuanHeId,
        r.dongHoId1, r.dongHoId2, r.active_flag, r.nguoiTaoId
      ]);

      await connection.query(
        `INSERT INTO quanhe 
         (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId) 
         VALUES ?`,
        [values]
      );
    }
  }

  /**
   * Gọi sau khi import thành viên
   */
  async syncAfterImport(dongHoId: string): Promise<void> {
    const connection = await this.getConnection();
    try {
      await this.syncAllRelationships(dongHoId, connection);
    } finally {
      await connection.end();
    }
  }

  private async getConnection(): Promise<Connection> {
    // Implement connection logic
    throw new Error('Not implemented');
  }
}
```

### Tích hợp vào import controller:

```typescript
// myFamilyTree/src/controllers/thanhVienController.ts

async importMembers(req: Request, res: Response): Promise<void> {
  try {
    const { dongHoId, members } = req.body;
    
    // 1. Import thành viên
    await this.thanhVienService.importMembers(dongHoId, members);
    
    // 2. Đồng bộ quan hệ
    await this.relationshipSyncService.syncAfterImport(dongHoId);
    
    res.json({
      success: true,
      message: 'Import thành công và đã đồng bộ quan hệ'
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
}
```

---

## 📊 VÍ DỤ QUERY SAU KHI CÓ BẢNG QUAN HỆ

### 1. Tìm ông nội:
```sql
SELECT tv.hoTen as ten_ong_noi
FROM quanhe qh
JOIN thanhvien tv ON qh.thanhVien1Id = tv.thanhVienId AND qh.dongHoId1 = tv.dongHoId
WHERE qh.thanhVien2Id = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ?)
  AND qh.loaiQuanHeId = 'LQH_ONG_CHAU'
  AND qh.dongHoId1 = ?
```

### 2. Tìm tất cả chú bác:
```sql
SELECT tv.hoTen, qh.loaiQuanHeId
FROM quanhe qh
JOIN thanhvien tv ON qh.thanhVien1Id = tv.thanhVienId AND qh.dongHoId1 = tv.dongHoId
WHERE qh.thanhVien2Id = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ?)
  AND qh.loaiQuanHeId IN ('LQH_CHU_CHAU', 'LQH_BAC_CHAU', 'LQH_CO_CHAU')
  AND qh.dongHoId1 = ?
```

### 3. Tìm anh chị em:
```sql
SELECT tv.hoTen, tv.gioiTinh
FROM quanhe qh
JOIN thanhvien tv ON qh.thanhVien2Id = tv.thanhVienId AND qh.dongHoId2 = tv.dongHoId
WHERE qh.thanhVien1Id = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ?)
  AND qh.loaiQuanHeId IN ('LQH_ANH_EM', 'LQH_CHI_EM')
  AND qh.dongHoId1 = ?
```

---

## 🎯 KHUYẾN NGHỊ

### Chọn Giải pháp 3: Backend Service

**Lý do:**
1. ✅ Linh hoạt, dễ maintain
2. ✅ Có thể test và debug dễ dàng
3. ✅ Không phụ thuộc vào database triggers
4. ✅ Có thể gọi manual khi cần
5. ✅ Log và error handling tốt hơn

### Kế hoạch triển khai:

**Bước 1**: Tạo bảng `loaiquanhe` (chạy SQL)
**Bước 2**: Tạo `RelationshipSyncService` trong backend
**Bước 3**: Tích hợp vào import/update member
**Bước 4**: Tạo API endpoint để sync manual: `POST /api/relationships/sync/:dongHoId`
**Bước 5**: Test với data thật

---

## 🚀 BƯỚC TIẾP THEO

Bạn muốn tôi:
1. ✅ Viết code đầy đủ cho `RelationshipSyncService`?
2. ✅ Tạo migration script để populate `loaiquanhe`?
3. ✅ Tạo API endpoint để sync manual?
4. ✅ Viết test cases?

**Chọn option nào để tôi code chi tiết?**
