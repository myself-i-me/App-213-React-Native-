import {
  Dimensions,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth-context";
import {Image} from 'expo-image'
const { width, height } = Dimensions.get("window");
import { updateStatus } from "../../util/adminApis";
import LoadingOverlay from "../ui/LoadingOverlay";

import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

let customFonts = {
  'Fraunces': require('../../assets/fonts/Fraunces.ttf'),
  'Poppins': require('../../assets/fonts/Poppins.ttf'),
  'Fraunces-regular': require('../../assets/fonts/FrauncesRegular.ttf'),
  'Fraunces-semibold': require('../../assets/fonts/Fraunces_72pt-SemiBold.ttf')
};


export default function DocListAdminItem({ item, navigation }) {
  
  const [isAvailable, setisAvailable] = useState(item.available);
  const [isDownloadable, setisDownloadable] = useState(item.downloadable);
  const [isOffline, setIsOffline] = useState(item.offline);

  const [isChanging, setIsChanging] = useState(false);

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

  const authctx = useContext(AuthContext);

  async function changeStatus(type,status) { 
    console.log('status is', status)
    setIsChanging(true)
    try {
      let response = await updateStatus(type,item.id,!status,authctx.token);
      if(type == 'available') {
        setisAvailable(!isAvailable)
      } else if(type == 'downloadable') {
        setisDownloadable(!isDownloadable)
      } else if(type == 'offline') {
        setIsOffline(!isOffline)
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to update status')
      console.log('error in updating status',error)
      if(type == 'available') {
        setisAvailable(!isAvailable)
      } else if(type == 'downloadable') {
        setisDownloadable(!isDownloadable)
      } else if(type == 'offline') {
        setIsOffline(!isOffline)
      }
    }
    
    setIsChanging(false)

  }

  // if(isChanging){
  //   console.log('hello changinf')
  //   return <LoadingOverlay  message='Updating status'/>
  // }

  return (
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
          paddingTop: height * 0.0,
          paddingLeft: width * 0.03,
          flex: 2,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: 'Fraunces-semibold'}}>{item.title}</Text>

        <View style={{ flexDirection: "row" }}>
          <Switch
            trackColor={{ false: "red", true: "green" }}
            style={styles.switch}
            onValueChange={() =>
              changeStatus('available',isAvailable)
            }
            value={isAvailable}
          />
          <Text style = {styles.params}>Available</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Switch
            trackColor={{ false: "red", true: "green" }}
            style={styles.switch}
            onValueChange={() =>
              changeStatus('downloadable',isDownloadable)
            }
            value={isDownloadable}
          />
          <Text style = {styles.params}>Downloadable</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Switch
            trackColor={{ false: "red", true: "green" }}
            style={styles.switch}
            onValueChange={() =>
              changeStatus('offline',isOffline)
            }
            value={isOffline}
          />
          <Text style = {styles.params}>Offline Available</Text>
        </View>
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
            source={{
              uri: "http://ihiapps.com:8080/wildbase/downloadFile/flags/" + item.flagPath,
              method: "POST",
              headers: {
                Authorization: "Bearer " + authctx.token,
              },
            }}
            style={{ height: 25, width: 40, resizeMode: "cover" }}
          />
        </View>
      </View>
    </View>
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
  params:{
    fontFamily:'Poppins'
  }
});
