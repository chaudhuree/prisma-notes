generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

//  actual code starts here
model User {
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
  email String  @unique
  name  String?
}

//data model with different field types
model Person {
  id            String       @id @default(auto()) @map("_id") @db.ObjectId
  email         String       @unique
  name          String
  age           Int
  role          Role         @default(BASIC) // enum
  // largeNumber BigInt
  // blob        Bytes
  // usp         Unsupported("")
  writtenPosts  Post[]       @relation("WrittenPosts") //one-to-many
  favoritePosts Post[]       @relation("FavoritePosts") //one-to-many
  preferences   Preferences? @relation(fields: [preferencesId], references: [id])
  preferencesId String?      @unique @db.ObjectId

  //block level
  // @@unique([age, name])
}
// ১ -১ রিলেশনশিপ উপড়ে একটি আছে।
// একজন ইউজার একটা প্রেফারেন্স থাকতে পারে।

// ১ - ন রিলেশনশিপ উপড়ে দুইটি আছে।
// একজন ইউজার একাধিক পোস্ট লিখতে পারে।
// একজন ইউজার একাধিক পোস্ট ফেভারিট করতে পারে।

enum Role {
  BASIC
  EDITOR
  ADMIN
}

model Preferences {
  id          String  @id @default(auto()) @map("_id") @db.ObjectId
  person      Person?
  updateEmail Boolean
  from        String
}

model Post {
  id             String    @id @default(auto()) @map("_id") @db.ObjectId
  title          String
  averageRating  Float
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  author         Person    @relation("WrittenPosts", fields: [authorId], references: [id])
  authorId       String    @db.ObjectId
  favoriteBy     Person    @relation("FavoritePosts", fields: [favouritedById], references: [id])
  favouritedById String    @db.ObjectId
  Category       Category? @relation(fields: [categoryId], references: [id])
  categoryId     String?   @db.ObjectId
}

model Category {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  name  String @unique
  posts Post[] //one-to-many
}

//do new stuff here
model UserAgain {
  id      String    @id @default(auto()) @map("_id") @db.ObjectId
  email   String    @unique
  name    String?
  address Address[] @relation("local")
}

model Address {
  id          String     @id @default(auto()) @map("_id") @db.ObjectId
  city        String
  user        UserAgain? @relation("local", fields: [userAgainId], references: [id])
  userAgainId String?    @db.ObjectId
}



///

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
  likedPostIds String[] @db.ObjectId
  likedPosts   Post[]   @relation(name: "userLikedPosts", fields: [likedPostIds], references: [id])
  // posts        Post[]   @relation(name: "postCreator", fields: [postId], references: [id])
  // postId       String?  @db.ObjectId
  
 
}

// Post model
model Post {
  id        String  @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  content   String
  likedById String  @db.ObjectId
  likedBy   User[]  @relation(name: "userLikedPosts", fields: [likedById], references: [id])

  // User      User?   @relation(name:"postCreator",fields: [userId], references: [id])
  // userId    String? @db.ObjectId
  
}
