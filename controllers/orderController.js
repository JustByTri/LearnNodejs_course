const Order = require('../models/Order');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');


exports.buyCourse = async (req, res) => {
  try {
    const userId = req.user.userId;
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course || course.status !== 'approved') {
      return res.status(400).json({ error: 'Khoá học không tồn tại hoặc chưa được duyệt' });
    }
  
    const existed = await Enrollment.findOne({ userId, courseId });
    if (existed) {
      return res.status(400).json({ error: 'Bạn đã mua khoá học này rồi' });
    }
 
    const order = new Order({ userId, courseId, price: course.price, status: 'paid', createdAt: new Date() });
    await order.save();
  
    const enrollment = new Enrollment({ userId, courseId, enrollAt: new Date() });
    await enrollment.save();
    res.status(201).json({ message: 'Mua khoá học thành công', order });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};


exports.getMyCourses = async (req, res) => {
  try {
    const userId = req.user.userId;
    const enrollments = await Enrollment.find({ userId }).populate('courseId');
    const courses = enrollments.map(e => e.courseId);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};
