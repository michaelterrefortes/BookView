import { SymbolView } from "expo-symbols";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const ListCardAdd = ({
  colors,
  symbol,
  title,
  onChange,
  selected,
  value,
  type = "shelf",
}) => {
  //console.log(item?.[1]);

  //console.log(item);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  //const len = item.length;
  if (type === "shelf") {
    return (
      <TouchableOpacity
        style={[
          styles.cardShelf,
          isDarkMode ? styles.buttonDark : styles.buttonLight,
        ]}
        onPress={() => onChange(value)}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              padding: 5,
              backgroundColor: colors[0],
              borderRadius: 10,
            }}
          >
            <SymbolView name={symbol} size={24} tintColor={colors[1]} />
          </View>

          <View style={{ marginLeft: 15 }}>
            <Text
              style={[
                styles.shelfTitle,
                isDarkMode ? styles.lightText : styles.darkText,
              ]}
            >
              {title}
            </Text>
          </View>
        </View>

        {selected === value ? (
          <SymbolView name={"checkmark.circle.fill"} size={25} />
        ) : null}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={[
          styles.cardShelf,
          isDarkMode ? styles.buttonDark : styles.buttonLight,
        ]}
        onPress={() => {
          if (selected.includes(value)) {
            onChange(selected.filter((num) => num !== value));
          } else {
            onChange((item) => [...item, value].sort());
          }
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              padding: 5,
              backgroundColor: colors[0],
              borderRadius: 10,
            }}
          >
            <SymbolView name={symbol} size={24} tintColor={colors[1]} />
          </View>

          <View style={{ marginLeft: 15 }}>
            <Text
              style={[
                styles.shelfTitle,
                isDarkMode ? styles.lightText : styles.darkText,
              ]}
            >
              {title}
            </Text>
          </View>
        </View>

        {selected.includes(value) ? (
          <SymbolView name={"checkmark.circle.fill"} size={25} />
        ) : null}
      </TouchableOpacity>
    );
  }
};

export default ListCardAdd;

const styles = StyleSheet.create({
  buttonDark: { backgroundColor: "#2f2f2f" },
  buttonLight: { backgroundColor: "#fff" },
  lightText: { color: "white" },
  darkText: { color: "black" },

  container: {
    flex: 1,
    //sbackgroundColor: "#a94141",
  },
  title: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 32,
    fontWeight: "bold",
  },
  containerLoading: {
    flex: 1, // <-- fill the whole screens
    justifyContent: "center",
    alignItems: "center",
  },

  cardShelf: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  shelfTitle: {
    fontWeight: "700",
    //marginBottom: 10,
  },
  shelfSubtitle: {
    color: "gray",
  },

  noImage: {
    width: 40,
    height: 60,
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
    //borderRadius: 1,
    marginTop: 2,
    marginBottom: 2,
  },

  imageContainer: {
    width: 40,
    height: 60,
    //borderRadius: 8,
    overflow: "hidden",
  },

  coverImage: {
    width: "100%",
    height: "100%",
  },
});
