require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { swaggerUi, specs, customCss } = require('./swagger');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const orderRoutes = require('./routes/order');
const lessonRoutes = require('./routes/lesson');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Kết nối MongoDB thành công!'))
  .catch(err => console.error('Kết nối thất bại:', err));

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: customCss,
  customSiteTitle: "🎓 Course Management API Documentation",
  customfavIcon: "/favicon.ico",
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    tryItOutEnabled: true,
    filter: true,
    syntaxHighlight: {
      theme: "arta"
    },
    docExpansion: "list",
    defaultModelsExpandDepth: 2,
    showExtensions: true,
    showCommonExtensions: true
  }
}));

app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/orders', orderRoutes);
app.use('/lessons', lessonRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
});
