import { useCallback, useEffect } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useModules } from "@/modules/useModules";
import { IMovie } from "@/modules/Movie/movie.types";
import { useStore } from "@/utils/useStore";
import { Navigator, router, useLocalSearchParams } from "expo-router";
import Screen = Navigator.Screen;
import React from "react";

export default function MovieListItem() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { movieModule } = useModules();

  useEffect(() => {
    if (id) {
      movieModule.controller.getMovieInfo(id);
    }
  }, [id]);

  const { movie } = useStore<{ movie: IMovie }>(movieModule.store, {
    movie: `movie.${id}`,
  });

  const onRemove = useCallback(() => {
    Alert.alert(
      "Are you sure?",
      `Do you want to delete movie "${movie.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Delete",
          style: "destructive",
          onPress: () => {
            router.back();
            movieModule.controller.removeMovie(id);
          },
        },
      ],
    );
  }, [id, movie]);

  return (
    <>
      <Screen
        options={{
          title: "Movie Details",
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.95} onPress={onRemove}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <Info title="Title" value={movie.title} />
        <Info title="Year" value={movie.year} />
        <Info title="Format" value={movie.format} />
        <Info title="Actors">
          <View style={{ gap: 8, flexDirection: "row" }}>
            {movie.actors?.map((actor) => (
              <Text key={actor?.id} style={styles.actor}>
                {actor?.name}
              </Text>
            ))}
          </View>
        </Info>
      </View>
    </>
  );
}

function Info({
  value,
  title,
  children,
}: {
  title: string;
  value?: string | number;
  children?: React.ReactNode;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <Text
        style={{ textAlign: "right", width: 80, fontSize: 16, color: "#555" }}
      >
        {title}:
      </Text>
      {children || <Text style={{ fontSize: 18 }}>{value}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    gap: 16,
  },
  actor: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#333",
  },
});
