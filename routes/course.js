const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const teacherMiddleware = require('../middlewares/teacherMiddleware');

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Tạo khóa học mới (Teacher)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - coursename
 *               - description
 *               - price
 *             properties:
 *               coursename:
 *                 type: string
 *                 description: Tên khóa học
 *                 example: "Node.js từ cơ bản đến nâng cao"
 *               description:
 *                 type: string
 *                 description: Mô tả khóa học
 *                 example: "Khóa học Node.js toàn diện từ cơ bản đến nâng cao"
 *               price:
 *                 type: number
 *                 description: Giá khóa học (VND)
 *                 example: 500000
 *     responses:
 *       201:
 *         description: Tạo khóa học thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tạo khóa học thành công"
 *                 course:
 *                   $ref: '#/components/schemas/Course'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/', authMiddleware, teacherMiddleware, courseController.createCourse);

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Lấy danh sách khóa học (có thể tìm kiếm và lọc)
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tên hoặc mô tả khóa học
 *         example: "nodejs"
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Giá tối thiểu
 *         example: 100000
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Giá tối đa
 *         example: 1000000
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         description: Lọc theo trạng thái duyệt
 *         example: "approved"
 *     responses:
 *       200:
 *         description: Danh sách khóa học
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/', courseController.getCourses);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Lấy chi tiết khóa học
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của khóa học
 *         example: "60d5f484d4f6f71234567891"
 *     responses:
 *       200:
 *         description: Chi tiết khóa học
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/:id', courseController.getCourseById);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Cập nhật khóa học (Teacher - chỉ khóa học của mình)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của khóa học
 *         example: "60d5f484d4f6f71234567891"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coursename:
 *                 type: string
 *                 example: "Node.js Advanced"
 *               description:
 *                 type: string
 *                 example: "Khóa học Node.js nâng cao"
 *               price:
 *                 type: number
 *                 example: 750000
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cập nhật khóa học thành công"
 *                 course:
 *                   $ref: '#/components/schemas/Course'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put('/:id', authMiddleware, teacherMiddleware, courseController.updateCourse);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Xóa khóa học (Teacher - chỉ khóa học của mình)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của khóa học
 *         example: "60d5f484d4f6f71234567891"
 *     responses:
 *       200:
 *         description: Xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete('/:id', authMiddleware, teacherMiddleware, courseController.deleteCourse);

/**
 * @swagger
 * /courses/{id}/approve:
 *   put:
 *     summary: Duyệt khóa học (Admin)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của khóa học
 *         example: "60d5f484d4f6f71234567891"
 *     responses:
 *       200:
 *         description: Duyệt khóa học thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Khóa học đã được duyệt"
 *                 course:
 *                   $ref: '#/components/schemas/Course'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put('/:id/approve', authMiddleware, adminMiddleware, courseController.approveCourse);

/**
 * @swagger
 * /courses/{id}/reject:
 *   put:
 *     summary: Từ chối khóa học (Admin)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của khóa học
 *         example: "60d5f484d4f6f71234567891"
 *     responses:
 *       200:
 *         description: Từ chối khóa học thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Khóa học đã bị từ chối"
 *                 course:
 *                   $ref: '#/components/schemas/Course'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put('/:id/reject', authMiddleware, adminMiddleware, courseController.rejectCourse);

/**
 * @swagger
 * /courses/stats/teacher:
 *   get:
 *     summary: Thống kê dành cho giảng viên
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thống kê giảng viên
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRevenue:
 *                   type: number
 *                   description: Tổng doanh thu
 *                   example: 5000000
 *                 totalCourses:
 *                   type: number
 *                   description: Tổng số khóa học
 *                   example: 10
 *                 totalStudents:
 *                   type: number
 *                   description: Tổng số học viên
 *                   example: 150
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/stats/teacher', authMiddleware, teacherMiddleware, courseController.getTeacherStats);

/**
 * @swagger
 * /courses/stats/admin:
 *   get:
 *     summary: Thống kê tổng quan hệ thống (Admin)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thống kê tổng quan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRevenue:
 *                   type: number
 *                   description: Tổng doanh thu hệ thống
 *                   example: 50000000
 *                 totalCourses:
 *                   type: number
 *                   description: Tổng số khóa học
 *                   example: 100
 *                 totalUsers:
 *                   type: number
 *                   description: Tổng số người dùng
 *                   example: 1500
 *                 totalOrders:
 *                   type: number
 *                   description: Tổng số đơn hàng
 *                   example: 800
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/stats/admin', authMiddleware, adminMiddleware, courseController.getAdminStats);

module.exports = router;
