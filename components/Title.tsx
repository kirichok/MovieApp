import React from "react";
import { Text } from "react-native";

export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        fontSize: 16,
        color: "#545454",
        fontWeight: 500,
        marginBottom: 4,
      }}
    >
      {children}
    </Text>
  );
}
