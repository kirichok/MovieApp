import { Text, View } from "react-native";
import { router } from "expo-router";
import Form from "@effijs/form-react";
import TextInput from "@/components/TextInput";
import { useCallback, useMemo } from "react";
import { Store } from "@effijs/common";
import { SignUpFormValidator } from "@/modules/Auth/auth.signUp.validator";
import Button from "@/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useModules } from "@/modules/useModules";

export default function AuthSignUpForm() {
  const { authModule } = useModules();
  const formStore = useMemo(() => new Store.Form({}, SignUpFormValidator), []);

  const onSignUp = useCallback(() => {
    authModule.controller.signUp(formStore);
  }, []);

  const onSignIn = () => {
    router.navigate("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
      >
        <Text style={{ fontSize: 24 }}>Sign Up</Text>
      </View>
      <View style={{ flex: 2, justifyContent: "center", gap: 16 }}>
        <Form store={formStore}>
          <Form.Item name={"name"}>
            <TextInput placeholder="Your Name" />
          </Form.Item>
          <Form.Item name={"email"}>
            <TextInput placeholder="Email" keyboardType="email-address" />
          </Form.Item>
          <Form.Item name={"password"}>
            <TextInput placeholder="Password" secureTextEntry />
          </Form.Item>
          <Form.Item name={"confirmPassword"}>
            <TextInput placeholder="Confirm Password" secureTextEntry />
          </Form.Item>
        </Form>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button onPress={onSignUp}>Sign Up</Button>
      </View>
      <Button color="transparent" onPress={onSignIn}>
        <Text style={{ color: "#1e1e1e" }}>
          Already have an account?{" "}
          <Text style={{ color: "#2f95dc", fontWeight: 600 }}>Login</Text>
        </Text>
      </Button>
    </SafeAreaView>
  );
}
