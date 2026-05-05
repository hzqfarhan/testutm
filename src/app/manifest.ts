import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Resilience Agent',
    short_name: 'Resilience',
    description: 'AI-powered financial resilience companion for students.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8FAFC',
    theme_color: '#1E3A8A',
    icons: [
      {
        src: '/utmkathon/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/utmkathon/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],

  }
}
