-- Complete Workout Data SQL Insert
-- Generated from workout-data.ts
-- Copy and paste this ENTIRE file into Supabase SQL Editor after inserting exercises

-- ============================================
-- LEVEL 1 WORKOUTS
-- ============================================

-- Week 1, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w1-d1',
  'level-1',
  1,
  1,
  'Hinge / Power',
  'Warm-up, EMOM 12 min, Finisher',
  45,
  'Week 1 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "EMOM 12 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w1-d1', 'cat-camel--t-spine-reach', 2, '6 each Side', 30, 'Warm-up - Mobilize spine', 0),
  ('level-1-w1-d1', 'kb-halo-light', 2, '8 each Side', 30, 'Warm-up - Shoulder prep', 1),
  ('level-1-w1-d1', 'marching-rack-hold-light', 2, '20 Steps', 30, 'Warm-up - Find rack position; core brace', 2),
  ('level-1-w1-d1', 'kettlebell-deadlift-odd-min', 6, '8-10', NULL, 'EMOM 12 min - Learn hinge under clock', 3),
  ('level-1-w1-d1', 'swing-even-min', 6, '8', NULL, 'EMOM 12 min - Hip drive; crisp lockout', 4),
  ('level-1-w1-d1', 'dead-bug', 2, '8 each Side', 30, 'Finisher - Core coordination', 5);

-- Week 1, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w1-d2',
  'level-1',
  1,
  2,
  'Strength (Squat + Press)',
  'Warm-up, Circuit 3 rounds, Finisher',
  45,
  'Week 1 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Circuit 3 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w1-d2', 'glute-bridge', 2, '12', 30, 'Warm-up - Activate glutes', 0),
  ('level-1-w1-d2', 'bodyweight-reverse-lunge', 2, '8 each Side', 30, 'Warm-up - Hip control; balance', 1),
  ('level-1-w1-d2', 'dead-hang-or-scap-pulls', 2, '20-30 s', 30, 'Warm-up - Lats activation', 2),
  ('level-1-w1-d2', 'goblet-squat', 3, '10-12', 60, 'Circuit 3 rounds - Posture + depth', 3),
  ('level-1-w1-d2', 'kettlebell-press-per-arm', 3, '6-8 each Arm', 60, 'Circuit 3 rounds - Shoulder control', 4),
  ('level-1-w1-d2', 'bent-over-row-per-arm', 3, '8-10 each Arm', 60, 'Circuit 3 rounds - Lat engagement', 5),
  ('level-1-w1-d2', 'high-plank-shoulder-tap', 2, '12 each Side', 45, 'Finisher - Anti-rotation', 6);

-- Week 1, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w1-d3',
  'level-1',
  1,
  3,
  'Conditioning / Core',
  'Warm-up, AMRAP 12 min, Finisher',
  45,
  'Week 1 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "AMRAP 12 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w1-d3', 'hip-hinge-drill', 2, '8', 30, 'Warm-up - Groove hinge pattern', 0),
  ('level-1-w1-d3', 'goblet-squat-pry', 2, '6', 30, 'Warm-up - Open hips; find depth', 1),
  ('level-1-w1-d3', 'plank-hold', 2, '30 s', 30, 'Warm-up - Brace core before load', 2),
  ('level-1-w1-d3', 'swing', NULL, '10', NULL, 'AMRAP 12 min - Steady cadence', 3),
  ('level-1-w1-d3', 'goblet-squat', NULL, '8', NULL, 'AMRAP 12 min - Smooth depth', 4),
  ('level-1-w1-d3', 'push-press', NULL, '6 each Arm', NULL, 'AMRAP 12 min - Leg drive timing', 5),
  ('level-1-w1-d3', 'suitcase-carry-light', 2, '20-30 m each Side', 45, 'Finisher - Grip + anti-tilt', 6);

-- Week 2, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w2-d1',
  'level-1',
  2,
  1,
  'Hinge / Power',
  'Warm-up, EMOM 14 min, Finisher',
  45,
  'Week 2 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "EMOM 14 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w2-d1', 'glute-bridge', 2, '12', 30, 'Warm-up - Activate glutes', 0),
  ('level-1-w2-d1', 'bodyweight-reverse-lunge', 2, '8 each Side', 30, 'Warm-up - Hip control; balance', 1),
  ('level-1-w2-d1', 'dead-hang-or-scap-pulls', 2, '20-30 s', 30, 'Warm-up - Lats activation', 2),
  ('level-1-w2-d1', 'kettlebell-deadlift-odd-min', 7, '8-10', NULL, 'EMOM 14 min - Learn hinge under clock', 3),
  ('level-1-w2-d1', 'swing-even-min', 7, '8', NULL, 'EMOM 14 min - Hip drive; crisp lockout', 4),
  ('level-1-w2-d1', 'high-plank-shoulder-tap', 2, '12 each Side', 45, 'Finisher - Anti-rotation', 5);

-- Week 2, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w2-d2',
  'level-1',
  2,
  2,
  'Strength (Squat + Press)',
  'Warm-up, Circuit 3 rounds, Finisher',
  45,
  'Week 2 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Circuit 3 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w2-d2', 'hip-hinge-drill', 2, '8', 30, 'Warm-up - Groove hinge pattern', 0),
  ('level-1-w2-d2', 'goblet-squat-pry', 2, '6', 30, 'Warm-up - Open hips; find depth', 1),
  ('level-1-w2-d2', 'plank-hold', 2, '30 s', 30, 'Warm-up - Brace core before load', 2),
  ('level-1-w2-d2', 'goblet-squat', 3, '10-12', 60, 'Circuit 3 rounds - Posture + depth', 3),
  ('level-1-w2-d2', 'kettlebell-press-per-arm', 3, '6-8 each Arm', 60, 'Circuit 3 rounds - Shoulder control', 4),
  ('level-1-w2-d2', 'bent-over-row-per-arm', 3, '8-10 each Arm', 60, 'Circuit 3 rounds - Lat engagement', 5),
  ('level-1-w2-d2', 'suitcase-carry-light', 2, '20-30 m each Side', 45, 'Finisher - Grip + anti-tilt', 6);

-- Week 2, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w2-d3',
  'level-1',
  2,
  3,
  'Conditioning / Core',
  'Warm-up, AMRAP 14 min, Finisher',
  45,
  'Week 2 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "AMRAP 14 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w2-d3', 'cat-camel--t-spine-reach', 2, '6 each Side', 30, 'Warm-up - Mobilize spine', 0),
  ('level-1-w2-d3', 'kb-halo-light', 2, '8 each Side', 30, 'Warm-up - Shoulder prep', 1),
  ('level-1-w2-d3', 'marching-rack-hold-light', 2, '20 Steps', 30, 'Warm-up - Find rack position; core brace', 2),
  ('level-1-w2-d3', 'swing', NULL, '10', NULL, 'AMRAP 14 min - Steady cadence', 3),
  ('level-1-w2-d3', 'goblet-squat', NULL, '8', NULL, 'AMRAP 14 min - Smooth depth', 4),
  ('level-1-w2-d3', 'push-press', NULL, '6 each Arm', NULL, 'AMRAP 14 min - Leg drive timing', 5),
  ('level-1-w2-d3', 'dead-bug', 2, '8 each Side', 30, 'Finisher - Core coordination', 6);

