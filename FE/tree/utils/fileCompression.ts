/**
 * File Compression Utility
 * Nén file trước khi upload để tiết kiệm băng thông và storage
 */

// Giới hạn kích thước file (MB)
export const FILE_SIZE_LIMITS = {
  IMAGE: 5, // 5MB cho ảnh
  DOCUMENT: 10, // 10MB cho tài liệu
  MAX: 50, // 50MB tối đa
};

// Chất lượng nén ảnh
export const IMAGE_QUALITY = {
  HIGH: 0.9,
  MEDIUM: 0.7,
  LOW: 0.5,
};

/**
 * Kiểm tra loại file
 */
export const getFileType = (file: File): 'image' | 'document' | 'other' => {
  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const documentTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  if (imageTypes.includes(file.type)) return 'image';
  if (documentTypes.includes(file.type)) return 'document';
  return 'other';
};

/**
 * Validate kích thước file
 */
export const validateFileSize = (file: File): { valid: boolean; message: string } => {
  const fileSizeMB = file.size / (1024 * 1024);
  const fileType = getFileType(file);

  if (fileType === 'image' && fileSizeMB > FILE_SIZE_LIMITS.IMAGE) {
    return {
      valid: false,
      message: `Ảnh không được vượt quá ${FILE_SIZE_LIMITS.IMAGE}MB. File của bạn: ${fileSizeMB.toFixed(2)}MB`,
    };
  }

  if (fileType === 'document' && fileSizeMB > FILE_SIZE_LIMITS.DOCUMENT) {
    return {
      valid: false,
      message: `Tài liệu không được vượt quá ${FILE_SIZE_LIMITS.DOCUMENT}MB. File của bạn: ${fileSizeMB.toFixed(2)}MB`,
    };
  }

  if (fileSizeMB > FILE_SIZE_LIMITS.MAX) {
    return {
      valid: false,
      message: `File không được vượt quá ${FILE_SIZE_LIMITS.MAX}MB. File của bạn: ${fileSizeMB.toFixed(2)}MB`,
    };
  }

  return { valid: true, message: 'OK' };
};

/**
 * Nén ảnh sử dụng Canvas API
 */
export const compressImage = async (
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = IMAGE_QUALITY.MEDIUM
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Tính toán kích thước mới giữ nguyên tỷ lệ
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        // Tạo canvas để nén
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Không thể tạo canvas context'));
          return;
        }

        // Vẽ ảnh lên canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Chuyển canvas thành blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Không thể nén ảnh'));
              return;
            }

            // Tạo file mới từ blob
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };

      img.onerror = () => reject(new Error('Không thể load ảnh'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Không thể đọc file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Xử lý file trước khi upload
 * - Validate kích thước
 * - Nén ảnh nếu cần
 */
export const prepareFileForUpload = async (
  file: File,
  options?: {
    autoCompress?: boolean;
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
  }
): Promise<{ file: File; compressed: boolean; originalSize: number; newSize: number }> => {
  const originalSize = file.size;
  const fileType = getFileType(file);

  // Validate kích thước
  const validation = validateFileSize(file);
  if (!validation.valid) {
    throw new Error(validation.message);
  }

  // Nén ảnh nếu là ảnh và autoCompress = true
  if (fileType === 'image' && options?.autoCompress !== false) {
    try {
      const compressedFile = await compressImage(
        file,
        options?.maxWidth,
        options?.maxHeight,
        options?.quality
      );

      const newSize = compressedFile.size;
      const compressionRatio = ((originalSize - newSize) / originalSize) * 100;

      // Chỉ dùng file nén nếu giảm được > 10%
      if (compressionRatio > 10) {
        return {
          file: compressedFile,
          compressed: true,
          originalSize,
          newSize,
        };
      }
    } catch (error) {
      console.warn('Không thể nén ảnh, sử dụng file gốc:', error);
    }
  }

  // Trả về file gốc nếu không nén
  return {
    file,
    compressed: false,
    originalSize,
    newSize: originalSize,
  };
};

/**
 * Format kích thước file
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Lấy icon cho file type
 */
export const getFileIcon = (fileName: string): string => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(ext || '')) {
    return '🖼️';
  } else if (['pdf'].includes(ext || '')) {
    return '📄';
  } else if (['doc', 'docx'].includes(ext || '')) {
    return '📝';
  } else if (['xls', 'xlsx'].includes(ext || '')) {
    return '📊';
  } else if (['txt'].includes(ext || '')) {
    return '📃';
  }
  return '📎';
};
