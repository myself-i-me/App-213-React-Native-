import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { doclist } from "../Objects";
import DocumentItem from "./DocumentItem";
import { useNavigation } from "@react-navigation/native";
import {
  getCountries,
  getDocumentsByUserID,
  getFlags,
} from "../../util/documentApis";
const { width, height } = Dimensions.get("window");
const docslist = doclist;
import { AuthContext } from "../../store/auth-context";
import { DocContext } from "../../store/doc-context";
import LoadingOverlay from "../ui/LoadingOverlay";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

let customFonts = {
  Fraunces: require("../../assets/fonts/Fraunces.ttf"),
  Poppins: require("../../assets/fonts/Poppins.ttf"),
  Poppins500: require("../../assets/fonts/Poppins500.ttf"),
};

export default function DocumentList({ route, navigation }) {
  const authctx = useContext(AuthContext);
  const docContext = useContext(DocContext);
  const [isFetching, setIsFetching] = useState(false);
  const [currentCountry, setCurrentCountry] = useState("All");
  let countriesList = [{ name: "All" }, ...docContext.countries];
  let AllDocuments = docContext.docs;
  let [documentsList, setDocumentsList] = useState(AllDocuments);
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);

  useEffect(() => {
    async function fetchDocuments() {
      setIsFetching(true);
      try {
        await Font.loadAsync(customFonts);
        setIsFontsLoaded(true);
        SplashScreen.hideAsync();
        let documents = await getDocumentsByUserID(
          authctx.userId,
          authctx.token
        );
        let countries = await getCountries();
        docContext.storeCountries(countries);
        setDocumentsList(documents);
        docContext.storeDocs(documents);
        let accessData = documents.map(doc =>{
          return {
            documentId: doc.id,
            accessable: doc.accessable,
            isRequestAccessSent: doc?.isRequestAccessSent
          }
        })
        docContext.storeAccessData(accessData)
      } catch (error) {
        console.log("error is", error);
        Alert.alert("Error", "Unable to fetch documents");
      }
      setIsFetching(false);
    }

    fetchDocuments();
  }, [route, navigation]);

  if (!isFontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }

  function onSelectCountry(country) {
    setCurrentCountry(country.name);
    let tempDocs = AllDocuments.filter((document) => {
      return document.country == country.name;
    });
    if (country.name == "All") {
      setDocumentsList(AllDocuments);
    } else {
      setDocumentsList(tempDocs);
    }
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          paddingBottom: 12,
          paddingLeft: 10,
          backgroundColor: "transparent",
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {countriesList.map((country) => {
          if (country.name == currentCountry) {
            return (
              <TouchableOpacity
                style={styles.selectedCountryButton}
                onPress={() => {
                  onSelectCountry(country);
                }}
                key={country.name}
              >
                <Text
                  style={{
                    fontFamily: "Poppins500",
                    color: "white",
                    marginVertical: 10,
                    marginHorizontal: 20,
                    // backgroundColor: "#b7f794",
                  }}
                >
                  {country.name}
                </Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  onSelectCountry(country);
                }}
                key={country.name}
              >
                <Text
                  style={{
                    fontFamily: "Poppins500",
                    color: "#2C160C",
                    marginVertical: 10,
                    marginHorizontal: 20,
                    // backgroundColor: "#e79af5",
                    // paddingBottom:6
                  }}
                >
                  {country.name}
                </Text>
              </TouchableOpacity>
            );
          }
        })}
      </ScrollView>

      <FlatList
        style={{ paddingHorizontal: 10, backgroundColor:'white' }}
        data={documentsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DocumentItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: height * 0.07,
    backgroundColor: "white",
    // height:height*1.4
  },
  button: {
    backgroundColor: "#2C9CCC99",
    borderRadius: 20,
    marginHorizontal: 5,
    minWidth: 50,
    // textAlignVertical:'center',
    textAlign: "center",

    // paddingVertical:10,
    // paddingHorizontal:20,
  },
  selectedCountryButton: {
    backgroundColor: "#145C7B",
    borderRadius: 20,
    marginHorizontal: 5,
    minWidth: 50,
    textAlign: "center",
  },
});
