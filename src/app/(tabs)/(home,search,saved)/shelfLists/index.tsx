import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListCardAdd from "../../../../../components/ListCardAdd";
import { API_URL } from "../../../../../constants/urls";
import { BookContext } from "../../../../../context/BookContext";
import { addList, addShelf } from "../../../../../services/apiAPI";
import {
  findBookInLists,
  findBookInShelve,
} from "../../../../../services/functions";

const TABS = ["Shelves", "Lists"];

const colors = [
  ["#ffd6d6", "#ff6b6b"],
  ["#d0ebff", "#228be6"],
  ["#c3fae8", "#12b886"],
  ["#fff3bf", "#fab005"],
  ["#e5dbff", "#845ef7"],
  ["#ffe8cc", "#ff922b"],
  ["#d3f9d8", "#40c057"],
];

const ShelfLists = () => {
  const { bookId, title, authors } = useLocalSearchParams();

  const { shelfBooks, listsBooks, setShelfBooks } = useContext(BookContext);

  const router = useRouter();

  //-console.log(title, authors);

  const [selected, setSelected] = useState(0);

  const [selectedShelf, setSelectedShelf] = useState(1);
  const [selectedLists, setSelectedLists] = useState([]);

  const [prevSelectedList, setPrevSelectedList] = useState([]);
  const [prevSelectedShelf, setPrevSelectedShelf] = useState(-1);

  //console.log(selectedLists, prevSelectedList);

  useEffect(() => {
    const id = bookId.split("/")[2];
    const shelf = findBookInShelve(id, shelfBooks);

    //console.log(shelf);

    if (shelf) {
      setSelectedShelf(shelf);
      setPrevSelectedShelf(shelf);
    }

    //console.log(shelf);
  }, []);

  useEffect(() => {
    const id = bookId.split("/")[2];
    const lists = findBookInLists(id, listsBooks).sort();

    //console.log(lists, listsBooks);

    if (lists) {
      setSelectedLists(lists);
      setPrevSelectedList(lists);
    }

    //console.log(shelf);
  }, []);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      unstable_headerLeftItems: () => [
        {
          type: "button",
          label: "Cancel",

          icon: {
            type: "sfSymbol",
            name: "xmark",
          },
          onPress: () => {
            // Do something
            navigation.goBack();
          },
        },
      ],
    });
  }, []);

  useLayoutEffect(() => {
    const cond =
      selectedShelf === prevSelectedShelf &&
      prevSelectedList.length === selectedLists.length &&
      prevSelectedList.every((val, index) => val === selectedLists[index]);

    navigation.setOptions({
      unstable_headerRightItems: () => [
        {
          type: "button",
          label: "Add",
          variant: "done",
          disabled: cond,
          icon: {
            type: "sfSymbol",
            name: "checkmark",
          },
          onPress: () => {
            // Do something
            //navigation.goBack();
            handleConfirm();
          },
        },
      ],
    });
  }, [selectedShelf, selectedLists]);

  const handleConfirm = async () => {
    const id = bookId.split("/")[2];
    //console.log("handleConfirm", id, selectedShelf, selectedLists);

    console.log("handle add");

    let result = null;
    if (prevSelectedShelf === -1) {
      console.log("original shelf add");
      result = await addShelf(id, selectedShelf, title, authors);
      //console.log(result); //result2);

      if (result.success) {
        //console.log("excelent added");

        setShelfBooks((prevData) =>
          prevData.map((item) =>
            item.shelve === selectedShelf
              ? { ...item, books: [result.data[0], ...item.books] }
              : item,
          ),
        );

        navigation.goBack();
      } else {
        Alert.alert("Error", result.error);
      }
    } else if (
      prevSelectedShelf !== -1 &&
      !(selectedShelf === prevSelectedShelf)
    ) {
      console.log("shelf edit");
      result = await addShelf(id, selectedShelf, title, authors, "PUT");
      console.log(result); //result2);

      if (result.success) {
        //console.log("excelent edited");
        setShelfBooks((prevData) =>
          prevData.map((item) =>
            item.shelve === prevSelectedShelf
              ? {
                  ...item,
                  books: item.books.filter((book) => book.bookid !== id),
                }
              : item.shelve === selectedShelf
                ? { ...item, books: [result.data[0], ...item.books] }
                : item,
          ),
        );

        navigation.goBack();
      } else {
        Alert.alert("Error", result.error);
      }
    }

    if (prevSelectedList.length === 0 && selectedLists.length !== 0) {
      console.log("add list original");

      result = await addList(id, selectedLists, prevSelectedList, "POST");
    } else if (
      (selectedLists.length !== 0 &&
        prevSelectedList.length !== selectedLists.length) ||
      !prevSelectedList.every((val, index) => val === selectedLists[index])
    ) {
      console.log("edit list selected");

      result = await addList(id, selectedLists, prevSelectedList, "PUT");
    }

    //const result2 = await addList(id, selectedLists, title, authors);
  };

  const handleDelete = () => {
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
          onPress: () => confirmDelete(),
          style: "destructive",
        },
      ],
      { cancelable: true }, // Allows tapping outside to dismiss on Android
    );
  };

  const confirmDelete = async () => {
    const id = bookId.split("/")[2];
    const response = await fetch(`${API_URL}/shelf/${id}`, {
      method: "DELETE", // Specify the method
      headers: {
        "Content-Type": "application/json", // Inform the server we're sending JSON
      },
    });

    if (!response.ok) {
      // @ts-ignore
      //throw new Error("Failed to fetch books", response.statusText);
      Alert.alert("Error", response.error);
    } else {
      console.log("deleted success");

      setShelfBooks((prevData) =>
        prevData.map((item) =>
          item.shelve === prevSelectedShelf
            ? {
                ...item,
                books: item.books.filter((book) => book.bookid !== id),
              }
            : item,
        ),
      );

      navigation.goBack();
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20 }}
      edges={["left", "right"]}
    >
      <ScrollView>
        <SegmentedControl
          values={TABS}
          style={{
            width: "80%",
            alignSelf: "center",
            marginBottom: 15,
          }}
          selectedIndex={selected}
          onChange={(event) => {
            setSelected(event.nativeEvent.selectedSegmentIndex);
          }}
        />

        {selected === 0 ? (
          <View>
            <ListCardAdd
              symbol={"books.vertical"}
              colors={["#f6e8ef", "#e05651"]}
              title={"Want to Read"}
              onChange={setSelectedShelf}
              selected={selectedShelf}
              value={1}
            />

            <ListCardAdd
              symbol={"books.vertical"}
              colors={["#ebecf7", "#777d9f"]}
              title={"Reading"}
              onChange={setSelectedShelf}
              selected={selectedShelf}
              value={2}
            />

            <ListCardAdd
              symbol={"books.vertical"}
              colors={["#faf2eb", "#fdb460"]}
              title={"Finished"}
              onChange={setSelectedShelf}
              selected={selectedShelf}
              value={3}
            />
            <ListCardAdd
              symbol={"books.vertical"}
              colors={["#ebeafa", "#7671db"]}
              title={"Not Finished"}
              onChange={setSelectedShelf}
              selected={selectedShelf}
              value={4}
            />

            {prevSelectedShelf !== -1 ? (
              <TouchableOpacity
                onPress={() => handleDelete()}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#dd5656", "#d73939"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[
                    styles.buttonAdd,
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      //borderColor: "#a9a0da",
                      //borderWidth: 1,
                    },
                  ]}
                >
                  <SymbolView
                    name={"trash"}
                    size={18}
                    tintColor={"white"}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={[styles.buttonText]}>Delete from Library</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : (
          <View>
            {listsBooks.map((item, index) => (
              //<Text key={item.listid}>{item.name_list}</Text>

              <ListCardAdd
                key={item.listid}
                symbol={"apple.books.pages"}
                colors={colors[index % 7]}
                title={item.name_list}
                onChange={setSelectedLists}
                selected={selectedLists}
                value={item.listid}
                type="lists"
              />
            ))}

            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/addList",
                  params: { type: "add", method: "POST", value: "" },
                })
              }
              style={[styles.buttonAdd, { backgroundColor: "#4da0ff" }]}
            >
              <Text style={styles.buttonText}>Add List</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShelfLists;

const styles = StyleSheet.create({
  buttonAdd: {
    borderRadius: 100,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "70%",
    alignSelf: "center",
    marginTop: 18,
    marginBottom: 18,
    justifyContent: "center",
    alignItems: "center",

    //shadowColor: "#000",
    //shadowOpacity: 0.5,
    //shadowRadius: 10,
    //shadowOffset: { width: 0, height: 4 },
    //elevation: 3,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
});
