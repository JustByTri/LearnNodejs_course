const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

app.use(express.json());

// Kết nối MongoDB
mongoose.connect('mongodb+srv://trihoangnguyenn:2gTm57jOyfmBUd5u@cluster0.1ryjnd2.mongodb.net/')
  .then(() => console.log('Kết nối MongoDB thành công!'))
  .catch(err => console.error('Kết nối thất bại:', err));

// Sử dụng routes
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
