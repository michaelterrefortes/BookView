import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "",
          headerShown: true,
          headerTitle: "Home",
          headerLargeTitleEnabled: true,
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
          headerBackTitle: "",
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
          headerTitle: "Add to Shelf or Lists",
          //headerShadowVisible: false,
          headerBlurEffect: "none",

          presentation: "modal",
        }}
      />
    </Stack>
  );
}
