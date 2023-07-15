import { AuthContext } from "../store/auth-context";
import { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { forgotPasswordFunction } from '../util/auth';
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';


let customFonts = {
  'Fraunces': require('../assets/fonts/Fraunces.ttf'),
  'Poppins': require('../assets/fonts/Poppins.ttf')
};

function ForotPasswordScreen({navigation}) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
  });

  const [enteredEmail, setEnteredEmail] = useState("");
  const { email: emailIsInvalid, password: passwordIsInvalid } = credentialsInvalid;
  const leaf = require('../assets/leaf.png');
  const elephant_cropped = require('../assets/elephant-cropped.png');
  const {width, height} = Dimensions.get('window');

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

  async function forgotPasswordHandler(email) {
    try {
      console.log('..')
      let response = await forgotPasswordFunction(email, password);
      navigation.navigate('Login')
    } catch (error) {
      console.log("error is", error);
      Alert.alert(
        "Invalid Email",
        "Email doesn't exist"
      );
    }
  }

  function submitHandler(email) {
    email = email.trim();
    const emailIsValid = email.includes("@");
    if (!emailIsValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
      });
      return;
    }
    forgotPasswordHandler(email);
  }

  function onSubmit() {
    submitHandler(enteredEmail);
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
    }
  }


  return (
    <View style={{alignItems:'center',backgroundColor: 'white',flex:1,paddingTop:height*0.27, flex:1}}>
      <Image
      source={elephant_cropped}
      style={{position:'absolute', top: height*0, width: width*1.05, height:height*0.25}}
      resizeMode="stretch"
      />
      <View style={{width:width*0.8}} >
        <Image 
        source={leaf}
        style={{height:100, width:100, borderWidth:0, alignSelf:'center'}}
        />
        <Text style={{fontSize:35, fontWeight:'700', color:'#1a475c', textAlign:'center', marginBottom:10, fontFamily:'Poppins'}}>Welcome back</Text>
        <Text style={{textAlign:'center', color:"#145C7B", marginBottom:10, fontFamily:'Poppins'}}>Login into your account</Text>
        <Input
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
          placeHolder= 'Email Address'
        />
        {/* <Button title='Send otp' backgroundColor="#145C7B" color="white" onPress={onSubmit}/> */}
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={{color:'white', fontSize:18, fontFamily:'Poppins-SemiBold', fontWeight:600, width:width*0.75, height:30,textAlign:'center',textAlignVertical:'center'}}>Send OTP</Text>
          </TouchableOpacity>
        <Text style={{marginVertical:10, textAlign:'center', color:'grey', fontFamily:'Poppins'}}>Don't have an account?
            <Text style={{color:'#145C7B', textDecorationLine:'underline', fontFamily:'Poppins'}} onPress={()=>navigation.navigate('SignUp')}>Sign up</Text>
        </Text>
      </View>
    </View>
  );
}

export default ForotPasswordScreen;

const styles = StyleSheet.create({
  button:{
    borderRadius: 11,
    backgroundColor: "#145C7B",
    padding: 10,
    marginTop:26,
    // width:236,
    alignSelf:'center'
  }
})
