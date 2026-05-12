import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COVER_URL } from "../constants/urls";

interface Author {
  authorId: String;
  name: String;
}

const AuthorCard = ({ authorId, name }: Author) => {
  const router = useRouter();

  //console.log(authorId);

  const imageUrl = authorId
    ? `${COVER_URL}/a/olid/${authorId}-L.jpg`
    : "https://via.placeholder.com/80";

  //console.log(authorId);
  return (
    <TouchableOpacity
      style={styles.authorCard}
      onPress={() =>
        router.push({
          pathname: `/authors/${authorId}`,
          params: { authorId: authorId },
        })
      }
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.authorImage}
        resizeMode="cover"
      />
      <Text style={[styles.authorName]}>{name || "Unknown"}</Text>
    </TouchableOpacity>
  );
};

export default AuthorCard;

const styles = StyleSheet.create({
  authorCard: {
    width: 100,
    alignItems: "center",
    //backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 8,
    //shadowColor: "#000",
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.1,
    //shadowRadius: 4,
    //elevation: 3, // Android shadow
  },
  authorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#aaa", // fallback bg
  },
  authorName: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    color: "#333",
  },
});
