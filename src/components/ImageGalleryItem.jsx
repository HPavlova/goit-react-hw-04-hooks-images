import React from 'react';
import propTypes from 'prop-types';

const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  setModalImg,
}) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={() => setModalImg({ largeImageURL, tags })}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  setModalImg: propTypes.func.isRequired,
  tags: propTypes.string.isRequired,
  webformatURL: propTypes.string.isRequired,
  largeImageURL: propTypes.string.isRequired,
};

export default ImageGalleryItem;
