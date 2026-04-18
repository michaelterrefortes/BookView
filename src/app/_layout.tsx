import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
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

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,

        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          //backgroundColor: "#0f0d23",
          borderRadius: 50,
          //marginHorizontal: 20,
          //marginBottom: 36,
          height: 75,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,

          //borderColor: "#0f0d23",
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Books",
          headerShown: false,
          //headerTransparent: true,

          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={"home"} title="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="(search)"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={"search"} title="Search" />
          ),
        }}
      />

      <Tabs.Screen
        name="(saved)"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={"bookmarks"} title="Saved" />
          ),
        }}
      />

      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={"person"} title="Profile" />
          ),
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
