import { AuthContext } from "../store/auth-context";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { createUser, sendOtp } from "../util/auth";
const { width, height } = Dimensions.get("window");
import Checkbox from 'expo-checkbox';
import axios from "axios";
function RegisterScreen() {
  const elephant_cropped = require("../assets/elephant-cropped.png");
  const [countries, setCountries] = useState([]);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const navigation = useNavigation();
  const [enteredfirstName, setenteredfirstName] = useState("");
  const [enteredlastName, setenteredlastName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredAreaRegion, setEnteredAreaRegion] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    areaRegion: false,
  });

  const {
    firstName: firstNameIsInvalid,
    lastName: lastNnameIsInvalid,
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
    areaRegion: areaRegionIsInvalid,
  } = credentialsInvalid;

  const authctx = useContext(AuthContext);

  useEffect(() => {
    console.log(authctx.token,authctx.refreshToken)
    axios
      .get("http://ihiapps.com:8080/wildbase/countries/list")
      .then((resp) => {
        let data = resp.data.response.data.map((item) => item?.name);
        setCountries(data);
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  }, []);

  async function SignUpHandler({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    areaRegion,
  }) {
    setIsSendingOtp(true);
    const token = createUser(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      areaRegion,
      "ENGLISH",
      "role"
    )
      .then(async () => {
        const otp = sendOtp(email)
          .then(async () => {
            await navigation.navigate("Otp", {
              email: email,
            });
            setTimeout(() => {
              setIsSendingOtp(false);
            }, 1000);
          })
          .catch((err) => {
            setIsSendingOtp(false);
            Alert.alert("Error in Sending OTP");
          });
      })
      .catch((err) => {
        setIsSendingOtp(false);
        console.log("err", err);
        Alert.alert(
          "Registration failed ",
          "Please check your input and try again later"
        );
      });
  }

  function submitHandler(credentials) {
    let { firstName, lastName, email, password, confirmPassword, areaRegion } =
      credentials;
    console.log("cred are", credentials);
    email = email.trim();
    password = password.trim();

    const firstNameIsValid = !!firstName;
    const lastNameIsValid = !!lastName;
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 5;
    const passwordsAreEqual = password === confirmPassword;
    const countryValid = !!areaRegion;

    if (
      (!firstNameIsValid && !lastNameIsValid && !emailIsValid) ||
      !passwordIsValid ||
      (!passwordsAreEqual && !countryValid)
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
        firstName: !!firstName,
        lastName: !!lastName,
      });
      return;
    }
    SignUpHandler({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      areaRegion,
    });
  }

  function onSubmit() {
    submitHandler({
      firstName: enteredfirstName,
      lastName: enteredlastName,
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      areaRegion: enteredAreaRegion,
    });
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "firstName":
        setenteredfirstName(enteredValue);
        break;
      case "lastName":
        setenteredlastName(enteredValue);
        break;
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
      case "areaRegion":
        setEnteredAreaRegion(enteredValue);
        break;
    }
  }

  if (isSendingOtp) {
    return <LoadingOverlay />;
  }

  return (
    <SafeAreaView>
      <ScrollView style = {{}} keyboardShouldPersistTaps='handled'>
      <View style={{ paddingTop: 230 }}>
        <Image
          source={elephant_cropped}
          style={{
            position: "absolute",
            top: height * 0.047,
            width: width * 1.05,
            height: height * 0.25,
          }}
        />
        <View style={{ width: width * 0.8, alignSelf: "center" }}>
          <Text
            style={{
              fontSize: 35,
              fontWeight: "500",
              color: "#1a475c",
              textAlign: "center",
            }}
          >
            Register
          </Text>
          <Text style={{ textAlign: "center", color: "grey" }}>
            Create your new account
          </Text>
          <Input
            onUpdateValue={updateInputValueHandler.bind(this, "firstName")}
            value={enteredfirstName}
            isInvalid={firstNameIsInvalid}
            placeHolder="First Name"
          />
          <Input
            onUpdateValue={updateInputValueHandler.bind(this, "lastName")}
            value={enteredlastName}
            isInvalid={lastNnameIsInvalid}
            placeHolder="Last Name"
          />
          <Input
            onUpdateValue={updateInputValueHandler.bind(this, "email")}
            value={enteredEmail}
            keyboardType="email-address"
            isInvalid={emailIsInvalid}
            placeHolder="Email"
          />
          <Input
            onUpdateValue={updateInputValueHandler.bind(this, "password")}
            secure
            value={enteredPassword}
            isInvalid={passwordIsInvalid}
            placeHolder="Password"
          />
          <Input
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
            placeHolder="Confirm Password"
          />
          <Input
            onUpdateValue={updateInputValueHandler.bind(this, "areaRegion")}
            value={enteredAreaRegion}
            isInvalid={areaRegionIsInvalid}
            placeHolder="Area Region"
          />
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Checkbox value={isChecked} onValueChange={setChecked} />
          <Text
            style={{
              textAlign: "center",
              marginVertical: 10,
              color: "#207398",
              marginLeft:10
            }}
          >
            Agreed terms and conditions
          </Text>
          </View>
          <Button
            title="Sign up"
            backgroundColor="#207398"
            onPress={onSubmit}
          />
          <Text style={{ marginVertical: 10, textAlign: "center" }}>
            Already have and account?
            <Text
              style={{ color: "#207398", textDecorationLine: "underline" }}
              onPress={() => navigation.navigate("Login")}
            >
              {" "}
              Login
            </Text>
          </Text>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  contaier: {
    paddingHorizontal: width * 0.05,
  },
});
