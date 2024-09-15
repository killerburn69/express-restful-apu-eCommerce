import { Router } from 'express';
import { changePassword, createUserAdmin, deleteUser, forgetPassword, getAllUser, getUser, loginUser, resetOTPPassword, signUpUser, updateInformation, verifyOTP } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createUser } from '../repositories/user.repositories';


const router = Router();

router.get('/user/:id', getUser);
router.get("/get-all-user",authMiddleware(["admin"]),getAllUser)

router.post("/sign-up", signUpUser)
router.post("/verify-otp", verifyOTP)
router.post("/login",loginUser)
router.post("/change-password/:userID",authMiddleware(["user"]),changePassword)
router.post("/resetOTPPassword", resetOTPPassword)
router.post("/forgetPassword/:id", forgetPassword)
router.post("/updateInformation/:id",authMiddleware(["user","admin"]),updateInformation)
router.post("/createUser",createUserAdmin)

router.delete("/deleteUser/:id",deleteUser)


export default router;
