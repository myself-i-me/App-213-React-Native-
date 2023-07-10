import { AuthContext } from "../store/auth-context";
import { useContext, useState } from "react";
import { Alert, Dimensions, StyleSheet, View, Image, Text, TextInput } from "react-native";
import { forgotPasswordFunction } from '../util/auth';
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function ForotPasswordScreen({navigation}) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
  });

  const [enteredEmail, setEnteredEmail] = useState("");
  const { email: emailIsInvalid, password: passwordIsInvalid } = credentialsInvalid;
  const leaf = require('../assets/leaf.png');
  const elephant_cropped = require('../assets/elephant-cropped.png');
  const {width, height} = Dimensions.get('window');

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
    <View style={{alignItems:'center',backgroundColor: 'white',flex:1,paddingTop:height*0.27}}>
      <Image
      source={elephant_cropped}
      style={{position:'absolute', top: height*0.047, width: width*1.05, height:height*0.25}}
      />
      <View style={{width:width*0.8}} >
        <Image 
        source={leaf}
        style={{height:100, width:100, borderWidth:1, alignSelf:'center'}}
        />
        <Text style={{fontSize:35, fontWeight:'500', color:'#1a475c', textAlign:'center', marginBottom:10}}>Welcome back</Text>
        <Text style={{textAlign:'center', color:"#207398", marginBottom:10}}>Login into your account</Text>
        <Input
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
          placeHolder= 'Email Address'
        />
        <Button title='Send otp' backgroundColor="#207398" color="white" onPress={onSubmit}/>
        <Text style={{marginVertical:10, textAlign:'center', color:'grey'}}>Don't have an account?
            <Text style={{color:'#207398', textDecorationLine:'underline'}} onPress={()=>navigation.navigate('SignUp')}>Sign up</Text>
        </Text>
      </View>
    </View>
  );
}

export default ForotPasswordScreen;

