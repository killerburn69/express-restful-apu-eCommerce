import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);  // No need to pass options here anymore
    console.log('MongoDB connected');
  } catch (err:any) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
