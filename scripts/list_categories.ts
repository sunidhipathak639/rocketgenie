
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';
import configPromise from '../src/payload.config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function list() {
  const payload = await getPayload({ config: configPromise });
  const categories = await payload.find({ collection: 'categories', limit: 100 });
  categories.docs.forEach(c => console.log(`'${c.name}'`));
  process.exit(0);
}
list();
