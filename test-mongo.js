const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb+srv://trihoangnguyenn:2gTm57jOyfmBUd5u@cluster0.1ryjnd2.mongodb.net/')
  .then(async () => {
    console.log('Kết nối MongoDB thành công!');
    // Tạo thử 1 user
    const user = new User({
      username: 'testuser',
      role: 'student',
      email: 'test@example.com',
      password: '123456'
    });
    await user.save();
    console.log('Tạo user thành công:', user);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Kết nối thất bại:', err);
  });
