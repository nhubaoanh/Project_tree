import { injectable } from "tsyringe";
import { Role } from "../models/role";
import { roleRespository } from "../repositories/roleRespository";

@injectable()
export class roleService {
    constructor(private roleRes: roleRespository){}

    async getAllRole() : Promise<any> {
        return this.roleRes.getAllRole();
    }
}