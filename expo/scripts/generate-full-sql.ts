// Generate complete SQL for all workouts from workout-data.ts
import { level1Data, level2Data } from './workout-data';

interface WorkoutExerciseData {
  Exercise: string;
  Sets: number | null;
  Reps: string;
  Rest: string;
  Format: string;
  FocusPoints: string;
}

interface WorkoutData {
  Level: string;
  Week: number;
  Day: string;
  Format: string;
  exercises: WorkoutExerciseData[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function parseRestToSeconds(restStr: string): number | null {
  if (!restStr) return null;
  
  const match = restStr.match(/(\d+)/);
  if (!match) return null;
  
  const num = parseInt(match[1]);
  if (restStr.toLowerCase().includes('min')) return num * 60;
  return num;
}

function groupByWorkout(data: any[]): WorkoutData[] {
  const workoutsMap = new Map<string, WorkoutData>();

  data.forEach((row) => {
    const [level, week, day, format, exercise, sets, reps, rest, focusPoints] = row;
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
    });
  });

  return Array.from(workoutsMap.values());
}

function generateWorkoutSQL(workout: WorkoutData, levelId: string): string {
  const dayNum = parseInt(workout.Day.match(/\d+/)?.[0] || '1');
  const dayName = workout.Day.replace(/Day \d+ - /, '');
  const workoutId = `${levelId}-w${workout.Week}-d${dayNum}`;

  const formatTypes = Array.from(new Set(workout.exercises.map((e) => e.Format)));
  const isWarmup = formatTypes.includes('Warm-up');
  const isBossFight = workout.Day.toLowerCase().includes('boss') || workout.Day.toLowerCase().includes('finale');

  let sql = `\n-- Week ${workout.Week}, Day ${dayNum}: ${dayName}\n`;
  sql += `INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)\n`;
  sql += `VALUES (\n`;
  sql += `  '${workoutId}',\n`;
  sql += `  '${levelId}',\n`;
  sql += `  ${workout.Week},\n`;
  sql += `  ${dayNum},\n`;
  sql += `  '${dayName.replace(/'/g, "''")}',\n`;
  sql += `  '${formatTypes.join(', ').replace(/'/g, "''")}',\n`;
  sql += `  ${isBossFight ? 60 : 45},\n`;
  sql += `  'Week ${workout.Week} - ${dayName.replace(/'/g, "''")}',\n`;
  sql += `  ${isWarmup ? "'Dynamic mobility and activation'" : 'NULL'},\n`;
  sql += `  'Static stretching and breathing',\n`;
  sql += `  ${isBossFight},\n`;
  sql += `  false,\n`;
  sql += `  '${JSON.stringify({ formats: formatTypes })}'::jsonb\n`;
  sql += `);\n\n`;

  sql += `INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)\n`;
  sql += `VALUES\n`;

  const exerciseRows = workout.exercises.map((ex, index) => {
    const exerciseId = slugify(ex.Exercise);
    const sets = ex.Sets !== null ? ex.Sets : 'NULL';
    const rest = parseRestToSeconds(ex.Rest);
    const restValue = rest !== null ? rest : 'NULL';
    const notes = `${ex.Format}${ex.FocusPoints ? ` - ${ex.FocusPoints}` : ''}`.replace(/'/g, "''");
    
    return `  ('${workoutId}', '${exerciseId}', ${sets}, '${ex.Reps.replace(/'/g, "''")}', ${restValue}, '${notes}', ${index})`;
  });

  sql += exerciseRows.join(',\n');
  sql += `;\n`;

  return sql;
}

function main() {
  console.log('Generating complete SQL...\n');

  let fullSQL = `-- Complete Workout Data SQL Insert
-- Generated from workout-data.ts
-- Run this in Supabase SQL Editor after inserting exercises

`;

  // Level 1 Workouts
  fullSQL += `\n-- ============================================\n`;
  fullSQL += `-- LEVEL 1 WORKOUTS (${level1Data.length} exercise rows)\n`;
  fullSQL += `-- ============================================\n`;

  const level1Workouts = groupByWorkout(level1Data);
  console.log(`Level 1: ${level1Workouts.length} workouts`);
  
  level1Workouts.forEach((workout) => {
    fullSQL += generateWorkoutSQL(workout, 'level-1');
  });

  // Level 2 Workouts
  fullSQL += `\n-- ============================================\n`;
  fullSQL += `-- LEVEL 2 WORKOUTS (${level2Data.length} exercise rows)\n`;
  fullSQL += `-- ============================================\n`;

  const level2Workouts = groupByWorkout(level2Data);
  console.log(`Level 2: ${level2Workouts.length} workouts`);

  level2Workouts.forEach((workout) => {
    fullSQL += generateWorkoutSQL(workout, 'level-2');
  });

  // Add success message
  fullSQL += `\n-- ============================================\n`;
  fullSQL += `-- VERIFICATION\n`;
  fullSQL += `-- ============================================\n`;
  fullSQL += `DO $$\n`;
  fullSQL += `DECLARE\n`;
  fullSQL += `  workout_count INTEGER;\n`;
  fullSQL += `  exercise_link_count INTEGER;\n`;
  fullSQL += `BEGIN\n`;
  fullSQL += `  SELECT COUNT(*) INTO workout_count FROM workouts;\n`;
  fullSQL += `  SELECT COUNT(*) INTO exercise_link_count FROM workout_exercises;\n`;
  fullSQL += `  \n`;
  fullSQL += `  RAISE NOTICE '✅ All workouts inserted!';\n`;
  fullSQL += `  RAISE NOTICE 'Total workouts: %', workout_count;\n`;
  fullSQL += `  RAISE NOTICE 'Total workout-exercise links: %', exercise_link_count;\n`;
  fullSQL += `  RAISE NOTICE '';\n`;
  fullSQL += `  RAISE NOTICE '📊 Breakdown:';\n`;
  fullSQL += `  RAISE NOTICE '- Level 1: % workouts', (SELECT COUNT(*) FROM workouts WHERE level_id = 'level-1');\n`;
  fullSQL += `  RAISE NOTICE '- Level 2: % workouts', (SELECT COUNT(*) FROM workouts WHERE level_id = 'level-2');\n`;
  fullSQL += `END $$;\n`;

  console.log(`\n✅ SQL generated! Total size: ${(fullSQL.length / 1024).toFixed(1)} KB`);
  console.log(`\nCopy the output below and paste into Supabase SQL Editor:\n`);
  console.log('='.repeat(60));
  console.log(fullSQL);
  console.log('='.repeat(60));
}

main();
