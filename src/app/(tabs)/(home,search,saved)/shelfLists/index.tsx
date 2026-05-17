import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SymbolView } from "expo-symbols";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListCardAdd from "../../../../../components/ListCardAdd";
import { BookContext } from "../../../../../context/BookContext";
import {
  findBookInLists,
  findBookInShelve,
} from "../../../../../services/functions";

const TABS = ["Shelfs", "Lists"];

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
  const { bookId } = useLocalSearchParams();

  const { shelfBooks, listsBooks } = useContext(BookContext);

  //console.log(description);

  const [selected, setSelected] = useState(0);

  const [selectedShelf, setSelectedShelf] = useState(1);
  const [selectedLists, setSelectedLists] = useState([]);

  const [prevSelectedList, setPrevSelectedList] = useState([]);
  const [prevSelectedShelf, setPrevSelectedShelf] = useState(-1);

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
    const lists = findBookInLists(id, listsBooks);

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
            navigation.goBack();
          },
        },
      ],
    });
  }, [selectedShelf, selectedLists]);

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

            <TouchableOpacity
              onPress={() => console.log("Delete from library")}
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
          </View>
        ) : (
          listsBooks.map((item, index) => (
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
          ))
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

    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
});
