import { IImage } from '../App/types';

export interface IImageGalleryProps {
  images: IImage[];
  onImageClick: (imageUrl: string) => void;
}
