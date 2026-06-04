import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused, useLocalSearchParams, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import BookCard from "../../../components/BookCard";
import { validImage } from "../../../constants/functions";
import { COVER_URL } from "../../../constants/urls";
import { BookContext } from "../../../context/BookContext";
import { fetchBookDetails, fetchBookEditions } from "../../../services/api";
import { updateTrendingCount } from "../../../services/apiAPI";
import { findBookInShelve, getYear } from "../../../services/functions";

const BookDetails = () => {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { itemKey, coverId, urlPoster, title, authorName, searchPress } =
    useLocalSearchParams();

  const { shelfBooks, listsBooks } = useContext(BookContext);

  useEffect(() => {
    const trendUpdate = async () => {
      await updateTrendingCount({
        title: title,
        author_name: authorName,
        bookid: itemKey,
      });
    };

    if (Boolean(searchPress)) trendUpdate();
  }, []);

  console.log(
    "Details of work",
    itemKey,
    coverId,
    urlPoster,
    title,
    authorName,
  );
  const [added, setAdded] = useState(0);
  const [addedText, setAddedText] = useState("Want to Read");

  const [details, setDetails] = useState([]);
  const [editions, setEditions] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingEditions, setLoadingEditions] = useState(false);
  const [offset, setOffset] = useState(0);

  const [isValidImage, setIsValidImage] = useState<boolean | null>(null);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  useEffect(() => {
    validImage(urlPoster, setIsValidImage);
  }, [urlPoster]);

  useEffect(() => {
    const id = itemKey.split("/")[2];

    const shelf = findBookInShelve(id, shelfBooks);

    if (shelf) {
      setAdded(shelf);

      if (shelf === 0) setAddedText("Add to Library");
      else if (shelf === 1) setAddedText("Want to Read");
      else if (shelf === 2) setAddedText("Reading");
      else if (shelf === 3) setAddedText("Finished");
      else setAddedText("Not Finished");
    }
  }, [shelfBooks, isFocused]);

  useEffect(() => {
    loadBooksDetails();
  }, []);

  useEffect(() => {
    loadBooksEditions();
  }, []);

  const loadBooksDetails = async () => {
    //console.log("books/", id);
    setLoadingDetails(true);
    const result = await fetchBookDetails(itemKey.split("/")[2], "works");

    if (result?.success) {
      //console.log(result.data);
      setDetails(result.data);
    } else {
      Alert.alert("Error", result.error);
    }

    //console.log(details, "aqui");
    setLoadingDetails(false);
  };

  const loadBooksEditions = async () => {
    if (loadingEditions) return;
    setLoadingEditions(true);
    const result = await fetchBookEditions(itemKey.split("/")[2], 3, 0);

    if (result?.success) {
      setEditions(result.data);
      setOffset(10 + offset);
    } else {
      Alert.alert("Error", result.error);
    }

    setLoadingEditions(false);
  };

  //console.log(details);

  return (
    <ScrollView
      style={isDarkMode ? styles.darkBg : styles.lightBg}
      contentContainerStyle={[styles.scrollContent]}
    >
      <View style={{ height: 120 }} />
      <View style={styles.container}>
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
            <View style={styles.row}>
              <View style={styles.imageContainer}>
                {isValidImage === null ? (
                  <ActivityIndicator size="small" color={"white"} />
                ) : isValidImage ? (
                  <Image
                    source={{ uri: urlPoster }}
                    style={styles.coverImage}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={styles.noImage}>
                    <Text style={{ color: "#fff" }}>No Image</Text>
                  </View>
                )}
              </View>

              <View style={styles.rightContent}>
                <Text
                  style={[
                    styles.titleName,
                    isDarkMode ? styles.lightText : styles.darkText,
                  ]}
                >
                  {details.title}
                </Text>

                <View style={styles.authors}>
                  {details.authorDetails?.map((item, index) => {
                    const id = item.key.split("/")[2];
                    const isLast = index === details.authorDetails.length - 1;

                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() =>
                          router.push({
                            pathname: `/authors/${id}`,
                            params: { authorId: id },
                          })
                        }
                        style={{ flexDirection: "row" }}
                      >
                        <Text
                          style={[
                            styles.authorText,
                            { color: isDarkMode ? "lightgray" : "gray" },
                          ]}
                        >
                          {item.name}
                        </Text>
                        {!isLast && (
                          <Text
                            style={[
                              styles.authorText,
                              { color: isDarkMode ? "lightgray" : "gray" },
                            ]}
                          >
                            ,{" "}
                          </Text>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/shelfLists",
                  params: {
                    bookId: itemKey,
                    title: details.title,
                    authors: details.authorDetails
                      .map((item) => item.name)
                      .join(", "),
                  },
                });
              }}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  added === 0 ? ["#9d87ed", "#7663dc"] : ["#a4a0b1", "#9591ad"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.buttonAdd,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    borderColor: "#a9a0da",
                    borderWidth: 1,
                  },
                ]}
              >
                {added !== 0 ? (
                  <SymbolView
                    name={"checkmark.seal"}
                    size={18}
                    tintColor={"white"}
                    style={{ marginRight: 10 }}
                  />
                ) : null}
                <Text style={[styles.buttonText]}>{addedText}</Text>

                <SymbolView
                  name="chevron.down"
                  tintColor="white"
                  weight="semibold"
                  size={16}
                  style={{ position: "absolute", right: 16 }}
                />
              </LinearGradient>
            </TouchableOpacity>

            <View
              style={[
                {
                  //backgroundColor: "#fff",
                  marginHorizontal: 16,
                  paddingVertical: 15,
                  borderRadius: 10,
                },
                isDarkMode ? styles.buttonDark : styles.buttonLight,
              ]}
            >
              <Text
                numberOfLines={4}
                style={[
                  styles.keyText,
                  isDarkMode ? styles.lightText : styles.darkText,
                ]}
              >
                {details?.description?.value ??
                  details?.description ??
                  "No Description"}
              </Text>
              <TouchableOpacity
                style={{ alignSelf: "flex-end", paddingRight: 16 }}
                onPress={() =>
                  router.push({
                    pathname: "/moreInfo/info",
                    params: {
                      description:
                        details?.description?.value ??
                        details?.description ??
                        "No Description",
                    },
                  })
                }
              >
                <Text style={{ fontWeight: "600", color: "#7663dc" }}>
                  more
                </Text>
              </TouchableOpacity>
            </View>

            {/*
            <Text style={[styles.title, { color: colorText }]}>Author</Text>
            <FlatList
              data={details.authorDetails}
              horizontal
              showsHorizontalScrollIndicator={true}
              style={{ marginBottom: 25 }}
              //ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
              contentContainerStyle={{ paddingHorizontal: 8 }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <AuthorCard
                  authorId={item.key.split("/")[2]}
                  name={item.name}
                />
              )}
            /> */}
          </>
        )}

        {loadingEditions ? null : editions.length !== 0 ? (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginRight: 16,
                alignItems: "center",
                //marginTop: 5,
                marginBottom: 10,
                marginTop: 16,
              }}
            >
              <Text
                style={[
                  styles.title,
                  isDarkMode ? styles.lightText : styles.darkText,
                ]}
              >
                Editions
              </Text>
              <Text
                style={{ color: "#7663dc" }}
                onPress={() =>
                  router.push({
                    pathname: `/moreBooks/${itemKey.split("/")[2]}`,
                    params: {
                      endpoint: "editions",
                      bookId: itemKey.split("/")[2],
                    },
                  })
                }
              >
                See All
              </Text>
            </View>
            <FlatList
              data={editions}
              style={{ paddingLeft: 6 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <BookCard
                  itemKey={item.key}
                  coverId={item.key.split("/")[2]}
                  urlPoster={`${COVER_URL}/b/olid/${item.key.split("/")[2]}-L.jpg`}
                  authorName={[""]}
                  title={item.title}
                  routeUrl={"editions"}
                  year={getYear(item.publish_date)}
                />
              )}
              //onEndReached={loadBooksEditions}
              //onEndReachedThreshold={0.5} // Trigger when 50% from bottom
              ListFooterComponent={<View style={{ height: 20 }} />}
            />
          </>
        ) : null}
        <View style={{ height: 20 }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  darkBg: { backgroundColor: "#000" },
  lightBg: { backgroundColor: "#f2f2f2" },
  buttonDark: { backgroundColor: "#2f2f2f" },
  buttonLight: { backgroundColor: "#fff" },
  lightText: { color: "white" },
  darkText: { color: "black" },

  container: {
    flex: 1,
  },

  scrollContent: {
    // paddingBottom: 80,
  },

  // 🔥 MAIN ROW (image + content)
  row: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 10,
    alignItems: "flex-start",
    gap: 12,
  },

  // 📸 IMAGE
  imageContainer: {
    width: 120,
    height: 180,
    //borderRadius: 8,
    overflow: "hidden",
  },

  coverImage: {
    width: "100%",
    height: "100%",
  },

  noImage: {
    width: 100,
    height: 150,
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  noImageText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },

  // 📖 RIGHT SIDE CONTENT
  rightContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  // 📌 TITLE
  titleName: {
    fontSize: 18,
    fontWeight: "700",
    flexWrap: "wrap",
    color: "#000",
  },

  // ✍️ AUTHORS CONTAINER
  authors: {
    marginTop: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },

  authorText: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },

  // (optional other styles kept clean)
  title: {
    fontSize: 20,
    fontWeight: "600",
    paddingLeft: 16,
  },

  keyText: {
    fontSize: 16,
    paddingHorizontal: 16,
  },

  buttonAdd: {
    borderRadius: 100,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "70%",
    alignSelf: "center",
    marginTop: 18,
    marginBottom: 18,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },

  chevron: {
    position: "absolute",
    right: -75,
    top: -5,
    borderColor: "#fff",
    borderWidth: 0.2,
    borderRadius: 100,
    padding: 5,
  },
});

export default BookDetails;
