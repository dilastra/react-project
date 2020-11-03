import React, {Fragment} from 'react';
import './Loader.scss';

export default function Loader(): JSX.Element {
  return (
    <>
      <div className="loader-container">
        <progress className="progress is-large is-primary"></progress>
      </div>
    </>
  );
}
