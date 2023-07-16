import { View, StyleSheet, SafeAreaView, FlatList, Dimensions,Text } from "react-native";
import QuizCategory from "../../components/Quiz/Quiz-category";
// import { quizData } from "../../components/Objects";

const { width, height } = Dimensions.get("window");
import { useContext, useEffect, useState } from "react";
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";
import { getAvailabaleQuizzessByDocumentId } from "../../util/quizApis";
let customFonts = {
  'Fraunces': require('../../assets/fonts/Fraunces.ttf'),
  'Poppins': require('../../assets/fonts/Poppins.ttf'),
  'Fraunces700': require('../../assets/fonts/Fraunces_9pt_Soft-Bold.ttf'),
};


const QuizHomeScreen = ({navigation, route}) => {

  console.log("document is", route.params);
    const authctx = useContext(AuthContext)

    const [isLoading,setIsLoading] = useState(false);
    const [isFontsLoaded, setIsFontsLoaded] = useState(false);

    const [quizData, setQuizData] = useState([])
    useEffect(() =>{
      async function loadQuizzes() {
        setIsLoading(true);
        try {
          await Font.loadAsync(customFonts);
          setIsFontsLoaded(true);
          SplashScreen.hideAsync()
          let availableQuizzes = await getAvailabaleQuizzessByDocumentId(route.params.documentId,authctx.token);
          setQuizData(availableQuizzes)
          console.log('received')
        } catch (error) {
          console.log('error in loading quizzes', error)
        }
        setIsLoading(false)
      }
      loadQuizzes()
    },[])

    if(!isFontsLoaded){
      SplashScreen.preventAutoHideAsync();
      return null
    }

    if(isFontsLoaded && isLoading) {
      return <LoadingOverlay />
    }

    if(quizData.length){
      return (
        <SafeAreaView style= {{ paddingHorizontal:width*0, flex:1}}>
          <Text style={{backgroundColor:'#145c7b0d', fontFamily:'Fraunces700', fontSize:18, textAlign:'center', height:51, borderTopWidth:0.5, borderBottomWidth:0.5, borderTopColor:'#145C7B', borderBottomColor:'#145C7B', textAlignVertical:'center'}}>{route.params.documentTitle}</Text>
          <FlatList
            data={quizData}
            renderItem={({ item }) => (
              <QuizCategory item={item} navigation={navigation} documentTitle={route.params.documentTitle} />
            )}
            keyExtractor={(item) => item.id}
            scrollb
          />
        </SafeAreaView>
      );
    } else {
      return (
        <View style = {{flex: 1,justifyContent: "center",alignItems: "center",padding: 32}}>
          <Text style={{fontFamily:'Poppins',fontSize:20}}>No quizzes found</Text>
        </View>
      )
    }

}

export default QuizHomeScreen;

const styles = StyleSheet.create({})