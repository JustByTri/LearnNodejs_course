const mongoose = require('mongoose');
const lessonSchema = new mongoose.Schema({
  title: String,
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  content: String,
  sort: Number,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Lesson', lessonSchema);
