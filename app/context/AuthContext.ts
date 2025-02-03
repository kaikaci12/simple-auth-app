import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
} from "react";

const TOKEN_KEY = "my-jwt";
export const API_URL = "http://localhost:3000";

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});
const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const register = () => {};
  const login = () => {};
  const logOut = () => {};
  return (
    <AuthContext.Provider
      value={{
        signIn: login,
        signOut: logOut,
        session: null,
        isLoading: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// // This hook can be used to access the user info.
// export function useSession() {
//   const value = useContext(AuthContext);
//   if (process.env.NODE_ENV !== "production") {
//     if (!value) {
//       throw new Error("useSession must be wrapped in a <SessionProvider />");
//     }
//   }

//   return value;
// }

// export function SessionProvider({ children }: PropsWithChildren) {
//   const [session, setSession] = useStorageState("session");
//   const isLoading = session === undefined;

//   return (
//     <AuthContext.Provider
//       value={   signIn: () => {

//         setSession("xxx");
//       },
//       signOut: () => {
//         setSession(null);
//       },
//       session,
//       isLoading,
//     }}

//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }
