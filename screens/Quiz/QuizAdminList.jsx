import { StyleSheet, Text, View, Switch, FlatList, Dimensions } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { DocContext } from '../../store/doc-context';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

const {width, height} = Dimensions.get('window')

let customFonts = {
    'Fraunces': require('../../assets/fonts/Fraunces.ttf'),
    'Poppins': require('../../assets/fonts/Poppins.ttf'),
    'Poppins-semibold': require('../../assets/fonts/Poppins600.ttf'),
    'Fraunces-regular': require('../../assets/fonts/FrauncesRegular.ttf'),
    'Fraunces-semibold': require('../../assets/fonts/Fraunces_72pt-SemiBold.ttf')
  };

function QuizItem({name, questions, duration, qualifyScore, isActive}) {
    const [isAvailable, setIsAvailable] = useState(false)
    
    return(
        <View style={styles.quizItemContainer}>
            <Text style={{fontFamily:'Poppins-semibold', fontSize:14}}>{name}</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                    <Text style={{fontFamily:'Poppins', fontSize:12}}>Questions           {questions}</Text>
                    <Text style={{fontFamily:'Poppins', fontSize:12}}>Duration             {duration} min</Text>
                    <Text style={{fontFamily:'Poppins', fontSize:12}}>Qualify score     {qualifyScore}%</Text>
                    
                </View>
                <View>
                <FontAwesome5 name="edit" size={24} color="black" />
                <Switch onValueChange={()=>setIsAvailable(previousState=>!previousState)} value={isAvailable} />
                </View>
            </View>
        </View>
    )
}

function QuizByDocument({title, quizes}) {

    return(
        <View>
            {/* <Text style={{backgroundColor:'#145c7b0d', fontFamily:'Poppins-semibold', fontSize:18, textAlign:'center', height:51, borderTopWidth:0.5, borderBottomWidth:0.5, borderTopColor:'#145C7B', borderBottomColor:'#145C7B', textAlignVertical:'center'}}>{title}</Text> */}
            {
                quizes.map((item)=><QuizItem name={item.quizName} questions={item.noOfQuestions} duration={item.timeInMins} qualifyScore={item.qualifyScore} isActive={true}/>)
            }
        </View>
    )
}

