const mongoose = require('mongoose');
const enrollmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  enrollAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Enrollment', enrollmentSchema);
