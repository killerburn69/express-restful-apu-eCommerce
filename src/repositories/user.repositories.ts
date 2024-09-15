import UserModel from '../models/user.model';
import { User } from '../interfaces/user.interface';
import { ObjectId } from 'mongodb';

export const findUserById = async (id: string): Promise<User | null> => {
  const userDoc = await UserModel.findById(id).lean();
  
  if (!userDoc) {
    return null;
  }

  // Map the Mongoose document to your User entity
  const user: User = {
    id: (userDoc._id as ObjectId).toString(),  // Convert ObjectId to string
    name: userDoc.name,
    email: userDoc.email,
    password: userDoc.password,
    avatar :userDoc.avatar ?? "",
    role: userDoc.role,
  };

  return user;
};
export const createUser = async (body: User): Promise<User> => {
  const userDoc = await UserModel.create(body);
  return userDoc;
};
export const updateUser = async(id:string,body:User):Promise<User>=>{
  const userDoc = await UserModel.findByIdAndUpdate(id,body)
  if(userDoc){
    return userDoc
  }
  return body
}
export const deleteUserRepo = async(id:string):Promise<User | {}>=>{
  const user =  await UserModel.findByIdAndDelete(id)
  if(user){
    return user
  }
  return {}
}