import React, { Fragment } from 'react';

export default function CheckboxWidget({ id, value, label, onChange }) {
  return (
    <>
      <label htmlFor={id} className="checkbox">
        <input
          id={id}
          className="mr-2"
          type="checkbox"
          onChange={(event) => onChange(event.target.checked)}
          checked={value ? true : false}
        />
        {label}
      </label>
    </>
  );
}
