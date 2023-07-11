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

            <View style={styles.container2}>
                <Text style={{color:'white', fontSize:30, paddingVertical:0,fontFamily: 'Poppins'}}>Official UNODC library</Text>
                <Text style={{color:'white', fontSize:30,fontFamily: 'Poppins'}}>of guidebooks &</Text>
                <Text style={{color:'white', fontSize:30,fontFamily: 'Poppins'}}>reference material</Text>
                <Text style={{color:'white', fontSize:30,fontFamily: 'Poppins'}}>for wildlife personnel</Text>
                <TouchableOpacity style={{marginTop:20}}>
                <Button title='Sign up' backgroundColor="white" color='#207398' onPress={()=>navigation.navigate('SignUp')} />
                </TouchableOpacity>
                <TouchableOpacity style={{marginVertical:10, borderColor:'white', borderWidth:1, borderRadius:8}}>
                <Button title='Login' backgroundColor="#207398" onPress={()=>navigation.navigate('Login')}/>
                </TouchableOpacity>
            </View>
        </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:width,
    height:height*1.05,
    backgroundColor:'blue',
    fontFamily: 'Poppins'
  },
  header: {
    fontSize: 50,
    fontWeight: "bold",
    position: "absolute",
    top: 50,
    color:'white',
    fontFamily: 'Poppins'
  },
  imageStyle: {
    flex: 1,
    alignItems:'center'
  },
  container2: {
    position:'absolute',
    bottom:50
  },
  signupButton: {
    backgroundColor:'white',
    color:'#207398'
  },
  loginButton: {
    backgroundColor:'#207398',
    color:'white'
  }
});