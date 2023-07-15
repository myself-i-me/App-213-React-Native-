import { useContext, useEffect, useState } from "react";
import { View, Text,StyleSheet , Alert, BackHandler, Image, Dimensions, TouchableOpacity} from "react-native";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import Button from "../../components/ui/Button";
import { AuthContext } from "../../store/auth-context";

const {width, height} = Dimensions.get('window')
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import { DocContext } from "../../store/doc-context";

let customFonts = {
  'Fraunces': require('../../assets/fonts/Fraunces.ttf'),
  'Poppins': require('../../assets/fonts/Poppins.ttf'),
  'Fraunces-regular': require('../../assets/fonts/FrauncesRegular.ttf'),
  'Fraunces-semibold': require('../../assets/fonts/Fraunces_72pt-SemiBold.ttf')
};



function SuccessScreen({score}) {
    const certiFicateIcon = require('../../assets/certificate-icon_1.png');
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

    return(
        <View style={styles.successContainer}>
        <Text style={{fontFamily:'Fraunces-semibold', fontSize:22}}>Basic fundamentals of wildlife of Kenya</Text>
        <Text style={{marginTop:height*0.05, fontSize:26,color:'#19771D' ,textAlign:'center',fontFamily:'Fraunces-semibold'}}>Congratulations</Text>
        <Image
        source={certiFicateIcon}
        style={{backgroundColor:'white', alignSelf:'center', height:height*0.2, width:height*0.31, marginVertical:height*0.03,}}
        />
        <Text style={{alignSelf:'center', fontSize:20,  color:'#006A24'}}>You qualified the quiz</Text>
        <Text style={{alignSelf:'center', fontSize:20,  color:'#006A24', fontWeight:'bold', marginVertical:height*0.03}}>Score {score}%</Text>
        <Text style={{alignSelf:'center', fontSize:20,  paddingHorizontal:width*0.05}}>
        Download the certificate now or any time from the my profile
        </Text>
        <View style={{alignSelf:'center', justifyContent:'space-between', flexDirection:'row', marginTop:height*0.1, borderColor:'red', borderWidth:0, width:'100%'}}>
        <TouchableOpacity style={{backgroundColor:'#207398', paddingHorizontal:width*0.09, paddingVertical:height*0.015, borderRadius:8, }}>
                    <Text style={{color:'white',fontWeight:'bold', fontSize:19}}>Email me</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'#207398', paddingHorizontal:width*0.06, paddingVertical:height*0.015, borderRadius:8,}}>
                    <Text style={{color:'white',fontWeight:'bold', fontSize:19}}>Download now</Text>
        </TouchableOpacity>
        </View>
    </View>
    )
}


function FailScreen({score, goToHome}) {
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
    const sadIcon = require('../../assets/sad-icon_1.png')
    return(
    <View style={styles.failScreenCnotainer}>
        <Text style={{fontFamily:'Fraunces-semibold', fontSize:28, alignSelf:'center'}}>Basic fundamentals of wildlife of Kenya</Text>
        <Text style={{marginTop:height*0.05, fontSize:26,color:'#B41616' ,textAlign:'center', fontWeight:'bold'}}>Better luck next time</Text>
        <Image
        source={sadIcon}
        style={{backgroundColor:'white', alignSelf:'center', height:height*0.3, width:height*0.31, marginVertical:height*0.1}}
        />
        <Text style={{alignSelf:'center', fontSize:20,  paddingHorizontal:width*0.05, fontFamily:'Poppins'}}>
            You score <Text style={{fontWeight:'900',fontFamily:'Poppins'}}>{score}%</Text>  , which is lower than the qualifying percentage
        </Text>
        <TouchableOpacity onPress= {goToHome} style={{backgroundColor:'#207398', paddingHorizontal:width*0.18, paddingVertical:height*0.015, borderRadius:8, alignSelf:'center', marginTop:height*0.05}}>
                    <Text style={{color:'white',fontWeight:'bold', fontSize:19}}>Go back</Text>
        </TouchableOpacity>
    </View>
    )
}


function ResultScreen (props) {
    const docctx = useContext(DocContext)
    docctx.setHeaderShowns(true)
    
    const navigation = useNavigation();
    const route = useRoute();
    const score = route.params.score
    const result = route.params.result;
    console.log('in result screen',score)

    function goToHome() {
        console.log('cam eher to go home')
        navigation.navigate('Documents', { screen: 'Home' });
        console.log('not went')
    }
   
    return (
        <View style= {styles.container}>
           {
            result === 'pass' ? <SuccessScreen  score={score}/> : <FailScreen score={score} goToHome={goToHome}/>
           }
        </View>
    )
}

export default ResultScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:width*0.05,
        backgroundColor:'white'
    },
    failScreenCnotainer:{
        width:'100%',
        flex:1,
        backgroundColor:'white'
    },
    successContainer: {
        width:'100%',
        flex:1,
        backgroundColor:'white'
    }

})