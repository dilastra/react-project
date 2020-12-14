import React, { useContext, useState, Fragment, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FormGenerator, Loader, PathList } from '../../components';
import { AppContext } from '../../App';
import { request } from '../../functions';
import { toast } from 'react-toastify';

export default function FormPage({ step }: { step: string }): JSX.Element {
  const { token } = useContext(AppContext);
  const { id }: { id: string } = useParams();
  const history = useHistory();
  const [paths, setPaths] = useState<object[]>([]);
  const [{ formSchema, pageStepId, formData }, setFormData] = useState<{
    formSchema: object;
    pageStepId: string;
    formData: object;
  }>({
    formSchema: {},
    pageStepId: '',
    formData: {},
  });
  const [hideLoader, setHideLoader] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    const urlPath =
      step === 'first-step' ? `/api/v1/products/path/${id}` : `/api/v1/applications/${id}`;

    const urlFormData =
      step === 'first-step'
        ? `/api/v1/products/first-step/${id}`
        : `/api/v1/applications/current-step/${id}`;

    Promise.all([
      request(urlPath, 'GET', {
        Authorization: `Bearer ${token}`,
      }).then(
        ({ path: paths, applicationPaths }: { path: object[]; applicationPaths: object[] }) => {
          setPaths(step === 'first-step' ? paths : applicationPaths);
        }
      ),

      request(urlFormData, 'GET', {
        Authorization: `Bearer ${token}`,
      }).then(
        ({
          formSchema,
          pageStepId,
          formData,
        }: {
          formSchema: object;
          pageStepId: string;
          formData: object;
        }) => {
          setFormData({ formSchema, pageStepId, formData });
        }
      ),
    ]).finally(() => setHideLoader(true));

    return (mounted = false);
  }, []);

  function onClickButton(formData: object, urlFetch: string, urlRedirect: string): Promise<any> {
    return request(
      urlFetch,
      'POST',
      {
        Authorization: `Bearer ${token}`,
      },
      { pageStepId, productId: id, formData }
    ).then(({ formData }) => {
      setFormData({ formSchema, pageStepId, formData });
      return history.push(`${urlRedirect}/${id}`);
    });
  }

  function onSave(formData: object): void {
    onClickButton(
      formData,
      `/api/v1/applications/save${step === 'first-step' ? '' : `/${id}`}`,
      `/application/edit-form`
    ).finally(() => toast.info('Заявка успешно сохранена'));

    return;
  }

  function onSubmit(formData: object): void {
    onClickButton(
      formData,
      `/api/v1/applications/send${step === 'first-step' ? '' : `/${id}`}`,
      '/applications'
    ).finally(() => {
      toast.info('Заявка успешно отправлена');
    });
    return;
  }

  return hideLoader ? (
    <>
      <div className="container px-6">
        <h1 className="title has-text-centered my-5">
          {step === 'first-step' ? 'Создание заявки' : 'Редактирование заявки'}
        </h1>
        <PathList paths={paths} />
        <FormGenerator
          formSchema={formSchema}
          formData={formData}
          onSave={onSave}
          onSubmit={onSubmit}
        />
      </div>
    </>
  ) : (
    <>
      <Loader />
    </>
  );
}
