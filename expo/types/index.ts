export type Level = {
  id: string;
  name: string;
  difficulty: number;
  description: string;
  duration: string;
  locked: boolean;
  price?: number;
  imageUrl?: string;
  totalWeeks: number;
};

export type WorkoutFormat = 'EMOM' | 'AMRAP' | 'Complex' | 'Circuit' | 'Skill Work';

export type ExerciseCategory = 'Hinge' | 'Squat' | 'Press' | 'Pull' | 'Carry' | 'Core' | 'Flow';

export type Exercise = {
  id: string;
  name: string;
  category: ExerciseCategory;
  focusPoints: string[];
  techniqueChecklist: string[];
  commonErrors: string[];
  alternatives: string[];
  videoUrl?: string;
  imageUrl?: string;
  description: string;
};

export type WorkoutExercise = {
  exerciseId: string;
  sets?: number;
  reps?: number | string;
  duration?: number;
  rest?: number;
  weight?: string;
  notes?: string;
  section?: 'warmup' | 'main' | 'finisher';
};

export type Workout = {
  id: string;
  levelId: string;
  week: number;
  day: number;
  title: string;
  format: WorkoutFormat;
  duration: number;
  exercises: WorkoutExercise[];
  description: string;
  warmup?: string;
  cooldown?: string;
  isBossFight?: boolean;
  requiresCompletion?: boolean;
  formatDetails?: {
    rounds?: number;
    timePerRound?: number;
    totalTime?: number;
    restBetweenRounds?: number;
  };
};

export type ProgressLog = {
  id: string;
  userId: string;
  workoutId: string;
  date: string;
  completed: boolean;
  duration?: number;
  exercises: {
    exerciseId: string;
    weight?: number;
    reps?: number;
    rounds?: number;
    time?: number;
    notes?: string;
  }[];
  overallNotes?: string;
  rating?: number;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  currentLevel: string;
  unlockedLevels: string[];
  stats: {
    totalWorkouts: number;
    currentStreak: number;
    longestStreak: number;
  };
};

export type WeekProgress = {
  levelId: string;
  week: number;
  completedWorkouts: string[];
  totalWorkouts: number;
  isCompleted: boolean;
};
