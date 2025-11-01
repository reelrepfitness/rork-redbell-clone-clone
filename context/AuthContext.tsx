import { useState, useCallback, useMemo, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createContextHook from "@nkzw/create-context-hook";
import { fetchUserProfile, updateUserProfile } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const STORAGE_KEY = "@kettlebell_user";

export type Profile = {
  id: string;
  name: string | null;
  email: string | null;
  current_level: string | null;
};

export const [AuthProvider, useAuth] = createContextHook(() => {
  const queryClient = useQueryClient();
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [localProfile, setLocalProfile] = useState<Profile | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('[AuthContext] Got session:', session?.user?.id);
      setSession(session);
      if (session?.user) {
        setLocalProfile({
          id: session.user.id,
          name: session.user.user_metadata?.name || null,
          email: session.user.email || null,
          current_level: "Level 1 - Beginner",
        });
      }
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('[AuthContext] Auth state changed:', _event, session?.user?.id);
      setSession(session);
      if (session?.user) {
        setLocalProfile({
          id: session.user.id,
          name: session.user.user_metadata?.name || null,
          email: session.user.email || null,
          current_level: "Level 1 - Beginner",
        });
      } else {
        setLocalProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const profileQuery = useQuery({
    queryKey: ['user-profile', localProfile?.id],
    queryFn: () => fetchUserProfile(localProfile!.id),
    enabled: !!localProfile?.id,
    staleTime: 1000 * 60 * 5,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (updates: Partial<Profile>) => 
      updateUserProfile(localProfile!.id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile', localProfile?.id] });
    },
  });

  const { mutateAsync: updateProfileAsync } = updateProfileMutation;

  const profile = useMemo(() => {
    if (profileQuery.data && localProfile) {
      return {
        id: profileQuery.data.id || localProfile.id,
        name: profileQuery.data.name || localProfile.name,
        email: profileQuery.data.email || localProfile.email,
        current_level: profileQuery.data.current_level || localProfile.current_level,
      };
    }
    return localProfile;
  }, [profileQuery.data, localProfile]);

  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
    if (!localProfile) return;
    const newProfile = { ...localProfile, ...updates };
    setLocalProfile(newProfile);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
    
    if (updates.current_level !== undefined) {
      await updateProfileAsync({ current_level: updates.current_level });
    }
  }, [localProfile, updateProfileAsync]);

  const signIn = useCallback(async (email: string, password: string) => {
    console.log('[AuthContext] signIn called with:', email);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error('[AuthContext] Sign in error:', error);
        return { error: error.message };
      }
      console.log('[AuthContext] Sign in successful:', data.user?.id);
      return { error: null };
    } catch (error: any) {
      console.error('[AuthContext] Sign in exception:', error);
      return { error: error.message || 'Sign in failed' };
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    console.log('[AuthContext] signUp called with:', email, name);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      if (error) {
        console.error('[AuthContext] Sign up error:', error);
        return { error: error.message };
      }
      console.log('[AuthContext] Sign up successful:', data.user?.id);
      return { error: null };
    } catch (error: any) {
      console.error('[AuthContext] Sign up exception:', error);
      return { error: error.message || 'Sign up failed' };
    }
  }, []);

  const signOut = useCallback(async () => {
    console.log('[AuthContext] signOut called');
    try {
      await supabase.auth.signOut();
      setLocalProfile(null);
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('[AuthContext] Sign out error:', error);
    }
  }, []);

  return useMemo(() => ({
    profile: localProfile,
    loading: isLoading || profileQuery.isLoading,
    updateProfile,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!session,
    session,
  }), [localProfile, isLoading, profileQuery.isLoading, updateProfile, signIn, signUp, signOut, session]);
});