export default function QuizAdminList() {
    const docContext = useContext(DocContext);
    const [isFontsLoaded, setIsFontsLoaded] = useState(false);
    useEffect(() => {
        async function  loadFontsAsync() {
            await Font.loadAsync(customFonts);
            setIsFontsLoaded(true);
            SplashScreen.hideAsync()
            }
            loadFontsAsync()
    }, [])

    if(!isFontsLoaded){
        SplashScreen.preventAutoHideAsync();
        return null
    }
    

    const data = [
        {
            "title":'Wildlife offenses in Kenya',
            "data" : [{
                "createdBy": "jhonmiller@mailinator.com",
                "createdDate": "2023-07-15 14:08:49",
                "lastModifiedBy": "jhonmiller@mailinator.com",
                "lastModifiedDate": "2023-07-15 14:08:49",
                "id": 1,
                "documentId": 1,
                "quizName": "Wild life quiz(Kenya)",
                "noOfQuestions": 8,
                "timeInMins": 20,
                "qualifyScore": 65,
                "instructions": "",
                "deleted": false,
                "documentName": "Wildlife offenses in Kenya"
              },
              {
                "createdBy": "jhonmiller@mailinator.com",
                "createdDate": "2023-07-15 14:09:47",
                "lastModifiedBy": "jhonmiller@mailinator.com",
                "lastModifiedDate": "2023-07-15 14:09:47",
                "id": 2,
                "documentId": 1,
                "quizName": "Quiz Master of wild life",
                "noOfQuestions": 6,
                "timeInMins": 25,
                "qualifyScore": 70,
                "instructions": "The quizzes consists of questions carefully designed to help you self-assess your comprehension of the information presented on the topics covered in the module. No data will be collected on the website regarding your responses or how many times you take the quiz",
                "deleted": false,
                "documentName": "Wildlife offenses in Kenya"
              }]
        },
        {
            "title":'Wildlife offenses in Kenya',
            "data" : [{
                "createdBy": "jhonmiller@mailinator.com",
                "createdDate": "2023-07-15 14:08:49",
                "lastModifiedBy": "jhonmiller@mailinator.com",
                "lastModifiedDate": "2023-07-15 14:08:49",
                "id": 1,
                "documentId": 1,
                "quizName": "Wild life quiz(Kenya)",
                "noOfQuestions": 8,
                "timeInMins": 20,
                "qualifyScore": 65,
                "instructions": "",
                "deleted": false,
                "documentName": "Wildlife offenses in Kenya"
              },
              {
                "createdBy": "jhonmiller@mailinator.com",
                "createdDate": "2023-07-15 14:09:47",
                "lastModifiedBy": "jhonmiller@mailinator.com",
                "lastModifiedDate": "2023-07-15 14:09:47",
                "id": 2,
                "documentId": 1,
                "quizName": "Quiz Master of wild life",
                "noOfQuestions": 6,
                "timeInMins": 25,
                "qualifyScore": 70,
                "instructions": "The quizzes consists of questions carefully designed to help you self-assess your comprehension of the information presented on the topics covered in the module. No data will be collected on the website regarding your responses or how many times you take the quiz",
                "deleted": false,
                "documentName": "Wildlife offenses in Kenya"
              },
              {
                "createdBy": "jhonmiller@mailinator.com",
                "createdDate": "2023-07-15 14:08:49",
                "lastModifiedBy": "jhonmiller@mailinator.com",
                "lastModifiedDate": "2023-07-15 14:08:49",
                "id": 1,
                "documentId": 1,
                "quizName": "Wild life quiz(Kenya)",
                "noOfQuestions": 8,
                "timeInMins": 20,
                "qualifyScore": 65,
                "instructions": "",
                "deleted": false,
                "documentName": "Wildlife offenses in Kenya"
              },
              {
                "createdBy": "jhonmiller@mailinator.com",
                "createdDate": "2023-07-15 14:08:49",
                "lastModifiedBy": "jhonmiller@mailinator.com",
                "lastModifiedDate": "2023-07-15 14:08:49",
                "id": 1,
                "documentId": 1,
                "quizName": "Wild life quiz(Kenya)",
                "noOfQuestions": 8,
                "timeInMins": 20,
                "qualifyScore": 65,
                "instructions": "",
                "deleted": false,
                "documentName": "Wildlife offenses in Kenya"
              },
              {
                "createdBy": "jhonmiller@mailinator.com",
                "createdDate": "2023-07-15 14:08:49",
                "lastModifiedBy": "jhonmiller@mailinator.com",
                "lastModifiedDate": "2023-07-15 14:08:49",
                "id": 1,
                "documentId": 1,
                "quizName": "Wild life quiz(Kenya)",
                "noOfQuestions": 8,
                "timeInMins": 20,
                "qualifyScore": 65,
                "instructions": "",
                "deleted": false,
                "documentName": "Wildlife offenses in Kenya"
              },
              {
                "createdBy": "jhonmiller@mailinator.com",
                "createdDate": "2023-07-15 14:08:49",
                "lastModifiedBy": "jhonmiller@mailinator.com",
                "lastModifiedDate": "2023-07-15 14:08:49",
                "id": 1,
                "documentId": 1,
                "quizName": "Wild life quiz(Kenya)",
                "noOfQuestions": 8,
                "timeInMins": 20,
                "qualifyScore": 65,
                "instructions": "",
                "deleted": false,
                "documentName": "Wildlife offenses in Kenya"
              }
            ]
        },
        {
            "title":'Wildlife offenses in Kenya',
            "data" : [{
                "createdBy": "jhonmiller@mailinator.com",
                "createdDate": "2023-07-15 14:08:49",
                "lastModifiedBy": "jhonmiller@mailinator.com",
                "lastModifiedDate": "2023-07-15 14:08:49",
                "id": 1,
                "documentId": 1,
                "quizName": "Wild life quiz(Kenya)",
                "noOfQuestions": 8,
                "timeInMins": 20,
                "qualifyScore": 65,
                "instructions": "",
                "deleted": false,
                "documentName": "Wildlife offenses in Kenya"
              },
              {
                "createdBy": "jhonmiller@mailinator.com",
                "createdDate": "2023-07-15 14:09:47",
                "lastModifiedBy": "jhonmiller@mailinator.com",
                "lastModifiedDate": "2023-07-15 14:09:47",
                "id": 2,
                "documentId": 1,
                "quizName": "Quiz Master of wild life",
                "noOfQuestions": 6,
                "timeInMins": 25,
                "qualifyScore": 70,
                "instructions": "The quizzes consists of questions carefully designed to help you self-assess your comprehension of the information presented on the topics covered in the module. No data will be collected on the website regarding your responses or how many times you take the quiz",
                "deleted": false,
                "documentName": "Wildlife offenses in Kenya"
              }]
        },
        {
            "title":'Wildlife offenses in Kenya',
            "data" : [{
                "createdBy": "jhonmiller@mailinator.com",
                "createdDate": "2023-07-15 14:08:49",
                "lastModifiedBy": "jhonmiller@mailinator.com",
                "lastModifiedDate": "2023-07-15 14:08:49",
                "id": 1,
                "documentId": 1,
                "quizName": "Wild life quiz(Kenya)",
                "noOfQuestions": 8,
                "timeInMins": 20,
                "qualifyScore": 65,
                "instructions": "",
                "deleted": false,
                "documentName": "Wildlife offenses in Kenya"
              },
              {
                "createdBy": "jhonmiller@mailinator.com",
                "createdDate": "2023-07-15 14:09:47",
                "lastModifiedBy": "jhonmiller@mailinator.com",
                "lastModifiedDate": "2023-07-15 14:09:47",
                "id": 2,
                "documentId": 1,
                "quizName": "Quiz Master of wild life",
                "noOfQuestions": 6,
                "timeInMins": 25,
                "qualifyScore": 70,
                "instructions": "The quizzes consists of questions carefully designed to help you self-assess your comprehension of the information presented on the topics covered in the module. No data will be collected on the website regarding your responses or how many times you take the quiz",
                "deleted": false,
                "documentName": "Wildlife offenses in Kenya"
              }]
        }
      ]

  return (
    <View style={{flex:1}}>
      {/* <FlatList 
      data={data}
      renderItem={({item})=>(
        <QuizItem name={item.quizName} questions={item.noOfQuestions} duration={item.timeInMins} qualifyScore={item.qualifyScore} isActive={true}/>
      )}
      keyExtractor={(item)=>item.id}
      /> */}
      <FlatList
        data={data}
        renderItem={({item})=><QuizByDocument title={item.title} quizes={item.data} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{

    },
    quizItemContainer:{
        padding:10,
        alignSelf:'center',
        marginVertical:7,
        borderColor:'#145C7BBA'  ,
        borderWidth:1,
        backgroundColor:'#D9FFFF57',
        width:width*0.92
    }
})