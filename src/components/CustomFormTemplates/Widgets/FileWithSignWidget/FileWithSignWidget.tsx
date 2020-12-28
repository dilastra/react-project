import React, { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { WidgetProps } from '@rjsf/core';

export default function FileWithSignWidget({ id, value, onChange }: WidgetProps) {
  const [fileHasSign, setFileHasSign] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [{ fileName, selectedFile, idFile }, setFileInfo] = useState<{
    fileName: string;
    selectedFile: File;
    idFile?: string;
  }>({ fileName: '', selectedFile: undefined, idFile: '' });

  const inputFileRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (value) {
      const { id: idFile, fileName }: { id: string; fileName: string } = value;
      setFileInfo({ fileName, selectedFile: undefined, idFile });
    }
  }, []);

  function onSelectFile(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setFileInfo({
      fileName: event.target.files[0].name,
      selectedFile: event.target.files[0],
    });
  }

  function onCancelUploadFile(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    inputFileRef.current.value = '';
    setFileInfo({ fileName: '', selectedFile: undefined });
  }

  function onDeletelUploadedFile(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (confirm('Вы действительно хотите удалить файл?')) {
      setFileInfo({ fileName: '', selectedFile: undefined, idFile: '' });
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
        data: { id: idFile },
      }: { data: { id: string } } = await response.json();
      setFileInfo({ fileName, selectedFile: undefined, idFile });
      onChange({ id, fileName });
      setDisabled(false);
    } else {
      console.log(response.json());
    }
  }

  function signFile(e) {
    e.preventDefault();
    setFileHasSign(true);
  }

  function getFile(id: string) {
    return function (e: React.MouseEvent<HTMLButtonElement>) {
      setDisabled(true);
      if (e) {
        e.preventDefault();
      }

      fetch('/api/v1/files/' + id, {
        method: 'GET',
      })
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          link.click();
          setDisabled(false);
        });
    };
  }

  return (
    <>
      <div className={`box is-flex ${idFile ? 'is-flex-direction-column' : ''}  content mb-3`}>
        {!idFile && (
          <div className="file mr-3">
            <label htmlFor={id} className="file-label">
              <input
                id={id}
                className="file-input"
                type="file"
                onChange={onSelectFile}
                ref={inputFileRef}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                  <FontAwesomeIcon icon={faUpload} />
                </span>
                <span className="file-label">Выберите файл…</span>
              </span>
            </label>
          </div>
        )}
        {selectedFile && !idFile && (
          <>
            <div className="is-flex is-align-items-center">
              <span className="subtitle m-0 mr-2">Будет загружен файл: {fileName}</span>
              <button
                className={`button mr-2 is-primary ${disabled ? 'is-loading' : ''}`}
                onClick={uploadFile}
                disabled={disabled}
              >
                Загрузить
              </button>
              <button className="button is-primary is-outlined" onClick={onCancelUploadFile}>
                Отмена
              </button>
            </div>
          </>
        )}
        {idFile && (
          <>
            <div className="is-flex is-align-items-center">
              <span className="subtitle m-0 mr-2">Загружен файл: {fileName}</span>
              <button
                className={`button mr-2 is-primary ${disabled ? 'is-loading' : ''}`}
                onClick={getFile(idFile)}
                disabled={disabled}
              >
                Скачать
              </button>
              <button className="button is-primary is-outlined" onClick={onDeletelUploadedFile}>
                Удалить файл
              </button>
              <button
                className={`button ml-2 is-primary ${disabled ? 'is-loading' : ''}`}
                onClick={signFile}
                disabled={fileHasSign}
              >
                {fileHasSign ? 'Файл подписан' : 'Подписать файл'}
              </button>
            </div>
            <div className="content">
              <h2 className="subtitle is-size-4 m-0 mt-5">Дополнительная информация о файле</h2>
              <p className="is-size-5 mt-3">
                Cтатус: <strong>Не принят</strong>
              </p>
              <h2 className="subtitle is-size-4 m-0 mt-5">Комментарии:</h2>
              <p className="is-size-5 mt-3">
                <strong>Сотрудник банка:</strong> Файл имеет нeкорректный вид
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
