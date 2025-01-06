import { StyleSheet, Text } from "react-native";

export function ErrorMessage({
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
  errorText: { color: "red", alignSelf: "flex-end" },
});
