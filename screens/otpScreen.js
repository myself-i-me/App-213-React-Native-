import { useState, useContext, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Keyboard, Dimensions, Image, ScrollView } from "react-native";
import OTPInput from "../components/OTP/otpinput";
import { ButtonContainer, ButtonText } from "../components/OTP/styles";
import { AuthContext } from '../store/auth-context';
import { validateOtpFunction } from "../util/auth";

const {width, height} = Dimensions.get('window');
const elephant_cropped = require('../assets/elephant-cropped.png');

export default function OtpScreen({route, navigation}) {
  let email = route?.params?.email;

  console.log(route.params)

  const [otpCode, setOTPCode] = useState("");
  const [isPinReady, setIsPinReady] = useState(false);
  const maximumCodeLength = 4;

  const [timeLeft, setTimeLeft] = useState(30);

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

  // useEffect(() =>{
  //   if(timeLeft==0){
  //     clearInterval(myInterval)
  //   }
  // },[])
  
  // if('wrongotp') {
  //   myInterval = setInterval(() =>{
  //     setTimeLeft(timeLeft-1)
  //   }, 1000);
  // }


  
  
  return (
    <ScrollView style = {{backgroundColor:'white'}} keyboardShouldPersistTaps='handled'>
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Image
      source={elephant_cropped}
      style={{position:'absolute', top: height*0.047, width: width*1.05, height:height*0.25}}
      />
      <View style={{paddingTop:100}}>
      <Text style= {{color:"#207398", fontSize:24, marginBottom:10 ,textAlign:'center', fontSize:30, fontWeight:500}}>OTP Verification</Text>
      <Text style={{color:'grey'}}>An authentication code has been sent to your email id</Text>
      <Text style={{color:'grey'}}>{email}</Text>
      </View>
      <Text style={{color:"#207398", fontSize:24, marginBottom:10, textAlign:'center', fontSize:30, fontWeight:500}} >Enter OTP</Text>
      <OTPInput
        code={otpCode}
        setCode={setOTPCode}
        maximumLength={maximumCodeLength}
        setIsPinReady={setIsPinReady}
      />
      <Text style={{marginTop:50, marginBottom:50}}>Resend OTP in <Text style={{color:'#207398'}}>{timeLeft} Second</Text></Text>
      <ButtonContainer
        disabled={!isPinReady} onPress={() =>{
          validateOtp(otpCode)
        }}
        style={{
          backgroundColor: !isPinReady ? "grey" : "#207398",
        }} 
      >
        <ButtonText
          style={{
            color: !isPinReady ? "black" : "#EEEEEE",
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