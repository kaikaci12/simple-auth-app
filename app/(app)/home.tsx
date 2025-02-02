import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await AsyncStorage.getItem("@user_data");
        if (userData) {
          setIsAuthenticated(true);
        } else {
          router.push("/signIn"); // Redirect to Sign In if not authenticated
        }
      } catch (e) {
        console.error("Error checking authentication", e);
      }
    };

    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <Text style={styles.text}>Welcome to the Home Page!</Text>
      ) : null}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f7",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
