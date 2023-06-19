import { Injectable } from '@nestjs/common';

import { BaseClient } from '../base.client';
import { IBaseClient } from 'src/common/interfaces/base-client.interface';
import { HTTPClient } from '../http.client';

export type IJSONDemoApiClient = IBaseClient;

@Injectable()
export class JSONDemoApiClient
  extends BaseClient
  implements IJSONDemoApiClient
{
  constructor() {
    super(
      JSONDemoApiClient.name,
      new HTTPClient({
        baseURL:
          'https://my-json-server.typicode.com/icedrone/json-demo-server',
      }),
    );
  }
}
