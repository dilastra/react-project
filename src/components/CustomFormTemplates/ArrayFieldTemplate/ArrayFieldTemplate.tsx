import React, { Fragment } from 'react';
import './ArrayFieldTemplate.scss';

export default function ArrayFieldTemplate(props) {
  const {
    items,
    canAdd,
    onAddClick,
    schema: { dropDown },
  } = props;

  return (
    <>
      {items &&
        items.map(({ key, children, onDropIndexClick, index }) => {
          return (
            <div key={key} className="pb-3 mb-3 box">
              {children}

              <div className="is-flex is-justify-content-flex-end">
                <button onClick={onDropIndexClick(index)} className="button is-danger">
                  Удалить
                </button>
              </div>
            </div>
          );
        })}

      {canAdd && (
        <button type="button" className="button is-primary mt-5" onClick={onAddClick}>
          Добавить
        </button>
      )}
    </>
  );
}
