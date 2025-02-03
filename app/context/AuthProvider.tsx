import React, {
  useState,
  useEffect,
  type PropsWithChildren,
  useContext,
} from "react";
import SecureStore from "expo-secure-store";
import { AuthContext } from "./authContext";

const TOKEN_KEY = "my-jwt";

// AuthProvider Component
export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  //
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

  // Register function (placeholder)
  const register = async (email: string, password: string) => {
    console.log("Registering user:", email);
    // Add registration logic here
  };

  // Login function
  const login = async (email: string, password: string) => {
    // Mock login logic, replace with actual API call
    setAuthState({
      token: "mock-jwt-token",
      authenticated: true,
    });
    console.log("User logged in successfully");

    // Save token securely
    await SecureStore.setItemAsync(TOKEN_KEY, "mock-jwt-token");
  };

  // Logout function
  const logOut = async () => {
    setAuthState({
      token: null,
      authenticated: false,
    });
    console.log("User logged out successfully");

    // Remove token from secure storage
    await SecureStore.deleteItemAsync(TOKEN_KEY);
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

export const useAuth = () => useContext(AuthContext);
