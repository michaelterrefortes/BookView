import { useNavigation, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import BookCard from "../../../../components/BookCard";
import SearchBar from "../../../../components/SearchBar";
import { COVER_URL } from "../../../../constants/urls";
import { subjects } from "../../../../constants/variables";
import { BookContext } from "../../../../context/BookContext";
import {
  fetchAPILists,
  fetchAPIShelves,
  fetchTrending,
} from "../../../../services/apiAPI";

export default function Index() {
  const { shelfBooks, setShelfBooks, listsBooks, setListsBooks } =
    useContext(BookContext);
  const navigation = useNavigation();
  const router = useRouter();
  const [dataTrending, setDataTrending] = useState([]);

  const [loadingTrending, setLoadingTrending] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const [authors, setAuthors] = useState([]);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark"; //colorScheme === "dark";

  useEffect(() => {
    loadBooks(setLoadingTrending, setDataTrending);
    (loadLists(), loadShelves());
  }, []);

  const loadBooks = async (setLoading, setData) => {
    setLoading(true);

    const result = await fetchTrending();
    //console.log(result.data);
    //let authorNames = [];
    let authorsId = [];

    let authorsDict = [];

    /*result.data.forEach((element) => {
      element.author_key.forEach((key, index) => {
        if (!authorsId.includes(key)) {
          authorsId.push(key);
          //authorNames.push(element.author_name[index]);
          authorsDict.push({ key: key, name: element.author_name[index] });
        }
      });
    });*/

    //console.log(authorNames);
    setData(result.data);
    //setAuthors(authorsDict);

    setLoading(false);
  };

  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);

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

  // Handler for the pull-to-refresh gesture
  const onRefresh = () => {
    setRefreshing(true);

    loadBooks(setLoadingTrending, setDataTrending);

    setRefreshing(false);
  };

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const rows = chunkArray(subjects, 2);

  return (
    //<SafeAreaView style={styles.safeview} edges={["top"]}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      //style={{ backgroundColor: "#8f5555" }}
      style={[styles.scrollview, isDarkMode ? styles.darkBg : styles.lightBg]}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <SearchBar
          onPress={() => router.push("/search")}
          placeholder="Search for a book"
          value=""
          camera={false}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginRight: 16,
          alignItems: "center",
          //marginTop: 5,
          marginBottom: 10,
          //marginTop: 16,
        }}
      >
        <Text
          style={[
            styles.bigTitle,
            { marginBottom: 10 },
            isDarkMode ? styles.lightText : styles.darkText,
          ]}
        >
          Your Library
        </Text>

        <Text
          style={{ color: "#7663dc" }}
          onPress={() => router.push("/saved")}
        >
          See All
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          style={[
            {
              padding: 10,
              backgroundColor: "#fff",
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              width: "48%",

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.08,
              shadowRadius: 4,
            },
            isDarkMode ? styles.buttonDark : styles.buttonLight,
          ]}
          onPress={() => router.push("/saved")}
        >
          {/*["#ebecf7", "#777d9f"]*/}

          <View
            style={{
              padding: 5,
              backgroundColor: "#ebecf7",
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <SymbolView
              name={"books.vertical"}
              size={24}
              tintColor={"#777d9f"}
            />
          </View>
          <View>
            <Text
              style={[
                { fontWeight: "700", fontSize: 15 },
                isDarkMode ? styles.lightText : styles.darkText,
              ]}
            >
              Shelves
            </Text>
            <Text style={styles.shelfSubtitle}>{shelfBooks.length} Total</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            {
              padding: 10,
              backgroundColor: "#fff",
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              width: "48%",

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.08,
              shadowRadius: 4,
            },
            isDarkMode ? styles.buttonDark : styles.buttonLight,
          ]}
          onPress={() => router.push("/saved")}
        >
          {/*["#ebecf7", "#777d9f"]*/}

          <View
            style={{
              padding: 5,
              backgroundColor: "#ffd6d6",
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <SymbolView
              name={"apple.books.pages"}
              size={24}
              tintColor={"#ff6b6b"}
            />
          </View>
          <View>
            <Text
              style={[
                { fontWeight: "700", fontSize: 15 },
                isDarkMode ? styles.lightText : styles.darkText,
              ]}
            >
              Lists
            </Text>
            <Text style={styles.shelfSubtitle}>{listsBooks.length} Total</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text
        style={[
          styles.bigTitle,
          { marginBottom: 10, marginTop: 15 },
          isDarkMode ? styles.lightText : styles.darkText,
        ]}
      >
        Trending
      </Text>
      {loadingTrending ? (
        <View style={styles.containerLoading}>
          <ActivityIndicator
            size="large"
            //color="#0000ff"
            //className="mt-10 self-center"
          />
        </View>
      ) : dataTrending.length !== 0 ? (
        <FlatList
          data={dataTrending}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: 6 }}
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <BookCard
              itemKey={`/${item.trending_id[item.trending_id.length - 1] === "W" ? "works" : "books"}/${item.trending_id}`}
              coverId={item.trending_id}
              urlPoster={`${COVER_URL}/${item.trending_id[item.trending_id.length - 1] === "W" ? "w" : "b"}/olid/${item.trending_id}-L.jpg`}
              authorName={[item.author]}
              title={item.title}
              //routeUrl={"edition"}
              routeUrl={
                item.trending_id[item.trending_id.length - 1] === "W"
                  ? "books"
                  : "editions"
              }
              orientation={"h"}
            />
          )}
          ListFooterComponent={
            <View style={{ height: 20, paddingHorizontal: 10 }} />
          }
        />
      ) : (
        <Text style={{ textAlign: "center", fontWeight: "600" }}>
          No Trending
        </Text>
      )}
      <Text
        style={[
          styles.bigTitle,
          { marginBottom: 10, marginTop: 15 },
          isDarkMode ? styles.lightText : styles.darkText,
        ]}
      >
        Browse by Genre
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.column}>
            {row.map((item, itemIndex) => (
              <TouchableOpacity
                key={item.name || itemIndex}
                style={[
                  styles.chip,
                  isDarkMode ? styles.buttonDark : styles.buttonLight,
                ]}
                activeOpacity={0.8}
                onPress={() =>
                  router.push({
                    pathname: `/genre/${item.name}`,
                    params: {
                      name: item.name,
                      endpoint: item.endpoint,
                    },
                  })
                }
              >
                <Text
                  style={[
                    styles.chipText,
                    isDarkMode ? styles.lightText : styles.darkText,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </ScrollView>
    //</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  darkBg: { backgroundColor: "#000" },
  lightBg: { backgroundColor: "#f2f2f2" },
  buttonDark: { backgroundColor: "#2f2f2f" },
  buttonLight: { backgroundColor: "#fff" },
  lightText: { color: "white" },
  darkText: { color: "black" },

  scrollContent: {
    paddingLeft: 16,
    paddingRight: 8,
  },

  column: {
    marginRight: 12,
  },

  chip: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    // Android shadow
    elevation: 2,
  },

  chipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    alignSelf: "center",
  },

  container: {
    flex: 1,
    //alignItems: "center",
    //justifyContent: "center",
    //backgroundColor: "#8f5555",
  },
  scrollview: {
    flex: 1,
    //marginLeft: 10,
    //paddingTop: 50,
    //backgroundColor: "#e7eff6",
  },
  safeview: {
    //paddingLeft: 15,
    //paddingRight: 15,
    flex: 1,
    //marginBottom: 80,

    //backgroundColor: "rgba(0, 0, 0, 0.5)",
    //borderColor: "#8f5555",
  },
  containerLoading: {
    width: "100%",
    height: 170,
    justifyContent: "center",
    alignItems: "center",
  },
  bigTitle: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 20,
    paddingLeft: 16,
    fontWeight: "600",
  },

  title: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 20,
    //paddingLeft: 16,
    fontWeight: "600",
  },
  endContainer: {
    height: 110,
    width: 20,
    flex: 1,
  },
  shelfSubtitle: {
    color: "gray",
  },
});
