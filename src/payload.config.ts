import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Cities } from './collections/Cities'
import { Categories } from './collections/Categories'
import { Businesses } from './collections/Businesses'
import { Enquiries } from './collections/Enquiries'
import { Reviews } from './collections/Reviews'
import { Blog } from './collections/Blog'
import { Settings } from './globals/Settings'
import { Navigation } from './globals/Navigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// In production (Vercel), set PAYLOAD_SECRET and POSTGRES_URL in Project → Settings → Environment Variables.
// If they are missing, you'll see a server error and the real message in Vercel → Logs.

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- Rocket Genie',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/icon.png',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          url: '/favicon.ico',
        },
      ],
    },
    components: {
      // graphics: {
      //   Logo: '/components/graphics/Logo',
      //   Icon: '/components/graphics/Icon',
      // },
    },
  },
  collections: [Users, Media, Cities, Categories, Businesses, Enquiries, Reviews, Blog],
  globals: [Settings, Navigation],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || '', process.env.CORS_ORIGINS || ''].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || '', process.env.CORS_ORIGINS || ''].filter(Boolean),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // clientUploads: false to avoid bundling plugin's @payloadcms/ui (version mismatch). Server uploads work for images under 4.5MB.
    }),
  ],
})
