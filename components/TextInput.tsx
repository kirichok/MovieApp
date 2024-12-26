import {
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  View,
} from "react-native";
import Title from "@/components/Title";
import { useCallback } from "react";

interface ITextInputProps extends Omit<TextInputProps, "onChange"> {
  title?: string;
  error?: { message: string }[];
  onChange?: (value: string | undefined) => void;
}

export default function TextInput({
  title,
  error,
  value,
  onChange,
  ...props
}: ITextInputProps) {
  const onChangeText = useCallback(
    (text: string) => onChange?.(text ? text : undefined),
    [onChange],
  );

  return (
    <View>
      {title ? <Title>{title}</Title> : null}
      <View style={styles.container}>
        <RNTextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          textContentType="none"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          clearButtonMode="while-editing"
          clearTextOnFocus={false}
          underlineColorAndroid="transparent"
          {...props}
        />
      </View>
      <ErrorMessage error={error} />
    </View>
  );
}

function ErrorMessage({
  error,
}: {
  error?: { message: string; property?: string }[];
}) {
  if (!error?.length) return null;
  return (
    <Text style={styles.errorText}>
      {error
        .map(({ message, property }) =>
          message.format({ property: property || "" }),
        )
        .join("\n")}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#2f95dc20",
    paddingHorizontal: 8,
    paddingVertical: 2,
    minHeight: 40,
    borderRadius: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  errorText: { color: "red", alignSelf: "flex-end" },
});
