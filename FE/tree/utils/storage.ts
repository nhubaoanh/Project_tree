// Menu item từ DB
interface MenuItem {
  code: string;
  name: string;
  href: string;
  icon: string;
  sortOrder: number;
  parentId?: string | null;
  actions: string[];
}

interface UserData {
  nguoiDungId: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  full_name?: string;
  gender?: number;
  date_of_birthday?: string | Date;
  avatar?: string;
  email: string;
  phone?: string;
  dongHoId?: string;
  roleId?: string;
  roleCode?: string;
  online_flag?: number;
  // Menu và permissions từ DB
  menus?: MenuItem[];
  permissions?: Record<string, string[]>;
  canSelectAllDongHo?: boolean;
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
      localStorage.removeItem(`${storagePrefix}user`);
    }
  },

  // GET MENUS - Lấy danh sách menu từ DB
  getMenus: (): MenuItem[] => {
    const user = storage.getUser();
    return user?.menus || [];
  },

  // GET PERMISSIONS - Lấy permissions map
  getPermissions: (): Record<string, string[]> => {
    const user = storage.getUser();
    return user?.permissions || {};
  },

  // CHECK PERMISSION - Kiểm tra quyền trên chức năng
  checkPermission: (chucNangCode: string, thaoTacCode: string): boolean => {
    const permissions = storage.getPermissions();
    const actions = permissions[chucNangCode];
    return actions ? actions.includes(thaoTacCode) : false;
  },

  // CAN SELECT ALL DONG HO - Có quyền chọn tất cả dòng họ không
  canSelectAllDongHo: (): boolean => {
    const user = storage.getUser();
    return user?.canSelectAllDongHo === true;
  },

  // CHECK CAN ACCESS ROUTE - Kiểm tra có quyền truy cập route không
  canAccessRoute: (pathname: string): boolean => {
    const menus = storage.getMenus();
    // Tìm menu item có href match với pathname
    const menuItem = menus.find(
      (item) => pathname === item.href || pathname.startsWith(item.href + "/")
    );
    // Nếu tìm thấy menu item => có quyền
    // Nếu không tìm thấy => cho phép (có thể là trang public)
    return menuItem !== undefined || menus.length === 0;
  },
};

export default storage;

export const clearLogout = () => {
    storage.clearToken();
}
