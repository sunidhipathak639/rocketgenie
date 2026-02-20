import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function test() {
  console.log('Connecting...')
  const payload = await getPayload({ config: configPromise })
  console.log('Connected.')
  const biz = await payload.find({ collection: 'businesses', limit: 1 })
  if (biz.docs.length > 0) {
    console.log('Deleting one business...')
    await payload.delete({ collection: 'businesses', id: biz.docs[0].id })
    console.log('Deleted.')
  } else {
    console.log('No businesses found.')
  }
  process.exit(0)
}

test()
