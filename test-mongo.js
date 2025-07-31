require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Kết nối MongoDB thành công!');
  
    const user = new User({
      username: 'testuser',
      role: 'student',
      email: 'test@examcple.com',
      password: '123456'
    });
    await user.save();
    console.log('Tạo user thành công:', user);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Kết nối thất bại:', err);
  });
