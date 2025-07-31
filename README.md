# Hệ thống quản lý khóa học online

Dự án API backend cho hệ thống bán và quản lý khóa học online được xây dựng bằng Node.js, Express và MongoDB.

## Tính năng chính

### 🔐 Xác thực và phân quyền
- Đăng ký, đăng nhập người dùng
- 3 role: Admin, Teacher (giảng viên), Student (học viên)
- JWT authentication
- Middleware phân quyền chi tiết

### 📚 Quản lý khóa học
- Giảng viên tạo, sửa, xóa khóa học của mình
- Admin duyệt/từ chối khóa học
- Tìm kiếm và lọc khóa học theo tên, giá, trạng thái
- Xem danh sách khóa học với thông tin giảng viên

### 📖 Quản lý bài học
- Thêm, sửa, xóa bài học trong khóa học
- Sắp xếp thứ tự bài học
- Chỉ học viên đã mua mới xem được nội dung

### 💰 Mua bán khóa học
- Học viên mua khóa học
- Xem danh sách khóa học đã mua
- Tự động tạo enrollment sau khi mua

### 👥 Quản lý người dùng
- Admin quản lý tất cả người dùng
- Cập nhật thông tin cá nhân
- Xem profile người dùng

### 📊 Thống kê và báo cáo
- Giảng viên: doanh thu, số khóa học, số học viên
- Admin: thống kê tổng quan hệ thống

## Công nghệ sử dụng

- **Backend**: Node.js, Express.js
- **Database**: MongoDB với Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Password Hashing**: bcryptjs
- **Environment Variables**: dotenv

## Cài đặt và chạy dự án

### 1. Clone repository
```bash
git clone https://github.com/JustByTri/LearnNodejs_course.git
cd LearnNodejs_course
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Tạo file .env
```bash

MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
JWT_SECRET=your_secret_key_here
PORT=3000
```

### 4. Chạy server
```bash
npm start
# hoặc
node index.js
```

Server sẽ chạy tại: `http://localhost:3000`

## API Endpoints

### 🔐 Authentication (`/auth`)
| Method | Endpoint | Mô tả | Body |
|--------|----------|-------|------|
| POST | `/auth/register` | Đăng ký | `{ username, email, password, role }` |
| POST | `/auth/login` | Đăng nhập | `{ email, password }` |

### 📚 Courses (`/courses`)
| Method | Endpoint | Mô tả | Auth | Role |
|--------|----------|-------|------|------|
| GET | `/courses` | Danh sách khóa học | ❌ | All |
| GET | `/courses/:id` | Chi tiết khóa học | ❌ | All |
| POST | `/courses` | Tạo khóa học | ✅ | Teacher |
| PUT | `/courses/:id` | Sửa khóa học | ✅ | Teacher |
| DELETE | `/courses/:id` | Xóa khóa học | ✅ | Teacher |
| PUT | `/courses/:id/approve` | Duyệt khóa học | ✅ | Admin |
| PUT | `/courses/:id/reject` | Từ chối khóa học | ✅ | Admin |
| GET | `/courses/stats/teacher` | Thống kê giảng viên | ✅ | Teacher |
| GET | `/courses/stats/admin` | Thống kê admin | ✅ | Admin |

**Query parameters cho GET /courses:**
- `search`: Tìm kiếm theo tên hoặc mô tả
- `minPrice`, `maxPrice`: Lọc theo giá
- `status`: Lọc theo trạng thái (pending, approved, rejected)

### 📖 Lessons (`/lessons`)
| Method | Endpoint | Mô tả | Auth | Role |
|--------|----------|-------|------|------|
| POST | `/lessons` | Tạo bài học | ✅ | Teacher |
| PUT | `/lessons/:id` | Sửa bài học | ✅ | Teacher |
| DELETE | `/lessons/:id` | Xóa bài học | ✅ | Teacher |
| GET | `/lessons/course/:courseId` | Danh sách bài học | ✅ | Student (đã mua) |

### 💰 Orders (`/orders`)
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | `/orders/buy/:id` | Mua khóa học | ✅ |
| GET | `/orders/my-courses` | Khóa học đã mua | ✅ |

### 👥 Users (`/users`)
| Method | Endpoint | Mô tả | Auth | Role |
|--------|----------|-------|------|------|
| GET | `/users` | Danh sách người dùng | ✅ | Admin |
| DELETE | `/users/:id` | Xóa người dùng | ✅ | Admin |
| GET | `/users/profile` | Xem profile | ✅ | All |
| PUT | `/users/profile` | Cập nhật profile | ✅ | All |

## Cấu trúc thư mục

```
├── controllers/          # Logic xử lý business
│   ├── authController.js
│   ├── courseController.js
│   ├── lessonController.js
│   ├── orderController.js
│   └── userController.js
├── middlewares/          # Middleware xác thực và phân quyền
│   ├── authMiddleware.js
│   ├── adminMiddleware.js
│   └── teacherMiddleware.js
├── models/              # Schema MongoDB
│   ├── User.js
│   ├── Course.js
│   ├── Lesson.js
│   ├── Order.js
│   └── Enrollment.js
├── routes/              # Định nghĩa routes
│   ├── auth.js
│   ├── course.js
│   ├── lesson.js
│   ├── order.js
│   └── user.js
├── .env                 # Biến môi trường
├── .gitignore
├── index.js             # File khởi động server
├── package.json
└── test-mongo.js        # File test kết nối DB
```

## Sử dụng API

### 1. Đăng ký tài khoản
```bash
POST /auth/register
Content-Type: application/json

{
  "username": "John Doe",
  "email": "john@example.com", 
  "password": "123456",
  "role": "teacher"
}
```

### 2. Đăng nhập
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}

# Response: { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
```

### 3. Sử dụng token cho các API cần xác thực
```bash
Authorization: Bearer <token>
```

### 4. Tạo khóa học (Teacher)
```bash
POST /courses
Authorization: Bearer <token>
Content-Type: application/json

{
  "coursename": "Node.js từ cơ bản đến nâng cao",
  "description": "Khóa học Node.js toàn diện",
  "price": 500000
}
```

### 5. Mua khóa học (Student)
```bash
POST /orders/buy/:courseId
Authorization: Bearer <token>
```

## Lưu ý

- Đảm bảo MongoDB Atlas đã whitelist IP address của bạn
- Thay đổi JWT_SECRET trong production
- Backup database thường xuyên
- Sử dụng HTTPS trong production

## Đóng góp

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## License

Distributed under the MIT License.

## Liên hệ

- GitHub: [@JustByTri](https://github.com/JustByTri)
- Project Link: [https://github.com/JustByTri/LearnNodejs_course](https://github.com/JustByTri/LearnNodejs_course)