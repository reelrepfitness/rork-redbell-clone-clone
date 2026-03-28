import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mail, Lock, User, LogIn, UserPlus } from "lucide-react-native";
import Colors from "@/constants/colors";
import { useAuth } from "@/context/AuthContext";

type AuthMode = "signin" | "signup";

export default function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (mode === "signup" && !name) {
      Alert.alert("Error", "Please enter your name");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signin") {
        console.log("[AuthScreen] Attempting sign in...");
        const result = await signIn(email, password);
        console.log("[AuthScreen] Sign in result:", result);
        
        if (result.error) {
          console.log("[AuthScreen] Sign in error:", result.error);
          Alert.alert(
            "Sign In Failed", 
            result.error || "Invalid email or password"
          );
        } else {
          console.log("[AuthScreen] Sign in successful, navigation will be handled by _layout");
        }
      } else {
        console.log("[AuthScreen] Attempting sign up...");
        const result = await signUp(email, password, name);
        console.log("[AuthScreen] Sign up result:", result);
        
        if (result.error) {
          console.log("[AuthScreen] Sign up error:", result.error);
          Alert.alert(
            "Sign Up Failed", 
            result.error || "Failed to create account"
          );
        } else {
          console.log("[AuthScreen] Sign up successful");
          Alert.alert(
            "Success",
            "Account created successfully! You can now sign in.",
            [
              {
                text: "OK",
                onPress: () => {
                  setMode("signin");
                  setEmail("");
                  setPassword("");
                  setName("");
                },
              },
            ]
          );
        }
      }
    } catch (error) {
      console.error("[AuthScreen] Unexpected auth error:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              {mode === "signin" ? (
                <LogIn color="#FFFFFF" size={40} />
              ) : (
                <UserPlus color="#FFFFFF" size={40} />
              )}
            </View>
            <Text style={styles.title}>
              {mode === "signin" ? "Welcome Back" : "Create Account"}
            </Text>
            <Text style={styles.subtitle}>
              {mode === "signin"
                ? "Sign in to continue your fitness journey"
                : "Join us and start your transformation"}
            </Text>
          </View>

          <View style={styles.form}>
            {mode === "signup" && (
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <User color={Colors.light.textSecondary} size={20} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#5A6B78"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  editable={!loading}
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Mail color={Colors.light.textSecondary} size={20} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#5A6B78"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Lock color={Colors.light.textSecondary} size={20} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#5A6B78"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                editable={!loading}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleAuth}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color={Colors.light.neutralDark} />
              ) : (
                <Text style={styles.buttonText}>
                  {mode === "signin" ? "Sign In" : "Sign Up"}
                </Text>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                {mode === "signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </Text>
              <TouchableOpacity onPress={toggleMode} disabled={loading}>
                <Text style={styles.footerLink}>
                  {mode === "signin" ? "Sign Up" : "Sign In"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221F1F',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: "800" as const,
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Platform.select({
      ios: "rgba(45, 42, 42, 0.55)",
      default: "rgba(45, 42, 42, 0.9)",
    }),
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(224, 224, 220, 0.35)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
    overflow: "hidden" as const,
  },
  inputIcon: {
    paddingLeft: 16,
    paddingRight: 12,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 16,
    fontSize: 16,
    color: Colors.light.text,
  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginRight: 4,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: Colors.light.tint,
  },
});
