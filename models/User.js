const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: String,
  role: { type: String, enum: ['admin', 'teacher', 'student'] },
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', userSchema);
