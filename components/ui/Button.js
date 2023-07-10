import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/styles';

function Button({ title , onPress , backgroundColor, color }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed, {backgroundColor:backgroundColor}]}
      onPress={onPress}
    >
      <View>
        <Text style={[styles.buttonText, {color:color}]}>{title}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
});
