import { supabase } from './supabase';

export async function testSupabaseConnection() {
  console.log('=== Testing Supabase Connection ===');
  
  try {
    console.log('1. Testing exercises table...');
    const { data: exercises, error: exercisesError } = await supabase
      .from('exercises')
      .select('id, name')
      .limit(5);
    
    if (exercisesError) {
      console.error('❌ Exercises Error:', exercisesError);
    } else {
      console.log('✅ Exercises:', exercises?.length || 0, 'found');
      if (exercises && exercises.length > 0) {
        console.log('Sample:', exercises[0]);
      }
    }

    console.log('\n2. Testing workouts table...');
    const { data: workouts, error: workoutsError } = await supabase
      .from('workouts')
      .select('id, title, level_id')
      .limit(5);
    
    if (workoutsError) {
      console.error('❌ Workouts Error:', workoutsError);
    } else {
      console.log('✅ Workouts:', workouts?.length || 0, 'found');
      if (workouts && workouts.length > 0) {
        console.log('Sample:', workouts[0]);
      }
    }

    console.log('\n3. Testing profiles table...');
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
    
    if (profilesError) {
      console.error('❌ User Profiles Error:', profilesError);
      console.log('Note: This table might not exist yet, which is OK');
    } else {
      console.log('✅ Profiles table exists');
      console.log('Profiles found:', profiles?.length || 0);
    }

    console.log('\n=== Connection Test Complete ===\n');
  } catch (error) {
    console.error('Fatal error during connection test:', error);
  }
}
