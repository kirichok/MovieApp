import { HttpClient } from "@effijs/axios";
import { ApiError, FormatError } from "@/utils/ApiError";

export interface IResponse<T> {
  status: 0 | 1;
  error?: {
    code: string;
    fields: Record<string, string>;
  };
  data?: T;
  meta?: {
    total: number;
  };
}

export abstract class BaseApi {
  static SUCCESS_STATUS = 1;

  protected constructor(protected fetcher: HttpClient) {}

  request = async (options: any): Promise<any> => {
    const response = (await this.fetcher.request(
      options,
    )) as unknown as IResponse<any>;

    if (response.status !== BaseApi.SUCCESS_STATUS) {
      console.log(response);
      this.handleError(response.error || { code: "unknown" });
    }

    return response;
  };

  private handleError(error: {
    code: string;
    fields?: Record<string, string>;
  }): void {
    if (error.fields) {
      throw new FormatError(error.code, error.fields);
    }
    throw new ApiError(error.code);
  }
}
