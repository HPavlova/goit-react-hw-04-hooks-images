import { Component } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import ImageGalleryItem from './ImageGalleryItem';
import Load from './Load';

class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
    setModalImg: PropTypes.func.isRequired,
  };

  render() {
    const { images, status, setModalImg } = this.props;

    if (status === 'idle') {
      return <></>;
    }

    if (status === 'pending') {
      return <Load />;
    }

    if (status === 'rejected') {
      return toast.error('Упс! Что-то пошло не так');
    }

    if (status === 'resolved') {
      return (
        <ul className="ImageGallery">
          {images.map(({ webformatURL, largeImageURL, tags, id }) => (
            <ImageGalleryItem
              key={id}
              tags={tags}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              setModalImg={setModalImg}
            />
          ))}
        </ul>
      );
    }
  }
}

export default ImageGallery;
