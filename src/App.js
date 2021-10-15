import { useState, useEffect } from 'react';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import imageApi from './services/imageApi';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/button/Button';
import Modal from './components/Modal';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [tags, setTags] = useState(null);
  const [webformatURL] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus('pending');
    setImages([]);
    setPage(1);
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function fetchImages() {
    imageApi(query, page)
      .then(images => {
        setImages(prevState => [...prevState, ...images]);
        setPage(prevState => prevState + 1);
        if (page > 1) {
          handleScroll();
        }
        setStatus('resolved');
      })
      .catch(error => setStatus('rejected'), setError(error))
      .finally(() => setStatus('resolved'));
  }

  function toggleModal() {
    setShowModal(prevState => !prevState);
  }

  function setModalImg({ largeImageURL, tags }) {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    toggleModal();
  }

  function handleScroll() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  function onSubmit(query) {
    setQuery(query);
    setImages([]);
    setPage(1);
  }

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery
        images={images}
        tags={tags}
        webformatURL={webformatURL}
        largeImageUR={largeImageURL}
        status={status}
        setModalImg={setModalImg}
      />
      {images.length > 0 && <Button onLoadMore={fetchImages} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
      <ToastContainer />
    </>
  );
}
