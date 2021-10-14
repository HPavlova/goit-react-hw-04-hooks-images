import React from 'react';
import PropTypes from 'prop-types';
import styles from '../button/Button.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <button type="button" onClick={onLoadMore} className={styles.button}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
