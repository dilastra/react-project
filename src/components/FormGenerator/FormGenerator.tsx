import React, { useEffect, useState, Fragment } from 'react';
import Form from '@rjsf/core';
import { FieldTemplate, Widgets, Fields } from '../CustomFormTemplates';
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

  const onSubmit: any = ({ formData }: any, e: Event) => {
    e.preventDefault();
    props.onSubmit(formData);
  };
  const onSave: any = (e: Event) => {
    e.preventDefault();
    props.onSave(formData);
  };
  const onChange: any = ({ formData }: any) => {
    setFormData(formData);
  };

  return (
    <>
      <div className="mb-3">
        <Form
          schema={{ ...formSchema }}
          widgets={Widgets}
          FieldTemplate={FieldTemplate}
          fields={Fields}
          formData={formData}
          onChange={onChange}
          onSubmit={onSubmit}
        >
          <div className="button-container">
            <button className="button mr-4 is-primary" onClick={onSave}>
              Сохранить
            </button>
            <button className="button is-primary" type="submit">
              Отправить
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
