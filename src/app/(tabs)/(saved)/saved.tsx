import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useIsFocused } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import ShelfCard from "../../../../components/ShelfCard";
import { BookContext } from "../../../../context/BookContext";
import { fetchAPILists, fetchAPIShelves } from "../../../../services/apiAPI";

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

const Saved = () => {
  const { shelfBooks, setShelfBooks, listsBooks, setListsBooks } =
    useContext(BookContext);

  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [books, setBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const [selected, setSelected] = useState(0);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  //console.log(isFocused);

  useEffect(() => {
    loadShelves();
    loadLists();
  }, []);

  const loadShelves = async () => {
    setLoading(true);

    const result = await fetchAPIShelves();

    if (result.success) {
      //console.log(result.data);
      setShelfBooks(result.data);

      //console.log(result.data);
    } else {
      Alert.alert("Error", result.error);
    }

    setLoading(false);
  };

  const loadLists = async () => {
    setLoadingList(true);

    const result = await fetchAPILists();

    if (result.success) {
      //console.log(result.data);
      setListsBooks(result.data);
    } else {
      Alert.alert("Error", result.error);
    }

    setLoadingList(false);
  };

  const onRefresh = () => {
    setRefreshing(true);

    loadShelves();
    loadLists();

    setRefreshing(false);
  };

  return (
    <ScrollView
      style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
            item={"want_to_read"} //shelfBooks.filter((item) => item.shelf === 1)?.[0]?.books}
            symbol={"books.vertical"}
            id={1}
            colors={["#f6e8ef", "#e05651"]}
            title={"Want to Read"}
          />

          <ShelfCard
            item={"reading"} //shelfBooks.filter((item) => item.shelf === 2)?.[0]?.books}
            symbol={"books.vertical"}
            id={2}
            colors={["#ebecf7", "#777d9f"]}
            title={"Reading"}
          />

          <ShelfCard
            item={"finished"} //shelfBooks.filter((item) => item.shelf === 3)?.[0]?.books}
            symbol={"books.vertical"}
            id={3}
            colors={["#faf2eb", "#fdb460"]}
            title={"Finished"}
          />
          <ShelfCard
            /*item={
              shelfBooks.find((item) => item.name === "not_finished")?.books ||
              []
            } //shelfBooks.filter((item) => item.shelf === 4)?.[0]?.books}*/
            item={"not_finished"}
            symbol={"books.vertical"}
            id={4}
            colors={["#ebeafa", "#7671db"]}
            title={"Not Finished"}
          />
        </View>
      ) : (
        <View style={{ paddingHorizontal: 16 }}>
          {listsBooks.map((item, index) => (
            <ShelfCard
              key={item.listid}
              item={item.name_list}
              id={item.listid}
              symbol={"apple.books.pages"}
              colors={colors[index % 7]}
              title={item.name_list}
              dataType={"list"}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Saved;

const styles = StyleSheet.create({
  darkBg: { backgroundColor: "#000" },
  lightBg: { backgroundColor: "#f2f2f2" },
  buttonDark: { backgroundColor: "#2f2f2f" },
  buttonLight: { backgroundColor: "#fff" },
  lightText: { color: "white" },
  darkText: { color: "black" },

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
