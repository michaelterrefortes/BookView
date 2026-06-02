import { Stack, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Text, TouchableOpacity } from "react-native";

export default function SavedLayout() {
  const router = useRouter();
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
                tintColor={"black"}
                style={{ marginRight: 5 }}
              />
              <Text>Add List</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
