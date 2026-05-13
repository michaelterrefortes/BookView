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
import AuthorCard from "../../../../../components/AuthorCard";
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
              }}
            >
              <Text style={[styles.title, { color: colorText }]}>Editions</Text>
              <Text
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
    //paddingBottom: 80,
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
    backgroundColor: "#1b95ff",
    borderRadius: 100,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "70%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 18,

    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },

  chevron: {
    position: "absolute",
    right: 20,
    borderColor: "#add9ff",
    borderWidth: 1,
    //top: "140%",
    borderRadius: 100,
    padding: 5,

    //transform: [{ translateY: -8 }], // half icon height
  },
});

export default BookDetails;
