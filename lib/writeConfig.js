import fs from 'fs/promises';
import { join } from 'path';
import { EOL } from 'os';
import process from 'process';

const configData = `import elbrusConfig from '@elbrus/eslint-config';
import elbrusPlugin from '@elbrus/eslint-plugin';
import js from '@eslint/js';
import json from '@eslint/json';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  { files: ['**/*.{js,mjs,cjs}'], plugins: { js }, extends: ['js/recommended'] },
  ...elbrusConfig,
  {
    plugins: {
      '@elbrus': elbrusPlugin,
    },
    rules: {
      '@elbrus/prefer-for-of': 'error',
    },
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
]);
`;

export default async function writeConfig() {
  const cwd = process.cwd();
  await fs.writeFile(join(cwd, 'eslint.config.mjs'), configData + EOL, 'utf8');
}
