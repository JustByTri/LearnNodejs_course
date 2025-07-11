const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');

// CRUD khoá học
router.post('/', authMiddleware, courseController.createCourse);
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', authMiddleware, courseController.updateCourse);
router.delete('/:id', authMiddleware, courseController.deleteCourse);
// Duyệt và từ chối khoá học
router.put('/:id/approve', authMiddleware, courseController.approveCourse);
router.put('/:id/reject', authMiddleware, courseController.rejectCourse);

module.exports = router;
