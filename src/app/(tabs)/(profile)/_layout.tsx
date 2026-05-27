import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      {/*<Stack.Screen name="profile" options={{ title: "Profile" }} />*/}

      <Stack.Screen
        name="profile"
        options={({ navigation }) => ({
          headerBackTitle: "",
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Profile",
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

      <Stack.Screen
        name="change-email"
        options={({ navigation }) => ({
          headerBackTitle: "",
          headerShown: true,
          headerTransparent: true,
          headerBackButtonDisplayMode: "minimal",
          headerTitle: "Change Email",
          headerShadowVisible: false,
          headerBlurEffect: "none",
          headerLargeTitleEnabled: true,

          //presentation: "modal",

          //sheetGrabberVisible: true,
          //sheetAllowedDetents: "all",

          //navigationBarHidden: false,
        })}
      />

      <Stack.Screen
        name="change-password"
        options={({ navigation }) => ({
          headerBackTitle: "",
          headerShown: true,
          headerTransparent: true,
          headerBackButtonDisplayMode: "minimal",
          headerTitle: "Change Password",
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
