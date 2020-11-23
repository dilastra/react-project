import React, { Fragment, Children, useContext, useLayoutEffect } from 'react';
import { ArrayFieldTemplateItemContext } from '../../ArrayFieldTemplate';

export default function ObjectFieldTemplateProperties({ properties }) {
  const { setFormData, display } = useContext(ArrayFieldTemplateItemContext);

  useLayoutEffect(() => {
    properties.map(({ content }: { content: JSX.Element }) => {
      Children.map(
        content,
        ({
          props: {
            formData,
            schema: { title, name, type },
          },
        }) => {
          if (type === 'string' && display.indexOf(name) !== -1) {
            const newObjectInputValue = { title, name, value: formData };

            return setFormData((prevState: { title: string; name: string; formData: string }[]) => {
              const indexObject = prevState.findIndex(({ title: inputTitle }) => {
                return inputTitle === title;
              });

              if (indexObject === -1) {
                return [...prevState, newObjectInputValue];
              }

              return prevState.map((objectInputValue: object, index: number) => {
                return index === indexObject ? newObjectInputValue : objectInputValue;
              });
            });
          }
        }
      );
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
