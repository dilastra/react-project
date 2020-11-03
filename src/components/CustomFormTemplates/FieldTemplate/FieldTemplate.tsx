import {FieldTemplateProps} from '@rjsf/core';
import React, {Fragment} from 'react';

export default function FieldTemplate(props: FieldTemplateProps): any {
  const {id, label, displayLabel, children} = props;
  return (
    <>
      <div className="field">
        {displayLabel && (
          <label htmlFor={id} className="label">
            {label}
          </label>
        )}
        <div className="control">{children}</div>
      </div>
    </>
  );
}
