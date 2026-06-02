import AsyncStorage from "@react-native-async-storage/async-storage";
import { SymbolView } from "expo-symbols";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCard from "../../../../components/BookCard";
import SearchBar from "../../../../components/SearchBar";
import { COVER_URL } from "../../../../constants/urls";
import { fetchSearch } from "../../../../services/api";
import { getYear } from "../../../../services/functions";
import {
  clearRecentSearches,
  deleteSpecificSearch,
  saveSearch,
} from "../../../../services/localData";

const Search = () => {
  const [books, setBooks] = useState([]);
  const [searchBook, setSearchBook] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [ready, setReady] = useState(true);

  const [stopMoreBook, setStopMoreBook] = useState(false);

  const [offset, setOffset] = useState(0);
  const [entries, setEntries] = useState(0);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchBook.trim()) {
        setLoading(true);

        await saveSearch(searchBook);

        const result = await fetchSearch(searchBook, 0);

        const storedSearches = await AsyncStorage.getItem("@recent_searches");
        if (storedSearches) {
          setHistory(JSON.parse(storedSearches));
        }

        setOffset(0);

        if (result.success) {
          setBooks(result.data);
          setEntries(result.data.numFound);
        } else {
          Alert.alert("Error", result.error);
        }

        //console.log(result.data[0]);

        setLoading(false);
        setReady(false);
      } else {
        setLoading(false);
        setBooks([]);
        setReady(true);
      }
    }, 500);
    setOffset(0);
    setReady(true);

    return () => clearTimeout(timeoutId);
  }, [searchBook]);

  useEffect(() => {
    const loadSearch = async () => {
      const storedSearches = await AsyncStorage.getItem("@recent_searches");
      if (storedSearches) {
        setHistory(JSON.parse(storedSearches));
      }
    };
    loadSearch();
  }, []);

  const loadMoreBooks = async () => {
    if (loadingMore || loading) return;
    if (searchBook.trim() === "") return;
    setLoadingMore(true);

    const newOffset = offset + 10;

    //console.log("aquiiii", newOffset);
    const result = await fetchSearch(searchBook, newOffset);
    //console.log(result);
    setOffset(newOffset);
    if (result.success) {
      setBooks((prev) => [...prev, ...result.data]);
    } else {
      Alert.alert("Error", result.error);
    }
    setLoadingMore(false);
  };

  return (
    <SafeAreaView style={styles.safeview} edges={["top", "left", "right"]}>
      <View
        style={
          {
            //marginVertical: 20,
            //paddingLeft: 16,
            //paddingRight: 16,
          }
        }
      >
        <SearchBar
          placeholder="Search books"
          value={searchBook}
          onChangeText={(text: string) => setSearchBook(text)}
          camera={true}
        />
      </View>

      {loading && <ActivityIndicator size="large" />}

      {!loading && searchBook.trim() && books?.length > 0 && (
        <Text style={styles.text1}>
          Search Result for <Text style={styles.text2}>"{searchBook}"</Text>
        </Text>
      )}

      {books.length !== 0 ? (
        <FlatList
          data={books}
          ItemSeparatorComponent={() => (
            <View style={{ backgroundColor: "lightgray", height: 1 }} />
          )}
          renderItem={({ item }) => (
            <BookCard
              itemKey={item.editions.docs[0].key}
              coverId={item.editions.docs[0].key.split("/")[2]}
              urlPoster={`${COVER_URL}/b/olid/${item.editions.docs[0].key.split("/")[2]}-L.jpg`}
              authorName={item?.author_name ?? [""]}
              title={item.title}
              routeUrl={"editions"}
              orientation={"v"}
              year={getYear(
                item?.editions?.docs?.[0]?.publish_year?.[0].toString(),
              )}
            />
          )}
          keyExtractor={(item) => item.key.toString()}
          ListEmptyComponent={
            !loading ? (
              <View style={styles.containerText}>
                <Text style={styles.text3}>
                  {searchBook.trim() ? "No books found" : "Search for a book"}
                </Text>
              </View>
            ) : null
          }
          onEndReached={loadMoreBooks}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <>
                <ActivityIndicator />
                <View style={styles.endContainer} />
              </>
            ) : (
              <View style={styles.endContainer} />
            )
          }
        />
      ) : history.length !== 0 && searchBook.trim() === "" ? (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              alignItems: "center",
              //marginTop: 5,
              marginBottom: 10,
            }}
          >
            <Text style={styles.bigTitle}>Recent Searches</Text>
            <Text
              style={{ color: "#7663dc" }}
              onPress={async () => {
                await clearRecentSearches();
                setHistory([]);
              }}
            >
              Clear All
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              paddingVertical: 16,
              marginHorizontal: 16,
              borderRadius: 15,
            }}
          >
            {history.map((item, index) => {
              if (index > 4) return;
              return (
                <TouchableOpacity
                  key={`${item}-${index}`}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                    alignItems: "center",
                  }}
                  onPress={() => setSearchBook(item)}
                >
                  <Text style={{ fontWeight: "300" }}>{item}</Text>
                  <TouchableOpacity
                    onPress={async () => {
                      await deleteSpecificSearch(index);

                      const storedSearches =
                        await AsyncStorage.getItem("@recent_searches");
                      if (storedSearches) {
                        setHistory(JSON.parse(storedSearches));
                      }
                    }}
                  >
                    <SymbolView name={"xmark"} tintColor={"gray"} size={18} />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ) : !loading ? (
        <View style={styles.containerText}>
          <Text style={styles.text3}>
            {searchBook.trim() ? "No books found" : "Search for a book"}
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  bigTitle: {
    //paddingTop: 10,
    //paddingBottom: 5,
    fontSize: 20,
    //paddingLeft: 16,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    //alignItems: "center",
    //justifyContent: "center",
  },
  safeview: {
    flex: 1,
    marginTop: 100,
    marginLeft: 15,
    marginRight: 15,
  },
  text1: {
    fontWeight: "600",
    fontSize: 20,
    paddingBottom: 15,
  },
  text2: {
    color: "#7d7d7d",
  },
  text3: {
    fontWeight: "600",
    fontSize: 20,
    paddingBottom: 15,
  },

  containerText: {
    alignItems: "center",
  },

  endContainer: {
    height: 110,
    width: 20,
    flex: 1,
  },
  title: {
    paddingTop: 10,
    fontSize: 32,
    fontWeight: "bold",
  },
});
