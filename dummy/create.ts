const create = async () => {
  await createDiets();
  await createCategories();
  await createCuisines();
  await createOccasions();
};
