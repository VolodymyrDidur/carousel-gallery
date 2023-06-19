import { HttpCode, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { HTTPServices } from 'src/common/constants';
import { IJSONDemoApiClient } from 'src/infrastructure/http/json-demo-api/json-demo-api.client';
import { IImage, JSONDemoApiImage, JSONDemoApiPhoto } from './image.domain';

@Injectable()
export class ImagesService {
  constructor(
    @Inject(HTTPServices.JSONDemoApi)
    private jsonDemoApiClient: IJSONDemoApiClient,
  ) {}

  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  @HttpCode(HttpStatus.OK)
  async findAll() {
    const photosRequest = this.jsonDemoApiClient.get<JSONDemoApiPhoto[][]>(
      '/photos',
      HttpStatus.OK,
    );
    const imagesRequest = this.jsonDemoApiClient.get<JSONDemoApiImage[][]>(
      '/images',
      HttpStatus.OK,
    );

    const [photosData = [], imagesData = []] = await Promise.all([
      photosRequest,
      imagesRequest,
    ]);

    const photos: Omit<IImage, 'id'>[] = photosData.flat().map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ id, ...photo }) => photo,
    );

    const images: Omit<IImage, 'id'>[] = imagesData.flat().map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ id, albumId, title, path }) => ({
        albumId,
        title,
        url: path,
      }),
    );

    const result = [...photos, ...images].map((image, index) => ({
      ...image,
      id: index + 1,
    }));

    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
