import { injectable } from "tsyringe";
import { dongHoService } from "../services/dongHoService";
import { dongHo } from "../models/dongho";
import { Request, Response } from "express";

@injectable()
export class dongHoController {
    constructor(private donghoService: dongHoService) { }

    async searchDongHo(req: Request, res: Response): Promise<void> {
        try {
            const object = req.body as {
                pageIndex: number;
                pageSize: number;
                search_content: string;
            };
            console.log("daaa",object)

            const data: any = await this.donghoService.searchDongHo(
                object.pageIndex,
                object.pageSize,
                object.search_content,
            );
            console.log(data)

            if (data) {
                res.json({
                    totalItems: Math.ceil(
                        data && data.length > 0 ? data[0].RecordCount : 0
                    ),
                    page: object.pageIndex,
                    pageSize: object.pageSize,
                    data: data,
                    pageCount: Math.ceil(
                        (data && data.length > 0 ? data[0].RecordCount : 0) /
                        (object.pageSize ? object.pageSize : 1)
                    ),
                });
            } else {
                res.json({ message: "Không tồn tại kết quả tìm kiếm.", success: true });
            }
        } catch (error) {
            res.status(500)
                .json({ message: "Không tồn tại kết quả tìm kiếm.", success: false });
        }
    }

    async getAllDongHo(req: Request, res: Response) : Promise<void> {
        try{
            const result = await this.donghoService.getAllDongHo();
            console.log("res", result)
            res.status(200).json({
                message: "lay danh sach dong ho thanh cong",
                success: true,
                data: result[0],
            })
        }catch(error: any){
            res.status(500).json({message : "lay danh sach dong ho khong thanh cong!"})
        }
    }

    async createDongHo(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
            // Lấy nguoiTaoId từ token hoặc body (tùy cách auth của bạn)
            const nguoiTaoId = (req as any).user?.nguoiDungId || data.nguoiTaoId || 'system';
            const result = await this.donghoService.createDongHo(data, nguoiTaoId);
            res.status(201).json({
                message: "Tạo dòng họ thành công",
                success: true,
                data: result,
            });
        } catch (error: any) {
            res.status(500).json({ message: "Tạo dòng họ thất bại", success: false });
        }
    }

    async getDongHoById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const result = await this.donghoService.getDongHoById(id);
            if (result) {
                res.status(200).json({
                    message: "Lấy thông tin dòng họ thành công",
                    success: true,
                    data: result,
                });
            } else {
                res.status(404).json({ message: "Không tìm thấy dòng họ", success: false });
            }
        } catch (error: any) {
            res.status(500).json({ message: "Lỗi khi lấy thông tin dòng họ", success: false });
        }
    }

    async updateDongHo(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data = req.body;
            const luUserId = (req as any).user?.nguoiDungId || data.lu_user_id || 'system';
            const result = await this.donghoService.updateDongHo(id, data, luUserId);
            res.status(200).json({
                message: "Cập nhật dòng họ thành công",
                success: true,
                data: result,
            });
        } catch (error: any) {
            res.status(500).json({ message: "Cập nhật dòng họ thất bại", success: false });
        }
    }

    async deleteDongHo(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const luUserId = (req as any).user?.nguoiDungId || 'system';
            await this.donghoService.deleteDongHo(id, luUserId);
            res.status(200).json({
                message: "Xóa dòng họ thành công",
                success: true,
            });
        } catch (error: any) {
            res.status(500).json({ message: "Xóa dòng họ thất bại", success: false });
        }
    }
}