import { Request, Response } from "express";
import { Review } from "../interfaces/review.interface";
import { createReviewService, deleteReviewService, getReviewService } from "../services/review.service";

export const createReview = async(req:Request,res:Response)=>{
    try {
        const userID = req.body.userID;
        const rating = Number(req.body.rating);
        const comment = req.body.comment;
        const productID = req.body.productID;
        const createdAt = new Date()
        const body: Review = {
            userID,
            rating,
            comment,
            createdAt,
            productID,
            reasons:"",
            isActive:false
        }
        const result = await createReviewService(body)
        if(result){
            return res.status(201).json({
                code:0,
                message:"Review created successfully",
                data:result
            })
        }else{
            return res.status(400).json({
                code:-1,
                message:"Failed to create review",
                data:null
            })
        }
    } catch (error) {
        return res.status(500).json({
            code: -1,
            message: "Error",
            data: null,
          });
    }
}

export const deleteReview = async(req:Request, res:Response)=>{
    try {
        const id = req.params.id
        const review = await getReviewService(id)
        if(!review){
            return res.status(404).json({
                code:-1,
                message:"Review not found",
                data:null
            })
        }
        const result = await deleteReviewService(id)
        if(result){
            return res.status(200).json({
                code:0,
                message:"Review deleted successfully",
                data:result
            })
        }else{
            return res.status(400).json({
                code:-1,
                message:"Failed to delete review",
                data:null
            })
        }
    } catch (error) {
        return res.status(500).json({
            code: -1,
            message: "Error",
            data: null,
          });
    }
}