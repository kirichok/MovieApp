import { router, Stack } from "expo-router";
import Button from "@/components/Button";
import { useModules } from "@/modules/useModules";
import { Text } from "react-native";

export default function MovieLayoutNav() {
  const { authModule } = useModules();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Movies",
          headerLeft: () => (
            <Button
              color="transparent"
              onPress={() => authModule.controller.signOut()}
            >
              <Text style={{ color: "#2f95dc", fontWeight: 600 }}>
                Sign Out
              </Text>
            </Button>
          ),
          headerRight: () => (
            <Button
              color="transparent"
              onPress={() => router.navigate("/(movie)/Form")}
            >
              <Text style={{ color: "#2f95dc", fontWeight: 600 }}>
                Add Movie
              </Text>
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name="Form"
        options={{ presentation: "modal", headerTitle: "Add Movie" }}
      />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
