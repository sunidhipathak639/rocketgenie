import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function cleanup() {
  const payload = await getPayload({ config: configPromise })
  
  console.log('🧹 Selective cleanup...')
  
  // 1. Delete Businesses
  let deletedCount = 0
  while (true) {
    const businesses = await payload.find({
      collection: 'businesses',
      limit: 100,
      select: { id: true }
    })
    
    if (businesses.docs.length === 0) break
    
    for (const doc of businesses.docs) {
      await payload.delete({
        collection: 'businesses',
        id: doc.id
      })
      deletedCount++
      if (deletedCount % 10 === 0) process.stdout.write('.')
    }
    console.log(`\n✅ Deleted ${deletedCount} businesses`)
  }

  // 2. Delete Categories
  const categories = await payload.find({ collection: 'categories', limit: 100 })
  for (const cat of categories.docs) {
    await payload.delete({ collection: 'categories', id: cat.id })
  }
  console.log('✅ Deleted categories')

  // 3. Delete Cities
  const cities = await payload.find({ collection: 'cities', limit: 100 })
  for (const city of cities.docs) {
    await payload.delete({ collection: 'cities', id: city.id })
  }
  console.log('✅ Deleted cities')

  process.exit(0)
}

cleanup()
