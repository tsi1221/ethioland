import prisma from "../prisma.js";

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
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(user);
  } catch (error) {
    res.json(user);
  }
}

//delete user
export const deleteUser = async(req, res) => {
  try {
    const user = await prisma.user.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//

