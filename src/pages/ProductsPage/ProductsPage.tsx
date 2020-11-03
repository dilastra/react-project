import React, {useContext, useEffect, useState, Fragment} from 'react';
import {Loader, ProductsList} from '../../components';
import {AppContext} from '../../App';
import {request} from '../../functions';

export default function ProductsPage(): JSX.Element {
  const {token} = useContext(AppContext);
  const [products, setProducts] = useState(null);
  const [hideLoader, setHideLoader] = useState<boolean>(false);

  useEffect(() => {
    request('/api/v1/products', 'GET', {
      Authorization: `Bearer ${token}`,
    })
      .then(data => setProducts(data))
      .finally(() => setHideLoader(true));
  }, [token]);

  return <>{hideLoader ? <ProductsList products={products} /> : <Loader />}</>;
}
