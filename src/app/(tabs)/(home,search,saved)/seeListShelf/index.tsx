import { useIsFocused, useLocalSearchParams } from "expo-router";
import { SymbolView } from "expo-symbols";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCard from "../../../../../components/BookCard";
import { COVER_URL } from "../../../../../constants/urls";
import { BookContext } from "../../../../../context/BookContext";

const ListShelf = () => {
  const { name, title, symbol, color0, color1, dataType } =
    useLocalSearchParams();

  const { shelfBooks, listsBooks } = useContext(BookContext);

  const isFocused = useIsFocused();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (dataType === "list") {
      setData(listsBooks.find((el) => el.name_list === name)?.books || []);
    } else setData(shelfBooks.find((el) => el.name === name)?.books || []);
  }, [isFocused]);

  //const data = item ? JSON.parse(item) : null;

  //console.log(data, title, symbol);
  return (
    <SafeAreaView style={styles.container} edges={["right", "left"]}>
      <ScrollView>
        <View
          style={{
            padding: 10,
            backgroundColor: color0,
            borderRadius: 10,
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <SymbolView name={symbol} size={45} tintColor={color1} />
        </View>
        <Text
          style={{
            paddingVertical: 15,
            textAlign: "center",
            fontSize: 24,
            fontWeight: "600",
          }}
        >
          {title}
        </Text>

        {data.map((item, index) => (
          <View
            key={`${item.id}-${index}`}
            style={{
              backgroundColor: "white",
              padding: 15,
              marginHorizontal: 16,
              marginVertical: 10,
              borderRadius: 20,
            }}
          >
            <BookCard
              itemKey={`/${item.bookid[item.bookid.length - 1] === "W" ? "works" : "books"}/${item.bookid}`}
              coverId={item.bookid}
              title={item.title}
              authorName={[item.author]}
              year={item.year_book?.toString()}
              urlPoster={`${COVER_URL}/${item.bookid[item.bookid.length - 1] === "W" ? "w" : "b"}/olid/${item.bookid}-L.jpg`}
              routeUrl={
                item.bookid[item.bookid.length - 1] === "W"
                  ? "books"
                  : "editions"
              }
              orientation={"v"}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ListShelf;
