import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}
import SecureStore from "expo-secure-store";
const TOKEN_KEY = "my-jwt";
export const API_URL = "http://localhost:3000";

const AuthContext = createContext<AuthProps>({
  onLogin,
  authState,
  onLogout,
  onRegister,
});

const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("stored token", token);
      if (token) {
        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const register = (email: string, password: string) => {};
  const login = async (email: string, password: string) => {
    setAuthState({
      token: "data",
      authenticated: true,
    });
    console.log("user logged in succesfully");
    await SecureStore.setItemAsync(TOKEN_KEY, "data");
  };
  const logOut = async () => {
    setAuthState({
      token: null,
      authenticated: false,
    });
    console.log("user logged out in succesfully");
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  };
  const value = {
    onRegister: register,
    onLogIn: login,
    onLogOut: logOut,
    authState,
  };
};
