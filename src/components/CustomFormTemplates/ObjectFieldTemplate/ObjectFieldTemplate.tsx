import React, { Fragment, Children, useState } from 'react';
import './ObjectFieldTemplate.scss';

export default function ObjectFieldTemplate(props) {
  const {
    TitleField,
    title,
    properties,
    schema: { id },
  } = props;
  console.log(props);
  const [dropDown, setDropDown] = useState(true);

  function displayInputValue(arrayObjects: any) {
    return arrayObjects.map(({ formData, properties }) => {
      let inputValues = [];
      for (let propertie in properties) {
        inputValues.push({
          name: properties[propertie].title,
          value:
            Object.keys(formData).length && formData[propertie]?.length > 0
              ? formData[propertie]
              : 'Введите данные',
        });
      }
      return inputValues;
    });
  }

  return (
    <>
      {!id && <TitleField title={title} id={id} />}
      {properties.map(({ content }) => {
        const info = Children.map(content, ({ props }) => {
          if (props.schema.type === 'object') {
            const {
              formData,
              schema: { properties },
            } = props;
            return { formData, properties };
          }
        });
        return (
          <div key={content.key} className="mb-5 box">
            {content.props.schema.type !== 'boolean' && (
              <div className="is-flex is-justify-content-space-between is-align-items-center">
                <table className={`table ${!dropDown ? `mb-0` : ``}`}>
                  <tbody>
                    {info.length > 0 &&
                      displayInputValue(info).map(
                        (objectInputValue: { name: string; value: string }[]) => {
                          return objectInputValue.map(({ name, value }) => {
                            return (
                              <tr>
                                <td className="is-selected">
                                  {name}: {value}
                                </td>
                              </tr>
                            );
                          });
                        }
                      )}
                  </tbody>
                </table>
                {info.length > 0 && (
                  <button
                    className="button is-rounded"
                    onClick={(e) => {
                      e.preventDefault();
                      setDropDown(!dropDown);
                    }}
                  >
                    <span className={`icon is-small ${dropDown ? `rotate-button-icon` : ``}`}>
                      <i className="fas fa-angle-up"></i>
                    </span>
                  </button>
                )}
              </div>
            )}
            {content.props.schema.type === 'boolean' ? (
              <>{content}</>
            ) : dropDown ? null : (
              <div>{content}</div>
            )}
          </div>
        );
      })}
    </>
  );
}
