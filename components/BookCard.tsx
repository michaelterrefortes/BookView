import { Link, useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
  return (
    <Link href={`${routeUrl}${itemKey.split("/")[2]}_${coverId}`} asChild>
      <TouchableOpacity
        style={styles.card}
        //onPress={() =>
        //  router.push(`${routeUrl}${itemKey.split("/")[2]}_${coverId}`)
        //}
      >
        {coverId ? (
          <Image
            source={{
              uri: urlPoster, //`https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`,
            }}
            style={styles.cover}
          />
        ) : (
          <View style={[styles.cover, styles.placeholder]}>
            <Text style={{ color: "#ffffff" }}>No Image</Text>
          </View>
        )}
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {authorName?.join(", ")}
        </Text>
      </TouchableOpacity>
    </Link>
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
  cover: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "cover",
    backgroundColor: "#aaa",
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
