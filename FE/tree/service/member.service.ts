import { API_CORE } from "@/constant/config";  
import { apiClient } from "@/lib/api";
import { IMember } from "@/types/member";

const prefix = `${API_CORE}/member`;

export const getMembers = async (): Promise<any> => {
    try{
        const res = await apiClient.get(`${prefix}/getAllMember`);

        return res?.data;
    }catch(error : any){
        throw error;
    }
}