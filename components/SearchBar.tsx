import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
  camera: Boolean;
}

const SearchBar = ({
  placeholder,
  onPress,
  value,
  onChangeText,
  camera = true,
}: Props) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} style={styles.icon} />
      <TextInput
        onPressIn={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#6b7280"
        style={styles.input}
      />

      {camera ? (
        <TouchableOpacity>
          <Ionicons name="barcode-outline" size={21} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6", // light gray (matches white UI)
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 20,

    borderWidth: 1,
    borderColor: "#c4c4c4", // subtle border

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    color: "#6b7280", // soft gray
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#111827", // dark text
    fontSize: 16,
  },
});

export default SearchBar;
