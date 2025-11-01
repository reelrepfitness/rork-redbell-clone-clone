# Database Connection Guide

## What Was Done

Your workout app has been successfully connected to Supabase! Here's what was implemented:

### 1. Created Supabase Client (`lib/supabase.ts`)
- Configured connection to your Supabase database
- Uses environment variables from `.env` file

### 2. Created API Functions (`lib/api.ts`)
- `fetchExercises()` - Retrieves all exercises from database
- `fetchWorkouts()` - Retrieves all workouts with their exercises
- `fetchWorkoutById()` - Retrieves a single workout by ID
- Maps database columns to app types correctly

### 3. Created Data Context (`context/DataContext.tsx`)
- Uses React Query for data fetching and caching
- Automatically fetches data from Supabase
- Falls back to mock data if database is empty or unavailable
- Caches data for 5 minutes to reduce API calls

### 4. Updated Root Layout (`app/_layout.tsx`)
- Added `DataProvider` to wrap the app
- Makes data available throughout the app

### 5. Updated Screens
- Home screen (`app/(tabs)/index.tsx`) now uses data from Supabase
- Workout detail screen (`app/workout/[id].tsx`) now uses data from Supabase

## How It Works

1. **App starts** → DataProvider fetches exercises and workouts from Supabase
2. **Data is cached** → React Query stores the data for 5 minutes
3. **Components use data** → Screens access data via `useData()` hook
4. **Falls back gracefully** → If Supabase is empty/unavailable, uses mock data

## Database Structure

Your Supabase database has these tables:

### `exercises` table
- `id` (text) - Unique identifier
- `name` (text) - Exercise name
- `category` (text) - Exercise category
- `description` (text) - Description
- `focus_points` (text[]) - Array of focus points
- `technique_checklist` (text[]) - Array of technique tips
- `common_errors` (text[]) - Array of common mistakes
- `alternatives` (text[]) - Array of alternative exercises
- `image_url` (text) - Image URL

### `workouts` table
- `id` (text) - Unique identifier
- `level_id` (text) - Level identifier (e.g., 'level-1')
- `week` (integer) - Week number
- `day` (integer) - Day number
- `title` (text) - Workout title
- `format` (text) - Workout format (EMOM, AMRAP, Circuit, etc.)
- `duration` (integer) - Duration in minutes
- `description` (text) - Workout description
- `warmup` (text) - Warmup instructions
- `cooldown` (text) - Cooldown instructions
- `is_boss_fight` (boolean) - Is this a boss fight workout?
- `requires_completion` (boolean) - Requires previous completion?
- `format_details` (jsonb) - Format-specific details

### `workout_exercises` table
- `id` (uuid) - Unique identifier
- `workout_id` (text) - Foreign key to workouts
- `exercise_id` (text) - Foreign key to exercises
- `sets` (integer) - Number of sets
- `reps` (text) - Reps (can be text like "10 each side")
- `rest` (integer) - Rest time in seconds
- `notes` (text) - Additional notes

## Current Status

✅ Database populated with Level 1 and Level 2 workouts
✅ App connected to Supabase
✅ Data fetching implemented
✅ React Query caching set up
✅ Fallback to mocks if needed

## Next Steps

Your app is now functional and connected to the database! Users can:

1. **View workouts** from the database
2. **Complete workouts** (progress is saved locally in AsyncStorage)
3. **Track their progress** across weeks
4. **Unlock new weeks** as they complete previous ones

### Future Enhancements You Can Add:

1. **User Authentication** - Let users sign in and save progress to Supabase
2. **More Levels** - Add Level 3, 4, 5 workouts to the database
3. **Exercise Videos** - Add video URLs to exercises
4. **Leaderboards** - Track and compare user progress
5. **Custom Workouts** - Let users create their own workouts
6. **Progress Sync** - Save progress to Supabase instead of just AsyncStorage

## Environment Variables

Make sure your `.env` file has these variables:

```
EXPO_PUBLIC_SUPABASE_URL=https://fzvkwdmfhseapvsxgcmf.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

These are already set up in your current `.env` file!
