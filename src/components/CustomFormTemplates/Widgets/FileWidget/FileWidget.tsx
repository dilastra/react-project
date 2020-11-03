import {WidgetProps} from '@rjsf/core';
import React, {Fragment, useState} from 'react';

export default function FileWidget({id, onChange}: WidgetProps) {
  const [nameFile, setNameFiles] = useState<string>('');

  function processFile(files: object) {
    const f = files[0];
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onload = event => resolve(event.target.result);
    });
  }

  return (
    <>
      <div className="file has-name">
        <label htmlFor={id} className="file-label">
          <input
            id={id}
            className="file-input"
            name="resume"
            type="file"
            onChange={event => {
              processFile(event.target.files).then(onChange);
              setNameFiles(event.target.files[0].name);
            }}
          />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">Выбирете файл…</span>
          </span>
          {nameFile.length ? <span className="file-name">{nameFile}</span> : ''}
        </label>
      </div>
    </>
  );
}
