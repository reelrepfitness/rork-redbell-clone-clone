import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Settings, Trophy, TrendingUp, Calendar, Dumbbell, User, Award, Activity, LogOut, X, Check } from "lucide-react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import { MOCK_USER, WORKOUTS } from "@/mocks/data";
import { useProgress } from "@/context/ProgressContext";
import { useAuth } from "@/context/AuthContext";
import { Image } from "expo-image";

export default function ProfileScreen() {
  const router = useRouter();
  const { getTotalCompletedWorkouts, getCurrentStreak, getRecentLogs } = useProgress();
  const { profile } = useAuth();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(300));
  const [appleHealthConnected, setAppleHealthConnected] = useState(false);
  const [samsungHealthConnected, setSamsungHealthConnected] = useState(false);

  const totalWorkouts = getTotalCompletedWorkouts();
  const currentStreak = getCurrentStreak();
  const recentLogs = getRecentLogs(5);

  const openSidebar = () => {
    setSidebarVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 10,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setSidebarVisible(false));
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Logout functionality will be added when authentication is integrated.",
      [
        { text: "OK", style: "cancel" },
      ]
    );
  };

  return (
    <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
          <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity 
          style={styles.settingsButton} 
          activeOpacity={0.7}
          onPress={openSidebar}
        >
          <Settings color={Colors.light.textSecondary} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{profile?.name?.[0] || "U"}</Text>
          </View>
          <Text style={styles.profileName}>{profile?.name || "User"}</Text>
          <Text style={styles.profileEmail}>{profile?.email || ""}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>

          <View style={styles.statRow}>
            <View style={styles.statIconContainer}>
              <Trophy color={Colors.light.success} size={24} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Total Workouts</Text>
              <Text style={styles.statValue}>{totalWorkouts}</Text>
            </View>
          </View>

          <View style={styles.statRow}>
            <View style={styles.statIconContainer}>
              <TrendingUp color={Colors.light.tint} size={24} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Current Streak</Text>
              <Text style={styles.statValue}>
                {currentStreak} {currentStreak === 1 ? "day" : "days"}
              </Text>
            </View>
          </View>

          <View style={styles.statRow}>
            <View style={styles.statIconContainer}>
              <Calendar color={Colors.light.warning} size={24} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>This Week</Text>
              <Text style={styles.statValue}>
                {recentLogs.filter((log) => {
                  const logDate = new Date(log.date);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return logDate >= weekAgo;
                }).length} workouts
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentLogs.length > 0 ? (
            recentLogs.map((log) => {
              const workout = WORKOUTS.find((w) => w.id === log.workoutId);
              if (!workout) return null;

              const logDate = new Date(log.date);
              const formattedDate = logDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });

              return (
                <TouchableOpacity
                  key={log.id}
                  style={styles.activityItem}
                  onPress={() => router.push(`/workout/${workout.id}` as any)}
                  activeOpacity={0.7}
                >
                  <View style={styles.activityIconContainer}>
                    <Dumbbell color={Colors.light.accent} size={20} />
                  </View>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityTitle}>{workout.title}</Text>
                    <Text style={styles.activityDate}>{formattedDate}</Text>
                  </View>
                  {log.duration && (
                    <View style={styles.activityDuration}>
                      <Text style={styles.activityDurationText}>
                        {Math.floor(log.duration / 60)}m
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.activityCard}>
              <Text style={styles.activityText}>
                Complete workouts to see your progress here
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Apps</Text>
          
          <TouchableOpacity 
            style={styles.healthAppCard}
            activeOpacity={0.7}
            onPress={() => {
              if (Platform.OS === 'ios') {
                setAppleHealthConnected(!appleHealthConnected);
                Alert.alert(
                  appleHealthConnected ? "Disconnected" : "Connected",
                  `Apple Health ${appleHealthConnected ? "disconnected" : "connected"} successfully`
                );
              } else {
                Alert.alert(
                  "iOS Only",
                  "Apple Health is only available on iOS devices"
                );
              }
            }}
          >
            <View style={styles.healthAppIcon}>
              <Image
                source={{ uri: "https://res.cloudinary.com/diwe4xzro/image/upload/v1761924125/FAASD_egzvdr.webp" }}
                style={styles.healthIconImage}
                contentFit="contain"
              />
            </View>
            <View style={styles.healthAppInfo}>
              <Text style={styles.healthAppName}>Apple Health</Text>
              <Text style={styles.healthAppStatus}>
                {appleHealthConnected ? "Connected" : "Not Connected"}
              </Text>
            </View>
            {appleHealthConnected && (
              <View style={styles.connectedBadge}>
                <Check color="#10b981" size={16} />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.healthAppCard}
            activeOpacity={0.7}
            onPress={() => {
              if (Platform.OS === 'android') {
                setSamsungHealthConnected(!samsungHealthConnected);
                Alert.alert(
                  samsungHealthConnected ? "Disconnected" : "Connected",
                  `Samsung Health ${samsungHealthConnected ? "disconnected" : "connected"} successfully`
                );
              } else {
                Alert.alert(
                  "Android Only",
                  "Samsung Health is only available on Android devices"
                );
              }
            }}
          >
            <View style={styles.healthAppIcon}>
              <Image
                source={{ uri: "https://res.cloudinary.com/diwe4xzro/image/upload/v1761930385/afasfa_fdg7kg.webp" }}
                style={styles.healthIconImage}
                contentFit="contain"
              />
            </View>
            <View style={styles.healthAppInfo}>
              <Text style={styles.healthAppName}>Samsung Health</Text>
              <Text style={styles.healthAppStatus}>
                {samsungHealthConnected ? "Connected" : "Not Connected"}
              </Text>
            </View>
            {samsungHealthConnected && (
              <View style={styles.connectedBadge}>
                <Check color="#10b981" size={16} />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.premiumCard} activeOpacity={0.8}>
          <View style={styles.premiumContent}>
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>PRO</Text>
            </View>
            <Text style={styles.premiumTitle}>Unlock All Levels</Text>
            <Text style={styles.premiumDesc}>
              Get access to Advanced and Athlete programs
            </Text>
          </View>
        </TouchableOpacity>

            <View style={styles.bottomSpacer} />
          </ScrollView>
        </SafeAreaView>

      <Modal
        visible={sidebarVisible}
        transparent
        animationType="fade"
        onRequestClose={closeSidebar}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.backdrop} onPress={closeSidebar} />
          
          <Animated.View 
            style={[
              styles.sidebar,
              {
                transform: [{ translateX: slideAnim }]
              }
            ]}
          >
            <SafeAreaView style={styles.sidebarContent} edges={["top", "bottom"]}>
              <View style={styles.sidebarHeader}>
                <Text style={styles.sidebarTitle}>Menu</Text>
                <TouchableOpacity onPress={closeSidebar} style={styles.closeButton}>
                  <X color={Colors.light.text} size={24} />
                </TouchableOpacity>
              </View>

              <View style={styles.sidebarUser}>
                <View style={styles.sidebarAvatar}>
                  <Text style={styles.sidebarAvatarText}>
                    {profile?.name?.[0] || MOCK_USER.name[0]}
                  </Text>
                </View>
                <View style={styles.sidebarUserInfo}>
                  <Text style={styles.sidebarUserName}>
                    {profile?.name || MOCK_USER.name}
                  </Text>
                  <Text style={styles.sidebarUserEmail}>
                    {profile?.email || MOCK_USER.email}
                  </Text>
                </View>
              </View>

              <View style={styles.menuItems}>
                <TouchableOpacity 
                  style={styles.menuItem}
                  activeOpacity={0.7}
                  onPress={() => {
                    closeSidebar();
                    router.push("/(tabs)/profile" as any);
                  }}
                >
                  <View style={styles.menuIconContainer}>
                    <User color={Colors.light.tint} size={22} />
                  </View>
                  <Text style={styles.menuItemText}>My Account</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.menuItem}
                  activeOpacity={0.7}
                  onPress={() => {
                    closeSidebar();
                    router.push("/(tabs)/programs" as any);
                  }}
                >
                  <View style={styles.menuIconContainer}>
                    <Award color={Colors.light.success} size={22} />
                  </View>
                  <Text style={styles.menuItemText}>My Programs</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.menuItem}
                  activeOpacity={0.7}
                  onPress={() => {
                    closeSidebar();
                    router.push("/(tabs)/profile" as any);
                  }}
                >
                  <View style={styles.menuIconContainer}>
                    <Activity color={Colors.light.warning} size={22} />
                  </View>
                  <Text style={styles.menuItemText}>My Progress</Text>
                </TouchableOpacity>

                <View style={styles.menuDivider} />

                <TouchableOpacity 
                  style={styles.menuItem}
                  activeOpacity={0.7}
                  onPress={handleLogout}
                >
                  <View style={[styles.menuIconContainer, styles.logoutIconContainer]}>
                    <LogOut color="#ef4444" size={22} />
                  </View>
                  <Text style={[styles.menuItemText, styles.logoutText]}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800" as const,
    color: Colors.light.text,
  },
  settingsButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: Platform.select({
      ios: "rgba(45, 42, 42, 0.55)",
      default: "rgba(45, 42, 42, 0.9)",
    }),
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
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
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(229, 9, 20, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: Colors.light.tint,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.light.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.light.text,
    marginBottom: 16,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
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
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(229, 9, 20, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.light.text,
  },
  activityCard: {
    backgroundColor: Platform.select({
      ios: "rgba(45, 42, 42, 0.55)",
      default: "rgba(45, 42, 42, 0.9)",
    }),
    padding: 24,
    borderRadius: 12,
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
  activityText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
  premiumCard: {
    backgroundColor: Platform.select({
      ios: "rgba(45, 42, 42, 0.55)",
      default: "rgba(45, 42, 42, 0.9)",
    }),
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: Colors.light.secondary,
    shadowColor: Colors.light.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
    overflow: "hidden" as const,
  },
  premiumContent: {
    alignItems: "center",
  },
  premiumBadge: {
    backgroundColor: Colors.light.secondary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  premiumBadgeText: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.light.text,
    marginBottom: 8,
  },
  premiumDesc: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
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
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(184, 29, 36, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.light.text,
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  activityDuration: {
    backgroundColor: "rgba(229, 9, 20, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  activityDurationText: {
    fontSize: 13,
    fontWeight: "600" as const,
    color: Colors.light.tint,
  },
  bottomSpacer: {
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sidebar: {
    width: 280,
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  sidebarContent: {
    flex: 1,
  },
  sidebarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: "800" as const,
    color: Colors.light.text,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  sidebarUser: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  sidebarAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.light.backgroundCard,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  sidebarAvatarText: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.light.tint,
  },
  sidebarUserInfo: {
    flex: 1,
  },
  sidebarUserName: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.light.text,
    marginBottom: 2,
  },
  sidebarUserEmail: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    opacity: 0.8,
  },
  menuItems: {
    flex: 1,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(229, 9, 20, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  logoutIconContainer: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.light.text,
  },
  logoutText: {
    color: "#ef4444",
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginVertical: 8,
    marginHorizontal: 20,
  },
  healthAppCard: {
    flexDirection: "row",
    alignItems: "center",
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
  healthAppIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    overflow: "hidden" as const,
  },
  healthIconImage: {
    width: 40,
    height: 40,
  },
  healthAppInfo: {
    flex: 1,
  },
  healthAppName: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.light.text,
    marginBottom: 4,
  },
  healthAppStatus: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  connectedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
});
