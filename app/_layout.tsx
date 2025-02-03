import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import AuthProvider from "./context/AuthProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "./context/AuthProvider";
import { Button } from "react-native";

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { authState, onLogout } = useAuth();
  console.log(authState);
  return (
    <>
      <Stack>
        {authState?.authenticated ? (
          <Stack.Screen
            name="(app)/home.tsx"
            options={{
              headerShown: false,
              headerRight: () => <Button onPress={onLogout} title="SignOut" />,
            }}
          />
        ) : (
          <Stack.Screen name="signIn" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="signUp" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" backgroundColor="blue" />
    </>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
