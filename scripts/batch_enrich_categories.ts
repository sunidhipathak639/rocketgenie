
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';
import configPromise from '../src/payload.config';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const ENRICH_DATA: any = {
  'Website developer': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
  'Real Estate': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
  'Jewellery Showroom': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
  'Furniture': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
  'Footwear': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
  'Electronics Items': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800',
  'Dentists': 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
  'Cosmatic': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
  'Computer Training Institutes': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
  'Computer Laptop Repair': 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800',
  'Coaching': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
  'Cloths': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
  'Chartered Accountant': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
  'CCTV camera, accessories': 'https://images.unsplash.com/photo-1551709076-89f2499d383b?auto=format&fit=crop&q=80&w=800',
};

async function enrich() {
  const payload = await getPayload({ config: configPromise });

  for (const [name, url] of Object.entries(ENRICH_DATA)) {
    try {
      const categories = await payload.find({
        collection: 'categories',
        where: { name: { equals: name } },
      });

      if (categories.docs.length > 0 && !categories.docs[0].image) {
        console.log(`Enriching ${name}...`);
        const response = await axios.get(url as string, { responseType: 'arraybuffer' });
        
        const media = await payload.create({
          collection: 'media',
          data: { alt: `${name} backdrop` },
          file: {
            data: Buffer.from(response.data),
            name: `${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.jpg`,
            mimetype: 'image/jpeg',
            size: response.data.length,
          }
        });

        await payload.update({
          collection: 'categories',
          id: categories.docs[0].id,
          data: {
            image: media.id,
            featured: true
          }
        });
        console.log(`✅ ${name} enriched.`);
      }
    } catch (e: any) {
      console.error(`❌ ${name} failed: ${e.message}`);
    }
  }
  process.exit(0);
}

enrich();
