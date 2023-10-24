const createCuisines = async () => {
  const cuisines = [
    "Amerykańska",
    "Czeska",
    "Włoska",
    "Indyjska",
    "Chińska",
    "Bałkańska",
    "Węgierska",
    "Ukraińska",
    "Azjatycka",
    "Polska",
    "Meksykańska",
    "Francuska",
    "Grecka",
    "Tajska",
    "Śródziemnomorska",
    "Żydowska",
  ];

  const { PrismaClient } = require("@prisma/client");
  const slugify = require("slugify");

  const db = new PrismaClient();

  await db.cuisine.deleteMany();

  for (const cuisine of cuisines) {
    await db.cuisine.create({
      data: {
        name: cuisine,
      },
    });
  }

  db.$disconnect();
};

createCuisines();
