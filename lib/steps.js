import { exec } from 'child_process';
import fs from 'fs';
import util from 'node:util';
import { join } from 'path';
import process from 'process';
import prettierConfig from '../sources/prettierConfig.js';
import writeConfig from './writeConfig.js';

const execAsync = util.promisify(exec);

const cwd = process.cwd();

const steps = [
  {
    log: 'package.json',
    fn: () => {
      if (fs.existsSync(join(cwd, 'package.json'))) return;
      return execAsync('npm init -y', { cwd });
    },
  },
  {
    log: 'gitignore',
    fn: () => execAsync('npx gitignore node', { cwd }),
  },
  {
    log: 'prettierrc',
    fn: () =>
      fs.promises.writeFile(
        join(cwd, '.prettierrc'),
        JSON.stringify(prettierConfig, null, 2),
        'utf8',
      ),
  },
  {
    log: 'eslint.config.mjs',
    fn: writeConfig,
  },
  {
    log: 'Installing dependencies',
    fn: () =>
      execAsync(
        'npm i -D eslint @eslint/js @eslint/json @elbrus/eslint-config @elbrus/eslint-plugin globals',
        {
          cwd,
        },
      ),
  },
];

export default steps;
