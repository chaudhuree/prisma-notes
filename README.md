> prisma setup:

```
npm init -y
npm install prisma --save-dev
```

```
npx prisma
```

```
npx prisma init
```

> in schema.prisma:

```
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

> in .env

```
DATABASE_URL="mongodb://localhost:27017"
```

```
npm install @prisma/client
```

## add some code in schema.prisma

```
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  posts     Post[]
  profile   Profile?
}
```

```
npx prisma generate
```

> create index.js in prisma folder

```
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = prisma
```

## DONE

> settings.json:

** add this code in settings.json **

```
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma",
    "editor.formatOnSave": true
  },
```


documentation link: https://documenter.getpostman.com/view/20773865/2s93RZMVam

> #### next file to read:

- __note.md
- __note-oneToomany.md
- __note-manyTomany.md
- __note-oneToone.md