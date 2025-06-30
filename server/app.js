const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const path = require("path");
const history = require('connect-history-api-fallback');

// Apply before static middleware


require('dotenv').config();


const app = express();
const _dirname=path.resolve();

// CORS middleware first
app.use(cors());

// File upload middleware before JSON parsers


// Then add body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/resume-analyzer', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use(history());

app.use(express.static(path.join(_dirname,"/client/dist")));
// app.get('/*',(_,res)=>{
//   res.sendFile(path.resolve(_dirname,"client","dist","index.html"));
// });

module.exports = app;