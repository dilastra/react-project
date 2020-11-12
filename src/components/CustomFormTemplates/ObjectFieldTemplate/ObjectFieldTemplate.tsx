import React, { Fragment } from 'react';

export default function ObjectFieldTemplate(props) {
  const {
    TitleField,
    title,
    properties,
    schema: { id },
  } = props;
  return (
    <>
      <TitleField title={title} id={id} />
      {properties.map(({ content }) => {
        return (
          <div key={content.key} className="mb-5 box">
            {content}
          </div>
        );
      })}
    </>
  );
}
