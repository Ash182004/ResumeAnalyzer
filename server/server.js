// server/server.js
const app = require('./app');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

app.listen(PORT, () => {
 console.log(`${PORT}`);
});