-- Week 3, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w3-d1',
  'level-1',
  3,
  1,
  'Hinge / Power',
  'Warm-up, EMOM 16 min, Finisher',
  45,
  'Week 3 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "EMOM 16 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w3-d1', 'hip-hinge-drill', 2, '8', 30, 'Warm-up - Groove hinge pattern', 0),
  ('level-1-w3-d1', 'goblet-squat-pry', 2, '6', 30, 'Warm-up - Open hips; find depth', 1),
  ('level-1-w3-d1', 'plank-hold', 2, '30 s', 30, 'Warm-up - Brace core before load', 2),
  ('level-1-w3-d1', 'kettlebell-deadlift-odd-min', 8, '8-10', NULL, 'EMOM 16 min - Learn hinge under clock', 3),
  ('level-1-w3-d1', 'swing-even-min', 8, '8', NULL, 'EMOM 16 min - Hip drive; crisp lockout', 4),
  ('level-1-w3-d1', 'suitcase-carry-light', 2, '20-30 m each Side', 45, 'Finisher - Grip + anti-tilt', 5);

-- Week 3, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w3-d2',
  'level-1',
  3,
  2,
  'Strength (Squat + Press)',
  'Warm-up, Circuit 3 rounds, Finisher',
  45,
  'Week 3 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Circuit 3 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w3-d2', 'cat-camel--t-spine-reach', 2, '6 each Side', 30, 'Warm-up - Mobilize spine', 0),
  ('level-1-w3-d2', 'kb-halo-light', 2, '8 each Side', 30, 'Warm-up - Shoulder prep', 1),
  ('level-1-w3-d2', 'marching-rack-hold-light', 2, '20 Steps', 30, 'Warm-up - Find rack position; core brace', 2),
  ('level-1-w3-d2', 'goblet-squat', 3, '10-12', 60, 'Circuit 3 rounds - Posture + depth', 3),
  ('level-1-w3-d2', 'kettlebell-press-per-arm', 3, '6-8 each Arm', 60, 'Circuit 3 rounds - Shoulder control', 4),
  ('level-1-w3-d2', 'bent-over-row-per-arm', 3, '8-10 each Arm', 60, 'Circuit 3 rounds - Lat engagement', 5),
  ('level-1-w3-d2', 'dead-bug', 2, '8 each Side', 30, 'Finisher - Core coordination', 6);

-- Week 3, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w3-d3',
  'level-1',
  3,
  3,
  'Conditioning / Core',
  'Warm-up, AMRAP 16 min, Finisher',
  45,
  'Week 3 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "AMRAP 16 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w3-d3', 'glute-bridge', 2, '12', 30, 'Warm-up - Activate glutes', 0),
  ('level-1-w3-d3', 'bodyweight-reverse-lunge', 2, '8 each Side', 30, 'Warm-up - Hip control; balance', 1),
  ('level-1-w3-d3', 'dead-hang-or-scap-pulls', 2, '20-30 s', 30, 'Warm-up - Lats activation', 2),
  ('level-1-w3-d3', 'swing', NULL, '10', NULL, 'AMRAP 16 min - Steady cadence', 3),
  ('level-1-w3-d3', 'goblet-squat', NULL, '8', NULL, 'AMRAP 16 min - Smooth depth', 4),
  ('level-1-w3-d3', 'push-press', NULL, '6 each Arm', NULL, 'AMRAP 16 min - Leg drive timing', 5),
  ('level-1-w3-d3', 'high-plank-shoulder-tap', 2, '12 each Side', 45, 'Finisher - Anti-rotation', 6);

-- Week 4, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w4-d1',
  'level-1',
  4,
  1,
  'Hinge / Power',
  'Warm-up, Ladder 1→5 (x2), Finisher',
  45,
  'Week 4 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Ladder 1→5 (x2)", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w4-d1', 'cat-camel--t-spine-reach', 2, '6 each Side', 30, 'Warm-up - Mobilize spine', 0),
  ('level-1-w4-d1', 'kb-halo-light', 2, '8 each Side', 30, 'Warm-up - Shoulder prep', 1),
  ('level-1-w4-d1', 'marching-rack-hold-light', 2, '20 Steps', 30, 'Warm-up - Find rack position; core brace', 2),
  ('level-1-w4-d1', 'swing', 2, '1-5 Ladder', 75, 'Ladder 1→5 (x2) - Power with control', 3),
  ('level-1-w4-d1', 'kettlebell-clean-per-arm', 2, '1-5 each Arm', 75, 'Ladder 1→5 (x2) - Soft rack', 4),
  ('level-1-w4-d1', 'front-squat', 2, '1-5', 75, 'Ladder 1→5 (x2) - Torso tall', 5),
  ('level-1-w4-d1', 'dead-bug', 2, '8 each Side', 30, 'Finisher - Core coordination', 6);

-- Week 4, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w4-d2',
  'level-1',
  4,
  2,
  'Strength (Squat + Press)',
  'Warm-up, EMOM 14 min, Finisher',
  45,
  'Week 4 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "EMOM 14 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w4-d2', 'glute-bridge', 2, '12', 30, 'Warm-up - Activate glutes', 0),
  ('level-1-w4-d2', 'bodyweight-reverse-lunge', 2, '8 each Side', 30, 'Warm-up - Hip control; balance', 1),
  ('level-1-w4-d2', 'dead-hang-or-scap-pulls', 2, '20-30 s', 30, 'Warm-up - Lats activation', 2),
  ('level-1-w4-d2', 'kettlebell-press-odd-min', 7, '5 each Arm', NULL, 'EMOM 14 min - Quality reps', 3),
  ('level-1-w4-d2', 'romanian-deadlift-even-min', 7, '8', NULL, 'EMOM 14 min - Hamstring tension', 4),
  ('level-1-w4-d2', 'high-plank-shoulder-tap', 2, '12 each Side', 45, 'Finisher - Anti-rotation', 5);

-- Week 4, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w4-d3',
  'level-1',
  4,
  3,
  'Conditioning / Core',
  'Warm-up, Circuit 4 rounds, Finisher',
  45,
  'Week 4 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Circuit 4 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w4-d3', 'hip-hinge-drill', 2, '8', 30, 'Warm-up - Groove hinge pattern', 0),
  ('level-1-w4-d3', 'goblet-squat-pry', 2, '6', 30, 'Warm-up - Open hips; find depth', 1),
  ('level-1-w4-d3', 'plank-hold', 2, '30 s', 30, 'Warm-up - Brace core before load', 2),
  ('level-1-w4-d3', 'clean--front-squat-complex', 4, '5 + 5', 90, 'Circuit 4 rounds - Smooth transition', 3),
  ('level-1-w4-d3', 'row-per-arm', 4, '8 each Arm', 90, 'Circuit 4 rounds - Back tension', 4),
  ('level-1-w4-d3', 'marching-front-rack-carry', 4, '20 Steps', 90, 'Circuit 4 rounds - Core brace', 5),
  ('level-1-w4-d3', 'suitcase-carry-light', 2, '20-30 m each Side', 45, 'Finisher - Grip + anti-tilt', 6);

-- Week 5, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w5-d1',
  'level-1',
  5,
  1,
  'Hinge / Power',
  'Warm-up, Ladder 1→5 (x2), Finisher',
  45,
  'Week 5 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Ladder 1→5 (x2)", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w5-d1', 'glute-bridge', 2, '12', 30, 'Warm-up - Activate glutes', 0),
  ('level-1-w5-d1', 'bodyweight-reverse-lunge', 2, '8 each Side', 30, 'Warm-up - Hip control; balance', 1),
  ('level-1-w5-d1', 'dead-hang-or-scap-pulls', 2, '20-30 s', 30, 'Warm-up - Lats activation', 2),
  ('level-1-w5-d1', 'swing', 2, '1-5 Ladder', 75, 'Ladder 1→5 (x2) - Power with control', 3),
  ('level-1-w5-d1', 'kettlebell-clean-per-arm', 2, '1-5 each Arm', 75, 'Ladder 1→5 (x2) - Soft rack', 4),
  ('level-1-w5-d1', 'front-squat', 2, '1-5', 75, 'Ladder 1→5 (x2) - Torso tall', 5),
  ('level-1-w5-d1', 'high-plank-shoulder-tap', 2, '12 each Side', 45, 'Finisher - Anti-rotation', 6);

