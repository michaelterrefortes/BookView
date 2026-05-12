import { Stack, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { TouchableOpacity } from "react-native";

export default function SavedLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="saved"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Your Book Lists",
          headerShadowVisible: false,
          headerBackTitle: "",

          headerRight: () => (
            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={() => router.push("/(tabs)/(search)/search")}
            >
              <SymbolView name="plus" size={25} tintColor={"black"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="books/[key]"
        options={{
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
        name="editions/[key]"
        options={{
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
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="moreBooks/[key]"
        options={{
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
          headerBackTitle: "",
          headerShown: true,
          headerTransparent: true,
          headerTitle: "More",
          //headerShadowVisible: false,
          headerBlurEffect: "none",

          presentation: "modal",
        }}
      />
    </Stack>
  );
}
