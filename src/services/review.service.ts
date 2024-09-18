import { Review } from "../interfaces/review.interface";
import { createReviewRepo, deleteReviewRepo, getReviewRepo } from "../repositories/review.repositories";

export const createReviewService = async(body:Review):Promise<Review | null>=>{
    return await createReviewRepo(body)
}
export const getReviewService = async(id:string):Promise<Review | null>=>{
    return await getReviewRepo(id)
}
export const deleteReviewService = async(id:string):Promise<Review | null>=>{
    return await deleteReviewRepo(id)
}