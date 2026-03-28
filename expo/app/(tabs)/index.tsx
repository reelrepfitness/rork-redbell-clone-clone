import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

import { Flame, Award, TrendingUp, Play, ChevronRight, Clock, CheckCircle2, Lock, Activity } from "lucide-react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import { useProgress } from "@/context/ProgressContext";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";

const { width } = Dimensions.get("window");

type WorkoutWithCompletion = {
  id: string;
  title: string;
  day: string;
  duration: number;
  formatGroups: any;
  isCompleted: boolean;
};

type WeekData = {
  week: number;
  workouts: WorkoutWithCompletion[];
  completedCount: number;
  totalCount: number;
  isCompleted: boolean;
};

function FitnessIntegrationCard() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const deviceName = Platform.OS === 'ios' ? 'Apple Health' : Platform.OS === 'android' ? 'Health Connect' : 'Fitness App';
  
  const healthIconUrl = Platform.OS === 'ios'
    ? 'https://res.cloudinary.com/diwe4xzro/image/upload/v1761924125/FAASD_egzvdr.webp'
    : Platform.OS === 'android'
    ? 'https://res.cloudinary.com/diwe4xzro/image/upload/v1761930385/afasfa_fdg7kg.webp'
    : null;

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  return (
    <View style={[styles.fitnessCard, isConnected && styles.fitnessCardConnected]}>
      <View style={styles.fitnessHeader}>
        {healthIconUrl ? (
          <Image source={{ uri: healthIconUrl }} style={styles.healthIcon} />
        ) : (
          <Activity color={isConnected ? Colors.light.success : Colors.light.tint} size={24} />
        )}
        <Text style={styles.fitnessTitle}>
          {isConnected ? `Connected to ${deviceName}` : 'Fitness Integration'}
        </Text>
      </View>
      {!isConnected ? (
        <>
          <Text style={styles.fitnessSubtitle}>
            Connect your {deviceName} to sync your workouts and track your progress
          </Text>
          <TouchableOpacity 
            style={styles.connectButton}
            onPress={handleConnect}
            activeOpacity={0.8}
          >
            <Text style={styles.connectButtonText}>Connect {deviceName}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.connectedStats}>
            <View style={styles.connectedStatItem}>
              <Text style={styles.connectedStatValue}>1,247</Text>
              <Text style={styles.connectedStatLabel}>Calories Today</Text>
            </View>
            <View style={styles.connectedStatDivider} />
            <View style={styles.connectedStatItem}>
              <Text style={styles.connectedStatValue}>8,432</Text>
              <Text style={styles.connectedStatLabel}>Steps Today</Text>
            </View>
            <View style={styles.connectedStatDivider} />
            <View style={styles.connectedStatItem}>
              <Text style={styles.connectedStatValue}>32</Text>
              <Text style={styles.connectedStatLabel}>Active Min</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.connectButton, styles.disconnectButton]}
            onPress={handleConnect}
            activeOpacity={0.8}
          >
            <Text style={[styles.connectButtonText, styles.disconnectButtonText]}>Disconnect</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

