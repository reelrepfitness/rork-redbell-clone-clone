import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Image } from "expo-image";
import { CheckCircle2, AlertCircle, Repeat } from "lucide-react-native";
import Colors from "@/constants/colors";
import { EXERCISES } from "@/mocks/data";

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const exercise = EXERCISES.find((e) => e.id === id);

  if (!exercise) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Exercise Not Found" }} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Exercise not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: exercise.name }} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {exercise.imageUrl && (
          <Image
            source={{ uri: exercise.imageUrl }}
            style={styles.heroImage}
            contentFit="cover"
          />
        )}

        <View style={styles.content}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{exercise.category}</Text>
          </View>

          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <Text style={styles.description}>{exercise.description}</Text>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <CheckCircle2 color={Colors.light.tint} size={24} />
              <Text style={styles.sectionTitle}>Focus Points</Text>
            </View>
            {exercise.focusPoints.map((point, index) => {
              const items = point.split(';').map(item => item.trim()).filter(item => item.length > 0);
              return items.map((item, itemIndex) => (
                <View key={`${index}-${itemIndex}`} style={styles.listItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.listText}>{item}</Text>
                </View>
              ));
            })}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <CheckCircle2 color={Colors.light.tint} size={24} />
              <Text style={styles.sectionTitle}>Technique Checklist</Text>
            </View>
            {exercise.techniqueChecklist.map((item, index) => {
              const items = item.split(';').map(subItem => subItem.trim()).filter(subItem => subItem.length > 0);
              return items.map((subItem, itemIndex) => (
                <View key={`${index}-${itemIndex}`} style={styles.listItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.listText}>{subItem}</Text>
                </View>
              ));
            })}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <AlertCircle color={Colors.light.warning} size={24} />
              <Text style={styles.sectionTitle}>Common Errors</Text>
            </View>
            {exercise.commonErrors.map((error, index) => {
              const items = error.split(';').map(item => item.trim()).filter(item => item.length > 0);
              return items.map((item, itemIndex) => (
                <View key={`${index}-${itemIndex}`} style={styles.listItem}>
                  <View style={[styles.bullet, styles.bulletWarning]} />
                  <Text style={styles.listText}>{item}</Text>
                </View>
              ));
            })}
          </View>

          {exercise.alternatives.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Repeat color={Colors.light.textSecondary} size={24} />
                <Text style={styles.sectionTitle}>Alternatives</Text>
              </View>
              <View style={styles.alternativesContainer}>
                {exercise.alternatives.map((alt, index) => (
                  <View key={index} style={styles.alternativeChip}>
                    <Text style={styles.alternativeText}>{alt}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

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
  },
  errorText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroImage: {
    width: "100%",
    height: 300,
    backgroundColor: "rgba(45, 42, 42, 0.6)",
  },
  content: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: Platform.select({
      ios: "rgba(229, 9, 20, 0.2)",
      default: "rgba(229, 9, 20, 0.25)",
    }),
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(229, 9, 20, 0.3)",
  },
  categoryBadgeText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.light.tint,
  },
  exerciseName: {
    fontSize: 28,
    fontWeight: "800" as const,
    color: Colors.light.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    lineHeight: 24,
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.light.text,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingLeft: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.light.tint,
    marginTop: 8,
    marginRight: 12,
  },
  bulletWarning: {
    backgroundColor: Colors.light.warning,
  },
  listText: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.textSecondary,
    lineHeight: 24,
  },
  alternativesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  alternativeChip: {
    backgroundColor: Platform.select({
      ios: "rgba(45, 42, 42, 0.55)",
      default: "rgba(45, 42, 42, 0.9)",
    }),
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(224, 224, 220, 0.35)",
    overflow: "hidden" as const,
  },
  alternativeText: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: Colors.light.text,
  },
  bottomSpacer: {
    height: 40,
  },
});
