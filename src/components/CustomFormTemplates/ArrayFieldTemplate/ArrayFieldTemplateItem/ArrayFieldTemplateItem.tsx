import React, { createContext, Fragment, useState } from 'react';
import { Modal } from '../../..';

import HeaderArrayFieldTemplateItem from './HeaderArrayFieldTemplateItem';

export const ArrayFieldTemplateItemContext = createContext<any>({
  setFormData() {},
  display: [],
});

export function ArrayFieldTemplateItem({
  children,
  itemsLength,
  index,
  onDropIndexClick,
  addedNewItem,
  display,
}): JSX.Element {
  const [showForm, setShowForm] = useState<boolean>(addedNewItem || false);
  const [modalState, setModalState] = useState<boolean>(false);
  const [formData, setFormData] = useState([]);
  function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    setShowForm(!showForm);
  }
  return (
    <>
      <HeaderArrayFieldTemplateItem
        showForm={showForm}
        formData={formData}
        display={display}
        itemsLength={itemsLength}
        handleClick={handleClick}
        setModalState={setModalState}
      />

      <div className={showForm ? undefined : 'hidden-container'}>
        <ArrayFieldTemplateItemContext.Provider value={{ setFormData, display }}>
          {children}
        </ArrayFieldTemplateItemContext.Provider>
      </div>

      {modalState && (
        <Modal
          titleModal="Вы точно хотите удалить данный элемент?"
          isActiveModal={modalState}
          actionOnClose={() => setModalState(!modalState)}
          isConfirm={true}
        >
          <>
            <div className="is-flex is-justify-content-center">
              <button
                className="button is-primary is-outlined mr-6"
                onClick={(e) => {
                  e.preventDefault();
                  setModalState(!modalState);
                }}
              >
                Отмена
              </button>
              <button
                className="button is-primary"
                onClick={(e) => {
                  e.preventDefault();
                  onDropIndexClick(index)(e);
                  setModalState(!modalState);
                }}
              >
                Удалить
              </button>
            </div>
          </>
        </Modal>
      )}
    </>
  );
}
