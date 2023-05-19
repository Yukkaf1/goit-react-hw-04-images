import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow, Img } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ link, tags, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <Img src={link} alt={tags} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  link: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
