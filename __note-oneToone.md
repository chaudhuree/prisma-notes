# One-to-one relations
- one-to-one relation
  - one person can have one preferences
  - one preferences can have one person

> #### below code is the demonstration of one-to-one relation

```js
model Person {
  preferences   Preferences?
}
model Preferences {
  person      Person? @relation(fields: [personId], references: [id])
  personId    String? @unique @db.ObjectId
  from        String
}
```
- @unique @db.ObjectId
  - @unique: this is used to make the field unique
  - @db.ObjectId: this is used to make the field as ObjectId

- its like in mongodb

```js
  person= mongoose.schema.ObjectId
```

> #### this can be achieved by using the below code also:
```js
model Person {
  preferences   Preferences? @relation(fields: [preferencesId], references: [id])
  preferencesId String?      @unique @db.ObjectId
}
model Preferences {
  person      Person?
  from        String
}
```