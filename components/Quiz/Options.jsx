import { StyleSheet, View , Text, Dimensions,} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

const { width, height} = Dimensions.get('window')

const Options = (props) =>{

    let answerOptions = props.ops;
    let choosen = props.choosen;

    const populateState = (options) => (
        options.map(item => ({
            id: item,
            value: item,
            label: item,
            selected: false
        }))
    ) 

    const [ops,setOps] = useState(populateState(props.ops))

    useEffect(() => {
        setOps(populateState(props.ops))
    }, [props])


    


    const RadioButton = ({ onPress, selected, children }) => {
        return (
          <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
            <TouchableOpacity onPress={onPress} style={styles.radioButton}>
              {selected ? <View style={styles.radioButtonIcon} /> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress}>
              <Text style={styles.radioButtonText}>{children}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        );
      };

    const onRadioBtnClick = (item) => {
        let updatedState = ops.map((isLikedItem) =>{
            if (isLikedItem.id === item.id) {
                choosen(item.id)
                return {...isLikedItem, selected:true}
            } else {
                return {...isLikedItem, selected: false}
            }
        }
        );
        setOps(updatedState);        
      };

    return ops.map((item) => {
      return (<RadioButton
        onPress={() => onRadioBtnClick(item)}
        selected={item.selected}
        key={item.id}
      >
        {item.label}
      </RadioButton>);
    });
    
    
}

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft:width*0,
    paddingBottom:10,
  },

  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "blue",
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16,
  },
});

export default Options;