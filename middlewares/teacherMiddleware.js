
module.exports = (req, res, next) => {
  if (req.user && req.user.role === 'teacher') {
    return next();
  }
  return res.status(403).json({ error: 'Chỉ giảng viên mới có quyền thực hiện' });
};
