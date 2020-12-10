import React, { Fragment, useState } from 'react';
import ArrayFieldTemplateItems from './ArrayFieldTemplateItems';

export default function ArrayFieldTemplate({
  items,
  canAdd,
  onAddClick,
  schema: { display },
}: any): JSX.Element {
  const [addedNewItem, setAddedNewItem] = useState<boolean>(false);

  function handleClick(e) {
    e.preventDefault();
    onAddClick(e);
    setAddedNewItem(true);
  }

  return (
    <>
      <ArrayFieldTemplateItems items={items} display={display} addedNewItem={addedNewItem} />
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
