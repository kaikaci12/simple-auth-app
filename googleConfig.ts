import { GoogleSignin } from "@react-native-google-signin/google-signin";
const googleConfig = GoogleSignin.configure({
  webClientId: "<FROM DEVELOPER CONSOLE>", // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile

  forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.

  iosClientId: "<FROM DEVELOPER CONSOLE>", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});
