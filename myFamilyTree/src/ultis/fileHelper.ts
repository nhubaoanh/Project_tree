/**
 * File Helper Utility
 * Xử lý xóa file vật lý khi xóa/cập nhật record
 */

import fs from 'fs';
import path from 'path';

/**
 * Xóa file vật lý từ đường dẫn
 * @param filePath - Đường dẫn file (relative hoặc absolute)
 * @returns true nếu xóa thành công
 */
export const deletePhysicalFile = (filePath: string): boolean => {
    try {
        if (!filePath) return false;

        // Chuẩn hóa đường dẫn
        let fullPath = filePath;
        
        // Nếu là relative path, thêm process.cwd()
        if (!path.isAbsolute(filePath)) {
            fullPath = path.join(process.cwd(), filePath);
        }

        // Kiểm tra file tồn tại
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            console.log(`✅ Deleted file: ${fullPath}`);
            return true;
        } else {
            console.warn(`⚠️  File not found: ${fullPath}`);
            return false;
        }
    } catch (error: any) {
        console.error(`❌ Failed to delete file: ${filePath}`, error.message);
        return false;
    }
};

/**
 * Xóa nhiều file vật lý
 * @param filePaths - Mảng đường dẫn file
 * @returns Số lượng file đã xóa thành công
 */
export const deletePhysicalFiles = (filePaths: string[]): number => {
    let deletedCount = 0;
    
    filePaths.forEach(filePath => {
        if (deletePhysicalFile(filePath)) {
            deletedCount++;
        }
    });

    return deletedCount;
};

/**
 * Xóa file cũ khi cập nhật file mới
 * @param oldPath - Đường dẫn file cũ
 * @param newPath - Đường dẫn file mới
 */
export const replaceFile = (oldPath: string | null, newPath: string | null): void => {
    // Nếu có file mới và khác file cũ → xóa file cũ
    if (oldPath && newPath && oldPath !== newPath) {
        deletePhysicalFile(oldPath);
    }
};
