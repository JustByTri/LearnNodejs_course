const Course = require('../models/Course');


exports.createCourse = async (req, res) => {
  try {
    const { coursename, description, price } = req.body;
    if (!coursename || !description || !price) {
      return res.status(400).json({ error: 'Thiếu thông tin' });
    }
    
    const teacherId = req.user.userId;
    const course = new Course({ coursename, description, price, teacherId, status: 'pending', createdAt: new Date() });
    await course.save();
    res.status(201).json({ message: 'Tạo khoá học thành công', course });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};


exports.getCourses = async (req, res) => {
  try {
    const { search, minPrice, maxPrice, status } = req.query;
    let filter = {};
    
  
    if (search) {
      filter.$or = [
        { coursename: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
   
    if (status) {
      filter.status = status;
    }
    
    const courses = await Course.find(filter).populate('teacherId', 'username');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};


exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Không tìm thấy khoá học' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};


exports.updateCourse = async (req, res) => {
  try {
    const { coursename, description, price } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Không tìm thấy khoá học' });
    
    // Kiểm tra chỉ giảng viên tạo ra khoá học mới được sửa
    if (course.teacherId.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Bạn chỉ có thể sửa khoá học của mình' });
    }
    
    course.coursename = coursename || course.coursename;
    course.description = description || course.description;
    course.price = price || course.price;
    await course.save();
    
    res.json({ message: 'Cập nhật thành công', course });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};


exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Không tìm thấy khoá học' });
    
    // Kiểm tra chỉ giảng viên tạo ra khoá học mới được xoá
    if (course.teacherId.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Bạn chỉ có thể xoá khoá học của mình' });
    }
    
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xoá thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};


exports.approveCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Không tìm thấy khoá học' });
    course.status = 'approved';
    await course.save();
    res.json({ message: 'Khoá học đã được duyệt', course });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};


exports.rejectCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Không tìm thấy khoá học' });
    course.status = 'rejected';
    await course.save();
    res.json({ message: 'Khoá học đã bị từ chối', course });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};

// Thống kê doanh thu cho giảng viên
exports.getTeacherStats = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const Order = require('../models/Order');
    const Enrollment = require('../models/Enrollment');
    
    // Tổng doanh thu
    const orders = await Order.find().populate('courseId');
    const teacherOrders = orders.filter(order => 
      order.courseId && order.courseId.teacherId.toString() === teacherId
    );
    const totalRevenue = teacherOrders.reduce((sum, order) => sum + order.price, 0);
    
    // Số lượng khoá học
    const totalCourses = await Course.countDocuments({ teacherId });
    
    // Số lượng học viên
    const enrollments = await Enrollment.find().populate('courseId');
    const teacherEnrollments = enrollments.filter(enrollment =>
      enrollment.courseId && enrollment.courseId.teacherId.toString() === teacherId
    );
    const totalStudents = teacherEnrollments.length;
    
    res.json({
      totalRevenue,
      totalCourses,
      totalStudents,
      orders: teacherOrders.length
    });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};

// Thống kê tổng quan cho admin
exports.getAdminStats = async (req, res) => {
  try {
    const User = require('../models/User');
    const Order = require('../models/Order');
    
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);
    
    res.json({
      totalUsers,
      totalCourses,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};
