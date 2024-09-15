import { Request, Response } from "express";
import {
  createUserBody,
  deleteUserService,
  getUserById,
  updaetUser,
} from "../services/user.service";
import bcrypt from "bcrypt";
import { User } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";
import { generateOTP, validateEmail } from "../utils/lib";
import { fail } from "assert";
import { sendMail } from "../services/sendMail.service";
import { updateUser } from "../repositories/user.repositories";
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      code:0,
      data:user,
      message:"success"
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
export const getAllUser = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const name = req.query.name;
    const skip = (page - 1) * limit;
    const filters = name ? { name: name } : {};
    const users = await UserModel.find(filters).skip(skip).limit(limit).exec(); // Executes the query
    const total = await UserModel.countDocuments();
    return res.status(200).json({
      code:0,
      data:{
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        users,
      },
      message:"success"
    });
  } catch (error) {
    return res.status(500).json({
      code: -1,
      message: "Error",
      data: null,
    });
  }
};
export const signUpUser = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const avatar = req.body.avatar;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const role = req.body.role;
    const user = await UserModel.findOne({ email: email }).lean();
    if (user) {
      return res.status(200).json({
        code: -1,
        message: "Email has used",
        data: null,
      });
    }
    if (!validateEmail(email)) {
      return res.status(200).json({
        code: -1,
        message: "Email wrong format",
        data: null,
      });
    }
    if (password !== confirmPassword) {
      return res.status(200).json({
        code: -1,
        message: "Confirm password is not the same password",
        data: null,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes
    const body: User = {
      name,
      avatar,
      email,
      password: hashedPassword,
      role,
      isVerified: false,
      otp,
      otpExpiresAt,
    };
    const result = await createUserBody(body);
    if (result) {
      const resultSend = await sendMail(email, otp);
      return res.status(200).json({
        code: 0,
        message: "OTP has send to your email",
        data: result,
      });
    }
  } catch (err: any) {
    console.log("🚀 ~ signUpUser ~ err:", err);
    return res.status(500).json({
      code: -1,
      message: "Error",
      data: null,
    });
  }
};
export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const user = await UserModel.findOne({ email: email, otp: otp }).lean();
    if (!user) {
      return res.status(400).json({
        code: -1,
        message: "fail",
        data: null,
      });
    }
    if (otp !== user.otp) {
      return res.status(400).json({
        code: -1,
        message: "fail",
        data: null,
      });
    }
    const body = {
      ...user,
      otp: "",
      isVerified: true,
    };
    console.log("🚀 ~ verifyOTP ~ body:", body);
    const result = await updaetUser(String(user._id), body);

    return res.status(200).json({
      code: 0,
      message: "success",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      code: -1,
      message: "fail",
      data: null,
    });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role }, // Payload
      String(process.env.JWT_SECRET), // Secret key
      { expiresIn: "1d" } // Token expiration time
    );

    // Return token to the client
    return res.status(200).json({
      message: "Login successful",
      token, // The JWT token
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
export const changePassword = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userID;
    const user = await UserModel.findById(userID);
    const oldPass = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const confirmNewPassword = req.body.confirmNewPassword;
    const isMatch = await bcrypt.compare(oldPass, String(user?.password ?? ""));
    if (!user) {
      return res.status(400).json({
        code: -1,
        data: null,
        message: "fail",
      });
    }
    if (!isMatch) {
      return res.status(400).json({
        code: -1,
        data: null,
        message: "fail",
      });
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        code: -1,
        data: null,
        message: "fail",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    const result = await updaetUser(userID, user);
    return res.status(200).json({
      code: 0,
      message: "success",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      code: -1,
      message: "fail",
      data: null,
    });
  }
};
export const resetOTPPassword = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({ email: email }).lean();
    if (!user) {
      return res.status(200).json({
        code: -1,
        message: "Email has not register",
        data: null,
      });
    }
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes
    const result = await sendMail(email, otp);
    if (result) {
      const body = {
        ...user,
        otp,
        otpExpiresAt,
      };
      const resUpdate = await UserModel.findByIdAndUpdate(user?._id, body);
      return res.status(200).json({
        code: 0,
        message: `Reset OTP code: ${otp}`,
        data: resUpdate,
      });
    } else {
      return res.status(200).json({
        code: -1,
        message: "Error",
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: -1,
      message: "fail",
      data: null,
    });
  }
};
export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const otpCode = req.body.otp;
    const newPass = req.body.newPass;
    const confirmPass = req.body.confirmPass;
    const user = await UserModel.findById(id).lean();
    if (!user) {
      return res.status(400).json({
        code: -1,
        message: "fail",
        data: null,
      });
    }
    if (user.otp !== otpCode) {
      return res.status(400).json({
        code: -1,
        message: "Wrong OTP",
        data: null,
      });
    }
    if (newPass !== confirmPass) {
      return res.status(400).json({
        code: -1,
        message: "New pass is not the same with confirmPass",
        data: null,
      });
    }
    const hashPassword = await bcrypt.hash(newPass, 10);
    const data: User = {
      ...user,
      password: hashPassword,
      otp: "",
      otpExpiresAt: null,
    };
    const resData = await updaetUser(id, data);
    return res.status(200).json({
      code: 0,
      message: "success",
      data: resData,
    });
  } catch (error) {
    return res.status(500).json({
      code: -1,
      message: "fail",
      data: null,
    });
  }
};
export const updateInformation = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id).lean();
    if (!user) {
      return res.status(400).json({
        code: -1,
        message: "Not found user",
        data: null,
      });
    }
    const data: User = {
      ...user,
      address: req.body.address ?? user.address,
      phoneNumber: req.body.phoneNumber ?? user.phoneNumber,
      name: req.body.name ?? user.name,
      avatar: req.body.avatar ?? user.avatar,
    };
    const resData = await updaetUser(id, data);
    return res.status(200).json({
      code: 0,
      message: "success",
      data: resData,
    });
  } catch (error) {
    return res.status(500).json({
      code: -1,
      message: "fail",
      data: null,
    });
  }
};
export const deleteUser = async(req:Request,res:Response)=>{
  try {
    const id = req.params.id
    const result = await deleteUserService(id)
    if(result){
      return res.status(200).json({
        code:0,
        data:result,
        message:"success"
      })
    }
  } catch (error) {
    
  }
}
export const createUserAdmin = async(req:Request,res:Response)=>{
  try {
    const name = req.body.name;
    const avatar = req.body.avatar;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const role = req.body.role;
    const user = await UserModel.findOne({ email: email }).lean();
    if (user) {
      return res.status(200).json({
        code: -1,
        message: "Email has used",
        data: null,
      });
    }
    if (!validateEmail(email)) {
      return res.status(200).json({
        code: -1,
        message: "Email wrong format",
        data: null,
      });
    }
    if (password !== confirmPassword) {
      return res.status(200).json({
        code: -1,
        message: "Confirm password is not the same password",
        data: null,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const body: User = {
      name,
      avatar,
      email,
      password: hashedPassword,
      role,
      isVerified: true,
    };
    const result = await createUserBody(body);
    if (result) {
      return res.status(200).json({
        code: 0,
        message: "OTP has send to your email",
        data: result,
      });
    }
  } catch (err: any) {
    console.log("🚀 ~ signUpUser ~ err:", err);
    return res.status(500).json({
      code: -1,
      message: "Error",
      data: null,
    });
  }
}