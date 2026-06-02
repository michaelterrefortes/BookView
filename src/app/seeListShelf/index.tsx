import {
  useIsFocused,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { SymbolView } from "expo-symbols";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCard from "../../../components/BookCard";
import { API_URL, COVER_URL } from "../../../constants/urls";
import { BookContext } from "../../../context/BookContext";
import { getAccessToken } from "../../../services/auth";

const ListShelf = () => {
  const { name, title, symbol, color0, color1, dataType, id } =
    useLocalSearchParams();

  const router = useRouter();

  //console.log(id);

  const { shelfBooks, listsBooks, setListsBooks, setShelfBooks } =
    useContext(BookContext);

  const isFocused = useIsFocused();
  const [data, setData] = useState([]);

  const navigation = useNavigation();
  const [screenKey, setScreenKey] = useState(0);

  const [loadingProcess, setLoadingProcess] = useState(false);
  const [loadingProcessDelete, setLoadingProcessDelete] = useState(false);

  //console.log(shelfBooks);

  //console.log(listsBooks[0]);

  useEffect(() => {
    if (dataType === "list") {
      setData(listsBooks.find((el) => el.name_list === name)?.books || []);
    } else setData(shelfBooks.find((el) => el.name === name)?.books || []);

    //console.log(data);
  }, [isFocused, screenKey]);

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
                pathname: "/addList",
                params: { type: "add", method: "PUT", value: title, id: id },
              });
            },
          },

          loadingProcessDelete
            ? {
                type: "custom",
                variant: "done",
                disabled: true,
                element: <ActivityIndicator size="small" />,
              }
            : {
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
  }, [dataType, loadingProcessDelete]);

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
      setLoadingProcessDelete(true);
      const token = await getAccessToken();
      const res = await fetch(`${API_URL}/createList/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) Alert.alert("Error", result.error);
      else {
        setListsBooks((prevItems) =>
          prevItems.filter((item) => Number(item.listid) !== Number(id)),
        );
        setLoadingProcessDelete(false);
        router.back();
      }
    } catch (err) {
      Alert.alert("Error", "Could not delete item");
      setLoadingProcessDelete(false);
      console.error(err);
    }
  };

  const handleDeleteShelf = async (idBook) => {
    setLoadingProcess(true);
    const token = await getAccessToken();
    const response = await fetch(`${API_URL}/shelf/${idBook}`, {
      method: "DELETE", // Specify the method
      headers: {
        "Content-Type": "application/json", // Inform the server we're sending JSON
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // @ts-ignore
      //throw new Error("Failed to fetch books", response.statusText);
      Alert.alert("Error", response.error);
    } else {
      //console.log("deleted success");

      //console.log(id);

      setShelfBooks((prevData) =>
        prevData.map((item) =>
          Number(item.shelve) === Number(id)
            ? {
                ...item,
                books: item.books.filter((book) => book.bookid !== idBook),
              }
            : item,
        ),
      );

      setListsBooks((prevData) =>
        prevData.map((item) => ({
          ...item,
          books: item.books.filter((book) => book.bookid !== idBook),
        })),
      );
    }

    //navigation.goBack();
    setLoadingProcess(false);
    setScreenKey((prevKey) => prevKey + 1);
  };

  const handleDeleteList = async (list_item_id) => {
    setLoadingProcess(true);
    const token = await getAccessToken();
    const response = await fetch(`${API_URL}/lists_books/${list_item_id}`, {
      method: "DELETE", // Specify the method
      headers: {
        "Content-Type": "application/json", // Inform the server we're sending JSON
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // @ts-ignore
      //throw new Error("Failed to fetch books", response.statusText);
      Alert.alert("Error", response.error);
    } else {
      //console.log("deleted success");

      //console.log(id);

      setListsBooks((prevData) =>
        prevData.map((item) =>
          Number(item.listid) === Number(id)
            ? {
                ...item,
                books: item.books.filter(
                  (book) => book.list_item_id !== list_item_id,
                ),
              }
            : item,
        ),
      );
    }

    setLoadingProcess(false);
    //navigation.goBack();
    setScreenKey((prevKey) => prevKey + 1);
  };

  const confirmDeleteShelf = (id) => {
    //console.log(shelfBooks);
    //console.log(id);
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this book from your library? This action will remove the book from shelf and lists.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDeleteShelf(id),
          style: "destructive",
        },
      ],
      { cancelable: true }, // Allows tapping outside to dismiss on Android
    );
  };

  const confirmDeleteList = (list_item_id) => {
    //console.log(list_item_id);
    //console.log(id);
    //console.log(list);
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this book from this list?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDeleteList(list_item_id),
          style: "destructive",
        },
      ],
      { cancelable: true }, // Allows tapping outside to dismiss on Android
    );
  };

  // Render the delete button behind the row
  const renderRightActions = (progress, dragX, item) => {
    return (
      <View
        key={`delete-${item.bookid}`}
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 18,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            padding: 8,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() =>
            dataType !== "list"
              ? confirmDeleteShelf(item.bookid)
              : confirmDeleteList(item.list_item_id)
          }
        >
          {loadingProcess ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <SymbolView name={"trash"} tintColor={"white"} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <GestureHandlerRootView>
      <SafeAreaView
        style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}
        edges={["right", "left"]}
      >
        <ScrollView>
          <View style={{ height: 120 }} />
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
            style={[
              {
                paddingVertical: 15,
                textAlign: "center",
                fontSize: 24,
                fontWeight: "600",
              },
              isDarkMode ? styles.lightText : styles.darkText,
            ]}
          >
            {title}
          </Text>

          {data.length === 0 && (
            <Text
              style={[
                {
                  textAlign: "center",
                  fontWeight: "700",
                  marginTop: 50,
                },
                isDarkMode ? styles.lightText : styles.darkText,
              ]}
            >
              No Books
            </Text>
          )}

          {data.map((item, index) => (
            <ReanimatedSwipeable
              key={index}
              friction={2}
              rightThreshold={40}
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, item)
              }
            >
              <View
                key={`${item.id}-${index}`}
                style={[
                  {
                    backgroundColor: "white",
                    padding: 15,
                    marginHorizontal: 16,
                    marginVertical: 10,
                    borderRadius: 20,
                  },
                  isDarkMode ? styles.buttonDark : styles.buttonLight,
                ]}
              >
                <BookCard
                  itemKey={`/${item.bookid[item.bookid.length - 1] === "W" ? "works" : "books"}/${item.bookid}`}
                  coverId={item.bookid}
                  title={item.title}
                  authorName={[item.author]}
                  year={""}
                  urlPoster={`${COVER_URL}/${item.bookid[item.bookid.length - 1] === "W" ? "w" : "b"}/olid/${item.bookid}-L.jpg`}
                  routeUrl={
                    item.bookid[item.bookid.length - 1] === "W"
                      ? "books"
                      : "editions"
                  }
                  orientation={"v"}
                />
              </View>
            </ReanimatedSwipeable>
          ))}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  darkBg: { backgroundColor: "#000" },
  lightBg: { backgroundColor: "#f2f2f2" },
  buttonDark: { backgroundColor: "#2f2f2f" },
  buttonLight: { backgroundColor: "#fff" },
  lightText: { color: "white" },
  darkText: { color: "black" },

  container: {
    flex: 1,
  },
});

export default ListShelf;
