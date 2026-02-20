
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { getPayload } from 'payload';
import configPromise from '../src/payload.config';

async function listBusinesses() {
  try {
    const payload = await getPayload({ config: configPromise });
    const businesses = await payload.find({
      collection: 'businesses',
      limit: 10,
      sort: '-createdAt',
    });

    businesses.docs.forEach(b => {
      console.log(`ID: ${b.id}, Name: ${b.name}, City: ${(b.city as any)?.name || 'N/A'}`);
    });
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
}

listBusinesses();
