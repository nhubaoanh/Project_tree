import {
  INotification,
  PaginatedResponse,
  ApiResult,
  IUserSearch,
} from "@/types/Notification";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let MOCK_NOTIFICATIONS: INotification[] = [
  {
    thongBaoId: "TB_01",
    tieuDe: "Họp mặt đầu xuân Giáp Thìn",
    noiDung:
      "Kính mời toàn thể con cháu về dự họp mặt đầu xuân tại nhà thờ tổ.",
    loaiThongBao: "SU_KIEN",
    ngayTao: new Date().toISOString(),
    nguoiTao: "Trưởng Tộc",
    uuTien: true,
  },
  {
    thongBaoId: "TB_02",
    tieuDe: "Thông báo tu bổ mái đình",
    noiDung: "Ban quản trị xin thông báo kế hoạch tu bổ mái đình phía Đông.",
    loaiThongBao: "TIN_CHUNG",
    ngayTao: new Date(Date.now() - 86400000).toISOString(),
    nguoiTao: "Ban Kiến Thiết",
    uuTien: false,
  },
  {
    thongBaoId: "TB_03",
    tieuDe: "Tin vui: Cháu Nguyễn Văn An đỗ Tiến sĩ",
    noiDung:
      "Chúc mừng cháu Nguyễn Văn An đã bảo vệ thành công luận án Tiến sĩ.",
    loaiThongBao: "TIN_VUI",
    ngayTao: new Date(Date.now() - 172800000).toISOString(),
    nguoiTao: "Ban Khuyến Học",
    uuTien: false,
  },
];

export const getNotifications = async (
  params: IUserSearch
): Promise<ApiResult<PaginatedResponse<INotification>>> => {
  await delay(500);
  let filtered = [...MOCK_NOTIFICATIONS];

  if (params.search_content) {
    const lower = params.search_content.toLowerCase();
    filtered = filtered.filter(
      (n) =>
        n.tieuDe.toLowerCase().includes(lower) ||
        n.noiDung.toLowerCase().includes(lower)
    );
  }

  const totalRecords = filtered.length;
  const startIndex = (params.pageIndex - 1) * params.pageSize;
  const paginatedData = filtered.slice(
    startIndex,
    startIndex + params.pageSize
  );

  return {
    code: 200,
    message: "Success",
    data: {
      data: paginatedData,
      totalRecords,
      pageIndex: params.pageIndex,
      pageSize: params.pageSize,
      totalPages: Math.ceil(totalRecords / params.pageSize),
    },
  };
};

export const createNotification = async (
  notif: Partial<INotification>
): Promise<ApiResult<INotification>> => {
  await delay(300);
  const newItem: INotification = {
    ...notif,
    thongBaoId: `TB_${Date.now()}`,
    ngayTao: new Date().toISOString(),
  } as INotification;
  MOCK_NOTIFICATIONS.unshift(newItem);
  return { code: 200, message: "Success", data: newItem };
};

export const deleteNotification = async (
  id: string
): Promise<ApiResult<boolean>> => {
  await delay(300);
  MOCK_NOTIFICATIONS = MOCK_NOTIFICATIONS.filter((n) => n.thongBaoId !== id);
  return { code: 200, message: "Success", data: true };
};
