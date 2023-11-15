import {
  categories,
  cuisines,
  diets,
  occasions,
  profiles,
} from "@/data/placeholder-data";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  // CREATE USERS
  const user = await prisma.profile.createMany({
    data: profiles,
  });

  // CREATE CATEGORIES
  const cat = await prisma.category.createMany({
    data: categories,
  });

  // CREATE CUISINES
  const cui = await prisma.cuisine.createMany({
    data: cuisines,
  });

  //   CREATE OCCASIONS
  const occ = await prisma.occasion.createMany({
    data: occasions,
  });

  //   CREATE DIETS
  const die = await prisma.diet.createMany({
    data: diets,
  });

  console.log({ user });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
