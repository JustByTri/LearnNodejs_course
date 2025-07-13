const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/buy/:id', authMiddleware, orderController.buyCourse);

router.get('/my-courses', authMiddleware, orderController.getMyCourses);

module.exports = router;
