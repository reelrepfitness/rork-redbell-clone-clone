import { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchExercises, fetchWorkouts } from '@/lib/api';
import { Exercise, Workout } from '@/types';
import { EXERCISES as MOCK_EXERCISES, WORKOUTS as MOCK_WORKOUTS } from '@/mocks/data';

type DataContextType = {
  exercises: Exercise[];
  workouts: Workout[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const exercisesQuery = useQuery({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
    staleTime: 1000 * 60 * 5,
  });

  const workoutsQuery = useQuery({
    queryKey: ['workouts'],
    queryFn: () => fetchWorkouts(),
    staleTime: 1000 * 60 * 5,
  });

  const { refetch: refetchExercises } = exercisesQuery;
  const { refetch: refetchWorkouts } = workoutsQuery;

  const exercises = exercisesQuery.data && exercisesQuery.data.length > 0 
    ? exercisesQuery.data 
    : MOCK_EXERCISES;

  const workouts = workoutsQuery.data && workoutsQuery.data.length > 0 
    ? workoutsQuery.data 
    : MOCK_WORKOUTS;

  const isLoading = exercisesQuery.isLoading || workoutsQuery.isLoading;
  const error = exercisesQuery.error || workoutsQuery.error;

  const refetch = useCallback(() => {
    refetchExercises();
    refetchWorkouts();
  }, [refetchExercises, refetchWorkouts]);

  console.log('[DataContext] Loaded:', {
    exercises: exercises.length,
    workouts: workouts.length,
    isLoading,
    hasError: !!error,
  });

  const value = useMemo(
    () => ({ exercises, workouts, isLoading, error, refetch }),
    [exercises, workouts, isLoading, error, refetch]
  );

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
