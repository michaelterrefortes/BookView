import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { clearAllAppData } from "../../../services/localData";

const { width } = Dimensions.get("window");

const slides = [
  {
    title: "Your Personal Bookshelf",
    description:
      "Create beautiful shelves, organize your collection, and keep every book right at your fingertips.",
  },
  {
    title: "Find Stories You'll Love",
    description:
      "Browse by genre, author, or title and discover books tailored to your reading interests.",
  },
  {
    title: "Read With Purpose",
    description:
      "Track your reading journey, manage lists, and celebrate every book you finish.",
  },
];

const Index = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark"; // colorScheme === "dark";

  useEffect(() => {
    const deleteLocalSearch = async () => {
      await clearAllAppData();
    };

    deleteLocalSearch();
  }, []);

  return (
    <ScrollView
      style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ height: 150 }} />

      {/* Logo */}
      <Image
        source={require("../../../assets/images/bookview-icon.png")}
        style={styles.logo}
      />

      {/* App Title */}
      <Text
        style={[
          styles.appTitle,
          isDarkMode ? styles.lightText : styles.darkText,
        ]}
      >
        BookView
      </Text>

      <Text style={styles.subtitle}>Your Personal Library</Text>

      {/* Carousel / Slideshow */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const slideSize = width - 40;
          const index = Math.round(
            event.nativeEvent.contentOffset.x / slideSize,
          );
          setActiveIndex(index);
        }}
        scrollEventThrottle={16}
        style={{ marginTop: 40 }}
      >
        {slides.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>

            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* Sign In Button */}
      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <LinearGradient
          colors={["#2b5bfc", "#921ffa"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Sign Up */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>

        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text style={styles.signupButton}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  darkBg: { backgroundColor: "#000" },
  lightBg: { backgroundColor: "#f2f2f2" },
  lightText: { color: "white" },
  darkText: { color: "black" },

  container: {
    flex: 1,
    padding: 20,

    //backgroundColor: "#fff",
  },

  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },

  appTitle: {
    fontWeight: "700",
    fontSize: 32,
    textAlign: "center",
    marginTop: 15,
  },

  subtitle: {
    textAlign: "center",
    marginTop: 10,
    color: "gray",
    fontSize: 16,
  },

  card: {
    width: width - 40,
    backgroundColor: "#e0d7ff",
    borderRadius: 25,
    padding: 25,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#5c2bfc",
    marginBottom: 12,
  },

  cardDescription: {
    textAlign: "center",
    color: "#555",
    fontSize: 16,
    lineHeight: 24,
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },

  activeDot: {
    backgroundColor: "#2b5bfc",
    width: 22,
  },

  button: {
    marginTop: 40,
    alignSelf: "center",
    padding: 15,
    borderRadius: 50,
    width: "80%",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },

  signupContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
  },

  signupText: {
    fontSize: 15,
    color: "gray",
  },

  signupButton: {
    fontSize: 15,
    color: "#2b5bfc",
    fontWeight: "700",
  },

  footer: {
    marginTop: 50,
    marginBottom: 30,
    alignItems: "center",
  },

  footerText: {
    color: "#777",
    fontSize: 14,
  },
});
