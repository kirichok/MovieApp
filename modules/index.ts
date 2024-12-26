import { EffiJS, Entity } from "@effijs/common";
import { AuthModule } from "./Auth/auth.module";
import { MovieModule } from "./Movie/movie.module";

@Entity.Decorators.Module()
export class Modules {
  constructor(
    public authModule: AuthModule,
    public movieModule: MovieModule,
  ) {}
}

const modules = EffiJS.create(Modules);
