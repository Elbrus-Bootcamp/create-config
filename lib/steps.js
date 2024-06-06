import fs from 'fs/promises';
import { join } from 'path';
import { spawnSync } from 'child_process';
import process from 'process';
import prettierConfig from '../sources/prettierConfig.js';
import modifyConfig from './modifyConfig.js';

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
    log: 'Installing dependencies',
    fn: () =>
      spawnSync('npm', ['i', '-D', 'eslint', '@elbrus/eslint-config'], {
        stdio: 'inherit',
        cwd,
      }),
  },
  {
    log: 'Choose eslint preset',
    fn: () =>
      spawnSync('npm', ['init', '@eslint/config@latest'], { stdio: 'inherit', cwd }),
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
    log: 'Appending elbrus config to ESLint',
    fn: () => modifyConfig(),
  },
];

export default steps;
