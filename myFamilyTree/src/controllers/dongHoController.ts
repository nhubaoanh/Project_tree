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
            res.status(200).json({
                message: "lay danh sach dong ho thanh cong",
                success: true,
                data: result[0],
            })
        }catch(error: any){
            res.status(500).json({message : "lay danh sach dong ho khong thanh cong!"})
        }
    }
}