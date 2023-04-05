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