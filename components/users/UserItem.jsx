import { Dimensions, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState , useEffect} from 'react'
import { AuthContext } from '../../store/auth-context';
import { Image } from 'expo-image';
const { width, height } = Dimensions.get('window');

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { changeUserStatus } from '../../util/adminApis';
let customFonts = {
  Fraunces: require("../../assets/fonts/Fraunces.ttf"),
  Poppins: require("../../assets/fonts/Poppins.ttf"),
  "Fraunces-regular": require("../../assets/fonts/FrauncesRegular.ttf"),
  "Fraunces-semibold": require("../../assets/fonts/Fraunces_72pt-SemiBold.ttf"),
};

export default function UserItem({item}) {
  const [active, setActive] = useState(item.approved);
  const authctx = useContext(AuthContext)
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);


  useEffect(() =>{
    async function loadFontsAsync() {
      await Font.loadAsync(customFonts);
      setIsFontsLoaded(true);
      SplashScreen.hideAsync();
    }
    loadFontsAsync();
  },[])

  async function changeStatus(status) { 
    console.log('status is', status)
    setActive(!active)
    try {
      let response = await changeUserStatus(item.id,!status,authctx.token);
      console.log('response is', response)
    } catch (error) {
      Alert.alert('Error', 'Unable to update status')
      setActive((isa) => !isa)
    }
  }
  
  if (!isFontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }

  return (
    <TouchableOpacity>
        <View style={styles.container}>
        <View style={{ flex:1, flexDirection:'row', padding:10,}}>
        <View style={{flex:1, height:"100%", borderColor:'black', borderWidth:1, borderRadius:8, marginRight:15}}></View>
        <View style={{flex:3, justifyContent:'space-between'}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{fontSize:22,fontFamily:'Poppins',fontWeight:'bold'}}>{item?.firstName} {item?.lastName}</Text>
            <Switch thumbColor={'white'}  trackColor={{false:'red', true:'green'}} style={styles.switch} onValueChange={() => changeStatus(active)} value={active}/>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between',}}>
                <Text style = {{fontFamily:'Poppins',fontSize:10}}>{item?.email}</Text>
                <Text style = {{fontFamily:'Poppins',fontSize:10}}>{item.approved ? 'Active': 'Inactive'}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <Image
                source={{
                  uri: "http://ihiapps.com:8080/wildbase/downloadFile/flags/" + item.countryFlag,
                  method: "POST",
                  headers: {
                    Authorization: "Bearer " + authctx.token,
                  },
                }}
                style={{height:22, width:30 ,resizeMode:'cover' }}
                />
            <Text style={{fontWeight:'bold', marginLeft:9}}>{item.country}</Text>
            </View>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        height:height*0.13,
        // borderColor:'blue',
        borderWidth:1,
        borderRadius:8,
        flex:1,
        marginVertical:4,

    },
    switch :{
        alignSelf:'flex-start',
        paddingVertical:-5,
        borderColor:'green',
        borderWidth:1,
        margin:0,
        height:30,
    }
})