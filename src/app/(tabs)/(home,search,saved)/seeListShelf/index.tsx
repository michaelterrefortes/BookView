import {
  useIsFocused,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { SymbolView } from "expo-symbols";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCard from "../../../../../components/BookCard";
import { API_URL, COVER_URL } from "../../../../../constants/urls";
import { BookContext } from "../../../../../context/BookContext";

const ListShelf = () => {
  const { name, title, symbol, color0, color1, dataType, id } =
    useLocalSearchParams();

  const router = useRouter();

  const { shelfBooks, listsBooks, setListsBooks } = useContext(BookContext);

  const isFocused = useIsFocused();
  const [data, setData] = useState([]);

  const navigation = useNavigation();

  //console.log(shelfBooks);

  useEffect(() => {
    if (dataType === "list") {
      setData(listsBooks.find((el) => el.name_list === name)?.books || []);
    } else setData(shelfBooks.find((el) => el.name === name)?.books || []);

    //console.log(data);
  }, [isFocused]);

  //const data = item ? JSON.parse(item) : null;

  //console.log(data, title, symbol);

  useLayoutEffect(() => {
    if (dataType === "list") {
      navigation.setOptions({
        unstable_headerRightItems: () => [
          {
            type: "button",
            label: "Edit",
            icon: {
              type: "sfSymbol",
              name: "pencil",
            },
            onPress: () => {
              router.push({
                pathname: "/(tabs)/(saved)/addList",
                params: { type: "add", method: "PUT", value: title, id: id },
              });
            },
          },

          {
            type: "button",
            label: "Delete",
            icon: {
              type: "sfSymbol",
              name: "trash",
            },
            tintColor: "red",

            onPress: () => {
              // Do something
              pressDeleteConfirm();
            },
          },
        ],
      });
    }
  }, [dataType]);

  const pressDeleteConfirm = async () => {
    Alert.alert("Delete List", "Are you sure you want to delete this list?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: handleDelete,
      },
    ]);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/createList/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      if (!res.ok) Alert.alert("Error", result.error);
      else {
        setListsBooks((prevItems) =>
          prevItems.filter((item) => Number(item.listid) !== Number(id)),
        );
        router.back();
      }
    } catch (err) {
      Alert.alert("Error", "Could not delete item");
      console.error(err);
    }
  };

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

        {data.length === 0 && (
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              marginTop: 50,
            }}
          >
            No Books
          </Text>
        )}

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
