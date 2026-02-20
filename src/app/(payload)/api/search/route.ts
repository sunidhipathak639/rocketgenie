import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q') || ''
  const cityId = searchParams.get('city') || ''

  if (!query && !cityId) {
    return NextResponse.json({ docs: [] })
  }

  const payload = await getPayload({ config: configPromise })

  try {
    // 1. Find categories that match the query
    const matchedCategories = query ? await payload.find({
      collection: 'categories',
      where: {
        or: [
          { name: { contains: query } },
          { description: { contains: query } },
          { slug: { contains: query } },
        ],
      },
      limit: 10,
    }) : { docs: [] }

    const categoryIds = matchedCategories.docs.map(cat => cat.id)

    // 2. Build the business query
    const businessWhere: any = {
      status: { equals: 'active' },
    }

    const orConditions: any[] = []

    if (query) {
      orConditions.push({ name: { contains: query } })
      orConditions.push({ address: { contains: query } })
      // Search in richText description is complex with standard filters, 
      // but 'contains' might work depending on Payload version and DB adapter.
      // For now, focusing on searchable fields.
    }

    if (categoryIds.length > 0) {
      orConditions.push({ category: { in: categoryIds } })
    }

    if (orConditions.length > 0) {
      businessWhere.or = orConditions
    }

    if (cityId && cityId !== 'all') {
      businessWhere.city = { equals: cityId }
    }

    const businesses = await payload.find({
      collection: 'businesses',
      where: businessWhere,
      limit: 50,
      depth: 1, // Ensure nested city and category are available
    })

    return NextResponse.json(businesses)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
