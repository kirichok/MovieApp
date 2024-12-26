import React, { useCallback } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useModules } from "@/modules/useModules";
import { IMovie } from "@/modules/Movie/movie.types";
import { useStore } from "@/utils/useStore";
import { router } from "expo-router";

export default function MovieListItem({ id }: { id: number }) {
  const { movieModule } = useModules();

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
          onPress: () => movieModule.controller.removeMovie(id),
        },
      ],
    );
  }, [id, movie]);

  const onDetails = useCallback(() => {
    router.push(`/(movie)/${movie.id}`);
  }, [id]);

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onDetails}>
      <View style={styles.container}>
        <View key={id}>
          <Text style={styles.title}>{movie.title}</Text>
          {/*{movie.actors?.map((actor) => (
          <Text style={styles.actor}>{actor?.name}</Text>
        ))}*/}
          <View style={{ gap: 12, flexDirection: "row" }}>
            <Text style={styles.tonalText}>{movie.year}</Text>
            <Text style={styles.tonalText}>{movie.format}</Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.95} onPress={onRemove}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
  },
  actor: {
    fontStyle: "italic",
    color: "#333",
  },
  tonalText: {
    fontWeight: 600,
    color: "#2f95dc",
    backgroundColor: "#2f95dc20",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
});
