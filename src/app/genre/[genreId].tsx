import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCard from "../../../components/BookCard";
import { COVER_URL } from "../../../constants/urls";
import { fetchBooksSubject } from "../../../services/api";

const Genre = () => {
  const router = useRouter();
  const { name, endpoint } = useLocalSearchParams();

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [offset, setOffset] = useState(0);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const [entries, setEntries] = useState(0);

  console.log("Genre", name, endpoint);

  const loadBooks = async () => {
    setLoading(true);
    //console.log(item.url);
    const result = await fetchBooksSubject(
      `/subjects/${endpoint}.json?limit=20&offset=${offset}`,
    );

    if (result.success) {
      setBookData(result.data);
      setEntries(result.work_count);
    } else {
      Alert.alert("Error", result.error);
    }
    setLoading(false);
  };

  const loadMoreBooks = async () => {
    if (bookData.length >= entries) return;
    setLoadingMore(true);
    const newOffset = offset + 10;

    const result = await fetchBooksSubject(
      `/subjects/${endpoint}.json?limit=20&offset=${newOffset}`,
    );

    setOffset(newOffset);
    if (result.success) {
      setBookData((prev) => [...prev, ...result.data]);
    } else {
      Alert.alert("Error", result.error);
    }
    setLoadingMore(false);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: name,
        }}
      />
      <SafeAreaView
        style={[styles.scrollview, isDarkMode ? styles.darkBg : styles.lightBg]}
        edges={["left", "right"]}
      >
        {loading ? (
          <View style={styles.containerLoading}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            ListEmptyComponent={
              <Text style={{ textAlign: "center", fontWeight: "600" }}>
                No Books
              </Text>
            }
            data={bookData}
            showsHorizontalScrollIndicator={true}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  backgroundColor: isDarkMode ? "gray" : "lightgray",
                  height: 1,
                }}
              />
            )}
            contentContainerStyle={{
              marginHorizontal: 20,
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <BookCard
                itemKey={item.key}
                coverId={item.key.split("/")[2]}
                urlPoster={`${COVER_URL}/w/olid/${item.key.split("/")[2]}-L.jpg`}
                authorName={
                  item.authors?.map((author) => author.name).filter(Boolean) ||
                  []
                }
                title={item.title}
                routeUrl={"books"}
                orientation={"v"}
                year={item.first_publish_year}
              />
            )}
            ListHeaderComponent={() => <View style={{ height: 120 }} />}
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
        )}
      </SafeAreaView>
    </>
  );
};

export default Genre;

const styles = StyleSheet.create({
  darkBg: { backgroundColor: "#000" },
  lightBg: { backgroundColor: "#f2f2f2" },

  endContainer: {
    height: 110,
    width: 20,
    flex: 1,
  },
  container: {
    flex: 1,
    //alignItems: "center",
    //justifyContent: "center",
    //backgroundColor: "#8f5555",
  },
  scrollview: {
    flex: 1,
    //marginTop: 120,
  },
  bigTitle: {
    //paddingTop: 10,
    //paddingBottom: 5,
    fontSize: 20,
    paddingLeft: 16,
    fontWeight: "600",
  },
  containerLoading: {
    width: "100%",
    height: 170,
    justifyContent: "center",
    alignItems: "center",
  },
});
