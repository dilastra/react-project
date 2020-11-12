import { FieldTemplateProps } from '@rjsf/core';
import React, { Fragment } from 'react';
import './FieldTemplate.scss';

export default function FieldTemplate(props: FieldTemplateProps): any {
  const { id, label, displayLabel, children } = props;
  return (
    <>
      <div className={displayLabel ? 'field' : undefined}>
        {displayLabel && (
          <label htmlFor={id} className="is-size-5">
            {label}
          </label>
        )}
        {children}
      </div>
    </>
  );
}
