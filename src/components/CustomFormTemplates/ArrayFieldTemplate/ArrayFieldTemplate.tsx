import React, { Fragment, useEffect, useState } from 'react';
import './ArrayFieldTemplate.scss';
import ArrayFieldTemplateItems from './ArrayFieldTemplateItems';

export default function ArrayFieldTemplate(props) {
  const {
    items,
    canAdd,
    onAddClick,
    formData,
    schema: {
      items: { properties },
    },
  } = props;
  const [showItems, setShowItems] = useState<boolean>(false);
  const [multiObjectsValues, setMultiObjectsValues] = useState([]);

  useEffect(() => {
    createValuesObject([...formData], properties);
  }, [formData, properties]);

  function sortInputValuesFormData(objectsValues) {
    for (let key in objectsValues) {
      if (
        objectsValues[key] &&
        Object.keys(objectsValues[key]).length > 0 &&
        typeof objectsValues[key] === 'object'
      ) {
        sortInputValuesFormData(objectsValues[key]);
      }

      if (typeof objectsValues[key] === 'string' && objectsValues[key].length === 0) {
        delete objectsValues[key];
      }
    }

    return objectsValues;
  }

  function sortPropertiesName(properties) {
    const arrPropertiesName = [];

    recursiveGetNameProp(properties);

    function recursiveGetNameProp(properties) {
      for (let key in properties) {
        if (typeof properties[key] === 'object') {
          recursiveGetNameProp(properties[key]);
        }
        if ('name' in properties && 'title' in properties) {
          arrPropertiesName.push({ name: properties.name, title: properties.title });
        }
      }
    }

    return [...new Map(arrPropertiesName.map((item) => [item['name'], item])).values()];
  }

  function createValuesObject(formData: any[], properties: object) {
    const sortInputValues = formData.map((objectsValues) => {
      return sortInputValuesFormData(objectsValues);
    });
    const arrayNameProperties = sortPropertiesName(properties);

    const objectInfoOfValues = sortInputValues.map((value) => {
      const cloneObject = {};
      function recursive(value) {
        for (let key in value) {
          for (let { name, title } of arrayNameProperties) {
            if (key === name) {
              if (typeof value[key] === 'object') {
                recursive(value[key]);
              }
              cloneObject[title] = value[key];
            }
          }
        }
      }
      if (typeof value === 'object') {
        recursive(value);
      }
      return cloneObject;
    });

    setMultiObjectsValues(
      objectInfoOfValues.map((value) => {
        for (let key in value) {
          if (typeof value[key] === 'object') {
            delete value[key];
          }
        }

        return value;
      })
    );
  }

  function handleClick(e) {
    e.preventDefault();
    setShowItems(!showItems);
  }

  function handleAddClick(e) {
    e.preventDefault();
    onAddClick();
    setShowItems(true);
  }

  return (
    <>
      <div className="is-flex is-justify-content-space-between">
        {multiObjectsValues.length > 0 && (
          <div className="box">
            {multiObjectsValues.map((value, index) => {
              return (
                <Fragment key={index}>
                  {Object.entries(value).map(([name, title], index) => {
                    return (
                      <Fragment key={index}>
                        <div className="mb-4 content is-medium">
                          <span>{name}</span>
                          <span> : {title}</span>
                        </div>
                      </Fragment>
                    );
                  })}
                </Fragment>
              );
            })}
          </div>
        )}
        <button className="button is-rounded" onClick={handleClick}>
          <div className={`${showItems ? `rotate-button-icon` : ``}`}>
            <i className={'fas fa-chevron-down'}></i>
          </div>
        </button>
      </div>
      <div className={showItems ? '' : 'hidden-container'}>
        <ArrayFieldTemplateItems items={items} />
      </div>
      {canAdd && (
        <div className="is-flex mt-5 is-justify-content-flex-end">
          <button type="button" className="button is-primary" onClick={handleAddClick}>
            Добавить
          </button>
        </div>
      )}
    </>
  );
}
