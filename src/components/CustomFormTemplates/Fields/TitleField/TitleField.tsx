import { FieldProps } from '@rjsf/core';
import React, { Fragment } from 'react';

export default function TitleField({ title, id }: FieldProps): JSX.Element {
  return (
    <>
      {title && (
        <h5 className={id ? 'subtitle is-size-4 mb-3 ' : 'title mb-4 has-text-centered'}>
          {title}
        </h5>
      )}
    </>
  );
}
