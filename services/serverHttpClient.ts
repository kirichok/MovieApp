import { HttpClient, Decorators } from "@effijs/axios";

@Decorators.HttpConfig({
  baseURL: process.env.EXPO_PUBLIC_API_URL as string,
})
export class ServerHttpClient extends HttpClient {}
