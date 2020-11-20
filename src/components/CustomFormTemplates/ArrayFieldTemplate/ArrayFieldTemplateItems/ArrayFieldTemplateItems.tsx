import React, { Fragment } from 'react';
export default function ArrayFieldTemplateItems({ items }): JSX.Element {
  return (
    <>
      {items &&
        items.map(({ key, children, onDropIndexClick, index }) => {
          return (
            <div key={key} className="pb-3 mb-3 box">
              {children}
              {items.length > 1 && (
                <>
                  <div className="is-flex is-justify-content-flex-end">
                    <button onClick={onDropIndexClick(index)} className="button is-danger">
                      Удалить
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
    </>
  );
}
