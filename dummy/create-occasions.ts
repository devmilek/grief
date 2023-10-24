const createOccasions = async () => {
  const occasions = [
    "Wielkanoc",
    "Boże narodzenie",
    "Impreza",
    "Grill",
    "Tłusty czwartek",
    "Walentynki",
    "Halloween",
    "Komunia",
    "Do pracy",
  ];

  const { PrismaClient } = require("@prisma/client");
  const slugify = require("slugify");

  const db = new PrismaClient();

  await db.occasion.deleteMany();

  for (const occasion of occasions) {
    await db.occasion.create({
      data: {
        name: occasion,
      },
    });
  }

  db.$disconnect();
};

createOccasions();
