import { View, Text, TextInput, StyleSheet } from "react-native";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeHolder,
}) {
  return (
    <View style={styles.inputContainer}>
      {label ? (
        <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
          {label}
        </Text>
      ) : (
        ""
      )}
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeHolder}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: "red",
  },
  input: {
    padding: 10,
    borderRadius: 8,
    borderColor: "#207398",
    borderWidth: 1,
    color: "grey",
  },
  inputInvalid: {
    backgroundColor: "#8be8a4",
  },
});
