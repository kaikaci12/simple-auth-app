import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";

export default function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  const [request, response, promptAsync] = AuthSession.useAuthRequest({
    clientId: "YOUR_GITHUB_CLIENT_ID", // Replace with your GitHub Client ID
    redirectUri: AuthSession.makeRedirectUri({
      useProxy: true,
    }),
    scopes: ["user"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      fetchGitHubUserInfo(code);
    }
  }, [response]);

  const fetchGitHubUserInfo = async (code) => {
    try {
      // Step 1: Exchange the code for an access token
      const tokenResponse = await fetch(
        "https://github.com/login/oauth/access_token",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: JSON.stringify({
            client_id: "YOUR_GITHUB_CLIENT_ID", // Replace with your GitHub Client ID
            client_secret: "YOUR_GITHUB_CLIENT_SECRET", // Replace with your GitHub Client Secret
            code,
          }),
        }
      );
      const { access_token } = await tokenResponse.json();

      // Step 2: Use the token to fetch user info
      const userResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const user = await userResponse.json();
      setUserInfo(user);
      console.log("GitHub User Info:", user);

      // Redirect or handle the user info as needed
      router.push("/dashboard"); // Navigate to the dashboard
    } catch (error) {
      console.error("Error during GitHub authentication:", error);
    }
  };

  return (
    <View style={styles.container}>
      {userInfo ? (
        <View>
          <Text style={styles.text}>Welcome, {userInfo.name}!</Text>
          <Text style={styles.text}>Username: {userInfo.login}</Text>
          <Text style={styles.text}>Email: {userInfo.email}</Text>
        </View>
      ) : (
        <TouchableOpacity
          disabled={!request}
          onPress={() => promptAsync()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign in with GitHub</Text>
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
    backgroundColor: "#f0f0f0",
  },
  button: {
    backgroundColor: "#24292f", // GitHub dark gray color
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
