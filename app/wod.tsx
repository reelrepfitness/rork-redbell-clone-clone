import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Flame,
  Clock,
  Repeat,
  Target,
  CheckSquare,
  AlertCircle,
  ArrowLeft,
  Timer,
  Zap,
  Activity,
} from "lucide-react-native";
import Colors from "@/constants/colors";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/context/ProgressContext";
import { WORKOUTS, EXERCISES } from "@/mocks/data";

const formatIcons: Record<string, React.ReactNode> = {
  "Warm-up": <Flame color={Colors.light.warning} size={20} />,
  Finisher: <Zap color={Colors.light.tint} size={20} />,
  Circuit: <Repeat color={Colors.light.tint} size={20} />,
  Ladder: <Activity color={Colors.light.tint} size={20} />,
};

const getFormatIcon = (format: string) => {
  const key = Object.keys(formatIcons).find((k) => format.includes(k));
  if (key) return formatIcons[key];
  if (format.includes("EMOM")) return <Timer color={Colors.light.tint} size={20} />;
  if (format.includes("AMRAP")) return <Activity color={Colors.light.tint} size={20} />;
  return <Repeat color={Colors.light.tint} size={20} />;
};

export default function WodScreen() {
  const router = useRouter();
  const { profile } = useAuth();
  const { progressLogs } = useProgress();

  const currentLevel = profile?.current_level || "Level 1 - Beginner";
  const displayLevelName = currentLevel.replace(/^Level \d+ - /, "");

  const levelWorkouts = WORKOUTS.filter(w => w.levelId === 'level-1');

  const currentWorkout = useMemo(() => {
    const completedWorkoutIds = progressLogs
      .filter(log => log.completed)
      .map(log => log.workoutId);

    for (const workout of levelWorkouts) {
      if (!completedWorkoutIds.includes(workout.id)) {
        return workout;
      }
    }

    return levelWorkouts[0] || null;
  }, [progressLogs, levelWorkouts]);

  if (!currentWorkout) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.errorContainer}>
          <AlertCircle color={Colors.light.tint} size={48} />
          <Text style={styles.errorText}>No workout found</Text>
          <Text style={styles.errorSubtext}>
            All workouts completed! Great job!
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft color={Colors.light.text} size={24} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerLabel}>WORKOUT OF THE DAY</Text>
          <Text style={styles.headerTitle}>Day {currentWorkout.day}</Text>
          <Text style={styles.headerSubtitle}>
            {displayLevelName} • Week {currentWorkout.week}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.formatSection}>
          <View style={styles.formatHeader}>
            <View style={styles.formatIconContainer}>
              {getFormatIcon(currentWorkout.format)}
            </View>
            <Text style={styles.formatTitle}>{currentWorkout.format}</Text>
          </View>

          {currentWorkout.exercises.map((exercise, index: number) => {
            const exerciseDetails = EXERCISES.find(e => e.id === exercise.exerciseId);
            if (!exerciseDetails) return null;

            return (
              <View key={exerciseDetails.id} style={styles.exerciseCard}>
                <View style={styles.exerciseHeader}>
                  <View style={styles.exerciseNumberBadge}>
                    <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.exerciseName}>{exerciseDetails.name}</Text>
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
                    <Text style={styles.infoText}>{exerciseDetails.focusPoints.join(', ')}</Text>
                  </View>
                )}

                {exerciseDetails.techniqueChecklist && exerciseDetails.techniqueChecklist.length > 0 && (
                  <View style={styles.infoSection}>
                    <View style={styles.infoHeader}>
                      <CheckSquare color={Colors.light.success} size={14} />
                      <Text style={styles.infoTitle}>Checklist</Text>
                    </View>
                    <Text style={styles.infoText}>{exerciseDetails.techniqueChecklist.join(', ')}</Text>
                  </View>
                )}

                {exerciseDetails.commonErrors && exerciseDetails.commonErrors.length > 0 && (
                  <View style={styles.infoSection}>
                    <View style={styles.infoHeader}>
                      <AlertCircle color={Colors.light.warning} size={14} />
                      <Text style={styles.infoTitle}>Common Errors</Text>
                    </View>
                    <Text style={styles.infoText}>{exerciseDetails.commonErrors.join(', ')}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push(`/workout/${currentWorkout.id}` as any)}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>Start Workout</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221F1F',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(224, 224, 220, 0.3)",
    backgroundColor: Platform.select({
      ios: "rgba(45, 42, 42, 0.5)",
      default: "rgba(45, 42, 42, 0.85)",
    }),
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderWidth: 1,
    borderColor: "rgba(224, 224, 220, 0.3)",
    overflow: "hidden" as const,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(229, 9, 20, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTextContainer: {
    flex: 1,
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: "700" as const,
    color: Colors.light.tint,
    letterSpacing: 1,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800" as const,
    color: Colors.light.text,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    fontWeight: "500" as const,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    fontWeight: "500" as const,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    gap: 12,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.light.text,
    textAlign: "center",
  },
  errorSubtext: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: "center",
    marginBottom: 8,
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
  formatSection: {
    marginBottom: 32,
  },
  formatHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
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
    marginHorizontal: 20,
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
  startButton: {
    marginHorizontal: 20,
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  bottomSpacer: {
    height: 40,
  },
});
