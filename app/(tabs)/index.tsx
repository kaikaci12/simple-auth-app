import { ActivityIndicator, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";

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
    </View>
  );
}
export default Home;
