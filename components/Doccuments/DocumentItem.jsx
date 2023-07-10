import {Dimensions,StyleSheet,Switch,Text,TouchableOpacity,View} from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import {Image} from 'expo-image'
// import NetworkImage from "../ui/networkImage";

const { width, height } = Dimensions.get("window");

export default function DocumentItem({ item, navigation }) {
  const authctx = useContext(AuthContext);

  return (
    <TouchableOpacity
      style={{ overflow: "hidden" }}
      onPress={() => navigation.navigate("docdetails", { item: item })}
    >
      <View
        style={{
          height: height * 0.25,
          borderColor: "blue",
          borderWidth: 0,
          flex: 1,
          flexDirection: "row",
          marginVertical: height * 0.01,
        }}
      >
        <View style={{ flex: 1.1, overflow: "hidden" }}>
          <Image
            onError={(err) =>{console.log('err is', err)}}
            source={{
              uri: "http://ihiapps.com:8080/wildbase/downloadFile/images/" + item.image,
              method: "POST",
              headers: {
                Authorization: "Bearer " + authctx.token,
              },
            }}
            style={{
              flex: 1,
              borderWidth: 1,
              resizeMode: "cover",
              width: width * 0.32,
              alignSelf: "center",
              borderRadius: 10,
              borderColor: "#145C7B",
              borderWidth: 2,
              height: height * 0.25,
            }}
          />
        </View>
        <View
          style={{
            paddingTop: height * 0.02,
            paddingLeft: width * 0.03,
            flex: 2,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 500 }}>{item.title}</Text>

          <View
            style={{
              paddingBottom: height * 0.02,
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 2,
              borderColor: "#145C7B",
            }}
          >
            <Text style={{ fontSize: 20 }}>{item.country}</Text>
            <Image
              onError={(err) =>{console.log('err is', err)}}
              source={{
                uri: "http://ihiapps.com:8080/wildbase/downloadFile/flags/" + item.flagPath,
                method: "POST",
                headers: {
                  Authorization: "Bearer " + authctx.token,
                },
              }}
              style={{ height: 25, width: 40, contentFit: "cover" }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  switch: {
    alignSelf: "flex-start",
    paddingVertical: -5,
    borderColor: "green",
    borderWidth: 1,
    margin: 0,
    height: 20,
  },
});
