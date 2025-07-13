const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const orderRoutes = require('./routes/order');
const lessonRoutes = require('./routes/lesson');

const app = express();
const PORT = 3000;

app.use(express.json());


mongoose.connect('mongodb+srv://trihoangnguyenn:2gTm57jOyfmBUd5u@cluster0.1ryjnd2.mongodb.net/')
  .then(() => console.log('Kết nối MongoDB thành công!'))
  .catch(err => console.error('Kết nối thất bại:', err));


app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/orders', orderRoutes);
app.use('/lessons', lessonRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
