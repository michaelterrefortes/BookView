import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import BookCard from "../../../components/BookCard";
import { COVER_URL } from "../../../constants/urls";
import { fetchAuthor, fetchAuthorWorks } from "../../../services/api";
import { getYear } from "../../../services/functions";

const AuthorDetails = () => {
  const router = useRouter();
  const { key } = useLocalSearchParams();

  //console.log("Author details", key);

  const [authorInfo, setAuthorInfo] = useState({});
  const [authorBooks, setAuthorBooks] = useState([]);
  const [loadingAuthor, setLoadingAuthor] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(false);

  const [offset, setOffset] = useState(0);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  useEffect(() => {
    const loadAuthor = async () => {
      //console.log("books/", id);
      setLoadingAuthor(true);
      const result = await fetchAuthor(key);

      //sconsole.log(result.data);

      if (result?.success) {
        setAuthorInfo(result.data);
      } else {
        Alert.alert("Error", result.error);
      }
      //console.log(result.bio);

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
    const result = await fetchAuthorWorks(key, 3);

    if (result?.success) {
      setAuthorBooks([...authorBooks, ...result.data]);

      setOffset(10 + offset);
    } else {
      Alert.alert("Error", result.error);
    }

    setLoadingBooks(false);
  };

  //console.log(authorBooks[1]);

  return (
    <ScrollView
      style={isDarkMode ? styles.darkBg : styles.lightBg}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={{ height: 100 }} />
      <View style={styles.container}>
        <View style={{ flexDirection: "row", paddingHorizontal: 16 }}>
          <View style={styles.imageContainer}>
            {authorInfo.photos ? (
              <Image
                source={{
                  uri: `${COVER_URL}/a/olid/${key}-L.jpg`,
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
              <Text
                style={[
                  styles.title,
                  isDarkMode ? styles.lightText : styles.darkText,
                ]}
              >
                {authorInfo.name}
              </Text>
            </>
          ) : null}
        </View>
        {!loadingAuthor && authorInfo ? (
          <>
            <Text
              style={[
                styles.keyText,
                isDarkMode ? styles.lightText : styles.darkText,
              ]}
              numberOfLines={4}
            >
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
              <Text style={{ fontWeight: "600", color: "#7663dc" }}>more</Text>
            </TouchableOpacity>
          </>
        ) : null}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 16,
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Text
            style={[
              styles.title2,
              isDarkMode ? styles.lightText : styles.darkText,
            ]}
          >
            Books
          </Text>
          <Text
            onPress={() =>
              router.push({
                pathname: `/moreBooks/${key}`,
                params: { endpoint: "author", bookId: key },
              })
            }
            style={{ color: "#7663dc" }}
          >
            See All
          </Text>
        </View>

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
                coverId={item.key.split("/")[2]}
                urlPoster={`${COVER_URL}/w/olid/${item.key.split("/")[2]}-L.jpg`}
                authorName={[""]}
                title={item.title}
                routeUrl={"books"}
                year={String(getYear(item.first_publish_date))}
              />
            )}
          />
        )}

        {loadingBooks && authorInfo.length !== 0 ? (
          <View style={styles.containerLoading}>
            <ActivityIndicator
              size="large"
              //color="#0000ff"
              //className="mt-10 self-center"
            />
          </View>
        ) : (
          <View
            style={[
              {
                //smarginRight: 16,
                //alignItems: "center",
                marginTop: 5,
              },
            ]}
          >
            <Text
              style={[
                styles.title2,
                { marginBottom: 20 },
                isDarkMode ? styles.lightText : styles.darkText,
              ]}
            >
              About
            </Text>

            <View
              style={[
                {
                  backgroundColor: "white",
                  marginHorizontal: 16,
                  paddingHorizontal: 15,
                  borderRadius: 10,
                },
                isDarkMode ? styles.buttonDark : styles.buttonLight,
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 20,
                  borderBottomColor: "lightgray",
                  //borderBottomWidth: "50%",
                  borderBottomWidth: 0.2,
                }}
              >
                <Text
                  style={[
                    { width: "30%", fontWeight: "700" },
                    isDarkMode ? styles.lightText : styles.darkText,
                  ]}
                >
                  Born
                </Text>
                <Text style={isDarkMode ? styles.lightText : styles.darkText}>
                  {authorInfo?.birth_date ?? "No Data"}
                </Text>
              </View>

              <View style={{ flexDirection: "row", paddingVertical: 20 }}>
                <Text
                  style={[
                    { width: "30%", fontWeight: "700" },
                    isDarkMode ? styles.lightText : styles.darkText,
                  ]}
                >
                  Website
                </Text>

                <Text
                  style={{ color: "#7663dc", flex: 1, flexWrap: "wrap" }}
                  onPress={() => {
                    const url = authorInfo?.links?.[0]?.url;

                    if (url) {
                      Linking.openURL(url);
                    } else {
                      Alert.alert("No website available");
                    }
                  }}
                >
                  {authorInfo?.links?.[0]?.url || "No website"}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default AuthorDetails;

const styles = StyleSheet.create({
  darkBg: { backgroundColor: "#000" },
  lightBg: { backgroundColor: "#f2f2f2" },
  buttonDark: { backgroundColor: "#2f2f2f" },
  buttonLight: { backgroundColor: "#fff" },
  lightText: { color: "white" },
  darkText: { color: "black" },

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
    height: 100,
    width: 100,
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
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 15,
    //color: "#fff",
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  title2: {
    fontSize: 20,
    fontWeight: "600",
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
