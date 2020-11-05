import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({
  children,
  isActiveModal,
  actionOnClose,
}: {
  children: JSX.Element;
  isActiveModal: boolean;
  actionOnClose(): void;
}): JSX.Element {
  const modalBlock = document.getElementById('modal');

  function closeModal() {
    actionOnClose();
    document.removeEventListener('keydown', escFunction, false);
  }

  function escFunction(event: { keyCode: number }): void {
    event.keyCode === 27 ? closeModal() : () => {};
  }

  document.addEventListener('keydown', escFunction, false);

  const modalContainer = (
    <>
      <div className={isActiveModal ? 'modal is-active' : 'modal'}>
        <div className="modal-background"></div>
        <div className="box modal-content">{children}</div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={(_) => {
            closeModal();
          }}
        ></button>
      </div>
    </>
  );

  return ReactDOM.createPortal(modalContainer, modalBlock);
}
