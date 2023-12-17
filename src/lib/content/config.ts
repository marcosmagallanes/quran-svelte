// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// 2. Define a `type` and `schema` for each collection

const quran = defineCollection({
  type: "data", // v2.5.0 and later
  schema: z.object({
    id: z.number(),
    name: z.string(),
    transliteration: z.string(),
    translation: z.string(),
    type: z.string(),
    total_verses: z.number(),
    verses: z.record(z.string(), z.string()),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  quran: quran,
};
