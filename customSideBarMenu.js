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
import { DocContext } from "./store/doc-context";
import { useRoute } from "@react-navigation/native";
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

  const authctx = useContext(AuthContext);
  console.log('authctx is',authctx.userId)
  const name = "John Doe";
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);
  useEffect(() => {
    // console.log('routes are', route.params)
    console.log('in custom side bar menu', props)
    async function loadFontsAsync() {
      await Font.loadAsync(customFonts);
      setIsFontsLoaded(true);
      SplashScreen.hideAsync();
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
            {name}
          </Text>
        </View>
        <Text style={{ fontFamily:'Poppins', backgroundColor: "transparent", fontSize:20, paddingLeft:15 }}>john.doe@gmail.com</Text>
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
    borderColor:'blue'
  },
  customItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomSidebarMenu;
