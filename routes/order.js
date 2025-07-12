const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

// Mua khoá học
router.post('/buy/:id', authMiddleware, orderController.buyCourse);
// Xem các khoá học đã mua
router.get('/my-courses', authMiddleware, orderController.getMyCourses);

module.exports = router;
