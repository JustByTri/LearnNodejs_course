const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const teacherMiddleware = require('../middlewares/teacherMiddleware');

router.post('/', authMiddleware, teacherMiddleware, courseController.createCourse);
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', authMiddleware, teacherMiddleware, courseController.updateCourse);
router.delete('/:id', authMiddleware, teacherMiddleware, courseController.deleteCourse);

router.put('/:id/approve', authMiddleware, adminMiddleware, courseController.approveCourse);
router.put('/:id/reject', authMiddleware, adminMiddleware, courseController.rejectCourse);

// Thống kê
router.get('/stats/teacher', authMiddleware, teacherMiddleware, courseController.getTeacherStats);
router.get('/stats/admin', authMiddleware, adminMiddleware, courseController.getAdminStats);

module.exports = router;
