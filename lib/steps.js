import fs from 'fs/promises';
import { join } from 'path';
import { spawnSync } from 'child_process';
import process from 'process';
import prettierConfig from '../sources/prettierConfig.js';
import writeConfig from './writeConfig.js';

const cwd = process.cwd();

const steps = [
  {
    log: 'Creating package.json',
    fn: () => spawnSync('npm', ['init', '-y'], { stdio: 'inherit', cwd }),
  },
  {
    log: 'Creating gitignore',
    fn: () => spawnSync('npx', ['gitignore', 'node'], { stdio: 'inherit', cwd }),
  },
  {
    log: 'Creating prettierrc',
    fn: () =>
      fs.writeFile(
        join(cwd, '.prettierrc'),
        JSON.stringify(prettierConfig, null, 2),
        'utf8',
      ),
  },
  {
    log: 'Creating eslint.config.mjs',
    fn: writeConfig,
  },
  {
    log: 'Installing dependencies',
    fn: () =>
      spawnSync(
        'npm',
        [
          'i',
          '-D',
          'eslint',
          '@elbrus/eslint-config@latest',
          '@elbrus/eslint-plugin@latest',
          'globals',
          '@eslint/js',
        ],
        {
          stdio: 'inherit',
          cwd,
        },
      ),
  },
];

export default steps;
