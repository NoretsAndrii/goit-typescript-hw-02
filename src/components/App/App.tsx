import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ScrollToTop from 'react-scroll-to-top';
import { SlArrowUp } from 'react-icons/sl';

import { fetchImages } from '../../api';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import NotResultMessage from '../NotResultMessage/NotResultMessage';
import { IFetchImagesResponse, IImage } from './types';

function App() {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<IImage[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [notResult, setNotResult] = useState<boolean>(false);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string>('');

  const notify = () => {
    setError(false);
    setNotResult(false);
    toast.error('Enter text to search!!!');
  };

  function openModal(imageUrl: string): void {
    setModalImage(imageUrl);
    setModalIsOpen(true);
  }

  useEffect(() => {
    if (query.trim() === '') return;
    async function getImages(query: string, page: number): Promise<void> {
      try {
        setError(false);
        setNotResult(false);
        setLoading(true);
        const data = await fetchImages<IFetchImagesResponse>(query, page);
        if (data.results.length === 0) return setNotResult(true);
        setImages(prevImages => {
          return [...prevImages, ...data.results];
        });
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(true);
        setQuery('');
      } finally {
        setLoading(false);
      }
    }
    getImages(query, page);
  }, [query, page]);

  const handleSearch = (query: string): void => {
    setImages([]);
    setPage(1);
    setQuery(query);
  };

  const onLoadMore = (): void => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} notify={notify} />
      <Toaster
        containerStyle={{
          top: 100,
        }}
      />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {notResult && <NotResultMessage />}
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {images.length > 0 && page < totalPages && (
        <LoadMoreBtn onClick={onLoadMore} />
      )}
      {images.length > 0 && (
        <ImageModal
          isOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          modalImage={modalImage}
        />
      )}
      <ScrollToTop
        smooth
        component={<SlArrowUp />}
        style={{
          backgroundColor: 'rgba(0, 0, 255,0.75)',
          color: 'white',
        }}
      />
    </>
  );
}

export default App;
