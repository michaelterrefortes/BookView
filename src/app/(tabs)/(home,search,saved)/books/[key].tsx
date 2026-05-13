import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused, useLocalSearchParams, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import {
  fetchBookDetails,
  fetchBookEditions,
} from "../../../../../services/api";
import { getYear } from "../../../../../services/functions";

const BookDetails = () => {
  const router = useRouter();
  const { itemKey, coverId, urlPoster, title, authorName } =
    useLocalSearchParams();

  //console.log(
  //  "Details of work",
  //  itemKey,
  //  coverId,
  //  urlPoster,
  //  title,
  //  authorName,
  //);

  const [details, setDetails] = useState([]);
  const [editions, setEditions] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingEditions, setLoadingEditions] = useState(false);
  const [offset, setOffset] = useState(0);

  const [added, setAdded] = useState(false);

  const isFocused = useIsFocused();

  //console.log(bgColor);

  const [colorText, setColorText] = useState("black");

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
    <ScrollView contentContainerStyle={[styles.scrollContent]}>
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
                {coverId ? (
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
                <Text style={styles.titleName}>{details.title}</Text>

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
                        <Text style={styles.authorText}>{item.name}</Text>
                        {!isLast && <Text style={styles.authorText}>, </Text>}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>

            <LinearGradient
              colors={["#9d87ed", "#7663dc"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonAdd}
            >
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "/shelfLists",
                    params: { bookId: itemKey },
                  });
                }}
              >
                <Text style={styles.buttonText}>Want to Read</Text>

                <TouchableOpacity
                  style={styles.chevron}
                  onPress={() => {
                    router.push({
                      pathname: "/shelfLists",
                      params: { bookId: itemKey },
                    });
                  }}
                >
                  <SymbolView
                    name={"chevron.down"}
                    tintColor={"white"}
                    weight={"semibold"}
                    size={16}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </LinearGradient>

            <View
              style={{
                backgroundColor: "#fff",
                marginHorizontal: 16,
                paddingVertical: 15,
                borderRadius: 10,
              }}
            >
              <Text
                numberOfLines={4}
                style={[styles.keyText, { color: colorText }]}
              >
                {details?.description ?? "No Description"}
              </Text>
              <TouchableOpacity
                style={{ alignSelf: "flex-end", paddingRight: 16 }}
                onPress={() =>
                  router.push({
                    pathname: "/moreInfo/info",
                    params: {
                      description: details?.description ?? "No Description",
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

        {loadingEditions ? null : (
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
              <Text style={[styles.title, { color: colorText }]}>Editions</Text>
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
        )}
        <View style={{ height: 20 }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    width: 100,
    height: 150,
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
