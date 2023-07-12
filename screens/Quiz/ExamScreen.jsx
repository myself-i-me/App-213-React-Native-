import { View, StyleSheet, SafeAreaView, FlatList, Alert, Text, Dimensions, TouchableOpacity, BackHandler } from "react-native";
import QuestionScreen from "../../components/Quiz/Question";
import Options from "../../components/Quiz/Options";
import { useState, useEffect, useContext } from "react";
import Button from "../../components/ui/Button";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import CountDown from "react-native-countdown-component";
import ResultScreen from "./ResultScreen";
import { AuthContext } from "../../store/auth-context";

const {width, height} = Dimensions.get('window')
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

let customFonts = {
  'Fraunces': require('../../assets/fonts/Fraunces.ttf'),
  'Poppins': require('../../assets/fonts/Poppins.ttf')
};


const ExamScreen = () => {
    const authcontxt = useContext(AuthContext)
    authcontxt.setHeaderShowns(false)

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);

    const [isFontsLoaded, setIsFontsLoaded] = useState(false);

    const navigation = useNavigation()
    const route = useRoute();
    const handleBackPress = () => {
        Alert.alert(
          'Confirmation',
          'Are you sure you want to exit?',
          [
            { text: 'Cancel', onPress: () => {}, style: 'cancel' },
            {
              text: 'OK',
              onPress: () => {
                // Replace the current stack with the new stack
                navigation.dispatch(StackActions.replace('Result',{
                    score: 38,
                    result:'fail'
                }));
              },
            },
          ],
          { cancelable: false }
        );
        return true; // Return true to prevent default back button action
    };

    useEffect(() => {
        async function  loadFontsAsync() {
            console.log('came here ')
            await Font.loadAsync(customFonts);
            console.log('fonts loaded')
            setIsFontsLoaded(true);
            // SplashScreen.hideAsync()
            console.log(isFontsLoaded)
        }
        loadFontsAsync()
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
        
    }, []);

    if(!isFontsLoaded){
        SplashScreen.preventAutoHideAsync();
        return null
    }
    let selectedOption = '';

    function NextButton() {
        return (
            <View style={{flexDirection:'row', backgroundColor:'white', position:'absolute', bottom:height*0.05, alignSelf:'center'}}>
                <TouchableOpacity style={{backgroundColor:'#B7B4B1FC', paddingHorizontal:width*0.13, paddingVertical:height*0.015, borderRadius:8, marginRight:width*0.15}} onPress={incrementQuestion}>
                    <Text style={{fontWeight:'bold'}}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'#207398', paddingHorizontal:width*0.13, paddingVertical:height*0.015, borderRadius:8}} onPress={incrementQuestion}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Next</Text>
                </TouchableOpacity>
            </View>
        )
    }
    
    function SubmitButton() {
        return (
            <View style={{width:'100%', borderTopColor:'#145C7BBA', borderTopWidth:1.5, paddingTop:height*0.1, position:'absolute', bottom:height*0.05, alignSelf:'center'}}>
                <TouchableOpacity onPress={submitAnswers} style={{backgroundColor:'#207398', paddingHorizontal:width*0.13, paddingVertical:height*0.015, borderRadius:8, width:width*0.5, alignSelf:'center'}}>
                <Text style={{color:'white',  fontWeight:'bold', alignSelf:'center'}}>Final Submit</Text>
            </TouchableOpacity>
            </View>
        )
    }

    function submitAnswers() {
        setAnswers([...answers, {id:currentQuestion,value:selectedOption}])
        console.log(answers,selectedOption)
        // navigation.navigate('Result',{
        //     score: 38,
        //     result:'fail'
        // })
        navigation.dispatch(
            StackActions.replace('Result', {
                score: 38,
                result:'fail'
            })
        )
    }

    function incrementQuestion(){
        if(currentQuestion+1<noOfQuestions){
            setCurrentQuestion(currentQuestion+1);
            setAnswers([...answers, {id:currentQuestion,value:selectedOption}])
            selectedOption=''
        }else{
            console.log('::::::::::::::::::::::::')
        }
    }
    

    let quiz = [
        {q: 'Which type of zoos are exclusively designed for aquatic animals?', opt:['Marine parks','Aquariums','Ocean reservoirs','None of these']},
        {q: 'Which type of zoos are exclusively designed for aquatic animals?', opt:['Marine parks','Aquariums','Ocean reservoirs','None of these']},
        {q: 'Which type of zoos are exclusively designed for aquatic animals?', opt:['Marine parks','Aquariums','Ocean reservoirs','None of these']},
        {q: 'Which type of zoos are exclusively designed for aquatic animals?', opt:['Marine parks','Aquariums','Ocean reservoirs','None of these']},
        {q: 'Which type of zoos are exclusively designed for aquatic animals?', opt:['Marine parks','Aquariums','Ocean reservoirs','None of these']}
    ]

    function selected(value) {
        selectedOption = value;
    }
    
    
    const noOfQuestions = quiz.length;

    return (
      <SafeAreaView>
        <View style={styles.container}>
        <Text style={{fontFamily:'Fraunces-semibold', fontSize:24, marginBottom:height*0.01}}>Basic fundamentals of wild life in Kenya</Text>
        <View style={{flexDirection:'row', backgroundColor:'white', borderColor:'red', borderWidth:0}}>
         <Text style={{backgroundColor:'white', textAlignVertical:'center', color:'#AA2222', paddingBottom:height*0.024, fontSize:18}}>Time remaining is</Text>    
         {/* <CountDown size={18} style={styles.timer} digitTxtStyle={{color:'#AA2222', margin:0}} timeLabelStyle={{color:'transparent'}} until={90} onFinish={()=>{Alert.alert('Finished')}} digitStyle={{backgroundColor:'white'}} timeToShow={['M']}/>  */}
         <Text style={{backgroundColor:'white', textAlignVertical:'center', color:'#AA2222', paddingBottom:height*0.024, fontSize:18}}>Min</Text>
         {/* <CountDown size={18} style={styles.timer} digitTxtStyle={{color:'#AA2222'}} timeLabelStyle={{color:'transparent'}} until={90} onFinish={()=>{Alert.alert('Finished')}} digitStyle={{backgroundColor:'white'}} timeToShow={['S']}/> */}
         <Text style={{backgroundColor:'white', textAlignVertical:'center', color:'#AA2222', paddingBottom:height*0.024, fontSize:18}}>Sec</Text>
        </View>
        <Text style={{ fontSize:20,marginBottom:height*0.02, borderBottomColor:'#145C7BBA', borderBottomWidth:1.8, paddingBottom:height*0.02 ,fontWeight:'600', width: '100%', textAlign:'center', color:'#156308'}}>Question {currentQuestion+1} of {noOfQuestions}</Text>
        
        <View style={{ borderWidth:0, borderColor:'red'}}>
            {quiz[currentQuestion] && <QuestionScreen question = {quiz[currentQuestion].q} />}
            {quiz[currentQuestion] && <Options ops = {quiz[currentQuestion].opt} choosen={selected}/>}
        </View>
        {
            currentQuestion+1 < noOfQuestions ? <NextButton /> : <SubmitButton />
        }
        </View>
      </SafeAreaView>
    );
}

export default ExamScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:width*0.1,
        backgroundColor:'white',
        paddingTop:height*0.1,
        height:'100%',
    } ,
    timer:{
        fontSize:19,
        marginBottom:height*0,
        padding:0
    },
})