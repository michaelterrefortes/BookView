import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
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
  View,
} from "react-native";
import BookCard from "../../../../../components/BookCard";
import { COVER_URL } from "../../../../../constants/urls";
import { BookContext } from "../../../../../context/BookContext";
import {
  fetchBookDetails,
  fetchBookEditions,
} from "../../../../../services/api";
import { findBookInShelve, getYear } from "../../../../../services/functions";

const BookEditionDetails = () => {
  const { itemKey, coverId, urlPoster, title, authorName } =
    useLocalSearchParams();

  const { shelfBooks } = useContext(BookContext);

  const cover = coverId;
  const id = itemKey.split("/")[2];

  //console.log(itemKey);

  const router = useRouter();

  console.log(
    "Edition details",
    itemKey,
    coverId,
    urlPoster,
    title,
    authorName,
  ); //;

  //console.log("looking at edition", cover, id);

  const [details, setDetails] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [added, setAdded] = useState(0);
  const [editions, setEditions] = useState([]);
  const [loadingEditions, setLoadingEditions] = useState(false);

  const [idWork, setIdWork] = useState("");

  useEffect(() => {
    const id = itemKey.split("/")[2];

    const shelf = findBookInShelve(id, shelfBooks);

    if (shelf) {
      setAdded(shelf);
    }

    //console.log(added);
  }, [shelfBooks]);

  useEffect(() => {
    const loadBooks = async () => {
      //console.log("editions/", id, key);
      setLoadingDetails(true);
      setLoadingEditions(true);
      const result = await fetchBookDetails(id, "books");

      //console.log(result);

      const workId = result.data.works[0].key.split("/")[2];

      setIdWork(workId);

      //console.log("\n\n\nno hay", workId);

      const result2 = await fetchBookDetails(workId, "works");
      //console.log(result2);
      if (!result.data?.description) {
        result.data["description"] = result2.data.description;
        //console.log("aqui");
      }

      if (!result.data?.authorDetails) {
        result.data["authorDetails"] = result2.data.authorDetails;
      }

      const resultEditions = await fetchBookEditions(workId, 3, 0);

      if (result.success) {
        //console.log(result);
        setDetails(result.data);
      }
      //console.log(result);
      else {
        Alert.alert("Error", result.error);
      }

      if (resultEditions?.success) {
        setEditions(resultEditions.data);
      } else {
        Alert.alert("Error", resultEditions.error);
      }

      setLoadingDetails(false);
      setLoadingEditions(false);
    };

    loadBooks();
  }, []);

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

            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/shelfLists",
                  params: { bookId: itemKey },
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
                <Text style={[styles.buttonText]}>
                  {added === 0
                    ? "Add to Library"
                    : added === 1
                      ? "Want to Read"
                      : added === 2
                        ? "Reading"
                        : added === 3
                          ? "Finished"
                          : "Not Finished"}
                </Text>

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
              style={{
                backgroundColor: "#fff",
                marginHorizontal: 16,
                paddingVertical: 15,
                borderRadius: 10,
              }}
            >
              <Text numberOfLines={4} style={[styles.keyText]}>
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
              <Text style={[styles.title]}>Editions</Text>
              <Text
                style={{ color: "#7663dc" }}
                onPress={() =>
                  router.push({
                    pathname: `/moreBooks/${idWork}`,
                    params: {
                      endpoint: "editions",
                      bookId: idWork,
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

        {loadingDetails ? null : (
          <View
            style={{
              //smarginRight: 16,
              //alignItems: "center",
              marginTop: 5,
            }}
          >
            <Text style={[styles.title2, { marginBottom: 20 }]}>About</Text>

            <View
              style={{
                backgroundColor: "white",
                marginHorizontal: 16,
                paddingHorizontal: 15,
                borderRadius: 10,
              }}
            >
              {details?.isbn_13?.length > 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 20,
                    borderBottomColor: "lightgray",
                    //borderBottomWidth: "50%",
                    borderBottomWidth: 0.2,
                  }}
                >
                  <Text style={{ width: "30%", fontWeight: "700" }}>ISBN</Text>
                  <Text>{details.isbn_13.join(", ")}</Text>
                </View>
              )}

              {details?.number_of_pages && (
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 20,
                    borderBottomColor: "lightgray",
                    //borderBottomWidth: "50%",
                    borderBottomWidth: 0.2,
                  }}
                >
                  <Text style={{ width: "30%", fontWeight: "700" }}>Pages</Text>
                  <Text>{details.number_of_pages}</Text>
                </View>
              )}

              {details?.publish_date && (
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 20,
                    borderBottomColor: "lightgray",
                    //borderBottomWidth: "50%",
                    borderBottomWidth: 0.2,
                  }}
                >
                  <Text style={{ width: "30%", fontWeight: "700" }}>
                    Published Date
                  </Text>
                  <Text>{details.publish_date}</Text>
                </View>
              )}

              {details?.publish_places?.length > 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 20,
                    borderBottomColor: "lightgray",
                    //borderBottomWidth: "50%",
                    borderBottomWidth: 0.2,
                  }}
                >
                  <Text>
                    <Text style={{ width: "30%", fontWeight: "700" }}>
                      Published Place
                    </Text>
                    {details.publish_places
                      .map((place) => place.name || place)
                      .join(", ")}
                  </Text>
                </View>
              )}

              {details?.publishers?.length > 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 20,
                    borderBottomColor: "lightgray",
                    //borderBottomWidth: "50%",
                    borderBottomWidth: 0.2,
                  }}
                >
                  <Text style={{ width: "30%", fontWeight: "700" }}>
                    Publisher
                  </Text>
                  <Text>
                    {details.publishers
                      .map((publisher) => publisher.name || publisher)
                      .join(", ")}
                  </Text>
                </View>
              )}
            </View>
          </View>
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

  title2: {
    fontSize: 20,
    fontWeight: "600",
    //color: "#fff",
    marginBottom: 8,
    marginTop: 8,
    paddingLeft: 16,
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

export default BookEditionDetails;
