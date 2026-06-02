import { Stack, useRouter } from "expo-router";
import { useColorScheme } from "react-native";

export default function SearchLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

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
          headerTintColor: isDarkMode ? "white" : "black",
        }}
      />
    </Stack>
  );
}
