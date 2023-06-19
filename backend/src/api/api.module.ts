import { Module } from '@nestjs/common';
import { APP_FILTER, RouterModule } from '@nestjs/core';
import { ImagesModule } from './images';
import { AllExceptionsFilter } from 'src/common/exceptions/filters';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'images',
        module: ImagesModule,
      },
    ]),
    ImagesModule,
  ],
  exports: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class ApiModule {}
