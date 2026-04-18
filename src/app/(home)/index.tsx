import { Link, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AuthorCard from "../../../components/AuthorCard";
import BookCard from "../../../components/BookCard";
import { icons } from "../../../constants/icons";
import { fetchBooksSubject } from "../../../services/api";

export default function Index() {
  const navigation = useNavigation();
  const router = useRouter();
  const [dataTrending, setDataTrending] = useState([]);
  const [dataFantasy, setDataFantasy] = useState([]);
  const [dataRomance, setDataRomance] = useState([]);
  const [dataScienceFiction, setDataScienceFiction] = useState([]);
  const subjects = [
    {
      key: 1,
      name: "Arts",
      icon: icons.arts,
      section: [
        { name: "Architecture", url: "architecture" },
        { name: "Art Instruction", url: "art_instruction" },
        { name: "Art History", url: "art_history" },
      ],
    },
    {
      key: 2,
      name: "Animals",
      icon: icons.animals,
      section: [
        { name: "Bears", url: "bears" },
        { name: "Cats", url: "cats" },
        { name: "Kittens", url: "kittens" },
        { name: "Dogs", url: "dogs" },
        { name: "Puppies", url: "puppies" },
      ],
    },
    {
      key: 3,
      name: "Fiction",
      icon: icons.fiction,
      section: [
        { name: "Fantasy", url: "fantasy" },
        { name: "Historical Fiction", url: "historical_fiction" },
        { name: "Horror", url: "horror" },
        { name: "Humor", url: "humor" },
      ],
    },
    {
      key: 4,
      name: "Science & Mathematics",
      icon: icons.science,
      section: [
        { name: "Biology", url: "biology" },
        { name: "Chemistry", url: "chemistry" },
        { name: "Mathematics", url: "mathematics" },
        { name: "Physics", url: "physics" },
        { name: "Programming", url: "programming" },
      ],
    },
    {
      key: 5,
      name: "Business & Finance",
      icon: icons.business,
      section: [
        { name: "Management", url: "management" },
        { name: "Entrepreneurship", url: "entrepreneurship" },
      ],
    },
    {
      key: 6,
      name: "Children's",
      icon: icons.children,
      section: [{ name: "Kids Books", url: "kids_books" }],
    },
    {
      key: 7,
      name: "History",
      icon: icons.history,
      section: [{ name: "Ancient Civilization", url: "ancient_civilization" }],
    },
    {
      key: 8,
      name: "Health & Wellness",
      icon: icons.healthcare,
      section: [
        { name: "Cooking", url: "cooking" },
        { name: "Cookbooks", url: "cookbooks" },
      ],
    },
    {
      key: 9,
      name: "Biography",
      icon: icons.biography,
      section: [{ name: "Autobiographies", url: "autobiographies" }],
    },
    {
      key: 8,
      name: "Social Sciences",
      icon: icons.socialScience,
      section: [{ name: "Anthropology", url: "anthropology" }],
    },
    {
      key: 9,
      name: "Places",
      icon: icons.place,
      section: [{ name: "Brazil", url: "brazil" }],
    },
    {
      key: 10,
      name: "Textbooks",
      icon: icons.textbooks,
      section: [{ name: "History", url: "history" }],
    },
    {
      key: 11,
      name: "Books by Language",
      icon: icons.language,
      section: [{ name: "English", url: "english" }],
    },
  ];

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
    const result = await fetchBooksSubject(endpoint);
    setData(result);
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
      <FlatList
        style={{ paddingTop: 25, paddingBottom: 10 }}
        data={subjects}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={<View style={{ paddingHorizontal: 5 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: `/genre/${item.name}`,
                params: {
                  name: item.name,
                  data: JSON.stringify(item.section),
                },
              })
            }
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 10,
              paddingLeft: 10,
              backgroundColor: "#fff",
              borderRadius: 50,
              shadowOffset: {
                width: 0, // Centered horizontally
                height: 2, // Cast 2 points downward
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              flexDirection: "row",
              alignItems: "center",
              //elevation: 1,
            }}
          >
            <Image
              source={item.icon}
              style={{ width: 25, height: 25, marginRight: 8 }}
            />
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Link href={`/moreBooks/trending_weekly`} asChild>
        <Text style={styles.bigTitle}>
          Trending Weekly
          <Ionicons name={"chevron-forward-outline"} size={25} />
        </Text>
      </Link>

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
              coverId={item.editions.docs[0].cover_i}
              urlPoster={`https://covers.openlibrary.org/b/id/${item.editions.docs[0].cover_i}-M.jpg`}
              authorName={item.author_name}
              title={item.title}
              routeUrl={"books/"}
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
            <>
              {item.author_key.map((key, index) => (
                <AuthorCard
                  key={key}
                  authorKey={`/authors/${key}`}
                  name={item.author_name[index]}
                  routeUrl={"authors/"}
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
    paddingTop: 50,
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
    fontSize: 32,
    paddingLeft: 16,
    fontWeight: "bold",
  },
  endContainer: {
    height: 110,
    width: 20,
    flex: 1,
  },
});
