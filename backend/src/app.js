require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { configureCloudinary } = require('./config/cloudinary');
const errorHandler = require('./middleware/errorHandler');

// Configure Cloudinary
configureCloudinary();

const app = express();

// Security
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later' },
});
app.use('/api', limiter);

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/hero', require('./routes/hero.routes'));
app.use('/api/about', require('./routes/about.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/gallery', require('./routes/gallery.routes'));
app.use('/api/tech-stack', require('./routes/techStack.routes'));
app.use('/api/services', require('./routes/service.routes'));
app.use('/api/media', require('./routes/media.routes'));
app.use('/api/healthcare', require('./routes/healthcare.routes'));
app.use('/api/organizations', require('./routes/organization.routes'));
app.use('/api/testimonials', require('./routes/testimonial.routes'));
app.use('/api/blog', require('./routes/blog.routes'));
app.use('/api/future-projects', require('./routes/futureProject.routes'));
app.use('/api/contact', require('./routes/contact.routes'));
app.use('/api/upload', require('./routes/upload.routes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Portfolio API is running', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

module.exports = app;
