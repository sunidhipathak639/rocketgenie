import 'dotenv/config'
import pg from 'pg'

async function checkTables() {
  const client = new pg.Client({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
  })
  await client.connect()
  const res = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
  `)
  console.log('Tables:', res.rows.map(r => r.table_name))
  await client.end()
}

checkTables()
