import { Entity } from "@effijs/common";
import { AuthApi } from "./auth.api";
import { AuthStore } from "./auth.store";
import { ILoginCredentials, IRegisterCredentials } from "./auth.types";
import { ServerHttpClient } from "@/services/serverHttpClient";
import { router } from "expo-router";
import AsyncStore from "@/services/PersistentStore";

@Entity.Decorators.Service()
export class AuthService {
  constructor(
    private api: AuthApi,
    private store: AuthStore,
    private asyncStore: AsyncStore,
    private serverHttpClient: ServerHttpClient,
  ) {}

  async checkIsLogin() {
    const token = await this.asyncStore.get("accessToken");
    if (token) {
      this.serverHttpClient.setHeaderAuthorizationToken(token);
      router.replace("/(movie)");
    }
  }

  async login(data: ILoginCredentials) {
    const res = await this.api.login(data);
    await this.setToken(res.token);
    router.replace("/(movie)");
  }

  async signUp(data: IRegisterCredentials) {
    const res = await this.api.createUser(data);
    await this.setToken(res.token);
    router.replace("/(movie)");
  }

  private async setToken(token: string) {
    await this.asyncStore.set("accessToken", token);
    this.serverHttpClient.setHeaderAuthorizationToken(token);
  }

  async signOut() {
    await this.asyncStore.delete("accessToken");
    this.serverHttpClient.removeHeaderAuthorizationToken();
    router.replace("/(auth)");
  }
}
