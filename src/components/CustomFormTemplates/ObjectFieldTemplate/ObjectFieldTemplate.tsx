import React, { Fragment } from 'react';
import ObjectFieldTemplateProperties from './ObjectFieldTemplateProperties';
import './ObjectFieldTemplate.scss';

export default function ObjectFieldTemplate({
  TitleField,
  title,
  properties,
  schema: { id },
}: any): JSX.Element {
  return (
    <>
      <TitleField title={title} id={id} />
      <ObjectFieldTemplateProperties properties={properties} />
    </>
  );
}
