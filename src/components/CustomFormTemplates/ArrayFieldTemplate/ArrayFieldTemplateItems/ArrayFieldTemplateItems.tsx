import React, { Fragment } from 'react';
import { ArrayFieldTemplateItem } from '../ArrayFieldTemplateItem';
import './ArrayFieldTemplateItems.scss';

export default function ArrayFieldTemplateItems({ items, display, addedNewItem }): JSX.Element {
  return (
    <>
      {items &&
        items.map(({ key, children, onDropIndexClick, index }) => {
          return (
            <div key={key} className="pb-3 mb-3 box">
              <ArrayFieldTemplateItem
                itemsLength={items.length}
                index={index}
                onDropIndexClick={onDropIndexClick}
                display={display}
                addedNewItem={addedNewItem}
              >
                {children}
              </ArrayFieldTemplateItem>
            </div>
          );
        })}
    </>
  );
}
