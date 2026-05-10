import { createNativeBottomTabNavigator } from "@react-navigation/bottom-tabs/unstable";
import { withLayoutContext } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const TabIcon = ({ focused, icon, title }) => (
  <View
    style={{
      width: "100%", // size-full width
      height: "100%", // size-full height
      justifyContent: "center", // vertically center
      alignItems: "center", // horizontally center
      marginTop: 10, // mt-4 (~16px in RN)
      //borderRadius: 9999, // fully rounded
    }}
  >
    <Ionicons name={focused ? icon : `${icon}-outline`} size={25} />
  </View>
);

const Tab = createNativeBottomTabNavigator();
const Tabs = withLayoutContext(Tab.Navigator);

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: false,
          //headerTransparent: true,

          tabBarIcon: ({ focused }) =>
            Platform.select({
              ios: {
                type: "sfSymbol",
                name: focused ? "house.fill" : "house",
              },
            }),
        }}
      />

      <Tabs.Screen
        name="(search)"
        options={{
          title: "Search",
          headerShown: false,

          tabBarIcon: ({ focused }) =>
            Platform.select({
              ios: {
                type: "sfSymbol",
                name: focused ? "magnifyingglass" : "magnifyingglass",
              },
            }),
        }}
      />

      <Tabs.Screen
        name="(saved)"
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            Platform.select({
              ios: {
                type: "sfSymbol",
                name: focused ? "bookmark.fill" : "bookmark",
              },
            }),
        }}
      />

      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            Platform.select({
              ios: {
                type: "sfSymbol",
                name: focused ? "person.fill" : "person",
              },
            }),
        }}
      />
    </Tabs>
  );
};

export default _layout;

/*
export default function RootLayout() {
  return {
  
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerBackTitle: "",
          headerShown: false,
          headerTitle: "",
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
    </Stack>
  };
} */
