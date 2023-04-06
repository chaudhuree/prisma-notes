const prisma = require('../prisma/index')

//get all persons
exports.getPersons = async (req, res) => {
  try {
    const persons = await prisma.person.findMany();
    res.json(persons);
  } catch (error) {
    console.log(error);
  }
};