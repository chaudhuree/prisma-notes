> prisma setup:

```bash
npm init -y
npm install prisma --save-dev
```

```bash
npx prisma
```

```bash
npx prisma init
```

> in schema.prisma:

```js
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

> in .env

```js
DATABASE_URL="mongodb://localhost:27017"
```

```bash
npm install @prisma/client
```

## add some code in schema.prisma

```js
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  posts     Post[]
  profile   Profile?
}
```
> after every chage in the schima :

#### for other sql database

```bash
npx prisma migrate dev anynamebecausisdoesnotmatter
```
>#### for mongodb no need to run migrate command  just run below command.

> after migration run this command

```bash
npx prisma generate
```

> create index.js in prisma folder

```js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = prisma
```

## DONE

> settings.json:

** add this code in settings.json **

```bash
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma",
    "editor.formatOnSave": true
  }
```


documentation link: https://documenter.getpostman.com/view/20773865/2s93RZMVam

> #### next file to read:

- __note.md
- __note-oneToomany.md
- __note-manyTomany.md
- __note-oneToone.md
- __note--bloclevelattribute.md
- __note-combinationOfOneTomanyAndManyToMany.md