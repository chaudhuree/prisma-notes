
## one-to-many relation:

- one-to-many relation
  - one person can write many posts
  - one post can be written by only one person

> example code:

```js
model User {
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
  name  String
  posts Post[]
}

model Post {
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
  title String
  user  User   @relation(fields: [userId], references: [id])
  userId String @db.ObjectId
}
```
> explanation:

akjon user er onekgulo post thakte pare aitai one to many relationship er architecture.

```js
User model ↙

posts Post[]
```
ai code ta dea aitai bujhano hoice. tar mane, User model er post field ta ekta array of Post model er object. aikhane Post model er id gulo eshe store hobe jegulo te User model er id gulo match kore.

> now, Post model er moddheo kaj ase.

```js
user  User   @relation(fields: [userId], references: [id])   ▶ first line
userId String @db.ObjectId
```
- fields: kon field. mane Post model er kon field ( Post model a field ta ki name a ase ).
- reference: ki refer kortice.
- so aikhane dekha jasse, userId akta id refer kortice. 
  - r ai id ta kon jaygar id. seta line er first tukui.[ user User ]. that means User model k refer kortice.


1st line: aita foreign key er kaj kore. jeta User model er id er sathe relation ache.
like: relation(fields: [userId], references: [id])

means, Post model er userId field er sathe User model er id field er relation ache.and Post model er userId field ta r User model er id field same. and Post model er userId field ta User model er id field ta k store kore rakhtice.

note: field tar name kintu chage kore issa moto rakha jabe. like userId theke change kore authorId rakhteci nicher code a.
  
  ```js
  model User {
    id    String  @id @default(auto()) @map("_id") @db.ObjectId
    name  String
    posts Post[]
  }

  model Post {
    id    String  @id @default(auto()) @map("_id") @db.ObjectId
    title String
    user  User   @relation(fields: [authorId], references: [id])
    authorId String @db.ObjectId
  }
  ```




  # till now, akjon user er post a aktai reference cilo. mane akjon user akta post likhbe and tar kase sei post tar reference store thakbe. and post a sudhu user der id store thakbe j user shei post ta likhce.

  ### but akhn, akjon user er kase post er duita reference thakbe. like akta se likhce.and akta se favourite hishbe like dice.

  ### so post a o user er id r duita reference store korte hobe. aktay she author er id store kore rakhbe. r aktay she k k favourite hishbe like koreche seta store kore rakhbe.



  > #### sample code:

  ```js
  model Person {
  id            String       @id @default(auto()) @map("_id") @db.ObjectId
  email         String       @unique
  name          String
  writtenPosts  Post[]       @relation("WrittenPosts") //one-to-many
  favoritePosts Post[]       @relation("FavoritePosts") //one-to-many
}
  ```

  ```js
  model Post {
  id        String  @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  author    Person  @relation("WrittenPosts", fields: [authorId], references: [id])
  authorId  String  @db.ObjectId
  favorited Person? @relation("FavoritePosts", fields: [favoritedId], references: [id])
  favoritedId String? @db.ObjectId
}
  ```

> # explanation: 

  ## NOTE (🔥) : one thing to be noted. as per file name, aita one to many relationship. that means akta post just akjon darai favourited kora jabe.
  - uporer example a akjon user er kase post er duita reference thakbe. like akta se likhce.and akta se favourite hishbe like dice.
  - so Post model a o duita reference thakbe akta hold korbe k post ta create korce. and r akta rakhbe k favourite hishbe like koreche.(duita field e single User model er id hold korbe,cz aita one to many. aikhane many bolte User model er moddhe many post and favourite post thakte pare. but Post model er moddhe akta user er id thakbe for the author. and akta user er id thakbe for the favourite. so aitai one to many.)

  - here comes the collision💥.

  code ta amon howa uchit chilo.
  ```js
model Person {
  writtenPosts  Post[]      
  favoritePosts Post[]       
}

model Post {
  author    Person  @relation( fields: [authorId], references: [id])
  authorId  String  @db.ObjectId
  favorited Person? @relation( fields: [favoritedId], references: [id])
  favoritedId String? @db.ObjectId
  ```

  - but lokkho korle dekah jabe. code a aktu change ashce. er attribute use hoice User model er moddhe.and also post model a o change ashce.

  - aitar cz hoitice. as post User model er id store kore rakhe. so aikhane dekha jasse j take User model er id dui jaygay save korte hoitice. akta authorId and onnota favouriteId.

  - so aita confusion create kore.
  - ai collision dur korar jonne amader akta way ase 🔥.
  - way ta hoitice User er j j field ta Post model a refer hoitice oi oi field er akta kore name dea dite hobe and post a o mention kore dite hobe kon user er id kI name a save korbe. and ai jonne code change hoye hoyece..


 ```js
  model Person {
  writtenPosts  Post[]       @relation("WrittenPosts") //one-to-many
  favoritePosts Post[]       @relation("FavoritePosts") //one-to-many
}
```

```js
  model Post {
  id        String  @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  author    Person  @relation("WrittenPosts", fields: [authorId], references: [id])
  authorId  String  @db.ObjectId
  favorited Person? @relation("FavoritePosts", fields: [favoritedId], references: [id])
  favoritedId String? @db.ObjectId
}
```

  - favourited ta k "?" dea optional kore dewa hoyece. cz post ta j karo dara favorited hoitei hobe amon to na.

  > usually amon scenerion hoy na. but amader khetre hoice tai amonta kore dewa hoyece. mane aki model er sathe duibar one to many relationship hoy na.



এই ছিল ওায়ান টু মেনি রেলেশনশিপ রিলেটেড কোড  