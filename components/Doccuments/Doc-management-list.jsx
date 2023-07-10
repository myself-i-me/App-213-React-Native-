import {
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
import DocListAdminItem from "./DocListAdminItem";
import { Alert } from "react-native";
import { AuthContext } from "../../store/auth-context";
import { DocContext } from "../../store/doc-context";
import LoadingOverlay from "../ui/LoadingOverlay";
import { getAllDocuments } from "../../util/adminApis";
const { width, height } = Dimensions.get("window");
import { getCountries } from "../../util/documentApis";

export default function DocumentManagement({navigation}) {
  const authctx = useContext(AuthContext);
  const docContext = useContext(DocContext);
  let countriesList = [{ name: "All" }, ...docContext.countries];
  let AllDocuments = docContext.docs;
  let [documentsList, setDocumentsList] = useState(AllDocuments);
	const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchDocuments() {
      setIsFetching(true);
      try {
        let documents = await getAllDocuments(
          authctx.token
        );
        let countries = await getCountries();
        docContext.storeCountries(countries);
        setDocumentsList(documents);
        docContext.storeDocs(documents);
      } catch (error) {
        console.log("error is", error);
        Alert.alert("Error", "Unable to fetch documents");
      }
      setIsFetching(false);
    }

    fetchDocuments();
  }, [navigation]);

  function onSelectCountry(country) {
		let tempDocs = AllDocuments.filter(document =>{
			return document.country == country.name
		})
		if(country.name == 'All'){
			setDocumentsList(AllDocuments)
		} else {
			setDocumentsList(tempDocs);
		}
	}

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ marginBottom: 12 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {countriesList.map((country) => {
          return (
            <TouchableOpacity style={styles.button}  onPress={() =>{onSelectCountry(country)}}  key={country.name}>
              <Text
                style={{
                  fontWeight: 500,
                  color: "#2C160C",
                  marginVertical: 10,
                  marginHorizontal: 20,
                  height: height * 0.03,
                }}
              >
                {country.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <FlatList
        style={{ paddingHorizontal: 10 }}
        data={documentsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DocListAdminItem item={item} navigation={navigation}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: height * 0.07,
  },
  button: {
    backgroundColor: "#2C9CCC99",
    borderRadius: 20,
    marginHorizontal: 5,
    minWidth: 50,
    textAlignVertical: "center",
    textAlign: "center",
    // paddingVertical:10,
    // paddingHorizontal:20,
  },
});
