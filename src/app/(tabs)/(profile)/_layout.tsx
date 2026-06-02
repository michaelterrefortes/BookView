import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      {/*<Stack.Screen name="profile" options={{ title: "Profile" }} />*/}

      <Stack.Screen
        name="index"
        options={({ navigation }) => ({
          headerBackTitle: "",
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Account",
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerBlurEffect: "none",
          headerLargeTitleEnabled: true,

          //presentation: "modal",

          //sheetGrabberVisible: true,
          //sheetAllowedDetents: "all",

          //navigationBarHidden: false,
        })}
      />
    </Stack>
  );
}
