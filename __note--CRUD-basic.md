> 📂 https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries 

> 📂 https://www.prisma.io/docs/concepts/components/prisma-client/crud 

> 📂 https://playground.prisma.io/examples/reading/find/find-all?host=playground.prisma.io&path=examples

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

> ## for creating an user we will use this code

> this is the syntax for creating an data

```js
prisma.user.create({ data: { newData } }); //for single data
prisma.user.createMany({ data: [{ newData }] }); //for all data
```

- create user

```js
exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: [{
        user1,
        user1@gmail.com,
      },
      {
        user2,
        user2@gmail.com,
      }
        ],
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
```

```js
const user = await prisma.user.createMany({
  data: {
    name,
    email,
  },
});
```

- nested create
- this is a complex example

- 📂schema for this is in __note-prisma-schema.md

```js
const user = await prisma.user.create({
  data: {
    name: "Nikolas Burk",
    age: 42,
    email: "burk23322@prisma.io",
    country: "Germany",
    profile: { create: { bio: "Pasionate teacher and learner" } },
    posts: {
      create: [
        {
          title: "How Germany will win the football world cup in 2026",
          categories: { create: { name: "Sports" } },
        },
      ],
    },
  },
  include: {
    profile: true,
    posts: { include: { categories: true } },
  },
});
```

> ## for reading data from database.

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

# 🔥🔥 include or in term of mongoose populate

> syntax for include

```js
prisma.user.findUnique({ where: { condition }, include: { relation } }); //for single data
prisma.user.findMany({ where: { condition }, include: { relation } }); //for all data
prisma.user.findMany({ include: { relation } }); //for all data
```

> code example

```js
// for single user with posts
const posts = await prisma.user.findUnique({
  where: { id: Number(id) },
  include: {
    posts: true,
  },
});
// for all users match with the condition with posts
const posts = await prisma.user.findMany({
  where: {
    email: {
      contains: "prisma.io",
    },
  },
  include: {
    posts: true,
  },
});
// for all users with posts
const posts = await prisma.user.findMany({
  include: {
    posts: true,
  },
});
```

- 📂 another example based on __note-prisma-schema.md

```js
const user = await prisma.user.findFirst({
  include: {
    posts: {
      include: {
        categories: true,
      },
    },
  },
});
```

> it will populate all the data from posts and categories in the user

> ## for updating data from database.

> this is the syntax for updating an data

```js
prisma.user.update({ where: { condition }, data: { newData } }); //for single data
prisma.user.updateMany({ where: { condition }, data: { newData } }); //for all data
```

```js
//update singel user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      // this can be like this also(means can use any one of this where)
      // where: { email:prisma.io },
      data: {
        name,
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
```

```js
//update many users
const updateUsers = await prisma.user.updateMany({
  where: {
    email: {
      contains: "prisma.io",
    },
  },
  data: {
    name: "updatedName",
  },
});
```

> ## upsert. means update if exist or create if not exist

syntax for upsert

```js
prisma.user.upsert({
  where: { condition },
  update: { newData },
  create: { newData },
});
```

> example code:

```js
const upsertUser = await prisma.user.upsert({
  where: {
    email: "viola@prisma.io",
  },
  update: {
    name: "Viola the Magnificent",
  },
  create: {
    email: "viola@prisma.io",
    name: "Viola the Magnificent",
  },
});
```

- - explaination: if email exist then update the name to "Viola the Magnificent" else create a new user with email and name "Viola the Magnificent"

## connect. it is used to connect two tables. like in user table we have a field called posts which is an array of post object id. so we can connect post to user by using connect.

```js
model User {
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
  email String  @unique
  name  String?
  posts []
}
```

```js
const user = await prisma.user.update({
  where: { email: "alice@prisma.io" },
  data: {
    posts: {
      connect: { id: 24 },
    },
  },
});
const user = await prisma.user.update({
  where: { email: "alice@prisma.io" },
  data: {
    posts: {
      connect: [{ id: 24 }, { id: 25 }],
    },
  },
});
```

> code explain: like , in upper one. in first case in a user's post array we are connecting a post with id 24. in second case we are connecting two post with id 24 and 25.

## disconnect. it is used to disconnect or remove a connection between two tables. by removing the id from the array.

```js
const user = await prisma.user.update({
  where: { email: "alice@prisma.com" },
  data: {
    posts: {
      disconnect: { id: 24 },
    },
  },
});
```

> now for the disconnect one. if we now populate or include posts in user. then we will not get the post with id 24. because we have disconnected it.

## connectOrCreate

> syntax for connectOrCreate

```js
prisma.user.update({
  where: { condition },
  data: {
    relation: {
      connectOrCreate: {
        create: { newData },
        where: { condition },
      },
    },
  },
});
```

In Prisma, the `connectOrCreate` feature allows you to either connect an existing record or create a new record when updating a relational field. Let's break down the code snippet to understand how `connectOrCreate` is used:

```javascript
const updatedUser = await prisma.user.update({
  where: { id: 1 },
  data: {
    posts: {
      connectOrCreate: {
        create: { title: "I like turtles" },
        where: { id: 10 },
      },
    },
  },
  include: { posts: true },
});

// multiple connectOrCreate
const updatedUserMC = await prisma.user.update({
  where: { email: "alice@prisma.io" },
  data: {
    posts: {
      connectOrCreate: [
        {
          where: { id: 32 },
          create: { title: "This is my first post" },
        },
        {
          where: { id: 19 },
          create: { title: "This is my second post" },
        },
      ],
    },
  },
});
```

