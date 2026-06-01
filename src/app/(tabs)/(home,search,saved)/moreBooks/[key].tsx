import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import BookCard from "../../../../../components/BookCard";
import { COVER_URL } from "../../../../../constants/urls";
import {
  fetchAuthorWorks,
  fetchBookEditions,
  fetchBooksSubject,
} from "../../../../../services/api";
import { getYear } from "../../../../../services/functions";

const MoreBooks = () => {
  const { endpoint, bookId } = useLocalSearchParams();

  //console.log(key.split("_"));

  //console.log(endpoint, bookId);

  //("More Books", endpoint, bookId);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let point = "";
      let result = [];

      //console.log(key.split("_"));
      setOffset(0);

      if (endpoint === "trending") {
        result = await fetchBooksSubject(
          `/trending/weekly.json?limit=20&offset=${0}`,
        );
        setSection(0);
      } else if (endpoint === "author") {
        result = await fetchAuthorWorks(bookId, 20, 0);
        setSection(1);
      } else if (endpoint === "subject") {
        result = await fetchBooksSubject(
          `/subjects/${bookId}.json?limit=20&offset=${0}`,
        );
        setSection(3);
      } else {
        result = await fetchBookEditions(bookId, 20, 0);
        setSection(2);
      }

      //console.log(result[0]);

      if (result.success) {
        setBooks(result.data);
      } else {
        Alert.alert("Error", result.error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const fetchMoreData = async () => {
    setLoadingMore(true);

    const newOffset = offset + 10;
    let point = "";
    let result = [];

    //console.log(key.split("_"));

    if (endpoint === "trending") {
      result = await fetchBooksSubject(
        `/trending/weekly.json?limit=20&offset=${newOffset}`,
      );
      setSection(0);
    } else if (endpoint === "author") {
      result = await fetchAuthorWorks(bookId, 20, newOffset);
      setSection(1);
    } else if (endpoint === "subject") {
      result = await fetchBooksSubject(
        `/subjects/${bookId}.json?limit=20&offset=${newOffset}`,
      );
      setSection(3);
    } else {
      result = await fetchBookEditions(bookId, 20, newOffset);
      setSection(2);
    }

    //console.log(result[0]);
    setOffset(newOffset);
    if (result.success) {
      setBooks((prev) => [...prev, ...result.data]);
    } else {
      Alert.alert("Error", result.error);
    }

    setLoadingMore(false);
  };

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
          ItemSeparatorComponent={() => (
            <View style={{ backgroundColor: "lightgray", height: 1 }} />
          )}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <BookCard
              itemKey={item.key}
              coverId={item.key.split("/")[2]}
              urlPoster={`${COVER_URL}/w/olid/${item.key.split("/")[2]}-L.jpg`}
              authorName={item.author_name}
              title={item.title}
              routeUrl={"books"}
              year={getYear(item.publish_date)}
            />
          )}
          ListHeaderComponent={<View style={styles.startContainer} />}
          onEndReached={fetchMoreData}
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
      ) : section === 2 ? (
        <>
          <Stack.Screen options={{ headerTitle: "More Editions" }} />
          <FlatList
            data={books}
            //numColumns={3}

            showsHorizontalScrollIndicator={true}
            ItemSeparatorComponent={() => (
              <View style={{ backgroundColor: "lightgray", height: 1 }} />
            )}
            contentContainerStyle={{
              marginHorizontal: 20,
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
                orientation={"v"}
                year={getYear(item?.publish_date)}
              />
            )}
            ListHeaderComponent={<View style={styles.startContainer} />}
            onEndReached={fetchMoreData}
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
        </>
      ) : section === 1 ? (
        <FlatList
          data={books}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{ backgroundColor: "lightgray", height: 1 }} />
          )}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <BookCard
              itemKey={item.key}
              coverId={item.key.split("/")[2]}
              urlPoster={`${COVER_URL}/w/olid/${item.key.split("/")[2]}-L.jpg`}
              authorName={[""]}
              title={item.title}
              routeUrl={"books"}
              year={getYear(item?.first_publish_date)}
              orientation={"v"}
            />
          )}
          ListHeaderComponent={<View style={styles.startContainer} />}
          onEndReached={fetchMoreData}
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
      ) : section === 3 ? (
        <FlatList
          data={books}
          //numColumns={3}
          //showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{ backgroundColor: "lightgray", height: 1 }} />
          )}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <BookCard
              itemKey={item.key}
              coverId={item.key.split("/")[2]}
              urlPoster={`${COVER_URL}/w/olid/${item.key.split("/")[2]}-L.jpg`}
              authorName={
                item.authors?.map((author) => author.name).filter(Boolean) || []
              }
              title={item.title}
              routeUrl={"books"}
              year={getYear(item?.first_publish_year.toString())}
              orientation={"v"}
            />
          )}
          ListHeaderComponent={<View style={styles.startContainer} />}
          onEndReached={fetchMoreData}
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
    height: 110,
    width: 20,
    flex: 1,
  },
  startContainer: {
    height: 120,
    width: "100%",
    //backgroundColor: "red",
    flex: 1,
  },
});
