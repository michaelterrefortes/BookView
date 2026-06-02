import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

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
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark"; //colorScheme === "dark";
  const router = useRouter();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View
        style={[
          styles.container,
          isDarkMode ? styles.buttonDark : styles.buttonLight,
        ]}
      >
        <SymbolView name="magnifyingglass" size={20} tintColor={"gray"} />
        <TextInput
          onPressIn={onPress}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="gray"
          style={[
            styles.input,
            isDarkMode ? styles.lightText : styles.darkText,
          ]}
        />
        {value?.trim() === "" ? null : (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => onChangeText("")}
          >
            <SymbolView name="x.circle.fill" size={21} tintColor={"gray"} />
          </TouchableOpacity>
        )}

        {camera ? (
          <TouchableOpacity
            //style={[styles.container2]}
            onPress={() => router.push("/camera")}
          >
            <SymbolView
              name="barcode.viewfinder"
              size={21}
              tintColor={isDarkMode ? "gray" : "black"}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  darkBg: { backgroundColor: "#000" },
  lightBg: { backgroundColor: "#f2f2f2" },
  buttonDark: { backgroundColor: "#2f2f2f" },
  buttonLight: { backgroundColor: "#fff" },
  lightText: { color: "white" },
  darkText: { color: "black" },

  container: {
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: "#f3f4f6", // light gray (matches white UI)
    backgroundColor: "#fff",
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 20,

    //borderWidth: 1,
    //borderColor: "#c4c4c4", // subtle border

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
