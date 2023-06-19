import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { IBaseClient } from 'src/common/interfaces/base-client.interface';
import { HTTPClient } from './http.client';

export abstract class BaseClient implements IBaseClient {
  protected readonly logger: Logger;
  private httpClient: HTTPClient;

  protected constructor(private clientName: string, httpClient: HTTPClient) {
    this.logger = new Logger(clientName);
    this.httpClient = httpClient;
  }

  private handleError(error: AxiosError, endpointPath: string): never {
    const message = `Request to ${this.clientName} (${endpointPath}) failed with status code of ${error.response?.status}`;
    this.logger.error(error, message);

    if (error.isAxiosError) {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    throw error;
  }

  async get<ResponseType>(
    endpointPath: string,
    expectedStatus: HttpStatus,
  ): Promise<ResponseType> {
    try {
      const { data }: AxiosResponse = await this.httpClient.get(endpointPath, {
        validateStatus: (status: HttpStatus) => status === expectedStatus,
      });

      return data;
    } catch (error) {
      this.handleError(error, endpointPath);
    }
  }
}
