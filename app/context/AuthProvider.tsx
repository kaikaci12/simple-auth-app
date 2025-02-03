import React, {
  useState,
  useEffect,
  type PropsWithChildren,
  useContext,
} from "react";
import SecureStore from "expo-secure-store";
import { auth } from "@/firebaseConfig"; // Import the auth instance from firebaseConfig
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import AuthContext from "./AuthContext";

const TOKEN_KEY = "my-jwt";

// AuthProvider Component
const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        setAuthState({
          token,
          authenticated: true,
        });
        console.log("Stored token loaded:", token);
      }
    };
    loadToken();
  }, []);

  // Register function using Firebase Auth
  const register = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User registered:", user);
      // Store token (you can use getIdToken or custom claims if needed)
      const token = await user.getIdToken();
      setAuthState({
        token,
        authenticated: true,
      });
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  // Login function using Firebase Auth
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      setAuthState({
        token,
        authenticated: true,
      });
      console.log("User logged in successfully, Token:", token);
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Logout function using Firebase Auth
  const logOut = async () => {
    try {
      await signOut(auth);
      setAuthState({
        token: null,
        authenticated: false,
      });
      console.log("User logged out successfully");
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Value passed to AuthContext.Provider
  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logOut,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
