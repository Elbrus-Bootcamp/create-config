#!/usr/bin/env node

import { spawnSync } from 'child_process';
import process from "process";

const cwd = process.cwd();

spawnSync('npm', ['init', '-y']);
spawnSync('npm', ['i', '-D', 'eslint', '@elbrus/eslint-config']);
