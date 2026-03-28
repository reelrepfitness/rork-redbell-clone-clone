import { supabase } from './supabase';
import { Exercise, Workout } from '@/types';

export async function fetchExercises(): Promise<Exercise[]> {
  console.log('[API] Fetching exercises from Supabase...');
  
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .order('name');

    if (error) {
      console.error('[API] Error fetching exercises:', error);
      throw error;
    }

    console.log(`[API] Fetched ${data?.length || 0} exercises`);

    return (data || []).map((ex: any) => ({
      id: ex.id,
      name: ex.name,
      category: ex.category,
      description: ex.description || '',
      focusPoints: ex.focus_points || [],
      techniqueChecklist: ex.technique_checklist || [],
      commonErrors: ex.common_errors || [],
      alternatives: ex.alternatives || [],
      imageUrl: ex.image_url || '',
    }));
  } catch (error) {
    console.error('[API] Failed to fetch exercises:', error);
    return [];
  }
}

export async function fetchWorkouts(levelId?: string): Promise<Workout[]> {
  console.log('[API] Fetching workouts from Supabase...', { levelId });
  
  try {
    let query = supabase
      .from('workouts')
      .select(`
        *,
        workout_exercises (
          id,
          exercise_id,
          sets,
          reps,
          rest,
          notes
        )
      `)
      .order('week', { ascending: true })
      .order('day', { ascending: true });

    if (levelId) {
      query = query.eq('level_id', levelId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[API] Error fetching workouts:', JSON.stringify(error, null, 2));
      throw error;
    }

    console.log(`[API] Fetched ${data?.length || 0} workouts`);

    return (data || []).map((w: any) => ({
      id: w.id,
      levelId: w.level_id,
      week: w.week,
      day: w.day,
      title: w.title,
      format: w.format,
      duration: w.duration,
      description: w.description || '',
      warmup: w.warmup || '',
      cooldown: w.cooldown || '',
      isBossFight: w.is_boss_fight || false,
      requiresCompletion: w.requires_completion || false,
      exercises: (w.workout_exercises || []).map((we: any) => ({
        exerciseId: we.exercise_id,
        sets: we.sets,
        reps: we.reps,
        rest: we.rest,
        notes: we.notes,
      })),
      formatDetails: w.format_details || {},
    }));
  } catch (error: any) {
    console.error('[API] Failed to fetch workouts:', {
      message: error?.message || 'Unknown error',
      code: error?.code,
      details: error?.details,
      hint: error?.hint,
      full: JSON.stringify(error, null, 2)
    });
    return [];
  }
}

export async function fetchWorkoutById(workoutId: string): Promise<Workout | null> {
  console.log('[API] Fetching workout by ID:', workoutId);
  
  try {
    const { data, error } = await supabase
      .from('workouts')
      .select(`
        *,
        workout_exercises (
          id,
          exercise_id,
          sets,
          reps,
          rest,
          notes
        )
      `)
      .eq('id', workoutId)
      .single();

    if (error) {
      console.error('[API] Error fetching workout:', error);
      throw error;
    }

    if (!data) {
      console.log('[API] Workout not found');
      return null;
    }

    console.log('[API] Fetched workout:', data.title);

    return {
      id: data.id,
      levelId: data.level_id,
      week: data.week,
      day: data.day,
      title: data.title,
      format: data.format,
      duration: data.duration,
      description: data.description || '',
      warmup: data.warmup || '',
      cooldown: data.cooldown || '',
      isBossFight: data.is_boss_fight || false,
      requiresCompletion: data.requires_completion || false,
      exercises: (data.workout_exercises || []).map((we: any) => ({
        exerciseId: we.exercise_id,
        sets: we.sets,
        reps: we.reps,
        rest: we.rest,
        notes: we.notes,
      })),
      formatDetails: data.format_details || {},
    };
  } catch (error) {
    console.error('[API] Failed to fetch workout:', error);
    return null;
  }
}

export async function fetchUserProfile(userId: string): Promise<any | null> {
  console.log('[API] Fetching user profile:', userId);
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('[API] Error fetching profile:', JSON.stringify(error, null, 2));
      throw error;
    }

    console.log('[API] Fetched profile:', data);
    return data;
  } catch (error: any) {
    console.error('[API] Failed to fetch profile:', {
      message: error?.message || 'Unknown error',
      code: error?.code,
      details: error?.details,
      hint: error?.hint,
      full: JSON.stringify(error, null, 2)
    });
    return null;
  }
}

export async function updateUserProfile(userId: string, updates: any): Promise<boolean> {
  console.log('[API] Updating user profile:', userId, updates);
  
  try {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    if (error) {
      console.error('[API] Error updating profile:', error);
      return false;
    }

    console.log('[API] Profile updated successfully');
    return true;
  } catch (error) {
    console.error('[API] Failed to update profile:', error);
    return false;
  }
}
