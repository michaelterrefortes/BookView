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
                  pathname: "/(tabs)/(saved)/addList",
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
      <Stack.Screen
        name="books/[key]"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "",
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerBlurEffect: "none",
          //presentation: "modal",
          //navigationBarHidden: false,
        }}
      />
      <Stack.Screen
        name="addList/index"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "",
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Add List",
          headerShadowVisible: false,
          headerBlurEffect: "none",
          presentation: "modal",

          //sheetGrabberVisible: true,
          //sheetAllowedDetents: "all",

          //navigationBarHidden: false,
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
                router.back();
              },
            },
          ],
        }}
      />
      <Stack.Screen
        name="editions/[key]"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "",
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="authors/[key]"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "",
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="genre/[genreId]"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="moreBooks/[key]"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerShown: true,
          headerTransparent: true,
          headerTitle: "More Books",
          headerShadowVisible: false,
          headerBackTitle: "",
        }}
      />

      <Stack.Screen
        name="moreInfo/info"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "",
          headerShown: true,
          headerTransparent: true,
          headerTitle: "More",
          //headerShadowVisible: false,
          headerBlurEffect: "none",

          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="shelfLists/index"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "",
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Add to Library",
          //headerShadowVisible: false,
          headerBlurEffect: "none",

          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="seeListShelf/index"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "",
          //headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          //headerShadowVisible: false,
          headerBlurEffect: "none",

          //presentation: "modal",
        }}
      />
    </Stack>
  );
}