function ProgramsContent() {
  const router = useRouter();
  const { profile } = useAuth();
  const { progressLogs } = useProgress();
  const { workouts: WORKOUTS } = useData();
  
  const currentLevel = profile?.current_level || "Level 1 - Beginner";
  const displayLevelName = currentLevel.replace(/^Level \d+ - /, "");

  const completedWorkoutIds = useMemo(() => {
    const completedLogs = progressLogs.filter(log => log.completed);
    return completedLogs.map(log => log.workoutId);
  }, [progressLogs]);

  const weeks: WeekData[] = useMemo(() => {
    const levelWorkouts = WORKOUTS.filter(w => 
      w.levelId === 'level-1' && !w.isBossFight
    );

    const weekNumbers = [...new Set(levelWorkouts.map(w => w.week))].sort();
    
    return weekNumbers.map(weekNum => {
      const weekWorkouts = levelWorkouts.filter(w => w.week === weekNum);
      
      const workoutsWithCompletion: WorkoutWithCompletion[] = weekWorkouts.map(w => ({
        id: w.id,
        title: w.title,
        day: `Day ${w.day}`,
        duration: w.duration,
        formatGroups: { [w.format]: w.exercises },
        isCompleted: completedWorkoutIds.includes(w.id),
      }));

      const completedCount = workoutsWithCompletion.filter(w => w.isCompleted).length;
      
      return {
        week: weekNum,
        workouts: workoutsWithCompletion,
        completedCount,
        totalCount: workoutsWithCompletion.length,
        isCompleted: completedCount === workoutsWithCompletion.length && workoutsWithCompletion.length > 0,
      };
    });
  }, [WORKOUTS, completedWorkoutIds]);

  const isWeekLocked = (weekIndex: number): boolean => {
    if (weekIndex === 0) return false;
    const previousWeek = weeks[weekIndex - 1];
    return !previousWeek?.isCompleted;
  };

  const bossFights = useMemo(() => {
    const bossWorkouts = WORKOUTS.filter(w => 
      w.levelId === 'level-1' && w.isBossFight
    );

    return bossWorkouts.map(w => ({
      id: w.id,
      title: w.title,
      day: `Boss Fight`,
      duration: w.duration,
      formatGroups: { [w.format]: w.exercises },
      isCompleted: completedWorkoutIds.includes(w.id),
      requiresCompletion: w.requiresCompletion,
      description: w.description,
    }));
  }, [WORKOUTS, completedWorkoutIds]);

  return (
    <View>
      {weeks.map((weekData, weekIndex) => {
        const progressPercent = weekData.totalCount > 0 
          ? (weekData.completedCount / weekData.totalCount) * 100 
          : 0;
        const locked = isWeekLocked(weekIndex);

        return (
          <View 
            key={weekData.week} 
            style={[
              styles.weekSection,
              locked && styles.weekSectionLocked
            ]}
          >
            <View style={styles.weekHeader}>
              <View style={styles.weekHeaderLeft}>
                {locked && (
                  <View style={styles.lockIcon}>
                    <Lock color={Colors.light.textSecondary} size={20} />
                  </View>
                )}
                <View>
                  <Text style={[
                    styles.weekTitle,
                    locked && styles.weekTitleLocked
                  ]}>
                    Week {weekData.week}
                  </Text>
                  <Text style={styles.weekSubtitle}>
                    {weekData.completedCount}/{weekData.totalCount} completed
                  </Text>
                </View>
              </View>
              {weekData.isCompleted && (
                <CheckCircle2 color="#10B981" size={24} />
              )}
            </View>

            {weekData.totalCount > 0 && (
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
                </View>
                <Text style={styles.progressText}>{Math.round(progressPercent)}%</Text>
              </View>
            )}

            {weekData.workouts.map((workout) => (
              <TouchableOpacity
                key={workout.id}
                style={[
                  styles.workoutCard,
                  locked && styles.workoutCardLocked
                ]}
                onPress={() => {
                  if (!locked) {
                    router.push(`/workout/${workout.id}` as any);
                  }
                }}
                activeOpacity={locked ? 1 : 0.7}
                disabled={locked}
              >
                <View style={styles.workoutHeader}>
                  <View style={styles.workoutDayBadge}>
                    <Text style={styles.workoutDayText}>
                      {workout.day}
                    </Text>
                  </View>
                  {workout.isCompleted && (
                    <View style={styles.completedBadge}>
                      <CheckCircle2 color={Colors.light.success} size={16} />
                    </View>
                  )}
                  {locked && (
                    <View style={styles.lockedBadge}>
                      <Lock color={Colors.light.textSecondary} size={14} />
                    </View>
                  )}
                </View>

                <Text style={[
                  styles.workoutTitle,
                  locked && styles.workoutTitleLocked
                ]}>
                  {workout.title}
                </Text>
                <Text 
                  style={[
                    styles.workoutDesc,
                    locked && styles.workoutDescLocked
                  ]} 
                  numberOfLines={2}
                >
                  {locked 
                    ? "Complete previous week to unlock" 
                    : `${Object.keys(workout.formatGroups).length} exercise groups`}
                </Text>

                <View style={styles.workoutFooter}>
                  <View style={styles.workoutMeta}>
                    <Clock color={locked ? Colors.light.textSecondary : Colors.light.tint} size={14} />
                    <Text style={[
                      styles.workoutMetaText,
                      !locked && styles.workoutMetaTextActive
                    ]}>
                      {workout.duration} min
                    </Text>
                  </View>
                  {!locked && <ChevronRight color={Colors.light.tint} size={20} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
      })}

      {bossFights.length > 0 && (
        <View style={styles.weekSection}>
          <View style={styles.weekHeader}>
            <View style={styles.weekHeaderLeft}>
              <View>
                <Text style={styles.weekTitle}>Boss Fights</Text>
                <Text style={styles.weekSubtitle}>
                  Ultimate challenges to test your skills
                </Text>
              </View>
            </View>
          </View>

          {bossFights.map((workout) => {
            const allWeeksCompleted = weeks.every(w => w.isCompleted);
            const locked = !allWeeksCompleted;

            return (
              <TouchableOpacity
                key={workout.id}
                style={[
                  styles.workoutCard,
                  styles.bossFightCard,
                  locked && styles.workoutCardLocked
                ]}
                onPress={() => {
                  if (!locked) {
                    router.push(`/workout/${workout.id}` as any);
                  }
                }}
                activeOpacity={locked ? 1 : 0.7}
                disabled={locked}
              >
                <View style={styles.workoutHeader}>
                  <View style={styles.bossFightBadge}>
                    <Text style={styles.bossFightBadgeText}>
                      {workout.day}
                    </Text>
                  </View>
                  {workout.isCompleted && (
                    <View style={styles.completedBadge}>
                      <CheckCircle2 color={Colors.light.success} size={16} />
                    </View>
                  )}
                  {locked && (
                    <View style={styles.lockedBadge}>
                      <Lock color={Colors.light.textSecondary} size={14} />
                    </View>
                  )}
                </View>

                <Text style={[
                  styles.workoutTitle,
                  styles.bossFightTitle,
                  locked && styles.workoutTitleLocked
                ]}>
                  {workout.title}
                </Text>
                <Text 
                  style={[
                    styles.workoutDesc,
                    locked && styles.workoutDescLocked
                  ]} 
                  numberOfLines={2}
                >
                  {locked 
                    ? "Complete all weeks to unlock" 
                    : workout.description}
                </Text>

                <View style={styles.workoutFooter}>
                  <View style={styles.workoutMeta}>
                    <Clock color={locked ? Colors.light.textSecondary : "#DC2626"} size={14} />
                    <Text style={[
                      styles.workoutMetaText,
                      !locked && styles.bossFightMetaText
                    ]}>
                      {workout.duration} min
                    </Text>
                  </View>
                  {!locked && <ChevronRight color="#DC2626" size={20} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {weeks.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            No workouts available for this level yet.
          </Text>
        </View>
      )}
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { getTotalCompletedWorkouts, getCurrentStreak } = useProgress();
  const { profile } = useAuth();
  const { workouts: WORKOUTS } = useData();

  const totalWorkouts = getTotalCompletedWorkouts();
  const currentStreak = getCurrentStreak();
  const longestStreak = Math.max(currentStreak, 0);

  const currentLevel = profile?.current_level || "Level 1 - Beginner";
  const displayLevelName = currentLevel.replace(/^Level \d+ - /, "");

  const hasCompletedWorkouts = totalWorkouts > 0;

  return (
    <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.name}>{profile?.name || "User"}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Flame color={Colors.light.warning} size={24} />
            </View>
            <Text style={styles.statValue}>{currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Award color={Colors.light.success} size={24} />
            </View>
            <Text style={styles.statValue}>{totalWorkouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <TrendingUp color={Colors.light.tint} size={24} />
            </View>
            <Text style={styles.statValue}>{longestStreak}</Text>
            <Text style={styles.statLabel}>Best Streak</Text>
          </View>
        </View>

        <FitnessIntegrationCard />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Level</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.currentLevelCard,
            !hasCompletedWorkouts && styles.currentLevelCardLocked
          ]}
          onPress={() => {
            if (hasCompletedWorkouts) {
              router.push("/wod");
            }
          }}
          activeOpacity={hasCompletedWorkouts ? 0.8 : 1}
          disabled={!hasCompletedWorkouts}
        >
          <View style={styles.currentLevelContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.currentLevelLabel}>CURRENT LEVEL</Text>
              <Text style={[
                styles.currentLevelName,
                !hasCompletedWorkouts && styles.currentLevelNameLocked
              ]}>
                {displayLevelName}
              </Text>
              <Text style={[
                styles.currentLevelDesc,
                !hasCompletedWorkouts && styles.currentLevelDescLocked
              ]}>
                {hasCompletedWorkouts 
                  ? "Tap to view today's workout"
                  : "Complete your first workout to unlock"}
              </Text>
            </View>
            <View style={styles.continueButtonContainer}>
              {!hasCompletedWorkouts ? (
                <View style={styles.lockIconLarge}>
                  <Lock color={Colors.light.textSecondary} size={24} />
                </View>
              ) : (
                <>
                  <Text style={styles.wodLabel}>WOD</Text>
                  <View style={styles.continueButton}>
                    <Play color={Colors.light.tint} size={24} fill={Colors.light.tint} />
                  </View>
                </>
              )}
            </View>
          </View>
        </TouchableOpacity>

        <ProgramsContent />

            <View style={styles.bottomSpacer} />
          </ScrollView>
        </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221F1F',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  name: {
    fontSize: 32,
    fontWeight: "800" as const,
    color: Colors.light.text,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Platform.select({
      ios: "rgba(45, 42, 42, 0.5)",
      default: "rgba(45, 42, 42, 0.85)",
    }),
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(224, 224, 220, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
    overflow: "hidden" as const,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(229, 9, 20, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.light.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
  fitnessCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: Platform.select({
      ios: "rgba(45, 42, 42, 0.5)",
      default: "rgba(45, 42, 42, 0.85)",
    }),
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(224, 224, 220, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
    overflow: "hidden" as const,
  },
  fitnessHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  healthIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    resizeMode: 'contain' as const,
  },
  fitnessTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.light.text,
  },
  fitnessSubtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  connectButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  connectButtonText: {
    fontSize: 15,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.light.text,
  },
  currentLevelCard: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 20,
    overflow: "hidden" as const,
    backgroundColor: Platform.select({
      ios: "rgba(45, 42, 42, 0.5)",
      default: "rgba(45, 42, 42, 0.85)",
    }),
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(224, 224, 220, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  currentLevelContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  currentLevelLabel: {
    fontSize: 12,
    fontWeight: "700" as const,
    color: Colors.light.headerHighlight,
    marginBottom: 4,
    letterSpacing: 1,
  },
  currentLevelName: {
    fontSize: 28,
    fontWeight: "800" as const,
    color: Colors.light.text,
    marginBottom: 8,
  },
  currentLevelDesc: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    maxWidth: width * 0.6,
  },
  continueButtonContainer: {
    alignItems: "center",
    gap: 8,
  },
  wodLabel: {
    fontSize: 12,
    fontWeight: "700" as const,
    color: Colors.light.tint,
    letterSpacing: 1,
  },
  continueButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(229, 9, 20, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  levelInfo: {
    marginBottom: 24,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: Colors.light.backgroundCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(224, 224, 220, 0.5)",
    overflow: "hidden" as const,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  levelInfoTitle: {
    fontSize: 24,
    fontWeight: "800" as const,
    color: Colors.light.text,
    marginBottom: 8,
  },
  levelInfoDesc: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  levelMeta: {
    flexDirection: "row",
    gap: 20,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    fontWeight: "500" as const,
  },
  weekSection: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  weekSectionLocked: {
    opacity: 0.6,
  },
  weekHeader: {
    marginBottom: 16,
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
  },
  weekHeaderLeft: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 12,
  },
  lockIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(139, 154, 163, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  weekTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.light.text,
    marginBottom: 4,
  },
  weekTitleLocked: {
    color: Colors.light.textSecondary,
  },
  weekSubtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  workoutCard: {
    backgroundColor: Platform.select({
      ios: "rgba(45, 42, 42, 0.55)",
      default: "rgba(45, 42, 42, 0.9)",
    }),
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(224, 224, 220, 0.35)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
    overflow: "hidden" as const,
  },
  workoutCardLocked: {
    backgroundColor: Platform.select({
      ios: "rgba(45, 42, 42, 0.35)",
      default: "rgba(45, 42, 42, 0.7)",
    }),
    opacity: 0.7,
  },
  workoutHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  workoutDayBadge: {
    backgroundColor: "rgba(229, 9, 20, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  workoutDayText: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: Colors.light.tint,
  },
  completedBadge: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  lockedBadge: {
    backgroundColor: "rgba(139, 154, 163, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: Colors.light.text,
    marginBottom: 6,
  },
  workoutTitleLocked: {
    color: Colors.light.textSecondary,
  },
  workoutDesc: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  workoutDescLocked: {
    fontStyle: "italic" as const,
  },
  workoutFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  workoutMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  workoutMetaText: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  workoutMetaTextActive: {
    color: Colors.light.tint,
    fontWeight: "600" as const,
  },
  emptyState: {
    paddingVertical: 60,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
  progressBarContainer: {
    marginBottom: 16,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 12,
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(229, 229, 229, 0.8)",
    borderRadius: 4,
    overflow: "hidden" as const,
  },
  progressBarFill: {
    height: "100%" as const,
    backgroundColor: Colors.light.success,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: Colors.light.success,
    minWidth: 40,
  },
  bottomSpacer: {
    height: 40,
  },
  currentLevelCardLocked: {
    opacity: 0.7,
    backgroundColor: Platform.select({
      ios: "rgba(45, 42, 42, 0.35)",
      default: "rgba(45, 42, 42, 0.65)",
    }),
  },
  currentLevelNameLocked: {
    color: Colors.light.textSecondary,
  },
  currentLevelDescLocked: {
    fontStyle: "italic" as const,
  },
  lockIconLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(139, 154, 163, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  bossFightCard: {
    backgroundColor: "#1A0A0B",
    borderColor: "rgba(220, 38, 38, 0.5)",
    borderWidth: 2,
  },
  bossFightBadge: {
    backgroundColor: "rgba(220, 38, 38, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  bossFightBadgeText: {
    fontSize: 12,
    fontWeight: "700" as const,
    color: "#DC2626",
  },
  bossFightTitle: {
    color: "#FFFFFF",
  },
  bossFightMetaText: {
    color: "#DC2626",
    fontWeight: "600" as const,
  },
  fitnessCardConnected: {
    borderColor: "rgba(16, 185, 129, 0.3)",
    backgroundColor: "rgba(16, 185, 129, 0.05)",
  },
  connectedStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: Platform.select({
      ios: "rgba(45, 42, 42, 0.35)",
      default: "rgba(45, 42, 42, 0.6)",
    }),
  },
  connectedStatItem: {
    alignItems: "center",
    flex: 1,
  },
  connectedStatValue: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.light.text,
    marginBottom: 4,
  },
  connectedStatLabel: {
    fontSize: 11,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
  connectedStatDivider: {
    width: 1,
    height: 32,
    backgroundColor: "rgba(224, 224, 220, 0.5)",
  },
  disconnectButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.light.textSecondary,
  },
  disconnectButtonText: {
    color: Colors.light.textSecondary,
  },
});
