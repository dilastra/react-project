import React, { createContext, Fragment, useContext, useState } from 'react';
import { Modal } from '../../../Modal';
import { ArrayFieldTemplateContext } from '../ArrayFieldTemplate';

export const ArrayFieldTemplateItemContext = createContext<any>({
  setFormData() {},
  display: [],
});

export function ArrayFieldTemplateItem({ children, itemsLength, index, onDropIndexClick }) {
  const { addedNewItem, display } = useContext(ArrayFieldTemplateContext);
  const [showForm, setShowForm] = useState<boolean>(addedNewItem || false);
  const [modalState, setModalState] = useState<boolean>(false);
  const [formData, setFormData] = useState([]);
  function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    setShowForm(!showForm);
  }
  return (
    <>
      <div className={`is-flex is-justify-content-space-between ${showForm ? 'mb-3' : ''}`}>
        <div className="is-flex is-align-items-center">
          {formData
            .sort((a, b) => {
              return display.indexOf(a.name) - display.indexOf(b.name);
            })
            .map(({ value }, index) => {
              return (
                <Fragment key={index}>
                  {value && value.length > 0 && <span className="mr-1">{`${value}`}</span>}
                </Fragment>
              );
            })}
        </div>
        <div className={itemsLength > 0 ? 'is-flex is-align-items-center' : undefined}>
          <button className={'button is-rounded'} onClick={handleClick}>
            <div className={showForm ? 'rotate-button-icon' : undefined}>
              <i className="fas fa-chevron-down"></i>
            </div>
          </button>
          {itemsLength > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setModalState(true);
                }}
                className="has-background-danger delete is-large ml-3"
              ></button>
            </>
          )}
        </div>
      </div>
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
                onClick={(event) => {
                  event.preventDefault();
                  onDropIndexClick(event, index);
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
