import React, {Fragment} from 'react';

export default function ProfileCard({userData}): JSX.Element {
  return (
    <>
      <div className="box mt-4 content is-medium">
        <h1 className="title has-text-centered mb-5">Информация о пользователе</h1>
        <p>Имя пользователя: {userData.username}</p>
        <p>Роль: {userData.role}</p>
        <p>ID: {userData.id}</p>
      </div>
    </>
  );
}
