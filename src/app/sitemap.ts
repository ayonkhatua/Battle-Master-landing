import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://battlemasterofficial.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Agar future mein About, Privacy Policy jaise pages banaoge, toh unko yahan add karte jana
  ]
}