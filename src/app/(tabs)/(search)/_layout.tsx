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
    </Stack>
  );
}