-- Week 5, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w5-d2',
  'level-1',
  5,
  2,
  'Strength (Squat + Press)',
  'Warm-up, EMOM 16 min, Finisher',
  45,
  'Week 5 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "EMOM 16 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w5-d2', 'hip-hinge-drill', 2, '8', 30, 'Warm-up - Groove hinge pattern', 0),
  ('level-1-w5-d2', 'goblet-squat-pry', 2, '6', 30, 'Warm-up - Open hips; find depth', 1),
  ('level-1-w5-d2', 'plank-hold', 2, '30 s', 30, 'Warm-up - Brace core before load', 2),
  ('level-1-w5-d2', 'kettlebell-press-odd-min', 8, '5 each Arm', NULL, 'EMOM 16 min - Quality reps', 3),
  ('level-1-w5-d2', 'romanian-deadlift-even-min', 8, '8', NULL, 'EMOM 16 min - Hamstring tension', 4),
  ('level-1-w5-d2', 'suitcase-carry-light', 2, '20-30 m each Side', 45, 'Finisher - Grip + anti-tilt', 5);

-- Week 5, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w5-d3',
  'level-1',
  5,
  3,
  'Conditioning / Core',
  'Warm-up, Circuit 4 rounds, Finisher',
  45,
  'Week 5 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Circuit 4 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w5-d3', 'cat-camel--t-spine-reach', 2, '6 each Side', 30, 'Warm-up - Mobilize spine', 0),
  ('level-1-w5-d3', 'kb-halo-light', 2, '8 each Side', 30, 'Warm-up - Shoulder prep', 1),
  ('level-1-w5-d3', 'marching-rack-hold-light', 2, '20 Steps', 30, 'Warm-up - Find rack position; core brace', 2),
  ('level-1-w5-d3', 'clean--front-squat-complex', 4, '5 + 5', 90, 'Circuit 4 rounds - Smooth transition', 3),
  ('level-1-w5-d3', 'row-per-arm', 4, '8 each Arm', 90, 'Circuit 4 rounds - Back tension', 4),
  ('level-1-w5-d3', 'marching-front-rack-carry', 4, '20 Steps', 90, 'Circuit 4 rounds - Core brace', 5),
  ('level-1-w5-d3', 'dead-bug', 2, '8 each Side', 30, 'Finisher - Core coordination', 6);

-- Week 6, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w6-d1',
  'level-1',
  6,
  1,
  'Hinge / Power',
  'Warm-up, Ladder 1→5 (x2), Finisher',
  45,
  'Week 6 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Ladder 1→5 (x2)", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w6-d1', 'hip-hinge-drill', 2, '8', 30, 'Warm-up - Groove hinge pattern', 0),
  ('level-1-w6-d1', 'goblet-squat-pry', 2, '6', 30, 'Warm-up - Open hips; find depth', 1),
  ('level-1-w6-d1', 'plank-hold', 2, '30 s', 30, 'Warm-up - Brace core before load', 2),
  ('level-1-w6-d1', 'swing', 2, '1-5 Ladder', 75, 'Ladder 1→5 (x2) - Power with control', 3),
  ('level-1-w6-d1', 'kettlebell-clean-per-arm', 2, '1-5 each Arm', 75, 'Ladder 1→5 (x2) - Soft rack', 4),
  ('level-1-w6-d1', 'front-squat', 2, '1-5', 75, 'Ladder 1→5 (x2) - Torso tall', 5),
  ('level-1-w6-d1', 'suitcase-carry-light', 2, '20-30 m each Side', 45, 'Finisher - Grip + anti-tilt', 6);

-- Week 6, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w6-d2',
  'level-1',
  6,
  2,
  'Strength (Squat + Press)',
  'Warm-up, EMOM 18 min, Finisher',
  45,
  'Week 6 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "EMOM 18 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w6-d2', 'cat-camel--t-spine-reach', 2, '6 each Side', 30, 'Warm-up - Mobilize spine', 0),
  ('level-1-w6-d2', 'kb-halo-light', 2, '8 each Side', 30, 'Warm-up - Shoulder prep', 1),
  ('level-1-w6-d2', 'marching-rack-hold-light', 2, '20 Steps', 30, 'Warm-up - Find rack position; core brace', 2),
  ('level-1-w6-d2', 'kettlebell-press-odd-min', 9, '5 each Arm', NULL, 'EMOM 18 min - Quality reps', 3),
  ('level-1-w6-d2', 'romanian-deadlift-even-min', 9, '8', NULL, 'EMOM 18 min - Hamstring tension', 4),
  ('level-1-w6-d2', 'dead-bug', 2, '8 each Side', 30, 'Finisher - Core coordination', 5);

-- Week 6, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w6-d3',
  'level-1',
  6,
  3,
  'Conditioning / Core',
  'Warm-up, Circuit 4 rounds, Finisher',
  45,
  'Week 6 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Circuit 4 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w6-d3', 'glute-bridge', 2, '12', 30, 'Warm-up - Activate glutes', 0),
  ('level-1-w6-d3', 'bodyweight-reverse-lunge', 2, '8 each Side', 30, 'Warm-up - Hip control; balance', 1),
  ('level-1-w6-d3', 'dead-hang-or-scap-pulls', 2, '20-30 s', 30, 'Warm-up - Lats activation', 2),
  ('level-1-w6-d3', 'clean--front-squat-complex', 4, '5 + 5', 90, 'Circuit 4 rounds - Smooth transition', 3),
  ('level-1-w6-d3', 'row-per-arm', 4, '8 each Arm', 90, 'Circuit 4 rounds - Back tension', 4),
  ('level-1-w6-d3', 'marching-front-rack-carry', 4, '20 Steps', 90, 'Circuit 4 rounds - Core brace', 5),
  ('level-1-w6-d3', 'high-plank-shoulder-tap', 2, '12 each Side', 45, 'Finisher - Anti-rotation', 6);

-- Week 7, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w7-d1',
  'level-1',
  7,
  1,
  'Hinge / Power',
  'Warm-up, Complex 5 rounds, Finisher',
  45,
  'Week 7 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Complex 5 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w7-d1', 'cat-camel--t-spine-reach', 2, '6 each Side', 30, 'Warm-up - Mobilize spine', 0),
  ('level-1-w7-d1', 'kb-halo-light', 2, '8 each Side', 30, 'Warm-up - Shoulder prep', 1),
  ('level-1-w7-d1', 'marching-rack-hold-light', 2, '20 Steps', 30, 'Warm-up - Find rack position; core brace', 2),
  ('level-1-w7-d1', 'swing--clean--front-squat--push-press', 5, '5 + 5 + 5 + 5', 90, 'Complex 5 rounds - Flow and breathing', 3),
  ('level-1-w7-d1', 'dead-bug', 2, '8 each Side', 30, 'Finisher - Core coordination', 4);

-- Week 7, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w7-d2',
  'level-1',
  7,
  2,
  'Strength (Squat + Press)',
  'Warm-up, Superset x4, Finisher',
  45,
  'Week 7 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Superset x4", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w7-d2', 'glute-bridge', 2, '12', 30, 'Warm-up - Activate glutes', 0),
  ('level-1-w7-d2', 'bodyweight-reverse-lunge', 2, '8 each Side', 30, 'Warm-up - Hip control; balance', 1),
  ('level-1-w7-d2', 'dead-hang-or-scap-pulls', 2, '20-30 s', 30, 'Warm-up - Lats activation', 2),
  ('level-1-w7-d2', 'goblet-squat', 4, '10', 75, 'Superset x4 - Depth consistency', 3),
  ('level-1-w7-d2', 'kettlebell-press-per-arm', 4, '6 each Arm', 75, 'Superset x4 - Press path vertical', 4),
  ('level-1-w7-d2', 'high-plank-shoulder-tap', 2, '12 each Side', 45, 'Finisher - Anti-rotation', 5);

