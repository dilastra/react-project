import { WidgetProps } from '@rjsf/core';
import React, { ChangeEvent, Fragment, useRef, useState } from 'react';

export default function FileWidget({ id }: WidgetProps) {
  const [nameFile, setNameFiles] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>();

  const [{ fileName, selectedFile }, setFileInfo] = useState<{
    fileName: string;
    selectedFile: File;
  }>({ fileName: '', selectedFile: undefined });

  const [{ idFile, pathFile }, setInfoForDownloadFile] = useState<{
    idFile: string;
    pathFile: string;
  }>({
    idFile: '',
    pathFile: '',
  });

  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setFileInfo({ fileName: event.target.files[0].name, selectedFile: event.target.files[0] });
    setNameFiles(event.target.files[0].name);
  }

  function onCancelUploadFile(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    inputFileRef.current.value = '';
    setFileInfo({ fileName: '', selectedFile: undefined });
  }

  function onCandelUploadedFile(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setInfoForDownloadFile({ idFile: '', pathFile: '' });
  }

  async function uploadFile(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setDisabled(true);
    const newData = new FormData();

    newData.append('myFile', selectedFile);

    const response = await fetch('/api/v1/files', {
      method: 'POST',
      body: newData,
    });

    if (response.ok) {
      const {
        data: { id, path },
      }: { data: { id: string; path: string } } = await response.json();
      setInfoForDownloadFile({ idFile: id, pathFile: path });
      setDisabled(false);
    } else {
      console.log(response.json());
    }
  }

  async function getFile(id: any) {
    fetch('/api/v1/files/' + id, {
      method: 'GET',
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `FileName.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode!.removeChild(link);
      });
  }

  return (
    <>
      <div className="is-flex is-align-items-center">
        <div className="file">
          <label htmlFor={id} className="file-label">
            <input
              id={id}
              className="file-input"
              name="resume"
              type="file"
              onChange={onChange}
              ref={inputFileRef}
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">Выберите файл…</span>
            </span>
          </label>
        </div>
        {!!fileName.length && !idFile.length && (
          <>
            <div className="is-flex is-align-items-center  ml-3">
              <span className="subtitle m-0 mr-2">Будет загружен файл: {nameFile}</span>
              <button className="button mr-2 is-primary" onClick={uploadFile} disabled={disabled}>
                Загрузить
              </button>
              <button className="button is-primary is-outlined" onClick={onCancelUploadFile}>
                Отмена
              </button>
            </div>
          </>
        )}
        {!!idFile.length && (
          <>
            <div className="is-flex is-align-items-center  ml-3">
              <span className="subtitle m-0 mr-2">Загружен файл: {nameFile}</span>
              <button
                className="button mr-2 is-primary"
                onClick={() => getFile(idFile)}
                disabled={disabled}
              >
                Скачать
              </button>
              <button className="button is-primary is-outlined" onClick={onCandelUploadedFile}>
                Отмена
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
