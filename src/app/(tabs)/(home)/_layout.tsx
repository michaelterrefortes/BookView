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
          //headerTintColor: "black",
        }}
      />
    </Stack>
  );
}
