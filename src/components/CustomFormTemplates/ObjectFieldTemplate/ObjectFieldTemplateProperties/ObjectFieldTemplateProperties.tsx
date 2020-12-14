import React, { Fragment, Children, useContext, useLayoutEffect } from 'react';
import { ArrayFieldTemplateItemContext } from '../../ArrayFieldTemplate';

export default function ObjectFieldTemplateProperties({ properties }: any) {
  const { setFormData, display } = useContext(ArrayFieldTemplateItemContext);

  function getNewState({ title, name, value }: { title: string; name: string; value: string }) {
    return function (prevState: { title: string; name: string; formData: string }[]) {
      const indexObject = prevState.findIndex(({ title: inputTitle }) => {
        return inputTitle === title;
      });

      if (indexObject === -1) {
        return [...prevState, { title, name, value }];
      }

      return prevState.map((objectInputValue: object, index: number) => {
        return index === indexObject ? { title, name, value } : objectInputValue;
      });
    };
  }

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
            return setFormData(getNewState(newObjectInputValue));
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
