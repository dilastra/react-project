import React, { useEffect, useState, Fragment } from 'react';
import Form from '@rjsf/core';
import {
  FieldTemplate,
  Widgets,
  Fields,
  ArrayFieldTemplate,
  ObjectFieldTemplate,
} from '../CustomFormTemplates';
import './FormGenerator.scss';

export default function FormGenerator(props: any): JSX.Element {
  const [formSchema, setFormSchema] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormSchema(props.formSchema);
    setFormData(props.formData);
  }, [props]);

  if (!props.formSchema) {
    return (
      <div className="container">
        <p className="subtitle has-text-centered">
          Заявка обработана и отправлена. Ожидаем ответ от банка.
        </p>
      </div>
    );
  }

  function onSubmit({ formData }) {
    props.onSubmit(formData);
  }

  function onSave(e: any) {
    e.preventDefault();
    props.onSave(formData);
  }

  function onChange({ formData }: any) {
    setFormData(formData);
  }

  return (
    <>
      <div className="mb-3">
        <Form
          schema={{ ...formSchema }}
          widgets={Widgets}
          FieldTemplate={FieldTemplate}
          ArrayFieldTemplate={ArrayFieldTemplate}
          ObjectFieldTemplate={ObjectFieldTemplate}
          fields={Fields}
          formData={formData}
          onChange={onChange}
          onSubmit={onSubmit}
          className="pt-5"
        >
          <div className="button-container mt-2">
            <button className="button mr-4 is-link" onClick={onSave}>
              Сохранить
            </button>
            <button className="button is-info" type="submit">
              Отправить
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
