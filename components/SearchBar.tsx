import { SymbolView } from "expo-symbols";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

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
      <SymbolView name="magnifyingglass" size={20} tintColor={"gray"} />
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
          <SymbolView name="barcode.viewfinder" size={21} tintColor={"black"} />
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
