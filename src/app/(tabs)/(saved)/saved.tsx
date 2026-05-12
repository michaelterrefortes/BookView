import { useIsFocused } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCard from "../../../../components/BookCard";
import { COVER_URL } from "../../../../constants/urls";

const Saved = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  //console.log(isFocused);

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
              coverId={item.cover}
              urlPoster={`${COVER_URL}/b/id/${item.cover}-M.jpg`}
              authorName={[item.author]}
              title={item.title}
              routeUrl={"books/"}
            />
          )}
          ListHeaderComponent={
            <>
              <Text style={styles.title}>Your Book Lists</Text>

              {!loading && books?.length === 0 && (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>No Books Lists</Text>
                </View>
              )}
            </>
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
  title: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 32,
    fontWeight: "bold",
  },
  containerLoading: {
    flex: 1, // <-- fill the whole screens
    justifyContent: "center",
    alignItems: "center",
  },
});
