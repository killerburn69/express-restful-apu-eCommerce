import { Review } from "../interfaces/review.interface";
import ReviewModel from "../models/review.model";

export const createReviewRepo = async(body:Review):Promise<Review|null>=>{
    return await ReviewModel.create(body);
}
export const getReviewRepo = async(id:string):Promise<Review|null>=>{
    return await ReviewModel.findById(id).lean();
}
export const deleteReviewRepo = async(id:string):Promise<Review|null>=>{
    return await ReviewModel.findByIdAndDelete(id);
}