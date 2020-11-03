import React, {useEffect, useState, Fragment} from 'react';
import Form from '@rjsf/core';
import {FieldTemplate, Widgets} from '../CustomFormTemplates';
import Fields from '../CustomFormTemplates/Fields';

export default function FormGenerator(props: any): JSX.Element {
  const [formSchema, setFormSchema] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormSchema(props.formSchema);
    setFormData(props.formData);
  }, [props]);

  if (!props.formSchema) {
    return <p>Поля отсутствуют</p>;
  }

  const onSubmit: any = ({formData}: any, e: Event) => {
    e.preventDefault();
    props.onSubmit(formData);
  };
  const onSave: any = (e: Event) => {
    e.preventDefault();
    props.onSave(formData);
  };
  const onChange: any = ({formData}: any) => {
    setFormData(formData);
  };

  return (
    <>
      <div className="row">
        <Form
          schema={{...formSchema}}
          widgets={Widgets}
          FieldTemplate={FieldTemplate}
          fields={Fields}
          formData={formData}
          onChange={onChange}
          onSubmit={onSubmit}
        >
          <div>
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
