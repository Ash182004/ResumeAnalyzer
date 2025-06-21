// server/config/config.js
require('dotenv').config();

// Remove the fallback secret in production
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be set in production');
}

module.exports = {
  HUGGING_FACE_API_KEY: process.env.HUGGING_FACE_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET ,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/resume-analyzer'
};