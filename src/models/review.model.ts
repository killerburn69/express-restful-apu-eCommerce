import mongoose, { Schema } from 'mongoose';
import { Review } from '../interfaces/review.interface';

export const reviewSchema = new Schema({
  userID: { type: String, required: true },
  rating: { type: Number },
  comment:{
    type:String
  },
  createdAt: {
    type: Date,
  },
  productID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product',
    default:null
  },
  isBan:{
    type:Boolean,
    default:false
  },
  reason:{
    type:String,
  }
});

const ReviewModel = mongoose.model<Review & Document>('Review', reviewSchema);
export default ReviewModel;
