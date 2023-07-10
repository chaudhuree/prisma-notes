# Many to Many relationship.

- many-to-many relation
  - one post can have many categories
  - one category can have many posts

> for mongodb:

```js 
model Post {
  
  categoryIDs String[]   @db.ObjectId
  categories  Category[] @relation(fields: [categoryIDs], references: [id])
}

model Category {

  name    String
  postIDs String[] @db.ObjectId
  posts   Post[]   @relation(fields: [postIDs], references: [id])
}
```

> for postgresql or mysql:

```js
model Post {

  category  Category[] //many-to-many

}

model Category {

  posts Post[] //many-to-many
}
```

> thats it. nothing fancy. many to many no need to add anything else. prisma will automatically do the rest by itself.
