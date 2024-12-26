import { HttpRequestBuilder } from "@effijs/common";
import { ServerHttpClient } from "@/services/serverHttpClient";
import { BaseApi, IResponse } from "@/utils/BaseApi";
import { IMovie, IMovieParams } from "./movie.types";

const { RequestBuilder, Get, Post, Delete, Data, Params, UrlParam } =
  HttpRequestBuilder.Decorators;

@RequestBuilder({
  endpoint: "/api/{version}/movies",
  version: "v1",
  apiServiceName: {
    default: "request",
  },
})
export class MovieApi extends BaseApi {
  constructor(fetcher: ServerHttpClient) {
    super(fetcher);
  }

  @Get()
  async getAll(@Params() _params?: IMovieParams) {
    return {} as Promise<IResponse<IMovie[]>>;
  }

  @Get("{id}")
  async getById(@UrlParam("id") _id: number | string) {
    return {} as Promise<IResponse<IMovie>>;
  }

  @Post()
  async create(@Data() _data: IMovie) {
    return {} as Promise<IResponse<IMovie>>;
  }

  @Delete("{id}")
  async delete(@UrlParam("id") _id: number) {}
}
