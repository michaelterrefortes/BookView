import { useIsFocused, useLocalSearchParams, useRouter } from "expo-router";
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
import AuthorCard from "../../../../../components/AuthorCard";
import BookCard from "../../../../../components/BookCard";
import { COVER_URL } from "../../../../../constants/urls";
import {
  fetchBookDetails,
  fetchBookEditions,
} from "../../../../../services/api";

const BookDetails = () => {
  const router = useRouter();
  const { itemKey, coverId, urlPoster, title, authorName } =
    useLocalSearchParams();

  //console.log("Details", itemKey, coverId, urlPoster, title, authorName);

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

    setDetails(result);
    //console.log(details, "aqui");
    setLoadingDetails(false);
  };

  const loadBooksEditions = async () => {
    if (loadingEditions) return;
    setLoadingEditions(true);
    const result = await fetchBookEditions(itemKey.split("/")[2], offset);
    setEditions([...editions, ...result]);
    setLoadingEditions(false);
    setOffset(10 + offset);
  };

  return (
    <ScrollView contentContainerStyle={[styles.scrollContent]}>
      <View style={styles.container}>
        <View
          style={{
            height: 60,
          }}
        />
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
            <Text style={[styles.titleName, { color: colorText }]}>
              {details.title}
            </Text>
            {!added ? (
              <TouchableOpacity
                style={styles.buttonAdd}
                onPress={async () => {
                  //console.log("\n\n\n");

                  console.log("Book saved");
                  //await clearAll();
                }}
              >
                <SymbolView name={"plus"} tintColor={"black"} size={20} />
                <Text style={{ fontSize: 16 }}>Add to library</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.buttonRemove}
                onPress={async () => {
                  //console.log("\n\n\n");

                  console.log("Book removed");
                }}
              >
                <SymbolView name={"minus"} tintColor={"black"} size={16} />
                <Text style={{ fontSize: 16 }}>Remove</Text>
              </TouchableOpacity>
            )}
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

        <TouchableOpacity
          onPress={() => router.push(`/moreBooks/${itemKey.split("/")[2]}`)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Text style={[styles.title, { color: colorText }]}>Editions</Text>
          <SymbolView name={"chevron.right"} tintColor={colorText} size={18} />
        </TouchableOpacity>
        {loadingEditions ? (
          <View>
            <ActivityIndicator
              size="large"
              //color="#0000ff"
              //className="mt-10 self-center"
            />
          </View>
        ) : (
          <FlatList
            data={editions}
            horizontal
            showsHorizontalScrollIndicator={false}
            //ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            contentContainerStyle={{
              paddingHorizontal: 8,
              alignItems: "flex-end",
              gap: 16,
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <BookCard
                itemKey={item.key}
                coverId={item.key.split("/")[2]}
                urlPoster={`${COVER_URL}/b/olid/${item.key.split("/")[2]}-L.jpg`}
                authorName={[""]}
                title={item.title}
                routeUrl={"editions"}
              />
            )}
            //onEndReached={loadBooksEditions}
            //onEndReachedThreshold={0.5} // Trigger when 50% from bottom
            //ListFooterComponent={renderFooter}
          />
        )}
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
    borderRadius: 8,
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
    borderRadius: 8,
    overflow: "hidden",
    alignSelf: "center",
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",

    paddingLeft: 16,
  },
  titleName: {
    fontSize: 28,
    fontWeight: "bold",

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
    backgroundColor: "#71bdff",
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

export default BookDetails;
