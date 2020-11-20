import React, { Fragment, useState } from 'react';
import './ObjectFieldTemplate.scss';
import ObjectFieldTemplateProperties from './ObjectFieldTemplateProperties';

export default function ObjectFieldTemplate({
  TitleField,
  title,
  properties,
  schema: { section, id },
}) {
  return (
    <>
      <TitleField title={title} id={id} />
      <ObjectFieldTemplateProperties properties={properties} />
    </>
  );
}