-- Week 7, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w7-d3',
  'level-1',
  7,
  3,
  'Conditioning / Core',
  'Warm-up, AMRAP 14 min, Finisher',
  45,
  'Week 7 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "AMRAP 14 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w7-d3', 'hip-hinge-drill', 2, '8', 30, 'Warm-up - Groove hinge pattern', 0),
  ('level-1-w7-d3', 'goblet-squat-pry', 2, '6', 30, 'Warm-up - Open hips; find depth', 1),
  ('level-1-w7-d3', 'plank-hold', 2, '30 s', 30, 'Warm-up - Brace core before load', 2),
  ('level-1-w7-d3', 'swing', NULL, '12', NULL, 'AMRAP 14 min - Cadence and posture', 3),
  ('level-1-w7-d3', 'push-press', NULL, '8 (total)', NULL, 'AMRAP 14 min - Strong dip-drive', 4),
  ('level-1-w7-d3', 'front-rack-reverse-lunge', NULL, '6 each Side', NULL, 'AMRAP 14 min - Balance and control', 5),
  ('level-1-w7-d3', 'suitcase-carry-light', 2, '20-30 m each Side', 45, 'Finisher - Grip + anti-tilt', 6);

-- Week 8, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w8-d1',
  'level-1',
  8,
  1,
  'Hinge / Power',
  'Warm-up, Complex 5 rounds, Finisher',
  45,
  'Week 8 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Complex 5 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w8-d1', 'glute-bridge', 2, '12', 30, 'Warm-up - Activate glutes', 0),
  ('level-1-w8-d1', 'bodyweight-reverse-lunge', 2, '8 each Side', 30, 'Warm-up - Hip control; balance', 1),
  ('level-1-w8-d1', 'dead-hang-or-scap-pulls', 2, '20-30 s', 30, 'Warm-up - Lats activation', 2),
  ('level-1-w8-d1', 'swing--clean--front-squat--push-press', 5, '5 + 5 + 5 + 5', 90, 'Complex 5 rounds - Flow and breathing', 3),
  ('level-1-w8-d1', 'high-plank-shoulder-tap', 2, '12 each Side', 45, 'Finisher - Anti-rotation', 4);

-- Week 8, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w8-d2',
  'level-1',
  8,
  2,
  'Strength (Squat + Press)',
  'Warm-up, Superset x4, Finisher',
  45,
  'Week 8 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Superset x4", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w8-d2', 'hip-hinge-drill', 2, '8', 30, 'Warm-up - Groove hinge pattern', 0),
  ('level-1-w8-d2', 'goblet-squat-pry', 2, '6', 30, 'Warm-up - Open hips; find depth', 1),
  ('level-1-w8-d2', 'plank-hold', 2, '30 s', 30, 'Warm-up - Brace core before load', 2),
  ('level-1-w8-d2', 'goblet-squat', 4, '10', 75, 'Superset x4 - Depth consistency', 3),
  ('level-1-w8-d2', 'kettlebell-press-per-arm', 4, '6 each Arm', 75, 'Superset x4 - Press path vertical', 4),
  ('level-1-w8-d2', 'suitcase-carry-light', 2, '20-30 m each Side', 45, 'Finisher - Grip + anti-tilt', 5);

-- Week 8, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w8-d3',
  'level-1',
  8,
  3,
  'Conditioning / Core',
  'Warm-up, AMRAP 16 min, Finisher',
  45,
  'Week 8 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "AMRAP 16 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w8-d3', 'cat-camel--t-spine-reach', 2, '6 each Side', 30, 'Warm-up - Mobilize spine', 0),
  ('level-1-w8-d3', 'kb-halo-light', 2, '8 each Side', 30, 'Warm-up - Shoulder prep', 1),
  ('level-1-w8-d3', 'marching-rack-hold-light', 2, '20 Steps', 30, 'Warm-up - Find rack position; core brace', 2),
  ('level-1-w8-d3', 'swing', NULL, '12', NULL, 'AMRAP 16 min - Cadence and posture', 3),
  ('level-1-w8-d3', 'push-press', NULL, '8 (total)', NULL, 'AMRAP 16 min - Strong dip-drive', 4),
  ('level-1-w8-d3', 'front-rack-reverse-lunge', NULL, '6 each Side', NULL, 'AMRAP 16 min - Balance and control', 5),
  ('level-1-w8-d3', 'dead-bug', 2, '8 each Side', 30, 'Finisher - Core coordination', 6);

-- Week 9, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w9-d1',
  'level-1',
  9,
  1,
  'Hinge / Power',
  'Warm-up, EMOM 16 min, Finisher',
  45,
  'Week 9 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "EMOM 16 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w9-d1', 'hip-hinge-drill', 2, '8', 30, 'Warm-up - Groove hinge pattern', 0),
  ('level-1-w9-d1', 'goblet-squat-pry', 2, '6', 30, 'Warm-up - Open hips; find depth', 1),
  ('level-1-w9-d1', 'plank-hold', 2, '30 s', 30, 'Warm-up - Brace core before load', 2),
  ('level-1-w9-d1', 'swing-odd-min', 8, '10', NULL, 'EMOM 16 min - Maintain power; crisp lockout', 3),
  ('level-1-w9-d1', 'goblet-squat-even-min', 8, '8', NULL, 'EMOM 16 min - Posture under clock', 4),
  ('level-1-w9-d1', 'suitcase-carry-light', 2, '20-30 m each Side', 45, 'Finisher - Grip + anti-tilt', 5);

-- Week 9, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w9-d2',
  'level-1',
  9,
  2,
  'Strength (Squat + Press)',
  'Warm-up, Circuit 3 rounds, Finisher',
  45,
  'Week 9 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Circuit 3 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w9-d2', 'cat-camel--t-spine-reach', 2, '6 each Side', 30, 'Warm-up - Mobilize spine', 0),
  ('level-1-w9-d2', 'kb-halo-light', 2, '8 each Side', 30, 'Warm-up - Shoulder prep', 1),
  ('level-1-w9-d2', 'marching-rack-hold-light', 2, '20 Steps', 30, 'Warm-up - Find rack position; core brace', 2),
  ('level-1-w9-d2', 'kettlebell-deadlift', 3, '10', 75, 'Circuit 3 rounds - Solid hinge', 3),
  ('level-1-w9-d2', 'kettlebell-press-per-arm', 3, '6-8 each Arm', 75, 'Circuit 3 rounds - Clean lockout', 4),
  ('level-1-w9-d2', 'row-per-arm', 3, '10 each Arm', 75, 'Circuit 3 rounds - Lat tension', 5),
  ('level-1-w9-d2', 'dead-bug', 2, '8 each Side', 30, 'Finisher - Core coordination', 6);

-- Week 9, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w9-d3',
  'level-1',
  9,
  3,
  'Conditioning / Core',
  'Warm-up, Complex 4 rounds, Finisher',
  45,
  'Week 9 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Complex 4 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w9-d3', 'glute-bridge', 2, '12', 30, 'Warm-up - Activate glutes', 0),
  ('level-1-w9-d3', 'bodyweight-reverse-lunge', 2, '8 each Side', 30, 'Warm-up - Hip control; balance', 1),
  ('level-1-w9-d3', 'dead-hang-or-scap-pulls', 2, '20-30 s', 30, 'Warm-up - Lats activation', 2),
  ('level-1-w9-d3', 'clean--front-squat--push-press', 4, '6 + 6 + 6', 90, 'Complex 4 rounds - Tidy transitions', 3),
  ('level-1-w9-d3', 'high-plank-shoulder-tap', 2, '12 each Side', 45, 'Finisher - Anti-rotation', 4);

