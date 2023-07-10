# in the controller first import this line

```js
const prisma = require("../prisma/index");
```

> ## we will work on this schema first

```js
model User {
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
  email String  @unique
  name  String?
}
```

## for creating an user we will use this code

> this is the syntax for creating an data

```js
prisma.user.create({});
```

- create user

```js
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
```

## for reading data from database.

> this is the syntax for reading an data

```js
prisma.user.findUnique({ where: { condition } }); //for single data
prisma.user.findMany(); //for all data
prisma.user.findMany({ where: { condition } }); //for all data with condition
```

```js
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
```

```js
//get all users
exports.getUsers = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
  } catch (error) {
    console.log(error);
  }
};
```

```js
// find many with condition so that we can filter data
const persons = await prisma.user.findMany({
  where: {
    age: {
      gt: 18,
    },
  },
});

console.log(persons);
```
