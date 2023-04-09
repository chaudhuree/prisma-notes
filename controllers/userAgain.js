const prisma = require("../prisma/index");

// creating user without address
exports.createUserAgain = async (req, res) => {
  const { name, email } = req.body;
  try {
    const userAgain = await prisma.userAgain.create({
      data: {
        name: name,
        email: email,
      },
    });
    res.json(userAgain);
  } catch (error) {
    console.log(error);
  }
}
//create user with single 
exports.createUserAgainTwo = async (req, res) => {
  const { name, email } = req.body;
  try {
    const userAgain = await prisma.userAgain.create({
      data: {
        name: name,
        email: email,
        address: {
          create: {
            city: "Dinajpur",
          }
        }
      },
    });
    res.json(userAgain);
  } catch (error) {
    console.log(error);
  }
}
//create user with multiple address
exports.createUserAgainThree = async (req, res) => {
  const { name, email } = req.body;
  try {
    const userAgain = await prisma.userAgain.create({
      data: {
        name: name,
        email: email,
        address: {
          create: [
            { city: "belgium" },
            { city: "nougaon" }
          ]
        }
      },
    });
    res.json(userAgain);
  } catch (error) {
    console.log(error);
  }
}
//find user
exports.findUser = async (req, res) => {
  const user = await prisma.userAgain.findUnique(
    {
      where: {
        id: "642f2bc3d52f91deba15294c"
      },
      include: {
        address: true
      }
    })
  res.json(user)
}
// create address
exports.createAddress = async (req, res) => {
  const address = await prisma.address.create({
    data: {
      city: "franch",
    }
  })
  res.json(address)
}

//address push into the users address field
exports.addressPush = async (req, res) => {

  const address = await prisma.userAgain.update({
    where: {
      id: "642f1829a935de802247c02f",
    },
    data: {
      address: {
        connect: {
          id: "642f1c1d1ed3978e2d0d3ba9"
        }
      }
    }
  })
  res.json(address)
}

//disconnect address from user address array field
// for one to one disconnect: true likhlei hobe
// for disconnect or deleta all address:{deleteMany:{}}
exports.addressDisconnect = async (req, res) => {
  const address = await prisma.userAgain.update({
    where: {
      id: "642f2bc3d52f91deba15294c",
    },
    data: {
      address: {
        disconnect: {
          id: "642f2bc3d52f91deba15294d"
        }
      }
    }
  })
  res.send("done")
}

//==> another way to delete address from user
// just delete it from specific model
// if i delete the id from address schima then it will not be availabe in user
// const address = await prisma.address.delete({
//   where: {
//     id: "642f23f4fd314bc9fc68cbfe"
//   }
// })
// res.json(address)