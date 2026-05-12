import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerBackTitle: "",
          headerShown: true,
          headerTitle: "Home",
          headerLargeTitleEnabled: true,
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
          headerBackTitle: "",
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
