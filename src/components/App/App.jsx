import { useEffect, useState } from 'react';
import { Box } from './App.styled';
import { Searchbar } from '../Searchbar';
import { ImageGallery } from '../ImageGallery';
import { Button } from '../Button';
import { Loader } from 'components/Loader';
import { Modal } from '../Modal';
import * as API from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currImg, setCurrImg] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function fetchImages() {
      try {
        setIsLoading(true);

        const images = await API.getImages(query, page);

        if (images.totalHits > API.perPage) {
          setShowLoadMore(true);
        }

        if (page + 1 > Math.ceil(images.totalHits / API.perPage)) {
          setIsLoading(false);
          setShowLoadMore(false);
        }

        if (images.total === 0) {
          toast.warn('Your search did not return any results.', {
            theme: 'dark',
          });
          setIsLoading(false);
          return;
        }

        setImages(state => [...state, ...images.hits]);
        setIsLoading(false);
      } catch (error) {
        toast.error(`Oops something went wrong, try again.`);
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [page, query]);

  const handleFormSubmit = async keyword => {
    setPage(1);
    setQuery(keyword);
    setImages([]);

    if (query === keyword && page === 1) {
      try {
        setIsLoading(true);

        const images = await API.getImages(query, page);

        setImages([images.hits]);
        setIsLoading(false);
      } catch (error) {
        toast.error(`Oops something went wrong, try again.`);
        setIsLoading(false);
      }
    }
  };

  const loadMore = () => setPage(state => state + 1);

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const handleImgClick = (largeImageURL, tags) => {
    toggleModal();
    setCurrImg({ largeImageURL, tags });
  };

  return (
    <Box>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onClick={handleImgClick} />
      {showLoadMore && <Button onLoadMore={loadMore} />}
      <Loader isLoading={isLoading} />
      {showModal && (
        <Modal
          onClose={toggleModal}
          link={currImg.largeImageURL}
          tags={currImg.tags}
        />
      )}
      <ToastContainer />
    </Box>
  );
}
