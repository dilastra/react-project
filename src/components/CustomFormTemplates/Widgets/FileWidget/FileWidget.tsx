import { WidgetProps } from '@rjsf/core';
import React, { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react';

export default function FileWidget({ id, value, onChange }: WidgetProps) {
  const [disabled, setDisabled] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>();

  const [{ fileName, selectedFile }, setFileInfo] = useState<{
    fileName: string;
    selectedFile: File;
  }>({ fileName: '', selectedFile: undefined });

  const [idFile, setIdFile] = useState<string>('');

  useEffect(() => {
    if (value) {
      const { id, fileName }: { id: string; fileName: string } = value;
      setIdFile(id);
      setFileInfo({ fileName, selectedFile: undefined });
    }
  }, []);

  function onSelectFile(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setFileInfo({ fileName: event.target.files[0].name, selectedFile: event.target.files[0] });
    setIdFile('');
  }

  function onCancelUploadFile(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    inputFileRef.current.value = '';
    setFileInfo({ fileName: '', selectedFile: undefined });
  }

  function onDeletelUploadedFile(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (confirm('Вы действительно хотите удалить файл?')) {
      setIdFile('');
      setIdFile('');
      setFileInfo({ fileName: '', selectedFile: undefined });
      onChange(null);
    }
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
        data: { id },
      }: { data: { id: string; path: string } } = await response.json();
      setIdFile(id);
      onChange({ id });
      setDisabled(false);
    } else {
      console.log(response.json());
    }
  }

  async function getFile(e: React.MouseEvent<HTMLButtonElement>, id: string) {
    e.preventDefault();
    fetch('/api/v1/files/' + id, {
      method: 'GET',
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
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
              onChange={onSelectFile}
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
        {!!fileName.length && selectedFile && !idFile.length && (
          <>
            <div className="is-flex is-align-items-center  ml-3">
              <span className="subtitle m-0 mr-2">Будет загружен файл: {fileName}</span>
              <button className="button mr-2 is-primary" onClick={uploadFile} disabled={disabled}>
                Загрузить
              </button>
              <button className="button is-primary is-outlined" onClick={onCancelUploadFile}>
                Отмена
              </button>
            </div>
          </>
        )}
        {idFile && !!idFile.length && (
          <>
            <div className="is-flex is-align-items-center  ml-3">
              <span className="subtitle m-0 mr-2">Загружен файл: {fileName}</span>
              <button
                className="button mr-2 is-primary"
                onClick={(e) => getFile(e, idFile)}
                disabled={disabled}
              >
                Скачать
              </button>
              <button className="button is-primary is-outlined" onClick={onDeletelUploadedFile}>
                Удалить файл
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
