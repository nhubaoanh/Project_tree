import { IBaseData } from "./base";

export interface ILineage extends IBaseData {
    donghoId: string,
    tenDongHo : string,
    queQuanGoc :string,
    ngayThanhLap : Date,
    nguoiQuanLy : string,
    ghiChu : string,
}

export interface ILineageSearch{
  pageIndex?: number;
  pageSize?: number;
  search_content?: string;
}