export interface taiLieu {
    taiLieuId: string,
    thanhVienId: string,
    suKienId: string,
    nguoiTaiLenId: string,
    tenTaiLieu: string,
    duongDan: string,
    ngayTaiLen: Date,
    moTa: string,
    active_flag: number,
    lu_user_id: string,
}

export interface TaiLieu {
    taiLieuId?: string;
    dongHoId: string;
    tenTaiLieu: string;
    duongDan?: string;
    moTa?: string;
    loaiTaiLieu?: string;
    namSangTac?: number;
    tacGia?: string;
    nguonGoc?: string;
    ghiChu?: string;
    ngayTaiLen?: Date;
    active_flag?: number;
    nguoiTaoId?: string;
    lu_updated?: Date;
    lu_user_id?: string;
    tenDongHo?: string;
    RecordCount?: number;
}
 
 