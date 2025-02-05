import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

function Home() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Link
        href="/signIn"
        onPress={() => router.push("/signIn")}
        style={{
          padding: 10,
          backgroundColor: "#6200ee",
          color: "#ffffff",
          borderRadius: 5,
          marginBottom: 10,
        }}
      >
        Sign in
      </Link>
      <Link
        href="/signUp"
        style={{
          padding: 10,
          backgroundColor: "#03dac6",
          color: "#000000",
          borderRadius: 5,
        }}
      >
        Sign Up
      </Link>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          // initiate sign in
        }}
        disabled={isInProgress}
      />
      ;
    </View>
  );
}
const styles = StyleSheet.create({
  google: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#4285F4",
    borderRadius: 5,
    marginTop: 10,
  },
});
export default Home;
