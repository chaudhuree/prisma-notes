## main mongodb schema

```js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

// User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  likedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const User = mongoose.model("User", userSchema);
```

> ## converted prisma schema:

```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

// User model
model User {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  username     String   @unique
  // one usr can have many liked posts
  likedPosts   Post[]   @relation(name: "userLikedPosts", fields: [likedPostIds], references: [id]) //many to many
  likedPostIds String[] @db.ObjectId  //many to many


  // one usr can have many posts
  posts        Post[]   @relation(name: "postCreator")  //one to many
}

// Post model
model Post {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  content   String
  // one post can liked by many users
  likedBy   User[]   @relation(name: "userLikedPosts", fields: [likedById], references: [id]) //many to many
  likedById String[] @db.ObjectId //many to many


  // one post can have one creator
  User   User   @relation(name: "postCreator", fields: [userId], references: [id])  // one to many
  userId String @db.ObjectId  // one to many
}

```

- main theme ta hoitice. akjon user er onkegulo post thakte pare ja she nije likhce.abr shei user er r akta field thakte pare jetay she kon kon post like diyeche seta store thakbe. and ai hishebe, akta post er obossoi akta user or author ase. and post tar o akta field ase jetay k k sei post k like diyeche seta store thakbe.

- so aikhane,post er author akjon but author er post onekgulo. aita one to many relationship.

- akjon author/user er akta like kora post er array ache.and akta post k kara like korce setar list rakhar akta array field ache. aita many to many relationship.

- - so first case er jonne code ta hobe kicuta airokom.

```js
// User model
model User {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  username     String   @unique
  // one usr can have many posts
  posts        Post[]   @relation(name: "postCreator")  //one to many
}

// Post model
model Post {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  content   String
  // one post can have one creator
  User   User   @relation(name: "postCreator", fields: [userId], references: [id])  // one to many
  userId String @db.ObjectId  // one to many
}

```

- - and second er jonne code hobe airokom

```js
// User model
model User {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  username     String   @unique
  // one usr can have many liked posts
  likedPosts   Post[]   @relation(name: "userLikedPosts", fields: [likedPostIds], references: [id]) //many to many
  likedPostIds String[] @db.ObjectId  //many to many
}

// Post model
model Post {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  content   String
  // one post can liked by many users
  likedBy   User[]   @relation(name: "userLikedPosts", fields: [likedById], references: [id]) //many to many
  likedById String[] @db.ObjectId //many to many
}

```

> and ai duita k combine korle main code ta paye jaiteci.

> #### 🔥 NOTE: everyting is same just @relation er moddhe name field ta add korlei desired result ta pabo.
