import { Text, View } from "react-native";
import TextInput from "@/components/TextInput";
import Form from "@effijs/form-react";
import { Store } from "@effijs/common";
import React, { useCallback, useMemo } from "react";
import { MovieFiltersFormValidator } from "@/modules/Movie/movie.filters.validator";
import Button, { ButtonTonal } from "@/components/Button";
import { useModules } from "@/modules/useModules";
import Title from "@/components/Title";

export default function MovieFilters() {
  const { movieModule } = useModules();
  const filtersFormStore = useMemo(
    () => new Store.Form({}, MovieFiltersFormValidator),
    [],
  );

  const onSearch = useCallback(() => {
    movieModule.controller.applyFilters(filtersFormStore);
  }, []);

  return (
    <View
      style={{
        gap: 8,
        backgroundColor: "#2f95dc20",
        margin: 8,
        borderRadius: 16,
        padding: 16,
      }}
    >
      <Text style={{ fontSize: 20, alignSelf: "center" }}>Filters</Text>
      <Form store={filtersFormStore}>
        <Form.Item name="title">
          <TextInput title="Title" placeholder="Enter Title" />
        </Form.Item>
        <Form.Item name="actor">
          <TextInput title="Actor" placeholder="Enter Actor Name" />
        </Form.Item>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Form.Item name="sort">
            <SortBy />
          </Form.Item>
          <Form.Item name="order">
            <OrderBy />
          </Form.Item>
        </View>
      </Form>
      <Button onPress={onSearch}>Search</Button>
    </View>
  );
}

const sortByOptions = [
  { label: "Id", value: "id" },
  { label: "Title", value: "title" },
  { label: "Year", value: "year" },
];

function SortBy({ value, onChange }: { value?: string; onChange?: any }) {
  return (
    <View>
      <Title>Sort By</Title>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {sortByOptions.map((options) => (
          <ButtonTonal
            key={options.value}
            isActive={value === options.value}
            onPress={() => onChange(options.value)}
          >
            {options.label}
          </ButtonTonal>
        ))}
      </View>
    </View>
  );
}

const orderByOptions = [
  { label: "ASC", value: "ASC" },
  { label: "DESC", value: "DESC" },
];

function OrderBy({ value, onChange }: { value?: string; onChange?: any }) {
  return (
    <View>
      <Title>Order By</Title>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {orderByOptions.map((options) => (
          <ButtonTonal
            key={options.value}
            isActive={value === options.value}
            onPress={() => onChange(options.value)}
          >
            {options.label}
          </ButtonTonal>
        ))}
      </View>
    </View>
  );
}
