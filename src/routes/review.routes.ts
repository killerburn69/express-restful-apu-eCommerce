import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { banReview, createReview, deleteReview, getReview } from "../controllers/review.controllers";

const router = Router()
router.post("/create", authMiddleware(["admin"]), createReview)
router.delete("/delete/:id", authMiddleware(["admin"]), deleteReview)
router.post("/banReview/:id", authMiddleware(["admin"]), banReview)
router.get("/getReview", authMiddleware(["admin"]), getReview)
export default router