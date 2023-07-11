import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

let customFonts = {
  'Fraunces': require('../assets/fonts/Fraunces.ttf'),
  'Poppins': require('../assets/fonts/Poppins.ttf')
};

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMesage] = useState('')

  const authctx = useContext(AuthContext);
  const token = authctx.token;

  useEffect(() => {
    axios
      .get(`http://ihiapps.com:8080/wildbase/documents/list/byuser?userId=5`, {
        headers: {
          Authorization:
            "Bearer " + token,
        },
      })
      .then((resp) => {
        console.log("docsss are",resp);
      })
      .catch((err) => {
        console.log("error in fetching documents", err);
      });
  });

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text onPress={()=> authctx.logout()}>Logout</Text>
    </View>
  );
}
export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
})

