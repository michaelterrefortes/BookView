import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { fetchBookDetails } from "../../../../../services/api";

const BookEditionDetails = () => {
  const { key } = useLocalSearchParams();
  const cover = key?.split("_")[1];
  const id = key?.split("_")[0];

  //console.log("looking at edition", cover, id);

  const [details, setDetails] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      //console.log("editions/", id, key);
      setLoadingDetails(true);
      const result = await fetchBookDetails(id, "books");
      //console.log(result);
      setDetails(result);
      setLoadingDetails(false);
    };

    loadBooks();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ height: 60 }} />
        <View style={styles.imageContainer}>
          {cover ? (
            <Image
              source={{
                uri: `https://covers.openlibrary.org/b/olid/${cover}-M.jpg`,
              }}
              style={styles.coverImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.noImage}>
              <Text style={styles.noImageText}>No Image Available</Text>
            </View>
          )}
        </View>

        {loadingDetails ? (
          <View>
            <ActivityIndicator
              size="large"
              //color="#0000ff"
              //className="mt-10 self-center"
            />
          </View>
        ) : (
          <>
            <Text style={styles.title}>{details.title}</Text>
            <Text style={styles.keyText}>Pages: {details.number_of_pages}</Text>
            <Text style={styles.keyText}>
              Published on: {details.publish_date}
            </Text>
            <Text style={styles.keyText}>
              Published in: {details.publish_places}
            </Text>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#121212", // dark background
    //paddingTop: 60,
  },
  scrollContent: {
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  imageContainer: {
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#aaa", //backgroundColor: "#333", // fallback bg if no image
    height: 500,
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  noImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noImageText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    //color: "#fff",
    marginBottom: 8,
  },
  keyText: {
    fontSize: 16,
    //color: "#ccc",
  },
});

export default BookEditionDetails;
