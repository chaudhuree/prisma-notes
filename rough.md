```js
  model Post {
  id        String  @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  author    Person  @relation("WrittenPosts", fields: [authorId], references: [id])
  authorId  String  @db.ObjectId
  favorited Person[] @relation("FavoritePosts") //many-to-many
}
```

  ## but upore bolcilam aita jodi many to many relationship hoto tahole kivabe hoto. aita dekha jabe nicher code a.

 ## jodi many to many hoito tahole amra Post model a user er akta array banaitam and oitay user der id gulo rakhtam. so aitar example pore dea rakhteci.for now. comes to one to many relationship.