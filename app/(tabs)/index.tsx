import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import * as AuthSession from "expo-auth-session";
import { useRouter, Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons"; // Import the correct icon set
import { githubData } from "@/constants/github";
import { googleClientId } from "@/constants/google"; // Make sure to add this constant for Google OAuth

export default function Home() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const router = useRouter();
  const { clientId, clientSecret } = githubData;

  const githubDiscovery = {
    authorizationEndpoint: "https://github.com/login/oauth/authorize",
    tokenEndpoint: "https://github.com/login/oauth/access_token",
    revocationEndpoint:
      "https://github.com/settings/connections/applications/" + clientId,
  };

  const googleDiscovery = {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
  };

  const [githubRequest, githubResponse, githubPromptAsync] =
    AuthSession.useAuthRequest(
      {
        clientId: clientId,
        redirectUri: AuthSession.makeRedirectUri(),
        scopes: ["user"],
      },
      githubDiscovery
    );

  const [googleRequest, googleResponse, googlePromptAsync] =
    AuthSession.useAuthRequest(
      {
        clientId: googleClientId,
        redirectUri: AuthSession.makeRedirectUri(),
        scopes: ["profile", "email"],
      },
      googleDiscovery
    );

  useEffect(() => {
    // Handle GitHub authentication response
    if (githubResponse?.type === "success") {
      const { code } = githubResponse.params;
      fetchGitHubUserInfo(code);
    }

    // Handle Google authentication response
    if (googleResponse?.type === "success") {
      const { code } = googleResponse.params;
      fetchGoogleUserInfo(code);
    }
  }, [githubResponse, googleResponse]);

  const fetchGitHubUserInfo = async (code: any) => {
    try {
      const tokenResponse = await fetch(
        "https://github.com/login/oauth/access_token",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code,
          }),
        }
      );
      const { access_token } = await tokenResponse.json();

      const userResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const user = await userResponse.json();
      setUserInfo(user);
      router.push("/(app)/home");
    } catch (error) {
      console.error("Error during GitHub authentication:", error);
    }
  };

  const fetchGoogleUserInfo = async (code: any) => {
    try {
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: googleClientId,
          code,
          redirect_uri: AuthSession.makeRedirectUri(),
          client_secret: "YOUR_GOOGLE_CLIENT_SECRET", // Ensure you have the secret here
          grant_type: "authorization_code",
        }),
      });
      const { access_token } = await tokenResponse.json();

      const userResponse = await fetch(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const user = await userResponse.json();
      setUserInfo(user);
      router.push("/(app)/home");
    } catch (error) {
      console.error("Error during Google authentication:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Link href="/signIn" style={styles.linkButton}>
        <Text style={styles.linkButtonText}>Sign In</Text>
      </Link>
      <Link href="/signUp" style={styles.linkButton}>
        <Text style={styles.linkButtonText}>Sign Up</Text>
      </Link>

      {userInfo ? (
        <View style={styles.userInfoContainer}>
          <Image
            source={{ uri: userInfo.avatar_url || userInfo.picture }}
            style={styles.userAvatar}
          />
          <Text style={styles.userName}>
            Welcome, {userInfo.name || userInfo.email}!
          </Text>
          <Text style={styles.userText}>
            Username: {userInfo.login || userInfo.id}
          </Text>
          <Text style={styles.userText}>Email: {userInfo.email}</Text>
        </View>
      ) : (
        <>
          <Pressable
            onPress={() => githubPromptAsync()}
            style={styles.githubButton}
          >
            <AntDesign name="github" size={28} color="white" />
            <Text style={styles.githubButtonText}>Sign in with GitHub</Text>
          </Pressable>

          <Pressable
            onPress={() => googlePromptAsync()}
            style={styles.githubButton}
          >
            <AntDesign name="google" size={28} color="white" />
            <Text style={styles.githubButtonText}>Sign in with Google</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
  },
  linkButton: {
    padding: 12,
    backgroundColor: "#6200ee",
    borderRadius: 25,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  linkButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  githubButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#24292f",
    borderRadius: 25,
    marginTop: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  githubButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  userInfoContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginTop: 30,
    width: "100%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#6200ee",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userText: {
    fontSize: 16,
    color: "#333",
  },
});
