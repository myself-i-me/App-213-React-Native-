import { ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import { userlist } from '../Objects';
import UserItem from './UserItem';
import { DocContext } from '../../store/doc-context';
import {getUsersFunction} from '../../util/adminApis'
import { AuthContext } from '../../store/auth-context';
import axios from 'axios';
const { width, height } = Dimensions.get('window');


export default function Users() {
	const docContext = useContext(DocContext);
    const authctx = useContext(AuthContext)
    let countriesList =  [{name: 'All'},...docContext.countries];

    const [users, setusers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const [noMoreUsers,setNoMoreUsers] = useState(false);


    useEffect(() =>{
        async function getUsers() {
            try{
                let newUsers = await getUsersFunction(currentPage,10,authctx.token);
                if(newUsers.length ==0){
                    setNoMoreUsers(true);
                }
                setusers([...users, ...newUsers]);
            } catch(error) {
                console.log('error in getting users', error)
            }
        }
        getUsers()
    },[currentPage])

    function renderLoader() {
        return !noMoreUsers && (
            <View style = {{marginVertical:16, alignItems:'center'}}>
                <ActivityIndicator size = "large" color = "#aaa" />
            </View>
        )
    }

    function loadMoreItem() {
        console.log('loading more items')
        setCurrentPage(currentPage + 1)
    }

    return (
      <View style={styles.container}>
        <ScrollView style={{ marginBottom:12, paddingLeft:10}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
          {
              countriesList.map(country=>{
                  return (
                      <TouchableOpacity style={styles.button} key={country.name}>
                          <Text style={{fontWeight:500,color:'#2C160C', marginVertical:10, marginHorizontal:20 ,height:height*0.03 ,}}>{country.name}</Text>
                      </TouchableOpacity>
                  )
              })
          }
        </ScrollView>

        <FlatList
        style={{paddingHorizontal:10}}
        data={users}
        keyExtractor={(item)=>item.id}
        renderItem={({item}) => <UserItem item={item} />}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}

        />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop:10,
        paddingBottom:height*0.07
    },
    button: {
        backgroundColor:'#2C9CCC99',
        borderRadius:20,
        marginHorizontal:5,
        minWidth:50,
        textAlignVertical:'center',
        textAlign:'center'
        // paddingVertical:10,
        // paddingHorizontal:20,
    }
})