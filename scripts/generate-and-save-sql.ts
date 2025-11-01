import { writeFileSync } from 'fs';
import { level1Data, level2Data } from './workout-data';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function escapeSQL(text: string): string {
  return text.replace(/'/g, "''");
}

function parseRestToSeconds(restStr: string): number | null {
  if (!restStr) return null;
  const match = restStr.match(/(\d+)/);
  if (!match) return null;
  const num = parseInt(match[1]);
  if (restStr.toLowerCase().includes('min')) return num * 60;
  return num;
}

interface ExerciseData {
  Exercise: string;
  FocusPoints: string;
  Checklist: string;
  ErrorsFixes: string;
  Alternative: string;
}

function extractUniqueExercises(data: any[]): Map<string, ExerciseData> {
  const exercisesMap = new Map<string, ExerciseData>();

  data.forEach((row) => {
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

function generateExercisesSQL(exercisesMap: Map<string, ExerciseData>): string {
  let sql = `-- Insert all unique exercises\n`;
  sql += `INSERT INTO exercises (id, name, category, description, focus_points, technique_checklist, common_errors, alternatives, video_url, image_url)\n`;
  sql += `VALUES\n`;

  const values: string[] = [];
  exercisesMap.forEach((ex) => {
    const id = slugify(ex.Exercise);
    const category = categorizeExercise(ex.Exercise);
    const name = escapeSQL(ex.Exercise);
    const description = escapeSQL(ex.FocusPoints || '');
    const focusPoints = ex.FocusPoints ? `ARRAY['${escapeSQL(ex.FocusPoints)}']` : 'ARRAY[]::text[]';
    const checklist = ex.Checklist
      ? `ARRAY[${ex.Checklist.split(';').map((s) => `'${escapeSQL(s.trim())}'`).join(', ')}]`
      : 'ARRAY[]::text[]';
    const errors = ex.ErrorsFixes ? `ARRAY['${escapeSQL(ex.ErrorsFixes)}']` : 'ARRAY[]::text[]';
    const alternatives = ex.Alternative ? `ARRAY['${escapeSQL(ex.Alternative)}']` : 'ARRAY[]::text[]';

    values.push(
      `  ('${id}', '${name}', '${category}', '${description}', ${focusPoints}, ${checklist}, ${errors}, ${alternatives}, NULL, NULL)`
    );
  });

  sql += values.join(',\n');
  sql += `\nON CONFLICT (id) DO NOTHING;\n\n`;

  return sql;
}

interface WorkoutData {
  Level: string;
  Week: number;
  Day: string;
  Format: string;
  exercises: Array<{
    Exercise: string;
    Sets: number | null;
    Reps: string;
    Rest: string;
    Format: string;
    FocusPoints: string;
  }>;
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
  sql += `  '${escapeSQL(dayName)}',\n`;
  sql += `  '${escapeSQL(formatTypes.join(', '))}',\n`;
  sql += `  ${isBossFight ? 60 : 45},\n`;
  sql += `  'Week ${workout.Week} - ${escapeSQL(dayName)}',\n`;
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
    const notes = escapeSQL(`${ex.Format}${ex.FocusPoints ? ` - ${ex.FocusPoints}` : ''}`);

    return `  ('${workoutId}', '${exerciseId}', ${sets}, '${escapeSQL(ex.Reps)}', ${restValue}, '${notes}', ${index})`;
  });

  sql += exerciseRows.join(',\n');
  sql += `;\n`;

  return sql;
}

function main() {
  console.log('🚀 Generating complete SQL file...\n');

  const allData = [...level1Data, ...level2Data];
  const exercisesMap = extractUniqueExercises(allData);

  let fullSQL = `-- ============================================
-- COMPLETE WORKOUT DATA SQL
-- ============================================
-- This file contains ALL exercises and workout data
-- 
-- INSTRUCTIONS:
-- 1. Go to your Supabase Dashboard
-- 2. Click "SQL Editor" in the left sidebar
-- 3. Click "New Query"
-- 4. Copy this ENTIRE file and paste it
-- 5. Click "Run" or press Cmd+Enter / Ctrl+Enter
-- 
-- This will populate:
-- - All unique exercises (${exercisesMap.size} exercises)
-- - All Level 1 workouts
-- - All Level 2 workouts
-- ============================================

`;

  fullSQL += generateExercisesSQL(exercisesMap);

  fullSQL += `-- ============================================\n`;
  fullSQL += `-- LEVEL 1 WORKOUTS (${level1Data.length} exercise rows)\n`;
  fullSQL += `-- ============================================\n`;

  const level1Workouts = groupByWorkout(level1Data);
  console.log(`Level 1: ${level1Workouts.length} workouts`);
  level1Workouts.forEach((workout) => {
    fullSQL += generateWorkoutSQL(workout, 'level-1');
  });

  fullSQL += `\n-- ============================================\n`;
  fullSQL += `-- LEVEL 2 WORKOUTS (${level2Data.length} exercise rows)\n`;
  fullSQL += `-- ============================================\n`;

  const level2Workouts = groupByWorkout(level2Data);
  console.log(`Level 2: ${level2Workouts.length} workouts`);
  level2Workouts.forEach((workout) => {
    fullSQL += generateWorkoutSQL(workout, 'level-2');
  });

  fullSQL += `\n-- ============================================\n`;
  fullSQL += `-- VERIFICATION\n`;
  fullSQL += `-- ============================================\n`;
  fullSQL += `DO $$\n`;
  fullSQL += `DECLARE\n`;
  fullSQL += `  workout_count INTEGER;\n`;
  fullSQL += `  exercise_count INTEGER;\n`;
  fullSQL += `  exercise_link_count INTEGER;\n`;
  fullSQL += `BEGIN\n`;
  fullSQL += `  SELECT COUNT(*) INTO workout_count FROM workouts;\n`;
  fullSQL += `  SELECT COUNT(*) INTO exercise_count FROM exercises;\n`;
  fullSQL += `  SELECT COUNT(*) INTO exercise_link_count FROM workout_exercises;\n`;
  fullSQL += `  \n`;
  fullSQL += `  RAISE NOTICE '✅ Database populated successfully!';\n`;
  fullSQL += `  RAISE NOTICE '';\n`;
  fullSQL += `  RAISE NOTICE '📊 Summary:';\n`;
  fullSQL += `  RAISE NOTICE '- Total exercises: %', exercise_count;\n`;
  fullSQL += `  RAISE NOTICE '- Total workouts: %', workout_count;\n`;
  fullSQL += `  RAISE NOTICE '- Total workout-exercise links: %', exercise_link_count;\n`;
  fullSQL += `  RAISE NOTICE '';\n`;
  fullSQL += `  RAISE NOTICE '🎯 Breakdown by level:';\n`;
  fullSQL += `  RAISE NOTICE '- Level 1: % workouts', (SELECT COUNT(*) FROM workouts WHERE level_id = 'level-1');\n`;
  fullSQL += `  RAISE NOTICE '- Level 2: % workouts', (SELECT COUNT(*) FROM workouts WHERE level_id = 'level-2');\n`;
  fullSQL += `END $$;\n`;

  writeFileSync('scripts/COMPLETE-WORKOUT-DATA.sql', fullSQL, 'utf-8');

  console.log(`\n✅ SQL file generated!`);
  console.log(`📁 Location: scripts/COMPLETE-WORKOUT-DATA.sql`);
  console.log(`📏 Size: ${(fullSQL.length / 1024).toFixed(1)} KB`);
  console.log(`\n🎯 Next steps:`);
  console.log(`1. Open scripts/COMPLETE-WORKOUT-DATA.sql`);
  console.log(`2. Copy all content`);
  console.log(`3. Paste into Supabase SQL Editor`);
  console.log(`4. Run the query`);
}

main();
