import { mkdirSync, cpSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(process.cwd());
const source = resolve(root, 'images');
const target = resolve(root, 'dist/images');

if (existsSync(source)) {
  mkdirSync(target, { recursive: true });
  cpSync(source, target, { recursive: true });
  console.log(`Copied images to ${target}`);
} else {
  console.log(`No images folder found at ${source}`);
}
