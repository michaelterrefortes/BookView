import { createNativeBottomTabNavigator } from "@react-navigation/bottom-tabs/unstable";
import { withLayoutContext } from "expo-router";
import React from "react";
import { Platform } from "react-native";

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
          tabBarActiveTintColor: "#7663dc",
          tabBarInactiveTintColor: "gray",

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
          tabBarActiveTintColor: "#7663dc",
          tabBarInactiveTintColor: "gray",

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
          title: "Library",
          headerShown: false,
          tabBarActiveTintColor: "#7663dc",
          tabBarInactiveTintColor: "gray",

          tabBarIcon: ({ focused }) =>
            Platform.select({
              ios: {
                type: "sfSymbol",
                name: focused ? "book.fill" : "book",
              },
            }),
        }}
      />

      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarActiveTintColor: "#7663dc",
          tabBarInactiveTintColor: "gray",

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
