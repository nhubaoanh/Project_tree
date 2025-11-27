import { clear } from "console";
import { LOGIN_URL } from "@/urls";
import { User } from "lucide-react";

interface UserData {
  nguoiDungId: string;
  hoTen: string;
  email: string;
  dongHoId: string;
  roleId: string;
  roleCode: string;
  functions: any[]; // Cây menu
  actions: string[]; // Quyền thao tác
}

const storagePrefix = "BA_";
const storage = {
  getToken: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}token`) as string
    );
  },

  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },

  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },

  setUser: (userData: UserData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${storagePrefix}user`, JSON.stringify(userData));
    }
  },

  getUser: (): UserData | null => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem(`${storagePrefix}user`);
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  removeUser: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(`${storagePrefix}user`);
    }
  },
  clearAll: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(`${storagePrefix}token`);
    }
  }, // GET FUNCTIONS (Menu Tree)
  getFunctions: (): any[] => {
    const user = storage.getUser();
    return user?.functions || [];
  },

  // GET ACTIONS
  getActions: (): string[] => {
    const user = storage.getUser();
    return user?.actions || [];
  },
  hasPermission: (functionCode: string): boolean => {
    const functions = storage.getFunctions();

    const checkFunction = (funcs: any[]): boolean => {
      for (const func of funcs) {
        if (func.function_code === functionCode) {
          return true;
        }
        if (func.children && func.children.length > 0) {
          if (checkFunction(func.children)) {
            return true;
          }
        }
      }
      return false;
    };

    return checkFunction(functions);
  },

  // CHECK ACTION
  hasAction: (actionCode: string): boolean => {
    const actions = storage.getActions();
    return actions.includes(actionCode);
  },
};

export default storage;

export const clearLogout = () => {
    storage.clearToken();
}
