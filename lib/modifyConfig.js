import fs from 'fs/promises';
import { join } from 'path';
import { EOL } from 'os';
import process from 'process';

const cwd = process.cwd();
export default async function modifyConfig() {
  const exportedConfig = await fs.readFile(join(cwd, 'eslint.config.mjs'), 'utf8');
  const newConfig = exportedConfig
    .replace(`];`, `  ...elbrusConfig,${EOL}];`)
    .replace(
      `"@eslint/js";`,
      `"@eslint/js";${EOL}import elbrusConfig from "@elbrus/eslint-config";`,
    )
    .replace('globals: globals.node', 'globals: { ...globals.node, ...globals.jest }');
  await fs.writeFile(join(cwd, 'eslint.config.mjs'), newConfig, 'utf8');
}
