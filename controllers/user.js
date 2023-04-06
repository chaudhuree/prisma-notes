const prisma = require('../prisma/index')

//create user
exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//delete all users
exports.deleteUsers = async (req, res) => {
  try {
    const users = await prisma.user.deleteMany();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

//get user by id
exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//get all users
exports.getUsers = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
  } catch (error) {
    console.log(error);
  }
};
