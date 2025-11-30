import dotenv from 'dotenv';
import connectDB from './config/db';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Start server first, then connect to database
app.listen(PORT, async () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  // Connect to database after server starts
  await connectDB();
});

