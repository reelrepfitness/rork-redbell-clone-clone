#!/usr/bin/env node

// Simple Node.js runner for the TypeScript populate script
require('tsx/cjs').register();
require('./scripts/populate-workouts.ts');
