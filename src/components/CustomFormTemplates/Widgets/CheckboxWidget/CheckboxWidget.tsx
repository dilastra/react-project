import React, { Fragment } from 'react';

export default function CheckboxWidget({ id, value, label, onChange }) {
  return (
    <>
      <label htmlFor={id} className="checkbox">
        <input
          id={id}
          className="mr-2"
          type="checkbox"
          value={value}
          onChange={(event) => onChange(event.target.checked)}
          checked={typeof value === 'undefined' ? false : JSON.parse(value)}
        />
        {label}
      </label>
    </>
  );
}
