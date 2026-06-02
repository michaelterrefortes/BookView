import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { COVER_URL } from "../../../constants/urls";
import { fetchISBN } from "../../../services/api";

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isbn, setIsbn] = useState(null);
  const router = useRouter();

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  //https://openlibrary.org/isbn/9780545582889.json

  useEffect(() => {
    const loadBook = async () => {
      if (isbn !== null) {
        //console.log("aqui");

        const result = await fetchISBN(isbn);

        if (result.success) {
          const bookid = result.data.key.split("/")[2];
          router.replace({
            pathname: `/editions/${result.data.key.split("/")[2]}`,
            params: {
              itemKey: result.data.key,
              coverId: result.data.key.split("/")[2],
              urlPoster: `${COVER_URL}/${bookid[bookid.length - 1] === "W" ? "w" : "b"}/olid/${bookid}-L.jpg`,
              title: result.data.title,
              authorName: "",
            },
          });
        } else {
          Alert.alert("Error", result.error);
          router.back();
        }
      }
    };

    loadBook();
  }, [isbn]);

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View
        style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}
      >
        <Text
          style={[styles.text, isDarkMode ? styles.lightText : styles.darkText]}
        >
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Handle the barcode results
  const handleBarcodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (scanned) return; // Prevent double scanning while handling
    setScanned(true);
    setIsbn(data);
  };

  return (
    <View
      style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}
    >
      {!scanned ? (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          onBarcodeScanned={handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13"], // ISBN-13 format
          }}
        />
      ) : (
        <View
          style={[
            styles.resultContainer,
            isDarkMode ? styles.darkBg : styles.lightBg,
          ]}
        >
          <Text
            style={[
              styles.resultText,
              isDarkMode ? styles.lightText : styles.darkText,
            ]}
          >
            Scanned ISBN: {isbn} Processing ...
          </Text>

          <ActivityIndicator size={"large"} />
          {/*<Button title="Scan Again" onPress={() => setScanned(false)} />*/}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  darkBg: { backgroundColor: "#000" },
  lightBg: { backgroundColor: "#f2f2f2" },
  buttonDark: { backgroundColor: "#2f2f2f" },
  buttonLight: { backgroundColor: "#fff" },
  lightText: { color: "white" },
  darkText: { color: "black" },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#000",
  },
  text: {
    //color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  resultContainer: {
    //backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    //justifyContent: "center",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
