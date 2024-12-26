import { Alert } from "react-native";

export const CatchError: MethodDecorator = (
  target,
  propertyKey,
  descriptor,
) => {
  const originalMethod = descriptor.value;

  // @ts-ignore
  descriptor.value = async function (...args: any[]) {
    try {
      // @ts-ignore
      return await originalMethod.apply(this, args);
    } catch (error) {
      const t = target.constructor.name;

      // @ts-ignore
      Alert.alert(`Error in "${t}.${String(propertyKey)}"`, error.message);
      // console.error(`Error in method ${String(propertyKey)}:`, error);
    }
  };
  return descriptor;
};
