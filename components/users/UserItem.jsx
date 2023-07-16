import { Dimensions, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../store/auth-context';
import { Image } from 'expo-image';
const { width, height } = Dimensions.get('window');


export default function UserItem({item}) {
    const [active, setActive] = useState(item.approved);
    const authctx = useContext(AuthContext)


  return (
    <TouchableOpacity>
        <View style={styles.container}>
        <View style={{ flex:1, flexDirection:'row', padding:10,}}>
        <View style={{flex:1, height:"100%", borderColor:'blue', borderWidth:1, borderRadius:8, marginRight:15}}></View>
        <View style={{flex:3, justifyContent:'space-between'}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{fontSize:22, fontWeight:'bold'}}>{item?.id} {item?.lastName}</Text>
            <Switch  trackColor={{false:'red', true:'green'}} style={styles.switch} onValueChange={() => setActive(previousState => !previousState)} value={active}/>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between',}}>
                <Text>{item?.email}</Text>
                <Text>{item.approved ? 'Active': 'Inactive'}</Text>
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
        borderColor:'blue',
        borderWidth:1,
        borderRadius:8,
        flex:1,
        marginVertical:height*0.01,

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