import { Component } from 'react';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/button/Button';
import Modal from './components/Modal';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    tags: null,
    webformatURL: null,
    largeImageURL: null,
    error: null,
    showModal: false,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState);
    const prevName = prevState.query;
    const nextName = this.state.query;

    if (prevName !== nextName) {
      this.setState({ status: 'pending', images: [], page: 1 });

      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { query, page } = this.state;
    const API_KEY = '22966044-c718c1bbe050e09f7279dea2f';

    fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then(response => {
        if (response.ok) {
          // console.log(images.length);

          // if (images.length === 0) {
          //   return toast.error(`Нет изображения с названием ${query}`);
          // }

          return response.json();
        }
        return Promise.reject(this.setState({ status: 'rejected' }));
      })
      .then(array => {
        this.setState(prevState => ({
          images: [...prevState.images, ...array.hits],
          page: prevState.page + 1,
          status: 'resolved',
        }));

        if (page > 1) {
          this.handleScroll();
        }
      })
      .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(() => this.setState({ status: 'resolved' }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  setModalImg = ({ largeImageURL, tags }) => {
    this.setState({ largeImageURL, tags });
    this.toggleModal();
  };

  handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  onSubmit = query => {
    this.setState({ query: query, page: 1 });
  };

  render() {
    const { images, status, showModal, tags, webformatURL, largeImageURL } =
      this.state;

    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          images={images}
          tags={tags}
          webformatURL={webformatURL}
          largeImageUR={largeImageURL}
          status={status}
          setModalImg={this.setModalImg}
        />
        {images.length > 0 && <Button onLoadMore={this.fetchImages} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
        <ToastContainer />
      </>
    );
  }
}

export default App;
