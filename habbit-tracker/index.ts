const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const Day = await prisma.day.create({
    data: {
      date: '01/01/2021',
      habbits: {
        create: [
          {
            name: 'Workout',
            status: true,
          },
          {
            name: 'Read',
            status: false,
          },
        ],
      },
    },
  });
  console.log(Day);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
