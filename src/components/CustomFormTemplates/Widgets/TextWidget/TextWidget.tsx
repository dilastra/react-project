import {WidgetProps} from '@rjsf/core';
import React, {Fragment} from 'react';

export default function TextWidget({id, placeholder, value, onChange}: WidgetProps): any {
  return (
    <>
      <input
        id={id}
        className="input is-medium"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={event => onChange(event.target.value)}
      />
    </>
  );
}

// autofocus: false
// disabled: false
// formContext: {}
// id: "root_client_companyName"
// label: "Наименование"
// onBlur: ƒ ()
// onChange: ƒ (value, errorSchema)
// onFocus: ƒ ()
// options: {enumOptions: false}
// placeholder: ""
// rawErrors: undefined
// readonly: false
// registry: {fields: {…}, widgets: {…}, ArrayFieldTemplate: undefined, ObjectFieldTemplate: undefined, FieldTemplate: undefined, …}
// required: false
// schema: {id: 2, name: "companyName", title: "Наименование", type: "string"}
// uiSchema: {classNames: undefined}
// value: undefined
