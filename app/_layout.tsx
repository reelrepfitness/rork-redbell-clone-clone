import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { ProgressProvider } from "@/context/ProgressContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import Colors from "@/constants/colors";
import { testSupabaseConnection } from "@/lib/test-connection";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  const { isAuthenticated, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!isAuthenticated && !inAuthGroup) {
      console.log('[RootLayout] Not authenticated, redirecting to auth');
      router.replace('/auth');
    } else if (isAuthenticated && inAuthGroup) {
      console.log('[RootLayout] Authenticated, redirecting to home');
      router.replace('/');
    }
  }, [isAuthenticated, segments, loading]);

  return (
    <Stack 
      screenOptions={{ 
        headerBackTitle: "Back",
        headerStyle: {
          backgroundColor: Colors.light.backgroundCard,
        },
        headerTintColor: Colors.light.tint,
        headerTitleStyle: {
          fontWeight: "700" as const,
          color: Colors.light.text,
        },
        contentStyle: {
          backgroundColor: Colors.light.background,
        },
      }}
    >
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="workout/[id]" 
        options={{ 
          title: "Workout",
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="exercise/[id]" 
        options={{ 
          title: "Exercise",
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="wod" 
        options={{ 
          title: "Workout of the Day",
          presentation: "card",
        }} 
      />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
    testSupabaseConnection();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <AuthProvider>
          <ProgressProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <StatusBar style="dark" />
              <RootLayoutNav />
            </GestureHandlerRootView>
          </ProgressProvider>
        </AuthProvider>
      </DataProvider>
    </QueryClientProvider>
  );
}
