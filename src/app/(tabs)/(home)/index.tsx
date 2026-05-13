import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AuthorCard from "../../../../components/AuthorCard";
import BookCard from "../../../../components/BookCard";
import GenreCard from "../../../../components/GenreCard";
import SearchBar from "../../../../components/SearchBar";
import { COVER_URL } from "../../../../constants/urls";
import { subjects } from "../../../../constants/variables";

export default function Index() {
  const navigation = useNavigation();
  const router = useRouter();
  const [dataTrending, setDataTrending] = useState([]);
  const [dataFantasy, setDataFantasy] = useState([]);
  const [dataRomance, setDataRomance] = useState([]);
  const [dataScienceFiction, setDataScienceFiction] = useState([]);

  const [loadingTrending, setLoadingTrending] = useState(false);
  const [loadingFantasy, setLoadingFantasy] = useState(false);
  const [loadingRomance, setLoadingRomance] = useState(false);
  const [loadingScienceFiction, setLoadingScienceFiction] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    loadBooks(
      setLoadingTrending,
      setDataTrending,
      "/trending/weekly.json?limit=10",
    );
  }, [trigger]);

  const loadBooks = async (setLoading, setData, endpoint) => {
    setLoading(true);
    //const result = await fetchBooksSubject(endpoint);
    //setData(result);
    setLoading(false);
  };

  // Handler for the pull-to-refresh gesture
  const onRefresh = () => {
    setRefreshing(true);
    setTrigger(!trigger);
    setRefreshing(false);
  };

  return (
    //<SafeAreaView style={styles.safeview} edges={["top"]}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      //style={{ backgroundColor: "#8f5555" }}
      style={styles.scrollview}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <SearchBar
          onPress={() => router.push("/search")}
          placeholder="Search for a book"
          value=""
          camera={false}
        />
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Browse by genre</Text>
      </View>
      <FlatList
        data={subjects}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={<View style={{ paddingHorizontal: 5 }} />}
        renderItem={({ item }) => <GenreCard item={item} />}
      />
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.bigTitle}>Trending Weekly</Text>
      </TouchableOpacity>

      {loadingTrending ? (
        <View style={styles.containerLoading}>
          <ActivityIndicator
            size="large"
            //color="#0000ff"
            //className="mt-10 self-center"
          />
        </View>
      ) : (
        <FlatList
          data={dataTrending}
          horizontal
          showsHorizontalScrollIndicator={false}
          //ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          contentContainerStyle={{ paddingHorizontal: 8 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <BookCard
              itemKey={item.key}
              coverId={item.key.split("/")[2]}
              urlPoster={`${COVER_URL}/b/olid/${item.key.split("/")[2]}-L.jpg`}
              authorName={item.author_name}
              title={item.title}
              routeUrl={"books"}
            />
          )}
        />
      )}

      <Text style={styles.bigTitle}>Popular Authors</Text>

      {loadingTrending ? (
        <View style={styles.containerLoading}>
          <ActivityIndicator
            size="large"
            //color="#0000ff"
            //className="mt-10 self-center" styling
          />
        </View>
      ) : (
        <FlatList
          data={dataTrending}
          horizontal
          showsHorizontalScrollIndicator={false}
          //ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          contentContainerStyle={{ paddingHorizontal: 8 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <>
              {item.author_key.map((key, index) => (
                <AuthorCard
                  key={key}
                  authorId={key}
                  name={item.author_name[index]}
                />
              ))}
            </>
          )}
        />
      )}

      <View style={styles.endContainer} />
    </ScrollView>
    //</SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    //backgroundColor: "red",
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
  endContainer: {
    height: 110,
    width: 20,
    flex: 1,
  },
});
