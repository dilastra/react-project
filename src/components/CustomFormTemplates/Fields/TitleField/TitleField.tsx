import { FieldProps } from '@rjsf/core';
import React, { Fragment } from 'react';

export default function TitleField({ title, id }: FieldProps) {
  return (
    <>
      <h5 className={id === 'root__title' ? 'title mb-3' : 'subtitle mt-1 is-size-4 mb-3 '}>
        {title}
      </h5>
    </>
  );
}
