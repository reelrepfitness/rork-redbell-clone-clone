import { createClient } from '@supabase/supabase-js';
import { level1Data, level2Data } from './workout-data';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

interface ExerciseData {
  Exercise: string;
  FocusPoints: string;
  Checklist: string;
  ErrorsFixes: string;
  Alternative: string;
}

interface WorkoutExerciseData extends ExerciseData {
  Sets: number | null;
  Reps: string;
  Rest: string;
  Format: string;
}

interface WorkoutData {
  Level: string;
  Week: number;
  Day: string;
  Format: string;
  exercises: WorkoutExerciseData[];
}

function extractUniqueExercises(data: any[]): Map<string, ExerciseData> {
  const exercisesMap = new Map<string, ExerciseData>();

  data.forEach((row) => {
    // Row format: [Level, Week, Day, Format, Exercise, Sets, Reps, Rest, FocusPoints, Checklist, ErrorsFixes, Alternative]
    const [, , , , exercise, , , , focusPoints, checklist, errorsFixes, alternative] = row;
    if (exercise && !exercisesMap.has(exercise)) {
      exercisesMap.set(exercise, {
        Exercise: exercise,
        FocusPoints: focusPoints || '',
        Checklist: checklist || '',
        ErrorsFixes: errorsFixes || '',
        Alternative: alternative || '',
      });
    }
  });

  return exercisesMap;
}

function groupByWorkout(data: any[]): WorkoutData[] {
  const workoutsMap = new Map<string, WorkoutData>();

  data.forEach((row) => {
    // Row format: [Level, Week, Day, Format, Exercise, Sets, Reps, Rest, FocusPoints, Checklist, ErrorsFixes, Alternative]
    const [level, week, day, format, exercise, sets, reps, rest, focusPoints, checklist, errorsFixes, alternative] = row;
    const key = `${level}-${week}-${day}`;
    
    if (!workoutsMap.has(key)) {
      workoutsMap.set(key, {
        Level: level,
        Week: week,
        Day: day,
        Format: format,
        exercises: [],
      });
    }

    const workout = workoutsMap.get(key)!;
    workout.exercises.push({
      Exercise: exercise,
      Sets: sets,
      Reps: String(reps || ''),
      Rest: String(rest || ''),
      Format: format,
      FocusPoints: focusPoints || '',
      Checklist: checklist || '',
      ErrorsFixes: errorsFixes || '',
      Alternative: alternative || '',
    });
  });

  return Array.from(workoutsMap.values());
}

function categorizeExercise(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('swing')) return 'power';
  if (lower.includes('squat')) return 'squat';
  if (lower.includes('press')) return 'press';
  if (lower.includes('deadlift') || lower.includes('hinge')) return 'hinge';
  if (lower.includes('row')) return 'pull';
  if (lower.includes('carry')) return 'carry';
  if (lower.includes('clean')) return 'power';
  if (lower.includes('plank') || lower.includes('bug')) return 'core';
  if (lower.includes('lunge')) return 'lunge';
  if (lower.includes('bridge')) return 'warmup';
  return 'accessory';
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function populateExercises(exercisesMap: Map<string, ExerciseData>) {
  console.log(`\n📝 Inserting ${exercisesMap.size} unique exercises...`);

  const exercisesToInsert = Array.from(exercisesMap.values()).map((ex) => {
    const id = slugify(ex.Exercise);
    const category = categorizeExercise(ex.Exercise);

    return {
      id,
      name: ex.Exercise,
      category,
      description: ex.FocusPoints || null,
      focus_points: ex.FocusPoints ? [ex.FocusPoints] : [],
      technique_checklist: ex.Checklist ? ex.Checklist.split(';').map((s: string) => s.trim()) : [],
      common_errors: ex.ErrorsFixes ? [ex.ErrorsFixes] : [],
      alternatives: ex.Alternative ? [ex.Alternative] : [],
      video_url: null,
      image_url: null,
    };
  });

  const { error } = await supabase
    .from('exercises')
    .upsert(exercisesToInsert, { onConflict: 'id' });

  if (error) {
    console.error('❌ Error inserting exercises:', error);
    throw error;
  }

  console.log('✅ Exercises inserted successfully');
}

async function populateWorkouts(workouts: WorkoutData[], levelId: string) {
  console.log(`\n📝 Inserting ${workouts.length} workouts for ${levelId}...`);

  for (const workout of workouts) {
    const dayNum = parseInt(workout.Day.match(/\d+/)?.[0] || '1');
    const dayName = workout.Day.replace(/Day \d+ - /, '');
    const workoutId = `${levelId}-w${workout.Week}-d${dayNum}`;

    const formatTypes = Array.from(new Set(workout.exercises.map((e) => e.Format)));
    const isWarmup = formatTypes.includes('Warm-up');
    const isBossFight = workout.Day.toLowerCase().includes('boss') || workout.Day.toLowerCase().includes('finale');

    const workoutRecord = {
      id: workoutId,
      level_id: levelId,
      week: workout.Week,
      day: dayNum,
      title: dayName,
      format: formatTypes.join(', '),
      duration: 45,
      description: `Week ${workout.Week} - ${dayName}`,
      warmup: isWarmup ? 'Dynamic mobility and activation' : null,
      cooldown: 'Static stretching and breathing',
      is_boss_fight: isBossFight,
      requires_completion: false,
      format_details: { formats: formatTypes },
    };

    const { error: workoutError } = await supabase
      .from('workouts')
      .upsert(workoutRecord, { onConflict: 'id' });

    if (workoutError) {
      console.error(`❌ Error inserting workout ${workoutId}:`, workoutError);
      continue;
    }

    // Insert workout exercises
    const workoutExercises = workout.exercises.map((ex, index) => ({
      workout_id: workoutId,
      exercise_id: slugify(ex.Exercise),
      sets: ex.Sets,
      reps: ex.Reps,
      duration: null,
      rest: parseRestToSeconds(ex.Rest),
      weight: null,
      notes: `${ex.Format}${ex.FocusPoints ? ` - ${ex.FocusPoints}` : ''}`,
      order_index: index,
    }));

    const { error: exercisesError } = await supabase
      .from('workout_exercises')
      .upsert(workoutExercises, { onConflict: 'id', ignoreDuplicates: false });

    if (exercisesError) {
      console.error(`❌ Error inserting workout exercises for ${workoutId}:`, exercisesError);
    }
  }

  console.log('✅ Workouts inserted successfully');
}

function parseRestToSeconds(restStr: string): number | null {
  if (!restStr) return null;
  
  const match = restStr.match(/(\d+)/);
  if (!match) return null;
  
  const num = parseInt(match[1]);
  if (restStr.toLowerCase().includes('min')) return num * 60;
  return num;
}

async function main() {
  try {
    console.log('🚀 Starting database population...\n');

    // Combine all data
    const allData = [...level1Data, ...level2Data];

    // Extract and insert exercises
    const exercisesMap = extractUniqueExercises(allData);
    await populateExercises(exercisesMap);

    // Group and insert Level 1 workouts
    const level1Workouts = groupByWorkout(level1Data);
    await populateWorkouts(level1Workouts, 'level-1');

    // Group and insert Level 2 workouts
    const level2Workouts = groupByWorkout(level2Data);
    await populateWorkouts(level2Workouts, 'level-2');

    console.log('\n✨ Database population complete!');
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main();
