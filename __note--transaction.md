> 🔥🔥 transaction in prisma.

> it has two item. batch and transaction.

- batch is for doing multiple operation at a time.
- transaction is for doing multiple operation at a time and rollback if any error occurs.

> 🔥🔥 batch

```js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
 
// 1. We first create three unresolved queries ...


const createUser = prisma.user.create({
  data: {
    name: "Bob",
    email: "bob@prisma.io",
    age: 49,
    country: "USA",
  },
});

const updateUser = prisma.user.update({
  where: { email: "lomo@prisma.io" },
  data: { country: "Germany" },
});

const deleteUser = prisma.user.delete({ where: { email: "bava@prisma.io" } });

// 2. .. and then submit all three at once to be executed in a single database transaction.


const [bob, carol, nilu] = await prisma.$transaction([
  createUser,
  updateUser,
  deleteUser,
]);

console.log(
  "Created, updated and deleted 3 user records in a single transaction.",
  bob,
  carol,
  nilu
);
```


> 🔥🔥 transaction

```js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

await prisma.$transaction(async (tx) => {
  // 1. Create a new user ...
  const user = await tx.user.create({
    data: {
      email: "chaudhuree@prisma.io",
      age: 42,
      country: "Germany",
      name: "Nikolas Burk",
    },
  });

  // 2. ... then load the number of users in the database ...
  const count = await tx.user.count();

  // 3. ... and use the `count` as information in a new query
  await tx.post.create({
    data: {
      title: `I am user #${count} in the database.`,
      authorId: user.id,
    },
  });
});

// Validate that the transaction was executed successfully
const user = await prisma.user.findUnique({
  where: { email: "chaudhuree@prisma.io" },
  include: { posts: true },
});
console.dir(user, { depth: null });
```


> example two:
```js
model Account {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  name      String?
  balance   Int     @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
async function transfer(from: string, to: string, amount: number) {
  return await prisma.$transaction(async (tx) => {
    // 1. Decrement amount from the sender.
    const sender = await tx.account.update({
      data: {
        balance: {
          decrement: amount,
        },
      },
      where: {
        email: from,
      },
    })

    // 2. Verify that the sender's balance didn't go below zero.
    if (sender.balance < 0) {
      throw new Error(`${from} doesn't have enough to send ${amount}`)
    }

    // 3. Increment the recipient's balance by amount
    const recipient = await tx.account.update({
      data: {
        balance: {
          increment: amount,
        },
      },
      where: {
        email: to,
      },
    })

    return recipient
  })
}

async function main() {
  // This transfer is successful
  await transfer('alice@prisma.io', 'bob@prisma.io', 100)
  // This transfer fails because Alice doesn't have enough funds in her account
  await transfer('alice@prisma.io', 'bob@prisma.io', 100)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```