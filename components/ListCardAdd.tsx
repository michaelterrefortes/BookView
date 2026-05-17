import { SymbolView } from "expo-symbols";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

  //const len = item.length;
  if (type === "shelf") {
    return (
      <TouchableOpacity
        style={styles.cardShelf}
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
            <Text style={styles.shelfTitle}>{title}</Text>
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
        style={styles.cardShelf}
        onPress={() => {
          if (selected.includes(value)) {
            onChange(selected.filter((num) => num !== value));
          } else {
            onChange((item) => [...item, value]);
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
            <Text style={styles.shelfTitle}>{title}</Text>
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
