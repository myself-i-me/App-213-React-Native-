import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import { useContext, useState,useEffect } from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import { AuthContext } from '../../store/auth-context';
  
  
  const { width, height } = Dimensions.get("window");
  import * as Font from "expo-font";
  import * as SplashScreen from "expo-splash-screen";
import { DocContext } from "../../store/doc-context";

  let customFonts = {
    'Fraunces': require('../../assets/fonts/Fraunces.ttf'),
    'Poppins': require('../../assets/fonts/Poppins.ttf'),
    'Fraunces-regular': require('../../assets/fonts/FrauncesRegular.ttf'),
    'Fraunces-semibold': require('../../assets/fonts/Fraunces_72pt-SemiBold.ttf')
  };

  const Dot = () => {
    return <View style={styles.dot}></View>;
  };
  
  export default function QuizDetails({ }) {
    const docctx = useContext(DocContext);
    docctx.setHeaderTitles('');
    const navigation = useNavigation()
      const goToExam = () =>{
          navigation.navigate('Exam',{
              item:item
          })
      }
  
    const route = useRoute();
    const item = route.params.item;

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

  
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 25,
            marginBottom: height * 0.03,
            fontFamily:'Fraunces-semibold'
          }}
        >
          {item.title}
        </Text>
        <View
          style={{
            paddingVertical: 15,
            borderRadius: 8,
            borderColor: "#145C7BBA",
            borderWidth: 1.5,
            paddingHorizontal: width * 0.04,
            //   height:height*0.17,
          }}
        >
          <View style={styles.inline}>
            <Text style={{ fontSize: 17,fontFamily:'Poppins' }}>No. of Questions</Text>
            <Text style={{ fontSize: 17, fontWeight:'bold',fontFamily:'Poppins'  }}>{item.questions}</Text>
          </View>
          <View style={styles.inline}>
            <Text style={{ fontSize: 17,fontFamily:'Poppins'  }}>Durations (in min)</Text>
            <Text style={{ fontSize: 17, fontWeight:'bold',fontFamily:'Poppins'  }}>{item.duration}</Text>
          </View>
          <View style={styles.inline}>
            <Text style={{ fontSize: 17,fontFamily:'Poppins'  }}>Qualify percentage</Text>
            <Text style={{ fontSize: 17, fontWeight:'bold',fontFamily:'Poppins'  }}>{item.qualify}</Text>
          </View>
          <Text style={{ fontSize: 17, fontWeight: 600,fontFamily:'Poppins'  }}>{item.level}</Text>
        </View>
        <View style={{ marginTop: height * 0.02, paddingLeft: width * 0.02 }}>
          <Text style={{ fontWeight: "bold", fontSize: 22,fontFamily:'Poppins'  }}>Instructions</Text>
          <View style={{ flexDirection: "row" }}>
            <Dot />
            <Text style={styles.instructions}>
              This is MCQ (multi choice question) time based quiz.
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Dot />
            <Text style={styles.instructions}>
              You need to select one correct option from the given choices.
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Dot />
            <Text style={styles.instructions}>Ensure to attempt all question within the given time.</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Dot />
            <Text style={styles.instructions}>As time gets over Quiz will be submitted automatically.</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>goToExam()}>
          <Text style={{ textAlign: "center",color:'white', fontSize:20, fontWeight:'bold',fontFamily:'Poppins'}}>Start</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    inline: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: height * 0.005,
    },
    container: {
      paddingHorizontal: width * 0.08,
      paddingTop: height * 0.04,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 5,
      backgroundColor: "black",
      marginTop: 15,
      marginRight: 5,
    },
    button: {
      borderRadius:8,
      backgroundColor:'#145C7B',
      marginTop:height*0.1,
      padding:height*0.01,
      width:width*0.5,
      alignSelf:'center'
    },
    instructions: {
      fontSize: 17,
      marginVertical:5,
      fontFamily:'Poppins'
    }
  });