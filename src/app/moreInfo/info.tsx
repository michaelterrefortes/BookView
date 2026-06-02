import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MoreInfo = () => {
  const { description } = useLocalSearchParams();

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
        <View style={{ height: 100 }} />
        <Text>{description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MoreInfo;
