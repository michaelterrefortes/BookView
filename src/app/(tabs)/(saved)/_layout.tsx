import { Stack, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Text, TouchableOpacity, useColorScheme } from "react-native";

export default function SavedLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <Stack>
      <Stack.Screen
        name="saved"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Library",
          headerShadowVisible: false,
          headerBackTitle: "",
          headerLargeTitleEnabled: true,
          //headerTintColor: "black",

          headerRight: () => (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 10,
              }}
              onPress={() =>
                router.push({
                  pathname: "/addList",
                  params: { type: "add", method: "POST", value: "" },
                })
              }
            >
              <SymbolView
                name="plus"
                size={18}
                tintColor={isDarkMode ? "white" : "black"}
                style={{ marginRight: 5 }}
              />
              <Text style={{ color: isDarkMode ? "white" : "black" }}>
                Add List
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
