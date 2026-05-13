import { useLocalSearchParams, useRouter } from "expo-router";
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
import AuthorCard from "../../../../../components/AuthorCard";
import BookCard from "../../../../../components/BookCard";
import { COVER_URL } from "../../../../../constants/urls";
import {
  fetchBookDetails,
  fetchBookEditions,
} from "../../../../../services/api";
import { getYear } from "../../../../../services/functions";

const BookEditionDetails = () => {
  const { itemKey, coverId, urlPoster, title, authorName } =
    useLocalSearchParams();
  const cover = coverId;
  const id = itemKey.split("/")[2];

  const router = useRouter();

  //console.log(
  // "Edition details",
  // itemKey,
  // coverId,
  // urlPoster,
  // title,
  // authorName,
  //)//;

  //console.log("looking at edition", cover, id);

  const [colorText, setColorText] = useState("black");

  const [details, setDetails] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [added, setAdded] = useState(false);
  const [editions, setEditions] = useState([]);

  const [idWork, setIdWork] = useState("");

  useEffect(() => {
    const loadBooks = async () => {
      //console.log("editions/", id, key);
      setLoadingDetails(true);
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
        console.log(result);
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
            <View style={styles.imageContainer}>
              {coverId ? (
                <Image
                  source={{
                    uri: urlPoster,
                  }}
                  style={styles.coverImage}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.noImage}>
                  <Text style={{ color: "#ffffff" }}>No Image</Text>
                </View>
              )}
            </View>
            <Text style={[styles.titleName, { color: colorText }]}>
              {details.title}
            </Text>
            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={() => {
                //console.log("\n\n\n");

                //console.log("Book saved");
                router.push({
                  pathname: "/shelfLists",
                  params: { bookId: itemKey },
                });
                //await clearAll();
              }}
            >
              <SymbolView
                name={"plus"}
                tintColor={"white"}
                weight={"semibold"}
                size={16}
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 14, fontWeight: "600", color: "white" }}>
                {!added ? "Add" : "Remove"}
              </Text>
            </TouchableOpacity>

            <Text
              numberOfLines={4}
              style={[styles.keyText, { color: colorText }]}
            >
              {details?.description}
            </Text>
            <TouchableOpacity
              style={{ alignSelf: "flex-end", paddingRight: 16 }}
              onPress={() =>
                router.push({
                  pathname: "/moreInfo/info",
                  params: {
                    description: details?.description,
                  },
                })
              }
            >
              <Text style={{ fontWeight: "600" }}>MORE</Text>
            </TouchableOpacity>
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
            />
          </>
        )}

        {loadingDetails ? null : (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginRight: 16,
                alignItems: "center",
                //marginTop: 5,
                marginBottom: 10,
              }}
            >
              <Text style={[styles.title, { color: colorText }]}>Editions</Text>
              <Text
                onPress={() =>
                  router.push({
                    pathname: `/moreBooks/${idWork}`,
                    params: { endpoint: "editions", bookId: idWork },
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
      </View>
    </ScrollView>
  );

  /*return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ height: 60 }} />
        <View style={styles.imageContainer}>
          {cover ? (
            <Image
              source={{
                uri: `${COVER_URL}/b/olid/${cover}-L.jpg`,
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
            <Text style={styles.keyText}>ISBN {details.isbn_13}</Text>
            <Text style={styles.keyText}>Pages {details.number_of_pages}</Text>
            <Text style={styles.keyText}>
              Published on {details.publish_date}
            </Text>
            <Text style={styles.keyText}>
              Published in {details.publish_places}
            </Text>
            <Text style={styles.keyText}>
              Publisher {details.publishers.join(", ")}
            </Text>
          </>
        )}
      </ScrollView>
    </View>
  );*/
};

const styles = StyleSheet.create({
  title2: {
    fontSize: 20,
    fontWeight: "600",
    //color: "#fff",
    marginBottom: 8,
    marginTop: 8,
    paddingLeft: 16,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    //paddingBottom: 80,
    paddingBottom: 30,
  },
  imageContainer: {
    width: 180,
    height: 270,
    //backgroundColor: "red",
    //borderRadius: 8,
    overflow: "hidden",
    alignSelf: "center",
    marginBottom: 20,
  },
  coverImage: {
    width: "100%",
    height: "100%",
    //backgroundColor: "blue",
  },
  noImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 270,
    backgroundColor: "#aaa",
    //borderRadius: 8,
    overflow: "hidden",
    alignSelf: "center",
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",

    paddingLeft: 16,
  },
  titleName: {
    fontSize: 28,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  keyText: {
    fontSize: 16,

    paddingHorizontal: 16,
    //marginBottom: 25,
  },

  buttonAdd: {
    alignItems: "center",
    backgroundColor: "#1b95ff",
    borderRadius: 100,
    paddingVertical: 8,
    shadowColor: "#000",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 18,
    flexDirection: "row",
    width: "40%",

    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.1,
    //shadowRadius: 4,
    //elevation: 3,
  },
  buttonRemove: {
    alignItems: "center",
    backgroundColor: "#c1c1c1",
    borderRadius: 100,
    paddingVertical: 8,
    shadowColor: "#000",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 18,
    flexDirection: "row",

    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.1,
    //shadowRadius: 4,
    //elevation: 3,
  },
});

export default BookEditionDetails;
