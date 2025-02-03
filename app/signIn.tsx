import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./context/AuthProvider";

const SignIn = () => {
  const router = useRouter();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();

  const handleSignIn = async () => {
    const result = await onLogin!(email, password);

    if (result && result.eror) {
      alert(result.msg);
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
        placeholder="email"
        value={email}
        onChangeText={setemail}
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
