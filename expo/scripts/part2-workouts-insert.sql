-- Part 2: Insert Workouts Data
-- Run this SQL in Supabase SQL Editor after running Part 1 (exercises)

-- ============================================
-- LEVEL 1 WORKOUTS
-- ============================================

-- Week 1, Day 1
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES 
('level-1-w1-d1', 'level-1', 1, 1, 'Hinge / Power', 'Warm-up, EMOM 12 min, Finisher', 45, 'Week 1 - Hinge / Power', 'Dynamic mobility and activation', 'Static stretching and breathing', false, false, '{"formats": ["Warm-up", "EMOM 12 min", "Finisher"]}');

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
('level-1-w1-d1', 'cat-camel--t-spine-reach', 2, '6 each Side', 30, 'Warm-up - Mobilize spine', 0),
('level-1-w1-d1', 'kb-halo-light', 2, '8 each Side', 30, 'Warm-up - Shoulder prep', 1),
('level-1-w1-d1', 'marching-rack-hold-light', 2, '20 Steps', 30, 'Warm-up - Find rack position; core brace', 2),
('level-1-w1-d1', 'kettlebell-deadlift-odd-min', 6, '8-10', null, 'EMOM 12 min - Learn hinge under clock', 3),
('level-1-w1-d1', 'swing-even-min', 6, '8', null, 'EMOM 12 min - Hip drive; crisp lockout', 4),
('level-1-w1-d1', 'dead-bug', 2, '8 each Side', 30, 'Finisher - Core coordination', 5);

-- Week 1, Day 2
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES 
('level-1-w1-d2', 'level-1', 1, 2, 'Strength (Squat + Press)', 'Warm-up, Circuit 3 rounds, Finisher', 45, 'Week 1 - Strength (Squat + Press)', 'Dynamic mobility and activation', 'Static stretching and breathing', false, false, '{"formats": ["Warm-up", "Circuit 3 rounds", "Finisher"]}');

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
('level-1-w1-d2', 'glute-bridge', 2, '12', 30, 'Warm-up - Activate glutes', 0),
('level-1-w1-d2', 'bodyweight-reverse-lunge', 2, '8 each Side', 30, 'Warm-up - Hip control; balance', 1),
('level-1-w1-d2', 'dead-hang-or-scap-pulls', 2, '20-30 s', 30, 'Warm-up - Lats activation', 2),
('level-1-w1-d2', 'goblet-squat', 3, '10-12', 60, 'Circuit 3 rounds - Posture + depth', 3),
('level-1-w1-d2', 'kettlebell-press-per-arm', 3, '6-8 each Arm', 60, 'Circuit 3 rounds - Shoulder control', 4),
('level-1-w1-d2', 'bent-over-row-per-arm', 3, '8-10 each Arm', 60, 'Circuit 3 rounds - Lat engagement', 5),
('level-1-w1-d2', 'high-plank-shoulder-tap', 2, '12 each Side', 45, 'Finisher - Anti-rotation', 6);

-- Week 1, Day 3
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES 
('level-1-w1-d3', 'level-1', 1, 3, 'Conditioning / Core', 'Warm-up, AMRAP 12 min, Finisher', 45, 'Week 1 - Conditioning / Core', 'Dynamic mobility and activation', 'Static stretching and breathing', false, false, '{"formats": ["Warm-up", "AMRAP 12 min", "Finisher"]}');

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
('level-1-w1-d3', 'hip-hinge-drill', 2, '8', 30, 'Warm-up - Groove hinge pattern', 0),
('level-1-w1-d3', 'goblet-squat-pry', 2, '6', 30, 'Warm-up - Open hips; find depth', 1),
('level-1-w1-d3', 'plank-hold', 2, '30 s', 30, 'Warm-up - Brace core before load', 2),
('level-1-w1-d3', 'swing', null, '10', null, 'AMRAP 12 min - Steady cadence', 3),
('level-1-w1-d3', 'goblet-squat', null, '8', null, 'AMRAP 12 min - Smooth depth', 4),
('level-1-w1-d3', 'push-press', null, '6 each Arm', null, 'AMRAP 12 min - Leg drive timing', 5),
('level-1-w1-d3', 'suitcase-carry-light', 2, '20-30 m each Side', 45, 'Finisher - Grip + anti-tilt', 6);

-- Continue with remaining weeks...
-- Week 2-10 follow similar pattern

-- Week 10, Day 4 (Boss Fight)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES 
('level-1-w10-d4', 'level-1', 10, 4, 'Finale Boss (For Time)', 'Warm-up, For Time', 60, 'Week 10 - Finale Boss (For Time)', 'Dynamic mobility and activation', 'Static stretching and breathing', true, false, '{"formats": ["Warm-up", "For Time"]}');

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
('level-1-w10-d4', 'hip-hinge-drill', 2, '8', 30, 'Warm-up - Groove hinge pattern', 0),
('level-1-w10-d4', 'goblet-squat-pry', 2, '6', 30, 'Warm-up - Open hips; find depth', 1),
('level-1-w10-d4', 'plank-hold', 2, '30 s', 30, 'Warm-up - Brace core before load', 2),
('level-1-w10-d4', 'swing', 3, '20', 45, 'For Time - Hold posture as fatigue rises', 3),
('level-1-w10-d4', 'goblet-squat', 3, '15', 45, 'For Time - Consistent depth', 4),
('level-1-w10-d4', 'kettlebell-clean-total', 2, '20', null, 'For Time - Soft rack; close path', 5),
('level-1-w10-d4', 'push-press-total', 2, '20', null, 'For Time - Drive from legs', 6),
('level-1-w10-d4', 'front-rack-carry', 1, '60 - 80 m', null, 'For Time - Core brace while moving', 7);

