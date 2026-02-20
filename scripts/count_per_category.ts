import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function countPerCategory() {
  const payload = await getPayload({ config: configPromise })
  const categories = await payload.find({ collection: 'categories' })
  
  console.log('📊 Businesses per Category:')
  for (const cat of categories.docs) {
    const businesses = await payload.count({
      collection: 'businesses',
      where: { category: { equals: cat.id } }
    })
    console.log(`- ${cat.name}: ${businesses.totalDocs}`)
  }
  
  const ghostBusinesses = await payload.count({
    collection: 'businesses',
    where: { category: { exists: false } }
  })
  console.log(`- No Category: ${ghostBusinesses.totalDocs}`)

  process.exit(0)
}

countPerCategory()
