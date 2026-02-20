import 'dotenv/config'
import pg from 'pg'

async function fastCleanup() {
  const client = new pg.Client({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
  })
  await client.connect()
  
  console.log('🧹 Truncating tables...')
  const tables = [
    'businesses', 
    'businesses_phone', 
    'businesses_email', 
    'businesses_rels', 
    'categories', 
    'cities', 
    'enquiries', 
    'reviews', 
    'reviews_rels'
  ]
  
  for (const table of tables) {
    try {
      await client.query(`TRUNCATE TABLE "${table}" CASCADE`)
      console.log(`✅ Truncated ${table}`)
    } catch (e) {
      console.error(`❌ Failed to truncate ${table}:`, e.message)
    }
  }
  
  await client.end()
  console.log('✨ Database wipe complete.')
  process.exit(0)
}

fastCleanup()
