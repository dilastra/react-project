import { FieldTemplateProps } from '@rjsf/core';
import React, { Fragment } from 'react';
import './FieldTemplate.scss';

export default function FieldTemplate({
  id,
  label,
  displayLabel,
  children,
}: FieldTemplateProps): JSX.Element {
  return (
    <>
      {displayLabel ? (
        <div className="field">
          <label htmlFor={id} className="is-size-5">
            {label}
          </label>
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
