import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

const STAFF_PASSWORD = 'User1@#'

const INDIAN_NAMES = [
  { first: 'Rahul', last: 'Kumar' },
  { first: 'Priya', last: 'Sharma' },
  { first: 'Vikram', last: 'Singh' },
  { first: 'Anjali', last: 'Patel' },
  { first: 'Arjun', last: 'Reddy' },
  { first: 'Sneha', last: 'Nair' },
  { first: 'Rohan', last: 'Menon' },
  { first: 'Kavya', last: 'Iyer' },
  { first: 'Aditya', last: 'Joshi' },
  { first: 'Meera', last: 'Desai' },
  { first: 'Suresh', last: 'Pillai' },
  { first: 'Divya', last: 'Krishnan' },
  { first: 'Rajesh', last: 'Nambiar' },
  { first: 'Lakshmi', last: 'Venkatesh' },
  { first: 'Karthik', last: 'Rao' },
  { first: 'Pooja', last: 'Gupta' },
  { first: 'Manoj', last: 'Shah' },
  { first: 'Deepa', last: 'Mehta' },
  { first: 'Sanjay', last: 'Bhatt' },
  { first: 'Neha', last: 'Kapoor' },
]

function emailFromName(first: string, last: string): string {
  return `${first.toLowerCase()}.${last.toLowerCase()}@gmail.com`
}

async function seedStaffUsers() {
  try {
    const payload = await getPayload({ config: await configPromise })

    console.log('\n=== Seeding 20 staff users ===\n')
    console.log(`Password for all: ${STAFF_PASSWORD}\n`)

    for (let i = 0; i < INDIAN_NAMES.length; i++) {
      const { first, last } = INDIAN_NAMES[i]
      const name = `${first} ${last}`
      const email = emailFromName(first, last)

      const existing = await payload.find({
        collection: 'users',
        where: { email: { equals: email } },
        limit: 1,
        overrideAccess: true,
      })

      if (existing.docs.length > 0) {
        console.log(`Skip (exists): ${email} - ${name}`)
        continue
      }

      await payload.create({
        collection: 'users',
        data: {
          email,
          password: STAFF_PASSWORD,
        },
        overrideAccess: true,
      })

      console.log(`Created: ${email} - ${name}`)
    }

    console.log('\n=== Done ===\n')
  } catch (error) {
    console.error('Seed failed:', error)
    process.exit(1)
  }

  process.exit(0)
}

seedStaffUsers()
