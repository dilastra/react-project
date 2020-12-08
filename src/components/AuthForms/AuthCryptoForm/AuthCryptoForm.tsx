import React, { useCallback, useContext, useState, Fragment } from 'react';
import { Certificate, getUserCertificates, createSignature } from 'crypto-pro/dist/crypto-pro';
import { AppContext } from '../../../App';
import { Modal } from '../../Modal';
import { request } from '../../../functions';

export default function AuthCryptoForm(): JSX.Element {
  const { login } = useContext(AppContext);
  const [certificates, setCertificates] = useState([] as Certificate[]);
  const [certificate, setCertificate] = useState<Certificate | undefined>(undefined);
  const [modalState, setModalState] = useState<boolean>(false);

  const getCertificates = useCallback(() => {
    (async () => {
      try {
        setCertificates(await getUserCertificates());
      } catch (error) {}
    })();
  }, []);

  const selectCertificate = (event: any) => {
    setCertificate(certificates.find(({ thumbprint }) => thumbprint === event.target.value));
  };
  const cryptoLoginHandler = async () => {
    // const hash = 'b285056dbf18d7392d7677369524dd14747459ed8143997e163b2986f92fd42c'
    const hash = 'aadd';
    const hashBase64 = window.btoa(hash);
    try {
      if (certificate) {
        const sign = await createSignature(certificate.thumbprint, hashBase64);
        const data = await request('api/v1/auth/crypto', 'POST', {}, { sign });
        login(data.token, data.expiresIn, '');
      }
    } catch (e) {}
  };

  function onClosedModal(): void {
    setModalState(false);
    return;
  }
  return (
    <>
      <button
        className="button is-fullwidth is-primary is-hovered is-active is-medium is-uppercase"
        onClick={() => setModalState(true)}
      >
        выбрать ЭЦП
      </button>
      {certificate && (
        <>
          <p>{certificate.name}</p>
          <p>{certificate.validFrom}</p>
          <p>{certificate.validTo}</p>
          <p>{certificate.subjectName}</p>
          <button className="btn btn-large" onClick={cryptoLoginHandler}>
            Войти
          </button>
        </>
      )}

      {modalState && (
        <Modal
          titleModal="Выбор ЭЦП для авторизации"
          isActiveModal={modalState}
          actionOnClose={onClosedModal}
        >
          <>
            <div className="field">
              <label className="label" htmlFor="select">
                ЭЦП
              </label>
              <div className="control is-expanded">
                <div className="select is-fullwidth">
                  <select onChange={selectCertificate} id="select">
                    <option defaultValue={undefined}>Выбрать ЭЦП</option>
                    {certificates.map(({ name, thumbprint }) => (
                      <option key={thumbprint} value={thumbprint}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </>
        </Modal>
      )}
    </>
  );
}
