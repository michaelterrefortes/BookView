import { Stack, useLocalSearchParams } from "expo-router";
import { SymbolView } from "expo-symbols";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BookCard from "../../../../../components/BookCard";
import { COVER_URL } from "../../../../../constants/urls";
import { fetchBooksSubject } from "../../../../../services/api";

const Genre = () => {
  const { name, data } = useLocalSearchParams();

  const sections = data ? JSON.parse(data as string) : [];

  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState({});

  useEffect(() => {
    sections.map((item) =>
      setBookData((prevData) => ({
        ...prevData,
        [item.name]: { loading: true }, // Dynamic key assignment
      })),
    );

    sections.map(async (item) => {
      //console.log(item.url);
      const result = await fetchBooksSubject(
        `/subjects/${item.url}.json?limit=10`,
      );
      setBookData((prevData) => ({
        ...prevData,
        [item.name]: { loading: false, data: result }, // Dynamic key assignment
      }));
    });
  }, [sections]);

  //console.log(bookData);

  const loadBooks = async (setLoading, setData, endpoint) => {
    setLoading(true);
    const result = await fetchBooksSubject(endpoint);
    setData(result);
    setLoading(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: name,
        }}
      />
      <ScrollView style={styles.scrollview}>
        {sections.map((item) => (
          <View key={item.name}>
            <TouchableOpacity
              style={{
                marginTop: 10,
                marginBottom: 10,
                //backgroundColor: "red",
              }}
            >
              <Text style={styles.bigTitle}>
                {item.name}
                <SymbolView
                  name={"chevron.right"}
                  size={20}
                  tintColor={"black"}
                />
              </Text>
            </TouchableOpacity>

            {bookData[item.name]?.loading ? (
              <View style={styles.containerLoading}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <FlatList
                data={bookData[item.name]?.data}
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
                    coverId={item.cover_id}
                    urlPoster={`${COVER_URL}/b/id/${item.cover_id}-L.jpg`}
                    authorName={
                      item.authors
                        ?.map((author) => author.name)
                        .filter(Boolean) || []
                    }
                    title={item.title}
                    routeUrl={"books"}
                  />
                )}
              />
            )}
          </View>
        ))}
      </ScrollView>
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
    //paddingTop: 100,
  },
  bigTitle: {
    //paddingTop: 10,
    //paddingBottom: 5,
    fontSize: 32,
    paddingLeft: 16,
    fontWeight: "bold",
  },
  containerLoading: {
    width: "100%",
    height: 170,
    justifyContent: "center",
    alignItems: "center",
  },
});
