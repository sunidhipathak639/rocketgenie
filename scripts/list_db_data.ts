import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function listData() {
  const payload = await getPayload({ config: configPromise })
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
  })
  console.log('📂 Categories in DB:')
  categories.docs.forEach(cat => console.log(`- ${cat.name}`))
  
  const cities = await payload.find({
    collection: 'cities',
    limit: 100,
  })
  console.log('\n🏙️ Cities in DB:')
  cities.docs.forEach(city => console.log(`- ${city.name}`))
  
  process.exit(0)
}

listData()
