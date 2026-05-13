import { SymbolView } from "expo-symbols";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ShelfCard = ({ item, colors, symbol, title }) => {
  //console.log(item?.[1]);

  const len = item.length;

  return (
    <TouchableOpacity style={styles.cardShelf}>
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

        {/*
        <View style={{ flexDirection: "row" }}>
          <View>
            {item?.[len - 1] ? (
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: `${COVER_URL}/${item[len - 1].id.endsWith("W") ? "w" : "b"}/olid/${item[len - 2].id}-L.jpg`,
                  }}
                  style={styles.coverImage}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <View style={styles.noImage} />
            )}
            {item?.[len - 2] ? (
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: `${COVER_URL}/${item[len - 2].id.endsWith("W") ? "w" : "b"}/olid/${item[len - 2].id}-L.jpg`,
                  }}
                  style={styles.coverImage}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <View style={styles.noImage} />
            )}
          </View>
          <View style={{ marginLeft: 4 }}>
            {item?.[len - 3] ? (
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: `${COVER_URL}/${item[len - 3].id.endsWith("W") ? "w" : "b"}/olid/${item[len - 3].id}-L.jpg`,
                  }}
                  style={styles.coverImage}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <View style={styles.noImage} />
            )}
            {item?.[len - 4] ? (
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: `${COVER_URL}/${item[len - 4].id.endsWith("W") ? "w" : "b"}/olid/${item[len - 4].id}-L.jpg`,
                  }}
                  style={styles.coverImage}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <View style={styles.noImage} />
            )}
          </View>
        </View> */}
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.shelfTitle}>{title}</Text>
          <Text style={styles.shelfSubtitle}>{item.length} books</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ShelfCard;

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
  },
  shelfTitle: {
    fontWeight: "700",
    marginBottom: 10,
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