-- Week 10, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w10-d1',
  'level-1',
  10,
  1,
  'Hinge / Power',
  'Warm-up, EMOM 18 min, Finisher',
  45,
  'Week 10 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "EMOM 18 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w10-d1', 'cat-camel--t-spine-reach', 2, '6 each Side', 30, 'Warm-up - Mobilize spine', 0),
  ('level-1-w10-d1', 'kb-halo-light', 2, '8 each Side', 30, 'Warm-up - Shoulder prep', 1),
  ('level-1-w10-d1', 'marching-rack-hold-light', 2, '20 Steps', 30, 'Warm-up - Find rack position; core brace', 2),
  ('level-1-w10-d1', 'swing-odd-min', 9, '10', NULL, 'EMOM 18 min - Maintain power; crisp lockout', 3),
  ('level-1-w10-d1', 'goblet-squat-even-min', 9, '8', NULL, 'EMOM 18 min - Posture under clock', 4),
  ('level-1-w10-d1', 'dead-bug', 2, '8 each Side', 30, 'Finisher - Core coordination', 5);

-- Week 10, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w10-d2',
  'level-1',
  10,
  2,
  'Strength (Squat + Press)',
  'Warm-up, Circuit 3 rounds, Finisher',
  45,
  'Week 10 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Circuit 3 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w10-d2', 'glute-bridge', 2, '12', 30, 'Warm-up - Activate glutes', 0),
  ('level-1-w10-d2', 'bodyweight-reverse-lunge', 2, '8 each Side', 30, 'Warm-up - Hip control; balance', 1),
  ('level-1-w10-d2', 'dead-hang-or-scap-pulls', 2, '20-30 s', 30, 'Warm-up - Lats activation', 2),
  ('level-1-w10-d2', 'kettlebell-deadlift', 3, '10', 75, 'Circuit 3 rounds - Solid hinge', 3),
  ('level-1-w10-d2', 'kettlebell-press-per-arm', 3, '6-8 each Arm', 75, 'Circuit 3 rounds - Clean lockout', 4),
  ('level-1-w10-d2', 'row-per-arm', 3, '10 each Arm', 75, 'Circuit 3 rounds - Lat tension', 5),
  ('level-1-w10-d2', 'high-plank-shoulder-tap', 2, '12 each Side', 45, 'Finisher - Anti-rotation', 6);

-- Week 10, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w10-d3',
  'level-1',
  10,
  3,
  'Conditioning / Core',
  'Warm-up, Complex 4 rounds, Finisher',
  45,
  'Week 10 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Complex 4 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w10-d3', 'hip-hinge-drill', 2, '8', 30, 'Warm-up - Groove hinge pattern', 0),
  ('level-1-w10-d3', 'goblet-squat-pry', 2, '6', 30, 'Warm-up - Open hips; find depth', 1),
  ('level-1-w10-d3', 'plank-hold', 2, '30 s', 30, 'Warm-up - Brace core before load', 2),
  ('level-1-w10-d3', 'clean--front-squat--push-press', 4, '6 + 6 + 6', 90, 'Complex 4 rounds - Tidy transitions', 3),
  ('level-1-w10-d3', 'suitcase-carry-light', 2, '20-30 m each Side', 45, 'Finisher - Grip + anti-tilt', 4);

-- Week 10, Day 4: Finale Boss (For Time)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-1-w10-d4',
  'level-1',
  10,
  4,
  'Finale Boss (For Time)',
  'Warm-up, For Time',
  60,
  'Week 10 - Finale Boss (For Time)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  true,
  false,
  '{"formats": ["Warm-up", "For Time"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-1-w10-d4', 'hip-hinge-drill', 2, '8', 30, 'Warm-up - Groove hinge pattern', 0),
  ('level-1-w10-d4', 'goblet-squat-pry', 2, '6', 30, 'Warm-up - Open hips; find depth', 1),
  ('level-1-w10-d4', 'plank-hold', 2, '30 s', 30, 'Warm-up - Brace core before load', 2),
  ('level-1-w10-d4', 'swing', 3, '20', 45, 'For Time - Hold posture as fatigue rises', 3),
  ('level-1-w10-d4', 'goblet-squat', 3, '15', 45, 'For Time - Consistent depth', 4),
  ('level-1-w10-d4', 'kettlebell-clean-total', 2, '20', NULL, 'For Time - Soft rack; close path', 5),
  ('level-1-w10-d4', 'push-press-total', 2, '20', NULL, 'For Time - Drive from legs', 6),
  ('level-1-w10-d4', 'front-rack-carry', 1, '60 - 80 m', NULL, 'For Time - Core brace while moving', 7);


-- ============================================
-- LEVEL 2 WORKOUTS
-- ============================================

-- Week 1, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w1-d1',
  'level-2',
  1,
  1,
  'Hinge / Power',
  'Warm-up, EMOM 12 min, Superset x3, Finisher',
  45,
  'Week 1 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "EMOM 12 min", "Superset x3", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w1-d1', 'single-leg-glute-bridge', 2, '10 each side', 30, 'Warm-up - Activate Glutes + Hamstrings', 0),
  ('level-2-w1-d1', 'single-arm-swing', 6, '10 each arm', NULL, 'EMOM 12 min - Timing + Balance', 1),
  ('level-2-w1-d1', 'kettlebell-clean', 3, '6 each arm', 45, 'Superset x3 - Soft Rack; Smooth Pull', 2),
  ('level-2-w1-d1', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w1-d1', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 1, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w1-d2',
  'level-2',
  1,
  2,
  'Strength (Squat + Press)',
  'Warm-up, Circuit 4 rounds, Finisher',
  45,
  'Week 1 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Circuit 4 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w1-d2', 'worlds-greatest-stretch', 2, '5 each side', 30, 'Warm-up - Open Hips; Prep for Squats', 0),
  ('level-2-w1-d2', 'front-rack-reverse-lunge', 4, '8 each side', 60, 'Circuit 4 rounds - Balance + Rack Control', 1),
  ('level-2-w1-d2', 'single-arm-press', 4, '6 each arm', 60, 'Circuit 4 rounds - Vertical Path', 2),
  ('level-2-w1-d2', 'goblet-squat', 4, '10', 60, 'Circuit 4 rounds - Posture Depth', 3),
  ('level-2-w1-d2', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 4),
  ('level-2-w1-d2', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 5);

