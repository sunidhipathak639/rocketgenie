import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function migrate() {
  const payload = await getPayload({ config: configPromise })
  
  let dataPath = path.join(__dirname, '../scraped_data_full.json')
  if (!fs.existsSync(dataPath)) {
    dataPath = path.join(__dirname, '../scraped_data_new.json')
  }
  if (!fs.existsSync(dataPath)) {
    dataPath = path.join(__dirname, '../scraped_data.json')
  }

  if (!fs.existsSync(dataPath)) {
    console.error('❌ No scraped data found.')
    process.exit(1)
  }

  console.log(`📂 Using data from: ${dataPath}`)
  const rawData = fs.readFileSync(dataPath, 'utf-8')
  const businesses = JSON.parse(rawData)

  // Pre-fetch setup
  const adminUsers = await payload.find({ collection: 'users', where: { role: { equals: 'admin' } }, limit: 1 })
  const ownerId = adminUsers.docs[0]?.id || (await payload.create({
    collection: 'users',
    data: { email: 'admin@rocketgenie.com', password: 'AdminPassword123!', role: 'admin', firstName: 'Admin', lastName: 'User' }
  })).id

  const categoryCache: Record<string, string | number> = {}
  const cityCache: Record<string, string | number> = {}

  let currentCategory = ""
  let categoryCount = 0

  console.log(`🚀 Starting migration of ${businesses.length} items...`)

  for (const item of businesses) {
    if (item.category !== currentCategory) {
      currentCategory = item.category
      console.log(`\n📂 Category: ${currentCategory}`)
    }

    try {
      // 1. Get/Create City
      const cityName = item.city || 'General'
      let cityId = cityCache[cityName]
      if (!cityId) {
        const existing = await payload.find({ collection: 'cities', where: { name: { equals: cityName } }, limit: 1 })
        cityId = existing.docs[0]?.id || (await payload.create({
          collection: 'cities',
          data: { name: cityName, slug: cityName.toLowerCase().replace(/[^a-z0-9]/g, '-'), active: true }
        })).id
        cityCache[cityName] = cityId
      }

      // 2. Get/Create Category
      let categoryId = categoryCache[item.category]
      if (!categoryId) {
        const existing = await payload.find({ collection: 'categories', where: { name: { equals: item.category } }, limit: 1 })
        categoryId = existing.docs[0]?.id || (await payload.create({
          collection: 'categories',
          data: { name: item.category, slug: item.category.toLowerCase().replace(/[^a-z0-9]/g, '-'), featured: true }
        })).id
        categoryCache[item.category] = categoryId
      }

      // 3. Fast check and create
      const existingBiz = await payload.find({
        collection: 'businesses',
        where: {
          and: [
            { name: { equals: item.name } },
            { category: { equals: categoryId } }
          ]
        },
        limit: 1,
      })

      if (existingBiz.docs.length > 0) {
        process.stdout.write('.')
        continue
      }

      await payload.create({
        collection: 'businesses',
        data: {
          name: item.name,
          owner: ownerId,
          category: categoryId,
          city: cityId,
          address: item.address && item.address !== 'N/A' ? item.address : '',
          phone: item.phone && item.phone !== 'N/A' ? [{ number: item.phone }] : [],
          status: 'active',
          verified: true,
          rating: parseFloat(item.rating) || 4.5,
          reviewCount: Math.floor(Math.random() * 100) + 10,
        },
      })
      process.stdout.write('✅')
    } catch (err: any) {
      console.error(`\n❌ Error with ${item.name}: ${err.message}`)
    }
  }

  console.log('\n🏁 Migration complete.')
  process.exit(0)
}

migrate()
