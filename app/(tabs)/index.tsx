import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as AuthSession from "expo-auth-session";
import { useRouter, Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons"; // Import the correct icon set
import { githubData } from "@/constants/github";

export default function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();
  const { clientId, clientSecret } = githubData;

  const [request, response, promptAsync] = AuthSession.useAuthRequest({
    clientId: clientId, // Use actual GitHub client ID
    redirectUri: AuthSession.makeRedirectUri(),
    scopes: ["user"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      fetchGitHubUserInfo(code);
      console.log("function mounted");
    }
  }, [response]);

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
      console.log(user);
      router.push("/(app)/home"); // Navigate to the dashboard
    } catch (error) {
      console.error("Error during GitHub authentication:", error);
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
            source={{ uri: userInfo.avatar_url }}
            style={styles.userAvatar}
          />
          <Text style={styles.userName}>Welcome, {userInfo.name}!</Text>
          <Text style={styles.userText}>Username: {userInfo.login}</Text>
          <Text style={styles.userText}>Email: {userInfo.email}</Text>
        </View>
      ) : (
        <TouchableOpacity
          disabled={!request}
          onPress={() => promptAsync()}
          style={styles.githubButton}
        >
          <AntDesign name="github" size={28} color="white" />
          <Text style={styles.githubButtonText}>Sign in with GitHub</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9", // Light background for a clean look
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
    backgroundColor: "#24292f", // GitHub dark gray color
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
