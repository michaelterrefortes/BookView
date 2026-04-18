import { Stack, useRouter } from "expo-router";
import { Alert, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SavedLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="saved"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Your Book Lists",
          headerShadowVisible: false,
          headerBackTitle: "",

          headerRight: () => (
            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={() => router.push("/modalList")}
            >
              <Ionicons name="add" size={25} />
            </TouchableOpacity>
          ),
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

      <Stack.Screen
        name="moreBooks/[key]"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "More Books",
          headerShadowVisible: false,
          headerBackTitle: "",
        }}
      />

      <Stack.Screen
        name="modalList"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Create Book List",
          headerShadowVisible: false,
          headerBackTitle: "",
          presentation: "modal",

          headerRight: () => (
            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={() => Alert.alert("pressed", "pressed add")}
            >
              <Ionicons name="checkmark" size={25} />
            </TouchableOpacity>
          ),

          headerLeft: () => (
            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={() => router.back()}
            >
              <Ionicons name="close" size={25} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