-- Week 1, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w1-d3',
  'level-2',
  1,
  3,
  'Conditioning / Core',
  'Warm-up, AMRAP 14 min, Finisher',
  45,
  'Week 1 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "AMRAP 14 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w1-d3', 'mountain-climber', 2, '20', 30, 'Warm-up - Core + Shoulders', 0),
  ('level-2-w1-d3', 'swing--squat--press-complex', 1, '5 reps each', NULL, 'AMRAP 14 min - Flow Rhythm', 1),
  ('level-2-w1-d3', 'plank-row', 3, '8 each arm', 30, 'AMRAP 14 min - Anti-Rotation', 2),
  ('level-2-w1-d3', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w1-d3', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 2, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w2-d1',
  'level-2',
  2,
  1,
  'Hinge / Power',
  'Warm-up, EMOM 12 min, Superset x3, Finisher',
  45,
  'Week 2 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "EMOM 12 min", "Superset x3", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w2-d1', 'single-leg-glute-bridge', 2, '10 each side', 30, 'Warm-up - Activate Glutes + Hamstrings', 0),
  ('level-2-w2-d1', 'single-arm-swing', 6, '10 each arm', NULL, 'EMOM 12 min - Timing + Balance', 1),
  ('level-2-w2-d1', 'kettlebell-clean', 3, '6 each arm', 45, 'Superset x3 - Soft Rack; Smooth Pull', 2),
  ('level-2-w2-d1', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w2-d1', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 2, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w2-d2',
  'level-2',
  2,
  2,
  'Strength (Squat + Press)',
  'Warm-up, Circuit 4 rounds, Finisher',
  45,
  'Week 2 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Circuit 4 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w2-d2', 'worlds-greatest-stretch', 2, '5 each side', 30, 'Warm-up - Open Hips; Prep for Squats', 0),
  ('level-2-w2-d2', 'front-rack-reverse-lunge', 4, '8 each side', 60, 'Circuit 4 rounds - Balance + Rack Control', 1),
  ('level-2-w2-d2', 'single-arm-press', 4, '6 each arm', 60, 'Circuit 4 rounds - Vertical Path', 2),
  ('level-2-w2-d2', 'goblet-squat', 4, '10', 60, 'Circuit 4 rounds - Posture Depth', 3),
  ('level-2-w2-d2', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 4),
  ('level-2-w2-d2', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 5);

-- Week 2, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w2-d3',
  'level-2',
  2,
  3,
  'Conditioning / Core',
  'Warm-up, AMRAP 14 min, Finisher',
  45,
  'Week 2 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "AMRAP 14 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w2-d3', 'mountain-climber', 2, '20', 30, 'Warm-up - Core + Shoulders', 0),
  ('level-2-w2-d3', 'swing--squat--press-complex', 1, '5 reps each', NULL, 'AMRAP 14 min - Flow Rhythm', 1),
  ('level-2-w2-d3', 'plank-row', 3, '8 each arm', 30, 'AMRAP 14 min - Anti-Rotation', 2),
  ('level-2-w2-d3', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w2-d3', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 3, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w3-d1',
  'level-2',
  3,
  1,
  'Hinge / Power',
  'Warm-up, EMOM 12 min, Superset x3, Finisher',
  45,
  'Week 3 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "EMOM 12 min", "Superset x3", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w3-d1', 'single-leg-glute-bridge', 2, '10 each side', 30, 'Warm-up - Activate Glutes + Hamstrings', 0),
  ('level-2-w3-d1', 'single-arm-swing', 6, '10 each arm', NULL, 'EMOM 12 min - Timing + Balance', 1),
  ('level-2-w3-d1', 'kettlebell-clean', 3, '6 each arm', 45, 'Superset x3 - Soft Rack; Smooth Pull', 2),
  ('level-2-w3-d1', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w3-d1', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 3, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w3-d2',
  'level-2',
  3,
  2,
  'Strength (Squat + Press)',
  'Warm-up, Circuit 4 rounds, Finisher',
  45,
  'Week 3 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Circuit 4 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w3-d2', 'worlds-greatest-stretch', 2, '5 each side', 30, 'Warm-up - Open Hips; Prep for Squats', 0),
  ('level-2-w3-d2', 'front-rack-reverse-lunge', 4, '8 each side', 60, 'Circuit 4 rounds - Balance + Rack Control', 1),
  ('level-2-w3-d2', 'single-arm-press', 4, '6 each arm', 60, 'Circuit 4 rounds - Vertical Path', 2),
  ('level-2-w3-d2', 'goblet-squat', 4, '10', 60, 'Circuit 4 rounds - Posture Depth', 3),
  ('level-2-w3-d2', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 4),
  ('level-2-w3-d2', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 5);

-- Week 3, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w3-d3',
  'level-2',
  3,
  3,
  'Conditioning / Core',
  'Warm-up, AMRAP 14 min, Finisher',
  45,
  'Week 3 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "AMRAP 14 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w3-d3', 'mountain-climber', 2, '20', 30, 'Warm-up - Core + Shoulders', 0),
  ('level-2-w3-d3', 'swing--squat--press-complex', 1, '5 reps each', NULL, 'AMRAP 14 min - Flow Rhythm', 1),
  ('level-2-w3-d3', 'plank-row', 3, '8 each arm', 30, 'AMRAP 14 min - Anti-Rotation', 2),
  ('level-2-w3-d3', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w3-d3', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 4, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w4-d1',
  'level-2',
  4,
  1,
  'Hinge / Power',
  'Warm-up, EMOM 12 min, Superset x3, Finisher',
  45,
  'Week 4 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "EMOM 12 min", "Superset x3", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w4-d1', 'single-leg-glute-bridge', 2, '10 each side', 30, 'Warm-up - Activate Glutes + Hamstrings', 0),
  ('level-2-w4-d1', 'single-arm-swing', 6, '10 each arm', NULL, 'EMOM 12 min - Timing + Balance', 1),
  ('level-2-w4-d1', 'kettlebell-clean', 3, '6 each arm', 45, 'Superset x3 - Soft Rack; Smooth Pull', 2),
  ('level-2-w4-d1', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w4-d1', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 4, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w4-d2',
  'level-2',
  4,
  2,
  'Strength (Squat + Press)',
  'Warm-up, Circuit 4 rounds, Finisher',
  45,
  'Week 4 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Circuit 4 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w4-d2', 'worlds-greatest-stretch', 2, '5 each side', 30, 'Warm-up - Open Hips; Prep for Squats', 0),
  ('level-2-w4-d2', 'front-rack-reverse-lunge', 4, '8 each side', 60, 'Circuit 4 rounds - Balance + Rack Control', 1),
  ('level-2-w4-d2', 'single-arm-press', 4, '6 each arm', 60, 'Circuit 4 rounds - Vertical Path', 2),
  ('level-2-w4-d2', 'goblet-squat', 4, '10', 60, 'Circuit 4 rounds - Posture Depth', 3),
  ('level-2-w4-d2', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 4),
  ('level-2-w4-d2', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 5);

-- Week 4, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w4-d3',
  'level-2',
  4,
  3,
  'Conditioning / Core',
  'Warm-up, AMRAP 14 min, Finisher',
  45,
  'Week 4 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "AMRAP 14 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w4-d3', 'mountain-climber', 2, '20', 30, 'Warm-up - Core + Shoulders', 0),
  ('level-2-w4-d3', 'swing--squat--press-complex', 1, '5 reps each', NULL, 'AMRAP 14 min - Flow Rhythm', 1),
  ('level-2-w4-d3', 'plank-row', 3, '8 each arm', 30, 'AMRAP 14 min - Anti-Rotation', 2),
  ('level-2-w4-d3', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w4-d3', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 5, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w5-d1',
  'level-2',
  5,
  1,
  'Hinge / Power',
  'Warm-up, EMOM 12 min, Superset x3, Finisher',
  45,
  'Week 5 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "EMOM 12 min", "Superset x3", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w5-d1', 'single-leg-glute-bridge', 2, '10 each side', 30, 'Warm-up - Activate Glutes + Hamstrings', 0),
  ('level-2-w5-d1', 'single-arm-swing', 6, '10 each arm', NULL, 'EMOM 12 min - Timing + Balance', 1),
  ('level-2-w5-d1', 'kettlebell-clean', 3, '6 each arm', 45, 'Superset x3 - Soft Rack; Smooth Pull', 2),
  ('level-2-w5-d1', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w5-d1', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 5, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w5-d2',
  'level-2',
  5,
  2,
  'Strength (Squat + Press)',
  'Warm-up, Circuit 4 rounds, Finisher',
  45,
  'Week 5 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Circuit 4 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w5-d2', 'worlds-greatest-stretch', 2, '5 each side', 30, 'Warm-up - Open Hips; Prep for Squats', 0),
  ('level-2-w5-d2', 'front-rack-reverse-lunge', 4, '8 each side', 60, 'Circuit 4 rounds - Balance + Rack Control', 1),
  ('level-2-w5-d2', 'single-arm-press', 4, '6 each arm', 60, 'Circuit 4 rounds - Vertical Path', 2),
  ('level-2-w5-d2', 'goblet-squat', 4, '10', 60, 'Circuit 4 rounds - Posture Depth', 3),
  ('level-2-w5-d2', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 4),
  ('level-2-w5-d2', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 5);

