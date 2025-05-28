#!/usr/bin/env node

import steps from '../lib/steps.js';

for (const { log, fn } of steps) {
  try {
    await fn();
  } catch (error) {
    console.error(`Error: ${log}`);
  }
}
console.log('Run if not installed:\n');
console.log(
  'npm i -D eslint @eslint/js @eslint/json @elbrus/eslint-config @elbrus/eslint-plugin globals',
);
console.log('\n\nHappy hacking!');
