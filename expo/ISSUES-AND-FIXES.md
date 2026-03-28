# 🔥 CRITICAL ISSUES & FIXES

## 1. ✅ FIXED: Fake Authentication
**Problem:** Auth was hardcoded with fake user "user-1"  
**Status:** ✅ FIXED  
**What I did:**
- Integrated real Supabase auth
- Added session management
- Added sign in/sign up/sign out functions
- Added auth routing (redirects to /auth when logged out)

---

## 2. ⚠️ CRITICAL: Missing Database Table

### `completed_workouts` Table Does NOT Exist
Your app tracks progress in memory, but there's NO database table to store it!

**Impact:** 
- Users lose progress on app restart
- Can't track workout history
- Boss fights can't be locked properly
- No completion statistics

**Fix Required:**
Run this SQL in your Supabase dashboard:

```sql
-- Create completed_workouts table
CREATE TABLE completed_workouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workout_id TEXT NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  duration INT,
  notes TEXT,
  UNIQUE(user_id, workout_id, completed_at)
);

CREATE INDEX idx_completed_workouts_user ON completed_workouts(user_id);
CREATE INDEX idx_completed_workouts_workout ON completed_workouts(workout_id);

-- Enable Row Level Security
ALTER TABLE completed_workouts ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own completions
CREATE POLICY "Users can view own completed workouts"
ON completed_workouts FOR SELECT
USING (auth.uid() = user_id);

-- Allow users to insert their own completions
CREATE POLICY "Users can insert own completed workouts"
ON completed_workouts FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own completions
CREATE POLICY "Users can delete own completed workouts"
ON completed_workouts FOR DELETE
USING (auth.uid() = user_id);
```

---

## 3. ⚠️ MISSING: Workout Flow Screens

### Current State:
- You have `/workout/[id]` but it's just a flat list
- NO separation of warm-up, main workout, finisher
- NO timers for AMRAP/EMOM
- NO video demonstrations

### What You Need:
Based on your requirements from previous messages:

#### Screen 1: Brief (`/workout/[id]/brief`)
- Workout goal explanation
- Format definition (AMRAP/EMOM)
- Warm-up exercises with videos
- "I'm Warmed Up" button → goes to Screen 2

#### Screen 2: Main Workout (`/workout/[id]`)
**For AMRAP workouts:**
- Countdown timer (e.g., 12 minutes)
- Exercise list with checkboxes
- Video demos for each exercise
- Stop/Reset timer buttons
- "Mark as Complete" button

**For EMOM workouts:**
- 1-minute countdown timer (repeats N times)
- Show CURRENT minute's exercise
- Show NEXT minute's exercise below
- Reset resets to minute 1
- Visual indicator of which minute you're on (1/8, 2/8, etc.)
- "Mark as Complete" button

#### Screen 3: Summary (Bottom Sheet)
- Triggered by "Mark as Complete"
- Progress circle: "X of Y workouts complete"
- Workout stats (duration, calories if health app connected)
- Unlock message if boss fight unlocked
- "Done" button → goes to home

---

## 4. ⚠️ ISSUE: Boss Fights Are Unlocked

**Problem:** Users can access boss fights without completing the program  
**Expected:** Boss fights should be locked until user completes all workouts in that level

**Fix Needed:**
1. Create `canAccessBossFight(userId, levelId)` function
2. Check if user completed all non-boss workouts in that level
3. Show lock icon in UI if not accessible
4. Block navigation to locked boss fights

---

## 5. ⚠️ ISSUE: API Calls with Non-Existent Columns

**Previous Error:** `column workout_exercises_1.section does not exist`

**Why it happened:** Code tried to fetch a column that doesn't exist in database

**Current Status:** ✅ Fixed in `lib/api.ts` - no longer requesting `section` column

**Prevention:** Always check your database schema before writing API calls

---

## 6. ⚠️ ISSUE: Profile Table Name Mismatch

**Previous Error:** `Could not find the table 'public.user_profiles'`

