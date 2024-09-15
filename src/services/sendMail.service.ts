import nodemailer from "nodemailer";
import { generateOTP } from "../utils/lib";
export const sendMail = async (email: string,otp:string) => {
  
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "heber.douglas93@ethereal.email",
      pass: "ejwyzSeT17FnHcETCc",
    },
  });

  const mailOptions = {
    from: "kathryn51@ethereal.email",
    to: email,
    subject: "Verify your account",
    text: `Your OTP for email verification is ${otp}. It will expire in 15 minutes.`,
  };
  return transporter.sendMail(mailOptions);
};
