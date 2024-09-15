import { User } from '../interfaces/user.interface';
import { createUser, deleteUserRepo, findUserById, updateUser } from '../repositories/user.repositories';

export const getUserById = async (id: string) => {
  const user = await findUserById(id);
  return user;
};
export const createUserBody = async (body:User) => {
  const user = await createUser(body);
  return user;
};
export const updaetUser = async(id:string,body:User)=>{
  const user = await updateUser(id,body)
  return user;
}
export const deleteUserService = async(id:string)=>{
  const user = await deleteUserRepo(id)

  return user
}
