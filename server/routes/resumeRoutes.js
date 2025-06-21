const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const { upload, handleMulterErrors } = require('../config/multer');

router.post(
  '/analyze',
  (req, res, next) => {
    upload.single('resume')(req, res, function (err) {
      if (err) return handleMulterErrors(err, req, res, next);
      next();
    });
  },
  resumeController.analyzeResume
);

module.exports = router;