import { Stack, useRouter } from "expo-router";

export default function SearchLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="search"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "",
          headerShown: true,
          title: "Search",
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
          presentation: "modal",
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
          presentation: "modal",
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
        name="authors/[key]"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "",
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerShadowVisible: false,
          presentation: "modal",
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
        name="genre/[genreId]"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerShadowVisible: false,
          presentation: "modal",
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
        name="moreBooks/[key]"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerShown: true,
          headerTransparent: true,
          headerTitle: "More Books",
          headerShadowVisible: false,
          headerBackTitle: "",
          presentation: "modal",
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
        name="moreInfo/info"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "",
          headerShown: true,
          headerTransparent: true,
          headerTitle: "More",
          //headerShadowVisible: true,
          headerBlurEffect: "none",

          presentation: "modal",
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
    </Stack>
  );
}
