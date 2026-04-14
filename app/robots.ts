import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://undangandigital.com'
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/v/', '/demo/'],
        disallow: ['/dashboard/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
