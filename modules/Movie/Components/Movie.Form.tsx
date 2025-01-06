import { Text, TouchableOpacity, View } from "react-native";
import Form from "@effijs/form-react";
import TextInput from "@/components/TextInput";
import React, { useCallback, useMemo } from "react";
import { Store } from "@effijs/common";
import Button, { ButtonTonal } from "@/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useModules } from "@/modules/useModules";
import { MovieFormValidator } from "@/modules/Movie/movie.validator";
import Title from "@/components/Title";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function MovieForm() {
  const { movieModule } = useModules();
  const formStore = useMemo(
    () => new Store.Form({ actors: [{ name: "" }] }, MovieFormValidator),
    [],
  );

  const onAddMovie = useCallback(() => {
    movieModule.controller.addMovie(formStore);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
      <View style={{ justifyContent: "center", gap: 16, marginTop: 16 }}>
        <Form store={formStore}>
          <Form.Item name={"title"}>
            <TextInput title="Title" placeholder="Enter Title" />
          </Form.Item>
          <Form.Item name={"year"}>
            <TextInput
              title="Year"
              placeholder="Enter Year"
              keyboardType="numeric"
            />
          </Form.Item>
          <Form.Item name={"format"}>
            <MovieFormatType />
          </Form.Item>

          <View style={{ gap: 8 }}>
            <Form.List name={"actors"}>
              <Actors>
                <Form.Item name={"name"}>
                  <TextInput placeholder="Enter Actor Name" />
                </Form.Item>
              </Actors>
            </Form.List>
          </View>
        </Form>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button onPress={onAddMovie}>Add Movie</Button>
      </View>
    </SafeAreaView>
  );
}

function Actors({
  onAdd,
  onRemove,
  children,
  isLast,
  isFirst,
}: {
  onAdd?: () => void;
  onRemove?: () => void;
  children?: React.ReactNode;
  isLast?: boolean;
  isFirst?: boolean;
}) {
  return (
    <>
      {isFirst ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Title>Actors</Title>
          <Button color="transparen" onPress={onAdd}>
            <Text style={{ color: "#2f95dc", fontWeight: 600 }}>Add Actor</Text>
          </Button>
        </View>
      ) : null}
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <View style={{ flex: 1 }}>{children}</View>
        {isFirst && isLast ? null : (
          <TouchableOpacity activeOpacity={0.95} onPress={onRemove}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
      {/*{isLast ? <Button onPress={onAdd}>Add</Button> : null}*/}
    </>
  );
}

const movieFormatOptions = ["DVD", "VHS", "Blu-ray"];

function MovieFormatType({
  error,
  value,
  onChange,
}: {
  error?: any;
  value?: string;
  onChange?: any;
}) {
  return (
    <View>
      <Title>Format</Title>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {movieFormatOptions.map((type) => (
          <ButtonTonal
            key={type}
            isActive={value === type}
            onPress={() => onChange(type)}
          >
            {type}
          </ButtonTonal>
        ))}
      </View>
      <ErrorMessage error={error} />
    </View>
  );
}
