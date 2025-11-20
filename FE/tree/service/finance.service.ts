import {
  ITransaction,
  PaginatedResponse,
  ApiResult,
  IUserSearch,
} from "@/types/Notification";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let MOCK_TRANSACTIONS: ITransaction[] = [
  {
    giaoDichId: "GD_01",
    loaiGiaoDich: "THU",
    soTien: 5000000,
    moTa: "Ông Nguyễn Văn A đóng góp quỹ xây dựng",
    ngayGiaoDich: new Date().toISOString(),
    nguoiThucHien: "Thủ Quỹ",
    hangMuc: "Đóng góp",
  },
  {
    giaoDichId: "GD_02",
    loaiGiaoDich: "CHI",
    soTien: 2000000,
    moTa: "Mua hoa quả cúng rằm tháng Giêng",
    ngayGiaoDich: new Date(Date.now() - 86400000).toISOString(),
    nguoiThucHien: "Trưởng Tộc",
    hangMuc: "Lễ tết",
  },
  {
    giaoDichId: "GD_03",
    loaiGiaoDich: "CHI",
    soTien: 15000000,
    moTa: "Sửa chữa cổng tam quan",
    ngayGiaoDich: new Date(Date.now() - 100000000).toISOString(),
    nguoiThucHien: "Ban Kiến Thiết",
    hangMuc: "Tu bổ",
  },
];

export const getTransactions = async (
  params: IUserSearch
): Promise<ApiResult<PaginatedResponse<ITransaction>>> => {
  await delay(500);
  let filtered = [...MOCK_TRANSACTIONS];

  if (params.search_content) {
    const lower = params.search_content.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.moTa.toLowerCase().includes(lower) ||
        t.hangMuc.toLowerCase().includes(lower)
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

export const getFinanceStats = async (): Promise<
  ApiResult<{ thu: number; chi: number; ton: number }>
> => {
  await delay(300);
  const thu = MOCK_TRANSACTIONS.filter((t) => t.loaiGiaoDich === "THU").reduce(
    (acc, curr) => acc + curr.soTien,
    0
  );
  const chi = MOCK_TRANSACTIONS.filter((t) => t.loaiGiaoDich === "CHI").reduce(
    (acc, curr) => acc + curr.soTien,
    0
  );
  return {
    code: 200,
    message: "Success",
    data: { thu, chi, ton: thu - chi },
  };
};

export const createTransaction = async (
  trans: Partial<ITransaction>
): Promise<ApiResult<ITransaction>> => {
  await delay(300);
  const newItem: ITransaction = {
    ...trans,
    giaoDichId: `GD_${Date.now()}`,
    ngayGiaoDich: trans.ngayGiaoDich || new Date().toISOString(),
  } as ITransaction;
  MOCK_TRANSACTIONS.unshift(newItem);
  return { code: 200, message: "Success", data: newItem };
};

export const deleteTransaction = async (
  id: string
): Promise<ApiResult<boolean>> => {
  await delay(300);
  MOCK_TRANSACTIONS = MOCK_TRANSACTIONS.filter((t) => t.giaoDichId !== id);
  return { code: 200, message: "Success", data: true };
};
