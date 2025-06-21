const multer = require('multer');
const path = require('path');
const createError = require('http-errors');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // ✅ Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});


const fileFilter = (req, file, cb) => {
  try {
    const filetypes = /pdf|docx?|txt/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    const error = new Error('Only PDF, Word, and text files are allowed');
    error.code = 'LIMIT_FILE_TYPES';
    cb(error, false);
  } catch (err) {
    cb(err, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 5 * 1024 * 1024,
    files: 1,
    parts: 10
  }
});

const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ 
        error: 'File too large. Maximum 5MB allowed.' 
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ 
        error: 'Too many files uploaded. Only one file allowed.' 
      });
    }
  } else if (err.code === 'LIMIT_FILE_TYPES') {
    return res.status(400).json({ 
      error: err.message 
    });
  }

  next(err);
};

module.exports = {
  upload,
  handleMulterErrors
};
