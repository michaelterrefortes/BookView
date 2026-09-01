import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MoreInfo = () => {
  const { description } = useLocalSearchParams();

  //console.log(description);

  const navigation = useNavigation();

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

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

  return (
    <SafeAreaView
      style={[
        { flex: 1, paddingHorizontal: 20 },
        isDarkMode ? styles.darkBg : styles.lightBg,
      ]}
      edges={["left", "right"]}
    >
      <ScrollView>
        <View style={{ height: 100 }} />
        <Text style={isDarkMode ? styles.lightText : styles.darkText}>
          {description}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  darkBg: { backgroundColor: "#1c1c1c" },
  lightBg: { backgroundColor: "#f2f2f2" },
  buttonDark: { backgroundColor: "#2f2f2f" },
  buttonLight: { backgroundColor: "#fff" },
  lightText: { color: "white" },
  darkText: { color: "black" },
});

export default MoreInfo;
