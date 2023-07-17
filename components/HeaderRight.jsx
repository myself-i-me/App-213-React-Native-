import {TouchableOpacity, Image, Text} from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function HeaderRight(){
const navigator = useNavigation() 
    
    return(
            <TouchableOpacity style={{marginRight:10}} onPress={()=>navigator.navigate('My Profile')}>
                <Image source={require('../assets/profile.png')} style={{width:45, height:45}} />
                {/* <Text>dd</Text> */}
            </TouchableOpacity>
    )
}