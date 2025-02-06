import React, {
  useState,
  useEffect,
  type PropsWithChildren,
  useContext,
} from "react";
import * as SecureStore from "expo-secure-store";
import { auth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import AuthContext from "./AuthContext";

const TOKEN_KEY = "my-jwt";

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
  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User registered:", user);

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
      throw new Error("Invalid credentials");
    }
  };

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
      console.log("Logout error:", error);
    }
  };

  const githubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      setAuthState({
        token,
        authenticated: true,
      });
      console.log("User logged in with GitHub:", user);
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (error) {
      console.error("GitHub sign-in error:", error);
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logOut,
    onGithubSignIn: githubSignIn, // Expose GitHub sign-in function
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
