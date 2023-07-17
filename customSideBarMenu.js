import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  Dimensions,
} from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthContext } from "./store/auth-context";

let customFonts = {
  Fraunces: require("./assets/fonts/Fraunces.ttf"),
  Poppins: require("./assets/fonts/Poppins.ttf"),
  "Fraunces-regular": require("./assets/fonts/FrauncesRegular.ttf"),
  "Fraunces-semibold": require("./assets/fonts/Fraunces_72pt-SemiBold.ttf"),
};

const { width, height } = Dimensions.get("window");

const profileImage = require("./assets/profile.png");
const CustomSidebarMenu = (props) => {

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const authctx = useContext(AuthContext);
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);
  useEffect(() => {
    console.log('in custom side bar menu', props);
    async function loadFontsAsync() {
      let userData = await authctx.getUserDetails();
      await Font.loadAsync(customFonts);
      setIsFontsLoaded(true);
      SplashScreen.hideAsync();
      setUserEmail(userData.userEmail);
      setUserName(userData.userName)
    }
    loadFontsAsync();
  }, []);

  if (!isFontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{height:height*0.24}}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            alignItems: "center",
            // flexWrap: "wrap",
            paddingTop: 20,
            height:height*0.2,
            justifyContent:'space-between',
            backgroundColor:'white'
          }}
        >
          <Image source={profileImage} style={styles.sideMenuProfileIcon} />
          <Text
            style={{
              backgroundColor: "transparent",
              flex: 2,
              fontSize: 23,
              fontFamily: 'Poppins',
              paddingLeft:15
            }}
          >
            {userName}
          </Text>
        </View>
        <Text style={{ fontFamily:'Poppins', backgroundColor: "transparent", fontSize:20, paddingLeft:15 }}>{userEmail}</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: "cover",
    width: 105,
    height: 105,
    borderRadius: 105,
    alignSelf: "flex-start",
    // padding:width*0.05,
    marginLeft: width * 0.05,
    marginTop: height * 0.04,
    // flex: 1,

    // backgroundColor:'red',
    borderWidth: 3,
    borderColor:'#08B783'
  },
  customItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomSidebarMenu;
