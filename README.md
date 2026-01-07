# 🌳 Ứng dụng Quản lý Gia phả

## 📋 Tổng quan dự án
Ứng dụng web hiện đại giúp quản lý và hiển thị cây gia phả gia đình, được xây dựng với kiến trúc microservices:
- **Frontend**: Next.js 14 với React 19
- **Backend**: Node.js/Express với TypeScript
- **API Gateway**: Express Gateway
- **Database**: MySQL 8.0
- **Reverse Proxy**: Nginx
- **Container**: Docker & Docker Compose

## 🚀 Công nghệ sử dụng

### Frontend (Next.js)
- **Framework**: Next.js 14 - Framework React với SSR/SSG
- **UI Library**: React 19 - Thư viện JavaScript hiện đại
- **Styling**: Tailwind CSS - Utility-first CSS framework
- **Components**: Shadcn/ui - Component library đẹp mắt
- **Icons**: Lucide React - Bộ icon SVG hiện đại
- **State Management**: TanStack Query - Server state management
- **Forms**: React Hook Form - Form validation library

### Backend (Node.js)
- **Runtime**: Node.js - JavaScript runtime environment
- **Framework**: Express.js - Web framework cho Node.js
- **Language**: TypeScript - Typed JavaScript
- **Database**: MySQL 8.0 - Relational database
- **Authentication**: JWT - JSON Web Token
- **DI Container**: TSyringe - Dependency injection
- **File Upload**: Multer - File handling middleware

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx - Load balancer và reverse proxy
- **API Gateway**: Express Gateway - API management

## 🏗️ Kiến trúc hệ thống

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │    │    Backend      │
│   (Next.js)     │◄──►│   (Express)     │◄──►│   (Node.js)     │
│   Port: 3000    │    │   Port: 8080    │    │   Port: 6001    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                        ▲                        ▲
         │                        │                        │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Nginx       │    │     Docker      │    │     MySQL       │
│   Port: 8081    │    │   Orchestration │    │   Port: 3307    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Cấu trúc dự án

```
family-tree-project/
├── 📁 FE/tree/                    # Frontend Next.js
│   ├── 📁 app/                    # App Router (Next.js 13+)
│   │   ├── 📁 (admin)/           # Admin routes
│   │   ├── 📁 (auth)/            # Authentication routes
│   │   ├── 📁 (users)/           # User routes
│   │   └── 📁 components/        # Shared components
│   ├── 📁 public/                # Static assets
│   ├── 📁 service/               # API services
│   ├── 📁 types/                 # TypeScript types
│   └── 📁 utils/                 # Utility functions
│
├── 📁 myFamilyTree/              # Backend Node.js
│   ├── 📁 src/                   # Source code
│   │   ├── 📁 controllers/       # Request handlers
│   │   ├── 📁 models/           # Database models
│   │   ├── 📁 routes/           # API routes
│   │   ├── 📁 services/         # Business logic
│   │   ├── 📁 middleware/       # Custom middleware
│   │   └── 📁 utils/            # Helper functions
│   ├── 📁 uploads/              # File uploads
│   └── 📄 .env                  # Environment variables
│
├── 📁 api-gateway/               # API Gateway
│   ├── 📁 config/               # Gateway configuration
│   ├── 📁 middleware/           # Gateway middleware
│   └── 📁 plugins/              # Gateway plugins
│
├── 📁 nginx/                     # Nginx configuration
├── 📁 database/                  # Database scripts
├── 📁 scripts/                   # Deployment scripts
├── 📄 docker-compose.yml         # Production compose
├── 📄 docker-compose.dev.yml     # Development compose
└── 📄 README.md                  # Documentation
```

## 🛠️ Hướng dẫn cài đặt và chạy dự án

### ⚡ Cách 1: Chạy với Docker (Khuyến nghị)

#### Yêu cầu hệ thống:
- **Docker Desktop** (Windows/Mac) hoặc **Docker Engine** (Linux)
- **Docker Compose** v2.0+
- **RAM**: Tối thiểu 4GB, khuyến nghị 8GB+
- **Disk**: Tối thiểu 5GB trống

