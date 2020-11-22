import { ArrayFieldTemplateProps } from '@rjsf/core';
import React, { createContext, Fragment, useState } from 'react';
import ArrayFieldTemplateItems from './ArrayFieldTemplateItems';

export const ArrayFieldTemplateContext = createContext({
  addedNewItem: undefined,
});

export function ArrayFieldTemplate(props: ArrayFieldTemplateProps): JSX.Element {
  const { items, canAdd, onAddClick } = props;
  console.log(props);
  const [addedNewItem, setAddedNewItem] = useState<boolean>(false);

  function handleClick(e) {
    e.preventDefault();
    onAddClick(e);
    setAddedNewItem(true);
  }

  return (
    <>
      <ArrayFieldTemplateContext.Provider value={{ addedNewItem }}>
        <ArrayFieldTemplateItems items={items} />
      </ArrayFieldTemplateContext.Provider>
      {canAdd && (
        <div className="is-flex mt-5 is-justify-content-flex-end">
          <button type="button" className="button is-primary" onClick={handleClick}>
            Добавить
          </button>
        </div>
      )}
    </>
  );
}
