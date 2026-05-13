import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCard from "../../../../components/BookCard";
import SearchBar from "../../../../components/SearchBar";
import { COVER_URL } from "../../../../constants/urls";
import { fetchSearch } from "../../../../services/api";
import { getYear } from "../../../../services/functions";

const Search = () => {
  const [books, setBooks] = useState([]);
  const [searchBook, setSearchBook] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [ready, setReady] = useState(true);

  const [stopMoreBook, setStopMoreBook] = useState(false);

  const [offset, setOffset] = useState(0);
  const [entries, setEntries] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchBook.trim()) {
        setLoading(true);

        const result = await fetchSearch(searchBook, 0);

        setOffset(0);

        if (result.success) {
          setBooks(result.data);
          setEntries(result.data.numFound);
        } else {
          Alert.alert("Error", result.error);
        }

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

  const loadMoreBooks = async () => {
    setLoadingMore(true);
    setStopMoreBook(true);

    //console.log("aquiiii", offset);
    const result = await fetchSearch(searchBook, offset + 10);
    //console.log(result);
    setOffset(offset + 10);
    setBooks((prev) => [...prev, ...result]);
    setLoadingMore(false);
    setReady(false);
    setStopMoreBook(false);
  };

  const renderFooter = () => {
    return loadingMore ? <ActivityIndicator size="large" /> : null;
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
      <FlatList
        data={books}
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: "lightgray", height: 1 }} />
        )}
        renderItem={({ item }) => (
          <BookCard
            itemKey={item.key}
            coverId={item.key.split("/")[2]}
            urlPoster={`${COVER_URL}/w/olid/${item.key.split("/")[2]}-L.jpg`}
            authorName={item.author_name}
            title={item.title}
            routeUrl={"books"}
            orientation={"v"}
            year={getYear(item?.first_publish_year.toString())}
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
        ListFooterComponent={() => (
          <>
            {renderFooter()}
            <View style={styles.endContainer} />
          </>
        )}
        /*onEndReached={
          (ready || stopMoreBook) && offset + 10 >= entries
            ? null
            : loadMoreBooks
        }
        onEndReachedThreshold={0.2} // Trigger when 50% from bottom*/
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
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
