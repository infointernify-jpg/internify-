// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/auth/',        // ✅ Block auth pages
        '/profile/',
        '/dashboard/',
        '/forgot-password',  // ✅ Block forgot password
        '/reset-password',   // ✅ Block reset password
      ],
    },
    sitemap: 'https://www.tryinternify.in/sitemap.xml',
  }
}