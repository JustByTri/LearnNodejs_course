const User = require('../models/User');


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = req.user.userId;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true }
    ).select('-password');
    
    if (!user) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    res.json({ message: 'Cập nhật thành công', user });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    res.json({ message: 'Xoá người dùng thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};
