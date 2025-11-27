# Ứng dụng Quản lý Gia phả

## 📋 Tổng quan dự án
Ứng dụng web hiện đại giúp quản lý và hiển thị cây gia phả gia đình, được xây dựng với:
- Frontend: React/Next.js
- Backend: Node.js/Express
- Cơ sở dữ liệu: MySQL

## 🚀 Công nghệ sử dụng

### Frontend
- **Framework**: Next.js 14 - Framework React giúp tối ưu hiệu năng
- **Thư viện UI**: React 19 - Thư viện JavaScript để xây dựng giao diện người dùng
- **Component UI**: Shadcn - Thư viện component UI đẹp mắt
- **Giao diện**: Tailwind CSS - Framework CSS tiện lợi
- **Biểu tượng**: Lucide Icons - Bộ icon hiện đại

### Backend
- **Môi trường**: Node.js - Môi trường thực thi JavaScript
- **Framework**: Express.js - Framework web cho Node.js
- **Cơ sở dữ liệu**: MySQL - Hệ quản trị cơ sở dữ liệu quan hệ
- **Xác thực**: JWT (JSON Web Token) - Chuẩn bảo mật cho xác thực
- **Quản lý phụ thuộc**: TSyringe - Hỗ trợ Dependency Injection

## 🏗️ Project Structure

```
code/
├── FE/                      # Frontend code
│   └── tree/                # Next.js application
│       ├── app/             # Application pages
│       ├── public/          # Static files
│       ├── styles/          # Global styles
│       └── components/      # Reusable components
│
└── myFamilyTree/            # Backend code
    ├── src/                 # Source files
    │   ├── controllers/     # Request handlers
    │   ├── models/          # Data models
    │   ├── routes/         # API routes
    │   ├── services/       # Business logic
    │   └── utils/          # Helper functions
    ├── .env                # Environment variables
    └── package.json        # Dependencies and scripts
```

## 🛠️ Hướng dẫn cài đặt chi tiết

### 1. Công cụ cần cài đặt trước

#### 1.1. Cài đặt Node.js và npm
1. Truy cập [https://nodejs.org/](https://nodejs.org/)
2. Tải bản LTS (Recommended)
3. Chạy file cài đặt và làm theo hướng dẫn
   - kéo dự án về và truy cập đúng thư mục myFamily -> sau đó gõ npm install: để cài nodeModule và các pack 
4. Kiểm tra cài đặt thành công bằng cách mở Command Prompt (Windows) hoặc Terminal (Mac/Linux) và gõ:
   ```bash
   node -v
   npm -v
   ```
   Nếu hiển thị số phiên bản là đã thành công.

#### 1.2. Cài đặt MySQL
1. Tải MySQL Community Server: [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
2. Chọn bản phù hợp với hệ điều hành
3. Làm theo hướng dẫn cài đặt
   - Chọn "Developer Default" khi được hỏi
   - Ghi nhớ mật khẩu root
4. Cài đặt MySQL Workbench để quản lý cơ sở dữ liệu dễ dàng hơn

### 2. Cài đặt Backend

#### 2.1. Cấu hình cơ sở dữ liệu
1. Mở MySQL Workbench
2. Kết nối vào localhost với tài khoản root
3. Tạo database mới:
   ```sql
   CREATE DATABASE family_tree;
   ```

#### 2.2. Cài đặt môi trường
1. Mở Command Prompt/Terminal
2. Di chuyển vào thư mục backend:
   ```bash
   cd d:\Programming_Center\Project_tree\code\myFamilyTree
   ```
3. Cài đặt các thư viện cần thiết:
   ```bash
   npm install
   ```

#### 2.3. Cấu hình file .env
1. Tạo file mới tên là `.env` trong thư mục `myFamilyTree`
2. Thêm các thông tin sau (điều chỉnh theo cấu hình của bạn):
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=matkhau_cua_ban
   DB_NAME=family_tree
   JWT_SECRET=day_la_chuoi_bi_mat_cua_ban
   PORT=6001
   ```

#### 2.4. Khởi động server backend
```bash
npm run dev
```
Nếu thấy thông báo "Server is running on port 6001" là thành công.

### 3. Cài đặt Frontend

#### 3.1. Cài đặt môi trường
1. Mở Command Prompt/Terminal mới
2. Di chuyển vào thư mục frontend:
   ```bash
   cd \FE\tree
   ```
3. Cài đặt các thư viện cần thiết:
   ```bash
   npm install
   ```

#### 3.2. Cấu hình môi trường
1. Tạo file mới tên là `.env.local` trong thư mục `FE\tree`
2. Thêm dòng sau:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:6001
   ```

#### 3.3. Khởi động ứng dụng
```bash
npm run dev
```

#### 3.4. Truy cập ứng dụng
Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

## 🌟 Tính năng chính
- **Quản lý thành viên**: Thêm, sửa, xóa thông tin thành viên gia đình
- **Xem cây gia phả**: Trực quan hóa mối quan hệ gia đình
- **Tìm kiếm & Lọc**: Dễ dàng tìm kiếm và lọc thành viên
- **Đa nền tảng**: Giao diện tối ưu cho mọi thiết bị
- **Bảo mật**: Hệ thống đăng nhập an toàn
- **Xuất dữ liệu**: Xuất thông tin gia phả ra file
- **Phân quyền**: Quản lý quyền truy cập cho người dùng

## 🤝 Đóng góp vào dự án
1. Fork repository này về tài khoản GitHub của bạn
2. Tạo nhánh mới cho tính năng bạn muốn phát triển:
   ```bash
   git checkout -b feature/ten-tinh-nang-moi
   ```
3. Commit các thay đổi:
   ```bash
   git add .
   git commit -m "Thêm tính năng mới: [mô tả ngắn]"
   ```
4. Đẩy code lên nhánh của bạn:
   ```bash
   git push origin feature/ten-tinh-nang-moi
   ```
5. Tạo Pull Request về nhánh chính của dự án


## 👨‍💻 Tác giả
[Nhữ Bảo Anh] - [nhubaoanh111@gmail.com]

## 📞 Hỗ trợ
Nếu gặp khó khăn trong quá trình cài đặt hoặc sử dụng, vui lòng:
1. Kiểm tra lại các bước cài đặt
2. Đảm bảo đã cài đặt đủ các công cụ cần thiết
3. Kiểm tra kết nối cơ sở dữ liệu
4. Tạo issue mới trên GitHub nếu vẫn chưa giải quyết được

## 🙏 Lời cảm ơn
- [Hadcn](https://ui.shadcn.com/) - Thư viện component UI
- [Next.js](https://nextjs.org/) - Framework React
- [Express](https://expressjs.com/) - Backend server
- [MySQL](https://www.mysql.com/) - Cơ sở dữ liệu
- [lucide-react] - Thư viện icon
- [tanstack/react-query] - Thư viện gen giao diện cây
- [recharts] - Thư viện gen biểu đồ
- [react] - ui
- Tất cả các thư viện mã nguồn mở đã được sử dụng trong dự án
