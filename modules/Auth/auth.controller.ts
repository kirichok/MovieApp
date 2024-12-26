import { AuthService } from "./auth.service";
import { Entity, Store } from "@effijs/common";
import * as SplashScreen from "expo-splash-screen";
import { CatchError } from "@/utils/CatchError";

@Entity.Decorators.Controller()
export class AuthController {
  constructor(private service: AuthService) {}

  @CatchError
  async isUserLoggedIn() {
    await this.service.checkIsLogin();
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 200);
  }

  @CatchError
  async login(formStore: Store.Form) {
    const { error, data } = formStore.validate();
    if (error) {
      return;
    }
    await this.service.login(data);
  }

  @CatchError
  async signUp(formStore: Store.Form) {
    const { error, data } = formStore.validate();
    if (error) {
      return;
    }
    await this.service.signUp(data);
  }

  @CatchError
  async signOut() {
    await this.service.signOut();
  }
}
