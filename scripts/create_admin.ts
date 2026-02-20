import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function createAdmin() {
  const payload = await getPayload({ config: configPromise })

  const existing = await payload.find({
    collection: 'users',
    where: { role: { equals: 'admin' } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log('✅ Admin already exists:', existing.docs[0].email)
    process.exit(0)
  }

  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@rocketgenie.com',
      password: 'AdminPassword123!',
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      status: 'active',
    },
  })

  console.log('✅ Admin user created: admin@rocketgenie.com / AdminPassword123!')
  process.exit(0)
}

createAdmin()
