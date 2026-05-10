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
import { getColors } from "react-native-image-colors";
import AuthorCard from "../../../../../components/AuthorCard";
import BookCard from "../../../../../components/BookCard";
import {
  fetchBookDetails,
  fetchBookEditions,
} from "../../../../../services/api";
import {
  getBook,
  removeBook,
  storeBook,
} from "../../../../../services/localData";

const getTextColor = (backgroundColor) => {
  // Simple check for hex colors, expand for rgb/hsl if needed

  if (backgroundColor.startsWith("#")) {
    const r = parseInt(backgroundColor.substr(1, 2), 16);
    const g = parseInt(backgroundColor.substr(3, 2), 16);
    const b = parseInt(backgroundColor.substr(5, 2), 16);
    const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000);

    // Threshold 150 works well, but can be adjusted
    return brightness < 150 ? "#FFFFFF" : "#000000";
  }
  return "#000000"; // Default
};

const BookDetails = () => {
  const router = useRouter();
  const { key } = useLocalSearchParams();
  const cover = key?.split("_")[1];
  const id = key?.split("_")[0];

  const [details, setDetails] = useState([]);
  const [editions, setEditions] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingEditions, setLoadingEditions] = useState(false);
  const [offset, setOffset] = useState(0);

  const [added, setAdded] = useState(false);

  const isFocused = useIsFocused();

  const [colors, setColors] = useState(null);

  const [colorText, setColorText] = useState("black");

  useEffect(() => {
    const url = `https://covers.openlibrary.org/b/id/${cover}-M.jpg`;
    getColors(url, {
      fallback: "#228B22",
      cache: true,
      key: url,
    }).then(setColors);
    console.log(colors);
    setColorText(getTextColor(colors?.background));
  }, []);

  useEffect(() => {
    const loadBooksDetails = async () => {
      //console.log("books/", id);
      setLoadingDetails(true);
      const result = await fetchBookDetails(id, "works");

      setDetails(result);
      //console.log(details, "aqui");
      setLoadingDetails(false);
    };

    loadBooksDetails();
  }, []);

  useEffect(() => {
    loadBooksEditions();
  }, []);

  useEffect(() => {
    const checkSaved = async () => {
      const saved = await getBook(id);
      setAdded(saved.saved);
    };
    checkSaved();
  }, [isFocused]);

  const loadBooksEditions = async () => {
    if (loadingEditions) return;
    setLoadingEditions(true);
    const result = await fetchBookEditions(id, offset);
    setEditions([...editions, ...result]);
    setLoadingEditions(false);
    setOffset(10 + offset);
  };

  const renderFooter = () => {
    return loadingEditions ? <ActivityIndicator size="large" /> : null;
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors?.background }}
      contentContainerStyle={[styles.scrollContent]}
    >
      <View style={styles.container}>
        <View
          style={{
            height: 60,
          }}
        />
        <View style={styles.imageContainer}>
          {cover ? (
            <Image
              source={{
                uri: `https://covers.openlibrary.org/b/id/${cover}-M.jpg`,
              }}
              style={styles.coverImage}
              resizeMode="contain"
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
            <Text style={[styles.titleName, { color: colorText }]}>
              {details.title}
            </Text>
            {!added ? (
              <TouchableOpacity
                style={styles.buttonAdd}
                onPress={async () => {
                  //console.log("\n\n\n");
                  const res = await storeBook(
                    id,
                    details.title,
                    details.authorDetails.map((a) => a.name).join(", "),
                    cover,
                  );
                  setAdded(res.saved);
                  Alert.alert("Adding book", "Add Book?");
                  //console.log("saved", res.saved);
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
                  const res = await removeBook(id);

                  setAdded(!res.removed);
                  //console.log("removed", res.removed);
                }}
              >
                <SymbolView name={"minus"} tintColor={"black"} size={16} />
                <Text style={{ fontSize: 16 }}>Remove</Text>
              </TouchableOpacity>
            )}
            <Text style={[styles.keyText, { color: colorText }]}>
              {details?.description}
            </Text>
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
                  authorKey={item.key}
                  name={item.name}
                  routeUrl={"authors/"}
                />
              )}
            />
          </>
        )}

        <TouchableOpacity
          onPress={() => router.push(`/moreBooks/editions_${id}`)}
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
                urlPoster={`https://covers.openlibrary.org/b/olid/${item.key.split("/")[2]}-M.jpg`}
                authorName={[""]}
                title={item.title}
                routeUrl={"editions/"}
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
    marginBottom: 25,
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
