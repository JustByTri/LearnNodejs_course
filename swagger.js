const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');

// Đọc CSS custom
const customCss = fs.readFileSync(path.join(__dirname, 'public', 'swagger-custom.css'), 'utf8');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hệ thống quản lý khóa học Online API',
      version: '1.0.0',
      description: 'API documentation cho hệ thống bán và quản lý khóa học online được xây dựng bằng Node.js, Express và MongoDB.',
      contact: {
        name: 'JustByTri',
        url: 'https://github.com/JustByTri',
        email: 'your-email@example.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://your-production-url.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID duy nhất của người dùng',
              example: '60d5f484d4f6f71234567890'
            },
            username: {
              type: 'string',
              description: 'Tên người dùng',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email đăng nhập',
              example: 'john@example.com'
            },
            role: {
              type: 'string',
              enum: ['admin', 'teacher', 'student'],
              description: 'Vai trò của người dùng',
              example: 'teacher'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Ngày tạo tài khoản'
            }
          }
        },
        Course: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID khóa học',
              example: '60d5f484d4f6f71234567891'
            },
            coursename: {
              type: 'string',
              description: 'Tên khóa học',
              example: 'Node.js từ cơ bản đến nâng cao'
            },
            description: {
              type: 'string',
              description: 'Mô tả khóa học',
              example: 'Khóa học Node.js toàn diện từ cơ bản đến nâng cao'
            },
            price: {
              type: 'number',
              description: 'Giá khóa học (VND)',
              example: 500000
            },
            teacherId: {
              $ref: '#/components/schemas/User'
            },
            status: {
              type: 'string',
              enum: ['pending', 'approved', 'rejected'],
              description: 'Trạng thái duyệt khóa học',
              example: 'approved'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Ngày tạo khóa học'
            }
          }
        },
        Lesson: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '60d5f484d4f6f71234567892'
            },
            title: {
              type: 'string',
              description: 'Tiêu đề bài học',
              example: 'Giới thiệu về Node.js'
            },
            content: {
              type: 'string',
              description: 'Nội dung bài học',
              example: 'Node.js là một runtime environment...'
            },
            sort: {
              type: 'number',
              description: 'Thứ tự bài học',
              example: 1
            },
            courseId: {
              type: 'string',
              description: 'ID khóa học chứa bài học này',
              example: '60d5f484d4f6f71234567891'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Order: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '60d5f484d4f6f71234567893'
            },
            userId: {
              type: 'string',
              description: 'ID người mua',
              example: '60d5f484d4f6f71234567890'
            },
            courseId: {
              type: 'string',
              description: 'ID khóa học được mua',
              example: '60d5f484d4f6f71234567891'
            },
            price: {
              type: 'number',
              description: 'Giá đã thanh toán',
              example: 500000
            },
            status: {
              type: 'string',
              enum: ['paid', 'pending', 'cancelled'],
              description: 'Trạng thái đơn hàng',
              example: 'paid'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Thông báo lỗi',
              example: 'Token không hợp lệ'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Thông báo thành công',
              example: 'Thao tác thành công'
            }
          }
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Token không hợp lệ hoặc thiếu',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        ForbiddenError: {
          description: 'Không có quyền truy cập',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        NotFoundError: {
          description: 'Tài nguyên không tồn tại',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        ServerError: {
          description: 'Lỗi server',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'API xác thực người dùng'
      },
      {
        name: 'Courses',
        description: 'API quản lý khóa học'
      },
      {
        name: 'Lessons',
        description: 'API quản lý bài học'
      },
      {
        name: 'Orders',
        description: 'API mua bán khóa học'
      },
      {
        name: 'Users',
        description: 'API quản lý người dùng'
      }
    ]
  },
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
  customCss
};
