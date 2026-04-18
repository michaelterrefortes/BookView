import { Link, useIsFocused, useLocalSearchParams } from "expo-router";
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
import Ionicons from "react-native-vector-icons/Ionicons";
import AuthorCard from "../../../../components/AuthorCard";
import BookCard from "../../../../components/BookCard";
import { fetchBookDetails, fetchBookEditions } from "../../../../services/api";
import { getBook, removeBook } from "../../../../services/localData";

const BookDetails = () => {
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
    <ScrollView contentContainerStyle={styles.scrollContent}>
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
            <Text style={styles.titleName}>{details.title}</Text>
            {!added ? (
              <TouchableOpacity
                style={styles.buttonAdd}
                onPress={async () => {
                  //console.log("\n\n\n");
                  /*const res = await storeBook(
                    id,
                    details.title,
                    details.authorDetails.map((a) => a.name).join(", "),
                    cover,
                  );
                  setAdded(res.saved);*/
                  Alert.alert("Adding book", "Add Book?");
                  //console.log("saved", res.saved);
                  //await clearAll();
                }}
              >
                <Text style={{ fontSize: 16 }}>
                  <Ionicons name={"add-outline"} size={16} />
                  Add to library
                </Text>
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
                <Text style={{ fontSize: 16 }}>
                  <Ionicons name={"remove-circle-outline"} size={16} />
                  Remove from library
                </Text>
              </TouchableOpacity>
            )}
            <Text style={styles.keyText}>{details.description}</Text>
            <Text style={styles.title}>Author</Text>
            <FlatList
              data={details.authorDetails}
              horizontal
              showsHorizontalScrollIndicator={true}
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

        <Link href={`/moreBooks/editions_${id}`} asChild>
          <Text style={styles.title}>
            Editions
            <Ionicons name={"chevron-forward-outline"} size={25} />
          </Text>
        </Link>
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
            showsHorizontalScrollIndicator={true}
            //ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            contentContainerStyle={{ paddingHorizontal: 16 }}
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
    //backgroundColor: "#121212", // dark background
    //paddingTop: 60,
    //paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 80,
    //paddingHorizontal: 16,
  },
  imageContainer: {
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#aaa", //backgroundColor: "#333", // fallback bg if no image
    width: 150, // smaller width
    aspectRatio: 200 / 350, // original width / height

    alignSelf: "center",
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
    //color: "#414040", //"#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    //color: "#fff",
    marginBottom: 8,
    paddingLeft: 16,
  },
  titleName: {
    fontSize: 28,
    fontWeight: "bold",
    //color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  keyText: {
    fontSize: 16,
    //color: "#ccc",
    paddingLeft: 16,
  },

  buttonAdd: {
    //width: 160,
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
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.1,
    //shadowRadius: 4,
    //elevation: 3,
  },
  buttonRemove: {
    //width: 10,
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
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.1,
    //shadowRadius: 4,
    //elevation: 3,
  },
});

export default BookDetails;
