import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()
// router.post("/create", authMiddleware(["admin"], createCart))

export default router