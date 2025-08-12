const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /orders/buy/{id}:
 *   post:
 *     summary: Mua khóa học
 *     tags: [Orders]
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
 *       201:
 *         description: Mua khóa học thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Mua khóa học thành công"
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Đã mua khóa học này rồi
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/buy/:id', authMiddleware, orderController.buyCourse);

/**
 * @swagger
 * /orders/my-courses:
 *   get:
 *     summary: Xem danh sách khóa học đã mua
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách khóa học đã mua
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/my-courses', authMiddleware, orderController.getMyCourses);

module.exports = router;
