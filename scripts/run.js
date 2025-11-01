#!/usr/bin/env node

// Load environment variables
require('dotenv').config({ path: '.env' });

// Import and run the populate script
(async () => {
  try {
    // Use dynamic import for ES modules
    const module = await import('./populate-workouts.ts');
    console.log('✅ Script completed successfully');
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
})();
