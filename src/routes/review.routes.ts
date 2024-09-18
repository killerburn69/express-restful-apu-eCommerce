import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createReview, deleteReview } from "../controllers/review.controllers";

const router = Router()
router.post("/create", authMiddleware(["admin"]), createReview)
router.delete("/delete/:id", authMiddleware(["admin"]), deleteReview)
export default router