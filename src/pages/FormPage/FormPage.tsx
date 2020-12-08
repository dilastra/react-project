import React, { useContext, useState, Fragment, useEffect, createContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FormGenerator, Loader, PathList } from '../../components';
import { AppContext } from '../../App';
import { request } from '../../functions';
import { toast } from 'react-toastify';

export const FormPageContext = createContext({
  openAllSection: undefined,
});

export function FormPage({
  step,
  openAllSection = false,
}: {
  step: string;
  openAllSection?: boolean;
}): JSX.Element {
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

  function onClickButton(formData: object, urlFetch: string, urlRedirect: string): Promise<any> {
    return request(
      urlFetch,
      'POST',
      {
        Authorization: `Bearer ${token}`,
      },
      { pageStepId, productId: id, formData }
    ).then(({ id }: { id: string }) => {
      if (urlRedirect.length) history.push(`${urlRedirect}/${id}`);
    });
  }

  const onSave = function (formData: object): void {
    onClickButton(
      formData,
      `/api/v1/applications/save${step === 'first-step' ? '' : `/${id}`}`,
      `/application/edit-form`
    )
      .then(({ formData }) => {
        return setFormData({ formSchema, pageStepId, formData });
      })
      .finally(() => toast.info('Заявка успешно сохранена'));

    return;
  };

  const onSubmit = function (formData: object): void {
    onClickButton(
      formData,
      `/api/v1/applications/send${step === 'first-step' ? '' : `/${id}`}`,
      '/applications'
    ).finally(() => {
      toast.info('Заявка успешно отправлена');
    });
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
        <FormPageContext.Provider value={{ openAllSection }}>
          <FormGenerator {...pageProps} />
        </FormPageContext.Provider>
      </div>
    </>
  ) : (
    <>
      <Loader />
    </>
  );
}
