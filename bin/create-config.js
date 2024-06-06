#!/usr/bin/env node

import steps from '../lib/steps.js';

for (const { log, fn } of steps) {
  console.log(log);
  await fn();
}

console.log('Happy hacking!');
