import { HttpRequestBuilder } from "@effijs/common";
import { ServerHttpClient } from "@/services/serverHttpClient";
import {
  ILoginCredentials,
  IRegisterCredentials,
} from "@/modules/Auth/auth.types";
import { BaseApi } from "@/utils/BaseApi";

const { RequestBuilder, Post, Data } = HttpRequestBuilder.Decorators;

@RequestBuilder({
  endpoint: "/api/{version}",
  version: "v1",
  apiServiceName: {
    default: "request",
  },
})
export class AuthApi extends BaseApi {
  constructor(fetcher: ServerHttpClient) {
    super(fetcher);
  }

  @Post("users")
  async createUser(@Data() _data: IRegisterCredentials) {
    return {} as Promise<{ token: string }>;
  }

  @Post("sessions")
  async login(@Data() _data: ILoginCredentials) {
    return {} as Promise<{ token: string }>;
  }
}
