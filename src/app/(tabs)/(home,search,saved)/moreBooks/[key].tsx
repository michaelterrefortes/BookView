import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import BookCard from "../../../../../components/BookCard";
import {
    fetchAuthorWorks,
    fetchBookEditions,
    fetchBooksSubject,
} from "../../../../../services/api";

const MoreBooks = () => {
  const { key } = useLocalSearchParams();

  //console.log(key.split("_"));

  const endpoint = key.split("_")[0];

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let point = "";
      let result = [];

      //console.log(key.split("_"));

      if (endpoint === "trending") {
        result = await fetchBooksSubject("/trending/weekly.json?limit=20");
        setSection(0);
      } else if (endpoint === "author") {
        point = key.split("_")[1];
        result = await fetchAuthorWorks(point);
        setSection(1);
      } else if (endpoint === "subject") {
        point = key.split("_")[2];
        result = await fetchBooksSubject(`/subjects/${point}.json?limit=20`);
        setSection(3);
      } else {
        point = key.split("_")[1];
        result = await fetchBookEditions(point, 0);
        setSection(2);
      }

      //console.log(result[0]);
      setBooks(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.scrollview}>
      {loading ? (
        <View style={styles.containerLoading}>
          <ActivityIndicator
            size="large"
            //color="#0000ff"
            //className="mt-10 self-center"
          />
        </View>
      ) : section === 0 ? (
        <FlatList
          data={books}
          numColumns={3}
          showsHorizontalScrollIndicator={false}
          //ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <BookCard
              itemKey={item.key}
              coverId={item.editions.docs[0].cover_i}
              urlPoster={`https://covers.openlibrary.org/b/id/${item.editions.docs[0].cover_i}-M.jpg`}
              authorName={item.author_name}
              title={item.title}
              routeUrl={"books/"}
            />
          )}
          ListFooterComponent={<View style={styles.endContainer} />}
          ListHeaderComponent={<View style={styles.startContainer} />}
        />
      ) : section === 2 ? (
        <FlatList
          data={books}
          numColumns={3}
          showsHorizontalScrollIndicator={true}
          //ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          contentContainerStyle={{ paddingHorizontal: 20 }}
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
          ListFooterComponent={<View style={styles.endContainer} />}
          ListHeaderComponent={<View style={styles.startContainer} />}
        />
      ) : section === 1 ? (
        <FlatList
          data={books}
          numColumns={3}
          showsHorizontalScrollIndicator={false}
          //ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <BookCard
              itemKey={item.key}
              coverId={item.covers?.[0]}
              urlPoster={`https://covers.openlibrary.org/b/id/${item.covers?.[0]}-M.jpg`}
              authorName={[""]}
              title={item.title}
              routeUrl={"books/"}
            />
          )}
          ListFooterComponent={<View style={styles.endContainer} />}
          ListHeaderComponent={<View style={styles.startContainer} />}
        />
      ) : section === 3 ? (
        <FlatList
          data={books}
          numColumns={3}
          showsHorizontalScrollIndicator={false}
          //ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <BookCard
              itemKey={item.key}
              coverId={item.cover_id}
              urlPoster={`https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`}
              authorName={
                item.authors?.map((author) => author.name).filter(Boolean) || []
              }
              title={item.title}
              routeUrl={"books/"}
            />
          )}
          ListFooterComponent={<View style={styles.endContainer} />}
          ListHeaderComponent={<View style={styles.startContainer} />}
        />
      ) : null}
    </View>
  );
};

export default MoreBooks;

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,

    //paddingTop: 110,

    //marginBottom: 100,
  },
  containerLoading: {
    width: "100%",
    height: 170,
    justifyContent: "center",
    alignItems: "center",
  },
  endContainer: {
    height: 100,
    width: "100%",
    //backgroundColor: "red",
    flex: 1,
  },
  startContainer: {
    height: 110,
    width: "100%",
    //backgroundColor: "red",
    flex: 1,
  },
});
