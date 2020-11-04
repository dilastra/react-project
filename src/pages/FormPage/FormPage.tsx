import React, { useContext, useState, Fragment, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FormGenerator, Loader, PathList } from '../../components';
import { AppContext } from '../../App';
import { request } from '../../functions';

export default function FormPage({ step }: { step: string }): JSX.Element {
  const { token } = useContext(AppContext);
  const { id }: { id: string } = useParams();
  const history = useHistory();
  const [paths, setPaths] = useState<object[]>([]);
  const [{ formSchema, pageStepId, formData }, setFormData] = useState<{
    formSchema: object;
    pageStepId: number;
    formData: object;
  }>({
    formSchema: {},
    pageStepId: 0,
    formData: {},
  });
  const [hideLoader, setHideLoader] = useState<boolean>(false);

  useEffect(() => {
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
          pageStepId: number;
          formData: object;
        }) => {
          setFormData({ formSchema, pageStepId, formData });
        }
      ),
    ]).finally(() => setHideLoader(true));
  }, []);

  function onClickButton(formData: object, urlFetch: string, urlRedirect: string): void {
    request(
      urlFetch,
      'POST',
      {
        Authorization: `Bearer ${token}`,
      },
      { pageStepId, productId: id, formData }
    ).then(({ id }: { id: string }) => {
      history.push(`${urlRedirect}/${id}`);
    });
    return;
  }

  const onSave = function (formData: object): void {
    onClickButton(
      formData,
      `/api/v1/applications/save${step === 'first-step' ? '' : `/${id}`}`,
      `/application/edit-form`
    );
    return;
  };

  const onSubmit = function (formData: object): void {
    onClickButton(
      formData,
      `/api/v1/applications/send${step === 'first-step' ? '' : `/${id}`}`,
      '/applications'
    );
    return;
  };

  const pageProps = {
    formSchema,
    formData,
    onSave,
    onSubmit,
  };
  return hideLoader ? (
    <>
      <div className="container px-6">
        <h1 className="title has-text-centered my-5">
          {step === 'first-step' ? 'Создание заявки' : 'Редактирование заявки'}
        </h1>
        <PathList paths={paths} />
        <FormGenerator {...pageProps} />
      </div>
    </>
  ) : (
    <Loader />
  );
}
