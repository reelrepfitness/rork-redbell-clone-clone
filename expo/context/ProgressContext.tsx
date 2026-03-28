import { useState, useEffect, useCallback, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createContextHook from "@nkzw/create-context-hook";
import { ProgressLog, WeekProgress } from "@/types";
import { WORKOUTS } from "@/mocks/data";

const STORAGE_KEY = "@kettlebell_progress";

export const [ProgressProvider, useProgress] = createContextHook(() => {
  const [progressLogs, setProgressLogs] = useState<ProgressLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadProgressLogs();
  }, []);

  const loadProgressLogs = async (): Promise<void> => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ProgressLog[];
        setProgressLogs(parsed);
      }
    } catch (error) {
      console.error("Failed to load progress logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProgressLog = useCallback(
    async (log: Omit<ProgressLog, "id">): Promise<void> => {
      try {
        const newLog: ProgressLog = {
          ...log,
          id: `log-${Date.now()}`,
        };
        const updatedLogs = [...progressLogs, newLog];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
        setProgressLogs(updatedLogs);
        console.log("Progress log added:", newLog);
      } catch (error) {
        console.error("Failed to add progress log:", error);
      }
    },
    [progressLogs]
  );

  const getWorkoutLogs = useCallback(
    (workoutId: string): ProgressLog[] => {
      return progressLogs.filter((log) => log.workoutId === workoutId);
    },
    [progressLogs]
  );

  const getRecentLogs = useCallback(
    (limit: number = 10): ProgressLog[] => {
      return [...progressLogs]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
    },
    [progressLogs]
  );

  const getTotalCompletedWorkouts = useCallback((): number => {
    return progressLogs.filter((log) => log.completed).length;
  }, [progressLogs]);

  const getCurrentStreak = useCallback((): number => {
    if (progressLogs.length === 0) return 0;

    const sortedLogs = [...progressLogs]
      .filter((log) => log.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const log of sortedLogs) {
      const logDate = new Date(log.date);
      logDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor(
        (currentDate.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff === streak) {
        streak++;
      } else if (daysDiff > streak) {
        break;
      }
    }

    return streak;
  }, [progressLogs]);

  const getWeekProgress = useCallback(
    (levelId: string, week: number): WeekProgress => {
      const weekWorkouts = WORKOUTS.filter(
        (w) => w.levelId === levelId && w.week === week && !w.isBossFight
      );
      const completedWorkoutIds = progressLogs
        .filter((log) => log.completed)
        .map((log) => log.workoutId);
      const completedInWeek = weekWorkouts.filter((w) => completedWorkoutIds.includes(w.id));

      return {
        levelId,
        week,
        completedWorkouts: completedInWeek.map((w) => w.id),
        totalWorkouts: weekWorkouts.length,
        isCompleted: completedInWeek.length === weekWorkouts.length && weekWorkouts.length > 0,
      };
    },
    [progressLogs]
  );

  const isBossFightUnlocked = useCallback(
    (levelId: string, week: number): boolean => {
      const weekProgress = getWeekProgress(levelId, week);
      return weekProgress.isCompleted;
    },
    [getWeekProgress]
  );

  return useMemo(
    () => ({
      progressLogs,
      isLoading,
      addProgressLog,
      getWorkoutLogs,
      getRecentLogs,
      getTotalCompletedWorkouts,
      getCurrentStreak,
      getWeekProgress,
      isBossFightUnlocked,
    }),
    [
      progressLogs,
      isLoading,
      addProgressLog,
      getWorkoutLogs,
      getRecentLogs,
      getTotalCompletedWorkouts,
      getCurrentStreak,
      getWeekProgress,
      isBossFightUnlocked,
    ]
  );
});