-- Week 5, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w5-d3',
  'level-2',
  5,
  3,
  'Conditioning / Core',
  'Warm-up, AMRAP 14 min, Finisher',
  45,
  'Week 5 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "AMRAP 14 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w5-d3', 'mountain-climber', 2, '20', 30, 'Warm-up - Core + Shoulders', 0),
  ('level-2-w5-d3', 'swing--squat--press-complex', 1, '5 reps each', NULL, 'AMRAP 14 min - Flow Rhythm', 1),
  ('level-2-w5-d3', 'plank-row', 3, '8 each arm', 30, 'AMRAP 14 min - Anti-Rotation', 2),
  ('level-2-w5-d3', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w5-d3', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 6, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w6-d1',
  'level-2',
  6,
  1,
  'Hinge / Power',
  'Warm-up, EMOM 12 min, Superset x3, Finisher',
  45,
  'Week 6 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "EMOM 12 min", "Superset x3", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w6-d1', 'single-leg-glute-bridge', 2, '10 each side', 30, 'Warm-up - Activate Glutes + Hamstrings', 0),
  ('level-2-w6-d1', 'single-arm-swing', 6, '10 each arm', NULL, 'EMOM 12 min - Timing + Balance', 1),
  ('level-2-w6-d1', 'kettlebell-clean', 3, '6 each arm', 45, 'Superset x3 - Soft Rack; Smooth Pull', 2),
  ('level-2-w6-d1', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w6-d1', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 6, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w6-d2',
  'level-2',
  6,
  2,
  'Strength (Squat + Press)',
  'Warm-up, Circuit 4 rounds, Finisher',
  45,
  'Week 6 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Circuit 4 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w6-d2', 'worlds-greatest-stretch', 2, '5 each side', 30, 'Warm-up - Open Hips; Prep for Squats', 0),
  ('level-2-w6-d2', 'front-rack-reverse-lunge', 4, '8 each side', 60, 'Circuit 4 rounds - Balance + Rack Control', 1),
  ('level-2-w6-d2', 'single-arm-press', 4, '6 each arm', 60, 'Circuit 4 rounds - Vertical Path', 2),
  ('level-2-w6-d2', 'goblet-squat', 4, '10', 60, 'Circuit 4 rounds - Posture Depth', 3),
  ('level-2-w6-d2', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 4),
  ('level-2-w6-d2', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 5);

-- Week 6, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w6-d3',
  'level-2',
  6,
  3,
  'Conditioning / Core',
  'Warm-up, AMRAP 14 min, Finisher',
  45,
  'Week 6 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "AMRAP 14 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w6-d3', 'mountain-climber', 2, '20', 30, 'Warm-up - Core + Shoulders', 0),
  ('level-2-w6-d3', 'swing--squat--press-complex', 1, '5 reps each', NULL, 'AMRAP 14 min - Flow Rhythm', 1),
  ('level-2-w6-d3', 'plank-row', 3, '8 each arm', 30, 'AMRAP 14 min - Anti-Rotation', 2),
  ('level-2-w6-d3', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w6-d3', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 7, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w7-d1',
  'level-2',
  7,
  1,
  'Hinge / Power',
  'Warm-up, EMOM 12 min, Superset x3, Finisher',
  45,
  'Week 7 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "EMOM 12 min", "Superset x3", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w7-d1', 'single-leg-glute-bridge', 2, '10 each side', 30, 'Warm-up - Activate Glutes + Hamstrings', 0),
  ('level-2-w7-d1', 'single-arm-swing', 6, '10 each arm', NULL, 'EMOM 12 min - Timing + Balance', 1),
  ('level-2-w7-d1', 'kettlebell-clean', 3, '6 each arm', 45, 'Superset x3 - Soft Rack; Smooth Pull', 2),
  ('level-2-w7-d1', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w7-d1', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 7, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w7-d2',
  'level-2',
  7,
  2,
  'Strength (Squat + Press)',
  'Warm-up, Circuit 4 rounds, Finisher',
  45,
  'Week 7 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Circuit 4 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w7-d2', 'worlds-greatest-stretch', 2, '5 each side', 30, 'Warm-up - Open Hips; Prep for Squats', 0),
  ('level-2-w7-d2', 'front-rack-reverse-lunge', 4, '8 each side', 60, 'Circuit 4 rounds - Balance + Rack Control', 1),
  ('level-2-w7-d2', 'single-arm-press', 4, '6 each arm', 60, 'Circuit 4 rounds - Vertical Path', 2),
  ('level-2-w7-d2', 'goblet-squat', 4, '10', 60, 'Circuit 4 rounds - Posture Depth', 3),
  ('level-2-w7-d2', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 4),
  ('level-2-w7-d2', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 5);

-- Week 7, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w7-d3',
  'level-2',
  7,
  3,
  'Conditioning / Core',
  'Warm-up, AMRAP 14 min, Finisher',
  45,
  'Week 7 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "AMRAP 14 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w7-d3', 'mountain-climber', 2, '20', 30, 'Warm-up - Core + Shoulders', 0),
  ('level-2-w7-d3', 'swing--squat--press-complex', 1, '5 reps each', NULL, 'AMRAP 14 min - Flow Rhythm', 1),
  ('level-2-w7-d3', 'plank-row', 3, '8 each arm', 30, 'AMRAP 14 min - Anti-Rotation', 2),
  ('level-2-w7-d3', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w7-d3', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 8, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w8-d1',
  'level-2',
  8,
  1,
  'Hinge / Power',
  'Warm-up, EMOM 12 min, Superset x3, Finisher',
  45,
  'Week 8 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "EMOM 12 min", "Superset x3", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w8-d1', 'single-leg-glute-bridge', 2, '10 each side', 30, 'Warm-up - Activate Glutes + Hamstrings', 0),
  ('level-2-w8-d1', 'single-arm-swing', 6, '10 each arm', NULL, 'EMOM 12 min - Timing + Balance', 1),
  ('level-2-w8-d1', 'kettlebell-clean', 3, '6 each arm', 45, 'Superset x3 - Soft Rack; Smooth Pull', 2),
  ('level-2-w8-d1', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w8-d1', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 8, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w8-d2',
  'level-2',
  8,
  2,
  'Strength (Squat + Press)',
  'Warm-up, Circuit 4 rounds, Finisher',
  45,
  'Week 8 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Circuit 4 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w8-d2', 'worlds-greatest-stretch', 2, '5 each side', 30, 'Warm-up - Open Hips; Prep for Squats', 0),
  ('level-2-w8-d2', 'front-rack-reverse-lunge', 4, '8 each side', 60, 'Circuit 4 rounds - Balance + Rack Control', 1),
  ('level-2-w8-d2', 'single-arm-press', 4, '6 each arm', 60, 'Circuit 4 rounds - Vertical Path', 2),
  ('level-2-w8-d2', 'goblet-squat', 4, '10', 60, 'Circuit 4 rounds - Posture Depth', 3),
  ('level-2-w8-d2', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 4),
  ('level-2-w8-d2', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 5);

