import { db } from '@/lib/db'
import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const BASE_URL = process.env.BASE_URL;
  const recipes = await db.recipe.findMany({
    take: 1000,
  });

  return recipes.map((recipe) => ({
    url: `${BASE_URL}recipe/${recipe.id}`,
    lastModified: recipe.updatedAt,
    changeFrequency: "never"
  }))
}