import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-chart-kit'

const {width, height} = Dimensions.get('window')

export default function DashBoard() {
  return (
    <View style={{backgroundColor:'white', flex:1}}>
      <View style={{ backgroundColor:'white', padding:20, paddingTop:'19%', paddingBottom:'19%'}}>
        <View style={{ backgroundColor:'#bacd12', height:height*0.4}}>
          <View style={{height:height*0.07, backgroundColor:'#F5CD71'}}></View>
          <View style={{flexDirection:'row', backgroundColor:'white', height:height*0.26, justifyContent:'space-between'}}>
            <View style={{height:height*0.26, backgroundColor:'#65B4B0', width:width*0.2}}></View>
            <View style={{height:height*0.26, backgroundColor:'#7B78FD', width:width*0.2}}></View>
          </View>
          <View style={{height:height*0.07, backgroundColor:'#DD6670'}}></View>
        </View>
      </View>


      <View style={[styles.elevatedBox, {top:height*0.04, left:height*0.015, paddingBottom:width*0.05,paddingLeft:width*0.05, paddingTop:width*0.05}]}>
      <Text style={{fontSize:27, fontWeight:'bold',}}>1234</Text>
      <Text style={{fontSize:18, fontWeight:'bold',}}>Pending Approvals</Text>
      </View>
      <View style={[styles.elevatedBox, { top:height*0.04, right:height*0.015, padding:width*0.05}]}>
        <Text style={{fontSize:27, fontWeight:'bold',}}>1234</Text>
        <Text style={{fontSize:18, fontWeight:'bold',}}>RRG Access Request</Text>
      </View>
      <View style={[styles.elevatedBox, { top:height*0.35, left:height*0.015, padding:width*0.05,}]}>
      <Text style={{fontSize:27, fontWeight:'bold',}}>1234</Text>
      <Text style={{fontSize:18, fontWeight:'bold',}}>RRG Documents</Text>
      </View>
      <View style={[styles.elevatedBox, { top:height*0.35, right:height*0.015, padding:width*0.05, }]}>
      <Text style={{fontSize:27, fontWeight:'bold',}}>1234</Text>
      <Text style={{fontSize:18, fontWeight:'bold',}}>Active Members</Text>
      </View>

      <View style={{ backgroundColor:'#65B4B0'}}>
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
          backgroundColor: '#1cc910',
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
          backgroundColor:'#7B78FD',
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
    shadowRadius:1,
    elevation:11,
    width:height*0.21,
    height:height*0.21,
    borderRadius:18,
    backgroundColor:'white',
    position:'absolute',
    justifyContent:'space-between',
    backgroundColor:'#f0f5c1',
  }
})