**Why:** Code was looking for `user_profiles` but table is named `profiles`

**Current Status:** ✅ Fixed - using correct table name `profiles`

---

## 7. ⚠️ MISSING: Health App Integration

You mentioned showing calories burned from Apple/Samsung Health.

**Current Status:** NOT IMPLEMENTED

**To implement:**
- iOS: Use HealthKit via `expo-health`
- Android: Use Google Fit via React Native Health Connect
- Store permission status
- Fetch workout metrics after completion
- Display in summary screen

**Note:** This is OPTIONAL for MVP launch

---

## 8. ⚠️ MISSING: Video Player in Workout View

Your requirements mention video demonstrations during workouts.

**Current State:** Exercises have `imageUrl` but NO `videoUrl`

**Options:**
1. **Add video URLs to database** (recommended)
   ```sql
   ALTER TABLE exercises ADD COLUMN video_url TEXT;
   ```
   Then update exercises with YouTube/Vimeo URLs

2. **Use existing images** and add videos later

3. **Embed YouTube videos** using `react-native-youtube-iframe`

---

## 9. 🐛 POTENTIAL ISSUES

### A. First-time user has no profile
**What happens:** User signs up, but profile doesn't exist yet  
**Fix:** Need a database trigger or Cloud Function to create profile on signup

**Supabase Trigger:**
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, current_level)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'name',
    'Level 1 - Beginner'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### B. No error boundaries
**What happens:** If any component crashes, whole app crashes  
**Fix:** Add error boundaries in key places

### C. No offline support
**What happens:** App breaks without internet  
**Fix:** Add offline detection and show friendly message

### D. No loading states
**What happens:** User sees blank screens while data loads  
**Fix:** Add loading spinners/skeletons

---

## 10. 📱 NOT TESTED ON REAL DEVICES

**Current Testing:** Only web preview  
**Issue:** Mobile-specific bugs won't be caught

**Before Launch:**
- Test on iPhone (use QR code from dev server)
- Test on Android (use QR code from dev server)
- Test gestures, scrolling, keyboard behavior
- Test on different screen sizes

---

## 11. 🎨 MISSING APP STORE ASSETS

Can't submit without these:

### Required for iOS:
- App icon 1024×1024 (you have icon.png but verify dimensions)
- Screenshots for iPhone (6.5", 6.7", 5.5" displays)
- App description (up to 4000 chars)
- Keywords
- Privacy policy URL
- Support URL
- Age rating
- App category

### Required for Android:
- App icon 512×512
- Feature graphic 1024×500
- Screenshots (phone & tablet)
- Short description (80 chars)
- Full description (4000 chars)
- Privacy policy URL
- Content rating

---

## 🚨 SHOW STOPPERS (Can't launch without these)

1. ❌ **completed_workouts table** - Progress won't save
2. ❌ **Workout timer screens** - Core feature missing
3. ❌ **Boss fight locking** - Gamification broken
4. ❌ **App store assets** - Can't submit
5. ❌ **Real device testing** - Might have crashes

---

## ✅ WORKING CORRECTLY

1. ✅ Database connection (Supabase)
2. ✅ Authentication (sign up/sign in/session)
3. ✅ Exercise library
4. ✅ Workout library
5. ✅ Navigation
6. ✅ UI/UX design
7. ✅ Type safety (TypeScript)

---

## 🎯 PRIORITY FIXES (In Order)

### Must Do (P0):
1. Create `completed_workouts` table
2. Add completion API functions
3. Build workout timer screens
4. Lock boss fights
5. Test on real devices

### Should Do (P1):
6. Add profile creation trigger
7. Add error boundaries
8. Add loading states
9. Create app store assets
10. Write privacy policy

### Nice to Have (P2):
11. Health app integration
12. Offline support
13. Video player for exercises
14. Workout history view
15. Statistics dashboard

---

*This app is ~60% complete. Main structure is solid, but missing critical features for launch.*
