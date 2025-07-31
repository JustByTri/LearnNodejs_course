const Lesson = require('../models/Lesson');
const Course = require('../models/Course');


exports.createLesson = async (req, res) => {
  try {
    const { title, content, sort, courseId } = req.body;
    if (!title || !content || !sort || !courseId) {
      return res.status(400).json({ error: 'Thiếu thông tin' });
    }
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Không tìm thấy khoá học' });
    const lesson = new Lesson({ title, content, sort, courseId, createdAt: new Date() });
    await lesson.save();
    res.status(201).json({ message: 'Thêm bài học thành công', lesson });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};


exports.updateLesson = async (req, res) => {
  try {
    const { title, content, sort } = req.body;
    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      { title, content, sort },
      { new: true }
    );
    if (!lesson) return res.status(404).json({ error: 'Không tìm thấy bài học' });
    res.json({ message: 'Cập nhật thành công', lesson });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};


exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Không tìm thấy bài học' });
    res.json({ message: 'Xoá thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};
exports.getLessonsByCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user ? req.user.userId : null;
    
    // Kiểm tra user đã mua khoá học chưa
    if (userId) {
      const Enrollment = require('../models/Enrollment');
      const enrollment = await Enrollment.findOne({ userId, courseId });
      if (!enrollment) {
        return res.status(403).json({ error: 'Bạn cần mua khoá học để xem nội dung' });
      }
    } else {
      return res.status(401).json({ error: 'Cần đăng nhập để xem bài học' });
    }
    
    const lessons = await Lesson.find({ courseId }).sort({ sort: 1 });
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};
  
