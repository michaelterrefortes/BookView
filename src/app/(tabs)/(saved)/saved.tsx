import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useIsFocused } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import ShelfCard from "../../../../components/ShelfCard";
import { BookContext } from "../../../../context/BookContext";

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

const Saved = () => {
  const {
    reading,
    finished,
    notFinished,
    wantToRead,
    setWantToRead,
    setListsBooks,
    listsBooks,
    setReading,
  } = useContext(BookContext);

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const [selected, setSelected] = useState(0);

  //console.log(isFocused);

  useEffect(() => {
    setReading([{ id: "OL24034W" }]);
    setListsBooks([
      {
        name: "Favorites",
        books: [
          {
            id: "OL15626917W",
          },
          {
            id: "OL1000854M",
          },
        ],
      },
      { name: "Tired", books: [] },
    ]);
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
    <ScrollView style={styles.container}>
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
      {loading ? (
        <View style={styles.containerLoading}>
          <ActivityIndicator size="large" />
        </View>
      ) : selected === 0 ? (
        <View style={{ paddingHorizontal: 16 }}>
          <ShelfCard
            item={wantToRead}
            symbol={"books.vertical"}
            colors={["#f6e8ef", "#e05651"]}
            title={"Want to Read"}
          />

          <ShelfCard
            item={reading}
            symbol={"books.vertical"}
            colors={["#ebecf7", "#777d9f"]}
            title={"Reading"}
          />

          <ShelfCard
            item={finished}
            symbol={"books.vertical"}
            colors={["#faf2eb", "#fdb460"]}
            title={"Finished"}
          />
          <ShelfCard
            item={notFinished}
            symbol={"books.vertical"}
            colors={["#ebeafa", "#7671db"]}
            title={"Not Finished"}
          />
        </View>
      ) : (
        <View style={{ paddingHorizontal: 16 }}>
          {listsBooks.map((item, index) => (
            <ShelfCard
              key={index}
              item={item.books}
              symbol={"apple.books.pages"}
              colors={colors[index % 7]}
              title={item.name}
            />
          ))}
        </View>
      )}
    </ScrollView>
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
