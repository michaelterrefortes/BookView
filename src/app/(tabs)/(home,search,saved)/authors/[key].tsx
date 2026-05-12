import { useLocalSearchParams, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BookCard from "../../../../../components/BookCard";
import { COVER_URL } from "../../../../../constants/urls";
import { fetchAuthor, fetchAuthorWorks } from "../../../../../services/api";

const AuthorDetails = () => {
  const router = useRouter();
  const { key } = useLocalSearchParams();

  //console.log(key);

  const [authorInfo, setAuthorInfo] = useState([]);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [loadingAuthor, setLoadingAuthor] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(false);

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const loadAuthor = async () => {
      //console.log("books/", id);
      setLoadingAuthor(true);
      const result = await fetchAuthor(key);
      //console.log(result.bio);
      setAuthorInfo(result);
      setLoadingAuthor(false);
    };

    loadAuthor();
  }, []);

  useEffect(() => {
    loadAuthorBooks();
  }, []);

  const loadAuthorBooks = async () => {
    if (loadingBooks) return;
    setLoadingBooks(true);
    const result = await fetchAuthorWorks(key);
    setAuthorBooks([...authorBooks, ...result]);
    setLoadingBooks(false);
    setOffset(10 + offset);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {authorInfo.photos ? (
            <Image
              source={{
                uri: `${COVER_URL}/b/id/${authorInfo.photos[0]}-L.jpg`,
              }}
              style={styles.coverImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.noImage}>
              <Text style={{ color: "white" }}>No Image</Text>
            </View>
          )}
        </View>
        {!loadingAuthor && authorInfo ? (
          <>
            <Text style={styles.title}>{authorInfo.name}</Text>

            <Text style={styles.keyText} numberOfLines={4}>
              {typeof authorInfo.bio === "string"
                ? authorInfo.bio
                : authorInfo.bio?.value || "No biography available"}
            </Text>

            <TouchableOpacity
              style={{ alignSelf: "flex-end", paddingRight: 16 }}
              onPress={() =>
                router.push({
                  pathname: "/moreInfo/info",
                  params: {
                    description:
                      typeof authorInfo.bio === "string"
                        ? authorInfo.bio
                        : authorInfo.bio?.value || "No biography available",
                  },
                })
              }
            >
              <Text style={{ fontWeight: "600" }}>MORE</Text>
            </TouchableOpacity>
          </>
        ) : null}

        <TouchableOpacity style={{ justifyContent: "center" }}>
          <Text style={styles.title2}>
            Books
            <SymbolView name={"chevron.right"} size={20} tintColor={"black"} />
          </Text>
        </TouchableOpacity>

        {loadingBooks ? (
          <View style={styles.containerLoading}>
            <ActivityIndicator
              size="large"
              //color="#0000ff"
              //className="mt-10 self-center"
            />
          </View>
        ) : (
          <FlatList
            data={authorBooks}
            style={{ paddingLeft: 6 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
            //contentContainerStyle={{ paddingHorizontal: 16 }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <BookCard
                itemKey={item.key}
                coverId={item.covers?.[0]}
                urlPoster={`${COVER_URL}/b/id/${item.covers?.[0]}-L.jpg`}
                authorName={[""]}
                title={item.title}
                routeUrl={"books"}
              />
            )}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default AuthorDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    //backgroundColor: "#121212", // dark background
    //paddingTop: 60,
  },
  scrollContent: {
    paddingBottom: 80,
    //paddingHorizontal: 16,
    //flex: 1,
  },
  containerLoading: {
    width: "100%",
    height: 170,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 100,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#aaa", //backgroundColor: "#333", // fallback bg if no image
    height: 150,
    width: 150,
    alignSelf: "center",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  noImage: {
    alignItems: "center",
    justifyContent: "center",
  },
  noImageText: {
    //color: "#414040", //"#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    //color: "#fff",
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  title2: {
    fontSize: 28,
    fontWeight: "bold",
    //color: "#fff",
    marginBottom: 8,
    marginTop: 8,
    paddingLeft: 16,
  },
  keyText: {
    fontSize: 16,
    //color: "#ccc",
    paddingHorizontal: 16,
  },
});
