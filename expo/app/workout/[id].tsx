import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Target,
  CheckSquare,
  Repeat,
  Flame,
  Zap,
  Activity,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Video,
  Sparkles,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";
import { useProgress } from "@/context/ProgressContext";
import { useData } from "@/context/DataContext";
import { WorkoutExercise } from "@/types";

const formatIcons: Record<string, React.ReactNode> = {
  "Warm-up": <Flame color={Colors.light.warning} size={20} />,
  Finisher: <Zap color={Colors.light.tint} size={20} />,
  Circuit: <Repeat color={Colors.light.tint} size={20} />,
  Ladder: <Activity color={Colors.light.tint} size={20} />,
  EMOM: <Timer color={Colors.light.tint} size={20} />,
  AMRAP: <Activity color={Colors.light.tint} size={20} />,
  "Skill Work": <Target color={Colors.light.tint} size={20} />,
  Complex: <Repeat color={Colors.light.tint} size={20} />,
};

const getFormatIcon = (format: string) => {
  return formatIcons[format] || <Repeat color={Colors.light.tint} size={20} />;
};

type ExerciseSection = {
  name: string;
  icon: React.ReactNode;
  exercises: WorkoutExercise[];
  color: string;
};

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [isCompleting, setIsCompleting] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { addProgressLog, progressLogs } = useProgress();
  const { workouts: WORKOUTS, exercises: EXERCISES } = useData();

  const workoutId = id as string;
  const workout = WORKOUTS.find(w => w.id === workoutId);

  const isCompleted = progressLogs.some(
    log => log.workoutId === workoutId && log.completed
  );

  const exerciseSections = useMemo<ExerciseSection[]>(() => {
    if (!workout) return [];
    
    const sections: ExerciseSection[] = [];
    const warmupExercises = workout.exercises.filter(e => e.section === 'warmup');
    const mainExercises = workout.exercises.filter(e => !e.section || e.section === 'main');
    const finisherExercises = workout.exercises.filter(e => e.section === 'finisher');

    if (warmupExercises.length > 0) {
      sections.push({
        name: 'Warm-up',
        icon: <Flame color={Colors.light.warning} size={20} />,
        exercises: warmupExercises,
        color: Colors.light.warning,
      });
    }

    if (mainExercises.length > 0) {
      sections.push({
        name: workout.format,
        icon: getFormatIcon(workout.format),
        exercises: mainExercises,
        color: Colors.light.tint,
      });
    }

    if (finisherExercises.length > 0) {
      sections.push({
        name: 'Finisher',
        icon: <Zap color={Colors.light.tint} size={20} />,
        exercises: finisherExercises,
        color: Colors.light.tint,
      });
    }

    return sections;
  }, [workout]);

  const emomExercises = useMemo(() => {
    if (!workout || workout.format !== 'EMOM') return [];
    const mainSection = exerciseSections.find(s => s.name === 'EMOM');
    return mainSection?.exercises || [];
  }, [workout, exerciseSections]);

  const currentEmomExerciseIndex = useMemo(() => {
    if (!workout || workout.format !== 'EMOM' || emomExercises.length === 0) return 0;
    return (currentRound - 1) % emomExercises.length;
  }, [workout, currentRound, emomExercises]);

  const nextEmomExerciseIndex = useMemo(() => {
    if (!workout || workout.format !== 'EMOM' || emomExercises.length === 0) return null;
    const nextIndex = currentEmomExerciseIndex + 1;
    if (nextIndex >= emomExercises.length) return null;
    return nextIndex;
  }, [workout, currentEmomExerciseIndex, emomExercises]);

  const secondsInCurrentRound = useMemo(() => {
    if (!workout || workout.format !== 'EMOM') return 0;
    const timePerRound = workout.formatDetails?.timePerRound || 60;
    return timeRemaining % timePerRound;
  }, [workout, timeRemaining]);

  useEffect(() => {
    if (workout && hasStarted) {
      const isTimeBased = workout.format === 'EMOM' || workout.format === 'AMRAP';
      if (isTimeBased && workout.formatDetails?.totalTime) {
        setTimeRemaining(workout.formatDetails.totalTime);
      }
    }
  }, [hasStarted, workout]);

  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            if (Platform.OS !== 'web') {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }
            Alert.alert('Time\'s Up!', 'Great work! You finished the workout.');
            return 0;
          }
          
          if (workout?.format === 'EMOM') {
            const timePerRound = workout.formatDetails?.timePerRound || 60;
            if (prev % timePerRound === 0) {
              if (Platform.OS !== 'web') {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
              }
              setCurrentRound(r => r + 1);
            }
          }
          
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isTimerRunning, timeRemaining, workout]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setIsTimerRunning(false);
    setCurrentRound(1);
    if (workout?.formatDetails?.totalTime) {
      setTimeRemaining(workout.formatDetails.totalTime);
    }
  };

  if (!workout) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Workout Not Found" }} />
        <View style={styles.errorContainer}>
          <AlertCircle color={Colors.light.tint} size={48} />
          <Text style={styles.errorText}>Workout not found</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const handleComplete = async () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    setIsCompleting(true);

    try {
      await addProgressLog({
        userId: "user-1",
        workoutId: workout.id,
        date: new Date().toISOString(),
        completed: true,
        duration: workout.duration,
        exercises: [],
      });

      Alert.alert(
        "Workout Complete! 🎉",
        "Great job! Your progress has been saved.",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          }
        ]
      );
    } catch (error) {
      console.error("Error completing workout:", error);
      Alert.alert(
        "Error",
        "Failed to save your progress. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: workout.title }} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {!hasStarted ? (
          <>
            <View style={styles.header}>
              <View style={styles.headerBadges}>
                <View style={styles.dayBadge}>
                  <Text style={styles.dayText}>Week {workout.week}</Text>
                </View>
                <View style={styles.durationBadge}>
                  <Clock color={Colors.light.textSecondary} size={14} />
                  <Text style={styles.durationText}>{workout.duration} min</Text>
                </View>
              </View>
              <Text style={styles.workoutTitle}>{workout.title}</Text>
              <Text style={styles.workoutDescription}>Day {workout.day}</Text>
            </View>

            <View style={styles.briefSection}>
              <Text style={styles.briefTitle}>Workout Brief</Text>
              <View style={styles.briefItem}>
                <View style={styles.formatBadge}>
                  {getFormatIcon(workout.format)}
                  <Text style={styles.formatBadgeText}>{workout.format}</Text>
                </View>
              </View>
              <Text style={styles.briefText}>{workout.description}</Text>
              {workout.formatDetails && (
                <View style={styles.briefDetailsContainer}>
                  {workout.format === 'EMOM' && workout.formatDetails.rounds && (
                    <Text style={styles.briefDetailText}>• {workout.formatDetails.rounds} rounds, {workout.formatDetails.timePerRound}s per round</Text>
                  )}
                  {workout.format === 'AMRAP' && workout.formatDetails.totalTime && (
                    <Text style={styles.briefDetailText}>• Complete as many rounds as possible in {workout.formatDetails.totalTime / 60} minutes</Text>
                  )}
                  {workout.format === 'Circuit' && workout.formatDetails.rounds && (
                    <Text style={styles.briefDetailText}>• {workout.formatDetails.rounds} rounds with {workout.formatDetails.restBetweenRounds}s rest between rounds</Text>
                  )}
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.beginButton}
              activeOpacity={0.8}
              onPress={() => {
                if (Platform.OS !== 'web') {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }
                setHasStarted(true);
              }}
            >
              <Play color="#FFFFFF" size={24} fill="#FFFFFF" />
              <Text style={styles.beginButtonText}>Begin Workout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.header}>
              <View style={styles.headerBadges}>
                <View style={styles.dayBadge}>
                  <Text style={styles.dayText}>Week {workout.week}</Text>
                </View>
                <View style={styles.durationBadge}>
                  <Clock color={Colors.light.textSecondary} size={14} />
                  <Text style={styles.durationText}>{workout.duration} min</Text>
                </View>
              </View>
              <Text style={styles.workoutTitle}>{workout.title}</Text>
              <Text style={styles.workoutDescription}>Day {workout.day}</Text>
            </View>

            {(workout.format === 'EMOM' || workout.format === 'AMRAP') && workout.formatDetails?.totalTime && (
              <View style={styles.timerSection}>
                {workout.format === 'EMOM' ? (
                  <>
                    <Text style={styles.timerLabel}>Round {currentRound}</Text>
                    <Text style={styles.timerDisplay}>{formatTime(secondsInCurrentRound || timeRemaining)}</Text>
                    
                    {emomExercises.length > 0 && (
                      <View style={styles.emomExerciseInfo}>
                        <View style={styles.currentExerciseCard}>
                          <Text style={styles.emomLabel}>CURRENT</Text>
                          {(() => {
                            const exercise = emomExercises[currentEmomExerciseIndex];
                            const exerciseDetails = EXERCISES.find(e => e.id === exercise?.exerciseId);
                            return (
                              <>
                                <Text style={styles.emomExerciseName}>{exerciseDetails?.name || 'Exercise'}</Text>
                                <Text style={styles.emomExerciseReps}>
                                  {exercise?.reps} reps {exercise?.sets && `× ${exercise.sets} sets`}
                                </Text>
                              </>
                            );
                          })()}
                        </View>

                        {nextEmomExerciseIndex !== null && (
                          <View style={styles.nextExerciseCard}>
                            <Text style={styles.emomLabelNext}>UP NEXT</Text>
                            {(() => {
                              const exercise = emomExercises[nextEmomExerciseIndex];
                              const exerciseDetails = EXERCISES.find(e => e.id === exercise?.exerciseId);
                              return (
                                <>
                                  <Text style={styles.emomExerciseNameNext}>{exerciseDetails?.name || 'Exercise'}</Text>
                                  <Text style={styles.emomExerciseRepsNext}>
                                    {exercise?.reps} reps {exercise?.sets && `× ${exercise.sets} sets`}
                                  </Text>
                                </>
                              );
                            })()}
                          </View>
                        )}
                      </View>
                    )}
                  </>
                ) : (
                  <>
                    <Text style={styles.timerLabel}>Time Remaining</Text>
                    <Text style={styles.timerDisplay}>{formatTime(timeRemaining)}</Text>
                  </>
                )}
                
                <View style={styles.timerControls}>
                  <TouchableOpacity
                    style={styles.timerButton}
                    onPress={toggleTimer}
                    activeOpacity={0.7}
                  >
                    {isTimerRunning ? (
                      <Pause color="#FFFFFF" size={24} />
                    ) : (
                      <Play color="#FFFFFF" size={24} fill="#FFFFFF" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.timerButton, styles.timerButtonSecondary]}
                    onPress={resetTimer}
                    activeOpacity={0.7}
                  >
                    <RotateCcw color={Colors.light.tint} size={24} />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {exerciseSections.map((section, sectionIndex) => (
              <View key={sectionIndex} style={styles.formatSection}>
                <View style={styles.formatHeader}>
                  <View style={[
                    styles.formatIconContainer,
                    section.name === 'Warm-up' && styles.warmupIconContainer,
                    section.name === 'Finisher' && styles.finisherIconContainer
                  ]}>
                    {section.icon}
                  </View>
                  <Text style={styles.formatTitle}>{section.name}</Text>
                </View>

                {section.exercises.map((exercise, index: number) => {
                  const exerciseDetails = EXERCISES.find(e => e.id === exercise.exerciseId);
                  if (!exerciseDetails) return null;

                  return (
                    <View key={exerciseDetails.id} style={styles.exerciseCard}>
                      <View style={styles.exerciseHeader}>
                        <View style={[
                          styles.exerciseNumberBadge,
                          section.name === 'Warm-up' && styles.warmupBadge,
                          section.name === 'Finisher' && styles.finisherBadge
                        ]}>
                          <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                        </View>
                        <Text style={styles.exerciseName}>{exerciseDetails.name}</Text>
                      </View>

                      <View style={styles.videoPlaceholder}>
                        <Video color={Colors.light.textSecondary} size={32} />
                        <Text style={styles.videoPlaceholderText}>Video demonstration coming soon</Text>
                      </View>

                      <View style={styles.exerciseDetailsRow}>
                        {exercise.sets && (
                          <View style={styles.exerciseDetail}>
                            <Repeat color={Colors.light.textSecondary} size={16} />
                            <Text style={styles.exerciseDetailText}>
                              {exercise.sets} sets
                            </Text>
                          </View>
                        )}
                        <View style={styles.exerciseDetail}>
                          <Target color={Colors.light.textSecondary} size={16} />
                          <Text style={styles.exerciseDetailText}>
                            {exercise.reps} reps
                          </Text>
                        </View>
                        {exercise.rest && (
                          <View style={styles.exerciseDetail}>
                            <Clock color={Colors.light.textSecondary} size={16} />
                            <Text style={styles.exerciseDetailText}>
                              {exercise.rest}s rest
                            </Text>
                          </View>
                        )}
                      </View>

                      {exerciseDetails.focusPoints && exerciseDetails.focusPoints.length > 0 && (
                        <View style={styles.infoSection}>
                          <View style={styles.infoHeader}>
                            <Target color={Colors.light.tint} size={14} />
                            <Text style={styles.infoTitle}>Focus Points</Text>
                          </View>
                          {exerciseDetails.focusPoints.map((point, i) => (
                            <View key={i} style={styles.listItem}>
                              <Text style={styles.listBullet}>•</Text>
                              <Text style={styles.listText}>{point}</Text>
                            </View>
                          ))}
                        </View>
                      )}

                      {exerciseDetails.techniqueChecklist && exerciseDetails.techniqueChecklist.length > 0 && (
                        <View style={styles.infoSection}>
                          <View style={styles.infoHeader}>
                            <CheckSquare color={Colors.light.success} size={14} />
                            <Text style={styles.infoTitle}>Technique Checklist</Text>
                          </View>
                          {exerciseDetails.techniqueChecklist.map((item, i) => (
                            <View key={i} style={styles.listItem}>
                              <Text style={styles.listBullet}>•</Text>
                              <Text style={styles.listText}>{item}</Text>
                            </View>
                          ))}
                        </View>
                      )}

                      {exerciseDetails.commonErrors && exerciseDetails.commonErrors.length > 0 && (
                        <View style={styles.infoSection}>
                          <View style={styles.infoHeader}>
                            <AlertCircle color={Colors.light.warning} size={14} />
                            <Text style={styles.infoTitle}>Common Mistakes</Text>
                          </View>
                          {exerciseDetails.commonErrors.map((error, i) => (
                            <View key={i} style={styles.listItem}>
                              <Text style={styles.listBullet}>•</Text>
                              <Text style={styles.listText}>{error}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            ))}

            <TouchableOpacity
              style={[
                styles.completeButton,
                isCompleted && styles.completeButtonCompleted,
                isCompleting && styles.completeButtonDisabled
              ]}
              activeOpacity={0.8}
              onPress={handleComplete}
              disabled={isCompleting || isCompleted}
            >
              {isCompleting ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <>
                  <CheckCircle2 
                    color="#FFFFFF" 
                    size={24} 
                  />
                  <Text style={styles.completeButtonText}>
                    {isCompleted ? "Completed!" : "Mark as Complete"}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221F1F',
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 12,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.light.text,
    textAlign: "center",
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: Colors.light.tint,
    borderRadius: 12,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  headerBadges: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  dayBadge: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    shadowColor: Colors.light.headerHighlight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  dayText: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  durationBadge: {
    backgroundColor: Platform.select({
      ios: "rgba(45, 42, 42, 0.55)",
      default: "rgba(45, 42, 42, 0.9)",
    }),
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(224, 224, 220, 0.35)",
    overflow: "hidden" as const,
  },
  durationText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.light.textSecondary,
  },
  workoutTitle: {
    fontSize: 28,
    fontWeight: "800" as const,
    color: Colors.light.text,
    marginBottom: 8,
  },
  workoutDescription: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    lineHeight: 24,
  },
  formatSection: {
    marginBottom: 32,
  },
  formatHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  formatIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(229, 9, 20, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  warmupIconContainer: {
    backgroundColor: "rgba(251, 191, 36, 0.1)",
  },
  finisherIconContainer: {
    backgroundColor: "rgba(229, 9, 20, 0.1)",
  },
  formatTitle: {
    fontSize: 22,
    fontWeight: "800" as const,
    color: Colors.light.text,
  },
  exerciseCard: {
    backgroundColor: Platform.select({
      ios: "rgba(45, 42, 42, 0.55)",
      default: "rgba(45, 42, 42, 0.9)",
    }),
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(224, 224, 220, 0.35)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
    overflow: "hidden" as const,
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  exerciseNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
  },
  warmupBadge: {
    backgroundColor: Colors.light.warning,
  },
  finisherBadge: {
    backgroundColor: Colors.light.tint,
  },
  exerciseNumberText: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  exerciseName: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.light.text,
  },
  exerciseDetailsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(224, 224, 220, 0.3)",
  },
  exerciseDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  exerciseDetailText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    fontWeight: "500" as const,
  },
  infoSection: {
    marginTop: 12,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: "700" as const,
    color: Colors.light.text,
  },
  infoText: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    lineHeight: 18,
    paddingLeft: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 20,
    marginBottom: 6,
  },
  listBullet: {
    fontSize: 13,
    color: Colors.light.tint,
    marginRight: 8,
    fontWeight: "700" as const,
  },
  listText: {
    flex: 1,
    fontSize: 13,
    color: Colors.light.textSecondary,
    lineHeight: 18,
  },
  videoPlaceholder: {
    backgroundColor: "rgba(224, 224, 220, 0.3)",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(224, 224, 220, 0.5)",
    borderStyle: "dashed" as const,
  },
  videoPlaceholderText: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 8,
    fontStyle: "italic" as const,
  },
  briefSection: {
    backgroundColor: Platform.select({
      ios: "rgba(45, 42, 42, 0.55)",
      default: "rgba(45, 42, 42, 0.9)",
    }),
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(224, 224, 220, 0.35)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
    overflow: "hidden" as const,
  },
  formatBadge: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 8,
    backgroundColor: "rgba(229, 9, 20, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start" as const,
  },
  formatBadgeText: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: Colors.light.tint,
  },
  briefDetailsContainer: {
    marginTop: 12,
    gap: 6,
  },
  briefDetailText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
  briefTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.light.text,
    marginBottom: 12,
  },
  briefText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  briefItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  briefLabel: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.light.text,
    marginLeft: 8,
  },
  briefValue: {
    flex: 1,
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  beginButton: {
    backgroundColor: Colors.light.tint,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 12,
    marginBottom: 24,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  beginButtonText: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  timerSection: {
    backgroundColor: Platform.select({
      ios: "rgba(45, 42, 42, 0.55)",
      default: "rgba(45, 42, 42, 0.9)",
    }),
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(224, 224, 220, 0.35)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
    overflow: "hidden" as const,
  },
  timerLabel: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.light.textSecondary,
    marginBottom: 8,
    textTransform: "uppercase" as const,
    letterSpacing: 1,
  },
  timerDisplay: {
    fontSize: 56,
    fontWeight: "800" as const,
    color: Colors.light.text,
    marginBottom: 20,
    fontVariant: ["tabular-nums"] as any,
  },
  emomExerciseInfo: {
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  currentExerciseCard: {
    backgroundColor: "rgba(229, 9, 20, 0.15)",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.tint,
  },
  emomLabel: {
    fontSize: 11,
    fontWeight: "700" as const,
    color: Colors.light.tint,
    letterSpacing: 1,
    marginBottom: 8,
  },
  emomExerciseName: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.light.text,
    marginBottom: 4,
  },
  emomExerciseReps: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    fontWeight: "600" as const,
  },
  nextExerciseCard: {
    backgroundColor: "rgba(224, 224, 220, 0.1)",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(224, 224, 220, 0.3)",
  },
  emomLabelNext: {
    fontSize: 10,
    fontWeight: "700" as const,
    color: Colors.light.textSecondary,
    letterSpacing: 1,
    marginBottom: 6,
  },
  emomExerciseNameNext: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.light.text,
    marginBottom: 2,
  },
  emomExerciseRepsNext: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  timerControls: {
    flexDirection: "row",
    gap: 16,
  },
  timerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  timerButtonSecondary: {
    backgroundColor: "rgba(229, 9, 20, 0.1)",
    shadowColor: "transparent",
  },
  completeButton: {
    backgroundColor: Colors.light.tint,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 12,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  completeButtonCompleted: {
    backgroundColor: Colors.light.success,
    shadowColor: Colors.light.success,
  },
  completeButtonDisabled: {
    opacity: 0.6,
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  bottomSpacer: {
    height: 40,
  },
});
