import { Entity } from "@effijs/common";
import { AuthController } from "./auth.controller";
import { AuthStore } from "./auth.store";

@Entity.Decorators.Module()
export class AuthModule {
  constructor(
    public controller: AuthController,
    public store: AuthStore,
  ) {}
}