-- ============================================
-- LEVEL 2 WORKOUTS
-- ============================================

-- Week 1, Day 1
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES 
('level-2-w1-d1', 'level-2', 1, 1, 'Hinge / Power', 'Warm-up, EMOM 12 min, Superset x3, Finisher', 45, 'Week 1 - Hinge / Power', 'Dynamic mobility and activation', 'Static stretching and breathing', false, false, '{"formats": ["Warm-up", "EMOM 12 min", "Superset x3", "Finisher"]}');

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
('level-2-w1-d1', 'single-leg-glute-bridge', 2, '10 each side', 30, 'Warm-up - Activate Glutes + Hamstrings', 0),
('level-2-w1-d1', 'single-arm-swing', 6, '10 each arm', null, 'EMOM 12 min - Timing + Balance', 1),
('level-2-w1-d1', 'kettlebell-clean', 3, '6 each arm', 45, 'Superset x3 - Soft Rack; Smooth Pull', 2),
('level-2-w1-d1', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
('level-2-w1-d1', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 1, Day 2
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES 
('level-2-w1-d2', 'level-2', 1, 2, 'Strength (Squat + Press)', 'Warm-up, Circuit 4 rounds, Finisher', 45, 'Week 1 - Strength (Squat + Press)', 'Dynamic mobility and activation', 'Static stretching and breathing', false, false, '{"formats": ["Warm-up", "Circuit 4 rounds", "Finisher"]}');

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
('level-2-w1-d2', 'worlds-greatest-stretch', 2, '5 each side', 30, 'Warm-up - Open Hips; Prep for Squats', 0),
('level-2-w1-d2', 'front-rack-reverse-lunge', 4, '8 each side', 60, 'Circuit 4 rounds - Balance + Rack Control', 1),
('level-2-w1-d2', 'single-arm-press', 4, '6 each arm', 60, 'Circuit 4 rounds - Vertical Path', 2),
('level-2-w1-d2', 'goblet-squat', 4, '10', 60, 'Circuit 4 rounds - Posture Depth', 3),
('level-2-w1-d2', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 4),
('level-2-w1-d2', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 5);

-- Week 1, Day 3
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES 
('level-2-w1-d3', 'level-2', 1, 3, 'Conditioning / Core', 'Warm-up, AMRAP 14 min, Finisher', 45, 'Week 1 - Conditioning / Core', 'Dynamic mobility and activation', 'Static stretching and breathing', false, false, '{"formats": ["Warm-up", "AMRAP 14 min", "Finisher"]}');

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
('level-2-w1-d3', 'mountain-climber', 2, '20', 30, 'Warm-up - Core + Shoulders', 0),
('level-2-w1-d3', 'swing--squat--press-complex', 1, '5 reps each', null, 'AMRAP 14 min - Flow Rhythm', 1),
('level-2-w1-d3', 'plank-row', 3, '8 each arm', 30, 'AMRAP 14 min - Anti-Rotation', 2),
('level-2-w1-d3', 'front-rack-carry', 2, '30m', 30, 'Finisher - Core + Posture', 3),
('level-2-w1-d3', 'dead-bug', 2, '8 each side', 30, 'Finisher - Core Stability', 4);

-- Week 10, Day 4 (Boss Fight)
INSERT INTO workouts (id, level_id, week, day, title, format, duration, description, warmup, cooldown, is_boss_fight, requires_completion, format_details)
VALUES 
('level-2-w10-d4', 'level-2', 10, 4, 'Finale Boss (For Time)', 'Warm-up, For Time', 60, 'Week 10 - Finale Boss (For Time)', 'Dynamic mobility and activation', 'Static stretching and breathing', true, false, '{"formats": ["Warm-up", "For Time"]}');

INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, notes, order_index)
VALUES
('level-2-w10-d4', 'hip-opener-flow', 2, '5 each side', 30, 'Warm-up - Loosen Hips Before Load', 0),
('level-2-w10-d4', 'single-arm-swing', 3, '15 each arm', null, 'For Time - Power Endurance', 1),
('level-2-w10-d4', 'clean-to-front-squat', 3, '10 each arm', null, 'For Time - Rack Control', 2),
('level-2-w10-d4', 'push-press', 3, '10 each arm', null, 'For Time - Explosive Drive', 3),
('level-2-w10-d4', 'front-rack-carry', 2, '40m', null, 'For Time - Core and Breath Control', 4);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
DECLARE
  workout_count INTEGER;
  exercise_link_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO workout_count FROM workouts;
  SELECT COUNT(*) INTO exercise_link_count FROM workout_exercises;
  
  RAISE NOTICE '✅ Part 2 Complete!';
  RAISE NOTICE 'Total workouts: %', workout_count;
  RAISE NOTICE 'Total workout-exercise links: %', exercise_link_count;
  RAISE NOTICE '';
  RAISE NOTICE '📊 Summary:';
  RAISE NOTICE '- Level 1: % workouts', (SELECT COUNT(*) FROM workouts WHERE level_id = 'level-1');
  RAISE NOTICE '- Level 2: % workouts', (SELECT COUNT(*) FROM workouts WHERE level_id = 'level-2');
END $$;