- `posts`: Refers to the relational field named "posts" on the user model. It's an array of posts associated with the user.

- `connectOrCreate`: This is a special directive used for relational fields. It specifies that you want to either connect an existing post or create a new post. means with the condition like where ,if any data is available then connecect it to the posts[]. it's like arry.push(). but if with the codition no data is available then create a new data and connect it to the posts[].

- `create`: Specifies the data for creating a new post. In this case, the new post will have a title of "I like turtles".

- > `where: { id: 10 }`: Specifies the condition to find an existing post with an `id` of 10. If a post with this ID exists, it will be connected to the user. this id:10 then will have it's own value. which is already created. Otherwise, a new post will be created. in this time one thing is important. this new post will be created in the Post model. so if post model has a number of data like,4. then, when new post will create with the text: "I like turtles" then it will be the 5th data in the Post model.
  > and it's id will be 5. and it will be connected to the user with the id 5. so don't be confused with the id. like, data will be created with text "i like turtles" and it's id will be 10 as per in where clause it was serch with id 10. it will check post model for data id. and create with the next id of the last data id. so if last data id is 4 then it will create with id 5. and it will be connected to the user with id 5.

- `include: { posts: true }`: Specifies that you want to include the associated posts in the result. That means when we console log the user. it will show the user with the posts. like, user:

```js
{id:1,
name:"xyz",
posts:[
  {id:1, title:"i like turtles"},
  {id:2, title:"i like rabbits"}
  ]
}
```

## another update method (increment) and (decrement)

> now think user schima has a field like age and postCount.

```js
model User {
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
  email String  @unique
  name  String?
  age   Int?
  postCount Int?
}
```

> syntax for increment and decrement

```js
prisma.user.update({
  where: { condition },
  data: {
    field: {
      increment: number,
    },
    field: {
      decrement: number,
    },
  },
});
```

> example code:

```js
const updatedUser = await prisma.user.update({
  where: { id: 1 },
  data: {
    age: {
      increment: 1,
    },
    postCount: {
      decrement: 1,
    },
  },
});
```

- that means when we run this code every time. for each run, age will be increment by 1. and postCount will be decrement by 1.
- like suppose age: 20 and postCount: 10. then after run this code age will be 21 and postCount will be 9.

> another sample real life example:

```js
const updatePosts = await prisma.post.updateMany({
  data: {
    views: {
      increment: 1,
    },
    likes: {
      increment: 1,
    },
  },
});
```

> - nested update

- 📂 schema for this is in __note-prisma-schema.md file.

```js
// Assign an existing user as the new author of an existing post
const post = await prisma.post.update({
  where: { id: 1 },
  data: { author: { connect: { email: "ada@lovelace.dev" } } },
  include: { author: true },
});
```

> explain: Assign an existing user as the new author of an existing post

## count method and \_count method

> count is used to count the number of data in a table. and \_count is used to count the number of data in a table with a condition.

> syntax for count and \_count

```js
prisma.model.count(); // count all data in a table

prisma.model.count({
  where: { condition },
}); // count all data in a table with a condition.
```

code example:

```js
const allUsers = await prisma.user.count();

const allUsersWithAge = await prisma.user.count({
  where: { age: { gt: 18 } },
});
```

```js
const publishedPosts = await prisma.user.aggregate({
  _count: { _all: true },
});
```

- it wll give total number of user in the user table.

// now if any one want to count number of post written by a user then below query,

```js
const allUsers = await prisma.user.findMany({
  include: {
    posts: true,
  },
});

console.log(allUsers[0].posts.length);
```

- it will give the number of post written by the user.

// another way to count the number of post written by the user.

````js
const allUsers = await prisma.user.findMany({
include: {
  posts:true
},
select:{
  posts:{
    count:true
  }
}
});

# delete method

> syntax for delete method

```js
prisma.model.deleteMany(); // delete all data in a table
prisma.model.delete({
where: { condition },
});
````

> example code:

```js
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
```

> ## select method

> syntax for select method

```js
prisma.model.findMany({
  select: {
    field: true,
    field: true,
  },
});

// for nested select
prisma.model.findMany({
  select: {
    field: true,
    field: true,
    field: {
      select: {
        field: true,
        field: true,
      },
    },
  },
});
```

> example code:

```js
const users = await prisma.user.findUnique({
  where: { id: 2 },
  select: {
    name: true,
    age: true,
    posts: {
      select: {
        title: true,
      },
    },
  },
});
```

> 🔔🔔 one important note. include can nest select. but select and include can't be used in the same level.

❌❌ wrong code
  
  ```js
  const users = await prisma.user.findUnique({
    where: { id: 2 },
    select: {
      name: true,
      age: true,
    },
    include: {
      posts: {
        select: {
          title: true,
        },
      },
    },
  });
```

✅✅ correct code:

```js
const user = await prisma.user.findFirst({
  select: {
    // This will work!
    email: true,
    posts: {
      select: {
        title: true,
      },
    },
  },
})
```
✅✅ correct code:
```js
const user = await prisma.user.findFirst({
  include: {
    posts: {
      select: {
        title: true,
      },
    },
  },
})```