import { Link } from "expo-router";
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

const BookList = ({
  itemKey,
  coverId,
  urlPoster,
  title,
  authorName,
  routeUrl,
}: Book) => {
  return (
    <Link href={`${routeUrl}${itemKey.split("/")[2]}_${coverId}`} asChild>
      <TouchableOpacity style={styles.row}>
        {coverId ? (
          <Image source={{ uri: urlPoster }} style={styles.cover} />
        ) : (
          <View style={[styles.cover, styles.placeholder]}>
            <Text style={{ color: "#fff" }}>No Image</Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.author} numberOfLines={1}>
            {authorName?.join(", ")}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default BookList;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  cover: {
    width: 80,
    height: 120,
    borderRadius: 8,
    resizeMode: "cover",
    marginRight: 12,
    backgroundColor: "#aaa",
  },
  placeholder: {
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: "#555",
  },
});
