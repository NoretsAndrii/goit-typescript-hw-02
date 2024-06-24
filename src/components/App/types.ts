export interface IImage {
  id: string;
  likes: number;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  user: { name: string };
}

export interface IFetchImagesResponse {
  results: IImage[];
  total_pages: number;
}
