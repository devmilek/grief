const createDiets = async () => {
  const diets = [
    "Bez glutenu",
    "Bez laktozy",
    "Bez cukru",
    "Dla dzieci",
    "Dietetyczne",
    "Wegetariańskie",
    "Wegańskie",
    "Dla zdrowia",
    "Ketogeniczne",
  ];

  const { PrismaClient } = require("@prisma/client");
  const slugify = require("slugify");

  const db = new PrismaClient();

  await db.diet.deleteMany();

  for (const diet of diets) {
    await db.diet.create({
      data: {
        name: diet,
      },
    });
  }

  db.$disconnect();
};

createDiets();
