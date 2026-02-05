import { BASE_URL, API_DOWNLOAD } from "@/constant/config";

const DEFAULT_AVATAR = "/images/vangoc.jpg";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Helper function để xử lý URL ảnh/file
 * Hỗ trợ cả URL đầy đủ và path tương đối
 */
export const getImageUrl = (img: string | null | undefined): string => {
  if (!img?.trim()) return DEFAULT_AVATAR;

  try {
    // Decode URL nếu bị encode
    let decodedImg = decodeURIComponent(img);

    // Nếu đã là URL đầy đủ, kiểm tra và sửa domain nếu cần
    if (decodedImg.startsWith("http://") || decodedImg.startsWith("https://")) {
      // Fix domain từ giaphaso.vn về api.giaphaso.vn
      if (decodedImg.includes("giaphaso.vn/uploads/")) {
        decodedImg = decodedImg.replace("https://giaphaso.vn/", `${API_BASE_URL}/`);
        decodedImg = decodedImg.replace("http://giaphaso.vn/", `${API_BASE_URL}/`);
      }
      return decodedImg;
    }

    // Nếu là đường dẫn tương đối, build URL qua gateway
    const path = decodedImg.startsWith("uploads/")
      ? decodedImg
      : `uploads/${decodedImg}`;
    return `${API_BASE_URL}/${path}`;
  } catch (error) {
    // Fallback: xử lý như path tương đối
    let fallbackImg = img;
    if (fallbackImg.startsWith("http://") || fallbackImg.startsWith("https://")) {
      // Fix domain cho fallback cũng
      if (fallbackImg.includes("giaphaso.vn/uploads/")) {
        fallbackImg = fallbackImg.replace("https://giaphaso.vn/", `${API_BASE_URL}/`);
        fallbackImg = fallbackImg.replace("http://giaphaso.vn/", `${API_BASE_URL}/`);
      }
      return fallbackImg;
    }
    const path = fallbackImg.startsWith("uploads/")
      ? fallbackImg
      : `uploads/${fallbackImg}`;
    return `${API_BASE_URL}/${path}`;
  }
};

export const getAvatarUrl = (avatar: string | null | undefined): string => {
  return getImageUrl(avatar);
};

/**
 * Helper function để xử lý URL file download (tài liệu, file đính kèm)
 * Hỗ trợ cả URL đầy đủ và path tương đối
 */
export const getFileUrl = (filePath: string | null | undefined): string => {
  if (!filePath?.trim()) return "";

  try {
    // Decode URL nếu bị encode
    let decodedPath = decodeURIComponent(filePath);

    // Nếu đã là URL đầy đủ, kiểm tra và sửa domain nếu cần
    if (decodedPath.startsWith("http://") || decodedPath.startsWith("https://")) {
      // Fix domain từ giaphaso.vn về api.giaphaso.vn
      if (decodedPath.includes("giaphaso.vn/uploads/")) {
        decodedPath = decodedPath.replace("https://giaphaso.vn/", `${API_BASE_URL}/`);
        decodedPath = decodedPath.replace("http://giaphaso.vn/", `${API_BASE_URL}/`);
      }
      return decodedPath;
    }

    // Nếu là đường dẫn tương đối, build URL qua gateway
    const path = decodedPath.startsWith("uploads/")
      ? decodedPath
      : `uploads/${decodedPath}`;
    return `${API_BASE_URL}/${path}`;
  } catch (error) {
    // Fallback: xử lý như path tương đối
    let fallbackPath = filePath;
    if (fallbackPath.startsWith("http://") || fallbackPath.startsWith("https://")) {
      // Fix domain cho fallback cũng
      if (fallbackPath.includes("giaphaso.vn/uploads/")) {
        fallbackPath = fallbackPath.replace("https://giaphaso.vn/", `${API_BASE_URL}/`);
        fallbackPath = fallbackPath.replace("http://giaphaso.vn/", `${API_BASE_URL}/`);
      }
      return fallbackPath;
    }
    const path = fallbackPath.startsWith("uploads/")
      ? fallbackPath
      : `uploads/${fallbackPath}`;
    return `${API_BASE_URL}/${path}`;
  }
};