#### Bước 1: Cài đặt Docker
1. **Windows/Mac**: Tải Docker Desktop từ [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. **Linux**: Cài đặt Docker Engine theo hướng dẫn chính thức
3. Kiểm tra cài đặt:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Bước 2: Clone và chạy dự án
```bash
# Clone repository
git clone <repository-url>
cd family-tree-project

# Chạy toàn bộ hệ thống
docker-compose up -d

# Xem logs (tùy chọn)
docker-compose logs -f
```

#### Bước 3: Truy cập ứng dụng
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **API Gateway**: [http://localhost:8080](http://localhost:8080)
- **Backend API**: [http://localhost:6001](http://localhost:6001)
- **Nginx**: [http://localhost:8081](http://localhost:8081)
- **MySQL**: `localhost:3307`

#### Các lệnh Docker hữu ích:
```bash
# Xem trạng thái containers
docker-compose ps

# Xem logs của service cụ thể
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mysql

# Restart service
docker-compose restart frontend

# Stop toàn bộ hệ thống
docker-compose down

# Stop và xóa volumes (cẩn thận - sẽ mất data)
docker-compose down -v

# Rebuild và restart
docker-compose up --build -d
```

### 🔧 Cách 2: Chạy Development Mode

#### Yêu cầu:
- **Node.js** v18+ và **npm** v8+
- **MySQL** 8.0+
- **Git**

#### Bước 1: Cài đặt Node.js
1. Tải từ [https://nodejs.org/](https://nodejs.org/) (chọn bản LTS)
2. Cài đặt và kiểm tra:
   ```bash
   node --version
   npm --version
   ```

#### Bước 2: Cài đặt MySQL
1. Tải MySQL Community Server: [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
2. Cài đặt MySQL Workbench để quản lý database
3. Tạo database:
   ```sql
   CREATE DATABASE treefamily;
   CREATE USER 'familytree'@'localhost' IDENTIFIED BY 'familytree123';
   GRANT ALL PRIVILEGES ON treefamily.* TO 'familytree'@'localhost';
   FLUSH PRIVILEGES;
   ```

#### Bước 3: Chạy Database với Docker (Khuyến nghị)
```bash
# Chỉ chạy MySQL
docker-compose -f docker-compose.dev.yml up -d
```

#### Bước 4: Cài đặt và chạy Backend
```bash
# Di chuyển vào thư mục backend
cd myFamilyTree

# Cài đặt dependencies
npm install

# Tạo file .env
cp .env.example .env

# Chỉnh sửa file .env với thông tin database của bạn
# DB_HOST=localhost
# DB_PORT=3306
# DB_USER=familytree
# DB_PASSWORD=familytree123
# DB_NAME=treefamily
# JWT_SECRET=your-secret-key
# PORT=6001

# Chạy development server
npm run dev
```

#### Bước 5: Cài đặt và chạy API Gateway
```bash
# Mở terminal mới
cd api-gateway

# Cài đặt dependencies
npm install

# Chạy gateway
npm start
```

#### Bước 6: Cài đặt và chạy Frontend
```bash
# Mở terminal mới
cd FE/tree

# Cài đặt dependencies
npm install

# Tạo file .env.local
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:8080" > .env.local

# Chạy development server
npm run dev
```

## 🌟 Tính năng chính

### 👥 Quản lý thành viên
- ✅ Thêm/sửa/xóa thông tin thành viên
- ✅ Upload ảnh đại diện
- ✅ Quản lý mối quan hệ gia đình
- ✅ Lưu trữ tiểu sử và thông tin chi tiết

### 🌳 Hiển thị cây gia phả
- ✅ Trực quan hóa cây gia đình
- ✅ Zoom in/out và di chuyển
- ✅ Hiển thị nhiều thế hệ
- ✅ Responsive trên mọi thiết bị

### 🔍 Tìm kiếm và lọc
- ✅ Tìm kiếm theo tên, nghề nghiệp
- ✅ Lọc theo thế hệ, giới tính
- ✅ Tìm kiếm nâng cao
- ✅ Pagination và sorting

### 📊 Báo cáo và thống kê
- ✅ Thống kê số lượng thành viên
- ✅ Phân tích theo thế hệ
- ✅ Xuất báo cáo Excel/PDF
- ✅ Biểu đồ trực quan

### 🔐 Bảo mật và phân quyền
- ✅ Đăng nhập/đăng ký an toàn
- ✅ JWT authentication
- ✅ Phân quyền Admin/User
- ✅ Bảo vệ API endpoints

### 📱 Giao diện người dùng
- ✅ Responsive design
- ✅ Dark/Light mode
- ✅ Đa ngôn ngữ (Tiếng Việt)
- ✅ UX/UI hiện đại

## 🚨 Xử lý lỗi thường gặp

### Lỗi Port đã được sử dụng
```bash
# Lỗi: Port 80 is already in use
# Giải pháp: Đã thay đổi port trong docker-compose.yml
# Nginx sẽ chạy trên port 8081 thay vì 80
```

### Lỗi Database connection
```bash
# Kiểm tra MySQL đã chạy chưa
docker-compose ps

# Xem logs MySQL
docker-compose logs mysql

# Restart MySQL
docker-compose restart mysql
```

### Lỗi Build Frontend
```bash
# Clear cache và rebuild
cd FE/tree
rm -rf .next node_modules
npm install
npm run build
```

### Lỗi Permission (Linux/Mac)
```bash
# Cấp quyền cho thư mục uploads
sudo chmod -R 755 myFamilyTree/uploads
```

## 📝 API Documentation

### Authentication Endpoints
```
POST /api/auth/login      # Đăng nhập
POST /api/auth/register   # Đăng ký
POST /api/auth/refresh    # Refresh token
```

### Member Management
```
GET    /api/members              # Lấy danh sách thành viên
POST   /api/members              # Thêm thành viên mới
PUT    /api/members/:id          # Cập nhật thành viên
DELETE /api/members/:id          # Xóa thành viên
GET    /api/members/:id          # Lấy chi tiết thành viên
```

### Family Tree
```
GET /api/family-tree/:dongHoId   # Lấy cây gia phả
GET /api/dong-ho                 # Lấy danh sách dòng họ
```

## 🧪 Testing

### Chạy tests
```bash
# Backend tests
cd myFamilyTree
npm test

# Frontend tests
cd FE/tree
npm test

# E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Production với Docker
```bash
# Build production images
docker-compose -f docker-compose.yml build

# Deploy
docker-compose -f docker-compose.yml up -d

# Health check
curl http://localhost:8081/health
```

### Environment Variables
```bash
# Production .env
NODE_ENV=production
DB_HOST=mysql
DB_PORT=3306
DB_USER=familytree
DB_PASSWORD=your-secure-password
DB_NAME=treefamily
JWT_SECRET=your-super-secret-jwt-key
GEMINI_API_KEY=your-gemini-api-key
```

## 🤝 Đóng góp vào dự án

### Quy trình đóng góp
1. Fork repository
2. Tạo feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Tạo Pull Request

### Coding Standards
- **Frontend**: ESLint + Prettier
- **Backend**: ESLint + TypeScript strict mode
- **Commit**: Conventional Commits
- **Testing**: Jest + Testing Library

## 📞 Hỗ trợ và liên hệ

### Khi gặp vấn đề:
1. 📖 Đọc lại hướng dẫn cài đặt
2. 🔍 Kiểm tra logs: `docker-compose logs -f`
3. 🌐 Tìm kiếm trong Issues trên GitHub
4. 💬 Tạo Issue mới với thông tin chi tiết

### Thông tin liên hệ:
- **Email**: nhubaoanh111@gmail.com
- **GitHub**: [Repository Link]
- **Documentation**: [Wiki Link]

## 📄 License
Dự án này được phát hành dưới giấy phép MIT License.

## 🙏 Lời cảm ơn

Cảm ơn các thư viện và công cụ mã nguồn mở:
- [Next.js](https://nextjs.org/) - React Framework
- [Express.js](https://expressjs.com/) - Backend Framework  
- [MySQL](https://www.mysql.com/) - Database
- [Docker](https://www.docker.com/) - Containerization
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Shadcn/ui](https://ui.shadcn.com/) - UI Components
- [TanStack Query](https://tanstack.com/query) - Data Fetching
- [Lucide React](https://lucide.dev/) - Icons

---

**🎉 Chúc bạn sử dụng ứng dụng vui vẻ! Hãy tạo ra cây gia phả đẹp cho gia đình mình! 🌳**
