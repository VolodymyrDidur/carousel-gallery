import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { HTTPModule } from 'src/infrastructure/http';

@Module({
  imports: [HTTPModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
