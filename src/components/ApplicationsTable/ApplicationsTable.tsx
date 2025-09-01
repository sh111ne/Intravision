import styles from './ApplicationsTable.module.scss';

import type { Task } from '../../@types/types';

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

interface ApplicationsTableProps {
  applications: Task[];
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
  onRowClick: (id: number) => void;
}

const ApplicationsTable = ({
  applications,
  isLoading,
  error,
  onRowClick,
}: ApplicationsTableProps) => {
  if (isLoading) {
    return (
      <div className="loading">
        <span className="loader"></span>
      </div>
    );
  }

  if (error) {
    return <div className="error">Ошибка загрузки данных</div>;
  }

  const formatId = (id: number): string => {
    const str = id.toString();
    return str.length > 3 ? `${str.slice(0, 2)} ${str.slice(2)}` : str;
  };

  return (
    <table className={styles.applications}>
      <thead className={styles.applicationsHead}>
        <tr className={styles.applicationsHeadTr}>
          <th className={styles.lineCell}>
            <div className={styles.lineWhite}></div>
          </th>
          <th className={styles.id}>ID</th>
          <th className={styles.name}>Название</th>
          <th className={styles.status}>Статус</th>
          <th className={styles.executor}>Исполнитель</th>
        </tr>
      </thead>
      <tbody className={styles.applicationsBody}>
        {applications.map((el) => (
          <tr key={el.id} onClick={() => onRowClick(el.id)} className={styles.applicationsBodyTr}>
            <td className={styles.lineCell}>
              <div className={styles.line}></div>
            </td>
            <td className={styles.id}>{formatId(el.id)}</td>
            <td className={styles.name}>
              {el.name.length > 75 ? `${el.name.substring(0, 75)}...` : el.name}
            </td>
            <td className={styles.status}>
              <span className={styles.statusSpan} style={{ backgroundColor: el.statusRgb }}>
                {el.statusName.length > 14 ? `${el.statusName.substring(0, 12)}...` : el.statusName}
              </span>
            </td>
            <td className={styles.executor}>{el.executorName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApplicationsTable;
