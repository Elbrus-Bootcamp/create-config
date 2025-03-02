#!/usr/bin/env node

import steps from '../lib/steps.js';

for (const { log, fn } of steps) {
  console.log(log);
  await fn();
}
console.log('Check installed packages. If not installed run:');
console.log('npm i -D eslint @elbrus/eslint-config@latest @elbrus/eslint-plugin@latest globals @eslint/js');
console.log('\n\nHappy hacking!');
