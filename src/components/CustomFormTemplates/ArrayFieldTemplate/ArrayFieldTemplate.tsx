import React, { Fragment } from 'react';
import './ArrayFieldTemplate.scss';

export default function ArrayFieldTemplate({ items, canAdd, onAddClick }) {
  return (
    <>
      {items &&
        items.map(({ key, children, onDropIndexClick, index }) => (
          <div key={key} className="pb-3 mb-3 box">
            {children}

            <div className="is-flex is-justify-content-flex-end">
              <button onClick={onDropIndexClick(index)} className="button is-danger">
                Удалить
              </button>
            </div>
          </div>
        ))}

      {canAdd && (
        <div className={items && items.length > 0 ? 'border-top' : undefined}>
          <button type="button" className="button is-primary mt-5" onClick={onAddClick}>
            Добавить
          </button>
        </div>
      )}
    </>
  );
}
