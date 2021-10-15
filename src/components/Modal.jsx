import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal(props) {
  // console.log(props);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        props.onClose();
      }
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [props]);

  function handleOverlayClick(e) {
    if (e.currentTarget === e.target) {
      props.onClose();
    }
  }

  return createPortal(
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">{props.children}</div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
