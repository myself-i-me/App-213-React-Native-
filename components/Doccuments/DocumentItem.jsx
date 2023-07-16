import {Dimensions,StyleSheet,Text,TouchableOpacity,View} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth-context";
import {Image} from 'expo-image'

const { width, height } = Dimensions.get("window");
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

let customFonts = {
  'Fraunces': require('../../assets/fonts/Fraunces.ttf'),
  'Poppins': require('../../assets/fonts/Poppins.ttf'),
  'Fraunces-regular': require('../../assets/fonts/FrauncesRegular.ttf'),
  'Fraunces-semibold': require('../../assets/fonts/Fraunces_72pt-SemiBold.ttf')
};

export default function DocumentItem({ item, navigation }) {
  const authctx = useContext(AuthContext);
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);

  useEffect(() =>{
    async function  loadFontsAsync() {
      await Font.loadAsync(customFonts);
      setIsFontsLoaded(true);
      SplashScreen.hideAsync()
    }
    loadFontsAsync()
  },[])
  
  if(!isFontsLoaded){
    SplashScreen.preventAutoHideAsync();
    return null
  }

  return (
    <TouchableOpacity
      style={{ overflow: "hidden", height: height * 0.23, backgroundColor:'white', marginVertical:5, padding:0 }}
      onPress={() => navigation.navigate("docdetails", { item: item })}
    >
      <View
        style={{
          height: height * 0.25,
          borderColor: "blue",
          borderWidth: 0,
          // flex: 1,
          flexDirection: "row",
          // marginVertical: height * 0.01,
          overflow:'hidden',
        }}
      >
        <View style={{  overflow: "hidden", width:120, height: height * 0.225}}>
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
              resizeMode: "stretch",
              width: 120,
              // height:128,
              alignSelf: "center",
              borderRadius: 6,
              borderColor: "#145C7B",
              height: height * 0.24,
            }}
          />
        </View>
        <View
          style={{
            paddingTop: 0,
            paddingLeft: 12,
            flex: 2,
            flexDirection: "column",
            justifyContent: "space-between",
            height: height * 0.225,
            // backgroundColor:'#a2b1c3'
          }}
        >
          <Text style={{ fontSize: 18, fontFamily: 'Fraunces-semibold', marginBottom:18 }}>{
            item.title.length < 50 ? item.title : item.title.slice(0,50) + '...'
          }</Text>

          <View
            style={{
              paddingBottom: 9,
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderColor: "#145C7B",
            }}
          >
            <Text style={{ fontSize: 14, fontFamily:'Poppins' }}>{item.country}</Text>
            <Image
              onError={(err) =>{console.log('err is', err)}}
              source={{
                uri: "http://ihiapps.com:8080/wildbase/downloadFile/flags/" + item.flagPath,
                method: "POST",
                headers: {
                  Authorization: "Bearer " + authctx.token,
                },
              }}
              style={{ height: 20, width: 34, contentFit: "cover", borderWidth:0, borderColor:'red', resizeMode:'contain' }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
