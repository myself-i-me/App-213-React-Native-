import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {useEffect, useState} from "react";
import Button from "../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
const {width, height} = Dimensions.get('window');
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

let customFonts = {
  'Fraunces': require('../assets/fonts/Fraunces.ttf'),
  'Poppins-SemiBold': require('../assets/fonts/Poppins600.ttf'),
  'Poppins': require('../assets/fonts/Poppins.ttf')
};

export default function LandingPage({navigation}) {
  const navigator = useNavigation()
  const backGroundImage = require("../assets/main-background.png");
  // SplashScreen.preventAutoHideAsync();


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
    
  const login = () =>{
    navigator.navigate('Login')
  }
  const signUp = () =>{
    navigator.navigate('SignUp')
  }
  

   return (
    <View style={styles.container}>
        <ImageBackground
          source={backGroundImage}
          resizeMode="cover"
          style={styles.imageStyle}
        >
            <Text style={styles.header}>QuickRef</Text> 
            <Text style={styles.subHeading}>Official UNODC library of guidebooks & reference material for wildlife personnel</Text>

            <View style={{position:'absolute', bottom:45, alignSelf:'center'}}>
              <TouchableOpacity style={styles.signupButton} onPress={()=>navigation.navigate('SignUp')}>
                <Text style={{color:'#207398', fontSize:18, fontFamily:'Poppins-SemiBold', fontWeight:600, width:width*0.7, height:30,textAlign:'center',textAlignVertical:'center',backgroundColor:'transparent'}} >Sign up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginButton} onPress={()=>navigation.navigate('Login')}>
                <Text style={{color:'white', fontSize:18, fontFamily:'Poppins-SemiBold', fontWeight:600, width:width*0.7, height:30,textAlign:'center', textAlignVertical:'center',}}>Login</Text>
              </TouchableOpacity>
            </View>
        </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height * 1.05,
    backgroundColor: "blue",
    fontFamily: "Poppins",
  },
  header: {
    fontSize: 45,
    fontWeight: "600",
    marginTop: 35,
    color: "white",
    fontFamily: "Poppins-SemiBold",
    marginBottom:0,
    alignSelf:'center'
  },
  subHeading: {
    fontFamily:'Poppins',
    // backgroundColor: "pink",
    alignSelf:'center',
    // width: 260,
    fontSize: 23,
    fontWeight: '400',
    color: "white",
    lineHeight: 30,
    // marginLeft:36
  },
  imageStyle: {
    flex: 1,
    paddingHorizontal:width*0.06
    // alignItems: "center",
  },

  signupButton: {
    borderRadius: 11,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#145C7B",
    padding: 10,
  

    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  loginButton: {
    borderRadius: 11,
    backgroundColor: "#145C7B",
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginTop:19
  },
});