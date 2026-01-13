import { BASE_URL, API_DOWNLOAD } from "@/constant/config";

const DEFAULT_AVATAR = "/images/vangoc.jpg";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// Helper function để xử lý URL ảnh (copy từ member page)
export const getImageUrl = (img: string | null | undefined): string => {
  if (!img?.trim()) return DEFAULT_AVATAR;

  try {
    // Decode URL nếu bị encode
    let decodedImg = decodeURIComponent(img);

    if (decodedImg.startsWith("http")) {
      // Nếu URL từ backend cũ (port 6001), chuyển sang gateway (port 8080)
      if (decodedImg.includes(":6001")) {
        decodedImg = decodedImg.replace(":6001", ":8080");
      }
      return decodedImg;
    }

    // Nếu là đường dẫn tương đối, build URL qua gateway
    const path = decodedImg.startsWith("uploads/")
      ? decodedImg
      : `uploads/${decodedImg}`;
    return `${API_BASE_URL}/${path}`;
  } catch (error) {
    let fallbackImg = img;
    if (fallbackImg.startsWith("http")) {
      // Chuyển từ backend cũ sang gateway nếu cần
      if (fallbackImg.includes(":6001")) {
        fallbackImg = fallbackImg.replace(":6001", ":8080");
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