export interface User {
  id?: string;
  name: string;
  address?:string;
  phoneNumber?:string;
  email: string;
  password: string;
  avatar: string | null | undefined;
  role: string;
  isVerified?: boolean;  // To track if the user has verified their account
  otp?: string | null;   // To store the OTP for email verification
  otpExpiresAt?: Date | null;  // To store the expiration time of the OTP
}
