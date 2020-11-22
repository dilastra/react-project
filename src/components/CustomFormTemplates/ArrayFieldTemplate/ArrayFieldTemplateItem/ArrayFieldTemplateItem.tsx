import React, { createContext, Fragment, useContext, useState } from 'react';
import { ArrayFieldTemplateContext } from '../ArrayFieldTemplate';

export const ArrayFieldTemplateItemContext = createContext<any>({
  setFormData() {},
});

export function ArrayFieldTemplateItem({ children }) {
  const { addedNewItem } = useContext(ArrayFieldTemplateContext);
  const [showForm, setShowForm] = useState<boolean>(addedNewItem || false);

  const [formData, setFormData] = useState([]);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    setShowForm(!showForm);
  }

  return (
    <>
      <div className="is-flex is-justify-content-space-between">
        <div>
          {formData.map(({ value }, index) => {
            return (
              <Fragment key={index}>
                {value && value.length > 0 && <span>{`${value} `}</span>}
              </Fragment>
            );
          })}
        </div>
        <button className={`button is-rounded ${showForm ? 'mb-3' : ''}`} onClick={handleClick}>
          <div className={showForm ? 'rotate-button-icon' : undefined}>
            <i className="fas fa-chevron-down"></i>
          </div>
        </button>
      </div>
      <div className={showForm ? undefined : 'hidden-container'}>
        <ArrayFieldTemplateItemContext.Provider value={{ setFormData }}>
          {children}
        </ArrayFieldTemplateItemContext.Provider>
      </div>
    </>
  );
}
