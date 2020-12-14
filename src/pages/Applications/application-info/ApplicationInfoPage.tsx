import React, { useContext, useEffect, useState, Fragment } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { AppContext } from '../../../App';
import { Loader, PathList } from '../../../components';
import { request } from '../../../functions';
interface IApplicationData {
  createdAt: string;
  company: {
    name: string;
    inn: string;
  };
}

export default function ApplicationInfoPage(): JSX.Element {
  const { id: applicationId }: { id: string } = useParams();
  const { token } = useContext(AppContext);
  const [applicationData, setApplicationData] = useState<IApplicationData>();
  const [paths, setPaths] = useState<any>({});
  const [hideLoader, setHideLoader] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    request(`/api/v1/applications/${applicationId}`, 'GET', {
      Authorization: `Bearer ${token}`,
    })
      .then((data) => {
        setApplicationData(data);
        setPaths(data.applicationPaths);
      })
      .finally(() => {
        setHideLoader(true);
      });

    return () => {
      return (mounted = false);
    };
  }, []);

  if (!hideLoader) {
    return <Loader />;
  }

  if (Object.keys(applicationData).length === 0) {
    return <div>Нет данных</div>;
  }
  return (
    <>
      <div className="box mx-6 mt-4">
        <h1 className="title has-text-centered mb-5">Информация о заявке</h1>
        <span>CreatedDate - {applicationData.createdAt}</span>
        <br />
        <span>Name - {applicationData.company?.name}</span>
        <br />
        <span>Inn - {applicationData.company?.inn}</span>
        <br />
        <PathList paths={paths} />
        <NavLink
          to={`/application/edit-form/${applicationId}`}
          className="button is-primary is-outlined"
        >
          На текущий шаг
        </NavLink>
      </div>
    </>
  );
}
