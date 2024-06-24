import { IImage } from '../App/types';

export interface IImageCardProps {
  image: IImage;
  onImageClick: (imageUrl: string) => void;
}
