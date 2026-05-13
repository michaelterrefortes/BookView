import { Stack } from "expo-router";
import React from "react";
import { BookProvider } from "../../context/BookContext";

const Layout = () => {
  return (
    <BookProvider>
      <Stack screenOptions={{ headerShown: false }}>
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
      </Stack>
    </BookProvider>
  );
};

export default Layout;
