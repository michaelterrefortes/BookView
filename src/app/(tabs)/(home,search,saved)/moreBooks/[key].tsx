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
  const { key } = useLocalSearchParams();

  //console.log(key.split("_"));

  const endpoint = key;

  //console.log("More Editions", key);

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
        result = await fetchAuthorWorks(key);
        setSection(1);
      } else if (endpoint === "subject") {
        result = await fetchBooksSubject(`/subjects/${key}.json?limit=20`);
        setSection(3);
      } else {
        result = await fetchBookEditions(key, 0);
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
          contentContainerStyle={{ paddingHorizontal: 10 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <BookCard
              itemKey={item.key}
              coverId={item.editions.docs[0].cover_i}
              urlPoster={`${COVER_URL}/b/id/${item.editions.docs[0].cover_i}-L.jpg`}
              authorName={item.author_name}
              title={item.title}
              routeUrl={"books"}
              year={getYear(item.publish_date)}
            />
          )}
          ListFooterComponent={<View style={styles.endContainer} />}
          ListHeaderComponent={<View style={styles.startContainer} />}
        />
      ) : section === 2 ? (
        <>
          <Stack.Screen options={{ headerTitle: "More Editions" }} />
          <FlatList
            data={books}
            //numColumns={3}

            showsHorizontalScrollIndicator={true}
            //ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
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
                year={getYear(item.publish_date)}
              />
            )}
            //onEndReached={loadBooksEditions}
            //onEndReachedThreshold={0.5} // Trigger when 50% from bottom
            //ListFooterComponent={renderFooter}
            ListFooterComponent={<View style={styles.endContainer} />}
            ListHeaderComponent={<View style={styles.startContainer} />}
          />
        </>
      ) : section === 1 ? (
        <FlatList
          data={books}
          numColumns={3}
          showsHorizontalScrollIndicator={false}
          //ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <BookCard
              itemKey={item.key}
              coverId={item.covers?.[0]}
              urlPoster={`${COVER_URL}/b/id/${item.covers?.[0]}-L.jpg`}
              authorName={[""]}
              title={item.title}
              routeUrl={"books"}
              year={getYear(item.publish_date)}
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
              urlPoster={`${COVER_URL}/b/id/${item.cover_id}-L.jpg`}
              authorName={
                item.authors?.map((author) => author.name).filter(Boolean) || []
              }
              title={item.title}
              routeUrl={"books"}
              year={getYear(item.publish_date)}
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
    height: 120,
    width: "100%",
    //backgroundColor: "red",
    flex: 1,
  },
});
