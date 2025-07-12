module.exports = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Bạn không có quyền thực hiện thao tác này' });
};
