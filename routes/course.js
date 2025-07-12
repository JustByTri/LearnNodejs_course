const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');


router.post('/', authMiddleware, courseController.createCourse);
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', authMiddleware, courseController.updateCourse);
router.delete('/:id', authMiddleware, courseController.deleteCourse);

router.put('/:id/approve', authMiddleware, adminMiddleware, courseController.approveCourse);
router.put('/:id/reject', authMiddleware, adminMiddleware, courseController.rejectCourse);

module.exports = router;
