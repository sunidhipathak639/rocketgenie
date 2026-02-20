
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';
import configPromise from '../src/payload.config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function verifyDetails() {
  const payload = await getPayload({ config: configPromise });

  console.log('\n--- Category Status ---');
  const categories = await payload.find({ collection: 'categories' });
  categories.docs.forEach(cat => {
    console.log(`Cat: ${cat.name}, Image: ${cat.image ? '✅' : '❌'}, Featured: ${cat.featured ? '⭐' : ' '}`);
  });

  console.log('\n--- Enriched Businesses ---');
  const businesses = await payload.find({ 
    collection: 'businesses',
    where: { googleMapsUrl: { exists: true } }
  });
  businesses.docs.forEach(b => {
    console.log(`Biz: ${b.name}, Maps: ✅, Images: ${b.images && (b.images as any).length > 0 ? '✅' : '❌'}`);
  });

  process.exit(0);
}

verifyDetails();
