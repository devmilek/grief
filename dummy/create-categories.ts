const createCategories = async () => {
  const categories = [
    {
      name: "Śniadania",
      image:
        "https://images.pexels.com/photos/15913452/pexels-photo-15913452/free-photo-of-jedzenie-zdrowy-warzywa-posilek.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Zupy",
      image:
        "https://images.pexels.com/photos/15913452/pexels-photo-15913452/free-photo-of-jedzenie-zdrowy-warzywa-posilek.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Dania główne",
      image:
        "https://images.pexels.com/photos/15913452/pexels-photo-15913452/free-photo-of-jedzenie-zdrowy-warzywa-posilek.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Desery",
      image:
        "https://images.pexels.com/photos/15913452/pexels-photo-15913452/free-photo-of-jedzenie-zdrowy-warzywa-posilek.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Napoje",
      image:
        "https://images.pexels.com/photos/15913452/pexels-photo-15913452/free-photo-of-jedzenie-zdrowy-warzywa-posilek.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Przekąski",
      image:
        "https://images.pexels.com/photos/15913452/pexels-photo-15913452/free-photo-of-jedzenie-zdrowy-warzywa-posilek.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Sałatki",
      image:
        "https://images.pexels.com/photos/15913452/pexels-photo-15913452/free-photo-of-jedzenie-zdrowy-warzywa-posilek.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Przetwory",
      image:
        "https://images.pexels.com/photos/15913452/pexels-photo-15913452/free-photo-of-jedzenie-zdrowy-warzywa-posilek.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Dodatki",
      image:
        "https://images.pexels.com/photos/15913452/pexels-photo-15913452/free-photo-of-jedzenie-zdrowy-warzywa-posilek.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Pieczywo",
      image:
        "https://images.pexels.com/photos/15913452/pexels-photo-15913452/free-photo-of-jedzenie-zdrowy-warzywa-posilek.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Wędliny",
      image:
        "https://images.pexels.com/photos/15913452/pexels-photo-15913452/free-photo-of-jedzenie-zdrowy-warzywa-posilek.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const { PrismaClient } = require("@prisma/client");
  const slugify = require("slugify");

  const db = new PrismaClient();

  await db.category.deleteMany();

  for (const category of categories) {
    await db.category.create({
      data: {
        ...category,
        slug: slugify(category.name, { lower: true }),
      },
    });
  }

  db.$disconnect();
};

createCategories();
