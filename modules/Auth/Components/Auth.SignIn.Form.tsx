import { useModules } from "@/modules/useModules";
import { useCallback, useMemo } from "react";
import { Store } from "@effijs/common";
import { SignInFormValidator } from "@/modules/Auth/auth.signIn.validator";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import Form from "@effijs/form-react";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";

export default function AuthSignInForm() {
  const { authModule } = useModules();
  const formStore = useMemo(() => new Store.Form({}, SignInFormValidator), []);
  const { navigate } = useNavigation();

  const onLogin = useCallback(() => {
    authModule.controller.login(formStore);
  }, [formStore]);

  const onSignUp = useCallback(() => {
    // @ts-ignore
    navigate("SignUp");
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
      >
        <Text style={{ fontSize: 24 }}>Sign In</Text>
      </View>
      <View style={{ flex: 2, justifyContent: "center", gap: 16 }}>
        <Form store={formStore}>
          <Form.Item name={"email"}>
            <TextInput placeholder="Email" keyboardType="email-address" />
          </Form.Item>
          <Form.Item name={"password"}>
            <TextInput placeholder="Password" secureTextEntry />
          </Form.Item>
        </Form>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button onPress={onLogin}>Login</Button>
      </View>
      <Button color="transparent" onPress={onSignUp}>
        <Text style={{ color: "#1e1e1e" }}>
          Don’t have an account?{" "}
          <Text style={{ color: "#2f95dc", fontWeight: 600 }}>Sign Up</Text>
        </Text>
      </Button>
    </SafeAreaView>
  );
}
