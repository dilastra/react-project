import React, { Fragment, Children } from 'react';

export default function ObjectFieldTemplateProperties({ properties }) {
  return properties.map((props) => {
    const [typeContent] = Children.map(props.content, ({ props: { schema } }) => {
      return schema.type;
    });

    {
      return typeContent !== 'string' ? (
        <div key={props.content.key} className={'box mb-5'}>
          <>{props.content}</>
        </div>
      ) : (
        <Fragment key={props.content.key}>{props.content}</Fragment>
      );
    }
  });
}
