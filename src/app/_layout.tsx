import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
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
  );
};

export default Layout;
