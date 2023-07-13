import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../store/auth-context";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

let customFonts = {
  Fraunces: require("../assets/fonts/Fraunces.ttf"),
  Poppins: require("../assets/fonts/Poppins.ttf"),
};

function Logout() {
  const authctx = useContext(AuthContext);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Are you sure you want to logout</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          authctx.logout();
        }}
      >
        <Text
          style={{
            fontWeight: 500,
            color: "white",
            marginVertical: 10,
            marginHorizontal: 20,
            height: 20,
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default Logout;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  button: {
    backgroundColor:'#145C7B',
    borderRadius:20,
    marginHorizontal:5,
    minWidth:50,
    textAlignVertical:'center',
    textAlign:'center',
},
});
