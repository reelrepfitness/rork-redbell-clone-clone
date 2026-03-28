// This is a simple wrapper to run the TypeScript generator
// Since we can't run shell commands, this file documents the process

const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('Generating complete SQL file...');
  execSync('npx tsx scripts/generate-and-save-sql.ts', {
    cwd: process.cwd(),
    stdio: 'inherit'
  });
  console.log('✅ Complete!');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
