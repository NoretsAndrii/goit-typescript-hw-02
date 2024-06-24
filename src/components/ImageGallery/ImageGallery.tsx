import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import { IImageGalleryProps } from './types';

const ImageGallery: React.FC<IImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <ul className={css.gallery}>
      {images.map(image => {
        return (
          <li className={css.item} key={image.id}>
            <ImageCard image={image} onImageClick={onImageClick} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
