import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCard from "../../../../../components/BookCard";
import { COVER_URL } from "../../../../../constants/urls";
import { fetchBooksSubject } from "../../../../../services/api";

const Genre = () => {
  const router = useRouter();
  const { name, endpoint } = useLocalSearchParams();

  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState({});

  useEffect(() => {
    setLoading(true);
    const loadBooks = async () => {
      //console.log(item.url);
      const result = await fetchBooksSubject(
        `/subjects/${endpoint}.json?limit=20`,
      );

      if (result.success) {
        setBookData(result.data);
      } else {
        Alert.alert("Error", result.error);
      }
      setLoading(false);
    };

    loadBooks();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: name,
        }}
      />
      <SafeAreaView style={styles.scrollview}>
        {loading ? (
          <View style={styles.containerLoading}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={bookData}
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
            ListHeaderComponent={() => <View style={{ height: 70 }} />}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default Genre;

const styles = StyleSheet.create({
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
