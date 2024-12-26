import { useModules } from "@/modules/useModules";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "@/utils/useStore";
import MovieListItem from "@/modules/Movie/Components/Movie.List.Item";
import { FlatList, RefreshControl } from "react-native";
import MovieFilters from "@/modules/Movie/Components/Movie.Filters";

export default function MovieList() {
  const { movieModule } = useModules();
  const [refreshing, setRefresh] = useState(false);

  const { ids } = useStore<{ ids: number[] }>(movieModule.store, {
    ids: "movie.ids",
  });

  useEffect(() => {
    movieModule.controller.getMovies();
  }, []);

  const onRefresh = useCallback(() => {
    setRefresh(true);
    movieModule.controller.getMovies();
    setRefresh(false);
  }, []);

  return (
    <FlatList
      ListHeaderComponent={<MovieFilters />}
      data={ids}
      renderItem={({ item }) => <MovieListItem id={item} />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}