-- Week 8, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w8-d3',
  'level-2',
  8,
  3,
  'Conditioning / Core',
  'Warm-up, AMRAP 14 min, Finisher',
  45,
  'Week 8 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "AMRAP 14 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w8-d3', 'mountain-climber', 2, '20', 30, 'Warm-up - Core + Shoulders', 0),
  ('level-2-w8-d3', 'swing--squat--press-complex', 1, '5 reps each', NULL, 'AMRAP 14 min - Flow Rhythm', 1),
  ('level-2-w8-d3', 'plank-row', 3, '8 each arm', 30, 'AMRAP 14 min - Anti-Rotation', 2),
  ('level-2-w8-d3', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w8-d3', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 9, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w9-d1',
  'level-2',
  9,
  1,
  'Hinge / Power',
  'Warm-up, EMOM 12 min, Superset x3, Finisher',
  45,
  'Week 9 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "EMOM 12 min", "Superset x3", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w9-d1', 'single-leg-glute-bridge', 2, '10 each side', 30, 'Warm-up - Activate Glutes + Hamstrings', 0),
  ('level-2-w9-d1', 'single-arm-swing', 6, '10 each arm', NULL, 'EMOM 12 min - Timing + Balance', 1),
  ('level-2-w9-d1', 'kettlebell-clean', 3, '6 each arm', 45, 'Superset x3 - Soft Rack; Smooth Pull', 2),
  ('level-2-w9-d1', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w9-d1', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 9, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w9-d2',
  'level-2',
  9,
  2,
  'Strength (Squat + Press)',
  'Warm-up, Circuit 4 rounds, Finisher',
  45,
  'Week 9 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Circuit 4 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w9-d2', 'worlds-greatest-stretch', 2, '5 each side', 30, 'Warm-up - Open Hips; Prep for Squats', 0),
  ('level-2-w9-d2', 'front-rack-reverse-lunge', 4, '8 each side', 60, 'Circuit 4 rounds - Balance + Rack Control', 1),
  ('level-2-w9-d2', 'single-arm-press', 4, '6 each arm', 60, 'Circuit 4 rounds - Vertical Path', 2),
  ('level-2-w9-d2', 'goblet-squat', 4, '10', 60, 'Circuit 4 rounds - Posture Depth', 3),
  ('level-2-w9-d2', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 4),
  ('level-2-w9-d2', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 5);

-- Week 9, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w9-d3',
  'level-2',
  9,
  3,
  'Conditioning / Core',
  'Warm-up, AMRAP 14 min, Finisher',
  45,
  'Week 9 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "AMRAP 14 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w9-d3', 'mountain-climber', 2, '20', 30, 'Warm-up - Core + Shoulders', 0),
  ('level-2-w9-d3', 'swing--squat--press-complex', 1, '5 reps each', NULL, 'AMRAP 14 min - Flow Rhythm', 1),
  ('level-2-w9-d3', 'plank-row', 3, '8 each arm', 30, 'AMRAP 14 min - Anti-Rotation', 2),
  ('level-2-w9-d3', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w9-d3', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 10, Day 1: Hinge / Power
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w10-d1',
  'level-2',
  10,
  1,
  'Hinge / Power',
  'Warm-up, EMOM 12 min, Superset x3, Finisher',
  45,
  'Week 10 - Hinge / Power',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "EMOM 12 min", "Superset x3", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w10-d1', 'single-leg-glute-bridge', 2, '10 each side', 30, 'Warm-up - Activate Glutes + Hamstrings', 0),
  ('level-2-w10-d1', 'single-arm-swing', 6, '10 each arm', NULL, 'EMOM 12 min - Timing + Balance', 1),
  ('level-2-w10-d1', 'kettlebell-clean', 3, '6 each arm', 45, 'Superset x3 - Soft Rack; Smooth Pull', 2),
  ('level-2-w10-d1', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w10-d1', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 10, Day 2: Strength (Squat + Press)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w10-d2',
  'level-2',
  10,
  2,
  'Strength (Squat + Press)',
  'Warm-up, Circuit 4 rounds, Finisher',
  45,
  'Week 10 - Strength (Squat + Press)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "Circuit 4 rounds", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w10-d2', 'worlds-greatest-stretch', 2, '5 each side', 30, 'Warm-up - Open Hips; Prep for Squats', 0),
  ('level-2-w10-d2', 'front-rack-reverse-lunge', 4, '8 each side', 60, 'Circuit 4 rounds - Balance + Rack Control', 1),
  ('level-2-w10-d2', 'single-arm-press', 4, '6 each arm', 60, 'Circuit 4 rounds - Vertical Path', 2),
  ('level-2-w10-d2', 'goblet-squat', 4, '10', 60, 'Circuit 4 rounds - Posture Depth', 3),
  ('level-2-w10-d2', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 4),
  ('level-2-w10-d2', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 5);

-- Week 10, Day 3: Conditioning / Core
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w10-d3',
  'level-2',
  10,
  3,
  'Conditioning / Core',
  'Warm-up, AMRAP 14 min, Finisher',
  45,
  'Week 10 - Conditioning / Core',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  false,
  false,
  '{"formats": ["Warm-up", "AMRAP 14 min", "Finisher"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w10-d3', 'mountain-climber', 2, '20', 30, 'Warm-up - Core + Shoulders', 0),
  ('level-2-w10-d3', 'swing--squat--press-complex', 1, '5 reps each', NULL, 'AMRAP 14 min - Flow Rhythm', 1),
  ('level-2-w10-d3', 'plank-row', 3, '8 each arm', 30, 'AMRAP 14 min - Anti-Rotation', 2),
  ('level-2-w10-d3', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
  ('level-2-w10-d3', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 10, Day 4: Finale Boss (For Time)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES (
  'level-2-w10-d4',
  'level-2',
  10,
  4,
  'Finale Boss (For Time)',
  'Warm-up, For Time',
  60,
  'Week 10 - Finale Boss (For Time)',
  'Dynamic mobility and activation',
  'Static stretching and breathing',
  true,
  false,
  '{"formats": ["Warm-up", "For Time"]}'::jsonb
);

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
  ('level-2-w10-d4', 'hip-opener-flow', 2, '5 each side', 30, 'Warm-up - Loosen Hips Before Load', 0),
  ('level-2-w10-d4', 'single-arm-swing', 3, '15 each arm', NULL, 'For Time - Power Endurance', 1),
  ('level-2-w10-d4', 'clean-to-front-squat', 3, '10 each arm', NULL, 'For Time - Rack Control', 2),
  ('level-2-w10-d4', 'push-press', 3, '10 each arm', NULL, 'For Time - Explosive Drive', 3),
  ('level-2-w10-d4', 'front-rack-carry', 2, '40m', NULL, 'For Time - Core and Breath Control', 4);


-- ============================================
-- VERIFICATION
-- ============================================
DO $$
DECLARE
  workout_count INTEGER;
  exercise_link_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO workout_count FROM workouts;
  SELECT COUNT(*) INTO exercise_link_count FROM workout_exercises;
  
  RAISE NOTICE '✅ All workouts inserted!';
  RAISE NOTICE 'Total workouts: %', workout_count;
  RAISE NOTICE 'Total workout-exercise links: %', exercise_link_count;
  RAISE NOTICE '';
  RAISE NOTICE '📊 Breakdown:';
  RAISE NOTICE '- Level 1: % workouts', (SELECT COUNT(*) FROM workouts WHERE level_id = 'level-1');
  RAISE NOTICE '- Level 2: % workouts', (SELECT COUNT(*) FROM workouts WHERE level_id = 'level-2');
END $$;
