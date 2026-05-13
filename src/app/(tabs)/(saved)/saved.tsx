import { useIsFocused } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCard from "../../../../components/BookCard";
import ShelfCard from "../../../../components/ShelfCard";
import { COVER_URL } from "../../../../constants/urls";
import { BookContext } from "../../../../context/BookContext";

const Saved = () => {
  const { reading, read, notFinished, wantToRead, setWantToRead } =
    useContext(BookContext);

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  //console.log(isFocused);

  useEffect(() => {
    setWantToRead([
      {
        id: "OL15626917W",
      },
      {
        id: "OL1000854M",
      },
      {
        id: "OL178496W",
      },
      {
        id: "OL24200877M",
      },
      {
        id: "OL12345M",
      },
      {
        id: "OL23747519M",
      },
      {
        id: "OL27448W",
      },
      {
        id: "OL3189916W",
      },
    ]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.containerLoading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={books}
          numColumns={3}
          showsVerticalScrollIndicator={true}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <BookCard
              itemKey={`/works/${item.key}`}
              coverId={item.key}
              urlPoster={`${COVER_URL}/w/olid/${item.key}-L.jpg`}
              authorName={[item.author]}
              title={item.title}
              routeUrl={"books"}
            />
          )}
          ListHeaderComponent={
            <View>
              <ShelfCard
                item={wantToRead}
                symbol={"book"}
                colors={["#f6e8ef", "#e05651"]}
                title={"Want to Read"}
              />

              <ShelfCard
                item={reading}
                symbol={"book"}
                colors={["#f6e8ef", "#e05651"]}
                title={"Reading"}
              />

              <ShelfCard
                item={read}
                symbol={"book"}
                colors={["#f6e8ef", "#e05651"]}
                title={"Finished"}
              />
              <ShelfCard
                item={notFinished}
                symbol={"book"}
                colors={["#f6e8ef", "#e05651"]}
                title={"Not Finished"}
              />
            </View>
          }
          style={{ flex: 1 }} // <-- crucial for full-screen scrolling
        />
      )}
    </SafeAreaView>
  );
};

export default Saved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //sbackgroundColor: "#a94141",
  },

  containerLoading: {
    flex: 1, // <-- fill the whole screens
    justifyContent: "center",
    alignItems: "center",
  },
});
