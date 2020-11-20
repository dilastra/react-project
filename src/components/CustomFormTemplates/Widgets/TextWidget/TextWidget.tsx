import { WidgetProps } from '@rjsf/core';
import React, { Fragment } from 'react';

export default function TextWidget({ id, placeholder, value, onChange }: WidgetProps): any {
  return (
    <>
      <input
        id={id}
        className="input is-medium"
        type="text"
        value={value ? value : ''}
        placeholder={placeholder ? placeholder : ''}
        onChange={(event) => onChange(event.target.value)}
      />
    </>
  );
}
