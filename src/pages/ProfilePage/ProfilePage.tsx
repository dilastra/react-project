import React, {useContext, useEffect, useState, Fragment} from 'react';
import {Loader, ProfileCard} from '../../components';
import {AppContext} from '../../App';
import {request} from '../../functions';

export default function ProfilePage(): JSX.Element {
  const {token} = useContext(AppContext);
  const [userData, setUserData] = useState(null);
  const [hideLoader, setHideLoader] = useState<boolean>(false);

  useEffect(() => {
    request('/api/v1/auth', 'GET', {
      Authorization: `Bearer ${token}`,
    })
      .then(userData => setUserData(userData))
      .finally(() => setHideLoader(true));
  }, [token]);

  return <>{hideLoader ? <ProfileCard userData={userData} /> : <Loader />}</>;
}
