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
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useRouter, Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons"; // Import the correct icon set
import { useAuth } from "../context/AuthProvider";
import { webClientId, androidClientId } from "@/constants/google";
WebBrowser.maybeCompleteAuthSession();
export default function Home() {
  const config = {
    webClientId,
    androidClientId,
  };
  const [userInfo, setUserInfo] = useState<any>(null);
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest(config);
  const handleToken = () => {
    if (response?.type === "success") {
      const { authentication } = response;
      const token = authentication?.accessToken;
      console.log("access token: ", token);
    }
  };
  useEffect(() => {
    handleToken();
  }, [response]);
  const { onGithubSignIn } = useAuth();
  const handleSignInWithGithub = async () => {
    const result = await onGithubSignIn!();
    if (result && result.error) {
      alert(result.msg);
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
            onPress={handleSignInWithGithub}
            style={styles.githubButton}
          >
            <AntDesign name="github" size={28} color="white" />
            <Text style={styles.githubButtonText}>Sign in with GitHub</Text>
          </Pressable>

          <Pressable onPress={() => promptAsync()} style={styles.githubButton}>
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
