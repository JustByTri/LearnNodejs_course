const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
  price: Number,
  description: String,
  coursename: String,
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Course', courseSchema);
