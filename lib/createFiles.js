import fs from 'fs/promises';
import { join } from 'path';

export default async function createFiles(dir) {
  const fileNames = await fs.readdir('sources');
  const filePaths = fileNames.map((name) => join(dir, name));
  const promises = filePaths.map(async (path) => {
    const content = await fs.readFile(path, 'utf-8');
    return fs.writeFile(path, content, 'utf-8');
  });
  return Promise.all(promises);
}
