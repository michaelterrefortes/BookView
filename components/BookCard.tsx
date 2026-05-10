import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getColors } from "react-native-image-colors";

interface Book {
  itemKey: String;
  coverId: String;
  urlPoster: String;
  title: String;
  authorName: String;
  routeUrl: String;
}

const BookCard = ({
  itemKey,
  coverId,
  urlPoster,
  title,
  authorName,
  routeUrl,
}: Book) => {
  //console.log(itemKey, coverId, urlPoster);
  //console.log(authorName);
  const router = useRouter();

  const [colors, setColors] = useState(null);

  useEffect(() => {
    const url = urlPoster;
    getColors(url, {
      fallback: "#f2f2f2",
      cache: true,
      key: url,
    }).then(setColors);
  }, []);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push(`${routeUrl}${itemKey.split("/")[2]}_${coverId}`)
      }
    >
      {coverId ? (
        <View style={styles.coverContainer}>
          <Image
            resizeMode="contain"
            source={{
              uri: urlPoster,
            }}
            //borderRadius={60}
            style={styles.cover}
          />
        </View>
      ) : (
        <View style={[styles.coverContainer, styles.placeholder]}>
          <Text style={{ color: "#ffffff" }}>No Image</Text>
        </View>
      )}
      <View style={{ height: 50, marginTop: 5 }}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {authorName?.join(", ")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;

const styles = StyleSheet.create({
  card: {
    width: 120,
    //borderRadius: 12,
    //backgroundColor: "#fff",
    padding: 8,
    //shadowColor: "#000",
    //shadowOpacity: 0.1,
    //shadowOffset: { width: 0, height: 2 },
    //shadowRadius: 5,
    //elevation: 3,
  },
  coverContainer: {
    width: 120,
    height: 180,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    overflow: "hidden",
  },

  cover: {
    width: "100%",
    height: "100%",
  },

  placeholder: {
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 2,
  },
  author: {
    fontSize: 12,
    color: "#555",
  },
});
