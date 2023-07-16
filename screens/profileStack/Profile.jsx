import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
let customFonts = {
  Fraunces: require("../../assets/fonts/Fraunces.ttf"),
  Poppins: require("../../assets/fonts/Poppins.ttf"),
  "Fraunces-regular": require("../../assets/fonts/FrauncesRegular.ttf"),
  "Fraunces-semibold": require("../../assets/fonts/Fraunces_72pt-SemiBold.ttf"),
};

export default function Profile() {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);
  const navigation = useNavigation();

  useEffect(() =>{
    async function loadFontsAsync() {
      await Font.loadAsync(customFonts);
      setIsFontsLoaded(true);
      SplashScreen.hideAsync();
    }
    loadFontsAsync();
  },[])

  if (!isFontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }

  return (
      <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
          <View style={styles.logoContainer}>
          <Image style={styles.profileImage} source={require('../../assets/profile.png')} />
          <TouchableOpacity style={styles.editIconContainer}>
                  <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
          </View>
          <View style={styles.personInfoContainer}>
          <Text style={styles.personName}>Person Doe</Text>
          <Text style={styles.personOccupation}>Warden</Text>
          <Text style={styles.personEmail}>person.doe@gamil.com</Text>
          </View>
          <View style={styles.section}>
          <Text style={styles.sectionLabel}>Organization</Text>
          <Text style={styles.sectionValue}>kenya Wildlife Service</Text>
          </View>
          <View style={styles.section}>
          <Text style={styles.sectionLabel}>Position</Text>
          <Text style={styles.sectionValue}>Warden lll</Text>
          </View>
          <View style={styles.section}>
          <Text style={styles.sectionLabel}>Country</Text>
          <Text style={styles.sectionValue}>Kenya</Text>
          </View>
          <View style={styles.section2}>
          <TouchableOpacity onPress= {() => navigation.navigate('Certificates')} style={styles.sectionRow}>
              <Text style={styles.sectionLabelText}>My Certificates</Text>
              <MaterialCommunityIcons name="certificate-outline" size={44} color="black" />
          </TouchableOpacity>
          </View>
          <View style={styles.section2}>
          <TouchableOpacity onPress= {() => navigation.navigate('changePassowrd')} style={styles.sectionRow}>
              <Text style={styles.sectionLabelText}>Change Password</Text>
              <MaterialIcons name="lock" size={44} color="black" />
          </TouchableOpacity>
          </View>
      </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 16,
  },
  profileImage: {
    borderRadius: 12,
    width:100,
    height:100
  },

  cardContainer: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  editIconContainer: {
    position: "absolute",
    right: 90,
    bottom: 0,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 35,
  },

  menuIcon: {
    position: "absolute",
    left: 10,
  },
  personInfoContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
    marginBottom: 60,
    marginLeft: 40,
    marginRight: 40,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    alignItems: "center", // Add this line
  },

  personName: {
    fontSize: 40,
    fontWeight: "900",
    fontFamily:'Poppins'
  },
  personOccupation: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "900",
    fontFamily:'Poppins'
  },
  personEmail: {
    fontSize: 14,
    fontFamily:'Poppins'

  },

  section: {
    marginBottom: 20,
  },
  section2: {
    borderWidth: 1,
    padding: 17,
    borderBottomColor: "gray",
    borderLeftColor: "gray",
    borderLeftWidth: 0.5,
    borderRightColor: "gray",
    borderRightWidth: 0.5,
  },
  sectionLabel: {
    fontSize: 24,
    fontFamily:'Poppins',
    marginLeft: 40,
    fontWeight:"900"
  },
  sectionValue: {
    fontSize: 20,
    marginLeft: 40,
    fontFamily:'Poppins'
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: 10,
  },
  sectionLabelText: {
    flex: 1,
    fontSize: 25,
    color: "#145C7B",
    paddingLeft: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "blue",
    color: "white",
  },
});