import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableOpacityProps,
} from "react-native";
import React, { useMemo } from "react";

interface IButtonProps extends TouchableOpacityProps {
  color?: string;
}

function Common({
  type,
  color,
  onPress,
  children,
  isActive,
}: IButtonProps & { type: "filled" | "tonal"; isActive?: boolean }) {
  const style = useMemo(() => {
    if (type === "filled") {
      return {
        container: [styles.container, color && { backgroundColor: color }],
        text: styles.text,
      };
    }
    if (type === "tonal") {
      return {
        container: [styles.buttonTonal, isActive && styles.buttonTonalActive],
        text: [
          styles.buttonTonalText,
          isActive && styles.buttonTonalTextActive,
        ],
      };
    }
    return {};
  }, [color, type, isActive]);

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onPress}
      style={style.container}
    >
      <Text style={style.text}>{children}</Text>
    </TouchableOpacity>
  );
}

export default function Button(props: IButtonProps) {
  return <Common type="filled" {...props} />;
}

export function ButtonTonal(props: {
  isActive: boolean;
  onPress: any;
  children: React.ReactNode;
}) {
  return <Common type={"tonal"} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    // flexDirection: "row",
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2f95dc",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },

  buttonTonal: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  buttonTonalActive: {
    backgroundColor: "#2f95dc20",
  },
  buttonTonalTextActive: {
    color: "#2f95dc", // Text color when active
  },
  buttonTonalText: {
    fontSize: 16,
    color: "#000000", // Text color when normal
  },
});
