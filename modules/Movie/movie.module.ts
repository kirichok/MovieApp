import { Entity } from "@effijs/common";
import { MovieController } from "./movie.controller";
import { MovieStore } from "./movie.store";

@Entity.Decorators.Module()
export class MovieModule {
  constructor(
    public controller: MovieController,
    public store: MovieStore,
  ) {}
}
