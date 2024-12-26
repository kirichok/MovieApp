import { MovieService } from "./movie.service";
import { Entity, Store } from "@effijs/common";
import { IMovieParams } from "@/modules/Movie/movie.types";
import { CatchError } from "@/utils/CatchError";

@Entity.Decorators.Controller()
export class MovieController {
  constructor(private service: MovieService) {}

  @CatchError
  applyFilters(filterStore: Store.Form) {
    const { error, data } = filterStore.validate();
    if (error) {
      return;
    }

    this.service.setFilters(data as IMovieParams);
    return this.getMovies();
  }

  @CatchError
  async getMovies() {
    await this.service.get();
  }

  @CatchError
  async getMovieInfo(id: number | string) {
    await this.service.getInfo(id);
  }

  @CatchError
  async addMovie(formStore: Store.Form) {
    const { error, data } = formStore.validate();
    if (error) {
      return;
    }
    const actors = data.actors.map(({ name }: { name: string }) => name);
    await this.service.add({ ...data, actors });
  }

  @CatchError
  removeMovie(id: number | string) {
    return this.service.delete(id);
  }
}
