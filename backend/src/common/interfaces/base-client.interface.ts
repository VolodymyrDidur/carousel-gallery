import { HttpStatus } from '@nestjs/common';

export interface IBaseClient {
  get<ResponseType>(
    endpointPath: string,
    expectedStatus: HttpStatus,
  ): Promise<ResponseType>;
}
