import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token, refreshToken) => new Promise((res, rej) => {}),
  logout: () => new Promise((res, rej) => {}),
  refreshToken: "",
  userId: "",
  userName: '',
  userEmail:'',
  role: "",
  language: "",
  storeLanguage: (lanuage) => {},
  theme: "",
  storeTheme: (theme) => {},
  setUserDetails: (userid,userName, userEmail,role) => {},
  getUserDetails: () => new Promise((res,rej) =>{})
});

function AuthcontextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [refreshToken, setrefreshToken] = useState();

  const [userId, setUserId] = useState("");

  const [role, setRole] = useState("ROLE_USER");
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("Blue");

  function storeLanguage(language) {
    setLanguage(language);
  }

  function storeTheme(theme) {
    setTheme(theme);
  }

  async function authenticate(token, refreshToken) {
    setAuthToken(token);
    setrefreshToken(refreshToken);
    await AsyncStorage.setItem("quickref_token", token);
    await AsyncStorage.setItem("quickref_refresh_token", refreshToken);
    await AsyncStorage.getItem("quickref_userid")
      .then((userId) => {
        setUserId(String(userId));
      })
      .catch((err) => {
        console.log(err, "--");
      });
    await AsyncStorage.getItem("quickref_role").then((role) => {
      setRole(role);
    });
  }

  function setUserDetails(userId,userName, userEmail, role) {
    setUserId(String(userId));
    setRole(role);
    console.log('in cotx', userId,userEmail,userName,role)
    AsyncStorage.setItem("quickref_userid", userId);
    AsyncStorage.setItem("quickref_userName", userName);
    AsyncStorage.setItem("quickref_userEmail", userEmail);
    AsyncStorage.setItem("quickref_role", role);
  }

  async function getUserDetails() {
    const userId =  await AsyncStorage.getItem("quickref_userid");
    const userName =  await AsyncStorage.getItem("quickref_userName");
    const userEmail =  await AsyncStorage.getItem("quickref_userEmail");
    console.log({userId,userName,userEmail})
    return {userId,userName,userEmail};
  }

  async function logout() {
    setAuthToken(null);
    setrefreshToken(null);
    await AsyncStorage.removeItem("quickref_token");
    await AsyncStorage.removeItem("quickref_refresh_token");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    refreshToken: refreshToken,
    setUserDetails: setUserDetails,
    userId: userId,
    role: role,
    language: language,
    storeLanguage: storeLanguage,
    theme: theme,
    storeTheme: storeTheme,
    getUserDetails: getUserDetails
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthcontextProvider;
