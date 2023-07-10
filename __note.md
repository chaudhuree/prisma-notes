> # setup related things are in REAME.md file

# for defining an id for mongodb:

```js
model User {
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
}
```

for postgresql:

```js
model User {
  id    String  @id @default(autoincrement())
}
```

> we can use uuid() instead of autoincrement() for postgresql.

```js
 model User {
  id    String  @id @default(uuid())
}
```

# after editing schema.prisma run this command:

```js
npx prisma generate
```

for other db:

```js
npx prisma migrate dev --name init
```

# model item has four fields each.

```js
name
type
modifier
attribute
```

example:

```js
model User {
id    String  @id @default(auto()) @map("_id") @db.ObjectId
name  String? @unique
posts Post[]
}

name=name.
type=string.
modifier= ? --> it refers this field is optional
          [] --> it refers this field is array of items(in this case post)
attribute= @unique --> it refers this field is unique
```

# datatype:

1. String
2. Int
3. Float
4. Boolean
5. DateTime
6. Json --> for storing json data it is only for postgresql
7. Bytes --> for storing image
8. Unsupported --> for storing unsupported data
9. enum --> for storing enum data
10. db.ObjectId --> for storing mongodb id --> relationship

```js
model Person {
  email         String
  age           Int
  role          Role         @default(BASIC) // enum
  largeNumber BigInt
  blob        Bytes         // for image
  usp         Unsupported("")
  writtenPosts  Post[]       @relation("WrittenPosts") //one-to-many
  preferences   Preferences? @relation(fields: [preferencesId], references: [id])
  preferencesId String?      @unique @db.ObjectId  //one-to-one

  //block level
  // @@unique([age, name])
}
```

> for enum type. this is used in the role field of User model in the above example.

```js
enum Role {
  BASIC
  EDITOR
  ADMIN
}
```

> for preference field of Person model in the above example.

```js
model Preferences {
  person      Person?
  from        String
}
```

> for writtenPosts field of Person model in the above example.

```js
model Post {
  averageRating  Float  // for rating like 4.7
  createdAt      DateTime  @default(now())
  notedAt        DateTime?
  updatedAt      DateTime  @updatedAt  // every time when we update this data it will update the updatedAt field
  published      Boolean   @default(false)
  author         Person    @relation("WrittenPosts", fields: [authorId], references: [id])
  authorId       String    @db.ObjectId
}


# relation:

1. one-to-many relation
  - one person can write many posts
  - one post can be written by one person

2. many-to-many relation
  - one post can have many categories
  - one category can have many posts

3. one-to-one relation
  - one person can have one preferences
  - one preferences can have one person

```
