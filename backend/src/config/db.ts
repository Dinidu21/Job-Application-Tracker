import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/job-tracker';
  
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error('Error connecting to MongoDB:', error.message);
    console.error('Server will continue to run, but database operations will fail.');
    console.error('Please ensure MongoDB is running or set MONGODB_URI environment variable.');
    
    // In development, don't exit - allow server to start
    // In production, you might want to exit
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export default connectDB;

