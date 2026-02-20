
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';
import configPromise from '../src/payload.config';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const CATEGORY_DATA: any = {
  'AC Service': { image: 'https://images.unsplash.com/photo-1590496793910-449e79f6485a?auto=format&fit=crop&q=80&w=800' },
  'Architect': { image: 'https://images.unsplash.com/photo-1503387762-592dea58ef41?auto=format&fit=crop&q=80&w=800' },
  'Beauty Salon': { image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800' },
  'Car Repair': { image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800' },
  'CA': { image: 'https://images.unsplash.com/photo-1554224155-16974a4e259b?auto=format&fit=crop&q=80&w=800' },
  'Carpenter': { image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800' },
  'Cleaning': { image: 'https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&q=80&w=800' },
  'Dentist': { image: 'https://images.unsplash.com/photo-1629909613654-28a3a7c4d409?auto=format&fit=crop&q=80&w=800' },
  'Electrician': { image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800' },
  'Event Planner': { image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800' },
  'Florist': { image: 'https://images.unsplash.com/photo-1591880911020-f02495b85040?auto=format&fit=crop&q=80&w=800' },
};

const BUSINESS_DATA = [
  {
    name: 'MSDC Software Solutions',
    map: 'https://www.google.com/maps/search/MSDC+Software+Solutions+Bangalore+Electronics+City+560100',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    address: 'Electronics City, Bangalore, KA 560100'
  },
  {
    name: 'Asha Computer Institute',
    map: 'https://www.google.com/maps/search/Asha+Computer+Institute+Govandi+West+Mumbai+400043',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    address: 'Govandi West, Mumbai, MH 400043'
  },
  {
    name: 'Success Computer',
    map: 'https://www.google.com/maps/place/Success+Computer/@25.602334,85.121517,17z/data=!4m6!3m5!1s0x39ed1937f37a5b3d:0x7e70d4c82c2c0a96!8m2!3d25.602334!4d85.121517!16s%2Fg%2F11b6m28z2y?hl=en',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800',
    address: 'AG Colony, Patna, Bihar'
  },
  {
    name: 'KRISHNA AIR CONDITIONING',
    map: 'https://www.google.com/maps/place/KRISHNA+AIR+CONDITIONING/@28.6140955,77.0842529,12z',
    image: 'https://lh3.googleusercontent.com/p/AF1QipOgKWMyUGnvLUpQOmZmFZB3cMu8ov0gCWXM2WZj=w800',
    address: 'Rz b-15, Gali Number 3, Block E, Sitapuri, New Delhi, Delhi 110059'
  }
];

async function enrich() {
  const payload = await getPayload({ config: configPromise });

  // 1. Enrich Categories
  for (const catName in CATEGORY_DATA) {
    try {
      const categories = await payload.find({
        collection: 'categories',
        where: { name: { equals: catName } },
      });

      if (categories.docs.length > 0) {
        console.log(`Enriching category: ${catName}...`);
        const response = await axios.get(CATEGORY_DATA[catName].image, { responseType: 'arraybuffer' });
        
        const media = await payload.create({
          collection: 'media',
          data: {
            alt: `${catName} high-quality preview`,
          },
          file: {
            data: Buffer.from(response.data),
            name: `${catName.toLowerCase().replace(/ /g, '_')}.jpg`,
            mimetype: 'image/jpeg',
            size: response.data.length,
          }
        });

        await payload.update({
          collection: 'categories',
          id: categories.docs[0].id,
          data: {
            image: media.id,
            featured: true,
          }
        });
        console.log(`✅ Category enriched: ${catName}`);
      }
    } catch (e: any) {
      console.error(`❌ Error enriching category ${catName}: ${e.message}`);
    }
  }

  // 2. Enrich Businesses
  for (const data of BUSINESS_DATA) {
    try {
      const businesses = await payload.find({
        collection: 'businesses',
        where: { name: { equals: data.name } },
      });

      if (businesses.docs.length > 0) {
        console.log(`Enriching business: ${data.name}...`);
        const response = await axios.get(data.image, { responseType: 'arraybuffer' });

        const media = await payload.create({
          collection: 'media',
          data: {
            alt: `${data.name} store photo`,
          },
          file: {
            data: Buffer.from(response.data),
            name: `${data.name.toLowerCase().replace(/ /g, '_')}.jpg`,
            mimetype: 'image/jpeg',
            size: response.data.length,
          }
        });

        await payload.update({
          collection: 'businesses',
          id: businesses.docs[0].id,
          data: {
            images: [media.id],
            googleMapsUrl: data.map,
            address: data.address,
            featured: true,
            verified: true,
            status: 'active'
          }
        });
        console.log(`✅ Business enriched: ${data.name}`);
      }
    } catch (e: any) {
      console.error(`❌ Error enriching business ${data.name}: ${e.message}`);
    }
  }
  process.exit(0);
}

enrich();
