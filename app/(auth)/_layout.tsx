import { Stack } from "expo-router";

export default function AuthLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="SignUp" />
    </Stack>
  );
}
