import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { Lock } from "lucide-react-native";
import Colors from "@/constants/colors";
import { LEVELS, MOCK_USER } from "@/mocks/data";

export default function ProgramsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Available Levels</Text>
          <Text style={styles.headerSubtitle}>
            Choose your fitness journey
          </Text>
        </View>

        {LEVELS.map((level) => {
          const isUnlocked = MOCK_USER.unlockedLevels.includes(level.id);
          const isCurrent = level.id === MOCK_USER.currentLevel;

          return (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.levelCard,
                isCurrent && styles.levelCardCurrent,
                !isUnlocked && styles.levelCardLocked,
              ]}
              onPress={() => {
                if (isUnlocked) {
                  router.push("/");
                }
              }}
              activeOpacity={isUnlocked ? 0.7 : 1}
              disabled={!isUnlocked}
            >
              <View style={styles.levelHeader}>
                <View style={styles.levelInfo}>
                  <View style={styles.levelBadge}>
                    <Text style={styles.levelNumber}>{level.difficulty}</Text>
                  </View>
                  <View style={styles.levelText}>
                    <Text style={styles.levelName}>{level.name}</Text>
                    <Text style={styles.levelDuration}>{level.duration}</Text>
                  </View>
                </View>
                {!isUnlocked && (
                  <View style={styles.lockContainer}>
                    <Lock color={Colors.light.textSecondary} size={20} />
                  </View>
                )}
                {isCurrent && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>ACTIVE</Text>
                  </View>
                )}
              </View>
              <Text
                style={[
                  styles.levelDescription,
                  !isUnlocked && styles.levelDescriptionLocked,
                ]}
              >
                {level.description}
              </Text>
              {!isUnlocked && level.price && (
                <View style={styles.priceContainer}>
                  <Text style={styles.priceText}>${level.price}</Text>
                  <TouchableOpacity style={styles.unlockButton}>
                    <Text style={styles.unlockButtonText}>Unlock</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

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
  headerTitle: {
    fontSize: 32,
    fontWeight: "800" as const,
    color: Colors.light.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  levelCard: {
    backgroundColor: Platform.select({
      ios: "rgba(45, 42, 42, 0.55)",
      default: "rgba(45, 42, 42, 0.9)",
    }),
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 20,
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
  levelCardCurrent: {
    borderWidth: 2,
    borderColor: Colors.light.success,
  },
  levelCardLocked: {
    opacity: 0.6,
  },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  levelInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  levelBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(184, 29, 36, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  levelNumber: {
    fontSize: 20,
    fontWeight: "800" as const,
    color: Colors.light.secondary,
  },
  levelText: {
    flex: 1,
  },
  levelName: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.light.text,
    marginBottom: 2,
  },
  levelDuration: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  lockContainer: {
    marginLeft: 12,
  },
  currentBadge: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  currentBadgeText: {
    fontSize: 11,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  levelDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
  levelDescriptionLocked: {
    opacity: 0.7,
  },
  priceContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.light.success,
  },
  unlockButton: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  unlockButtonText: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  bottomSpacer: {
    height: 40,
  },
});
