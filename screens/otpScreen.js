import { useState, useContext, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Keyboard, Dimensions, Image, ScrollView } from "react-native";
import OTPInput from "../components/OTP/otpinput";
import { ButtonContainer, ButtonText } from "../components/OTP/styles";
import { AuthContext } from '../store/auth-context';
import { validateOtpFunction } from "../util/auth";

const {width, height} = Dimensions.get('window');
const elephant_cropped = require('../assets/elephant-cropped.png');
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

let customFonts = {
  'Fraunces': require('../assets/fonts/Fraunces.ttf'),
  'Poppins': require('../assets/fonts/Poppins.ttf')
};

export default function OtpScreen({route, navigation}) {
  let email = route?.params?.email;

  console.log(route.params)

  const [otpCode, setOTPCode] = useState("");
  const [isPinReady, setIsPinReady] = useState(false);
  const maximumCodeLength = 4;


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

  async function validateOtp(otpCode){
    const response = await validateOtpFunction(otpCode,email);
    if(response.data.message == 'Invalid OTP.'){
      setOTPCode("")
      alert("Invalid Code");
    }
    else {
      navigation.navigate('Login');
    }
  }  
  
  return (
    <ScrollView style = {{backgroundColor:'white'}} keyboardShouldPersistTaps='handled'>
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Image
      source={elephant_cropped}
      style={{position:'absolute', top: height*0.047, width: width*1.05, height:height*0.25}}
      />
      <View style={{paddingTop:100}}>
      <Text style= {{color:"#145C7B", marginBottom:10 ,textAlign:'center', fontSize:30, fontWeight:700, fontFamily:'Poppins'}}>OTP Verification</Text>
      <Text style={{color:'grey', fontFamily:'Poppins'}}>An authentication code has been sent to your email id</Text>
      <Text style={{color:'grey', fontFamily:'Poppins'}}>{email}</Text>
      </View>
      <Text style={{color:"#145C7B", fontSize:24,fontFamily:'Poppins', marginTop:40, marginBottom:10, textAlign:'center', fontSize:30, fontWeight:700}} >Enter OTP</Text>
      <OTPInput
        code={otpCode}
        setCode={setOTPCode}
        maximumLength={maximumCodeLength}
        setIsPinReady={setIsPinReady}
      />
      <Text style={{marginTop:50, marginBottom:50, fontFamily:'Poppins'}}>Resend OTP in <Text style={{fontFamily:'Poppins',color:'#00B0B7'}}>{24} Second</Text></Text>
      <ButtonContainer
        disabled={!isPinReady} onPress={() =>{
          validateOtp(otpCode)
        }}
        style={{
          backgroundColor: !isPinReady ? "grey" : "#145C7B",
        }} 
      >
        <ButtonText
          style={{
            color: !isPinReady ? "black" : "#EEEEEE",
            fontFamily:'Poppins'
          }} 
        >
          Verify now
        </ButtonText>
      </ButtonContainer>
      <StatusBar style="auto" />
    </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign:"center",
    paddingHorizontal: width*0.1,
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop:200

  },
});