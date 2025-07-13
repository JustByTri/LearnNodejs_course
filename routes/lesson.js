const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/', authMiddleware, lessonController.createLesson);

router.put('/:id', authMiddleware, lessonController.updateLesson);

router.delete('/:id', authMiddleware, lessonController.deleteLesson);

router.get('/course/:courseId', lessonController.getLessonsByCourse);

module.exports = router;
