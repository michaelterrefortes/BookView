import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { validImage } from "../constants/functions";

interface Book {
  itemKey: String;
  coverId: String;
  urlPoster: String;
  title: String;
  authorName: String;
  routeUrl: String;
  year: String;
  orientation: String;
}

const BookCard = ({
  itemKey,
  coverId,
  urlPoster,
  title,
  authorName,
  routeUrl,
  year = "",

  orientation = "h",
}: Book) => {
  //console.log(itemKey, coverId, urlPoster);
  //console.log(authorName);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark"; //colorScheme === "dark";
  const router = useRouter();

  //console.log(itemKey, coverId, urlPoster, title, authorName, routeUrl);

  //console.log(year);

  const [isValidImage, setIsValidImage] = useState<boolean | null>(null);

  useEffect(() => {
    validImage(urlPoster, setIsValidImage);
  }, [urlPoster]);

  if (orientation === "h") {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: `/${routeUrl}/${itemKey.split("/")[2]}`,
            params: {
              itemKey: itemKey,
              coverId: coverId,
              urlPoster: urlPoster,
              title: title,
              authorName: authorName,
            },
          })
        }
      >
        {isValidImage === null ? (
          <View style={[styles.coverContainer, styles.placeholder]}>
            <ActivityIndicator size="small" color={"white"} />
          </View>
        ) : isValidImage ? (
          <View
            style={[styles.coverContainer, { backgroundColor: "transparent" }]}
          >
            <Image
              resizeMode="contain"
              source={{
                uri: urlPoster,
              }}
              //borderRadius={60}
              style={styles.cover}
            />
          </View>
        ) : (
          <View style={[styles.coverContainer, styles.placeholder]}>
            <Text style={{ color: "#ffffff" }}>No Image</Text>
          </View>
        )}
        <View style={{ height: 50, marginTop: 5 }}>
          <Text
            style={[
              styles.title,
              isDarkMode ? styles.lightText : styles.darkText,
            ]}
            numberOfLines={2}
          >
            {title}
          </Text>

          {authorName[0].trim() !== "" ? (
            <Text
              style={[
                styles.author,
                { color: isDarkMode ? "lightgray" : "gray" },
              ]}
              numberOfLines={1}
            >
              {authorName?.join(", ")}
            </Text>
          ) : null}

          {typeof year === "string" && year.trim() !== "" && year !== "null" ? (
            <Text
              style={[
                styles.author,
                { color: isDarkMode ? "lightgray" : "gray" },
              ]}
              numberOfLines={1}
            >
              {year}
            </Text>
          ) : typeof year === "number" ? (
            <Text
              style={[
                styles.author,
                { color: isDarkMode ? "lightgray" : "gray" },
              ]}
              numberOfLines={1}
            >
              {year}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() =>
          router.push({
            pathname: `/${routeUrl}/${itemKey.split("/")[2]}`,
            params: {
              itemKey: itemKey,
              coverId: coverId,
              urlPoster: urlPoster,
              title: title,
              authorName: authorName,
            },
          })
        }
      >
        {isValidImage === null ? (
          <View style={[styles.coverContainerSmall, styles.placeholder]}>
            <ActivityIndicator size="small" color={"white"} />
          </View>
        ) : isValidImage ? (
          <View
            style={[
              styles.coverContainerSmall,
              { backgroundColor: "transparent" },
            ]}
          >
            <Image
              source={{ uri: urlPoster }}
              style={styles.cover}
              resizeMode="contain"
            />
          </View>
        ) : (
          <View style={[styles.coverContainerSmall, styles.placeholder]}>
            <Text style={{ color: "#fff", textAlign: "center" }}>No Image</Text>
          </View>
        )}
        <View style={styles.info}>
          <Text
            style={[
              styles.title,
              isDarkMode ? styles.lightText : styles.darkText,
            ]}
            numberOfLines={2}
          >
            {title}
          </Text>
          {authorName?.[0].trim() !== "" ? (
            <Text
              style={[
                styles.author,
                { color: isDarkMode ? "lightgray" : "gray" },
              ]}
              numberOfLines={1}
            >
              {authorName?.join(", ")}
            </Text>
          ) : null}

          {typeof year === "string" && year.trim() !== "" && year !== "null" ? (
            <Text
              style={[
                styles.author,
                { color: isDarkMode ? "lightgray" : "gray" },
              ]}
              numberOfLines={1}
            >
              {year}
            </Text>
          ) : typeof year === "number" ? (
            <Text
              style={[
                styles.author,
                { color: isDarkMode ? "lightgray" : "gray" },
              ]}
              numberOfLines={1}
            >
              {year}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }
};

export default BookCard;

const styles = StyleSheet.create({
  darkBg: { backgroundColor: "#000" },
  lightBg: { backgroundColor: "#f2f2f2" },
  buttonDark: { backgroundColor: "#2f2f2f" },
  buttonLight: { backgroundColor: "#fff" },
  lightText: { color: "white" },
  darkText: { color: "black" },

  card: {
    width: 120,

    //borderRadius: 12,
    //backgroundColor: "#fff",
    paddingLeft: 8,
    //shadowColor: "#000",
    //shadowOpacity: 0.1,
    //shadowOffset: { width: 0, height: 2 },
    //shadowRadius: 5,
    //elevation: 3,
  },
  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    //backgroundColor: "red",
    //borderRadius: 12,
    //marginBottom: 10,
    //shadowColor: "#000",
    //shadowOpacity: 0.1,
    //shadowOffset: { width: 0, height: 2 },
    //shadowRadius: 5,
    //elevation: 3,
  },
  coverContainer: {
    width: 120,
    height: 180,
    backgroundColor: "#f2f2f2",
    //borderRadius: 8,
    overflow: "hidden",
  },

  coverContainerSmall: {
    width: 60,
    height: 90,
    backgroundColor: "#f2f2f2",
    //borderRadius: 8,
    overflow: "hidden",
  },

  cover: {
    width: "100%",
    height: "100%",
  },

  placeholder: {
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 2,
  },
  author: {
    fontSize: 12,
    color: "#555",
  },
});
