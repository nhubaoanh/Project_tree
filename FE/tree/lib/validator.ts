export const validateEmail = (email: string): string | null => {
    // regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email){
        console.log("email", email);
        return "Email không được để trống."; 
    }
    if(!emailRegex.test(email)) {
        return "Email không đúng định dạng.";
    }
    return null;
}

// 2. Kiểm tra Mật khẩu: Phải đáp ứng tiêu chuẩn mạnh
export const validatePassword = (password: string): string | null => {
    if (!password) {
        return "Mật khẩu không được để trống.";
    }
    if (password.length < 5) {
        return "Mật khẩu phải có ít nhất 8 ký tự.";
    }
    // Phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số, và 1 ký tự đặc biệt
    // const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    // const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    // if (!uppercaseRegex.test(password)) {
    //     return "Mật khẩu phải có ít nhất 1 chữ cái viết hoa.";
    // }
    if (!lowercaseRegex.test(password)) {
        return "Mật khẩu phải có ít nhất 1 chữ cái viết thường.";
    }
    if (!numberRegex.test(password)) {
        return "Mật khẩu phải có ít nhất 1 chữ số.";
    }
    // if (!specialCharRegex.test(password)) {
    //     return "Mật khẩu phải có ít nhất 1 ký tự đặc biệt.";
    // }
    return null; // Trả về null nếu hợp lệ
};

// 3. Kiểm tra Tên (Ví dụ: không quá 50 ký tự)
export const validateName = (name: string, fieldName: string = "Tên"): string | null => {
    if (!name) {
        return `${fieldName} không được để trống.`;
    }
    if (name.length > 50) {
        return `${fieldName} không được vượt quá 50 ký tự.`;
    }
    return null;
};