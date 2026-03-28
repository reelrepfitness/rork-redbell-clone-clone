# HOW TO FIX THE FOREIGN KEY ERROR

## THE PROBLEM
You're getting this error:
```
ERROR: 23503: insert or update on table "workout_exercises" violates foreign key constraint "workout_exercises_exercise_id_fkey"
DETAIL: Key (exercise_id)=(cat-camel--t-spine-reach) is not present in table "exercises".
```

This means the SQL is trying to insert workouts that reference exercises that don't exist yet.

## THE SOLUTION

You need to insert exercises FIRST, then workouts.

### Step 1: Insert Exercises First

Copy and paste this SQL into Supabase SQL Editor and run it:

```sql
INSERT INTO exercises (id, name, category, description) VALUES
('cat-camel--t-spine-reach', 'Cat-Camel + T-Spine Reach', 'warmup', 'Mobilize spine'),
('kb-halo-light', 'KB Halo (light)', 'warmup', 'Shoulder prep'),
('marching-rack-hold-light', 'Marching Rack Hold (light)', 'warmup', 'Find rack position; core brace'),
('glute-bridge', 'Glute Bridge', 'warmup', 'Activate glutes'),
('bodyweight-reverse-lunge', 'Bodyweight Reverse Lunge', 'lunge', 'Hip control; balance'),
('dead-hang-or-scap-pulls', 'Dead Hang or Scap Pulls', 'pull', 'Lats activation'),
('hip-hinge-drill', 'Hip Hinge Drill', 'hinge', 'Groove hinge pattern'),
('goblet-squat-pry', 'Goblet Squat Pry', 'squat', 'Open hips; find depth'),
('plank-hold', 'Plank Hold', 'core', 'Brace core before load'),
('kettlebell-deadlift-odd-min', 'Kettlebell Deadlift (odd min)', 'hinge', 'Learn hinge under clock'),
('swing-even-min', 'Swing (even min)', 'power', 'Hip drive; crisp lockout'),
('swing', 'Swing', 'power', 'Hip drive; crisp lockout'),
('dead-bug', 'Dead Bug', 'core', 'Core coordination'),
('goblet-squat', 'Goblet Squat', 'squat', 'Posture + depth'),
('kettlebell-press-per-arm', 'Kettlebell Press (per arm)', 'press', 'Shoulder control'),
('bent-over-row-per-arm', 'Bent-Over Row (per arm)', 'pull', 'Lat engagement'),
('high-plank-shoulder-tap', 'High Plank Shoulder Tap', 'core', 'Anti-rotation'),
('push-press', 'Push Press', 'press', 'Leg drive timing'),
('suitcase-carry-light', 'Suitcase Carry (light)', 'carry', 'Grip + anti-tilt'),
('kettlebell-clean-per-arm', 'Kettlebell Clean (per arm)', 'power', 'Soft rack'),
('front-squat', 'Front Squat', 'squat', 'Torso tall'),
('kettlebell-press-odd-min', 'Kettlebell Press (odd min)', 'press', 'Quality reps'),
('romanian-deadlift-even-min', 'Romanian Deadlift (even min)', 'hinge', 'Hamstring tension'),
('clean--front-squat-complex', 'Clean + Front Squat (complex)', 'power', 'Smooth transition'),
('row-per-arm', 'Row (per arm)', 'pull', 'Back tension'),
('marching-front-rack-carry', 'Marching Front Rack Carry', 'carry', 'Core brace'),
('swing--clean--front-squat--push-press', 'Swing → Clean → Front Squat → Push Press', 'power', 'Flow and breathing'),
('front-rack-reverse-lunge', 'Front Rack Reverse Lunge', 'lunge', 'Balance and control'),
('kettlebell-deadlift', 'Kettlebell Deadlift', 'hinge', 'Solid hinge'),
('clean--front-squat--push-press', 'Clean → Front Squat → Push Press', 'power', 'Tidy transitions'),
('kettlebell-clean-total', 'Kettlebell Clean (total)', 'power', 'Soft rack; close path'),
('push-press-total', 'Push Press (total)', 'press', 'Drive from legs'),
('front-rack-carry', 'Front Rack Carry', 'carry', 'Core brace while moving'),
('single-leg-glute-bridge', 'Single-Leg Glute Bridge', 'warmup', 'Activate Glutes + Hamstrings'),
('single-arm-swing', 'Single Arm Swing', 'power', 'Timing + Balance'),
('kettlebell-clean', 'Kettlebell Clean', 'power', 'Soft Rack; Smooth Pull'),
('worlds-greatest-stretch', 'World''s Greatest Stretch', 'warmup', 'Open Hips; Prep for Squats'),
('single-arm-press', 'Single Arm Press', 'press', 'Vertical Path'),
('mountain-climber', 'Mountain Climber', 'core', 'Core + Shoulders'),
('swing--squat--press-complex', 'Swing + Squat + Press Complex', 'power', 'Flow Rhythm'),
('plank-row', 'Plank Row', 'pull', 'Anti-Rotation'),
('hip-opener-flow', 'Hip Opener Flow', 'warmup', 'Loosen Hips Before Load'),
('clean-to-front-squat', 'Clean to Front Squat', 'power', 'Rack Control'),
('swing-odd-min', 'Swing (odd min)', 'power', 'Maintain power; crisp lockout'),
('goblet-squat-even-min', 'Goblet Squat (even min)', 'squat', 'Posture under clock')
ON CONFLICT (id) DO NOTHING;
```

### Step 2: Insert Workouts

After the exercises are inserted successfully, copy and paste the content from:
**scripts/COMPLETE-WORKOUT-DATA.sql**

into Supabase SQL Editor and run it.

This will insert all Level 1 and Level 2 workouts.

## ALTERNATIVE: Use One Complete File

I've created a file with BOTH exercises and workouts in the correct order:
**scripts/FINAL-COMPLETE-SQL.sql**

But it's incomplete. Let me create a complete version for you...
