import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react';

export default function HeaderArrayFieldTemplateItem({
  showForm,
  formData,
  display,
  itemsLength,
  handleClick,
  setModalState,
}) {
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
              <FontAwesomeIcon icon={faChevronDown} />
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
    </>
  );
}
