import { IMember } from "./member";

// Mở rộng IMember để thêm thuộc tính children
export interface ITreeNode extends IMember {
  id: number;              // THÊM DÒNG NÀY
  pids: number[];          // Danh sách ID vợ/chồng
  fid?: number;            // Father ID (chaId)
  mid?: number;            // Mother ID (meId)
}

// Nếu cần thêm các kiểu dữ liệu khác liên quan đến cây
export type TreeData = ITreeNode[];