-- PART 2: Complete Workout Data SQL
-- Copy and paste this entire file into Supabase SQL Editor

-- Level 1, Week 1, Day 1
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details) VALUES ('level-1-w1-d1', 'level-1', 1, 1, 'Hinge / Power', 'Warm-up, EMOM 12 min, Finisher', 45, 'Week 1 - Hinge / Power', 'Dynamic mobility and activation', 'Static stretching and breathing', false, false, '{"formats": ["Warm-up", "EMOM 12 min", "Finisher"]}'::jsonb);
INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index) VALUES ('level-1-w1-d1', 'cat-camel--t-spine-reach', 2, '6 each Side', 30, 'Warm-up - Mobilize spine', 0), ('level-1-w1-d1', 'kb-halo-light', 2, '8 each Side', 30, 'Warm-up - Shoulder prep', 1), ('level-1-w1-d1', 'marching-rack-hold-light', 2, '20 Steps', 30, 'Warm-up - Find rack position; core brace', 2), ('level-1-w1-d1', 'kettlebell-deadlift-odd-min', 6, '8-10', NULL, 'EMOM 12 min - Learn hinge under clock', 3), ('level-1-w1-d1', 'swing-even-min', 6, '8', NULL, 'EMOM 12 min - Hip drive; crisp lockout', 4), ('level-1-w1-d1', 'dead-bug', 2, '8 each Side', 30, 'Finisher - Core coordination', 5);

-- Level 1, Week 1, Day 2
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details) VALUES ('level-1-w1-d2', 'level-1', 1, 2, 'Strength (Squat + Press)', 'Warm-up, Circuit 3 rounds, Finisher', 45, 'Week 1 - Strength (Squat + Press)', 'Dynamic mobility and activation', 'Static stretching and breathing', false, false, '{"formats": ["Warm-up", "Circuit 3 rounds", "Finisher"]}'::jsonb);
INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index) VALUES ('level-1-w1-d2', 'glute-bridge', 2, '12', 30, 'Warm-up - Activate glutes', 0), ('level-1-w1-d2', 'bodyweight-reverse-lunge', 2, '8 each Side', 30, 'Warm-up - Hip control; balance', 1), ('level-1-w1-d2', 'dead-hang-or-scap-pulls', 2, '20-30 s', 30, 'Warm-up - Lats activation', 2), ('level-1-w1-d2', 'goblet-squat', 3, '10-12', 60, 'Circuit 3 rounds - Posture + depth', 3), ('level-1-w1-d2', 'kettlebell-press-per-arm', 3, '6-8 each Arm', 60, 'Circuit 3 rounds - Shoulder control', 4), ('level-1-w1-d2', 'bent-over-row-per-arm', 3, '8-10 each Arm', 60, 'Circuit 3 rounds - Lat engagement', 5), ('level-1-w1-d2', 'high-plank-shoulder-tap', 2, '12 each Side', 45, 'Finisher - Anti-rotation', 6);

-- Level 1, Week 1, Day 3
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details) VALUES ('level-1-w1-d3', 'level-1', 1, 3, 'Conditioning / Core', 'Warm-up, AMRAP 12 min, Finisher', 45, 'Week 1 - Conditioning / Core', 'Dynamic mobility and activation', 'Static stretching and breathing', false, false, '{"formats": ["Warm-up", "AMRAP 12 min", "Finisher"]}'::jsonb);
INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index) VALUES ('level-1-w1-d3', 'hip-hinge-drill', 2, '8', 30, 'Warm-up - Groove hinge pattern', 0), ('level-1-w1-d3', 'goblet-squat-pry', 2, '6', 30, 'Warm-up - Open hips; find depth', 1), ('level-1-w1-d3', 'plank-hold', 2, '30 s', 30, 'Warm-up - Brace core before load', 2), ('level-1-w1-d3', 'swing', NULL, '10', NULL, 'AMRAP 12 min - Steady cadence', 3), ('level-1-w1-d3', 'goblet-squat', NULL, '8', NULL, 'AMRAP 12 min - Smooth depth', 4), ('level-1-w1-d3', 'push-press', NULL, '6 each Arm', NULL, 'AMRAP 12 min - Leg drive timing', 5), ('level-1-w1-d3', 'suitcase-carry-light', 2, '20-30 m each Side', 45, 'Finisher - Grip + anti-tilt', 6);

-- NOTE: This is a SAMPLE showing the pattern.
-- The full file would include ALL 30 Level 1 workouts and ALL 31 Level 2 workouts
-- Due to message size limits, you have 2 options:

-- OPTION 1: Use the TypeScript generator I created
-- Run: npx tsx scripts/generate-full-sql.ts > scripts/complete-workouts.sql
-- Then copy that file content to Supabase SQL Editor

-- OPTION 2: I'll continue writing the rest in chunks if you want

SELECT 'Ready to proceed with Option 1 or 2?' as status;
