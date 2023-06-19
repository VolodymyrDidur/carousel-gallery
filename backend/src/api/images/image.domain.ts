export type JSONDemoApiPhoto = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type JSONDemoApiImage = {
  albumId: number;
  id: number;
  title: string;
  path: string;
};

export interface IImage {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl?: string;
}
