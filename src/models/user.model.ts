import mongoose, { Schema } from 'mongoose';
import { User } from '../interfaces/user.interface';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar:{type:String},
  role: {
    type: String,
    enum: ['user', 'admin'],  // Role can be either 'user' or 'admin'
    default: 'user',  // Default role is 'user'
  },
  isVerified:{
    type:Boolean
  },
  otp:{
    type:String
  },
  otpExpiresAt:{
    type:Date
  },
  phoneNumber:{
    type:String,
  },
  address:{
    type:String
  }
});

const UserModel = mongoose.model<User & Document>('User', userSchema);
export default UserModel;
