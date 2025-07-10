const Course = require('../models/Course');

// Tạo khoá học
exports.createCourse = async (req, res) => {
  try {
    const { coursename, description, price } = req.body;
    if (!coursename || !description || !price) {
      return res.status(400).json({ error: 'Thiếu thông tin' });
    }
    // Giả sử req.user chứa thông tin user đã đăng nhập (giảng viên)
    const teacherId = req.user.userId;
    const course = new Course({ coursename, description, price, teacherId, status: 'pending', createdAt: new Date() });
    await course.save();
    res.status(201).json({ message: 'Tạo khoá học thành công', course });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};

// Lấy danh sách khoá học
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};

// Lấy chi tiết khoá học
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Không tìm thấy khoá học' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};

// Sửa khoá học
exports.updateCourse = async (req, res) => {
  try {
    const { coursename, description, price } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { coursename, description, price },
      { new: true }
    );
    if (!course) return res.status(404).json({ error: 'Không tìm thấy khoá học' });
    res.json({ message: 'Cập nhật thành công', course });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};

// Xoá khoá học
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Không tìm thấy khoá học' });
    res.json({ message: 'Xoá thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};
