## the thing starts with @ is called attribute.

## but with @@ it is called block level attribute.

```js
model Person {
  email String
  age  Int

  @@unique([email, age])
  @@index([email])
}
```

> this code tells that commbibination of email and age should be unique.

- that means. there can not be multiple person with same email and age.
- but there can be multiple person with same email but different age or same age but different email.

> for the index part. it is used to make the search faster.

#### there has one more like @@id attribute

```js
model Person {
  // id String @id @default(auto()) @map("_id") @db.ObjectId
  email String
  age  Int

  @@id([email, age])
}
```

> we can use @@id attribute to make the combination of email and age as id.so then we can remove the id String @id @default(auto()) @map("\_id") @db.ObjectId field.
