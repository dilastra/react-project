import React from 'react';
import {NavLink} from 'react-router-dom';

export default function ProductsList({products}: any): JSX.Element {
  if (!products) {
    return <p>Продуктов пока нет</p>;
  }
  return (
    <div className="container mt-4">
      <h1 className="title mt-5 has-text-centered">Список продуктов</h1>
      <div className="columns is-flex-wrap-wrap">
        {products.map((product: any) => {
          return (
            <div className="column is-4" key={product.id}>
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title is-centered">{product.title}</p>
                </header>
                <div className="card-content">
                  <div className="content">
                    <p className="has-text-centered">{product.description || ''}</p>
                  </div>
                </div>
                <footer className="card-footer is-hovered">
                  <NavLink to={`/products/create-form/${product.id}`} className="card-footer-item">
                    Новая заявка
                  </NavLink>
                </footer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
