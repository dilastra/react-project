import React from 'react';
import { NavLink } from 'react-router-dom';

interface IApplication {
  id: string;
  company: {
    name: string;
  };
  createdBy: {
    username: string;
  };
  product: {
    title: string;
  };
  createdAt: string;
}

export function ApplicationsList({ applications }: { applications: IApplication[] }): JSX.Element {
  if (!applications?.length) {
    return <p>Заявок нет</p>;
  }

  return (
    <div className="container mb-5 mx-8 is-justify-content-center is-flex is-flex-direction-column">
      <h1 className="title has-text-centered mt-5">Заявки</h1>
      <table className="table is-hoverable is-fullwidth is-striped is-narrow has-text-centered mt-5 is-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Created</th>
            <th>Product</th>
            <th>Created</th>
          </tr>
        </thead>

        <tbody>
          {applications &&
            applications.map((application: IApplication) => {
              return (
                <tr key={application.id}>
                  <td>
                    <NavLink to={`/applications/${application.id}`}>{application.id}</NavLink>
                  </td>
                  <td>{application.company.name}</td>
                  <td>{application.createdBy.username}</td>
                  <td>{application.product.title}</td>
                  <td>{application.createdAt}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
