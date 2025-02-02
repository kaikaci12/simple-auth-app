import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const userData = await AsyncStorage.getItem("@user_data");
      if (userData) {
        const { username: storedUsername, password: storedPassword } =
          JSON.parse(userData);
        if (username === storedUsername && password === storedPassword) {
          alert("Login successful!");
          router.push("/(app)/home");
        } else {
          alert("Invalid username or password");
        }
      } else {
        alert("No account found. Please sign up first.");
      }
    } catch (error) {
      console.error("Error reading data from AsyncStorage", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign In</Text>
        <FontAwesome name="sign-in" size={50} color="blue" />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Submit" onPress={handleSignIn} />

      <Text style={styles.signupText}>Don't have an account?</Text>
      <Link href="/signUp" style={styles.signupLink}>
        Sign up
      </Link>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f4f7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    height: 50,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  signupText: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
  },
  signupLink: {
    fontSize: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});
