import { Entity } from "@effijs/common";
import { MovieApi } from "./movie.api";
import { MovieStore } from "./movie.store";
import { IMovie, IMovieParams } from "./movie.types";
import { router } from "expo-router";

@Entity.Decorators.Service()
export class MovieService {
  constructor(
    private api: MovieApi,
    private store: MovieStore,
  ) {}

  setFilters(filters: IMovieParams) {
    this.store.set("filters", filters);
  }

  async get() {
    const filters = this.store.getByPath("filters") as unknown as IMovieParams;
    const res = await this.api.getAll(filters);

    const ids = res.data?.map((movie) => {
      this.store.set(`movie.${movie.id}`, movie);
      return movie.id;
    });

    if (ids) {
      this.store.set("movie.ids", ids);
    }
  }

  async getInfo(id: number | string) {
    const res = await this.api.getById(id);
    this.store.set(`movie.${id}`, res.data);
  }

  async add(data: IMovie) {
    await this.api.create(data);
    await this.get();
    router.back();
  }

  async delete(id: number) {
    await this.api.delete(id);
    await this.get();
  }
}
