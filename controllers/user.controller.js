import prisma from "../prisma.js";
import bcrypt from "bcryptjs";
export const getUsers = async(req, res) => {
  try {
    const users = await prisma.user.findMany();
   res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
/////get user
export const getUser = async(req, res) => {
  const id = req.params.id;
  try {
  
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//update user
export const updateUser = async(req, res) => {
  const id=req.params.id;
  const tokenUserId = req.userId;
  const body =req.body;
  const {password,avater,...inputs} = req.body;
  if (id!==tokenUserId){
    return res.status(403).json({message:"you are not authorized to update this user"}); // check if the user is trying to update their own data
  }
  let updatedPassword = null;
  try {
    if(password){
      updatedPassword = await bcrypt.hash(password,10); // hash the password id
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avater && { avater }),// update the avatar if provided
      },
    });


  const {password,...rest}= updatedUser;

    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}









































//delete user
export const deleteUser = async(req, res) => {

const id = req.params.id;
const tokenUserId = req.userId;
const {password,avater,...inputs} = req.body;
if (id !== tokenUserId){
  return res.status(403).json({message:"you are not authorized to delete this user"});
}





  try {
    const user = await prisma.user.delete({
      where: { id }
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//

