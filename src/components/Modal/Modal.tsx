import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({
  children,
  titleModal,
  isActiveModal,
  actionOnClose,
}: {
  children: JSX.Element;
  titleModal: string;
  isActiveModal: boolean;
  actionOnClose(): void;
}): JSX.Element {
  const modalBlock = document.getElementById('modal');
  document.addEventListener('keydown', escFunction, false);

  function escFunction(event: { keyCode: number }): void {
    event.keyCode === 27 ? closeModal() : () => {};
  }

  function closeModal() {
    actionOnClose();
    document.removeEventListener('keydown', escFunction, false);
  }

  const modalContainer = (
    <>
      <div className={isActiveModal ? 'modal is-active' : 'modal'}>
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{titleModal}</p>
            <button className="delete" aria-label="close" onClick={closeModal}></button>
          </header>
          <div className="modal-card-body">{children}</div>
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(modalContainer, modalBlock);
}
