import React from "react";
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

const { width, height } = Dimensions.get("window");

const profileImage = require("./assets/profile.png");
const CustomSidebarMenu = (props) => {
  const BASE_PATH =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/";
  const proileImage = "react_logo.png";
  const name = "John Doe";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{height:height*0.2, paddingLeft:15}}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            alignItems: "center",
            // flexWrap: "wrap",
            paddingTop: 20,
            height:height*0.18,
            justifyContent:'space-between'
          }}
        >
          <Image source={profileImage} style={styles.sideMenuProfileIcon} />
          <Text
            style={{
              backgroundColor: "transparent",
              flex: 2,
              fontSize: 23,
              fontWeight: "bold",
              paddingLeft:15
            }}
          >
            {name}
          </Text>
        </View>
        <Text style={{  backgroundColor: "transparent", fontSize:20, paddingLeft:15 }}>john.doe@gmail.com</Text>
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
    // width: width * 0.27,
    height: width * 0.21,
    borderRadius: 100 / 2,
    alignSelf: "flex-start",
    // padding:width*0.05,
    marginLeft: width * 0.05,
    marginTop: height * 0.04,
    flex: 1,

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
