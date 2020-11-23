import React, { Fragment, Children, useContext, useLayoutEffect } from 'react';
import { ArrayFieldTemplateItemContext } from '../../ArrayFieldTemplate';

export default function ObjectFieldTemplateProperties({ properties }) {
  const { setFormData, display } = useContext(ArrayFieldTemplateItemContext);

  useLayoutEffect(() => {
    properties.map(({ content }: { content: JSX.Element }) => {
      Children.map(content, ({ props: { formData, schema } }) => {
        if (schema.type === 'string' && display.indexOf(schema.name) !== -1) {
          return setFormData((prevState) => {
            if (prevState.length > 0) {
              const indexObject = prevState.findIndex((value) => {
                if (value.title === schema.title) {
                  return true;
                }

                return false;
              });

              if (indexObject === -1) {
                return [...prevState, { title: schema.title, name: schema.name, value: formData }];
              } else {
                return prevState.map((value, index) => {
                  if (index === indexObject) {
                    return { title: schema.title, name: schema.name, value: formData };
                  }
                  return value;
                });
              }

              return prevState;
            } else {
              return [{ title: schema.title, name: schema.name, value: formData }];
            }
          });
        }
      });
    });
  }, [properties]);

  return properties.map(({ content }: { content: JSX.Element }) => {
    const [typeContent] = Children.map(content, ({ props }) => {
      return props.schema.type;
    });

    return (
      <Fragment key={content.key}>
        {typeContent !== 'string' ? (
          <div key={content.key} className={'box mb-5'}>
            <>{content}</>
          </div>
        ) : (
          <>{content}</>
        )}
      </Fragment>
    );
  });
}
