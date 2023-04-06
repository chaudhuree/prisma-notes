const prisma = require("../prisma/index");

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
    // await prisma.person.deleteMany({}); // delete all persons
    const person = await prisma.person.create({
      data: {
        email,
        name,
        age: 29,
        preferences: {
          create: {
            updateEmail: true,
            from: "panchbibi",
          },
        },
      },
      // include: {
      //   preferences: true
      // }
      //include is like populate in mongoose
      select: {
        name: true,
        preferences: {
          select: {
            updateEmail: true,
            from: true,
          },
        },
      },
    });
    res.json(person);
  } catch (error) {
    console.log(error);
  }
};

// create many
exports.createMany = async (req, res) => {
  try {
    const persons = await prisma.person.createMany({
      data: [
        {
          email: "sohan3@gmail.com",
          name: "sohan",
          age: 25,
        },
        {
          email: "sohan4@gmail.com",
          name: "sohan",
          age: 26,
        },
      ],
    });
    res.json(persons);
  } catch (error) {
    console.log(error);
  }
};

//find one
exports.findOne = async (req, res) => {
  const { id } = req.body;
  try {
    const person = await prisma.person.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        preferences: {
          select: {
            updateEmail: true,
            from: true,
          }
        }
      },
    });
    res.json(person);
  } catch (error) {
    console.log(error);
  }
};

//find first
exports.findFirst = async (req, res) => {
  try {
    const person = await prisma.person.findFirst({
      where: {
        name: "sohan",
      },
      select: {
        name: true,
      },
    });
    res.json(person);
  } catch (error) {
    console.log(error);
  }
};

//find many
exports.findMany = async (req, res) => {
  try {
    const persons = await prisma.person.findMany({
      where: {
        name: "sohan",
      },
      select: {
        name: true,
      },
    });
    res.json(persons);
  } catch (error) {
    console.log(error);
  }
};

//update person
exports.updatePerson = async (req, res) => {
  const { id, name } = req.body;
  try {
    const person = await prisma.person.update({
      where: {
        id: id,
      },
      data: {
        name,
        preferences: {
          //if any user does then it will throw error.
          update: {
            updateEmail: false,
            from: "dhaka",
          },
        },
      },
    });
    res.json(person);
  } catch (error) {
    console.log(error);
  }
};

// upsert person preferences
// not working
// exports.upsertPerson = async (req, res) => {
//   const { id } = req.body;
//   //642f023d744777ca9bf102ee
//   try {
//     const person = await prisma.person.upsert({
//       where: {
//         id: '642f023d744777ca9bf102ee',
//         email: 'kabir2@gmail.com'
//       },
//       update: {
//         preferences: {
//           update: {
//             updateEmail: true,
//             from: 'baridhara'
//           }
//         }
//       },
//       create: {
//         email: "kabir2@gmail.com",
//         name: "kabir2",
//         age: 29,
//         preferences: {
//           create: {
//             updateEmail: true,
//             from: 'damra'
//           },
//         },
//       }
//     });
//     res.json(person);
//   } catch (error) {
//     console.log(error);
//   }
// }

// distinct
// distinct actually return the unique value of the field
exports.distinctPerson = async (req, res) => {
  try {
    const persons = await prisma.person.findMany({
      where: {
        name: "sohan",
      },
      distinct: ["name", age],
    });
    res.json(persons);
  } catch (error) {
    console.log(error);
  }
};

// pagination==>take
exports.paginationPerson = async (req, res) => {
  try {
    const persons = await prisma.person.findMany({
      where: {
        name: "sohan",
      },
      orderBy: {
        age: "desc",
      },
      take: 2,
      skip: 1,
    });
    res.json(persons);
  } catch (error) {
    console.log(error);
  }
};
exports.notPerson = async (req, res) => {
  try {
    const persons = await prisma.person.findMany({
      where: {
        name: { not: "sohan" },
        //name:{equals:'sohan'}
        //name:{in:['sohan','kabir']}
        //name:{notIn:['sohan','kabir']}
        age: { gt: 25 }, //greater than
        // age: { gte: 25 } //greater than or equal
        // age: { lt: 25 } //less than
        // age: { lte: 25 } //less than or equal
      },
      //where:{email:{contains:'@gmail.com'}}
      //where:{email:{endsWith:'@gmail.com'}}
      //where:{email:{startsWith:'sohan'}}
      orderBy: {
        age: "desc",
      },
      take: 2,
      skip: 1,
    });
    res.json(persons);
  } catch (error) {
    console.log(error);
  }
};

//where query
/*
  where:{
    AND:[{name:'sohan'},{age:25},{email:{contains:'@gmail.com'}}]
  }
  where:{
    OR:[{email:{startsWith:'sohan'}},{age:{gt:25}}]
  }

  where:{
    NOT:[{email:{startsWith:'sohan'}},{age:{gt:25}}]
  }

  //query in relationship 
where:{
  userpreferences:{
    updateEmail:true
  }
}

//for one to one relationship

where:{
  writtenPosts:{
    every:{
      title:"test"
    }
  }
where:{
  writtenPosts:{
    none:{
      title:"test"
    }
  }
where:{
  writtenPosts:{
    some:{
      title:"test"
    }
  }
where:{
  writtenPosts:{
    some:{
      title:{startsWith:"test"}
    }
  }


  //post

const post = await prisma.post.findMany({
  where:{
    author:{
      is:{
        age:27
      }
     }
   }
*/




// update data

exports.updatePersonAgain = async (req, res) => {
  const person = await prisma.person.update({
    where: {
      email: 'kabir1@gmail.com'
    },
    data: {
      email: 'kabir22@gmail.com'
    }
  })
}

// update many person
exports.updateManyPerson = async (req, res) => {
  const person = await prisma.person.updateMany({
    where: {
      name: 'sohan'
    },
    data: {
      name: 'sohanupdated'
    }
  })
}

//increment and decrement can be done while updating but make sure while finding the data it should by the unique field.like for our case email is unique field


exports.connectPreference = async (req, res) => {
  const person = await prisma.person.update({
    where: {
      id: "642f023d744777ca9bf102ee"
    },
    data: {
      preferences: {
        connect: {
          id: '642f0f94a95b98296de07033'
        }
      }
    }
  })
  res.json(person)
}

//create preference
exports.createPreference = async (req, res) => {
  const preference = await prisma.preferences.create({
    data: {
      updateEmail: true,
      from: 'dinajpur'
    }
  })
  res.json(preference)
}