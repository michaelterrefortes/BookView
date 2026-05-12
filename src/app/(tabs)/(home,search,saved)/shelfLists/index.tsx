import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ShelfLists = () => {
  const { bookId } = useLocalSearchParams();

  //console.log(description);

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

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20 }}
      edges={["left", "right"]}
    >
      <ScrollView>
        <Text>{bookId}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShelfLists;
