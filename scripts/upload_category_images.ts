
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';
import configPromise from '../src/payload.config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const CATEGORY_IMAGES = [
  { name: 'Architect', path: '/Users/rahulraj/.gemini/antigravity/brain/9615a169-5053-443a-a54c-f79644dfb961/architect_category_1771577131528.png' },
  { name: 'Beauty Salon', path: '/Users/rahulraj/.gemini/antigravity/brain/9615a169-5053-443a-a54c-f79644dfb961/beauty_salon_category_1771577172659.png' },
  { name: 'Car Repair', path: '/Users/rahulraj/.gemini/antigravity/brain/9615a169-5053-443a-a54c-f79644dfb961/car_repair_category_1771577393152.png' },
  { name: 'CA', path: '/Users/rahulraj/.gemini/antigravity/brain/9615a169-5053-443a-a54c-f79644dfb961/accounting_category_1771577434037.png' },
];

async function uploadImages() {
  const payload = await getPayload({ config: configPromise });

  for (const item of CATEGORY_IMAGES) {
    if (!fs.existsSync(item.path)) {
      console.log(`❌ File not found: ${item.path}`);
      continue;
    }

    try {
      console.log(`Uploading image for ${item.name}...`);
      
      // 1. Create Media record with upload
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: `${item.name} high-quality category image`,
        },
        file: {
          data: fs.readFileSync(item.path),
          name: path.basename(item.path),
          mimetype: 'image/png',
          size: fs.statSync(item.path).size,
        },
      });

      // 2. Update Category
      const categories = await payload.find({
        collection: 'categories',
        where: { name: { equals: item.name } },
      });

      if (categories.docs.length > 0) {
        await payload.update({
          collection: 'categories',
          id: categories.docs[0].id,
          data: {
            image: media.id,
            featured: true,
          },
        });
        console.log(`✅ Updated category ${item.name} with image ${media.id}`);
      } else {
        console.log(`⚠️ Category ${item.name} not found in database.`);
      }
    } catch (e: any) {
      console.error(`❌ Failed to upload image for ${item.name}:`, e.message);
    }
  }
  process.exit(0);
}

uploadImages();
