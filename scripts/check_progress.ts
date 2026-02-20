import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function checkProgress() {
  const payload = await getPayload({ config: configPromise })
  const businesses = await payload.count({
    collection: 'businesses',
  })
  const cities = await payload.count({
    collection: 'cities',
  })
  const categories = await payload.count({
    collection: 'categories',
  })
  console.log(`📊 Current Status:`)
  console.log(`- Businesses: ${businesses.totalDocs}`)
  console.log(`- Cities: ${cities.totalDocs}`)
  console.log(`- Categories: ${categories.totalDocs}`)
  process.exit(0)
}

checkProgress()
