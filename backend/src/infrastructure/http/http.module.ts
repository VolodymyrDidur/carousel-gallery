import { Module } from '@nestjs/common';

import { JSONDemoApiClient } from './json-demo-api/json-demo-api.client';
import { HTTPServices } from 'src/common/constants';

const providers = [
  {
    provide: HTTPServices.JSONDemoApi,
    useClass: JSONDemoApiClient,
  },
];

@Module({
  imports: [],
  providers: [...providers],
  exports: [...providers],
})
export class HTTPModule {}
