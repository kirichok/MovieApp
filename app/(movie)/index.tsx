import { useModules } from "@/modules/useModules";
import { useEffect } from "react";
import MovieList from "@/modules/Movie/Components/Movie.List";

export default function TabOneScreen() {
  const { movieModule } = useModules();

  useEffect(() => {
    movieModule.controller.getMovies();
  }, []);

  return <MovieList />;
}
