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

// create person

exports.createPerson = async (req, res) => {
  const { name, email } = req.body;
  try {
    await prisma.person.deleteMany({}); // delete all persons
    const person = await prisma.person.create({
      data: {
        email,
        name,
        age: 27,
        preferences: {
          create: {
            updateEmail: true
          },
        },

      },
      include: {
        preferences: true
      }
    });
    res.json(person);
  } catch (error) {
    console.log(error);
  }
}