import React, {Fragment} from 'react';
import {StatusPath} from '../../types/enums/paths.enum';

export default function PathList({paths}: {paths: any[]}): JSX.Element {
  if (!paths.length) {
    return <p>Шаги отсутствуют</p>;
  }
  return (
    <>
      <h2 className="title is-4 mt-4">Путь заявки:</h2>
      <table className="table is-bordered is-fullwidth">
        <tbody>
          {paths.map((value, index) => {
            return (
              <tr key={value.id} className={`${value.status && value.status !== 'completed' ? 'is-selected' : ''}`}>
                <td className="is-flex-direction-row is-flex is-justify-content-space-between">
                  <span>
                    {index + 1} - {value.title}
                  </span>
                  <span>{StatusPath[value.status]}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
