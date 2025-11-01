import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fzvkwdmfhseapvsxgcmf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6dmt3ZG1maHNlYXB2c3hnY21mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NTY2NjgsImV4cCI6MjA3NzMzMjY2OH0.U8YCAb-ZB7bRQ1XjdyjcbJHld-Af8ucy4TxLnFgCXg4';

console.log('[Supabase] Initializing with URL:', supabaseUrl);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
