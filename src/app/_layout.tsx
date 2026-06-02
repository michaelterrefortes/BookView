import { Stack, useRouter } from "expo-router";
import React from "react";
import { BookProvider } from "../../context/BookContext";

const Layout = () => {
  const router = useRouter();
  return (
    <BookProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(auth)"
          options={{
            headerBackTitle: "",

            headerShown: false,
            headerTitle: "",
            //headerLargeTitle: true,
            //headerLargeTitleEnabled: true,
            //headerRight: () => <AccountButton />,
          }}
        />

        <Stack.Screen
          name="(tabs)"
          options={{
            headerBackTitle: "",

            headerShown: false,
            headerTitle: "",
            //headerLargeTitle: true,
            //headerLargeTitleEnabled: true,
            //headerRight: () => <AccountButton />,
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

        <Stack.Screen
          name="seeListShelf/index"
          options={{
            headerBackButtonDisplayMode: "minimal",
            headerBackTitle: "",
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
            //headerShadowVisible: false,
            headerBlurEffect: "none",

            //presentation: "modal",
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
          name="settings/change-email"
          options={({ navigation }) => ({
            headerBackTitle: "",
            headerShown: true,
            headerTransparent: true,
            headerBackButtonDisplayMode: "minimal",
            headerTitle: "Change Email",
            headerShadowVisible: false,
            headerBlurEffect: "none",
            //headerLargeTitleEnabled: true,

            //presentation: "modal",

            //sheetGrabberVisible: true,
            //sheetAllowedDetents: "all",

            //navigationBarHidden: false,
          })}
        />

        <Stack.Screen
          name="settings/change-password"
          options={({ navigation }) => ({
            headerBackTitle: "",
            headerShown: true,
            headerTransparent: true,
            headerBackButtonDisplayMode: "minimal",
            headerTitle: "Change Password",
            headerShadowVisible: false,
            headerBlurEffect: "none",
            //headerLargeTitleEnabled: true,

            //presentation: "card",

            //sheetGrabberVisible: true,
            //sheetAllowedDetents: "all",

            //navigationBarHidden: false,
          })}
        />
      </Stack>
    </BookProvider>
  );
};

export default Layout;
