import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { PieChart } from 'react-native-chart-kit'

const {width, height} = Dimensions.get('window')
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthContext } from '../store/auth-context';
import { getDashboardApiData } from '../util/adminApis';
import LoadingOverlay from '../components/ui/LoadingOverlay';
let customFonts = {
  Fraunces: require("../assets/fonts/Fraunces.ttf"),
  Poppins: require("../assets/fonts/Poppins.ttf"),
  Poppins500: require("../assets/fonts/Poppins500.ttf"),
};

export default function DashBoard() {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const authctx = useContext(AuthContext);
  useEffect(() =>{
    async function getDashboardData() {
      setIsFetching(true);
      try {
        await Font.loadAsync(customFonts);
        setIsFontsLoaded(true);
        SplashScreen.hideAsync();
        let dashboardData = await getDashboardApiData(authctx.token);
        console.log('dashboard data is', dashboardData)
        setDashboardData(dashboardData);
      } catch (error) {
        console.log('error is', error)
      }
      setIsFetching(false)
    }
    getDashboardData();
  },[])

  if (!isFontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }

  if(isFetching) {
    return <LoadingOverlay />
  }

  return (
    <View style={{backgroundColor:'white', flex:1}}>
      <View style={{ backgroundColor:'white', padding:20, paddingTop:'19%', paddingBottom:'19%'}}>
        <View style={{ backgroundColor:'#bacd12', height:height*0.3}}>
          <View style={{height:height*0.075, backgroundColor:'#F5CD71'}}></View>
          <View style={{flexDirection:'row', backgroundColor:'white', height:height*0.15, justifyContent:'space-between'}}>
            <View style={{height:height*0.15, backgroundColor:'#65B4B0', width:width*0.2}}></View>
            <View style={{height:height*0.15, backgroundColor:'#7B78FD', width:width*0.2}}></View>
          </View>
          <View style={{height:height*0.075, backgroundColor:'#DD6670'}}></View>
        </View>
      </View>


      <View style={[styles.elevatedBox, {top:height*0.04, left:height*0.015, paddingBottom:width*0.05,paddingLeft:width*0.05, paddingTop:width*0.05}]}>
      <Text style={{fontSize:27, fontFamily:'Poppins'}}>{dashboardData.totalpendingapprovals}</Text>
      <Text style={{fontSize:18, fontFamily:'Poppins'}}>Pending Approvals</Text>
      </View>
      <View style={[styles.elevatedBox, { top:height*0.04, right:height*0.015, padding:width*0.05}]}>
        <Text style={{fontSize:27,  fontFamily:'Poppins'}}>{dashboardData.totaldocumentaccessrequests}</Text>
        <Text style={{fontSize:18, fontFamily:'Poppins'}}>RRG Access Request</Text>
      </View>
      <View style={[styles.elevatedBox, { top:height*0.25, left:height*0.015, padding:width*0.05,}]}>
      <Text style={{fontSize:27,  fontFamily:'Poppins'}}>{dashboardData.totaldocuments}</Text>
      <Text style={{fontSize:18, fontFamily:'Poppins'}}>RRG Documents</Text>
      </View>
      <View style={[styles.elevatedBox, { top:height*0.25, right:height*0.015, padding:width*0.05, }]}>
      <Text style={{fontSize:27,  fontFamily:'Poppins'}}>{dashboardData.totalactiveusers}</Text>
      <Text style={{fontSize:18,  fontFamily:'Poppins'}}>Active Members</Text>
      </View>

      <View style={{ backgroundColor:'white', width:width*0.9, borderTopColor:'black', borderTopWidth:1.5, alignSelf:'center'}}>
        <Text style={{alignSelf:'flex-end', textAlign:'right', fontSize:25, fontWeight:'bold'}}>Statistics</Text>
      <ScrollView scrollEnabled={true} horizontal={true}>
      <PieChart
        data={[
          {
            name: 'A',
            population: 12,
            color: '#1bc34d',
            legendFontColor: '#b123c4',
            legendFontSize: 15,
          },
          {
            name: 'B',
            population: 15,
            color: '#c3f2a1',
            legendFontColor: '#b123c4',
            legendFontSize: 15,
          },
          {
            name: 'C',
            population: 27,
            color: '#bb2345',
            legendFontColor: '#b123c4',
            legendFontSize: 15,
          },
          {
            name: 'D',
            population: 42,
            color: '#abcdef',
            legendFontColor: '#b123c4',
            legendFontSize: 15,
          },
        ]}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          verticalLabelRotation:10,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          backgroundColor:'white',
          alignSelf:'center',
          width:width
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute //for the absolute number remove if you want percentage
      />
      </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  elevatedBox:{
    shadowColor:'black',
    shadowOpacity:0.5,
    shadowRadius:0.5,
    elevation:11,
    width:height*0.19,
    height:height*0.19,
    borderRadius:18,
    backgroundColor:'white',
    position:'absolute',
    justifyContent:'space-between',
    backgroundColor:'#FBFAFA',
  }
})